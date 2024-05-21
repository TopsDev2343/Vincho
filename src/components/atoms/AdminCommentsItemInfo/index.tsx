import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  Pressable,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import {Divider} from 'native-base';
import {SvgXml} from 'react-native-svg';

import {Colors} from '~/styles/colors';
import {Fonts} from '~/styles/fonts';
import {heart, filledHeart} from '~/assets/icons';
import {windowWidth} from '~/styles/globalStyles';
import {useAuthStore} from '~/stores';
import {useDeleteCommentModalStore} from '~/stores';
import {showTimeAgoText} from '~/utils/showTimeAgoText';
import CustomImage from '../CustomImage';

const AdminCommentsItemInfo = ({
  item,
  imgOnPress,
  setShowReply,
  setShowChildComments,
  isTopicComments = false,
}: {
  item: any;
  imgOnPress?: any;
  setShowReply: any;
  setShowChildComments: any;
  isTopicComments: boolean;
}) => {
  const {userId} = useAuthStore(state => state);
  const {setDeleteCommentModal} = useDeleteCommentModalStore(state => state);

  return (
    <View>
      <View style={styles.imgContainer}>
        <TouchableOpacity
          onPress={imgOnPress}
          style={styles.imgContainer}
          disabled={imgOnPress ? false : true}>
          <CustomImage
            imageSource={item?.user?.photoUrl}
            style={styles.userImg}
          />
          <Text style={styles.userTxt}>{item?.user?.userName}</Text>
        </TouchableOpacity>
      </View>
      <Pressable
        onLongPress={() =>
          setDeleteCommentModal({
            showModal: true,
            isTopicComments: isTopicComments,
            commentId: item?.id,
          })
        }>
        {({pressed}) => (
          <Text
            style={[
              styles.commentTxt,
              [
                {
                  color: pressed ? Colors.txtMedium : Colors.txtLight,
                },
              ],
            ]}>
            {item?.commentText}
          </Text>
        )}
      </Pressable>

      <View style={styles.commentFooter}>
        <Text style={styles.footerTxt}>
          {showTimeAgoText(item?.createdDate)}
        </Text>
        <Text style={styles.footerTxt}>{`${item?.likeCount} Likes`}</Text>

        <View style={styles.footer}>
          {item?.childComments?.length === 0 ? null : (
            <Text
              style={styles.footerTxt}
              onPress={
                setShowChildComments
              }>{`Show all replies(${item?.childComments?.length})`}</Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default AdminCommentsItemInfo;

const styles = StyleSheet.create({
  userTxt: {
    color: Colors.txtLight,
    ...Fonts.mediumReg,
    marginLeft: scale(12),
    width: windowWidth * 0.25,
  },
  userImg: {
    width: scale(36),
    height: scale(36),
    resizeMode: 'cover',
    borderRadius: scale(30),
  },
  imgContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentTxt: {
    color: Colors.txtLight,
    ...Fonts.smallReg,
    textAlign: 'justify',
    marginLeft: scale(46),
    marginRight: scale(20),
    lineHeight: scale(18),
  },
  commentFooter: {
    flexDirection: 'row',
    marginLeft: scale(44),
    marginRight: scale(36),
    width: windowWidth * 0.88,
    flexWrap: 'wrap',
  },
  footer: {
    flexDirection: 'row',
  },
  footerTxt: {
    color: Colors.txtMedium,
    ...Fonts.verySmallReg,
    marginHorizontal: scale(3),
    marginRight: scale(10),
  },
  childContainer: {
    paddingHorizontal: scale(32),
    marginTop: scale(6),
  },
  heartImg: {marginLeft: scale(164)},
});
