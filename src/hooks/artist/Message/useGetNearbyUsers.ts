import {useInfiniteQuery} from 'react-query';
import {PAGE_SIZE} from '~/constants/pagination';
import {queryKeys} from '~/constants/queryKeys';
import type {User, User_GetNearbyUsers} from '~/generated/graphql';
import graphQLClient, {fetcher} from '~/graphql/fetcher';
import {user_getNearbyUsers} from '~/graphql/artist/User/queries';

const useGetNearbyUsers = ({
  where,
  order,
  options = {},
  currentLocation,
  updateLocation,
  enabled,
}: {
  where?: any;
  order?: any;
  options?: any;
  currentLocation: number[];
  updateLocation: boolean;
  enabled: boolean;
}) => {
  return useInfiniteQuery<User_GetNearbyUsers, any, User, any>(
    [queryKeys.getNearbyUsers, where, order, currentLocation, updateLocation],
    async ({pageParam = 0}) => {
      return fetcher<User_GetNearbyUsers, any>(user_getNearbyUsers, {
        skip: pageParam * PAGE_SIZE,
        take: PAGE_SIZE,
        where,
        order,
        currentLocation,
        updateLocation,
      })();
    },
    {
      getNextPageParam: (
        lastPage: User_GetNearbyUsers,
        allPages: User_GetNearbyUsers[],
      ) => {
        if (lastPage?.user_getNearbyUsers?.result?.pageInfo?.hasNextPage) {
          return allPages.length;
        }
        return undefined;
      },
      select: data => ({
        ...data,
        pages: data?.pages
          ?.map(a => a.user_getNearbyUsers?.result?.items)
          .flat(),
      }),
      enabled: enabled,
      ...options,
    },
  );
};

export default useGetNearbyUsers;
