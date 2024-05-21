import {gql} from 'graphql-request';

export const CREATE_TOPIC = gql`
  mutation topic_createTopic($input: TopicInput, $invitedUserIds: [Int!]) {
    topic_createTopic(input: $input, invitedUserIds: $invitedUserIds) {
      result {
        id
      }
      status
    }
  }
`;

export const CREATE_TOPIC_USER = gql`
  mutation topicUser_createTopicUser($input: TopicUserInput) {
    topicUser_createTopicUser(input: $input) {
      status
    }
  }
`;

export const CREATE_TOPIC_POST = gql`
  mutation topicPost_createTopicPost(
    $input: TopicPostInput
    $hashtags: [String]
  ) {
    topicPost_createTopicPost(input: $input, hashtags: $hashtags) {
      result {
        id
      }
      status
    }
  }
`;

export const LIKE_TOPIC_POST = gql`
  mutation topicPostLike_createTopicPostLike($input: TopicPostLikeInput) {
    topicPostLike_createTopicPostLike(input: $input) {
      status
    }
  }
`;

export const DISLIKE_TOPIC_POST = gql`
  mutation TopicPostLike_deleteTopicPostLike(
    $userId: Int!
    $topicPostId: Int!
  ) {
    TopicPostLike_deleteTopicPostLike(
      userId: $userId
      topicPostId: $topicPostId
    ) {
      code
      value
    }
  }
`;

export const CREATE_TOPIC_COMMENT = gql`
  mutation topicPostComment_createTopicPostComment(
    $input: TopicPostCommentInput
  ) {
    topicPostComment_createTopicPostComment(input: $input) {
      result {
        likeCount
        userId
        parentId
        topicPostId
        id
        createdDate
      }
      status
    }
  }
`;

export const CREATE_TOPIC_CHILD_COMMENT = gql`
  mutation topicPostComment_createTopicPostComment(
    $input: TopicPostCommentInput
  ) {
    topicPostComment_createTopicPostComment(input: $input) {
      result {
        likeCount
        userId
        parentId
        topicPostId
        id
        createdDate
      }
      status
    }
  }
`;

export const DELETE_TOPIC_POST_COMMENT = gql`
  mutation topicPostComment_deleteTopicPostComment($entityId: Int!) {
    topicPostComment_deleteTopicPostComment(entityId: $entityId) {
      code
      value
    }
  }
`;

export const DELETE_TOPIC_POST = gql`
  mutation topicPost_deleteTopicPost($entityId: Int!) {
    topicPost_deleteTopicPost(entityId: $entityId) {
      code
      value
    }
  }
`;

export const REPORT_TOPIC_POST = gql`
  mutation reportTopicPost_createReportTopicPost($input: ReportTopicPostInput) {
    reportTopicPost_createReportTopicPost(input: $input) {
      status
    }
  }
`;

export const DELETE_TOPIC = gql`
  mutation topic_deleteTopic($entityId: Int!) {
    topic_deleteTopic(entityId: $entityId) {
      code
      value
    }
  }
`;
