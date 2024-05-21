import React from 'react';
import {View, StyleSheet, Image, ActivityIndicator} from 'react-native';
import {scale} from 'react-native-size-matters';

import {Colors} from '~/styles/colors';
import {AvatarCamera} from '~/components';
import {getFullImageUrl} from '~/hooks/artist/Upload';

type EditAvatarType = {
  hasWave: boolean;
  onPress: any;
  img: string;
  isUploading: boolean;
};

const EditAvatar = (input: EditAvatarType) => {
  return (
    <View>
      {input.hasWave ? (
        <View>
          <View
            style={{
              ...styles.circle,
              ...styles.thirdCircle,
            }}>
            <View
              style={{
                ...styles.secondCircle,
                ...styles.circle,
              }}>
              <View
                style={{
                  ...styles.firstCircle,
                  ...styles.circle,
                }}>
                <View
                  style={{
                    ...styles.waveImgContainer,
                    ...styles.circle,
                  }}>
                  {input.img ? (
                    <Image
                      source={{uri: input.img}}
                      style={{
                        ...styles.circle,
                        ...styles.waveImg,
                      }}
                    />
                  ) : null}

                  {input.isUploading ? (
                    <ActivityIndicator
                      color={Colors.primaryVariant}
                      style={styles.indicator}
                    />
                  ) : null}
                </View>
              </View>
            </View>
          </View>
          <AvatarCamera onPress={input.onPress} mTop={100} mLeft={200} />
        </View>
      ) : (
        <View>
          <View
            style={{
              ...styles.imgContainer,
              ...styles.circle,
            }}>
            {input.img ? (
              <Image
                source={{uri: input.img}}
                style={{
                  ...styles.img,
                  ...styles.circle,
                }}
              />
            ) : null}

            {input.isUploading ? (
              <ActivityIndicator
                color={Colors.primaryVariant}
                style={styles.indicator}
              />
            ) : null}
          </View>
          <AvatarCamera onPress={input.onPress} mTop={70} mLeft={200} />
        </View>
      )}
    </View>
  );
};
export default EditAvatar;

const styles = StyleSheet.create({
  circle: {
    borderRadius: scale(200),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  thirdCircle: {
    width: scale(168),
    height: scale(168),
    borderWidth: scale(3),
    borderColor: Colors.primaryVariant10,
  },
  secondCircle: {
    width: scale(152),
    height: scale(152),
    borderWidth: scale(4),
    borderColor: Colors.primaryVariant20,
  },
  firstCircle: {
    width: scale(134),
    height: scale(134),
    borderWidth: scale(5),
    borderColor: Colors.primaryVariant30,
    backgroundColor: Colors.black,
  },
  waveImgContainer: {
    width: scale(110),
    height: scale(110),
    backgroundColor: Colors.secondary,
  },
  waveImg: {
    width: scale(110),
    height: scale(110),
  },
  indicator: {position: 'absolute'},
  imgContainer: {
    width: scale(120),
    height: scale(120),
    backgroundColor: Colors.secondary,
  },
  img: {
    width: scale(120),
    height: scale(120),
  },
});
