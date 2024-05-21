import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {scale, verticalScale} from 'react-native-size-matters';
import {Strings} from '~/assets/strings';
import {FileType} from '~/generated/graphql';
import {navigate} from '~/navigation/methods';
import {Colors} from '~/styles/colors';
import AvatarWithTitle from '../AvatarWithTitle';
import CustomAvatar from '../CustomAvatar';
import CustomImage from '../CustomImage';
import HelveticaRegularText from '../HelveticaRegularText';
import PostPlayVideo from '../PostPlayVideo';

const ForwardedMessageViewer = ({
  item,
  containerStyle = styles.container,
}: {
  item: any;
  containerStyle?: ViewStyle;
}) => {
  var post =
    item?.post != null && item?.post != undefined
      ? item?.post
      : item?.topicPost;

  const goToPost = () => {
    if (item?.post != null && item?.post != undefined) {
      navigate('PostDetail', {entityId: post?.id});
    } else {
      navigate('TopicPostDetailScreen', {postId: post?.id});
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.7}
      onPress={goToPost}>
      <View
        style={{
          width: '100%',
          justifyContent: 'flex-start',
          alignItems: 'center',
          flexDirection: 'row',
          paddingLeft: 10,
          marginBottom: 10,
        }}>
        {post?.user.photoUrl ? (
          <CustomAvatar
            uri={post?.user.photoUrl}
            onPress={() => {}}
            width={scale(34)}
            height={scale(34)}
            borderWidth={1}
            borderColor={'#D9C1F3'}
          />
        ) : (
          <View style={styles.avatar}>
            <AvatarWithTitle
              name={post?.user.userName}
              uri={post?.user.photoUrl}
              onPress={() => {}}
              width={scale(34)}
              height={scale(34)}
              borderWidth={1}
              borderColor={'#D9C1F3'}
            />
          </View>
        )}
        <HelveticaRegularText
          text={post?.user.userName}
          fontSize={12}
          color={Colors.cleanWhite}
          ml={2}
        />
      </View>

      {post?.fileType === FileType.Image ? (
        <CustomImage
          imageSource={post?.fileUrl}
          style={styles.img}
          resizeMode="cover"
        />
      ) : post?.fileType === FileType.Video ? (
        <PostPlayVideo uri={post?.fileUrl} width={verticalScale(200)} />
      ) : (
        <LinearGradient
          colors={Colors.gradientDivider}
          style={styles.wrongContainer}>
          <Text style={styles.wrongFormatTxt}>{Strings.wrongFormatTxt}</Text>
        </LinearGradient>
      )}

      <HelveticaRegularText
        text={post?.caption}
        fontSize={12}
        my={2}
        color={Colors.cleanWhite}
        textAlign={'left'}
        numberOfLines={1}
        width={Platform.OS == 'android' ? scale(175) : scale(195)}
      />
    </TouchableOpacity>
  );
};

export default ForwardedMessageViewer;

const styles = StyleSheet.create({
  container: {
    width: Platform.OS == 'android' ? scale(180) : scale(220),
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: verticalScale(4),
    height: verticalScale(240),
    borderRadius: 10,
    overflow: 'hidden',
  },
  img: {
    width: verticalScale(190),
    height: verticalScale(160) + 10,
  },
  wrongFormatTxt: {
    color: Colors.white,
    textAlign: 'center',
  },
  wrongContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: verticalScale(200),
    height: verticalScale(160) + 10,
  },
  avatar: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eaeaea',
    width: scale(34),
    height: scale(34),
    borderRadius: 50,
  },
});
