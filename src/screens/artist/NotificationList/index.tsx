import React, {useEffect} from 'react';
import {View, FlatList} from 'react-native';
import {scale} from 'react-native-size-matters';

import {CustomContainer, NotificationListItem} from '~/components';
import {useGetNotifications} from '~/hooks/artist/Activities';

const NotificationList = () => {
  const {
    isLoading,
    data,
    isSuccess,
    isError,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useGetNotifications();

  useEffect(() => {
    refetch();
  }, []);

  const onLoadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  function renderActivitiesListItem({item}: {item: any}) {
    return <NotificationListItem item={item} />;
  }

  return (
    <CustomContainer
      isLoading={isLoading}
      isError={isError}
      errorMsg={'Something went wrong'}
      onPress={refetch()}>
      {isSuccess && !isLoading ? (
        <View style={{flex: 1}}>
          <FlatList
            contentContainerStyle={{flexGrow: 1, marginTop: scale(12)}}
            data={data?.pages}
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

export default NotificationList;
