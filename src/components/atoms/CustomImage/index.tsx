import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Spinner} from 'native-base';
import {Colors} from '~/styles/colors';
import {} from '~/assets/images';
import {getFullImageUrl} from '~/hooks/artist/Upload';
const CustomImage = ({
  imageSource,
  style,
  resizeMode = FastImage.resizeMode.contain,
  backgroundColor = Colors.transparent,
  local = false,
  children,
}: {
  imageSource?: any;
  style?: any;
  resizeMode?: 'cover' | 'center' | 'contain' | 'repeat' | 'stretch';
  backgroundColor?: any;
  local?: boolean;
  children?: any;
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const bgColor = local
    ? backgroundColor
    : imageSource && imageSource !== null
    ? backgroundColor
    : Colors.white;

  const onProgress = () => {
    setLoading(true);
  };

  const onLoadEnd = () => {
    setLoading(false);
  };

  return (
    <>
      <FastImage
        style={[style, {backgroundColor: bgColor}]}
        source={
          local
            ? imageSource
            : imageSource && imageSource !== null
            ? {
                uri: getFullImageUrl(imageSource),
                priority: FastImage.priority.high,
              }
            : null
        }
        onProgress={onProgress}
        onLoadEnd={onLoadEnd}
        onError={onLoadEnd}
        resizeMode={resizeMode}>
        {loading && (
          <Spinner
            position="absolute"
            alignSelf="center"
            bottom="0"
            top="0"
            size={24}
            color={Colors.primary}
          />
        )}
        {children && children}
      </FastImage>
    </>
  );
};

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
});

export default CustomImage;
