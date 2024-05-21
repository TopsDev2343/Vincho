import {useInfiniteQuery, useMutation, useQuery} from 'react-query';
import {
  ReportPost_GetReportPostsQuery,
  ReportPost_GetReportPostsQueryVariables,
  ReportPost_SetAsReviewedMutation,
  ReportPost_SetAsReviewedMutationVariables,
  ReportUser_GetReportUsersQuery,
  ReportUser_GetReportUsersQueryVariables,
  ReportUser_SetAsReviewedMutation,
  ReportUser_SetAsReviewedMutationVariables,
  User_GetAllUsersQuery,
  User_GetAllUsersQueryVariables,
} from '~/generated/graphql';
import {
  GET_DISABLED_USERS,
  GET_REPORTED_ACCOUNTS,
  GET_REPORTED_ACCOUNTS_COUNT,
  GET_REPORTED_POSTS,
  SET_REVIEW_ACCOUNT,
  SET_REVIEW_POST,
} from '~/graphql/admin/Reports/queries';
import graphQLClient, {fetcher} from '~/graphql/fetcher';
import {PAGE_SIZE} from '~/constants/pagination';
import {queryKeys} from '~/constants/queryKeys';
import snackBar from '~/utils/snackBar';
import {Colors} from '~/styles/colors';

export const useGetReportedAccounts = ({where}: {where?: any}) => {
  return useInfiniteQuery<
    ReportUser_GetReportUsersQuery,
    any,
    ReportUser_GetReportUsersQueryVariables,
    any
  >(
    [queryKeys.getReportedAccounts, where],
    async ({pageParam = 0}) => {
      return fetcher<
        ReportUser_GetReportUsersQuery,
        ReportUser_GetReportUsersQueryVariables
      >(GET_REPORTED_ACCOUNTS, {
        skip: pageParam * PAGE_SIZE,
        take: PAGE_SIZE,
        where: where,
        order: {createdDate: 'DESC'},
      })();
    },
    {
      getNextPageParam: (
        lastPage: ReportUser_GetReportUsersQuery,
        allPages: ReportUser_GetReportUsersQueryVariables[],
      ) => {
        if (
          lastPage?.reportUser_getReportUsers?.result?.pageInfo?.hasNextPage
        ) {
          return allPages.length;
        }
        return undefined;
      },
      select: data => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.reportUser_getReportUsers?.result?.items)
            .flat(),
        };
      },
    },
  );
};

export const useGetReportedPosts = ({where}: {where?: any}) => {
  return useInfiniteQuery<
    ReportPost_GetReportPostsQuery,
    any,
    ReportPost_GetReportPostsQueryVariables,
    any
  >(
    [queryKeys.getReportedPosts, where],
    async ({pageParam = 0}) => {
      return fetcher<
        ReportPost_GetReportPostsQuery,
        ReportPost_GetReportPostsQueryVariables
      >(GET_REPORTED_POSTS, {
        skip: pageParam * PAGE_SIZE,
        take: PAGE_SIZE,
        where,
        order: {createdDate: 'DESC'},
      })();
    },
    {
      getNextPageParam: (
        lastPage: ReportPost_GetReportPostsQuery,
        allPages: ReportPost_GetReportPostsQueryVariables[],
      ) => {
        if (
          lastPage?.reportPost_getReportPosts?.result?.pageInfo?.hasNextPage
        ) {
          return allPages.length;
        }
        return undefined;
      },
      select: data => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.reportPost_getReportPosts?.result?.items)
            .flat(),
        };
      },
    },
  );
};

