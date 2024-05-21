import React from 'react';
import {StyleSheet, View, Image} from 'react-native';

import {windowHeight, windowWidth} from '~/styles/globalStyles';
import {Colors} from '~/styles/colors';
import {formats} from '~/@types/global';
import {PlayVideo} from '~/components';

const SendPostPreview = ({selectedImg}: {selectedImg: object}) => {
  return (
    <View style={styles.container}>
      {selectedImg?.type === formats.Video && (
        <View style={styles.img}>
          <PlayVideo uri={selectedImg?.uri} />
        </View>
      )}

      {selectedImg?.type === formats.Image && (
        <Image
          source={{uri: selectedImg?.uri}}
          style={styles.img}
          resizeMode="cover"
        />
      )}
    </View>
  );
};

export default SendPostPreview;

const styles = StyleSheet.create({
  container: {
    zIndex: -2000,
  },
  ImagePreviewItem: {
    flex: 1,
    width: windowWidth,
    backgroundColor: Colors.background,
    height: windowHeight,
    resizeMode: 'contain',
  },
  postPreview: {
    alignItems: 'center',
    marginTop: windowHeight * 0.02,
    height: windowHeight * 0.4,
  },
  img: {
    marginTop: windowHeight * 0.02,
    marginBottom: windowHeight * 0.05,
    width: windowWidth,
    height: windowHeight - windowHeight * 0.26,
  },
});
