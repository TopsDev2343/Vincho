import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query';
import {
  PostLike_CreatePostLikeMutation,
  ReportPost_CreateReportPostMutation,
  ReportPost_CreateReportPostMutationVariables,
  PostLike_CreatePostLikeMutationVariables,
  Post_GetFollowingPostsQueryVariables,
  Post_GetFollowingPostsQuery,
  Follow_GetFollowingsQuery,
  Follow_GetFollowingsQueryVariables,
  PostLike_GetPostLikesQuery,
  PostLike_GetPostLikesQueryVariables,
  Post_GetByCategoryIdQueryVariables,
  Post_GetByCategoryIdQuery,
  PostLike_DeletePostLikeMutation,
  PostLike_DeletePostLikeMutationVariables,
  Post_GetPostsQuery,
  Pos_GetPostQueryVariables,
  Post_CreatePostMutation,
  Post_CreatePostMutationVariables,
  Post_GetPostQuery,
  Post_DeletePostMutation,
  Post_DeletePostMutationVariables,
  Follow_GetFollowersQuery,
  Follow_GetFollowersQueryVariables,
  ReportUser_CreateReportUserMutation,
  ReportUser_CreateReportUserMutationVariables,
  Post_GetPostsNearMeQueryVariables,
  Post_GetPostsNearMeQuery,
  PostView_CreatePostViewMutation,
  PostView_CreatePostViewMutationVariables,
  Post_GetUnViewedPostsQuery,
  Post_GetUnViewedPostsQueryVariables,
  Post_GetByHashtagIdQuery,
  Post_GetByHashtagIdQueryVariables,
  PostSave_CreatePostSaveMutation,
  PostSave_CreatePostSaveMutationVariables,
  PostSave_GetPostSavesQuery,
  PostSave_GetPostSavesQueryVariables,
  Post_SetAsRecommendedMutation,
  Post_SetAsRecommendedMutationVariables,
} from '~/generated/graphql';
import {
  GET_EXPLORE_POST_BY_CATEGORY_ID,
  GET_FOLLOWINGS,
  GET_POST_LIKES,
  GET_FOLLOWING_EXPLORE_POST,
  GET_POSTS,
  GET_POST_BY_ID,
  GET_FOLLOWERS,
  GET_NEARBY_EXPLORE_POST,
  GET_UNVIEWED_POSTS,
  GET_EXPLORE_POST_BY_HASHTAG_ID,
  GET_POST_SAVES,
} from '~/graphql/artist/Posts/queries';
import {
  REPORT_POST,
  CREATE_LIKE_POST,
  CREATE_POST,
  DELETE_POST_LIKE,
  DELETE_POST,
  CREATE_POST_VIEW,
  CREATE_POST_SAVE,
  RECOMMEND_POST,
} from '~/graphql/artist/Posts/mutations';
import graphQLClient, {fetcher} from '~/graphql/fetcher';
import {PAGE_SIZE} from '~/constants/pagination';
import {queryKeys} from '~/constants/queryKeys';
import snackBar from '~/utils/snackBar';
import {Colors} from '~/styles/colors';
import {REPORT_USER} from '~/graphql/artist/User/mutations';

export const useGetNearbyExplorePosts = ({
  categoryIds,
  location,
  enabled,
  options,
  where,
}: {
  categoryIds: number[];
  location: number[];
  enabled?: boolean;
  options?: any;
  where?: any;
}) => {
  return useInfiniteQuery<
    Post_GetPostsNearMeQuery,
    any,
    Post_GetPostsNearMeQueryVariables,
    any
  >(
    [queryKeys.getNearbyExplorePosts],
    async ({pageParam = 0}) => {
      return fetcher<
        Post_GetPostsNearMeQuery,
        Post_GetPostsNearMeQueryVariables
      >(GET_NEARBY_EXPLORE_POST, {
        skip: pageParam * PAGE_SIZE,
        take: PAGE_SIZE,
        categoryIds: categoryIds,
        location: location,
        where: where || {user: {isActive: {eq: true}}},
        //order: {id: 'DESC'},
      })();
    },
    {
      getNextPageParam: (
        lastPage: Post_GetPostsNearMeQuery,
        allPages: Post_GetPostsNearMeQueryVariables[],
      ) => {
        if (lastPage?.post_getPostsNearMe?.result?.pageInfo?.hasNextPage) {
          return allPages.length;
        }
        return undefined;
      },
      select: data => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.post_getPostsNearMe?.result?.items)
            .flat(),
        };
      },
      enabled: enabled == undefined ? false : enabled,
      ...options,
    },
  );
};

