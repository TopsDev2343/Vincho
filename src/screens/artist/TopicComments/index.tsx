import React, {useState, useRef} from 'react';
import {FlatList, View, StyleSheet} from 'react-native';
import {Box} from 'native-base';
import {useQueryClient} from 'react-query';
import {scale} from 'react-native-size-matters';

import {
  CustomContainer,
  BackButton,
  SendMsgInput,
  PostCaption,
  CommentsItem,
  HelveticaRegularText,
} from '~/components';
import {
  useCreateTopicChildComment,
  useCreateTopicComment,
  useGetCustomeTopicCommentsByPostId,
} from '~/hooks/artist/Topic';
import {
  useLikeTopicComment,
  useDislikeTopicComment,
} from '~/hooks/artist/Comments';
import {queryKeys} from '~/constants/queryKeys';
import {useAuthStore, useClickedPostInfoStore} from '~/stores';
import {Strings} from '~/assets/strings';
import {Colors} from '~/styles/colors';

const TopicComments = ({route}: {route: any}) => {
  const entityId = route?.params?.postId;
  const [msg, setMsg] = useState<string>();
  const commentListRef = useRef(null);
  const queryClient = useQueryClient();
  const {mutate: mutateCreateComment, isLoading: createCommentLoading} =
    useCreateTopicComment();
  const {mutate: mutateLikeComment, isLoading: likeLoading} =
    useLikeTopicComment();
  const {mutate: mutateDislikeComment, isLoading: disLikeLoading} =
    useDislikeTopicComment();
  const {
    mutate: mutateCreateChildComment,
    isLoading: childCommentLoading,
    isSuccess: createChildCommentSuccess,
  } = useCreateTopicChildComment();

  const {userId} = useAuthStore(state => state);
  const [userLikes, setUserLikes] = useState<number[]>([]);
  const {postInfo, setPostInfo} = useClickedPostInfoStore(state => state);

  const [showReply, setShowReply] = useState(false);
  const [replyParent, setReplyParent] = useState(null);

  const {
    isLoading: getTopicCommentsLoading,
    data: getTopicCommentsData,
    isSuccess: getTopicCommentsSuccess,
    isError: getTopicCommentsFail,
    fetchNextPage: fetchNextPageGetTopicComments,
    hasNextPage: hasNextPageGetTopicComments,
    refetch: refetchGetTopicComments,
    isRefetching,
  } = useGetCustomeTopicCommentsByPostId(true, entityId);

  function sendComment(
    commentTxt: string,
    userId: number,
    postId: number,
    parentId: number,
  ) {
    if (replyParent != null && replyParent != undefined) {
      parentId = replyParent.id;
    }
    const input = {
      commentText: commentTxt,
      userId: userId,
      topicPostId: postId,
      likeCount: 0,
      parentId: parentId,
    };

    mutateCreateComment(input as any, {
      onSuccess: successData => {
        if (
          successData?.topicPostComment_createTopicPostComment?.status.value ===
          'Success'
        ) {
          setMsg('');
          queryClient.invalidateQueries(queryKeys.getTopicCommentsByPostId);
          queryClient.invalidateQueries(queryKeys.getPostTopicDetail);
          setReplyParent(null);
          setShowReply(false);
        }
      },
    });
  }

  function likeAndDislike(commentId: number, isLiked: boolean) {
    if (isLiked == true) {
      const input = {
        commentId: commentId,
        userId: userId,
      };
      mutateDislikeComment(input as any, {
        onSuccess: successData => {
          if (
            successData?.topicPostCommentLike_deleteTopicPostCommentLike
              ?.value === 'Success'
          ) {
            queryClient.invalidateQueries(queryKeys.getTopicCommentsByPostId);
            let userLikesArray = userLikes;
            let finalUserLikeArray = userLikesArray.filter(
              value => value !== commentId,
            );
            setUserLikes(finalUserLikeArray);
          }
        },
      });
    } else {
      const input = {
        topicPostCommentId: commentId,
        userId: userId,
      };
      mutateLikeComment(input as any, {
        onSuccess: successData => {
          if (
            successData?.topicPostCommentLike_createTopicPostCommentLike?.status
              .value === 'Success'
          ) {
            queryClient.invalidateQueries(queryKeys.getTopicCommentsByPostId);
            setUserLikes([...userLikes, commentId]);
          }
        },
      });
    }
  }

  const onLoadMore = () => {
    if (hasNextPageGetTopicComments) {
      fetchNextPageGetTopicComments();
    }
  };

  React.useEffect(() => {
    {
      getTopicCommentsSuccess &&
        getTopicCommentsData?.pages[0]?.post &&
        setPostInfo(getTopicCommentsData?.pages[0]?.post);
    }
  }, [getTopicCommentsData]);

  function renderItem({item}: {item: any}) {
    return (
      <CommentsItem
        item={item}
        likeAndDislike={likeAndDislike}
        userLikes={userLikes}
        setShowReply={setShowReply}
        setReplyParent={setReplyParent}
        childCommentLoading={childCommentLoading}
        createChildCommentSuccess={createChildCommentSuccess}
        isTopicComments={true}
        topicPostId={entityId}
      />
    );
  }

  return (
    <CustomContainer
      isLoading={getTopicCommentsLoading}
      isError={getTopicCommentsFail}
      errorMsg={'Something went wrong!'}
      onPress={refetchGetTopicComments}>
      {getTopicCommentsSuccess ? (
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <View style={styles.backContainer}>
              <BackButton />
            </View>

            <HelveticaRegularText
              text={Strings.comments}
              fontSize={16}
              color={Colors.white}
              textAlign={'left'}
              flex={6}
            />
          </View>

          <FlatList
            ref={commentListRef}
            style={styles.listContainer}
            data={getTopicCommentsData?.pages}
            renderItem={renderItem}
            keyExtractor={item => item?.id}
            horizontal={false}
            ListHeaderComponent={() => <PostCaption postInfo={postInfo} />}
            showsHorizontalScrollIndicator={false}
            onRefresh={refetchGetTopicComments}
            refreshing={isRefetching}
            onEndReachedThreshold={0.5}
            onEndReached={({distanceFromEnd}) => {
              if (distanceFromEnd < 0) return;
              onLoadMore();
            }}
          />

          <Box justifyContent={'flex-end'}>
            <SendMsgInput
              sendComment={sendComment}
              isLoading={createCommentLoading}
              msg={msg}
              setMsg={setMsg}
              showReply={showReply}
              setShowReply={setShowReply}
              replyParent={replyParent}
              setReplyParent={setReplyParent}
            />
          </Box>
        </View>
      ) : null}
    </CustomContainer>
  );
};

export default TopicComments;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    flexGrow: 1,
    marginTop: scale(24),
  },
  headerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  backContainer: {
    flex: 4,
    alignSelf: 'flex-start',
  },
});
