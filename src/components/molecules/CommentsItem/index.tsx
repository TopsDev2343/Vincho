import React, {useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {scale} from 'react-native-size-matters';

import {Colors} from '~/styles/colors';
import {Fonts} from '~/styles/fonts';
import {
  SendChildMsgInput,
  CommentsItemInfo,
  ChildCommentItem,
} from '~/components';
import {windowWidth} from '~/styles/globalStyles';
import {useGetCustomComments} from '~/hooks/artist/Comments';
import {useGetCustomeTopicCommentsByPostId} from '~/hooks/artist/Topic';
import {navigate} from '~/navigation/methods';
import {useAuthStore} from '~/stores';

const CommentsItem = ({
  item,
  imgOnPress,
  likeAndDislike,
  userLikes,
  childCommentLoading,
  createChildCommentSuccess,
  isTopicComments = false,
  topicPostId,
  isAdmin = false,
  setShowReply,
  setReplyParent,
}: {
  item: any;
  imgOnPress?: any;
  likeAndDislike: any;
  userLikes: any;
  childCommentLoading: boolean;
  createChildCommentSuccess: boolean;
  isTopicComments?: boolean;
  topicPostId?: number;
  isAdmin?: boolean;
  setShowReply: any;
  setReplyParent: any;
}) => {
  const [showChildComments, setShowChildComments] = useState(false);
  const {userId} = useAuthStore(state => state);

  const {
    isLoading: getCommentsLoading,
    data: getCommentsData,
    isSuccess: getCommentsSuccess,
    isError: getCommentsFail,
    fetchNextPage: fetchNextPageGetComments,
    hasNextPage: hasNextPageGetComments,
    refetch: refetchGetComments,
    isRefetching: getCommentsRefetching,
  } = useGetCustomComments(!isTopicComments, item?.id);

  const {
    isLoading: getTopicCommentsLoading,
    data: getTopicCommentsData,
    isSuccess: getTopicCommentsSuccess,
    isError: getTopicCommentsFail,
    fetchNextPage: fetchNextPageGetTopicComments,
    hasNextPage: hasNextPageGetTopicComments,
    refetch: refetchGetTopicComments,
    isRefetching: getTopicCommentsRefetching,
  } = useGetCustomeTopicCommentsByPostId(
    isTopicComments,
    topicPostId,
    item?.id,
  );

  function renderItem({item}: {item: any}) {
    return (
      <ChildCommentItem
        item={item}
        imgOnPress={() => {
          item?.userId != userId
            ? navigate('UserProfile', {
                entityId: item?.userId,
              })
            : navigate('Profile');
        }}
        likeAndDislike={likeAndDislike}
        userLikes={userLikes}
        isTopicComments={isTopicComments}
        isAdmin={isAdmin}
      />
    );
  }
  const onLoadMore = () => {
    if (isTopicComments) {
      if (hasNextPageGetTopicComments) {
        fetchNextPageGetTopicComments();
      }
    } else {
      if (hasNextPageGetComments) {
        fetchNextPageGetComments();
      }
    }
  };

  return (
    <View style={styles.container}>
      <CommentsItemInfo
        item={item}
        imgOnPress={imgOnPress}
        setShowReply={() => {
          setShowReply(true);
          setReplyParent(item);
        }}
        setShowChildComments={() => setShowChildComments(!showChildComments)}
        likeAndDislike={likeAndDislike}
        userLikes={userLikes}
        isTopicComments={isTopicComments}
        isAdmin={isAdmin}
      />

      {showChildComments && (
        <FlatList
          style={styles.listContainer}
          data={
            isTopicComments
              ? getTopicCommentsData?.pages
              : getCommentsData?.pages
          }
          renderItem={renderItem}
          keyExtractor={item => item?.id}
          horizontal={false}
          showsHorizontalScrollIndicator={false}
          onRefresh={
            isTopicComments ? refetchGetTopicComments : refetchGetComments
          }
          refreshing={
            isTopicComments ? getTopicCommentsRefetching : getCommentsRefetching
          }
          onEndReachedThreshold={0.5}
          onEndReached={({distanceFromEnd}) => {
            if (distanceFromEnd < 0) return;
            onLoadMore();
          }}
        />
      )}
    </View>
  );
};

export default CommentsItem;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scale(16),
    marginVertical: scale(12),
  },
  listContainer: {
    flex: 1,
    flexGrow: 1,
    marginVertical: scale(16),
  },
  userTxt: {
    color: Colors.txtLight,
    ...Fonts.mediumLight,
    marginLeft: scale(16),
    width: windowWidth * 0.25,
  },
  userImg: {
    width: scale(32),
    height: scale(32),
    resizeMode: 'cover',
    borderRadius: scale(30),
  },
  imgContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  commentFooter: {
    flexDirection: 'row',
    marginLeft: scale(36),
    marginRight: scale(30),
    justifyContent: 'space-between',
  },
  footer: {
    flexDirection: 'row',
  },
  footerTxt: {
    color: Colors.txtMedium,
    ...Fonts.verySmallReg,
    marginHorizontal: scale(6),
  },
  childContainer: {
    paddingHorizontal: scale(32),
    marginTop: scale(6),
  },
  heartImg: {marginLeft: scale(150)},
});
