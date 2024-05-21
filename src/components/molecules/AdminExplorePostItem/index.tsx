import React from 'react';
import {Image, View, StyleSheet, TouchableOpacity} from 'react-native';

import {Colors} from '~/styles/colors';
import {windowHeight, windowWidth} from '~/styles/globalStyles';
import {CustomImage, HashtagList, OptionMenuBtn} from '~/components';
import {scale, verticalScale} from 'react-native-size-matters';
import {navigate} from '~/navigation/methods';
import {HStack, VStack, View as NativeBaseView} from 'native-base';
import {
  CustomContainer,
  AvatarWithTitle,
  HelveticaRegularText,
} from '~/components';
import Video from 'react-native-video';
import {postFileType} from '~/@types/global';
import {
  useAuthStore,
  useClickedPostInfoStore,
  useOptionMenuStore,
} from '~/stores';
import moment from 'moment';
import {SvgXml} from 'react-native-svg';
import {camera, warning} from '~/assets/icons';
import {getFullImageUrl} from '~/hooks/artist/Upload';

const AdminExplorePostItem = ({
  item,
  menuOnPress,
  imgOnPress,
  isTopic,
}: {
  item?: any;
  menuOnPress: any;
  imgOnPress: any;
  isTopic?: boolean;
}) => {
  const {setPostInfo} = useClickedPostInfoStore(state => state);
  const {userId} = useAuthStore(state => state);

  let fileUrl = getFullImageUrl(item?.fileUrl);
  return (
    <CustomContainer style={{flex: 1, marginTop: 16}}>
      <TouchableOpacity
        onPress={() => {
          [setPostInfo(item)];
          if (isTopic == true) {
            navigate('TopicPostDetailScreen', {postId: item?.id});
          } else {
            navigate('PostDetail', {entityId: item?.id});
          }
        }}>
        <View style={styles.SectionTopChat}>
          <View style={styles.sectionHeaderContainer}>
            <View style={styles.sectionHeaderInfoContainer}>
              <AvatarWithTitle
                uri={item?.user?.photoUrl}
                onPress={() => {
                  item?.userId != userId
                    ? navigate('UserProfile', {
                        entityId: item?.userId,
                      })
                    : navigate('Profile');
                }}
                width={scale(50)}
                height={scale(50)}
                name={
                  item?.user?.fullName
                    ? `${item?.user?.fullName}`
                    : item?.user?.userName
                }
              />
              <VStack
                justifyContent={'space-between'}
                ml={4}
                height={scale(48)}>
                <HelveticaRegularText
                  text={item?.user?.userName}
                  fontSize={16}
                  color={Colors.txtLight}
                  ml={2}
                />
                <HelveticaRegularText
                  text={moment
                    .utc(item?.createdDate)
                    .local()
                    .startOf('seconds')
                    .fromNow()}
                  fontSize={12}
                  color={Colors.txtMedium}
                  ml={2}
                />
              </VStack>
            </View>

            <View style={{flex: 1}}>
              {/*      <OptionMenuBtn
              onPress={() => [
                setPostInfo(item),
                setOptionMenuModal({showModal: true, isTopicPost: false}),
              ]}
            /> */}
            </View>
          </View>
        </View>
        <View style={styles.container}>
          {item?.reportCount && (
            <TouchableOpacity
              onPress={() => {
                navigate('ReportedPostScreen', {entityId: item.id});
              }}
              style={styles.reportContainer}>
              <SvgXml xml={warning} />
              <HelveticaRegularText
                text={
                  item?.reportCount
                    ? item?.reportCount == 1
                      ? item?.reportCount + ' user reported this post'
                      : item?.reportCount + ' users reported this post'
                    : '0 user reported this post'
                }
                fontSize={12}
                pl={4}
                pr={2}
                color={Colors.warning}
              />
            </TouchableOpacity>
          )}
          {item?.fileType === postFileType.Image ? (
            /*      <Image source={{ uri: fileUrl }} style={styles.img} /> */
            <CustomImage
              imageSource={fileUrl}
              style={styles.img}
              resizeMode="cover"
            />
          ) : item?.fileType === postFileType.Video ? (
            <View style={styles.video}>
              <Video
                source={{uri: fileUrl}}
                resizeMode={'cover'}
                paused={true}
                style={styles.videoItem}
                disableBack
              />
            </View>
          ) : (
            <View></View>
          )}
          <NativeBaseView px={4} pt={4}>
            <HStack>
              <TouchableOpacity
                onPress={() => {
                  if (isTopic == true) {
                    navigate('TopicFollowScreen', {
                      postId: item?.id,
                    });
                  } else {
                    navigate('PostLikeList', {entityId: item?.id});
                  }
                }}>
                <HelveticaRegularText
                  text={
                    item?.postLikeCount != null
                      ? item?.postLikeCount > 1
                        ? item?.postLikeCount + ' Likes'
                        : item?.postLikeCount + ' Like'
                      : '0 Like'
                  }
                  fontSize={14}
                  color={Colors.txtLight}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  [setPostInfo(item)];
                  if (isTopic == true) {
                    navigate('TopicCommentScreen', {
                      postId: item?.id,
                    });
                  } else {
                    navigate('PostCommentList');
                  }
                }}>
                <HelveticaRegularText
                  text={
                    item?.commentCount != null
                      ? item?.commentCount > 1
                        ? item?.commentCount + ' Comments'
                        : item?.commentCount + ' Comment'
                      : '0 Comment'
                  }
                  fontSize={14}
                  pl={4}
                  color={Colors.txtLight}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  navigate('ReportedPostScreen', {entityId: item.id});
                }}>
                <HelveticaRegularText
                  text={
                    item?.reportCount != null
                      ? item?.reportCount > 1
                        ? item?.reportCount + ' Reports'
                        : item?.reportCount + ' Report'
                      : '0 Report'
                  }
                  fontSize={14}
                  pl={4}
                  color={Colors.warning}
                />
              </TouchableOpacity>
            </HStack>

            <HelveticaRegularText
              text={item?.caption}
              fontSize={14}
              py={4}
              textAlign={'justify'}
              color={Colors.txtLight}
            />
            <HashtagList
              style={{marginHorizontal: 0}}
              isTopic={false}
              hashtagData={item?.postHashtags?.map(({hashtag}) => hashtag)}
            />
          </NativeBaseView>
        </View>
      </TouchableOpacity>
    </CustomContainer>
  );
};

export default AdminExplorePostItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradientContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    width: windowWidth,
    bottom: windowHeight - windowHeight * 0.5,
  },
  img: {
    width: windowWidth,
    height: windowHeight - windowHeight * 0.5,
  },
  video: {
    width: windowWidth,
    height: windowHeight - windowHeight * 0.5,
  },
  videoItem: {
    width: windowWidth,
    height: windowHeight - windowHeight * 0.5,
    backgroundColor: 'pink',
  },
  SectionTopChat: {
    backgroundColor: Colors.background,
    width: '100%',
    flexDirection: 'row',
    height: verticalScale(54),
    marginBottom: 10,
  },
  avatar: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eaeaea',
  },
  sectionHeaderContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  sectionHeaderInfoContainer: {
    flex: 9,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 20,
  },
  reportContainer: {
    alignSelf: 'center',
    position: 'absolute',
    top: 20,
    left: windowWidth / 4.5,
    backgroundColor: Colors.onBackground,
    zIndex: 100,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Colors.warning,
    padding: 10,
    flexDirection: 'row',
  },
});
