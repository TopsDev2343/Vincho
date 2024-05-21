import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Image} from 'react-native';
import {scale} from 'react-native-size-matters';

import {Colors} from '~/styles/colors';
import {Fonts} from '~/styles/fonts';
import {avatar} from '~/assets/images';
import {postFileType} from '~/@types/global';
import {CustomImage, PostPlayVideo} from '~/components';
import {windowWidth} from '~/styles/globalStyles';
import {dataProvider} from '~/utils/userActivitiesDataProvider';
import {navigate} from '~/navigation/methods';
import snackBar from '~/utils/snackBar';

const UserActivitiesListItem = ({item}: {item: any}) => {
  const [modifiedItem, setModifiedItem] = useState<object>({});

  useEffect(() => {
    setModifiedItem(dataProvider(item));
  }, []);

  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        disabled={item?.targetUser == null}
        onPress={() => {
          if (item?.targetUser != null) {
            if (item?.targetUser?.isActive == true) {
              navigate('OtherUserProfile', {
                entityId: item?.targetUser?.id,
              });
            } else {
              snackBar({
                message: 'This user has been disabled by admin',
                color: Colors.error,
              });
            }
          }
        }}
        style={styles.imgContainer}>
        {modifiedItem?.user?.photoUrl ? (
          <CustomImage
            imageSource={modifiedItem?.user?.photoUrl}
            style={styles.itemImg}
          />
        ) : (
          <Image source={avatar} style={styles.itemImg} />
        )}
        <Text style={styles.itemTxt}>
          {modifiedItem?.activityDesc}
          <Text style={styles.itemDateTxt}>
            {'\n'}
            {modifiedItem?.createDate}
          </Text>
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          if (item?.targetPost != null) {
            navigate('PostDetail', {entityId: item?.targetPost?.id});
          } else if (item?.targetComment != null) {
            navigate('PostDetail', {entityId: item?.targetComment?.post?.id});
          } else if (item?.targetUser != null) {
            if (item?.targetUser?.isActive == true) {
              navigate('OtherUserProfile', {
                entityId: item?.targetUser?.id,
              });
            } else {
              snackBar({
                message: 'This user has been disabled by admin',
                color: Colors.error,
              });
            }
          } else if (item?.targetTopicPost != null) {
            navigate('TopicPostDetailScreen', {
              postId: item?.targetTopicPost?.id,
            });
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
export default UserActivitiesListItem;

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
    width: windowWidth * 0.5,
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
