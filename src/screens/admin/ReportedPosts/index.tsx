import React, {useState} from 'react';
import {StyleSheet, FlatList} from 'react-native';

import {
  CustomContainer,
  AlternativeScreen,
  AdminReportItem,
} from '~/components';
import {BackButton} from '~/components';
import {useGetReportedPosts, useReviewedPost} from '~/hooks/admin/Reports';
import {Strings} from '~/assets/strings';
import {useQueryClient} from 'react-query';
import {queryKeys} from '~/constants/queryKeys';
import {navigate} from '~/navigation/methods';

const ReportedPostsScreen = ({route}: {route: any}) => {
  const entityId = route.params?.entityId;
  const {mutate, isLoading} = useReviewedPost();
  const queryClient = useQueryClient();

  const [where, setWhere] = useState<object | undefined>();

  if (entityId != null || entityId != undefined) {
    if (where == undefined || where == null) {
      setWhere({post: {id: {eq: entityId}}});
    }
  }

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
    return (
      <AdminReportItem
        item={item}
        hasReview={true}
        isPostReport={true}
        imgOnPress={() => {
          const input = {
            entityId: item?.id,
          };
          mutate(input as any, {
            onSuccess: successData => {
              if (
                successData?.reportPost_setAsReviewed?.status?.value ===
                'Success'
              ) {
                queryClient.invalidateQueries(queryKeys.getReportedPosts);
                navigate('PostDetail', {
                  entityId: item?.post?.id,
                });
              }
            },
          });
        }}
      />
    );
  }

  function listEmpty() {
    return <AlternativeScreen msg={Strings.emptyString} />;
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

export default ReportedPostsScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
});
