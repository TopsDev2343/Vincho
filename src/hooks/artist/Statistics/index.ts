import {useInfiniteQuery, useQuery} from 'react-query';
import {
  Post_GetByUserIdQueryVariables,
  Post_GetByUserIdQuery,
  PostLike_GetPostLikesQuery,
  PostLike_GetPostLikesQueryVariables,
  PostView_GetPostViewsQuery,
  PostView_GetPostViewsQueryVariables,
  User_GetUserCountPerMonthQuery,
  User_GetUserCountPerMonthQueryVariables,
  User_GetUserCountPerYearQuery,
  User_GetUserCountPerYearQueryVariables,
  Post_GetPostCountPerMonthQuery,
  Post_GetPostCountPerMonthQueryVariables,
  Post_GetPostCountPerYearQuery,
  Post_GetPostCountPerYearQueryVariables,
  Post_GetLikeCountPerMonthQuery,
  Post_GetLikeCountPerMonthQueryVariables,
  Post_GetLikeCountPerYearQuery,
  Post_GetLikeCountPerYearQueryVariables,
  Post_GetCommentCountPerMonthQuery,
  Post_GetCommentCountPerMonthQueryVariables,
  Post_GetCommentCountPerYearQuery,
  Post_GetCommentCountPerYearQueryVariables,
  User_GetPostLikesPerMonthQuery,
  User_GetPostLikesPerMonthQueryVariables,
  User_GetPostViewsPerMonthQuery,
  User_GetPostViewsPerMonthQueryVariables,
} from '~/generated/graphql';
import {
  GET_All_STATISTICS,
  GET_LIKEGROWTH_PER_MONTH,
  GET_POSTCOMMENTSCOUNT_PER_MONTH,
  GET_POSTCOMMENTSCOUNT_PER_YEAR,
  GET_POSTCOUNT_PER_MONTH,
  GET_POSTCOUNT_PER_YEAR,
  GET_POSTLIKECOUNT_PER_MONTH,
  GET_POSTLIKECOUNT_PER_YEAR,
  GET_POST_FOR_STATISTICS,
  GET_THIS_MONTH_LIKES,
  GET_THIS_MONTH_VIEWS,
  GET_USERCOUNT_PER_MONTH,
  GET_USERCOUNT_PER_YEAR,
  GET_VIDEOS_STATISTICS,
  GET_VIEWGROWTH_PER_MONTH,
} from '~/graphql/artist/Statistics/queries';
import graphQLClient, {fetcher} from '~/graphql/fetcher';
import {queryKeys} from '~/constants/queryKeys';
import {PAGE_SIZE} from '~/constants/pagination';

export const useGetPostForStatistics = (input: any) => {
  return useQuery<
    Post_GetByUserIdQuery,
    any,
    Post_GetByUserIdQueryVariables,
    any
  >([queryKeys.getPostForStatistics, input], async () => {
    return fetcher<any, any>(GET_POST_FOR_STATISTICS, input)();
  });
};

export const useGetAllStatistics = () => {
  return useQuery<any, any, any, any>(
    [queryKeys.getPostForStatisticsAll],
    async () => {
      return fetcher<any, any>(GET_All_STATISTICS)();
    },
  );
};

export const useGetVideosStatistics = () => {
  return useQuery<any, any, any, any>([], async () => {
    return fetcher<any, any>(GET_VIDEOS_STATISTICS)();
  });
};

export const useGetThisMonthLikes = (where: any) => {
  return useQuery<
    PostLike_GetPostLikesQuery,
    any,
    PostLike_GetPostLikesQueryVariables,
    any
  >([queryKeys.getPostForStatistics, where], async () => {
    return fetcher<
      PostLike_GetPostLikesQuery,
      PostLike_GetPostLikesQueryVariables
    >(GET_THIS_MONTH_LIKES, {
      where,
    })();
  });
};

export const useGetThisMonthViews = (where: any) => {
  return useQuery<
    PostView_GetPostViewsQuery,
    any,
    PostView_GetPostViewsQueryVariables,
    any
  >([queryKeys.getPostForStatistics, where], async () => {
    return fetcher<
      PostView_GetPostViewsQuery,
      PostView_GetPostViewsQueryVariables
    >(GET_THIS_MONTH_VIEWS, {where})();
  });
};

