import React from 'react';
import {StyleSheet, View, Image} from 'react-native';

import {windowHeight, windowWidth} from '~/styles/globalStyles';
import {Colors} from '~/styles/colors';
import {formats} from '~/@types/global';
import {PostPreviewVideo} from '~/components';

const PostPreview = ({selectedImg}: {selectedImg: object}) => {
  return (
    <View style={styles.container}>
      {selectedImg?.type === formats.Video && (
        <PostPreviewVideo uri={selectedImg?.uri} />
      )}

      {selectedImg?.type === formats.Image && (
        <View style={styles.postPreview}>
          <Image
            resizeMode="contain"
            source={{uri: selectedImg?.uri}}
            style={styles.ImagePreviewItem}
          />
        </View>
      )}
    </View>
  );
};

export default PostPreview;

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
});
