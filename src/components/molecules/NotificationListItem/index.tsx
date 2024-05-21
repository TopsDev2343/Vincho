import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Image} from 'react-native';
import {scale} from 'react-native-size-matters';

import {Colors} from '~/styles/colors';
import {Fonts} from '~/styles/fonts';
import {avatar} from '~/assets/images';
import {postFileType} from '~/@types/global';
import {AvatarWithTitle, CustomImage, PostPlayVideo} from '~/components';
import {windowWidth} from '~/styles/globalStyles';
import {dataProvider} from '~/utils/notificationDataProvider';
import {ActivityType, NotificationType} from '~/generated/graphql';
import {navigate, navigateDispatch} from '~/navigation/methods';
import snackBar from '~/utils/snackBar';

const NotificationListItem = ({item}: {item: any}) => {
  const [modifiedItem, setModifiedItem] = useState<object>({});

  useEffect(() => {
    setModifiedItem(dataProvider(item));
  }, []);

  var messageDescription = '';
  switch (item?.notificationType) {
    case NotificationType.CreateActivity:
      let userName = item?.activity?.user?.userName;
      if (userName == null || userName == undefined) {
        userName = 'Someone';
      }
      switch (item?.activity?.activityType) {
        case ActivityType.Comment:
          messageDescription = userName + ' commented on your post ';
          break;
        case ActivityType.Like:
          messageDescription = userName + ' liked your post ';
          break;
        case ActivityType.Follow:
          messageDescription = userName + ' followed you ';
          break;
        case ActivityType.Report:
          messageDescription = userName + ' reported your post ';
          break;
        case ActivityType.TopicPostLike:
          messageDescription = userName + ' liked your topic post ';
          break;
        case ActivityType.TopicPostComment:
          messageDescription = userName + ' commented on your topic post ';
          break;
        case ActivityType.LikeComment:
          messageDescription = userName + ' liked your comment ';
          break;
        case ActivityType.DisLikeComment:
          messageDescription = userName + ' unliked your comment ';
          break;
        case ActivityType.UnLike:
          messageDescription = userName + ' unliked your post ';
          break;
        case ActivityType.TopicPostUnLike:
          messageDescription = userName + ' unliked your topic post ';
          break;
        case ActivityType.Share:
          messageDescription = userName + ' shared your post ';
          break;
        case ActivityType.Save:
          messageDescription = userName + ' saved your post ';
          break;
        case ActivityType.UnSave:
          messageDescription = userName + ' unsaved your post ';
          break;
      }
      break;

    case NotificationType.CreateChat:
      messageDescription = 'You have a new message! ';
      break;

    case NotificationType.InviteToTopic:
      messageDescription = 'You have been invited to a topic! ';
      break;
    case NotificationType.PostDeletedByAdmin:
      messageDescription = 'Your post has been deleted by admin! ';
      break;
    case NotificationType.SetAsRecommended:
      messageDescription = 'Your post has been recommended by admin! ';
      break;
  }
  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        disabled={
          item?.activity?.targetUser == null &&
          item?.notificationType != NotificationType.CreateChat
        }
        onPress={() => {
          if (item?.notificationType == NotificationType.CreateChat) {
            navigate('Conversation', {
              receiverId: item?.message?.senderId,
              headerData: item?.user,
              conversationId: item?.message?.conversationId,
            });
          } else {
            if (item?.activity?.targetUser != null) {
              if (item?.activity?.targetUser?.isActive == true) {
                navigateDispatch('OtherUserProfile', {
                  entityId: item?.activity?.user?.id,
                });
              } else {
                snackBar({
                  message: 'This user has been disabled by admin',
                  color: Colors.error,
                });
              }
            }
          }
        }}
        style={styles.imgContainer}>
        {modifiedItem?.user?.photoUrl ? (
          <CustomImage
            imageSource={modifiedItem?.user?.photoUrl}
            style={styles.itemImg}
            resizeMode="cover"
          />
        ) : (
          <AvatarWithTitle
            name={modifiedItem?.user?.userName}
            width={scale(50)}
            height={scale(50)}
            borderRadius={scale(50)}
          />
        )}
        <Text style={styles.itemTxt}>
          {messageDescription}
          <Text style={styles.itemDateTxt}>
            {'\n'}
            {modifiedItem?.createDate}
          </Text>
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          if (item?.activity) {
            if (item?.activity?.targetPost != null) {
              navigate('PostDetail', {
                entityId: item?.activity?.targetPost?.id,
              });
            } else if (item?.activity?.targetComment != null) {
              navigate('PostDetail', {
                entityId: item?.activity?.targetComment?.post?.id,
              });
            } else if (item?.activity?.targetUser != null) {
              if (item?.activity?.targetUser?.isActive == true) {
                navigateDispatch('OtherUserProfile', {
                  entityId: item?.activity?.targetUser?.id,
                });
              } else {
                snackBar({
                  message: 'This user has been disabled by admin',
                  color: Colors.error,
                });
              }
            } else if (item?.activity?.targetTopicPost != null) {
              navigate('TopicPostDetailScreen', {
                postId: item?.activity?.targetTopicPost?.id,
              });
            }
          } else {
            if (item?.post != null) {
              navigate('PostDetail', {
                entityId: item?.post.id,
              });
            }
          }
        }}
        activeOpacity={0.7}>
        {modifiedItem?.fileUrl ? (
          modifiedItem?.fileType === postFileType.Video ? (
            <PostPlayVideo
              uri={modifiedItem?.fileUrl}
              width={windowWidth * 0.12}
            />
          ) : modifiedItem?.fileType === postFileType.Image ? (
            <CustomImage
              imageSource={modifiedItem?.fileUrl}
              style={styles.galleryItem}
            />
          ) : null
        ) : null}
      </TouchableOpacity>
    </View>
  );
};
export default NotificationListItem;

const styles = StyleSheet.create({
  itemContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: scale(16),
    marginVertical: scale(12),
    backgroundColor: Colors.transparent,
    flexDirection: 'row',
    paddingHorizontal: scale(6),
  },
  itemTxt: {
    color: Colors.txtLight,
    marginLeft: scale(12),
    ...Fonts.verySmallReg,
    width: windowWidth * 0.55,
    flexWrap: 'wrap',
  },
  itemImg: {
    width: scale(50),
    height: scale(50),
    resizeMode: 'cover',
    borderRadius: scale(30),
  },
  imgContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  galleryItem: {
    backgroundColor: Colors.background,
    marginHorizontal: scale(3),
    marginVertical: scale(3),
    alignItems: 'center',
    justifyContent: 'center',
    width: windowWidth * 0.12,
    height: windowWidth * 0.12,
  },

  itemDateTxt: {
    color: Colors.disabled,
    ...Fonts.verySmallReg,
    lineHeight: scale(20),
  },
});
