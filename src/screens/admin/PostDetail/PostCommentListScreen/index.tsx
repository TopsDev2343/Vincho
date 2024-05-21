import React, {useState, useRef} from 'react';
import {FlatList, View, StyleSheet} from 'react-native';
import {useQueryClient} from 'react-query';
import {scale} from 'react-native-size-matters';

import {
  CustomContainer,
  BackButton,
  PostCaption,
  HelveticaRegularText,
} from '~/components';
import {
  useGetCommentsByPostId,
  useDislikeComment,
  useCreateChildComment,
} from '~/hooks/artist/Comments';
import {queryKeys} from '~/constants/queryKeys';
import {useAuthStore, useClickedPostInfoStore} from '~/stores';
import snackBar from '~/utils/snackBar';
import {messageHelper} from '~/utils/messageHelper';
import AdminCommentsItem from '~/components/molecules/AdminCommentsItem';
import {Strings} from '~/assets/strings';
import {Colors} from '~/styles/colors';
import {navigate} from '~/navigation/methods';

const PostCommentListScreen = () => {
  const commentListRef = useRef(null);
  const queryClient = useQueryClient();
  useDislikeComment();
  const {
    mutate: mutateCreateChildComment,
    isLoading: childCommentLoading,
    isSuccess: createChildCommentSuccess,
  } = useCreateChildComment();
  const {postInfo, setPostInfo} = useClickedPostInfoStore(state => state);
  const {userId} = useAuthStore(state => state);

  const {
    isLoading: getCommentsLoading,
    data: getCommentsData,
    isSuccess: getCommentsSuccess,
    isError: getCommentsFail,
    fetchNextPage: fetchNextPageGetComments,
    hasNextPage: hasNextPageGetComments,
    refetch: refetchGetComments,
  } = useGetCommentsByPostId();

  React.useEffect(() => {
    {
      getCommentsSuccess &&
        getCommentsData?.pages[0]?.post &&
        setPostInfo(getCommentsData?.pages[0]?.post);
    }
  }, [getCommentsData]);

  const onLoadMore = () => {
    if (hasNextPageGetComments) {
      fetchNextPageGetComments();
    }
  };

  function sendChildComment(
    commentTxt: string,
    postId: number,
    parentId: number,
    userId: number,
  ) {
    const input = {
      commentText: commentTxt,
      userId: userId,
      postId: postId,
      parentId: parentId,
      likeCount: 0,
    };
    mutateCreateChildComment(input as any, {
      onSuccess: successData => {
        if (successData?.comment_createComment?.status?.value === 'Success') {
          queryClient.invalidateQueries(queryKeys.getCommentsByPostId);
        } else {
          snackBar(
            messageHelper(successData?.comment_createComment?.status?.value),
          );
        }
      },
    });
  }

  function renderItem({item}: {item: any}) {
    return (
      <AdminCommentsItem
        item={item}
        sendChildComment={sendChildComment}
        childCommentLoading={childCommentLoading}
        createChildCommentSuccess={createChildCommentSuccess}
        imgOnPress={() => {
          item?.userId != userId
            ? navigate('UserProfile', {
                entityId: item?.userId,
              })
            : navigate('Profile');
        }}
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
            data={getCommentsData?.pages}
            renderItem={renderItem}
            keyExtractor={item => item?.id}
            horizontal={false}
            ListHeaderComponent={() => <PostCaption postInfo={postInfo} />}
            showsHorizontalScrollIndicator={false}
            onEndReachedThreshold={0.5}
            onEndReached={({distanceFromEnd}) => {
              if (distanceFromEnd < 0) return;
              onLoadMore();
            }}
          />
        </View>
      ) : null}
    </CustomContainer>
  );
};

export default PostCommentListScreen;

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
