import {View} from 'native-base';
import React, {useState} from 'react';
import {Image, Text, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {postFileType} from '~/@types/global';
import {Strings} from '~/assets/strings';
import {Colors} from '~/styles/colors';
import CustomImage from '../CustomImage';
import PostPlayVideo from '../PostPlayVideo';

const CustomPostItem = ({
  item,
  onPress,
  width,
  checkExist,
}: {
  item: any;
  onPress?: () => void;
  width: number;
  checkExist: any;
}) => {
  return (
    <View
      style={{
        margin: 2,
        width: width,
        height: width + 10,
        borderRadius: 4,
        alignSelf: 'flex-start',
      }}>
      <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={{flex: 1}}>
        {checkExist.length > 0 ? (
          <View
            backgroundColor={Colors.blackOverlay}
            style={{
              zIndex: 100,
              width: '100%',
              height: '100%',
              position: 'absolute',
              top: 0,
              right: 0,
              alignItems: 'flex-end',
              padding: 5,
            }}>
            <View
              width={4}
              height={4}
              borderRadius={100}
              backgroundColor={Colors.primary}></View>
          </View>
        ) : (
          <View></View>
        )}
        {item.fileType === postFileType.Image ? (
          <CustomImage
            imageSource={item.fileUrl}
            style={{width: width, height: width, borderRadius: 4}}
            resizeMode="cover"
          />
        ) : item.fileType === postFileType.Video ? (
          <PostPlayVideo uri={item?.fileUrl} width={width} />
        ) : (
          <LinearGradient
            colors={Colors.gradientDivider}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: width,
              height: width,
            }}>
            <Text style={{color: Colors.white, textAlign: 'center'}}>
              {Strings.wrongFormatTxt}
            </Text>
          </LinearGradient>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default CustomPostItem;
