import React from 'react';
import {StyleSheet, FlatList} from 'react-native';
import {scale} from 'react-native-size-matters';
import {Strings} from '~/assets/strings';

import {TopicsItem, AlternativeScreen} from '~/components';

const AllTopicsList = ({
  topicData,
  onLoadMore,
  showAllTopic,
  isUserTopic,
  isLoading,
  refetch,
  isRefetching,
  isAdmin,
}: {
  topicData: any;
  onLoadMore: any;
  showAllTopic: boolean;
  isUserTopic: boolean;
  isLoading: boolean;
  refetch: any;
  isRefetching: boolean;
  isAdmin: boolean;
}) => {
  function renderItem({item}: {item: any}) {
    return (
      <TopicsItem
        item={item?.topic}
        isUserTopic={isUserTopic}
        isAdmin={isAdmin}
      />
    );
  }

  function listEmpty() {
    return <AlternativeScreen msg={Strings.noTopic} />;
  }

  return (
    <FlatList
      style={styles.container}
      extraData={topicData}
      horizontal={false}
      data={topicData}
      onRefresh={refetch}
      refreshing={isRefetching}
      renderItem={renderItem}
      keyExtractor={item => item?.topic?.id.toString()}
      onEndReachedThreshold={0.5}
      onEndReached={({distanceFromEnd}) => {
        if (distanceFromEnd < 0) return;
        onLoadMore();
      }}
      ListEmptyComponent={!isLoading ? listEmpty : null}
    />
  );
};
export default AllTopicsList;

const styles = StyleSheet.create({
  container: {
    marginTop: scale(12),
    zIndex: -10,
  },
});
