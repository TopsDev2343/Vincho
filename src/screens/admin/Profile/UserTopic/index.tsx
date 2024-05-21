import {Box} from 'native-base';
import React, {useState} from 'react';

import {CustomContainer} from '~/components';
import {useGetUserTopicsByUserId} from '~/hooks/artist/Topic';
import {AllTopicsList} from '~/components';

const UserTopic = ({entityId}: {entityId: number}) => {
  const topicOption = {
    where: undefined,
    order: {createdDate: 'DESC'},
    userId: entityId,
  };

  const {
    isLoading,
    data: getUserTopicsData,
    isSuccess,
    isError,
    error: getUserTopicsErrorMsg,
    fetchNextPage: fetchNextPageGetUserTopics,
    hasNextPage: hasNextPageGetUserTopics,
    refetch: refetchGetUserTopics,
  } = useGetUserTopicsByUserId(topicOption);

  const onLoadMore = () => {
    if (hasNextPageGetUserTopics) {
      fetchNextPageGetUserTopics();
    }
  };

  return (
    <CustomContainer
      isLoading={isLoading}
      isError={isError}
      errorMsg={'Something went wrong!'}
      onPress={() => {
        refetchGetUserTopics();
      }}>
      {isSuccess ? (
        <Box flex={1}>
          <AllTopicsList
            topicData={getUserTopicsData?.pages}
            onLoadMore={onLoadMore}
            showAllTopic={false}
            isUserTopic={true}
            isLoading={isLoading}
          />
        </Box>
      ) : null}
    </CustomContainer>
  );
};

export default UserTopic;