export const useUserStatistics = (userId: number) => {
  return useQuery<any, any, any, any>(
    [queryKeys.getPostForStatistics, userId],
    async () => {
      return fetcher<any, any>(
        ` 
      query {
        post_getPosts {
          result(where: {userId: {eq: ` +
          userId +
          `}}) {
            totalCount
          }
        }
        follow_getFollowers(followingId: ` +
          userId +
          `) {
          result (where:{follower: {isActive: {eq: true}}}){
            totalCount
          }
        }
        postLike_getPostLikes {
          result(where: {post: {isDeleted: {eq: false}, userId: {eq: ` +
          userId +
          `}}}) {
            totalCount
          }
        }
        postView_getPostViews {
          result(where: {post: {isDeleted: {eq: false}, userId: {eq: ` +
          userId +
          `}}}) {
            totalCount
          }
        }
        comment_getComments {
          result(where: {post: {isDeleted: {eq: false}, userId: {eq: ` +
          userId +
          `}}}) {
            totalCount
          }
        }

        follow_getFollowings(followerId: ` +
          userId +
          `) {
          result(where:{following: {isActive: {eq: true}}}) {
            totalCount
          }
        }


      }
    `,
      )();
    },
  );
};

export const useGetJoinedUsersMonthly = ({
  where,
  options,
  enabled,
}: {
  where?: any;
  options?: any;
  enabled?: boolean;
}) => {
  return useInfiniteQuery<
    User_GetUserCountPerMonthQuery,
    any,
    User_GetUserCountPerMonthQueryVariables,
    any
  >(
    [queryKeys.joinedUsersMonthly, where],
    async ({pageParam = 0}) => {
      return fetcher<
        User_GetUserCountPerMonthQuery,
        User_GetUserCountPerMonthQueryVariables
      >(GET_USERCOUNT_PER_MONTH, {
        skip: pageParam * 12,
        take: 12,
        where,
      })();
    },
    {
      getNextPageParam: (
        lastPage: User_GetUserCountPerMonthQuery,
        allPages: User_GetUserCountPerMonthQuery[],
      ) => {
        if (
          lastPage?.user_getUserCountPerMonth?.result?.pageInfo?.hasNextPage
        ) {
          return allPages.length;
        }
        return undefined;
      },
      select: data => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.user_getUserCountPerMonth?.result?.items)
            .flat(),
        };
      },
      ...options,
      enabled,
    },
  );
};
export const useGetJoinedUsersYearly = ({
  where,
  options,
  enabled,
}: {
  where?: any;
  options?: any;
  enabled?: boolean;
}) => {
  return useInfiniteQuery<
    User_GetUserCountPerYearQuery,
    any,
    User_GetUserCountPerYearQueryVariables,
    any
  >(
    [queryKeys.joinedUsersYearly, where],
    async ({pageParam = 0}) => {
      return fetcher<
        User_GetUserCountPerYearQuery,
        User_GetUserCountPerYearQueryVariables
      >(GET_USERCOUNT_PER_YEAR, {
        skip: pageParam * 12,
        take: 12,
        where,
      })();
    },
    {
      getNextPageParam: (
        lastPage: User_GetUserCountPerYearQuery,
        allPages: User_GetUserCountPerYearQuery[],
      ) => {
        if (lastPage?.user_getUserCountPerYear?.result?.pageInfo?.hasNextPage) {
          return allPages.length;
        }
        return undefined;
      },
      select: data => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.user_getUserCountPerYear?.result?.items)
            .flat(),
        };
      },
      ...options,
      enabled,
    },
  );
};