export const useGetReportUsers = ({
  where,
  order,
  options = {},
}: {
  where?: any;
  order?: any;
  options?: any;
}) => {
  return useInfiniteQuery<
    ReportUser_GetReportUsersQuery,
    any,
    ReportUser_GetReportUsersQueryVariables,
    any
  >(
    [queryKeys.getReportUsers, where, order],
    async ({pageParam = 0}) => {
      return fetcher<
        ReportUser_GetReportUsersQuery,
        ReportUser_GetReportUsersQueryVariables
      >(GET_REPORTED_ACCOUNTS, {
        skip: pageParam * PAGE_SIZE,
        take: PAGE_SIZE,
        where,
        order,
      })();
    },
    {
      getNextPageParam: (
        lastPage: ReportUser_GetReportUsersQuery,
        allPages: ReportUser_GetReportUsersQuery[],
      ) => {
        if (
          lastPage?.reportUser_getReportUsers?.result?.pageInfo?.hasNextPage
        ) {
          return allPages.length;
        }
        return undefined;
      },
      select: data => ({
        ...data,
        pages: data?.pages
          ?.map(a => a.reportUser_getReportUsers?.result?.items)
          .flat(),
      }),
      ...options,
    },
  );
};

export const useGetReviewedReportPosts = ({
  where,
  order,
  options = {},
}: {
  where?: any;
  order?: any;
  options?: any;
}) => {
  return useInfiniteQuery<
    ReportPost_GetReportPostsQuery,
    any,
    ReportPost_GetReportPostsQueryVariables,
    any
  >(
    [queryKeys.getReportedPosts, where, order],
    async ({pageParam = 0}) => {
      return fetcher<
        ReportPost_GetReportPostsQuery,
        ReportPost_GetReportPostsQueryVariables
      >(GET_REPORTED_POSTS, {
        skip: pageParam * PAGE_SIZE,
        take: PAGE_SIZE,
        where,
        order,
      })();
    },
    {
      getNextPageParam: (
        lastPage: ReportPost_GetReportPostsQuery,
        allPages: ReportPost_GetReportPostsQuery[],
      ) => {
        if (
          lastPage?.reportPost_getReportPosts?.result?.pageInfo?.hasNextPage
        ) {
          return allPages.length;
        }
        return undefined;
      },
      select: data => ({
        ...data,
        pages: data?.pages
          ?.map(a => a.reportPost_getReportPosts?.result?.items)
          .flat(),
      }),
      ...options,
    },
  );
};

export const useGetDisbaledUsers = ({
  where,
  order,
  options = {},
}: {
  where?: any;
  order?: any;
  options?: any;
}) => {
  return useInfiniteQuery<
    User_GetAllUsersQuery,
    any,
    User_GetAllUsersQueryVariables,
    any
  >(
    [queryKeys.getReportedPosts, where, order],
    async ({pageParam = 0}) => {
      return fetcher<User_GetAllUsersQuery, User_GetAllUsersQueryVariables>(
        GET_DISABLED_USERS,
        {
          skip: pageParam * PAGE_SIZE,
          take: PAGE_SIZE,
          where,
          order,
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
      select: data => ({
        ...data,
        pages: data?.pages?.map(a => a.user_getAllUsers?.result?.items).flat(),
      }),
      ...options,
    },
  );
};

export const useReviewedAccount = () => {
  return useMutation<
    ReportUser_SetAsReviewedMutation,
    any,
    ReportUser_SetAsReviewedMutationVariables
  >(
    (input: any) => {
      return fetcher<
        ReportUser_SetAsReviewedMutation,
        ReportUser_SetAsReviewedMutationVariables
      >(SET_REVIEW_ACCOUNT, input)();
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

export const useReviewedPost = () => {
  return useMutation<
    ReportPost_SetAsReviewedMutation,
    any,
    ReportPost_SetAsReviewedMutationVariables
  >(
    (input: any) => {
      return fetcher<
        ReportPost_SetAsReviewedMutation,
        ReportPost_SetAsReviewedMutationVariables
      >(SET_REVIEW_POST, input)();
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

export const useGetReportedAccountsCount = ({where}: {where?: any}) => {
  return useQuery<
    ReportUser_GetReportUsersQuery,
    any,
    ReportUser_GetReportUsersQueryVariables
  >(queryKeys.getAllTopicsCount, () => {
    return fetcher<
      ReportUser_GetReportUsersQuery,
      ReportUser_GetReportUsersQueryVariables
    >(GET_REPORTED_ACCOUNTS_COUNT, {
      where: where,
    })();
  });
};
