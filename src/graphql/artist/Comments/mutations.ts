import {gql} from 'graphql-request';

export const CREATE_COMMENT = gql`
  mutation comment_createComment($input: CommentInput) {
    comment_createComment(input: $input) {
      result {
        likeCount
        userId
        parentId
        postId
        id
        createdDate
      }
      status
    }
  }
`;

export const CREATE_CHILD_COMMENT = gql`
  mutation comment_createComment($input: CommentInput) {
    comment_createComment(input: $input) {
      result {
        likeCount
        userId
        parentId
        postId
        id
        createdDate
      }
      status
    }
  }
`;
export const LIKE_COMMENT = gql`
  mutation commentLike_createCommentLike($input: CommentLikeInput) {
    commentLike_createCommentLike(input: $input) {
      status
    }
  }
`;
export const DISLIKE_COMMENT = gql`
  mutation commentLike_deleteCommentLike($userId: Int!, $commentId: Int!) {
    commentLike_deleteCommentLike(userId: $userId, commentId: $commentId) {
      code
      value
    }
  }
`;
export const DELETE_POST_COMMENT = gql`
  mutation comment_deleteComment($entityId: Int!) {
    comment_deleteComment(entityId: $entityId) {
      code
      value
    }
  }
`;

export const LIKE_TOPICCOMMENT = gql`
  mutation topicPostCommentLike_createTopicPostCommentLike(
    $input: TopicPostCommentLikeInput
  ) {
    topicPostCommentLike_createTopicPostCommentLike(input: $input) {
      status
    }
  }
`;
export const DISLIKE_TOPICCOMMENT = gql`
  mutation topicPostCommentLike_deleteTopicPostCommentLike(
    $userId: Int!
    $commentId: Int!
  ) {
    topicPostCommentLike_deleteTopicPostCommentLike(
      userId: $userId
      commentId: $commentId
    ) {
      code
      value
    }
  }
`;
