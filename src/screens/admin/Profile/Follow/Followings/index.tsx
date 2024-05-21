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
import {useGetAllFollowing} from '~/hooks/artist/Follow';
import {queryKeys} from '~/constants/queryKeys';

const Followings = ({route}: {route: any}) => {
  const entityId = route.params?.entityId;
  //const {userId} = useAuthStore(state => state);
  const queryClient = useQueryClient();
  const {userFollowingList, setUserFollowingList} = useFollowingListStore(
    state => state,
  );

  const [itemId, setItemId] = useState<number>();

  function setItemIdForLoading(id: number) {
    setItemId(id);
  }

  const {
    isLoading: getAllFollowingLoading,
    data: getAllFollowingData,
    isError: getAllFollowingFail,
    isSuccess: getAllFollowingSuccess,
    fetchNextPage: fetchNextPageGetAllFollowing,
    hasNextPage: hasNextPageGetAllFollowing,
    refetch: refetchGetAllFollowing,
  } = useGetAllFollowing({
    followerId: entityId,
    where: {
      following: {isActive: {eq: true}},
    },
  });

  useEffect(() => {
    {
      getAllFollowingSuccess &&
        setUserFollowingList(
          getAllFollowingData?.pages?.map(({following}) => following?.id),
        );
    }
  }, [getAllFollowingData]);

  const onLoadMore = () => {
    if (hasNextPageGetAllFollowing) {
      fetchNextPageGetAllFollowing();
    }
  };

  useEffect(() => {
    return () => {
      queryClient.removeQueries(queryKeys.getAllFollowing);
    };
  }, []);

  function renderUserListItem({item}: {item: any}) {
    return (
      <UsersListItem
        item={item?.following}
        btnLoading={false}
        btnOnPress={() => {}}
        itemId={itemId}
        setItemId={setItemIdForLoading}
        selectedList={userFollowingList}
        selectedTitle={Strings.follow}
        nonSelectedTitle={Strings.following}
      />
    );
  }

  function listEmpty() {
    return <AlternativeScreen msg={Strings.noFollowing} />;
  }
  return (
    <CustomContainer
      isLoading={getAllFollowingLoading}
      isError={getAllFollowingFail}
      errorMsg={'Something went wrong'}
      onPress={refetchGetAllFollowing}>
      {getAllFollowingSuccess ? (
        <View style={styles.container}>
          <BackButton />

          <FlatList
            contentContainerStyle={{flexGrow: 1, marginTop: scale(12)}}
            data={getAllFollowingData?.pages}
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
            ListEmptyComponent={!getAllFollowingLoading ? listEmpty : null}
          />
        </View>
      ) : null}
    </CustomContainer>
  );
};

export default Followings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
