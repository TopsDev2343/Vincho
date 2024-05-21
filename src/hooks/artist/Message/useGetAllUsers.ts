import {useInfiniteQuery} from 'react-query';
import {PAGE_SIZE} from '~/constants/pagination';
import {queryKeys} from '~/constants/queryKeys';
import type {User, User_GetAllUsersQuery} from '~/generated/graphql';
import graphQLClient, {fetcher} from '~/graphql/fetcher';
import {GET_ALL_USERS} from '~/graphql/artist/AllUsers/queries';

const useGetAllUsers = ({
  where,
  order,
  options = {},
}: {
  where?: any;
  order?: any;
  options?: any;
}) => {
  return useInfiniteQuery<User_GetAllUsersQuery, any, User, any>(
    [queryKeys.getAllUsers, where, order],
    async ({pageParam = 0}) => {
      return fetcher<User_GetAllUsersQuery, any>(GET_ALL_USERS, {
        skip: pageParam * PAGE_SIZE,
        take: PAGE_SIZE,
        where,
        order,
      })();
    },
    {
      getNextPageParam: (
        lastPage: User_GetAllUsersQuery,
        allPages: User_GetAllUsersQuery[],
      ) => {
        if (lastPage?.user_getAllUsers?.result?.pageInfo?.hasNextPage) {
          return allPages.length;
        }
        return undefined;
      },
      select: data => ({
        ...data,
        pages: data?.pages?.map(a => a.user_getAllUsers?.result?.items).flat(),
      }),
      ...options,
    },
  );
};

export default useGetAllUsers;
