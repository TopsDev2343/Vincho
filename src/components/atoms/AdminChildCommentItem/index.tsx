import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Pressable,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import {Colors} from '~/styles/colors';
import {Fonts} from '~/styles/fonts';
import {windowWidth} from '~/styles/globalStyles';
import {useDeleteCommentModalStore} from '~/stores';
import {showTimeAgoText} from '~/utils/showTimeAgoText';
import CustomImage from '../CustomImage';

const AdminChildCommentItem = ({
  item,
  imgOnPress,
  isTopicComments = false,
}: {
  item: any;
  imgOnPress?: any;
  isTopicComments?: boolean;
}) => {
  const {setDeleteCommentModal} = useDeleteCommentModalStore(state => state);

  return (
    <View style={styles.childContainer}>
      <View style={styles.imgContainer}>
        <TouchableOpacity
          onPress={imgOnPress}
          style={styles.userInfo}
          disabled={imgOnPress ? false : true}>
          <CustomImage
            imageSource={item?.user?.photoUrl}
            style={styles.userImg}
          />
          <Text style={[styles.userTxt]}>{item?.user?.userName}</Text>
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

      <Text style={styles.footerTxt}>{showTimeAgoText(item?.createdDate)}</Text>
      <Text style={styles.footerTxt}>{`${item?.likeCount} Likes`}</Text>
    </View>
  );
};

export default AdminChildCommentItem;

const styles = StyleSheet.create({
  userInfo: {flexDirection: 'row'},
  userTxt: {
    color: Colors.txtLight,
    ...Fonts.smallReg,
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
    justifyContent: 'space-between',
    width: windowWidth * 0.82,
  },
  commentTxt: {
    color: Colors.txtLight,
    ...Fonts.smallReg,
    textAlign: 'justify',
    marginHorizontal: scale(4),
    marginVertical: scale(3),
    lineHeight: scale(18),
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
    marginRight: scale(10),
  },
  childContainer: {
    paddingHorizontal: scale(32),
    marginVertical: scale(8),
  },
});
