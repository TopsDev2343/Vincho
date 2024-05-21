import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import {Progress} from 'native-base';
import {SvgXml} from 'react-native-svg';

import {Colors} from '~/styles/colors';
import {Fonts} from '~/styles/fonts';
import {postFileType} from '~/@types/global';
import {CustomImage, PostPlayVideo} from '~/components';
import {windowWidth} from '~/styles/globalStyles';

const PostStatisticsListItem = ({
  fileUrl,
  progressPercent,
  progressValue,
  icon,
  fileType,
  progressSubject,
}: {
  fileUrl: string;
  progressPercent: number;
  progressValue: number;
  icon: string;
  fileType: string;
  progressSubject: string;
}) => {
  return (
    <View style={styles.container}>
      <View style={{flex: 2, overflow: 'hidden'}}>
        {fileUrl ? (
          fileType === postFileType.Video ? (
            <PostPlayVideo uri={fileUrl} width={windowWidth * 0.16} />
          ) : fileType === postFileType.Image ? (
            <CustomImage
              imageSource={fileUrl}
              style={styles.galleryItem}
              resizeMode={'cover'}
            />
          ) : null
        ) : null}
      </View>

      <View style={styles.progressContainer}>
        <Progress
          bg={Colors.txtMedium}
          _filledTrack={{
            bg: Colors.primary,
          }}
          value={progressPercent}
          size={'md'}
        />

        <View style={styles.likeInfoContainer}>
          <Text style={styles.itemTxt}>
            {progressValue} {progressSubject}
          </Text>
          <SvgXml xml={icon} width={scale(16)} />
        </View>
      </View>
    </View>
  );
};
export default PostStatisticsListItem;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: scale(16),
    marginVertical: scale(12),
    backgroundColor: Colors.transparent,
    flexDirection: 'row',
    paddingHorizontal: scale(6),
    flex: 1,
  },
  likeInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scale(12),
  },
  itemTxt: {
    color: Colors.txtLight,
    ...Fonts.verySmallReg,
    marginRight: scale(12),
    flexWrap: 'wrap',
  },
  galleryItem: {
    backgroundColor: Colors.background,
    marginHorizontal: scale(3),
    marginVertical: scale(3),
    alignItems: 'center',
    justifyContent: 'center',
    width: windowWidth * 0.16,
    height: windowWidth * 0.16,
  },
  progressContainer: {
    flex: 8,
    marginLeft: scale(16),
  },
});