export const useGetPostsMonthly = ({
  where,
  fileType,
  options,
  enabled,
}: {
  where?: any;
  fileType: any;
  options?: any;
  enabled?: boolean;
}) => {
  return useInfiniteQuery<
    Post_GetPostCountPerMonthQuery,
    any,
    Post_GetPostCountPerMonthQueryVariables,
    any
  >(
    [queryKeys.statisticPostsMonthly, where, fileType],
    async ({pageParam = 0}) => {
      return fetcher<
        Post_GetPostCountPerMonthQuery,
        Post_GetPostCountPerMonthQueryVariables
      >(GET_POSTCOUNT_PER_MONTH, {
        where,
        fileType,
        skip: pageParam * 12,
        take: 12,
      })();
    },
    {
      getNextPageParam: (
        lastPage: Post_GetPostCountPerMonthQuery,
        allPages: Post_GetPostCountPerMonthQuery[],
      ) => {
        if (
          lastPage?.post_getPostCountPerMonth?.result?.pageInfo?.hasNextPage
        ) {
          return allPages.length;
        }
        return undefined;
      },
      select: data => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.post_getPostCountPerMonth?.result?.items)
            .flat(),
        };
      },
      ...options,
      enabled,
    },
  );
};
export const useGetPostsYearly = ({
  fileType,
  options,
  enabled,
}: {
  fileType: any;
  options?: any;
  enabled?: boolean;
}) => {
  return useInfiniteQuery<
    Post_GetPostCountPerYearQuery,
    any,
    Post_GetPostCountPerYearQueryVariables,
    any
  >(
    [queryKeys.joinedUsersYearly],
    async ({pageParam = 0}) => {
      return fetcher<
        Post_GetPostCountPerYearQuery,
        Post_GetPostCountPerYearQueryVariables
      >(GET_POSTCOUNT_PER_YEAR, {
        fileType,
        skip: pageParam * PAGE_SIZE,
        take: PAGE_SIZE,
      })();
    },
    {
      getNextPageParam: (
        lastPage: Post_GetPostCountPerYearQuery,
        allPages: Post_GetPostCountPerYearQuery[],
      ) => {
        if (lastPage?.post_getPostCountPerYear?.result?.pageInfo?.hasNextPage) {
          return allPages.length;
        }
        return undefined;
      },
      select: data => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.post_getPostCountPerYear?.result?.items)
            .flat(),
        };
      },
      ...options,
      enabled,
    },
  );
};

export const useGetPostLikesMonthly = ({
  where,
  options,
  enabled,
}: {
  where?: any;
  options?: any;
  enabled?: boolean;
}) => {
  return useInfiniteQuery<
    Post_GetLikeCountPerMonthQuery,
    any,
    Post_GetLikeCountPerMonthQueryVariables,
    any
  >(
    [queryKeys.statisticPostLikesMonthl, where],
    async ({pageParam = 0}) => {
      return fetcher<
        Post_GetLikeCountPerMonthQuery,
        Post_GetLikeCountPerMonthQueryVariables
      >(GET_POSTLIKECOUNT_PER_MONTH, {
        where,
        skip: pageParam * 12,
        take: 12,
      })();
    },
    {
      getNextPageParam: (
        lastPage: Post_GetLikeCountPerMonthQuery,
        allPages: Post_GetLikeCountPerMonthQuery[],
      ) => {
        if (
          lastPage?.post_getLikeCountPerMonth?.result?.pageInfo?.hasNextPage
        ) {
          return allPages.length;
        }
        return undefined;
      },
      select: data => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.post_getLikeCountPerMonth?.result?.items)
            .flat(),
        };
      },
      ...options,
      enabled,
    },
  );
};

export const useGetPostLikesYearly = ({
  options,
  enabled,
}: {
  options?: any;
  enabled?: boolean;
}) => {
  return useInfiniteQuery<
    Post_GetLikeCountPerYearQuery,
    any,
    Post_GetLikeCountPerYearQueryVariables,
    any
  >(
    [queryKeys.statisticsPostLikesYearly],
    async ({pageParam = 0}) => {
      return fetcher<
        Post_GetLikeCountPerYearQuery,
        Post_GetLikeCountPerYearQueryVariables
      >(GET_POSTLIKECOUNT_PER_YEAR, {
        skip: pageParam * PAGE_SIZE,
        take: PAGE_SIZE,
      })();
    },
    {
      getNextPageParam: (
        lastPage: Post_GetLikeCountPerYearQuery,
        allPages: Post_GetLikeCountPerYearQuery[],
      ) => {
        if (lastPage?.post_getLikeCountPerYear?.result?.pageInfo?.hasNextPage) {
          return allPages.length;
        }
        return undefined;
      },
      select: data => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.post_getLikeCountPerYear?.result?.items)
            .flat(),
        };
      },
      ...options,
      enabled,
    },
  );
};

