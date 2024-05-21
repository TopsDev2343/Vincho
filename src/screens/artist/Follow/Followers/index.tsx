import React, {useState, useEffect} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {scale} from 'react-native-size-matters';
import {useQueryClient} from 'react-query';

import {
  CustomContainer,
  BackButton,
  UsersListItem,
  AlternativeScreen,
} from '~/components';
import {Strings} from '~/assets/strings/index';
import {useAuthStore, useFollowingListStore} from '~/stores';
import {
  useFollow,
  useGetAllFollowers,
  useGetAllFollowing,
  useUnFollowByFollowingId,
} from '~/hooks/artist/Follow';
import snackBar from '~/utils/snackBar';
import {messageHelper} from '~/utils/messageHelper';
import {queryKeys} from '~/constants/queryKeys';

const Followers = ({route}: {route: any}) => {
  const queryClient = useQueryClient();
  const {userId} = useAuthStore(state => state);
  const entityId = route.params?.entityId;
  const {userFollowingList, setUserFollowingList} = useFollowingListStore(
    state => state,
  );
  const {mutate: mutateFollow, isLoading: followLoading} = useFollow();
  const {mutate: unFollowUserMutate, isLoading: isUnFollowing} =
    useUnFollowByFollowingId();

  const [itemId, setItemId] = useState<number>();

  function setItemIdForLoading(id: number) {
    setItemId(id);
  }

  const {
    isLoading: getAllFollowersLoading,
    data: getAllFollowersData,
    isError: getAllFollowersFail,
    isSuccess: getAllFollowersSuccess,
    fetchNextPage: fetchNextPageGetAllFollowers,
    hasNextPage: hasNextPageGetAllFollowers,
    refetch: refetchGetAllFollowers,
  } = useGetAllFollowers({
    followingId: entityId,
    where: {
      follower: {isActive: {eq: true}},
    },
  });

  const {isSuccess, data: userData} = useGetAllFollowing({followerId: userId});

  useEffect(() => {
    {
      isSuccess &&
        setUserFollowingList(
          userData?.pages?.map(({following}) => following?.id),
        );
    }
  }, [userData]);

  const onLoadMore = () => {
    if (hasNextPageGetAllFollowers) {
      fetchNextPageGetAllFollowers();
    }
  };

  useEffect(() => {
    return () => {
      queryClient.removeQueries(queryKeys.getAllFollowers);
    };
  }, []);

  function renderUserListItem({item}: {item: any}) {
    return (
      <UsersListItem
        item={item?.follower}
        btnLoading={followLoading || isUnFollowing}
        btnOnPress={followOnPress}
        itemId={itemId}
        setItemId={setItemIdForLoading}
        selectedList={userFollowingList}
        selectedTitle={Strings.follow}
        nonSelectedTitle={Strings.following}
      />
    );
  }

  function followOnPress(otherUserId: number) {
    //let otherUserId = item?.id;

    if (userFollowingList?.includes(otherUserId)) {
      unFollowUserMutate(otherUserId as any, {
        onSuccess: successData => {
          if (
            successData.follow_deleteFollowByFollowingId?.value === 'Success'
          ) {
            let followingList = userFollowingList;
            setUserFollowingList(
              followingList.filter(value => value !== otherUserId),
            );
            /*  snackBar(
              messageHelper(
                successData?.follow_deleteFollowByFollowingId?.value,
              ),
            ); */
            queryClient.invalidateQueries(queryKeys.getFollowers);
            queryClient.invalidateQueries(queryKeys.getAllFollowers);
            queryClient.invalidateQueries(queryKeys.getFollowings);
            queryClient.invalidateQueries(queryKeys.getAllFollowing);
            queryClient.invalidateQueries(queryKeys.getUserProfileById);
          }
        },
      });
    } else {
      const input = {followerId: userId, followingId: otherUserId};
      mutateFollow(input as any, {
        onSuccess: successData => {
          if (successData.follow_createFollow?.status.value === 'Success') {
            setUserFollowingList([...userFollowingList, input.followingId]);
            /*    snackBar(
              messageHelper(successData.follow_createFollow?.status.value),
            ); */
            queryClient.invalidateQueries(queryKeys.getFollowers);
            queryClient.invalidateQueries(queryKeys.getAllFollowers);
            queryClient.invalidateQueries(queryKeys.getFollowings);
            queryClient.invalidateQueries(queryKeys.getAllFollowing);
            queryClient.invalidateQueries(queryKeys.getUserProfileById);
          } else {
            /*    snackBar(
              messageHelper(successData.follow_createFollow?.status.value),
            ); */
          }
        },
      });
    }
  }

  function listEmpty() {
    return <AlternativeScreen msg={Strings.noFollower} />;
  }

  return (
    <CustomContainer
      isLoading={getAllFollowersLoading}
      isError={getAllFollowersFail}
      errorMsg={'Something went wrong'}
      onPress={refetchGetAllFollowers}>
      {getAllFollowersSuccess ? (
        <View style={styles.container}>
          <BackButton />

          <FlatList
            contentContainerStyle={{flexGrow: 1, marginTop: scale(12)}}
            data={getAllFollowersData?.pages}
            renderItem={renderUserListItem}
            showsVerticalScrollIndicator={false}
            numColumns={1}
            keyExtractor={(item: any) => JSON.stringify(item?.id)}
            horizontal={false}
            onEndReachedThreshold={0.5}
            onEndReached={({distanceFromEnd}) => {
              if (distanceFromEnd < 0) return;
              onLoadMore();
            }}
            ListEmptyComponent={!getAllFollowersLoading ? listEmpty : null}
          />
        </View>
      ) : null}
    </CustomContainer>
  );
};

export default Followers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
