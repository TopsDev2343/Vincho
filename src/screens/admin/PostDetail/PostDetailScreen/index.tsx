import React from 'react';
import {Image, View, StyleSheet, StatusBar} from 'react-native';

import {
  AvatarWithTitle,
  BackButton,
  CustomContainer,
  CustomImage,
  CustomKeyboardAwareScrollView,
  CustomLoading,
  HashtagList,
  HelveticaRegularText,
  UserOptionMenu,
} from '~/components';
import {Colors} from '~/styles/colors';
import {windowHeight, windowWidth} from '~/styles/globalStyles';
import {OptionMenuBtn} from '~/components';
import {scale, verticalScale} from 'react-native-size-matters';
import moment from 'moment';
import {HStack, VStack, View as NativeBaseView} from 'native-base';
import {
  useAuthStore,
  useClickedPostInfoStore,
  useOptionMenuStore,
} from '~/stores';
import {postFileType} from '~/@types/global';
import {TouchableOpacity} from 'react-native';
import {navigate} from '~/navigation/methods';
import VideoPlayer from 'react-native-video-controls';
import {useGetPostById} from '~/hooks/artist/Posts';
import {SvgXml} from 'react-native-svg';
import {warning} from '~/assets/icons';
import DeleteCommentModal from '~/components/molecules/DeleteCommentModal';
import {getFullImageUrl} from '~/hooks/artist/Upload';

const PostDetailScreen = ({route}: {route: any}) => {
  const entityId = route?.params?.entityId;

  const {data, isLoading} = useGetPostById(entityId);
  const {setOptionMenuModal} = useOptionMenuStore(state => state);
  const {setPostInfo} = useClickedPostInfoStore(state => state);
  const {userId} = useAuthStore(state => state);

  return (
    <CustomContainer style={{flex: 1}}>
      <CustomKeyboardAwareScrollView>
        <StatusBar backgroundColor={Colors.background} />
        <BackButton />
        <View style={styles.SectionTopChat}>
          <View style={styles.sectionHeaderContainer}>
            <View style={styles.sectionHeaderInfoContainer}>
              <AvatarWithTitle
                uri={data?.post_getPost.result?.user?.photoUrl}
                onPress={() => {
                  data?.post_getPost.result?.userId != userId
                    ? navigate('UserProfile', {
                        entityId: data?.post_getPost.result?.userId,
                      })
                    : navigate('Profile');
                }}
                width={scale(50)}
                height={scale(50)}
                name={
                  data?.post_getPost.result?.user?.fullName
                    ? `${data?.post_getPost.result?.user?.fullName}`
                    : data?.post_getPost.result?.user?.userName
                }
              />
              <VStack
                justifyContent={'space-between'}
                ml={4}
                height={scale(48)}>
                <HelveticaRegularText
                  text={data?.post_getPost.result?.user?.userName}
                  fontSize={16}
                  color={Colors.txtLight}
                  ml={2}
                />
                <HelveticaRegularText
                  text={moment
                    .utc(data?.post_getPost.result?.createdDate)
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
              <OptionMenuBtn
                onPress={() => [
                  setPostInfo(data?.post_getPost.result),
                  setOptionMenuModal({showModal: true, isTopicPost: false}),
                ]}
              />
            </View>
          </View>
        </View>
        {isLoading ? (
          <CustomLoading />
        ) : (
          <View style={styles.container}>
            {data?.post_getPost.result?.reportCount && (
              <TouchableOpacity
                onPress={() => {
                  navigate('ReportedPostScreen', {entityId: entityId});
                }}
                style={styles.reportContainer}>
                <SvgXml xml={warning} />
                <HelveticaRegularText
                  text={
                    data?.post_getPost.result?.reportCount
                      ? data?.post_getPost.result?.reportCount +
                        ' users reported this post'
                      : '0 users reported this post'
                  }
                  fontSize={12}
                  pl={4}
                  color={Colors.warning}
                />
              </TouchableOpacity>
            )}

            {data?.post_getPost.result?.fileType === postFileType.Image ? (
              <CustomImage
                imageSource={getFullImageUrl(
                  data?.post_getPost.result?.fileUrl,
                )}
                style={styles.img}
                resizeMode="cover"
              />
            ) : data?.post_getPost.result?.fileType === postFileType.Video ? (
              <View style={styles.video}>
                <VideoPlayer
                  source={{
                    uri: getFullImageUrl(data?.post_getPost.result?.fileUrl),
                  }}
                  resizeMode={'cover'}
                  paused={false}
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
                    navigate('PostLikeList', {entityId: entityId});
                  }}>
                  <HelveticaRegularText
                    text={
                      data?.post_getPost?.result?.postLikes?.length > 1
                        ? data?.post_getPost?.result?.postLikes?.length +
                          ' Likes'
                        : data?.post_getPost?.result?.postLikes?.length +
                          ' Like'
                    }
                    fontSize={14}
                    color={Colors.txtLight}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    [setPostInfo(data?.post_getPost.result)];
                    navigate('PostCommentList');
                  }}>
                  <HelveticaRegularText
                    text={
                      data?.post_getPost?.result?.comments?.length > 1
                        ? data?.post_getPost?.result?.comments?.length +
                          ' Comments'
                        : data?.post_getPost?.result?.comments?.length +
                          ' Comment'
                    }
                    fontSize={14}
                    pl={4}
                    color={Colors.txtLight}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    navigate('ReportedPostScreen', {entityId: entityId});
                  }}>
                  <HelveticaRegularText
                    text={
                      data?.post_getPost.result?.reportCount != null
                        ? data?.post_getPost.result?.reportCount > 1
                          ? data?.post_getPost.result?.reportCount + ' Reports'
                          : data?.post_getPost.result?.reportCount + ' Report'
                        : '0 Report'
                    }
                    fontSize={14}
                    pl={4}
                    color={Colors.warning}
                  />
                </TouchableOpacity>
              </HStack>

              <UserOptionMenu isAdmin={true} />

              <DeleteCommentModal />
              <HelveticaRegularText
                text={data?.post_getPost.result?.caption}
                fontSize={14}
                py={4}
                textAlign={'justify'}
                color={Colors.txtLight}
              />
              <HashtagList
                style={{marginHorizontal: 0}}
                isTopic={false}
                hashtagData={data?.post_getPost?.result?.postHashtags?.map(
                  ({hashtag}) => hashtag,
                )}
              />
            </NativeBaseView>
          </View>
        )}
      </CustomKeyboardAwareScrollView>
    </CustomContainer>
  );
};

export default PostDetailScreen;

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
    bottom: windowHeight - windowHeight * 0.3,
  },
  img: {
    width: windowWidth,
    height: windowHeight - windowHeight * 0.3,
  },
  video: {
    width: windowWidth,
    height: windowHeight * 0.7,
  },
  videoItem: {
    width: windowWidth,
    height: '100%',
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