export const useGetPostCommentsMonthly = ({
  where,
  options,
  enabled,
}: {
  where?: any;
  options?: any;
  enabled?: boolean;
}) => {
  return useInfiniteQuery<
    Post_GetCommentCountPerMonthQuery,
    any,
    Post_GetCommentCountPerMonthQueryVariables,
    any
  >(
    [queryKeys.statisticPostCommentsMonthly, where],
    async ({pageParam = 0}) => {
      return fetcher<
        Post_GetCommentCountPerMonthQuery,
        Post_GetCommentCountPerMonthQueryVariables
      >(GET_POSTCOMMENTSCOUNT_PER_MONTH, {
        where,
        skip: pageParam * 12,
        take: 12,
      })();
    },
    {
      getNextPageParam: (
        lastPage: Post_GetCommentCountPerMonthQuery,
        allPages: Post_GetCommentCountPerMonthQuery[],
      ) => {
        if (
          lastPage?.post_getCommentCountPerMonth?.result?.pageInfo?.hasNextPage
        ) {
          return allPages.length;
        }
        return undefined;
      },
      select: data => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.post_getCommentCountPerMonth?.result?.items)
            .flat(),
        };
      },
      ...options,
      enabled,
    },
  );
};

export const useGetPostCommentsYearly = ({
  options,
  enabled,
}: {
  options?: any;
  enabled?: boolean;
}) => {
  return useInfiniteQuery<
    Post_GetCommentCountPerYearQuery,
    any,
    Post_GetCommentCountPerYearQueryVariables,
    any
  >(
    [queryKeys.statisticsPostCommentsYearly],
    async ({pageParam = 0}) => {
      return fetcher<
        Post_GetCommentCountPerYearQuery,
        Post_GetCommentCountPerYearQueryVariables
      >(GET_POSTCOMMENTSCOUNT_PER_YEAR, {
        skip: pageParam * PAGE_SIZE,
        take: PAGE_SIZE,
      })();
    },
    {
      getNextPageParam: (
        lastPage: Post_GetCommentCountPerYearQuery,
        allPages: Post_GetCommentCountPerYearQuery[],
      ) => {
        if (
          lastPage?.post_getCommentCountPerYear?.result?.pageInfo?.hasNextPage
        ) {
          return allPages.length;
        }
        return undefined;
      },
      select: data => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.post_getCommentCountPerYear?.result?.items)
            .flat(),
        };
      },
      ...options,
      enabled,
    },
  );
};

export const useGetLikeGrowthMonthly = ({
  userId,
  options,
}: {
  userId?: number;
  options?: any;
}) => {
  return useInfiniteQuery<
    User_GetPostLikesPerMonthQuery,
    any,
    User_GetPostLikesPerMonthQueryVariables,
    any
  >(
    [queryKeys.likeGrowthMonthly],
    async ({pageParam = 0}) => {
      return fetcher<
        User_GetPostLikesPerMonthQuery,
        User_GetPostLikesPerMonthQueryVariables
      >(GET_LIKEGROWTH_PER_MONTH, {
        userId,
        skip: pageParam * 100,
        take: 100,
      })();
    },
    {
      getNextPageParam: (
        lastPage: User_GetPostLikesPerMonthQuery,
        allPages: User_GetPostLikesPerMonthQuery[],
      ) => {
        if (
          lastPage?.user_getPostLikesPerMonth?.result?.pageInfo?.hasNextPage
        ) {
          return allPages.length;
        }
        return undefined;
      },
      select: data => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.user_getPostLikesPerMonth?.result?.items)
            .flat(),
        };
      },
      ...options,
    },
  );
};

export const useGetViewGrowthMonthly = ({
  userId,
  options,
}: {
  userId?: number;
  options?: any;
}) => {
  return useInfiniteQuery<
    User_GetPostViewsPerMonthQuery,
    any,
    User_GetPostViewsPerMonthQueryVariables,
    any
  >(
    [queryKeys.viewGrowthMonthly],
    async ({pageParam = 0}) => {
      return fetcher<
        User_GetPostViewsPerMonthQuery,
        User_GetPostViewsPerMonthQueryVariables
      >(GET_VIEWGROWTH_PER_MONTH, {
        userId,
        skip: pageParam * 100,
        take: 100,
      })();
    },
    {
      getNextPageParam: (
        lastPage: User_GetPostViewsPerMonthQuery,
        allPages: User_GetPostViewsPerMonthQuery[],
      ) => {
        if (
          lastPage?.user_getPostViewsPerMonth?.result?.pageInfo?.hasNextPage
        ) {
          return allPages.length;
        }
        return undefined;
      },
      select: data => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.user_getPostViewsPerMonth?.result?.items)
            .flat(),
        };
      },
      ...options,
    },
  );
};
