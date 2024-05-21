import React, {useState, useEffect} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {scale} from 'react-native-size-matters';
import {useQueryClient} from 'react-query';

import {
  CustomContainer,
  BackButton,
  UsersListItem,
  AlternativeScreen,
  AvatarWithTitle,
  HelveticaRegularText,
} from '~/components';
import {Strings} from '~/assets/strings/index';
import {useFollowingListStore} from '~/stores';
import {useGetAllFollowers} from '~/hooks/artist/Follow';
import {queryKeys} from '~/constants/queryKeys';
import {Colors} from '~/styles/colors';
import {View as NativeBaseView} from 'native-base';
const Followers = ({route}: {route: any}) => {
  const entityId = route.params?.entityId;

  const queryClient = useQueryClient();
  const {userFollowingList, setUserFollowingList} = useFollowingListStore(
    state => state,
  );

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
  /*     useEffect(() => {
              { getAllFollowingSuccess && setUserFollowingList(getAllFollowingData?.pages?.map(({ following }) => following?.id)) }
         }, [getAllFollowingData]) */

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
    item = item?.follower;
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          marginHorizontal: 10,
          marginVertical: 10,
        }}>
        <AvatarWithTitle
          width={12}
          height={12}
          name={item?.userName}
          uri={item?.photoUrl}
          onPress={() => {}}
        />
        <NativeBaseView ml={5} justifyContent={'center'} width={'100%'}>
          <HelveticaRegularText
            text={item?.userName}
            fontSize={16}
            color={Colors.cleanWhite}
          />
        </NativeBaseView>
      </View>
    );
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
      <BackButton />

      {getAllFollowersSuccess ? (
        <View style={styles.container}>
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
