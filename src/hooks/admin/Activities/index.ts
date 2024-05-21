import {useInfiniteQuery} from 'react-query';
import {
  Activity_GetActivitiesQueryVariables,
  Activity_GetActivitiesQuery,
  MostActiveUsersQuery,
  MostActiveUsersQueryVariables,
} from '~/generated/graphql';
import {
  GET_ALL_ACTIVITIES,
  GET_MOST_ACTIVE_USERS,
} from '~/graphql/admin/Activities/queries';
import {PAGE_SIZE} from '~/constants/pagination';
import graphQLClient, {fetcher} from '~/graphql/fetcher';
import {queryKeys} from '~/constants/queryKeys';

export const useGetAllActivities = ({
  where,
  order,
  pageSize,
}: {
  where?: any;
  order?: any;
  pageSize?: number;
}) => {
  return useInfiniteQuery<
    Activity_GetActivitiesQuery,
    any,
    Activity_GetActivitiesQueryVariables,
    any
  >(
    [queryKeys.getAllActivities, where, pageSize, order],
    async ({pageParam = 0}) => {
      return fetcher<
        Activity_GetActivitiesQuery,
        Activity_GetActivitiesQueryVariables
      >(GET_ALL_ACTIVITIES, {
        skip: pageParam * PAGE_SIZE,
        take: pageSize != null ? pageSize : PAGE_SIZE,
        where,
        order,
      })();
    },
    {
      getNextPageParam: (
        lastPage: Activity_GetActivitiesQuery,
        allPages: Activity_GetActivitiesQueryVariables[],
      ) => {
        if (lastPage?.activity_getActivities?.result?.pageInfo?.hasNextPage) {
          return allPages.length;
        }
        return undefined;
      },
      select: data => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.activity_getActivities?.result?.items)
            .flat(),
        };
      },
    },
  );
};

export const useGetMostActiveUsers = ({
  where,
  order,
  fromDate,
  toDate,
  pageSize,
}: {
  where?: any;
  order?: any;
  fromDate: any;
  toDate: any;
  pageSize?: number;
}) => {
  return useInfiniteQuery<
    MostActiveUsersQuery,
    any,
    MostActiveUsersQueryVariables,
    any
  >(
    [queryKeys.getMostActiveusers, pageSize, where, fromDate, toDate, order],
    async ({pageParam = 0}) => {
      return fetcher<MostActiveUsersQuery, MostActiveUsersQueryVariables>(
        GET_MOST_ACTIVE_USERS,
        {
          skip: pageParam * PAGE_SIZE,
          take: pageSize != null ? pageSize : PAGE_SIZE,
          where,
          order,
          fromDate,
          toDate,
        },
      )();
    },
    {
      getNextPageParam: (
        lastPage: MostActiveUsersQuery,
        allPages: MostActiveUsersQueryVariables[],
      ) => {
        if (
          lastPage?.activity_getUsersActivitiesByCount?.result?.pageInfo
            ?.hasNextPage
        ) {
          return allPages.length;
        }
        return undefined;
      },
      select: data => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.activity_getUsersActivitiesByCount?.result?.items)
            .flat(),
        };
      },
    },
  );
};
