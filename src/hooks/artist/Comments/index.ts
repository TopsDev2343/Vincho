import {useInfiniteQuery, useMutation} from 'react-query';
import {
  Comment_GetByPostIdQuery,
  Comment_GetByPostIdQueryVariables,
  Comment_CreateCommentMutation,
  Comment_CreateCommentMutationVariables,
  CommentLike_CreateCommentLikeMutation,
  CommentLike_CreateCommentLikeMutationVariables,
  CommentLike_DeleteCommentLikeMutationVariables,
  CommentLike_DeleteCommentLikeMutation,
  Comment_DeleteCommentMutationVariables,
  Comment_DeleteCommentMutation,
  Comment_CustomeGetCommentsQuery,
  Comment_CustomeGetCommentsVariables,
  TopicPostCommentLike_CreateTopicPostCommentLikeMutation,
  TopicPostCommentLike_DeleteTopicPostCommentLikeMutation,
  TopicPostCommentLike_DeleteTopicPostCommentLikeMutationVariables,
  TopicPostCommentLike_CreateTopicPostCommentLikeMutationVariables,
  Comment_GetCommentsQuery,
  Comment_GetCommentsQueryVariables,
} from '~/generated/graphql';
import {
  GET_COMMENTS,
  GET_COMMENTS_BY_POST_ID,
  GET_CUSTOME_COMMENTS_BY_POST_ID,
} from '~/graphql/artist/Comments/queries';
import {
  CREATE_COMMENT,
  CREATE_CHILD_COMMENT,
  LIKE_COMMENT,
  DISLIKE_COMMENT,
  DELETE_POST_COMMENT,
  LIKE_TOPICCOMMENT,
  DISLIKE_TOPICCOMMENT,
} from '~/graphql/artist/Comments/mutations';
import graphQLClient, {fetcher} from '~/graphql/fetcher';
import {PAGE_SIZE} from '~/constants/pagination';
import {queryKeys} from '~/constants/queryKeys';
import {useClickedPostInfoStore} from '~/stores';
import snackBar from '~/utils/snackBar';
import {Colors} from '~/styles/colors';

export const useGetCommentsByPostId = () => {
  const {postInfo} = useClickedPostInfoStore(state => state);

  return useInfiniteQuery<
    Comment_GetByPostIdQuery,
    any,
    Comment_GetByPostIdQueryVariables,
    any
  >(
    [queryKeys.getCommentsByPostId],
    async ({pageParam = 0}) => {
      return fetcher<
        Comment_GetByPostIdQuery,
        Comment_GetByPostIdQueryVariables
      >(GET_COMMENTS_BY_POST_ID, {
        skip: pageParam * PAGE_SIZE,
        take: PAGE_SIZE,
        postId: postInfo?.id,
        where: {parentId: {eq: null}, user: {isActive: {eq: true}}},
        order: {createdDate: 'DESC'},
      })();
    },
    {
      getNextPageParam: (
        lastPage: Comment_GetByPostIdQuery,
        allPages: Comment_GetByPostIdQueryVariables[],
      ) => {
        if (lastPage?.comment_getByPostId?.result?.pageInfo?.hasNextPage) {
          return allPages.length;
        }
        return undefined;
      },
      select: data => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.comment_getByPostId?.result?.items)
            .flat(),
        };
      },
    },
  );
};

