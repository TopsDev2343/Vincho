import React, {useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {scale} from 'react-native-size-matters';

import {Colors} from '~/styles/colors';
import {Fonts} from '~/styles/fonts';
import {windowWidth} from '~/styles/globalStyles';
import AdminChildCommentItem from '~/components/atoms/AdminChildCommentItem';
import AdminCommentsItemInfo from '~/components/atoms/AdminCommentsItemInfo';
import {navigate} from '~/navigation/methods';
import {useAuthStore} from '~/stores';

const AdminCommentsItem = ({
  item,
  imgOnPress,
  isTopicComments = false,
}: {
  item: any;
  imgOnPress?: any;
  sendChildComment: any;
  childCommentLoading: boolean;
  createChildCommentSuccess: boolean;
  isTopicComments?: boolean;
}) => {
  const [showChildComments, setShowChildComments] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const {userId} = useAuthStore(state => state);

  function renderItem({item}: {item: any}) {
    return (
      <AdminChildCommentItem
        item={item}
        imgOnPress={() => {
          item?.userId != userId
            ? navigate('UserProfile', {
                entityId: item?.userId,
              })
            : navigate('Profile');
        }}
        isTopicComments={isTopicComments}
      />
    );
  }

  return (
    <View style={styles.container}>
      <AdminCommentsItemInfo
        item={item}
        imgOnPress={imgOnPress}
        setShowReply={() => setShowReply(!showReply)}
        setShowChildComments={() => setShowChildComments(!showChildComments)}
        isTopicComments={isTopicComments}
      />

      {showChildComments && (
        <FlatList
          style={styles.listContainer}
          data={item?.childComments}
          renderItem={renderItem}
          keyExtractor={item => item?.id}
          horizontal={false}
          showsHorizontalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default AdminCommentsItem;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scale(16),
    marginVertical: scale(12),
  },
  listContainer: {
    flex: 1,
    flexGrow: 1,
    marginVertical: scale(16),
  },
  userTxt: {
    color: Colors.txtLight,
    ...Fonts.mediumLight,
    marginLeft: scale(16),
    width: windowWidth * 0.25,
  },
  userImg: {
    width: scale(32),
    height: scale(32),
    resizeMode: 'cover',
    borderRadius: scale(30),
  },
  imgContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  commentFooter: {
    flexDirection: 'row',
    marginLeft: scale(36),
    marginRight: scale(30),
    justifyContent: 'space-between',
  },
  footer: {
    flexDirection: 'row',
  },
  footerTxt: {
    color: Colors.txtMedium,
    ...Fonts.verySmallReg,
    marginHorizontal: scale(6),
  },
  childContainer: {
    paddingHorizontal: scale(32),
    marginTop: scale(6),
  },
  heartImg: {marginLeft: scale(150)},
});
