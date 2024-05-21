import React from 'react';

import {StyleSheet, FlatList} from 'react-native';
import {HashtagItem} from '~/components';
import {queryKeys} from '~/constants/queryKeys';
import {queryClient} from '~/graphql/AuthProvider';
import {navigate} from '~/navigation/methods';
import {usePostModalStore} from '~/stores';
import {windowWidth, windowHeight} from '~/styles/globalStyles';

const HashtagList = ({
  hashtagData,
  isTopic = false,
  style,
}: {
  hashtagData: object[];
  isTopic?: boolean;
  style?: any;
}) => {
  const {setShowPostModal} = usePostModalStore(state => state);
  function renderItem({item}: {item: any}) {
    return (
      <HashtagItem
        onPress={() => {
          if (isTopic == true) {
            queryClient.setQueryData(queryKeys.getTopicPostsByHashtagId, null);
            navigate('HashtagTopicPosts', {entityId: item?.id});
          } else {
            setShowPostModal(false),
              navigate('HashtagPosts', {entityId: item?.id});
          }
        }}
        hashtagName={item.title}
      />
    );
  }

  return (
    <FlatList
      style={[styles.container, style]}
      data={hashtagData}
      renderItem={renderItem}
      keyExtractor={item => item?.id}
      horizontal
      bounces={false}
      showsHorizontalScrollIndicator={false}
    />
  );
};
export default HashtagList;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: windowWidth * 0.05,
    marginVertical: windowHeight * 0.025,
    flexGrow: 0,
  },
});