export const useCreateComment = () => {
  return useMutation<
    Comment_CreateCommentMutation,
    any,
    Comment_CreateCommentMutationVariables
  >(
    (input: any) => {
      return fetcher<
        Comment_CreateCommentMutation,
        Comment_CreateCommentMutationVariables
      >(CREATE_COMMENT, {input})();
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

export const useCreateChildComment = () => {
  return useMutation<
    Comment_CreateCommentMutation,
    any,
    Comment_CreateCommentMutationVariables
  >(
    (input: any) => {
      return fetcher<
        Comment_CreateCommentMutation,
        Comment_CreateCommentMutationVariables
      >(CREATE_CHILD_COMMENT, {
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

export const useLikeComment = () => {
  return useMutation<
    CommentLike_CreateCommentLikeMutation,
    any,
    CommentLike_CreateCommentLikeMutationVariables
  >(
    (input: any) => {
      return fetcher<
        CommentLike_CreateCommentLikeMutation,
        CommentLike_CreateCommentLikeMutationVariables
      >(LIKE_COMMENT, {
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

export const useDislikeComment = () => {
  return useMutation<
    CommentLike_DeleteCommentLikeMutation,
    any,
    CommentLike_DeleteCommentLikeMutationVariables
  >(
    (input: any) => {
      return fetcher<
        CommentLike_DeleteCommentLikeMutation,
        CommentLike_DeleteCommentLikeMutationVariables
      >(DISLIKE_COMMENT, input)();
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

export const useDeletePostComment = () => {
  return useMutation<
    Comment_DeleteCommentMutation,
    any,
    Comment_DeleteCommentMutationVariables
  >(
    (input: any) => {
      return fetcher<
        Comment_DeleteCommentMutation,
        Comment_DeleteCommentMutationVariables
      >(DELETE_POST_COMMENT, input)();
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

export const useGetCustomComments = (enabled: boolean, parentId?: number) => {
  const {postInfo} = useClickedPostInfoStore(state => state);
  return useInfiniteQuery<
    Comment_CustomeGetCommentsQuery,
    any,
    Comment_CustomeGetCommentsVariables,
    any
  >(
    [queryKeys.getCommentsByPostId, parentId, postInfo?.id],
    async ({pageParam = 0}) => {
      return fetcher<
        Comment_CustomeGetCommentsQuery,
        Comment_CustomeGetCommentsVariables
      >(GET_CUSTOME_COMMENTS_BY_POST_ID, {
        skip: pageParam * PAGE_SIZE,
        take: PAGE_SIZE,
        where: {
          parentId: {
            eq: parentId != undefined && parentId != null ? parentId : null,
          },
          postId: {eq: postInfo?.id},
          user: {isActive: {eq: true}},
        },
        order: {id: 'DESC'},
      })();
    },
    {
      getNextPageParam: (
        lastPage: Comment_CustomeGetCommentsQuery,
        allPages: Comment_CustomeGetCommentsVariables[],
      ) => {
        if (
          lastPage?.comment_customeGetComments?.result?.pageInfo?.hasNextPage
        ) {
          return allPages.length;
        }
        return undefined;
      },
      select: data => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.comment_customeGetComments?.result?.items)
            .flat(),
        };
      },
      enabled: enabled,
    },
  );
};

export const useLikeTopicComment = () => {
  return useMutation<
    TopicPostCommentLike_CreateTopicPostCommentLikeMutation,
    any,
    TopicPostCommentLike_CreateTopicPostCommentLikeMutationVariables
  >(
    (input: any) => {
      return fetcher<
        TopicPostCommentLike_CreateTopicPostCommentLikeMutation,
        TopicPostCommentLike_CreateTopicPostCommentLikeMutationVariables
      >(LIKE_TOPICCOMMENT, {input})();
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

export const useDislikeTopicComment = () => {
  return useMutation<
    TopicPostCommentLike_DeleteTopicPostCommentLikeMutation,
    any,
    TopicPostCommentLike_DeleteTopicPostCommentLikeMutationVariables
  >(
    (input: any) => {
      return fetcher<
        TopicPostCommentLike_DeleteTopicPostCommentLikeMutation,
        TopicPostCommentLike_DeleteTopicPostCommentLikeMutationVariables
      >(DISLIKE_TOPICCOMMENT, input)();
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

export const useGetComments = (where?: any) => {
  return useInfiniteQuery<
    Comment_GetCommentsQuery,
    any,
    Comment_GetCommentsQueryVariables,
    any
  >(
    [queryKeys.getComments, where],
    async ({pageParam = 0}) => {
      return fetcher<
        Comment_GetCommentsQuery,
        Comment_GetCommentsQueryVariables
      >(GET_COMMENTS, {
        skip: pageParam * PAGE_SIZE,
        take: PAGE_SIZE,
        where: where,
        order: {id: 'DESC'},
      })();
    },
    {
      getNextPageParam: (
        lastPage: Comment_GetCommentsQuery,
        allPages: Comment_GetCommentsQuery[],
      ) => {
        if (lastPage?.comment_getComments?.result?.pageInfo?.hasNextPage) {
          return allPages.length;
        }
        return undefined;
      },
      select: data => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.comment_getComments?.result?.items)
            .flat(),
        };
      },
    },
  );
};
