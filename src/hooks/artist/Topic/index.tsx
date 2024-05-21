import {useQuery, useInfiniteQuery, useMutation} from 'react-query';
import {
  Topic_GetTopicQuery,
  Topic_GetTopicQueryVariables,
  TopicUser_GetByUserIdQuery,
  TopicUser_GetByUserIdQueryVariables,
  Topic_CreateTopicMutation,
  Topic_CreateTopicMutationVariables,
  TopicUser_CreateTopicUserMutation,
  TopicUser_CreateTopicUserMutationVariables,
  TopicPost_GetTopicPostQuery,
  TopicPost_GetTopicPostQueryVariables,
  TopicPost_GetTopicPostsQueryVariables,
  TopicPost_GetTopicPostsQuery,
  TopicPost_CreateTopicPostMutation,
  TopicPost_CreateTopicPostMutationVariables,
  TopicPostLike_CreateTopicPostLikeMutationVariables,
  TopicPostLike_CreateTopicPostLikeMutation,
  TopicPostLike_DeleteTopicPostLikeMutationVariables,
  TopicPostLike_DeleteTopicPostLikeMutation,
  TopicPostComment_CreateTopicPostCommentMutation,
  TopicPostComment_CreateTopicPostCommentMutationVariables,
  TopicPostComment_GetByTopicPostIdQuery,
  TopicPostComment_GetByTopicPostIdQueryVariables,
  TopicPostLike_GetTopicPostLikesQueryVariables,
  TopicPostLike_GetTopicPostLikesQuery,
  TopicPostComment_DeleteTopicPostCommentMutationVariables,
  TopicPostComment_DeleteTopicPostCommentMutation,
  TopicPost_DeleteTopicPostMutationVariables,
  TopicPost_DeleteTopicPostMutation,
  ReportTopicPost_CreateReportTopicPostMutationVariables,
  ReportTopicPost_CreateReportTopicPostMutation,
  TopicPostComment_CustomeGetTopicPostCommentsQuery,
  TopicPostComment_CustomeGetTopicPostCommentsQueryVariables,
  Comment_DeleteTopicMutation,
  Comment_DeleteTopicMutationVariables,
  TopicPost_GetTopicHashtagPostsQuery,
  TopicPost_GetTopicHashtagPostsQueryVariables,
  Topic_GetTopicReportQuery,
  Topic_GetTopicReportQueryVariables,
} from '~/generated/graphql';
import {
  GET_ALL_TOPICS,
  GET_TOPICS_COUNT_BY_USER_ID,
  GET_TOPICS_BY_USER_ID,
  GET_ALL_TOPICS_COUNT,
  GET_TOPIC_POSTS,
  GET_TOPIC_POST_DETAIL,
  GET_TOPIC_COMMENTS_BY_POST_ID,
  GET_TOPIC_POST_LIKES,
  GET_CUSTOME_TOPIC_COMMENTS_BY_POST_ID,
  GET_HASHTAG_TOPIC_POSTS,
  GET_TOPICS_REPORT,
} from '~/graphql/artist/Topic/queries';
import {
  CREATE_TOPIC,
  CREATE_TOPIC_USER,
  CREATE_TOPIC_POST,
  LIKE_TOPIC_POST,
  DISLIKE_TOPIC_POST,
  CREATE_TOPIC_COMMENT,
  CREATE_TOPIC_CHILD_COMMENT,
  DELETE_TOPIC_POST_COMMENT,
  DELETE_TOPIC_POST,
  REPORT_TOPIC_POST,
  DELETE_TOPIC,
} from '~/graphql/artist/Topic/mutations';
import graphQLClient, {fetcher} from '~/graphql/fetcher';
import {queryKeys} from '~/constants/queryKeys';
import {PAGE_SIZE} from '~/constants/pagination';
import {useAuthStore} from '~/stores';
import {Colors} from '~/styles/colors';
import snackBar from '~/utils/snackBar';

