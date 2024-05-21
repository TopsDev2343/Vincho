import React, {useRef} from 'react';
import {StyleSheet, FlatList, View} from 'react-native';

import {AlternativeScreen} from '~/components';
import {windowWidth} from '~/styles/globalStyles';
import {Strings} from '~/assets/strings/index';
import AdminExplorePostItem from '../AdminExplorePostItem';
import {scale} from 'react-native-size-matters';

const AdminExplorePostList = ({
  postsData,
  onLoadMore,
  isLoading,
  isTopic,
}: {
  postsData: any;
  onLoadMore: any;
  isLoading: boolean;
  isTopic?: boolean;
}) => {
  const flatlistRef = useRef(null);

  function renderPostsItem({item, index}: {item: any; index: number}) {
    return (
      <AdminExplorePostItem
        isTopic={isTopic}
        item={item}
        imgOnPress={() => {}}
        menuOnPress={() => {}}
      />
    );
  }

  function listEmpty() {
    return (
      <View style={styles.emptyTxt}>
        <AlternativeScreen msg={Strings.emptyString} />
      </View>
    );
  }

  return (
    <FlatList
      extraData={postsData}
      style={styles.container}
      ref={flatlistRef}
      data={postsData}
      legacyImplementation={true}
      renderItem={renderPostsItem}
      keyExtractor={item => item?.id.toString()}
      onEndReachedThreshold={0.5}
      onEndReached={({distanceFromEnd}) => {
        if (distanceFromEnd < 0) return;
        onLoadMore();
      }}
      ListEmptyComponent={!isLoading || postsData != null ? listEmpty : null}
    />
  );
};
export default AdminExplorePostList;

const styles = StyleSheet.create({
  container: {
    marginBottom: scale(10),
  },
  emptyTxt: {
    width: windowWidth,
  },
});
