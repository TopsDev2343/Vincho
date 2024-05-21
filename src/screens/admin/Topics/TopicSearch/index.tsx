import React, {useState} from 'react';
import {BackButton, CustomContainer, DeleteTopicModal} from '~/components';
import {useGetTopicsReport} from '~/hooks/artist/Topic';
import {AllTopicsList, CustomFilter} from '~/components';

const TopicSearch = () => {
  const [value, setValue] = useState('');

  const topicOption = {
    where: {
      topic: {title: {contains: value}},
    },
    order: {topic: {id: 'DESC'}},
  };

  const {
    isLoading: getAllTopicsLoading,
    data: getAllTopicsData,
    isSuccess: getAllTopicsSuccess,
    isError: getAllTopicsFail,
    error: getAllTopicsErrorMsg,
    fetchNextPage: fetchNextPageGetAllTopics,
    hasNextPage: hasNextPageGetAllTopics,
    refetch: refetchGetAllTopics,
    isRefetching: getAllTopicsRefetching,
  } = useGetTopicsReport(topicOption);

  const onLoadMore = () => {
    if (hasNextPageGetAllTopics) {
      fetchNextPageGetAllTopics();
    }
  };

  return (
    <CustomContainer
      isLoading={getAllTopicsLoading}
      isError={getAllTopicsFail}
      errorMsg={'Something went wrong!'}>
      <BackButton />

      <CustomFilter label="Search Topics" value={value} setValue={setValue} />

      {getAllTopicsSuccess && (
        <AllTopicsList
          topicData={getAllTopicsData?.pages}
          onLoadMore={onLoadMore}
          showAllTopic={true}
          isAdmin={true}
          isLoading={getAllTopicsLoading}
          refetch={refetchGetAllTopics}
          isRefetching={getAllTopicsRefetching}
        />
      )}
      <DeleteTopicModal />
    </CustomContainer>
  );
};

export default TopicSearch;
