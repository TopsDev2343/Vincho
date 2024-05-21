import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {CustomContainer, AdminExplorePostList} from '~/components';
import {BackButton} from '~/components';
import {useGetTopicPosts} from '~/hooks/artist/Topic';
import {scale} from 'react-native-size-matters';

const TopicPosts = ({route}: {route: any}) => {
  const {
    isLoading: getTopicPostsLoading,
    data: getTopicPostsData,
    isSuccess: getTopicPostsSuccess,
    isError: getTopicPostsFail,
    //  error: getTopicPostsErrorMsg,
    fetchNextPage: fetchNextPageGetTopicPosts,
    hasNextPage: hasNextPageGetTopicPosts,
    refetch: refetchGetTopicPosts,
  } = useGetTopicPosts(route?.params?.topicId);

  const onLoadMore = () => {
    if (hasNextPageGetTopicPosts) {
      fetchNextPageGetTopicPosts();
    }
  };

  return (
    <CustomContainer
      isLoading={getTopicPostsLoading}
      isError={getTopicPostsFail}
      errorMsg={'Something went wrong!'}
      onPress={refetchGetTopicPosts}>
      <BackButton />

      {getTopicPostsSuccess && (
        <View style={{flex: 1}}>
          <AdminExplorePostList
            isTopic={true}
            postsData={getTopicPostsData?.pages}
            onLoadMore={onLoadMore}
            isLoading={getTopicPostsLoading}
          />
        </View>
      )}
    </CustomContainer>
  );
};

export default TopicPosts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: scale(12),
    zIndex: -10,
  },
});
