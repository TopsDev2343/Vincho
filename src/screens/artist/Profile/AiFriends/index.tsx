import React, {useEffect} from 'react';
import {View, FlatList} from 'react-native';
import {scale} from 'react-native-size-matters';
import {CustomContainer, AiFriendsListItem} from '~/components';
import {StyleSheet} from 'react-native';
import {useGetAllBuddies} from '~/hooks/artist/AiBuddy';

const AiFriends = () => {
  const {
    isLoading: getAllBuddiesLoading,
    data: getAllBuddiesData,
    isSuccess: getAllBuddiesSuccess,
    isError: getAllBuddiesFail,
    fetchNextPage: fetchNextPageGetAllBuddies,
    hasNextPage: hasNextPageGetAllBuddies,
    refetch: refetchGetAllBuddies,
  } = useGetAllBuddies({});

  useEffect(() => {
    refetchGetAllBuddies();
  }, [refetchGetAllBuddies]);

  const onLoadMore = () => {
    if (hasNextPageGetAllBuddies) {
      fetchNextPageGetAllBuddies();
    }
  };

  function renderActivitiesListItem({item}: {item: any}) {
    return <AiFriendsListItem item={item} />;
  }

  return (
    <CustomContainer
      isLoading={getAllBuddiesLoading}
      isError={getAllBuddiesFail}
      errorMsg={'Something went wrong'}
      onPress={refetchGetAllBuddies}>
      {getAllBuddiesSuccess && !getAllBuddiesLoading ? (
        <View style={styles.container}>
          <FlatList
            contentContainerStyle={{flexGrow: 1, marginTop: scale(12)}}
            data={getAllBuddiesData?.pages}
            renderItem={renderActivitiesListItem}
            showsVerticalScrollIndicator={false}
            numColumns={1}
            keyExtractor={(item: any) => JSON.stringify(item?.id)}
            horizontal={false}
            onEndReachedThreshold={0.5}
            onEndReached={() => {
              onLoadMore();
            }}
          />
        </View>
      ) : null}
    </CustomContainer>
  );
};

export default AiFriends;
const styles = StyleSheet.create({
  container: {flex: 1},
});
