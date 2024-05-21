import {useInfiniteQuery} from 'react-query';

import {
  User_GetAllUsersQuery,
  User_GetAllUsersQueryVariables,
} from '~/generated/graphql';
import {GET_ALL_USERS} from '~/graphql/artist/AllUsers/queries';
import {fetcher} from '~/graphql/fetcher';
import {queryKeys} from '~/constants/queryKeys';
import {PAGE_SIZE} from '~/constants/pagination';

export const useGetAllUsers = ({
  where,
  options,
}: {
  where?: any;
  options?: any;
}) => {
  return useInfiniteQuery<
    User_GetAllUsersQuery,
    any,
    User_GetAllUsersQueryVariables,
    any
  >(
    [queryKeys.getAllUsers, where],
    async ({pageParam = 0}) => {
      return fetcher<User_GetAllUsersQuery, User_GetAllUsersQueryVariables>(
        GET_ALL_USERS,
        {
          skip: pageParam * PAGE_SIZE,
          take: PAGE_SIZE,
          where,
          order: {id: 'DESC'},
        },
      )();
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
      select: data => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.user_getAllUsers?.result?.items)
            .flat(),
        };
      },
      ...options,
    },
  );
};
