import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';

import {AdminHomeBtn, CustomContainer} from '~/components';
import {useGetUserProfile} from '~/hooks/artist/User';
import {Strings} from '~/assets/strings';
import {
  reportedAccounts,
  reportedPosts,
  recentActivities,
  statistics,
  postCategories,
  communities,
} from '~/assets/icons';
import {navigate} from '~/navigation/methods';
import {
  useMessageSubscription,
  useNotificationSubscription,
} from '~/hooks/artist/Notification';
import {useQueryClient} from 'react-query';
import {useAuthStore} from '~/stores';
import {ActivityType, NotificationType} from '~/generated/graphql';
import {queryKeys} from '~/constants/queryKeys';
import {showMessage} from 'react-native-flash-message';

const Home = () => {
  //  const { userId } = useAuthStore(state => state)
  //   const { userType } = useUserTypeStore(state => state)
  const {
    isLoading: getProfileLoading,
    isSuccess: getProfileSuccess,
    isError: getProfileFail,
    refetch: refetchProfile,
  } = useGetUserProfile();

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
      }

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

  return (
    <CustomContainer
      isLoading={getProfileLoading}
      isError={getProfileFail}
      errorMsg={'Something went wrong!'}
      onPress={() => {
        refetchProfile();
      }}>
      {getProfileSuccess && (
        <ScrollView>
          <AdminHomeBtn
            icon={reportedAccounts}
            title={Strings.reportedAccounts}
            onPress={() => navigate('ReportedAccountScreen')}
          />
          <AdminHomeBtn
            icon={reportedPosts}
            title={Strings.reportedPosts}
            onPress={() => navigate('ReportedPostScreen')}
          />
          <AdminHomeBtn
            icon={recentActivities}
            title={Strings.recentActivities}
            onPress={() => navigate('RecentActivityScreen')}
          />
          <AdminHomeBtn
            icon={statistics}
            title={Strings.statistics}
            onPress={() => navigate('StatisticsScreen')}
          />
          <AdminHomeBtn
            icon={postCategories}
            title={Strings.postCategories}
            onPress={() => navigate('CategoryList')}
          />
          <AdminHomeBtn
            icon={communities}
            title={Strings.communities}
            onPress={() => navigate('CommunityScreen')}
          />
        </ScrollView>
      )}
    </CustomContainer>
  );
};

export default Home;
