import dayjs from 'dayjs';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {View, Text} from 'native-base';
import {scale, verticalScale} from 'react-native-size-matters';
import PlayVoice from '../PlayVoice';
import PdfViewer from '../PdfViewer';
import VideoPlayer from '../VideoPlayer';
import {Colors} from '~/styles/colors';
import ForwardedMessageViewer from '../ForwardedMessageViewer';
import {getImageUrl} from '~/utils/image';
import {navigate} from '~/navigation/methods';
import CustomImage from '../CustomImage';

const SectionChat = props => {
  const {style, user, item, index} = props;
  return (
    <View mb={10}>
      {item?.messageType === 'FORWARDED_MESSAGE' ? (
        <View
          style={[
            user ? styles.ForwardSectionChat2 : styles.ForwardSectionChat,
            style,
          ]}>
          {item?.text ? (
            <Text
              style={[styles.messageText, {width: scale(200), marginLeft: 10}]}>
              {item?.text}
            </Text>
          ) : null}
          <ForwardedMessageViewer item={item} />
        </View>
      ) : (
        <View style={[user ? styles.SectionChat2 : styles.SectionChat, style]}>
          {item?.text ? (
            <View
              style={user ? styles.messageContainer2 : styles.messageContainer}>
              <Text style={styles.messageText}>{item?.text}</Text>
            </View>
          ) : null}
          {item?.messageType && item?.messageType === 'PHOTO' ? (
            <TouchableOpacity
              onPress={() => {
                navigate('Image', {source: getImageUrl(item?.photoUrl)});
              }}>
              <CustomImage
                imageSource={item?.photoUrl}
                style={styles.img}
                resizeMode="cover"
              />
            </TouchableOpacity>
          ) : item?.messageType === 'VIDEO' ? (
            <VideoPlayer source={item?.photoUrl} />
          ) : item?.messageType === 'FILE' ? (
            <View
              style={user ? styles.messageContainer2 : styles.messageContainer}>
              <PdfViewer source={item?.photoUrl} />
            </View>
          ) : (
            item?.messageType === 'VOICE' && (
              <PlayVoice soundItem={item?.photoUrl} index={index} />
            )
          )}
        </View>
      )}
      <Text
        style={{
          textAlign: user ? 'right' : 'left',
          color: Colors.onSecondary,
          fontSize: 14,
          fontFamily: 'Helvetica',
        }}>
        {dayjs(item?.createdAt).format('hh:mm A')}
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  SectionChat: {
    justifyContent: 'center',
  },
  SectionChat2: {
    alignSelf: 'flex-end',
    justifyContent: 'center',
  },
  ForwardSectionChat: {
    width: '100%',
    borderRadius: 21,
    justifyContent: 'center',
    borderBottomLeftRadius: 0,
    backgroundColor: Colors.chatIconBackground,
    paddingVertical: verticalScale(12),
  },
  ForwardSectionChat2: {
    width: '100%',
    borderRadius: 21,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    borderBottomRightRadius: 0,
    paddingTop: verticalScale(12),
    paddingBottom: verticalScale(12),
    backgroundColor: Colors.onSecondary,
  },

  shadow: {
    shadowColor: 'rgba(140,140,140,0.06)',
    shadowOffset: {width: 0, height: 15},
    shadowRadius: 29,
    elevation: 1,
  },
  imageWrapper: {
    aspectRatio: 1,
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  messageContainer: {
    borderRadius: 21,
    justifyContent: 'center',
    borderBottomLeftRadius: 0,
    paddingHorizontal: scale(12),
    backgroundColor: Colors.chatIconBackground,
    paddingVertical: verticalScale(12),
  },
  messageContainer2: {
    borderRadius: 21,
    alignSelf: 'flex-end',
    paddingLeft: scale(12),
    paddingRight: scale(12),
    justifyContent: 'center',
    borderBottomRightRadius: 0,
    paddingTop: verticalScale(12),
    paddingBottom: verticalScale(12),
    backgroundColor: Colors.onSecondary,
  },
  messageText: {
    color: Colors.cleanWhite,
    fontSize: 14,
    fontFamily: 'Helvetica',
    paddingHorizontal: 0,
  },
  img: {
    backgroundColor: Colors.cleanWhite,
    borderRadiud: 0,
    width: verticalScale(200),
    height: verticalScale(200) + 10,
    alignSelf: 'center',
    marginHorizontal: scale(12),
  },
});
export default SectionChat;