export const useGetAllTopics = ({where, order}: {where?: any; order?: any}) => {
  return useInfiniteQuery<
    Topic_GetTopicQuery,
    any,
    Topic_GetTopicQueryVariables,
    any
  >(
    [queryKeys.getAllTopics, where, order],
    async ({pageParam = 0}) => {
      return fetcher<Topic_GetTopicQuery, Topic_GetTopicQueryVariables>(
        GET_ALL_TOPICS,
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
        lastPage: Topic_GetTopicQuery,
        allPages: Topic_GetTopicQueryVariables[],
      ) => {
        if (lastPage?.topic_getTopics?.result?.pageInfo?.hasNextPage) {
          return allPages.length;
        }
        return undefined;
      },
      select: data => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.topic_getTopics?.result?.items)
            .flat(),
        };
      },
    },
  );
};
export const useGetAllTopicsCount = () => {
  const {userId} = useAuthStore(state => state);
  return useQuery<Topic_GetTopicQuery, any, Topic_GetTopicQueryVariables>(
    queryKeys.getAllTopicsCount,
    () => {
      return fetcher<Topic_GetTopicQuery, Topic_GetTopicQueryVariables>(
        GET_ALL_TOPICS_COUNT,
        {
          userId: userId,
        },
      )();
    },
  );
};

export const useGetUserTopicsById = ({
  where,
  order,
}: {
  where?: any;
  order?: any;
}) => {
  const {userId} = useAuthStore(state => state);
  return useInfiniteQuery<
    TopicUser_GetByUserIdQuery,
    any,
    TopicUser_GetByUserIdQueryVariables,
    any
  >(
    [queryKeys.getTopicsByUserId, where, order],
    async ({pageParam = 0}) => {
      return fetcher<
        TopicUser_GetByUserIdQuery,
        TopicUser_GetByUserIdQueryVariables
      >(GET_TOPICS_BY_USER_ID, {
        skip: pageParam * PAGE_SIZE,
        take: PAGE_SIZE,
        userId: userId,
        where,
        order,
      })();
    },
    {
      getNextPageParam: (
        lastPage: TopicUser_GetByUserIdQuery,
        allPages: TopicUser_GetByUserIdQueryVariables[],
      ) => {
        if (lastPage?.topicUser_getByUserId?.result?.pageInfo?.hasNextPage) {
          return allPages.length;
        }
        return undefined;
      },
      select: data => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.topicUser_getByUserId?.result?.items)
            .flat(),
        };
      },
    },
  );
};

export const useGetUserTopicsCountById = () => {
  const {userId} = useAuthStore(state => state);
  return useQuery<
    TopicUser_GetByUserIdQuery,
    any,
    TopicUser_GetByUserIdQueryVariables
  >(queryKeys.getTopicsCountByUserId, () => {
    return fetcher<
      TopicUser_GetByUserIdQuery,
      TopicUser_GetByUserIdQueryVariables
    >(GET_TOPICS_COUNT_BY_USER_ID, {
      userId: userId,
    })();
  });
};

