import React from 'react';
import {scale} from 'react-native-size-matters';

import {
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors} from '~/styles/colors';
import {windowWidth} from '~/styles/globalStyles';
import {formats} from '~/@types/global';
import {OpenCameraBtn} from '~/components';
import Video from 'react-native-video';

const GalleryItemShow = ({
  item,
  setSelectedPost,
  openGallery,
  itemWidth,
  openCamera,
}: {
  item: object;
  setSelectedPost: any;
  openGallery: any;
  itemWidth: number;
  openCamera: any;
}) => {
  return (
    <TouchableOpacity
      onPress={() =>
        item?.node === null
          ? console.log('show gallery')
          : Platform.OS == 'ios'
          ? setSelectedPost({
              uri: item?.uri,
              type: item?.type,
              width: item?.width,
              height: item?.height,
              imagePicker: {
                path: item?.uri,
                mime: `${item?.type}/${item?.imagePicker?.filename
                  ?.split('.')
                  .pop()}`,
                filename: item?.imagePicker?.filename,
              },
            })
          : setSelectedPost({
              uri: item?.uri,
              type: item?.type,
              width: item?.width,
              height: item?.height,
              imagePicker: {
                path: item?.uri,
                mime: item?.imagePicker?.mime,
                filename: item?.imagePicker?.filename,
              },
            })
      }>
      {item?.type === formats.Video && (
        <View style={styles.galleryItem}>
          <Video
            source={{uri: item?.uri}}
            resizeMode={'cover'}
            muted={true}
            paused={true}
            style={{
              width: windowWidth * itemWidth,
              backgroundColor: Colors.background,
              height: windowWidth * itemWidth,
              flex: 1,
              alignSelf: 'flex-end',
            }}
          />
        </View>
      )}

      {item?.type === formats.Image && (
        <Image
          source={{uri: item?.uri}}
          style={[
            styles.galleryItem,
            {
              width: windowWidth * itemWidth,
              height: windowWidth * itemWidth,
            },
          ]}
        />
      )}

      {item?.node === null && (
        <OpenCameraBtn onPressOpenCamera={openCamera} itemWidth={0.3} />
      )}
    </TouchableOpacity>
  );
};

export default GalleryItemShow;

const styles = StyleSheet.create({
  galleryItem: {
    backgroundColor: Colors.background,
    marginHorizontal: scale(5),
    marginVertical: scale(3),
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
