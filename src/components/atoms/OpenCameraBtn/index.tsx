import React from 'react';
import {TouchableOpacity, StyleSheet, View} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {scale} from 'react-native-size-matters';

import {Colors} from '~/styles/colors';
import {camera, cameraLight, chooseGallery} from '~/assets/icons';
import {windowWidth} from '~/styles/globalStyles';

const OpenCameraBtn = ({
  onPressOpenCamera,
  itemWidth,
}: {
  onPressOpenCamera: any;
  itemWidth: number;
}) => {
  return (
    <TouchableOpacity onPress={onPressOpenCamera}>
      <View
        style={[
          styles.galleryItem,
          {
            width: windowWidth * itemWidth,
            height: windowWidth * itemWidth,
          },
        ]}>
        <View style={styles.shinyDot} />
        <View style={styles.shinyCircle}>
          <SvgXml xml={cameraLight} width={scale(24)} height={scale(24)} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default OpenCameraBtn;

const styles = StyleSheet.create({
  galleryItem: {
    backgroundColor: Colors.onBackground,
    marginHorizontal: scale(5),
    marginVertical: scale(3),
    alignItems: 'center',
    justifyContent: 'center',
  },
  shinyDot: {
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.5)',
    width: scale(6),
    height: scale(6),
    borderWidth: scale(0.2),
    shadowColor: 'rgba(255,255,255,1)',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    zIndex: 10,
    marginRight: scale(26),
    marginBottom: -scale(8),
    shadowOpacity: 10,
    elevation: 6,
  },
  shinyCircle: {
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(71,54,75)',
    width: scale(36),
    height: scale(36),
    borderWidth: scale(0.2),
    borderColor: 'rgba(255,255,255,1)',
    shadowColor: 'rgba(255,255,255,0.7)',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    elevation: 6,
  },
});