export const useCreateTopic = () => {
  return useMutation<
    Topic_CreateTopicMutation,
    any,
    Topic_CreateTopicMutationVariables
  >(
    (input: any) => {
      return fetcher<
        Topic_CreateTopicMutation,
        Topic_CreateTopicMutationVariables
      >(CREATE_TOPIC, {input})();
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

export const useCreateTopicUser = () => {
  return useMutation<
    TopicUser_CreateTopicUserMutation,
    any,
    TopicUser_CreateTopicUserMutationVariables
  >(
    (input: any) => {
      return fetcher<
        TopicUser_CreateTopicUserMutation,
        TopicUser_CreateTopicUserMutationVariables
      >(CREATE_TOPIC_USER, {
        input,
      })();
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

export const useGetTopicPosts = (topicId: number) => {
  return useInfiniteQuery<
    TopicPost_GetTopicPostsQuery,
    any,
    TopicPost_GetTopicPostsQueryVariables,
    any
  >(
    [queryKeys.getTopicPosts, topicId],
    async ({pageParam = 0}) => {
      return fetcher<
        TopicPost_GetTopicPostsQuery,
        TopicPost_GetTopicPostsQueryVariables
      >(GET_TOPIC_POSTS, {
        skip: pageParam * PAGE_SIZE,
        take: PAGE_SIZE,
        topicId,
      })();
    },
    {
      getNextPageParam: (
        lastPage: TopicPost_GetTopicPostsQuery,
        allPages: TopicPost_GetTopicPostsQueryVariables[],
      ) => {
        if (lastPage?.topicPost_getByTopicId?.result?.pageInfo?.hasNextPage) {
          return allPages.length;
        }
        return undefined;
      },
      select: data => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.topicPost_getByTopicId?.result?.items)
            .flat(),
        };
      },
    },
  );
};

export const useGetTopicPostDetail = (entityId: number) => {
  return useQuery<
    TopicPost_GetTopicPostQuery,
    any,
    TopicPost_GetTopicPostQueryVariables
  >([queryKeys.getPostTopicDetail, entityId], () => {
    return fetcher<
      TopicPost_GetTopicPostQuery,
      TopicPost_GetTopicPostQueryVariables
    >(GET_TOPIC_POST_DETAIL, {
      entityId,
    })();
  });
};

export const useCreateTopicPost = () => {
  return useMutation<
    TopicPost_CreateTopicPostMutation,
    any,
    TopicPost_CreateTopicPostMutationVariables
  >(
    (input: any) => {
      return fetcher<
        TopicPost_CreateTopicPostMutation,
        TopicPost_CreateTopicPostMutationVariables
      >(CREATE_TOPIC_POST, input)();
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

export const useLikeTopicPost = () => {
  return useMutation<
    TopicPostLike_CreateTopicPostLikeMutation,
    any,
    TopicPostLike_CreateTopicPostLikeMutationVariables
  >(
    (input: any) => {
      return fetcher<
        TopicPostLike_CreateTopicPostLikeMutation,
        TopicPostLike_CreateTopicPostLikeMutationVariables
      >(LIKE_TOPIC_POST, {input})();
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

export const useDislikeTopicPost = () => {
  return useMutation<
    TopicPostLike_DeleteTopicPostLikeMutation,
    any,
    TopicPostLike_DeleteTopicPostLikeMutationVariables
  >(
    (input: any) => {
      return fetcher<
        TopicPostLike_DeleteTopicPostLikeMutation,
        TopicPostLike_DeleteTopicPostLikeMutationVariables
      >(DISLIKE_TOPIC_POST, input)();
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

export const useGetTopicCommentsByPostId = (topicPostId: number) => {
  return useInfiniteQuery<
    TopicPostComment_GetByTopicPostIdQuery,
    any,
    TopicPostComment_GetByTopicPostIdQueryVariables,
    any
  >(
    [queryKeys.getTopicCommentsByPostId, topicPostId],
    async ({pageParam = 0}) => {
      return fetcher<
        TopicPostComment_GetByTopicPostIdQuery,
        TopicPostComment_GetByTopicPostIdQueryVariables
      >(GET_TOPIC_COMMENTS_BY_POST_ID, {
        skip: pageParam * PAGE_SIZE,
        take: PAGE_SIZE,
        topicPostId,
        where: {parentId: {eq: null}},
      })();
    },
    {
      getNextPageParam: (
        lastPage: TopicPostComment_GetByTopicPostIdQuery,
        allPages: TopicPostComment_GetByTopicPostIdQueryVariables[],
      ) => {
        if (
          lastPage?.topicPostComment_getByTopicPostId?.result?.pageInfo
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
            ?.map(a => a?.topicPostComment_getByTopicPostId?.result?.items)
            .flat(),
        };
      },
    },
  );
};

export const useCreateTopicComment = () => {
  return useMutation<
    TopicPostComment_CreateTopicPostCommentMutation,
    any,
    TopicPostComment_CreateTopicPostCommentMutationVariables
  >(
    (input: any) => {
      return fetcher<
        TopicPostComment_CreateTopicPostCommentMutation,
        TopicPostComment_CreateTopicPostCommentMutationVariables
      >(CREATE_TOPIC_COMMENT, {input})();
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

export const useCreateTopicChildComment = () => {
  return useMutation<
    TopicPostComment_CreateTopicPostCommentMutation,
    any,
    TopicPostComment_CreateTopicPostCommentMutationVariables
  >(
    (input: any) => {
      return fetcher<
        TopicPostComment_CreateTopicPostCommentMutation,
        TopicPostComment_CreateTopicPostCommentMutationVariables
      >(CREATE_TOPIC_CHILD_COMMENT, {input})();
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
export const useGetTopicPostLikes = ({
  where,
  order,
  options = {},
}: {
  where?: any;
  order?: any;
  options?: any;
}) => {
  return useInfiniteQuery<
    TopicPostLike_GetTopicPostLikesQuery,
    any,
    TopicPostLike_GetTopicPostLikesQueryVariables,
    any
  >(
    [queryKeys.getTopicPostLikes, where],
    async ({pageParam = 0}) => {
      return fetcher<
        TopicPostLike_GetTopicPostLikesQuery,
        TopicPostLike_GetTopicPostLikesQueryVariables
      >(GET_TOPIC_POST_LIKES, {
        skip: pageParam * PAGE_SIZE,
        take: PAGE_SIZE,
        where,
      })();
    },
    {
      getNextPageParam: (
        lastPage: TopicPostLike_GetTopicPostLikesQuery,
        allPages: TopicPostLike_GetTopicPostLikesQueryVariables[],
      ) => {
        if (
          lastPage?.topicPostLike_getTopicPostLikes?.result?.pageInfo
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
            ?.map(a => a?.topicPostLike_getTopicPostLikes?.result?.items)
            .flat(),
        };
      },
    },
  );
};

export const useDeleteTopicPostComment = () => {
  return useMutation<
    TopicPostComment_DeleteTopicPostCommentMutation,
    any,
    TopicPostComment_DeleteTopicPostCommentMutationVariables
  >(
    (input: any) => {
      return fetcher<
        TopicPostComment_DeleteTopicPostCommentMutation,
        TopicPostComment_DeleteTopicPostCommentMutationVariables
      >(DELETE_TOPIC_POST_COMMENT, input)();
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

export const useDeleteTopicPost = () => {
  return useMutation<
    TopicPost_DeleteTopicPostMutation,
    any,
    TopicPost_DeleteTopicPostMutationVariables
  >(
    (input: any) => {
      return fetcher<
        TopicPost_DeleteTopicPostMutation,
        TopicPost_DeleteTopicPostMutationVariables
      >(DELETE_TOPIC_POST, input)();
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

export const useReportTopicPost = () => {
  return useMutation<
    ReportTopicPost_CreateReportTopicPostMutation,
    any,
    ReportTopicPost_CreateReportTopicPostMutationVariables
  >(
    (input: any) => {
      return fetcher<
        ReportTopicPost_CreateReportTopicPostMutation,
        ReportTopicPost_CreateReportTopicPostMutationVariables
      >(REPORT_TOPIC_POST, {input})();
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

export const useGetUserTopicsByUserId = ({
  where,
  order,
  userId,
}: {
  where?: any;
  order?: any;
  userId: number;
}) => {
  return useInfiniteQuery<
    TopicUser_GetByUserIdQuery,
    any,
    TopicUser_GetByUserIdQueryVariables,
    any
  >(
    [queryKeys.getTopicsByUserId, where, order],
    async ({pageParam = 0}) => {
      return fetcher<
        TopicUser_GetByUserIdQuery,
        TopicUser_GetByUserIdQueryVariables
      >(GET_TOPICS_BY_USER_ID, {
        skip: pageParam * PAGE_SIZE,
        take: PAGE_SIZE,
        userId: userId,
        where,
        order,
      })();
    },
    {
      getNextPageParam: (
        lastPage: TopicUser_GetByUserIdQuery,
        allPages: TopicUser_GetByUserIdQueryVariables[],
      ) => {
        if (lastPage?.topicUser_getByUserId?.result?.pageInfo?.hasNextPage) {
          return allPages.length;
        }
        return undefined;
      },
      select: data => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.topicUser_getByUserId?.result?.items)
            .flat(),
        };
      },
    },
  );
};

export const useGetCustomeTopicCommentsByPostId = (
  enabled: boolean,
  topicPostId: number,
  parentId?: number,
) => {
  return useInfiniteQuery<
    TopicPostComment_CustomeGetTopicPostCommentsQuery,
    any,
    TopicPostComment_CustomeGetTopicPostCommentsQueryVariables,
    any
  >(
    [queryKeys.getTopicCommentsByPostId, parentId, topicPostId],
    async ({pageParam = 0}) => {
      return fetcher<
        TopicPostComment_CustomeGetTopicPostCommentsQuery,
        TopicPostComment_CustomeGetTopicPostCommentsQueryVariables
      >(GET_CUSTOME_TOPIC_COMMENTS_BY_POST_ID, {
        skip: pageParam * PAGE_SIZE,
        take: PAGE_SIZE,
        where: {
          parentId: {
            eq: parentId != undefined && parentId != null ? parentId : null,
          },
          topicPostId: {eq: topicPostId},
          user: {isActive: {eq: true}},
        },
        order: {id: 'DESC'},
      })();
    },
    {
      getNextPageParam: (
        lastPage: TopicPostComment_CustomeGetTopicPostCommentsQuery,
        allPages: TopicPostComment_CustomeGetTopicPostCommentsQueryVariables[],
      ) => {
        if (
          lastPage?.topicPostComment_customeGetTopicPostComments?.result
            ?.pageInfo?.hasNextPage
        ) {
          return allPages.length;
        }
        return undefined;
      },
      select: data => {
        return {
          ...data,
          pages: data?.pages
            ?.map(
              a =>
                a?.topicPostComment_customeGetTopicPostComments?.result?.items,
            )
            .flat(),
        };
      },
      enabled,
    },
  );
};

export const useDeleteTopic = () => {
  return useMutation<
    Comment_DeleteTopicMutation,
    any,
    Comment_DeleteTopicMutationVariables
  >(
    (input: any) => {
      return fetcher<
        Comment_DeleteTopicMutation,
        Comment_DeleteTopicMutationVariables
      >(DELETE_TOPIC, input)();
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

export const useGetTopicPostsByHashtagID = ({
  hashtagIds,
}: {
  hashtagIds: number[];
}) => {
  return useInfiniteQuery<
    TopicPost_GetTopicHashtagPostsQuery,
    any,
    TopicPost_GetTopicHashtagPostsQueryVariables,
    any
  >(
    [queryKeys.getTopicPostsByHashtagId, hashtagIds],
    async ({pageParam = 0}) => {
      return fetcher<
        TopicPost_GetTopicHashtagPostsQuery,
        TopicPost_GetTopicHashtagPostsQueryVariables
      >(GET_HASHTAG_TOPIC_POSTS, {
        skip: pageParam * PAGE_SIZE,
        take: PAGE_SIZE,
        hashtagIds: hashtagIds,
        order: {id: 'DESC'},
        where: {user: {isActive: {eq: true}}},
      })();
    },
    {
      getNextPageParam: (
        lastPage: TopicPost_GetTopicPostsQuery,
        allPages: TopicPost_GetTopicPostsQuery[],
      ) => {
        if (lastPage?.topicPost_getTopicPosts?.result?.pageInfo?.hasNextPage) {
          return allPages.length;
        }
        return undefined;
      },
      select: data => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.topicPost_getByHashtagIds?.result?.items)
            .flat(),
        };
      },
    },
  );
};

export const useGetTopicsReport = ({
  where,
  order,
}: {
  where?: any;
  order?: any;
}) => {
  return useInfiniteQuery<
    Topic_GetTopicReportQuery,
    any,
    Topic_GetTopicReportQueryVariables,
    any
  >(
    [queryKeys.getAllTopics, where, order],
    async ({pageParam = 0}) => {
      return fetcher<
        Topic_GetTopicReportQuery,
        Topic_GetTopicReportQueryVariables
      >(GET_TOPICS_REPORT, {
        skip: pageParam * PAGE_SIZE,
        take: PAGE_SIZE,
        where,
        order,
      })();
    },
    {
      getNextPageParam: (
        lastPage: Topic_GetTopicReportQuery,
        allPages: Topic_GetTopicReportQueryVariables[],
      ) => {
        if (lastPage?.topic_getTopicsReport?.result?.pageInfo?.hasNextPage) {
          return allPages.length;
        }
        return undefined;
      },
      select: data => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.topic_getTopicsReport?.result?.items)
            .flat(),
        };
      },
    },
  );
};
