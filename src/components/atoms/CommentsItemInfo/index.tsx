import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
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
import AvatarWithTitle from '../AvatarWithTitle';

const CommentsItemInfo = ({
  item,
  imgOnPress,
  setShowReply,
  setShowChildComments,
  likeAndDislike,
  isTopicComments = false,
  isAdmin = false,
}: {
  item: any;
  imgOnPress?: any;
  setShowReply: any;
  setShowChildComments: any;
  likeAndDislike: any;
  userLikes: number[];
  isTopicComments: boolean;
  isAdmin?: boolean;
}) => {
  const {userId} = useAuthStore(state => state);
  const {deleteCommentModal, setDeleteCommentModal} =
    useDeleteCommentModalStore(state => state);

  return (
    <View>
      <View style={styles.imgContainer}>
        <TouchableOpacity
          onPress={imgOnPress}
          style={styles.imgContainer}
          disabled={imgOnPress ? false : true}>
          <AvatarWithTitle
            name={item?.user?.userName != null ? item?.user?.userName : 'UN'}
            uri={item?.user?.photoUrl}
            onPress={imgOnPress}
            width={scale(36)}
            height={scale(36)}
            resizeMode={'cover'}
            borderRadius={scale(30)}
            fontSize={14}
          />
          <Text style={styles.userTxt} numberOfLines={1}>
            {item?.user?.userName != null ? item?.user?.userName : 'User'}
          </Text>
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
              <SvgXml
                xml={filledHeart}
                style={styles.heartImg}
                width={scale(16)}
                height={scale(16)}
              />
            ) : (
              <SvgXml
                xml={heart}
                style={styles.heartImg}
                width={scale(16)}
                height={scale(16)}
              />
            )}
          </TouchableOpacity>
        )}
      </View>
      <Pressable
        style={{}}
        onLongPress={() => {
          userId == item?.user?.id || isAdmin == true
            ? setDeleteCommentModal({
                showModal: true,
                isTopicComments: isTopicComments,
                commentId: item?.id,
              })
            : null;
        }}>
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

      <View style={styles.commentFooter}>
        <Text style={styles.footerTxt}>
          {item?.likeCount != undefined && item?.likeCount != null
            ? `${item?.likeCount} Likes`
            : `0 Likes`}{' '}
        </Text>
        {/* <Text style={styles.footerTxt}>{showTimeAgoText(item?.createdDate)}</Text> */}

        <View style={styles.footer}>
          {isAdmin == false && (
            <Text style={styles.footerTxt} onPress={setShowReply}>
              {' '}
              {`Reply`}
            </Text>
          )}

          <Divider orientation="vertical" />
          {item?.replyCount === 0 || item?.replyCount == undefined ? null : (
            <Text
              style={styles.footerTxt}
              onPress={
                setShowChildComments
              }>{`(${item?.replyCount}) replies`}</Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default CommentsItemInfo;

const styles = StyleSheet.create({
  userTxt: {
    color: Colors.txtLight,
    ...Fonts.mediumReg,
    marginLeft: scale(12),
    maxWidth: windowWidth * 0.5,
  },
  aiTxt: {
    color: Colors.txtMedium,
    ...Fonts.verySmallReg,
    marginLeft: scale(12),
    maxWidth: windowWidth * 0.5,
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
    justifyContent: 'space-between',
  },
  commentTxt: {
    color: Colors.txtLight,
    ...Fonts.smallReg,
    textAlign: 'justify',
    marginLeft: scale(46),
    marginRight: scale(20),
    paddingVertical: scale(10),
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
  },
  childContainer: {
    paddingHorizontal: scale(32),
    marginTop: scale(6),
  },
  heartImg: {marginLeft: scale(82)},
});
