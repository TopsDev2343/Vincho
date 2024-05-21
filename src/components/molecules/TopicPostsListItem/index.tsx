import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {scale} from 'react-native-size-matters';

import {Colors} from '~/styles/colors';
import {Fonts} from '~/styles/fonts';
import {UserShortInfo} from '~/components';
import {showTimeAgoText} from '~/utils/showTimeAgoText';
import {Strings} from '~/assets/strings';
import {navigate} from '~/navigation/methods';
import {useClickedPostInfoStore} from '~/stores';

const TopicPostsListItem = ({item}: {item: any}) => {
  const {postInfo, setPostInfo} = useClickedPostInfoStore(state => state);

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.7}
      onPress={() => navigate('TopicPostDetailScreen', {postId: item?.id})}>
      <UserShortInfo
        name={item?.user?.userName}
        img={item?.user?.photoUrl}
        imgOnPress={() => navigate('TopicPostDetailScreen', {postId: item?.id})}
        onLineTime={showTimeAgoText(item?.createdDate)}
      />

      <View style={styles.postInfoContainer}>
        <Text style={styles.captionTxt} numberOfLines={3}>
          {item?.caption}
        </Text>

        <Text style={styles.seeMoreTxt}>{Strings.seeMore}</Text>

        <View style={styles.footer}>
          <Text
            style={styles.footerTxt}
            onPress={() => {
              setPostInfo(item);
              navigate('TopicFollowScreen', {
                postId: item?.id,
              });
            }}>
            {item?.likeCount != null
              ? item?.likeCount > 1
                ? item?.likeCount + ' Likes'
                : item?.likeCount + ' Like'
              : '0 Like'}
          </Text>
          <Text
            style={styles.footerTxt}
            onPress={() => {
              setPostInfo(item);
              navigate('TopicCommentScreen', {
                postId: item?.id,
              });
            }}>
            {item?.commentCount != null
              ? item?.commentCount > 1
                ? item?.commentCount + ' Comments'
                : item?.commentCount + ' Comment'
              : '0 Comment'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TopicPostsListItem;

const styles = StyleSheet.create({
  container: {
    marginBottom: scale(12),
  },
  postInfoContainer: {
    marginHorizontal: scale(24),
  },
  captionTxt: {
    color: Colors.txtLight,
    ...Fonts.smallLight,
    textAlign: 'left',
  },
  footer: {
    flexDirection: 'row',

    marginTop: scale(4),
  },
  footerTxt: {
    color: Colors.txtLight,
    ...Fonts.verySmallReg,
    marginRight: scale(24),
  },
  seeMoreTxt: {
    color: Colors.primary,
    ...Fonts.smallLight,
    textAlign: 'left',
  },
});
