import React, {useEffect} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {scale} from 'react-native-size-matters';

import {CustomContainer, UserActivitiesListItem} from '~/components';
import {useAuthStore} from '~/stores';
import {useGetActivitiesByUserId} from '~/hooks/artist/Activities';

const UserActivities = () => {
  const {userId} = useAuthStore(state => state);

  const {
    isLoading: getActivitiesLoading,
    data: getActivitiesData,
    isSuccess: getActivitiesSuccess,
    isError: getActivitiesFail,
    //error: getAllTopicErrorMsg,
    fetchNextPage: fetchNextPageGetActivities,
    hasNextPage: hasNextPageGetActivities,
    refetch: refetchGetActivities,
  } = useGetActivitiesByUserId({userId: userId});

  useEffect(() => {
    refetchGetActivities();
  }, []);

  const onLoadMore = () => {
    if (hasNextPageGetActivities) {
      fetchNextPageGetActivities();
    }
  };

  function renderActivitiesListItem({item}: {item: any}) {
    return <UserActivitiesListItem item={item} />;
  }

  return (
    <CustomContainer
      isLoading={getActivitiesLoading}
      isError={getActivitiesFail}
      errorMsg={'Something went wrong'}
      onPress={refetchGetActivities}>
      {getActivitiesSuccess && !getActivitiesLoading ? (
        <View style={{flex: 1}}>
          <FlatList
            contentContainerStyle={{flexGrow: 1, marginTop: scale(12)}}
            data={getActivitiesData?.pages}
            renderItem={renderActivitiesListItem}
            showsVerticalScrollIndicator={false}
            numColumns={1}
            keyExtractor={(item: any) => JSON.stringify(item?.id)}
            horizontal={false}
            onEndReachedThreshold={0.5}
            onEndReached={({distanceFromEnd}) => {
              onLoadMore();
            }}
          />
        </View>
      ) : null}
    </CustomContainer>
  );
};

export default UserActivities;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
