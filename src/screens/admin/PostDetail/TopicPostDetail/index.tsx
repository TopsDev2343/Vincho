import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import moment from 'moment';
import {HStack, View as NativeBaseView} from 'native-base';
import VideoPlayer from 'react-native-video-controls';
import {useQueryClient} from 'react-query';

import {
  BackButton,
  CustomContainer,
  HelveticaRegularText,
  HashtagList,
  UserShortInfo,
  OptionMenuBtn,
  CustomImage,
  UserOptionMenu,
  CustomLoading,
} from '~/components';
import {
  useAuthStore,
  useClickedPostInfoStore,
  useOptionMenuStore,
} from '~/stores';
import {useGetTopicPostDetail} from '~/hooks/artist/Topic';
import {windowHeight, windowWidth} from '~/styles/globalStyles';
import {postFileType} from '~/@types/global';
import {navigate} from '~/navigation/methods';
import {Colors} from '~/styles/colors';
import {queryKeys} from '~/constants/queryKeys';
import {getFullImageUrl} from '~/hooks/artist/Upload';
import DeleteCommentModal from '~/components/molecules/DeleteCommentModal';
import Video from 'react-native-video-controls';

const TopicPostDetail = ({route}: {route: any}) => {
  const queryClient = useQueryClient();
  const {userId} = useAuthStore(state => state);

  //For option menu modal (copy, share, report)
  const {setOptionMenuModal} = useOptionMenuStore(state => state);

  //For saving each post info to use in modals
  const {postInfo, setPostInfo} = useClickedPostInfoStore(state => state);

  const {
    isLoading: getTopicPostDetailLoading,
    data: getTopicPostDetailData,
    isSuccess: getTopicPostDetailSuccess,
    isError: getTopicPostDetailFail,
    refetch: refetchGetTopicPostDetail,
  } = useGetTopicPostDetail(route?.params?.postId);

  useEffect(() => {
    !getTopicPostDetailLoading &&
      setPostInfo(getTopicPostDetailData?.topicPost_getTopicPost?.result);
  }, [getTopicPostDetailData]);

  useEffect(() => {
    return () => {
      queryClient.removeQueries(queryKeys.getPostTopicDetail);
    };
  }, []);
  let fileUrl = getFullImageUrl(postInfo?.fileUrl);
  const [loadingVideo, setLoadingVideo] = useState(false);
  const player = useRef(null);
  function onBuffer({isBuffering}: {isBuffering: boolean}) {
    setLoadingVideo(isBuffering);
  }

  return (
    <CustomContainer
      isLoading={getTopicPostDetailLoading}
      isError={getTopicPostDetailFail}
      errorMsg={'Something went wrong!'}
      onPress={refetchGetTopicPostDetail}>
      <BackButton />

      {getTopicPostDetailSuccess && (
        <NativeBaseView style={styles.container}>
          <ScrollView>
            <HStack
              justifyContent={'space-between'}
              alignItems={'center'}
              mb={4}>
              <UserShortInfo
                img={postInfo?.user?.photoUrl}
                name={postInfo?.user?.userName}
                onLineTime={moment
                  .utc(postInfo?.createdDate)
                  .local()
                  .startOf('seconds')
                  .fromNow()}
              />
              <OptionMenuBtn
                onPress={() =>
                  setOptionMenuModal({
                    showModal: true,
                    isTopicPost: true,
                  })
                }
              />
            </HStack>
            {loadingVideo && <CustomLoading />}
            {postInfo?.fileUrl ? (
              postInfo?.fileType === postFileType.Image ? (
                <CustomImage
                  imageSource={fileUrl}
                  style={styles.img}
                  resizeMode="cover"
                />
              ) : postInfo?.fileType === postFileType.Video ? (
                <View style={styles.video}>
                  <Video
                    source={{
                      uri: fileUrl,
                    }}
                    minLoadRetryCount={5}
                    resizeMode={'cover'}
                    paused={false}
                    style={styles.videoItem}
                    ref={player}
                    repeat={false}
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
              ) : null
            ) : null}

            <NativeBaseView px={4} pt={4}>
              <HStack>
                <TouchableOpacity
                  onPress={() => {
                    navigate('TopicFollowScreen', {
                      postId: route?.params?.postId,
                    });
                  }}>
                  <HelveticaRegularText
                    text={
                      postInfo?.likeCount != null
                        ? postInfo?.likeCount > 1
                          ? postInfo?.likeCount + ' Likes'
                          : postInfo?.likeCount + ' Like'
                        : '0 Like'
                    }
                    fontSize={14}
                    color={Colors.txtLight}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    navigate('TopicCommentScreen', {
                      postId: route?.params?.postId,
                    });
                  }}>
                  <HelveticaRegularText
                    text={
                      postInfo?.commentCount != null
                        ? postInfo?.commentCount > 1
                          ? postInfo?.commentCount + ' Comments'
                          : postInfo?.commentCount + ' Comment'
                        : '0 Comment'
                    }
                    fontSize={14}
                    pl={4}
                    color={Colors.txtLight}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    navigate('ReportedPostScreen', {
                      entityId: route?.params?.postId,
                    });
                  }}>
                  <HelveticaRegularText
                    text={
                      postInfo?.reportCount != null
                        ? postInfo?.reportCount > 1
                          ? postInfo?.reportCount + ' Reports'
                          : postInfo?.reportCount + ' Report'
                        : '0 Report'
                    }
                    fontSize={14}
                    pl={4}
                    color={Colors.warning}
                  />
                </TouchableOpacity>
              </HStack>

              <HelveticaRegularText
                text={postInfo?.caption}
                fontSize={14}
                py={4}
                textAlign={'justify'}
                color={Colors.txtLight}
              />

              <HashtagList
                hashtagData={postInfo?.topicPostHashtags?.map(
                  ({hashtag}) => hashtag,
                )}
              />
            </NativeBaseView>

            <UserOptionMenu isAdmin={true} />

            <DeleteCommentModal />
          </ScrollView>
        </NativeBaseView>
      )}
    </CustomContainer>
  );
};

export default TopicPostDetail;

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
});
