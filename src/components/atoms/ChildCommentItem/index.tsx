import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Pressable,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import {SvgXml} from 'react-native-svg';

import {Colors} from '~/styles/colors';
import {Fonts} from '~/styles/fonts';
import {heart, filledHeart} from '~/assets/icons';
import {windowWidth} from '~/styles/globalStyles';
import {useAuthStore} from '~/stores';
import {useDeleteCommentModalStore} from '~/stores';
import AvatarWithTitle from '../AvatarWithTitle';

const ChildCommentItem = ({
  item,
  imgOnPress,
  likeAndDislike,
  isTopicComments = false,
  isAdmin = false,
}: {
  item: any;
  imgOnPress?: any;
  likeAndDislike: any;
  userLikes: number[];
  isTopicComments?: boolean;
  isAdmin?: boolean;
}) => {
  const {userId} = useAuthStore(state => state);
  const {deleteCommentModal, setDeleteCommentModal} =
    useDeleteCommentModalStore(state => state);
  return (
    <View style={styles.childContainer}>
      <View style={styles.imgContainer}>
        <TouchableOpacity
          onPress={imgOnPress}
          style={styles.userInfo}
          disabled={imgOnPress ? false : true}>
          <AvatarWithTitle
            name={item?.user?.userName}
            uri={item?.user?.photoUrl}
            onPress={imgOnPress}
            width={scale(32)}
            height={scale(32)}
            resizeMode={'cover'}
            borderRadius={scale(30)}
            fontSize={14}
          />
          <Text style={[styles.userTxt]}>{item?.user?.userName}</Text>
          {/* AiFriend */}
          {item?.user?.isAi != null && (
            <Text style={styles.aiTxt} numberOfLines={1}>
              AI Friend
            </Text>
          )}
        </TouchableOpacity>

        {isAdmin == false && (
          <TouchableOpacity
            onPress={() => likeAndDislike(item?.id, item?.isLiked)}>
            {item?.isLiked ? (
              <SvgXml xml={filledHeart} width={scale(16)} height={scale(16)} />
            ) : (
              <SvgXml xml={heart} width={scale(16)} height={scale(16)} />
            )}
          </TouchableOpacity>
        )}
      </View>

      <Pressable
        onLongPress={() =>
          userId == item?.user?.id || isAdmin == true
            ? setDeleteCommentModal({
                showModal: true,
                isTopicComments: isTopicComments,
                commentId: item?.id,
              })
            : null
        }>
        {({pressed}) => (
          <Text
            style={[
              styles.commentTxt,
              [
                {
                  backgroundColor:
                    deleteCommentModal.showModal == true &&
                    deleteCommentModal.commentId == item?.id
                      ? Colors.actionSheetColor
                      : Colors.transparent,
                  color: pressed ? Colors.txtMedium : Colors.txtLight,
                },
              ],
            ]}>
            {item?.commentText}
          </Text>
        )}
      </Pressable>

      <Text style={styles.footerTxt}>{`${item?.likeCount} Likes`}</Text>
    </View>
  );
};

export default ChildCommentItem;

const styles = StyleSheet.create({
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  userTxt: {
    color: Colors.txtLight,
    ...Fonts.smallReg,
    alignSelf: 'center',
    marginLeft: scale(16),
    maxWidth: windowWidth * 0.5,
  },
  aiTxt: {
    color: Colors.txtMedium,
    ...Fonts.verySmallReg,
    marginLeft: scale(12),
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
    paddingVertical: scale(10),
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
    marginVertical: scale(8),
  },
});