export const useReportPost = () => {
  return useMutation<
    ReportPost_CreateReportPostMutation,
    any,
    ReportPost_CreateReportPostMutationVariables
  >(
    (input: any) => {
      return fetcher<
        ReportPost_CreateReportPostMutation,
        ReportPost_CreateReportPostMutationVariables
      >(REPORT_POST, {input})();
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

export const useCreateLikePost = () => {
  const queryClient = useQueryClient();
  return useMutation<
    PostLike_CreatePostLikeMutation,
    any,
    PostLike_CreatePostLikeMutationVariables
  >(
    (input: any) => {
      return fetcher<
        PostLike_CreatePostLikeMutation,
        PostLike_CreatePostLikeMutationVariables
      >(CREATE_LIKE_POST, {
        input,
      })();
    },
    {
      onSuccess: data => {
        if (data.postLike_createPostLike?.status.value === 'Success') {
          queryClient.invalidateQueries('getPostLikes');
        }
      },
    },
  );
};

export const useCreatePostView = () => {
  const queryClient = useQueryClient();
  return useMutation<
    PostView_CreatePostViewMutation,
    any,
    PostView_CreatePostViewMutationVariables
  >(
    (input: any) => {
      return fetcher<
        PostView_CreatePostViewMutation,
        PostView_CreatePostViewMutationVariables
      >(CREATE_POST_VIEW, {
        input,
      })();
    },
    {
      onSuccess: data => {
        if (data.postView_createPostView?.status.value === 'Success') {
          queryClient.invalidateQueries('getPostViews');
        }
      },
    },
  );
};

export const useCreatePostSavet = () => {
  const queryClient = useQueryClient();
  return useMutation<
    PostSave_CreatePostSaveMutation,
    any,
    PostSave_CreatePostSaveMutationVariables
  >(
    (input: any) => {
      return fetcher<
        PostSave_CreatePostSaveMutation,
        PostSave_CreatePostSaveMutationVariables
      >(CREATE_POST_SAVE, {
        input,
      })();
    },
    {
      onSuccess: data => {
        if (data.postSave_createPostSave?.status.value === 'Success') {
          queryClient.invalidateQueries('getPostSave');
        }
      },
    },
  );
};

export const useDislikePost = () => {
  const queryClient = useQueryClient();
  return useMutation<
    PostLike_DeletePostLikeMutation,
    any,
    PostLike_DeletePostLikeMutationVariables
  >(
    (input: any) => {
      return fetcher<
        PostLike_DeletePostLikeMutation,
        PostLike_DeletePostLikeMutationVariables
      >(DELETE_POST_LIKE, input)();
    },
    {
      onSuccess: data => {
        if (data.postLike_deletePostLike?.value === 'Success') {
          queryClient.invalidateQueries('getPostLikes');
        }
      },
      onError: (errorData: any) => {
        snackBar({
          message: JSON.stringify(errorData),
          color: Colors.error,
        });
      },
    },
  );
};

export const useGetPostLikes = ({
  where,
  order,
  options = {},
}: {
  where?: any;
  order?: any;
  options?: any;
}) => {
  return useInfiniteQuery<
    PostLike_GetPostLikesQuery,
    any,
    PostLike_GetPostLikesQueryVariables,
    any
  >(
    [queryKeys.getPostLikes, where, order],
    async ({pageParam = 0}) => {
      return fetcher<
        PostLike_GetPostLikesQuery,
        PostLike_GetPostLikesQueryVariables
      >(GET_POST_LIKES, {
        skip: pageParam * PAGE_SIZE,
        take: PAGE_SIZE,
        where,
        order,
      })();
    },
    {
      getNextPageParam: (
        lastPage: PostLike_GetPostLikesQuery,
        allPages: PostLike_GetPostLikesQuery[],
      ) => {
        if (lastPage?.postLike_getPostLikes?.result?.pageInfo?.hasNextPage) {
          return allPages.length;
        }
        return undefined;
      },
      select: data => ({
        ...data,
        pages: data?.pages
          ?.map(a => a.postLike_getPostLikes?.result?.items)
          .flat(),
      }),
      ...options,
    },
  );
};

export const useGetFollowings = ({
  followerId,
  where,
  order,
  options = {},
}: {
  followerId: number;
  where?: any;
  order?: any;
  options?: any;
}) => {
  return useInfiniteQuery<
    Follow_GetFollowingsQuery,
    any,
    Follow_GetFollowingsQueryVariables,
    any
  >(
    [queryKeys.getFollowings, followerId, where],
    async ({pageParam = 0}) => {
      return fetcher<
        Follow_GetFollowingsQuery,
        Follow_GetFollowingsQueryVariables
      >(GET_FOLLOWINGS, {
        followerId,
        skip: pageParam * PAGE_SIZE,
        take: PAGE_SIZE,
        where,
        order,
      })();
    },
    {
      getNextPageParam: (
        lastPage: Follow_GetFollowingsQuery,
        allPages: Follow_GetFollowingsQuery[],
      ) => {
        if (lastPage?.follow_getFollowings?.result?.pageInfo?.hasNextPage) {
          return allPages.length;
        }
        return undefined;
      },
      select: data => ({
        ...data,
        pages: data?.pages
          ?.map(a => a.follow_getFollowings?.result?.items)
          .flat(),
      }),
      ...options,
    },
  );
};

export const useGetPostSaves = ({
  where,
  order,
  options = {},
  enabled = true,
}: {
  where?: any;
  order?: any;
  options?: any;
  enabled?: boolean;
}) => {
  return useInfiniteQuery<
    PostSave_GetPostSavesQuery,
    any,
    PostSave_GetPostSavesQueryVariables,
    any
  >(
    [queryKeys.getPostSave, where, order],
    async ({pageParam = 0}) => {
      return fetcher<
        PostSave_GetPostSavesQuery,
        PostSave_GetPostSavesQueryVariables
      >(GET_POST_SAVES, {
        skip: pageParam * 30,
        take: 30,
        where,
        order,
      })();
    },
    {
      getNextPageParam: (
        lastPage: PostSave_GetPostSavesQuery,
        allPages: PostSave_GetPostSavesQuery[],
      ) => {
        if (lastPage?.postSav_getPostSave?.result?.pageInfo?.hasNextPage) {
          return allPages.length;
        }
        return undefined;
      },
      select: data => ({
        ...data,
        pages: data?.pages
          ?.map(a => a.postSav_getPostSave?.result?.items)
          .flat(),
      }),
      enabled: enabled,
      ...options,
    },
  );
};

export const useGetFollowingExplorePosts = (enabled?: boolean, where?: any) => {
  return useInfiniteQuery<
    Post_GetFollowingPostsQuery,
    any,
    Post_GetFollowingPostsQueryVariables,
    any
  >(
    [queryKeys.getFollowingExplorePosts],
    async ({pageParam = 0}) => {
      return fetcher<
        Post_GetFollowingPostsQuery,
        Post_GetFollowingPostsQueryVariables
      >(GET_FOLLOWING_EXPLORE_POST, {
        skip: pageParam * PAGE_SIZE,
        take: PAGE_SIZE,
        order: {id: 'DESC'},
        where: where || {user: {isActive: {eq: true}}},
      })();
    },
    {
      getNextPageParam: (
        lastPage: Post_GetFollowingPostsQuery,
        allPages: Post_GetFollowingPostsQueryVariables[],
      ) => {
        if (lastPage?.post_getFollowingPosts?.result?.pageInfo?.hasNextPage) {
          return allPages.length;
        }
        return undefined;
      },
      select: data => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.post_getFollowingPosts?.result?.items)
            .flat(),
        };
      },
      enabled,
    },
  );
};

