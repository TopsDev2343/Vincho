import React, {useState, useRef, useEffect} from 'react';
import {FlatList, View, StyleSheet} from 'react-native';
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
  useCreateComment,
  useLikeComment,
  useDislikeComment,
  useCreateChildComment,
  useGetCustomComments,
} from '~/hooks/artist/Comments';
import {queryKeys} from '~/constants/queryKeys';
import {
  useClickedPostInfoStore,
  useAuthStore,
  useAiFriendsStore,
} from '~/stores';
import {Strings} from '~/assets/strings';
import {Colors} from '~/styles/colors';

const Comments = () => {
  const [msg, setMsg] = useState<string>();
  const commentListRef = useRef(null);
  const queryClient = useQueryClient();
  const {mutate: mutateCreateComment, isLoading: createCommentLoading} =
    useCreateComment();
  const {mutate: mutateLikeComment} = useLikeComment();
  const {mutate: mutateDislikeComment} = useDislikeComment();
  const {isLoading: childCommentLoading, isSuccess: createChildCommentSuccess} =
    useCreateChildComment();
  const {postInfo, setPostInfo} = useClickedPostInfoStore(state => state);
  const {userId} = useAuthStore(state => state);
  const [userLikes, setUserLikes] = useState<number[]>([]);

  const [showReply, setShowReply] = useState(false);
  const [replyParent, setReplyParent] = useState(null);

  {
    /* AiFriend */
  }
  const {aiFriends, initializeAiFriends} = useAiFriendsStore();
  const [aiCommentes, setAiCommentes] = useState([]);

  const {
    isLoading: getCommentsLoading,
    data: getCommentsData,
    isSuccess: getCommentsSuccess,
    isError: getCommentsFail,
    fetchNextPage: fetchNextPageGetComments,
    hasNextPage: hasNextPageGetComments,
    refetch: refetchGetComments,
    isRefetching,
  } = useGetCustomComments(true);

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
      postId: postId,
      likeCount: 0,
      parentId: parentId,
    };

    mutateCreateComment(input as any, {
      onSuccess: successData => {
        if (successData?.comment_createComment?.status.value === 'Success') {
          setMsg('');
          queryClient.invalidateQueries(queryKeys.getCommentsByPostId);
          queryClient.invalidateQueries(queryKeys.getPostById);
          queryClient.invalidateQueries([queryKeys.getTopicPosts], {
            exact: false,
          });
          queryClient.invalidateQueries(queryKeys.getPosts);
          queryClient.invalidateQueries(queryKeys.getExplorePostsByCategoryId);
          queryClient.invalidateQueries(queryKeys.getFollowingExplorePosts);
          queryClient.invalidateQueries(queryKeys.getNearbyExplorePosts);
          setReplyParent(null);
          setShowReply(false);
        }
      },
    });
  }

  useEffect(() => {
    initializeAiFriends();
  }, [initializeAiFriends]);

  React.useEffect(() => {
    {
      if (getCommentsSuccess && getCommentsData?.pages[0]?.post) {
        setPostInfo(getCommentsData?.pages[0]?.post);

        {
          /* AiFriend */
        }
        getCommentsData?.pages;
        if (aiFriends?.length > 0 && getCommentsData?.pages) {
          const newAiDate = aiFriends.map(aiFriend => {
            return {
              commentText: aiFriend.description,
              user: {
                isAi: true,
                id: aiFriend.name,
                userName: aiFriend.name,
                fullName: aiFriend.name,
                photoUrl: aiFriend.profile,
              },
            };
          });
          setAiCommentes([...getCommentsData?.pages, ...newAiDate]);
        } else {
          setAiCommentes([...getCommentsData?.pages]);
        }
      }
    }
  }, [getCommentsData]);

  function likeAndDislike(commentId: number, isLiked: boolean) {
    const input = {
      commentId: commentId,
      userId: userId,
    };

    if (isLiked == true) {
      mutateDislikeComment(input as any, {
        onSuccess: successData => {
          if (successData?.commentLike_deleteCommentLike?.value === 'Success') {
            queryClient.invalidateQueries(queryKeys.getCommentsByPostId);
            let userLikesArray = userLikes;
            let finalUserLikeArray = userLikesArray.filter(
              value => value !== commentId,
            );
            setUserLikes(finalUserLikeArray);
          }
        },
      });
    } else {
      mutateLikeComment(input as any, {
        onSuccess: successData => {
          if (
            successData?.commentLike_createCommentLike?.status.value ===
            'Success'
          ) {
            queryClient.invalidateQueries(queryKeys.getCommentsByPostId);
            setUserLikes([...userLikes, commentId]);
          }
        },
      });
    }
  }

  const onLoadMore = () => {
    if (hasNextPageGetComments) {
      fetchNextPageGetComments();
    }
  };

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
      />
    );
  }
  return (
    <CustomContainer
      isLoading={getCommentsLoading}
      isError={getCommentsFail}
      errorMsg={'Something went wrong!'}>
      {getCommentsSuccess && !getCommentsLoading ? (
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
            // contentContainerStyle={styles.listContainer}
            data={aiCommentes}
            renderItem={renderItem}
            keyExtractor={item => item?.id}
            horizontal={false}
            ListHeaderComponent={() => (
              <PostCaption
                postInfo={postInfo}
                comment={getCommentsData?.pages[0]?.post?.commentCount || 0}
              />
            )}
            showsHorizontalScrollIndicator={false}
            onRefresh={refetchGetComments}
            refreshing={isRefetching}
            onEndReachedThreshold={0.5}
            onEndReached={({distanceFromEnd}) => {
              if (distanceFromEnd < 0) return;
              onLoadMore();
            }}
          />
        </View>
      ) : null}

      {getCommentsSuccess && (
        <SendMsgInput
          msg={msg}
          setMsg={setMsg}
          sendComment={sendComment}
          isLoading={createCommentLoading}
          showReply={showReply}
          setShowReply={setShowReply}
          replyParent={replyParent}
          setReplyParent={setReplyParent}
        />
      )}
    </CustomContainer>
  );
};

export default Comments;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    // flex: 1,
    //  flexGrow: 1,
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
