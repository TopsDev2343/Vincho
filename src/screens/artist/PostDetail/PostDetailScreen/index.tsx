import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet, StatusBar, ActivityIndicator} from 'react-native';

import {
  AvatarWithTitle,
  BackButton,
  CustomContainer,
  CustomImage,
  CustomKeyboardAwareScrollView,
  CustomLoading,
  HashtagList,
  HelveticaRegularText,
  PostBtnRow,
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
  useForwardPostModalStore,
  useOptionMenuStore,
  usePostLikeUserId,
  usePostModalStore,
} from '~/stores';
import {postFileType} from '~/@types/global';
import {TouchableOpacity} from 'react-native';
import {navigate} from '~/navigation/methods';
import Video from 'react-native-video';
import {
  useCreateLikePost,
  useDislikePost,
  useGetPostById,
} from '~/hooks/artist/Posts';
import {queryKeys} from '~/constants/queryKeys';
import {useQueryClient} from 'react-query';

const PostDetailScreen = ({route}: {route: any}) => {
  const entityId = route?.params?.entityId;
  const showDeleteFromCollection = route?.params?.showDeleteFromCollection;

  const {data, isLoading, isSuccess} = useGetPostById(entityId);
  const {setShowPostModal} = usePostModalStore(state => state);
  const {setOptionMenuModal} = useOptionMenuStore(state => state);
  const {setPostInfo} = useClickedPostInfoStore(state => state);
  const {userId} = useAuthStore(state => state);
  const {setShowForwardPostModal} = useForwardPostModalStore(state => state);
  const queryClient = useQueryClient();
  const {mutate: mutateCreateLike, isLoading: createLikeLoading} =
    useCreateLikePost();
  const {mutate: mutateDislikePost, isLoading: deleteLikeLoading} =
    useDislikePost();
  const {postLikeUserId, setPostLikeUserId} = usePostLikeUserId(state => state);

  useEffect(() => {
    if (data?.post_getPost?.result.postLikes != null) {
      let likedList = data?.post_getPost?.result.postLikes?.map(
        ({userId}) => userId,
      );
      setPostLikeUserId(likedList);

      [setPostInfo(data?.post_getPost.result)];
    }
  }, [data?.post_getPost.result]);

  function likeOnPress() {
    const input = {
      postId: entityId,
      userId: userId,
    };
    if (postLikeUserId?.includes(userId)) {
      mutateDislikePost(input as any, {
        onSuccess: successData => {
          if (successData?.postLike_deletePostLike?.value === 'Success') {
            let likedList = postLikeUserId;
            setPostLikeUserId(likedList?.filter(value => value !== userId));
            queryClient.invalidateQueries(queryKeys.getPostById);
            queryClient.invalidateQueries(queryKeys.getPosts);
            queryClient.invalidateQueries(
              queryKeys.getExplorePostsByCategoryId,
            );
            queryClient.invalidateQueries(queryKeys.getFollowingExplorePosts);
            queryClient.invalidateQueries(queryKeys.getNearbyExplorePosts);
          }
        },
      });
    } else {
      mutateCreateLike(input as any, {
        onSuccess: successData => {
          if (
            successData?.postLike_createPostLike?.status?.value === 'Success'
          ) {
            setPostLikeUserId([...postLikeUserId, userId]);
            queryClient.invalidateQueries(queryKeys.getPostById);
            queryClient.invalidateQueries(queryKeys.getPostById);
            queryClient.invalidateQueries(queryKeys.getPosts);
            queryClient.invalidateQueries(
              queryKeys.getExplorePostsByCategoryId,
            );
            queryClient.invalidateQueries(queryKeys.getFollowingExplorePosts);
            queryClient.invalidateQueries(queryKeys.getNearbyExplorePosts);
          }
        },
      });
    }
  }

  function commentOnPress() {
    [setPostInfo(data?.post_getPost.result)];
    navigate('CommentsScreen');
    setShowPostModal(false);
  }
  function forwardOnPress() {
    [setPostInfo(data?.post_getPost.result)];
    setShowForwardPostModal(true);
    setShowPostModal(false);
  }
  const [loadingVideo, setLoadingVideo] = useState(false);
  const player = useRef(null);
  function onBuffer({isBuffering}: {isBuffering: boolean}) {
    setLoadingVideo(isBuffering);
  }

  return (
    <CustomContainer style={{flex: 1}} isLoading={isLoading}>
      {isSuccess && !isLoading && (
        <View style={{flex: 1}}>
          <View style={{flex: 8.7}}>
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
                          ? navigate('OtherUserProfile', {
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
                        setOptionMenuModal({
                          showModal: true,
                          isTopicPost: false,
                          showDeleteFromCollection: showDeleteFromCollection,
                        }),
                      ]}
                    />
                  </View>
                </View>
              </View>
              {isLoading ? (
                <CustomLoading />
              ) : (
                <View style={styles.container}>
                  {loadingVideo && <CustomLoading />}
                  {data?.post_getPost.result?.fileType ===
                  postFileType.Image ? (
                    <CustomImage
                      imageSource={data?.post_getPost.result?.fileUrl}
                      style={styles.img}
                      resizeMode="cover"
                    />
                  ) : data?.post_getPost.result?.fileType ===
                    postFileType.Video ? (
                    <View style={styles.video}>
                      <Video
                        source={{
                          uri: data?.post_getPost.result?.fileUrl,
                        }}
                        progressUpdateInterval={500}
                        minLoadRetryCount={5}
                        repeat={false}
                        resizeMode={'cover'}
                        paused={false}
                        style={styles.videoItem}
                        ref={player}
                        onBuffer={onBuffer}
                        controls
                        onLoad={() => setLoadingVideo(true)}
                        onEnd={() => {
                          setLoadingVideo(false);
                        }}
                        bufferConfig={{
                          minBufferMs: 100,
                          maxBufferMs: 200,
                          bufferForPlaybackMs: 100,
                          bufferForPlaybackAfterRebufferMs: 100,
                        }}
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
                            data?.post_getPost.result?.postLikes?.length > 1
                              ? data?.post_getPost.result?.postLikes?.length +
                                ' Likes'
                              : data?.post_getPost.result?.postLikes?.length +
                                ' Like'
                          }
                          fontSize={14}
                          color={Colors.txtLight}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          [setPostInfo(data?.post_getPost.result)];
                          navigate('CommentsScreen');
                        }}>
                        <HelveticaRegularText
                          text={
                            data?.post_getPost.result?.comments?.length > 1
                              ? data?.post_getPost.result?.comments?.length +
                                ' Comments'
                              : data?.post_getPost.result?.comments?.length +
                                ' Comment'
                          }
                          fontSize={14}
                          pl={4}
                          color={Colors.txtLight}
                        />
                      </TouchableOpacity>
                    </HStack>

                    <HelveticaRegularText
                      text={data?.post_getPost.result?.caption}
                      fontSize={14}
                      pt={4}
                      textAlign={'justify'}
                      color={Colors.txtLight}
                    />

                    <HashtagList
                      style={{marginHorizontal: 0}}
                      isTopic={false}
                      hashtagData={data?.post_getPost.result?.postHashtags?.map(
                        ({hashtag}) => hashtag,
                      )}
                    />
                  </NativeBaseView>
                </View>
              )}
            </CustomKeyboardAwareScrollView>
          </View>

          <View
            style={{
              flex: 1.3,
              justifyContent: 'flex-end',
            }}>
            <NativeBaseView
              borderTopRightRadius={16}
              borderTopLeftRadius={16}
              backgroundColor={Colors.onBackground}>
              <PostBtnRow
                likeOnPress={likeOnPress}
                commentOnPress={commentOnPress}
                forwardOnPress={forwardOnPress}
                isLiked={postLikeUserId?.includes(userId)}
                isLoading={createLikeLoading || deleteLikeLoading}
              />
            </NativeBaseView>
          </View>
        </View>
      )}
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
    height: windowHeight * 0.7,
    backgroundColor: Colors.background,
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
});
