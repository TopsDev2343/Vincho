import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Image} from 'react-native';
import {scale} from 'react-native-size-matters';

import {postFileType} from '~/@types/global';
import {Colors} from '~/styles/colors';
import {Fonts} from '~/styles/fonts';
import {windowWidth} from '~/styles/globalStyles';
import {CustomImage, PostPlayVideo} from '~/components';
import {AvatarWithTitle} from '~/components';
import {width} from '~/utils/dimension';
import {ViolationType} from '~/generated/graphql';
import {getKeyByValue} from '~/utils/getKeyByValue';

const AdminReportItem = ({
  hasReview = false,
  item,
  imgOnPress,
  isPostReport,
}: {
  hasReview: boolean;
  item: object;
  imgOnPress?: any;
  isPostReport: boolean;
}) => {
  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        onPress={imgOnPress}
        style={styles.imgContainer}
        disabled={imgOnPress ? false : true}>
        <AvatarWithTitle
          onPress={() => {}}
          name={item?.reportedUser?.userName}
          uri={
            isPostReport
              ? item?.post?.user?.photoUrl
              : item?.reportedUser?.photoUrl
          }
          width={scale(48)}
          height={scale(48)}
          resizeMode={'cover'}
          borderRaduis={scale(30)}
        />

        <View style={styles.infoContainer}>
          <View style={styles.userInfoContainer}>
            <Text style={styles.itemTxt}>
              {isPostReport
                ? item?.reporterUser?.userName
                : item?.reportedUser?.userName}
            </Text>
            {hasReview && (
              <View style={styles.reviewContainer}>
                <View
                  style={[
                    styles.dot,
                    {
                      backgroundColor: item?.isReviewed
                        ? Colors.success
                        : Colors.error,
                    },
                  ]}
                />
                <Text
                  style={[
                    styles.reviewTxt,
                    {color: item?.isReviewed ? Colors.success : Colors.error},
                  ]}>
                  {item?.isReviewed ? 'Reviewed' : 'Not Reviewed'}
                </Text>
              </View>
            )}
          </View>

          {isPostReport ? (
            <View>
              <Text
                style={
                  styles.timeTxt
                }>{`Reported by ${item?.reporterUser?.userName} at `}</Text>
              <Text style={styles.timeTxt}>
                {' '}
                {`${item?.createdDate.split('T')[0]} ${item?.createdDate
                  .split('T')[1]
                  .slice(0, 5)}`}
                {' - '}
                {getKeyByValue(item?.violationType, ViolationType)}
              </Text>
            </View>
          ) : (
            <Text style={styles.timeTxt}>
              {`Reported by ${item?.reporterUser?.userName} at ${
                item?.createdDate.split('T')[0]
              } ${item?.createdDate.split('T')[1].slice(0, 5)}`}
              {' - '}
              {getKeyByValue(item?.violationType, ViolationType)}
            </Text>
          )}
        </View>
      </TouchableOpacity>

      {isPostReport ? (
        item?.post?.fileUrl ? (
          item?.post?.fileType === postFileType.Video ? (
            <View style={{flex: 2}}>
              <PostPlayVideo
                uri={item?.post?.fileUrl}
                width={windowWidth * 0.17}
              />
            </View>
          ) : item?.post?.fileType === postFileType.Image ? (
            <View style={{flex: 2}}>
              <CustomImage
                imageSource={item?.post?.fileUrl}
                style={styles.galleryItem}
                resizeMode="cover"
              />
            </View>
          ) : null
        ) : null
      ) : null}
    </View>
  );
};

export default AdminReportItem;

const styles = StyleSheet.create({
  itemContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: scale(6),
    marginTop: scale(6),
    flexDirection: 'row',
    paddingHorizontal: scale(6),
    paddingVertical: scale(6),
    flex: 1,
  },
  itemTxt: {
    width: width / 4,
    numberOfLines: 1,
    ellipsizeMode: 'tail',
    color: Colors.txtLight,
    ...Fonts.mediumReg,
  },
  itemImg: {
    width: scale(48),
    height: scale(48),
    resizeMode: 'cover',
    borderRadius: scale(30),
  },
  imgContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 8,
  },
  timeTxt: {
    color: Colors.txtMedium,
    ...Fonts.verySmallReg,
    textAlign: 'left',
    flexWrap: 'wrap',
    marginTop: scale(2),
  },
  reviewTxt: {
    marginLeft: scale(6),
    ...Fonts.verySmallLight,
    textAlign: 'center',
    flexWrap: 'wrap',
  },
  infoContainer: {
    marginLeft: scale(16),
    flex: 8,
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  reviewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: scale(12),
    marginRight: scale(4),
  },
  dot: {
    width: scale(8),
    height: scale(8),
    borderRadius: scale(8),
  },
  galleryItem: {
    backgroundColor: Colors.background,
    marginHorizontal: scale(3),
    marginVertical: scale(3),
    alignItems: 'center',
    justifyContent: 'center',
    width: windowWidth * 0.17,
    height: windowWidth * 0.17,
  },
});
