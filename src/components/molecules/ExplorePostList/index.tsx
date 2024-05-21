import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, FlatList, View} from 'react-native';

import {ExplorePost, AlternativeScreen} from '~/components';
import {windowHeight, windowWidth} from '~/styles/globalStyles';
import {Strings} from '~/assets/strings/index';
import {
  useMessageSubscription,
  useNotificationSubscription,
} from '~/hooks/artist/Notification';
import {useAuthStore} from '~/stores';
import {useQueryClient} from 'react-query';
import {queryKeys} from '~/constants/queryKeys';
import {showMessage} from 'react-native-flash-message';
import {ActivityType, NotificationType} from '~/generated/graphql';

const ExplorePostList = ({
  postsData,
  onLoadMore,
  isLoading,
}: {
  postsData: any;
  onLoadMore: any;
  isLoading: boolean;
}) => {
  const flatlistRef = useRef(null);

  const [newIndex, setNewIndex] = React.useState<number>();

  const queryClient = useQueryClient();
  const {userId} = useAuthStore(state => state);
  const [notificationData, setNotificationData] = useState(undefined);
  const [messageData, setMessageData] = useState(undefined);

  useNotificationSubscription({
    userId: userId,
    callback: (inputData: any) => onGetNotification(inputData),
  });

  useMessageSubscription({
    userId: userId,
    callback: (inputData: any) => onGetMessage(inputData),
  });

  const onGetNotification = (event: any) => {
    const res = JSON.parse(event.data);

    if (
      res?.type !== 'ka' &&
      res.type === 'data' &&
      res?.payload?.data?.notificationAdded
    ) {
      setNotificationData(res?.payload?.data?.notificationAdded);
      let messageDescription = '';
      let notificationType =
        res?.payload?.data?.notificationAdded?.notificationType;
      switch (notificationType) {
        case NotificationType.CreateActivity:
          queryClient.invalidateQueries(queryKeys.getPostById);
          queryClient.invalidateQueries(queryKeys.getCommentsByPostId);
          queryClient.invalidateQueries(queryKeys.getPosts);
          queryClient.invalidateQueries(queryKeys.getUserProfile);
          queryClient.invalidateQueries(queryKeys.getUserProfileById);
          queryClient.invalidateQueries(queryKeys.getPostForStatistics);
          queryClient.invalidateQueries(queryKeys.getFollowers);
          queryClient.invalidateQueries(queryKeys.getFollowings);
          queryClient.invalidateQueries(queryKeys.getAllFollowers);
          queryClient.invalidateQueries(queryKeys.getAllFollowing);
          let userName =
            res?.payload?.data?.notificationAdded?.activity?.user?.userName;
          if (userName == null || userName == undefined) {
            userName = 'Someone';
          }
          switch (
            res?.payload?.data?.notificationAdded?.activity?.activityType
          ) {
            case ActivityType.Comment:
              messageDescription = userName + ' commented on your post ';
              break;
            case ActivityType.Like:
              messageDescription = userName + ' liked your post ';
              break;
            case ActivityType.Follow:
              messageDescription = userName + ' followed you';
              break;
            case ActivityType.Share:
              messageDescription = userName + ' shared your post ';
              break;
            case ActivityType.Save:
              messageDescription = userName + ' saved your post ';
              break;
          }
          break;

        case NotificationType.CreateChat:
          queryClient.invalidateQueries('conversations');
          queryClient.invalidateQueries('getConversationForUser');
          queryClient.invalidateQueries(queryKeys.getUserMessages);
          messageDescription = 'You have a new message!';
          break;

        case NotificationType.InviteToTopic:
          queryClient.invalidateQueries(queryKeys.getTopicsByUserId);
          queryClient.invalidateQueries(queryKeys.getAllTopics);
          queryClient.invalidateQueries(queryKeys.getAllTopicsCount);
          queryClient.invalidateQueries(queryKeys.getTopicsCountByUserId);
          messageDescription = 'You have been invited to a topic!';
          break;
        case NotificationType.PostDeletedByAdmin:
          queryClient.invalidateQueries(queryKeys.getPostById);
          queryClient.invalidateQueries(queryKeys.getCommentsByPostId);
          queryClient.invalidateQueries(queryKeys.getPosts);
          queryClient.invalidateQueries(queryKeys.getUserProfile);
          queryClient.invalidateQueries(queryKeys.getUserProfileById);
          queryClient.invalidateQueries(queryKeys.getPostForStatistics);
          messageDescription = 'Your post has been deleted by admin!';
      }
      queryClient.invalidateQueries(queryKeys.getNotifications);

      if (messageDescription != '') {
        showMessage({
          message: messageDescription,
          type: 'default',
        });
      }
    }
  };
  const onGetMessage = (event: any) => {
    const res = JSON.parse(event.data);

    if (
      res?.type !== 'ka' &&
      res.type === 'data' &&
      res?.payload?.data?.messageAdded
    ) {
      setMessageData(res?.payload?.data?.messageAdded);
      queryClient.invalidateQueries('conversations');
      queryClient.invalidateQueries('getConversationForUser');
      queryClient.invalidateQueries(queryKeys.getUserMessages);
    }
  };
  useEffect(() => {
    closeNotification();
  }, [notificationData]);

  useEffect(() => {
    closeMessage();
  }, [messageData]);

  const closeNotification = () => {
    setTimeout(() => {
      setNotificationData(undefined);
    }, 10000);
  };

  const closeMessage = () => {
    setTimeout(() => {
      setMessageData(undefined);
    }, 10000);
  };

  React.useEffect(() => {
    if (newIndex) {
      //@ts-ignore
      if (
        postsData?.length > newIndex + 1 ||
        postsData?.length === newIndex + 1
      ) {
        //@ts-ignore
        flatlistRef?.current?.scrollToIndex({animated: true, index: newIndex});
      }
    }
  }, [newIndex]);

  function goToNext(index: any) {
    setNewIndex(index);
  }

  function renderPostsItem({item, index}: {item: any; index: number}) {
    return <ExplorePost item={item} index={index} goToNext={goToNext} />;
  }

  function listEmpty() {
    return (
      <View style={styles.emptyTxt}>
        <AlternativeScreen msg={Strings.emptyString} />
      </View>
    );
  }

  return (
    <FlatList
      extraData={postsData}
      style={styles.container}
      ref={flatlistRef}
      horizontal
      data={postsData}
      legacyImplementation={true}
      renderItem={renderPostsItem}
      keyExtractor={item => item?.id.toString()}
      scrollEnabled={false}
      onEndReachedThreshold={0.5}
      onEndReached={({distanceFromEnd}) => {
        if (distanceFromEnd < 0) return;
        onLoadMore();
      }}
      ListEmptyComponent={!isLoading ? listEmpty : null}
    />
  );
};
export default ExplorePostList;

const styles = StyleSheet.create({
  container: {
    marginBottom: -windowHeight * 0.2,
    zIndex: -7,
  },
  emptyTxt: {
    width: windowWidth,
  },
});
