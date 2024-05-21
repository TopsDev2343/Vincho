import React, {useState} from 'react';
import {StyleSheet, FlatList} from 'react-native';

import {
  CustomContainer,
  AlternativeScreen,
  AdminReportItem,
} from '~/components';
import {BackButton} from '~/components';
import {useGetReportedPosts} from '~/hooks/admin/Reports';
import {Strings} from '~/assets/strings';

const UserReportedPosts = ({route}: {route: any}) => {
  const entityId = route.params?.entityId;

  const [where] = useState<object | undefined>({
    post: {userId: {eq: entityId}},
  });
  const {
    isLoading: getReportedPostsLoading,
    data: getReportedPostsData,
    isSuccess: getReportedPostsSuccess,
    isError: getReportedPostsFail,
    fetchNextPage: fetchNextPageGetReportedPosts,
    hasNextPage: hasNextPageGetReportedPosts,
    refetch: refetchGetReportedPosts,
  } = useGetReportedPosts({where});

  const onLoadMore = () => {
    if (hasNextPageGetReportedPosts) {
      fetchNextPageGetReportedPosts();
    }
  };

  function renderItem({item}: {item: any}) {
    return <AdminReportItem item={item} hasReview={true} isPostReport={true} />;
  }

  function listEmpty() {
    return <AlternativeScreen msg={Strings.noReportedPost} />;
  }

  return (
    <CustomContainer
      isLoading={getReportedPostsLoading}
      isError={getReportedPostsFail}
      errorMsg={'Something went wrong!'}
      onPress={() => {
        refetchGetReportedPosts();
      }}>
      <BackButton />

      {getReportedPostsSuccess && (
        <FlatList
          style={styles.container}
          horizontal={false}
          data={getReportedPostsData?.pages}
          renderItem={renderItem}
          keyExtractor={item => item?.id.toString()}
          onEndReachedThreshold={0.5}
          onEndReached={({distanceFromEnd}) => {
            if (distanceFromEnd < 0) return;
            onLoadMore();
          }}
          ListEmptyComponent={!getReportedPostsLoading ? listEmpty : null}
        />
      )}
    </CustomContainer>
  );
};

export default UserReportedPosts;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
});
