import React, {useState} from 'react';
import {StyleSheet, FlatList} from 'react-native';

import {
  CustomContainer,
  AlternativeScreen,
  AdminReportItem,
} from '~/components';
import {BackButton} from '~/components';
import {
  useGetReportedAccounts,
  useReviewedAccount,
} from '~/hooks/admin/Reports';
import {Strings} from '~/assets/strings';
import {navigate} from '~/navigation/methods';
import {useQueryClient} from 'react-query';
import {queryKeys} from '~/constants/queryKeys';

const ReportedAccounts = ({route}: {route: any}) => {
  const entityId = route.params?.entityId;

  const [where, setWhere] = useState<object | undefined>();

  if (entityId != null || entityId != undefined) {
    if (where == undefined || where == null) {
      setWhere({reportedUserId: {eq: entityId}});
    }
  }

  const {mutate, isLoading} = useReviewedAccount();
  const queryClient = useQueryClient();
  const {
    isLoading: getReportedAccountsLoading,
    data: getReportedAccountsData,
    isSuccess: getReportedAccountsSuccess,
    isError: getReportedAccountsFail,
    fetchNextPage: fetchNextPageGetReportedAccounts,
    hasNextPage: hasNextPageGetReportedAccounts,
    refetch: refetchGetReportedAccounts,
    isRefetching,
  } = useGetReportedAccounts({where});

  const onLoadMore = () => {
    if (hasNextPageGetReportedAccounts) {
      fetchNextPageGetReportedAccounts();
    }
  };

  function renderItem({item}: {item: any}) {
    return (
      <AdminReportItem
        item={item}
        hasReview={true}
        isPostReport={false}
        imgOnPress={() => {
          const input = {
            entityId: item?.id,
          };
          mutate(input as any, {
            onSuccess: successData => {
              if (
                successData?.reportUser_setAsReviewed?.status?.value ===
                'Success'
              ) {
                queryClient.invalidateQueries(queryKeys.getReportedAccounts);
                navigate('UserProfile', {
                  receiverId: item?.reportedUser?.id,
                  headerData: item?.reportedUser,
                  entityId: item?.reportedUser?.id,
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
      isLoading={getReportedAccountsLoading}
      isError={getReportedAccountsFail}
      errorMsg={'Something went wrong!'}
      onPress={() => {
        refetchGetReportedAccounts();
      }}>
      <BackButton />

      <FlatList
        style={styles.container}
        horizontal={false}
        data={getReportedAccountsData?.pages}
        renderItem={renderItem}
        refreshing={isRefetching}
        onRefresh={refetchGetReportedAccounts}
        keyExtractor={item => item?.id.toString()}
        onEndReachedThreshold={0.5}
        onEndReached={({distanceFromEnd}) => {
          if (distanceFromEnd < 0) return;
          onLoadMore();
        }}
        ListEmptyComponent={!getReportedAccountsLoading ? listEmpty : null}
      />
    </CustomContainer>
  );
};

export default ReportedAccounts;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
});
