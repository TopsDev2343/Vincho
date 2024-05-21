import {gql} from 'graphql-request';

export const REPORT_POST = gql`
  mutation reportPost_createReportPost($input: ReportPostInput) {
    reportPost_createReportPost(input: $input) {
      status
    }
  }
`;

export const CREATE_LIKE_POST = gql`
  mutation postLike_createPostLike($input: PostLikeInput) {
    postLike_createPostLike(input: $input) {
      result {
        userId
        postId
        id
      }
      status
    }
  }
`;

export const DELETE_POST_LIKE = gql`
  mutation postLike_deletePostLike($userId: Int!, $postId: Int!) {
    postLike_deletePostLike(userId: $userId, postId: $postId) {
      code
      value
    }
  }
`;

export const CREATE_POST = gql`
  mutation post_createPost(
    $input: PostInput
    $categories: [Int!]
    $hashtags: [String]
  ) {
    post_createPost(
      input: $input
      categories: $categories
      hashtags: $hashtags
    ) {
      result {
        id
      }
      status
    }
  }
`;
export const DELETE_POST = gql`
  mutation post_deletePost($entityId: Int!) {
    post_deletePost(entityId: $entityId) {
      code
      value
    }
  }
`;

export const CREATE_POST_VIEW = gql`
  mutation postView_createPostView($input: PostViewInput) {
    postView_createPostView(input: $input) {
      result {
        userId
        postId
        id
      }
      status
    }
  }
`;

export const CREATE_POST_SAVE = gql`
  mutation postSave_createPostSave($input: PostSaveInput) {
    postSave_createPostSave(input: $input) {
      result {
        userId
        postId
        id
      }
      status
    }
  }
`;

export const RECOMMEND_POST = gql`
  mutation post_setAsRecommended($entityId: Int!, $setAsRecommended: Boolean!) {
    post_setAsRecommended(
      entityId: $entityId
      setAsRecommended: $setAsRecommended
    ) {
      result {
        id
      }
      status
    }
  }
`;
