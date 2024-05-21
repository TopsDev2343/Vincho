import {useInfiniteQuery, useMutation, useQuery} from 'react-query';
import {
  Activity_GetByUserIdQueryVariables,
  Activity_GetByUserIdQuery,
  Notification_GetNotificationsQuery,
  Notification_GetNotificationsQueryVariables,
} from '~/generated/graphql';
import {
  GET_ACTIVITIES_BY_USER_ID,
  GET_NOTIFICATIONS,
  GET_NOTIFICATIONS_COUNTS,
} from '~/graphql/artist/Activities/queries';
import {PAGE_SIZE} from '~/constants/pagination';
import {fetcher} from '~/graphql/fetcher';
import {queryKeys} from '~/constants/queryKeys';
import snackBar from '~/utils/snackBar';
import {Colors} from '~/styles/colors';
import {READ_NOTIFICATIONS} from '~/graphql/artist/Activities/mutations';

export const useGetActivitiesByUserId = ({
  userId,
}: {
  userId: number | undefined;
}) => {
  return useInfiniteQuery<
    Activity_GetByUserIdQuery,
    any,
    Activity_GetByUserIdQueryVariables,
    any
  >(
    [queryKeys.getActivitiesByUserId, userId],
    async ({pageParam = 0}) => {
      return fetcher<
        Activity_GetByUserIdQuery,
        Activity_GetByUserIdQueryVariables
      >(GET_ACTIVITIES_BY_USER_ID, {
        skip: pageParam * PAGE_SIZE,
        take: PAGE_SIZE,
        userId,
        where: {
          or: [
            {targetPost: {isDeleted: {eq: false}}},
            {
              and: [
                {targetComment: {isDeleted: {eq: false}}},
                {targetComment: {post: {isDeleted: {eq: false}}}},
              ],
            },
            {targetTopicPost: {isDeleted: {eq: false}}},
            {targetUser: {isDeleted: {eq: false}}},
          ],
        },
        order: {id: 'DESC'},
      })();
    },
    {
      getNextPageParam: (
        lastPage: Activity_GetByUserIdQuery,
        allPages: Activity_GetByUserIdQueryVariables[],
      ) => {
        if (lastPage?.activity_getByUserId?.result?.pageInfo?.hasNextPage) {
          return allPages.length;
        }
        return undefined;
      },
      select: data => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.activity_getByUserId?.result?.items)
            .flat(),
        };
      },
    },
  );
};

export const useGetNotifications = () => {
  return useInfiniteQuery<
    Notification_GetNotificationsQuery,
    any,
    Notification_GetNotificationsQueryVariables,
    any
  >(
    [queryKeys.getNotifications],
    async ({pageParam = 0}) => {
      return fetcher<
        Notification_GetNotificationsQuery,
        Notification_GetNotificationsQueryVariables
      >(GET_NOTIFICATIONS, {
        skip: pageParam * PAGE_SIZE,
        take: PAGE_SIZE,
        where: {
          and: [
            {activity: {activityType: {neq: 'SHARE_POST'}}},
            {activity: {activityType: {neq: 'SHARE_TOPIC_POST'}}},
            {notificationType: {neq: 'CREATE_TOPIC'}},
          ],
        },
        order: {id: 'DESC'},
      })();
    },
    {
      getNextPageParam: (
        lastPage: Notification_GetNotificationsQuery,
        allPages: Notification_GetNotificationsQueryVariables[],
      ) => {
        if (
          lastPage?.notification_getNotifications?.result?.pageInfo?.hasNextPage
        ) {
          return allPages.length;
        }
        return undefined;
      },
      select: data => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.notification_getNotifications?.result?.items)
            .flat(),
        };
      },
    },
  );
};

export const useGetNotificationReadedCount = (where: any) => {
  return useQuery<
    Notification_GetNotificationsQuery,
    any,
    Notification_GetNotificationsQueryVariables,
    any
  >([queryKeys.getNotifications, where], async () => {
    return fetcher<
      Notification_GetNotificationsQuery,
      Notification_GetNotificationsQueryVariables
    >(GET_NOTIFICATIONS_COUNTS, {
      where,
    })();
  });
};

export const useReadNotifcations = () => {
  return useMutation<any, any, any>(
    () => {
      return fetcher<any, any>(READ_NOTIFICATIONS)();
    },
    {
      onError: (errorData: any) => {
        snackBar({
          message: JSON.stringify(errorData),
          color: Colors.error,
        });
      },
    },
  );
};
