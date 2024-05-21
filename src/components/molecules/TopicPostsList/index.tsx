import React from 'react';
import {StyleSheet, FlatList} from 'react-native';
import {scale} from 'react-native-size-matters';

import {Strings} from '~/assets/strings';
import {TopicPostsListItem, AlternativeScreen} from '~/components';
import {communityFill} from '~/assets/icons';

const TopicPostsList = ({
  data,
  onLoadMore,
  isLoading,
  refetch,
  isRefetching,
}: {
  data: object[];
  onLoadMore: any;
  isLoading: boolean;
  refetch: any;
  isRefetching: boolean;
}) => {
  function renderItem({item}: {item: any}) {
    return <TopicPostsListItem item={item} />;
  }

  return (
    <FlatList
      style={styles.container}
      horizontal={false}
      data={data}
      extraData={data}
      onRefresh={refetch}
      refreshing={isRefetching}
      renderItem={renderItem}
      keyExtractor={item => item?.id.toString()}
      onEndReachedThreshold={0.5}
      onEndReached={({distanceFromEnd}) => {
        if (distanceFromEnd < 0) return;
        onLoadMore();
      }}
      ListEmptyComponent={
        !isLoading ? (
          <AlternativeScreen msg={Strings.noPost} icon={communityFill} />
        ) : null
      }
    />
  );
};
export default TopicPostsList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: scale(12),
    zIndex: -10,
  },
});