export const useGetPosts = ({
  where,
  order,
  options,
  pageSize,
}: {
  where?: any;
  order?: any;
  options?: any;
  pageSize?: number;
}) => {
  return useInfiniteQuery<
    Post_GetPostsQuery,
    any,
    Pos_GetPostQueryVariables,
    any
  >(
    [queryKeys.getPosts, where, order, pageSize],
    async ({pageParam = 0}) => {
      return fetcher<Post_GetPostsQuery, Pos_GetPostQueryVariables>(GET_POSTS, {
        skip: pageParam * PAGE_SIZE,
        take: pageSize != null ? pageSize : PAGE_SIZE,
        where,
        order,
      })();
    },
    {
      getNextPageParam: (
        lastPage: Post_GetPostsQuery,
        allPages: Pos_GetPostQueryVariables[],
      ) => {
        if (lastPage?.post_getPosts?.result?.pageInfo?.hasNextPage) {
          return allPages.length;
        }
        return undefined;
      },
      select: data => {
        return {
          ...data,
          pages: data?.pages?.map(a => a?.post_getPosts?.result?.items).flat(),
        };
      },
      ...options,
    },
  );
};

export const useCreatePost = () => {
  return useMutation<
    Post_CreatePostMutation,
    any,
    Post_CreatePostMutationVariables
  >(
    (input: any) => {
      return fetcher<Post_CreatePostMutation, Post_CreatePostMutationVariables>(
        CREATE_POST,
        input,
      )();
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

export const useGetPostById = (entityId: number) => {
  return useQuery<Post_GetPostQuery>(
    [queryKeys.getPostById, entityId],
    async () => {
      return fetcher<Post_GetPostQuery, any>(GET_POST_BY_ID, {
        entityId,
      })();
    },
    {
      enabled: !!entityId,
    },
  );
};

export const useDeletePost = () => {
  return useMutation<
    Post_DeletePostMutation,
    any,
    Post_DeletePostMutationVariables
  >(
    (input: any) => {
      return fetcher<Post_DeletePostMutation, Post_DeletePostMutationVariables>(
        DELETE_POST,
        input,
      )();
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

export const useGetFollowers = ({
  followingId,
  where,
  order,
  options = {},
}: {
  followingId: number;
  where?: any;
  order?: any;
  options?: any;
}) => {
  return useInfiniteQuery<
    Follow_GetFollowersQuery,
    any,
    Follow_GetFollowersQueryVariables,
    any
  >(
    [queryKeys.getFollowers, followingId],
    async ({pageParam = 0}) => {
      return fetcher<
        Follow_GetFollowersQuery,
        Follow_GetFollowersQueryVariables
      >(GET_FOLLOWERS, {
        followingId,
        skip: pageParam * PAGE_SIZE,
        take: PAGE_SIZE,
        where,
        order,
      })();
    },
    {
      getNextPageParam: (
        lastPage: Follow_GetFollowingsQuery,
        allPages: Follow_GetFollowingsQuery[],
      ) => {
        if (lastPage?.follow_getFollowers?.result?.pageInfo?.hasNextPage) {
          return allPages.length;
        }
        return undefined;
      },
      select: data => ({
        ...data,
        pages: data?.pages
          ?.map(a => a.follow_getFollowers?.result?.items)
          .flat(),
      }),
      ...options,
    },
  );
};

export const useReportUser = () => {
  return useMutation<
    ReportUser_CreateReportUserMutation,
    any,
    ReportUser_CreateReportUserMutationVariables
  >(
    (input: any) => {
      return fetcher<
        ReportUser_CreateReportUserMutation,
        ReportUser_CreateReportUserMutationVariables
      >(REPORT_USER, {input})();
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

export const useGetUnViewedPosts = ({
  where,
  order,
  options,
  pageSize,
  userId,
}: {
  where?: any;
  order?: any;
  options?: any;
  pageSize?: number;
  userId: number | undefined;
}) => {
  return useInfiniteQuery<
    Post_GetUnViewedPostsQuery,
    any,
    Post_GetUnViewedPostsQueryVariables,
    any
  >(
    [queryKeys.getPosts, where, order, pageSize],
    async ({pageParam = 0}) => {
      return fetcher<
        Post_GetUnViewedPostsQuery,
        Post_GetUnViewedPostsQueryVariables
      >(GET_UNVIEWED_POSTS, {
        skip: pageParam * PAGE_SIZE,
        take: pageSize != null ? pageSize : PAGE_SIZE,
        where,
        order,
      })();
    },
    {
      getNextPageParam: (
        lastPage: Post_GetUnViewedPostsQuery,
        allPages: Post_GetUnViewedPostsQueryVariables[],
      ) => {
        if (lastPage?.post_getUnViewedPosts?.result?.pageInfo?.hasNextPage) {
          return allPages.length;
        }
        return undefined;
      },
      select: data => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.post_getUnViewedPosts?.result?.items)
            .flat(),
        };
      },
      enabled: userId != undefined && userId != null,
      ...options,
    },
  );
};

export const useGetExplorePostsByCategoryID = ({
  categoryIds,
  userId,
}: {
  categoryIds: number[];
  userId: number | undefined;
}) => {
  return useInfiniteQuery<
    Post_GetByCategoryIdQuery,
    any,
    Post_GetByCategoryIdQueryVariables,
    any
  >(
    [queryKeys.getExplorePostsByCategoryId, categoryIds, userId],
    async ({pageParam = 0}) => {
      return fetcher<
        Post_GetByCategoryIdQuery,
        Post_GetByCategoryIdQueryVariables
      >(GET_EXPLORE_POST_BY_CATEGORY_ID, {
        skip: pageParam * PAGE_SIZE,
        take: PAGE_SIZE,
        categoryIds: categoryIds,
        order: {id: 'DESC'},
        where: {user: {isActive: {eq: true}}},
      })();
    },
    {
      getNextPageParam: (
        lastPage: Post_GetByCategoryIdQuery,
        allPages: Post_GetByCategoryIdQueryVariables[],
      ) => {
        if (lastPage?.post_getByCategoryIds?.result?.pageInfo?.hasNextPage) {
          return allPages.length;
        }
        return undefined;
      },
      select: data => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.post_getByCategoryIds?.result?.items)
            .flat(),
        };
      },
      enabled: userId == undefined || userId == null,
    },
  );
};

export const useGetExplorePostsByHashtagID = ({
  hashtagIds,
}: {
  hashtagIds: number[];
}) => {
  return useInfiniteQuery<
    Post_GetByHashtagIdQuery,
    any,
    Post_GetByHashtagIdQueryVariables,
    any
  >(
    [queryKeys.getExplorePostsByHashtagId, hashtagIds],
    async ({pageParam = 0}) => {
      return fetcher<
        Post_GetByHashtagIdQuery,
        Post_GetByHashtagIdQueryVariables
      >(GET_EXPLORE_POST_BY_HASHTAG_ID, {
        skip: pageParam * PAGE_SIZE,
        take: PAGE_SIZE,
        hashtagIds: hashtagIds,
        order: {id: 'DESC'},
        where: {user: {isActive: {eq: true}}},
      })();
    },
    {
      getNextPageParam: (
        lastPage: Post_GetByHashtagIdQuery,
        allPages: Post_GetByHashtagIdQuery[],
      ) => {
        if (lastPage?.post_getByHashtagIds?.result?.pageInfo?.hasNextPage) {
          return allPages.length;
        }
        return undefined;
      },
      select: data => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.post_getByHashtagIds?.result?.items)
            .flat(),
        };
      },
    },
  );
};

export const useRecommendPost = () => {
  return useMutation<
    Post_SetAsRecommendedMutation,
    any,
    Post_SetAsRecommendedMutationVariables
  >(
    (input: any) => {
      return fetcher<
        Post_SetAsRecommendedMutation,
        Post_SetAsRecommendedMutationVariables
      >(RECOMMEND_POST, input)();
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
