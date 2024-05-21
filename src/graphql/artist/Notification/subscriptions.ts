import {gql} from 'graphql-request';

export const NOTIFICATION_ADDED = gql`
  subscription notificationAdded($userId: Int!) {
    notificationAdded(userId: $userId) {
      activity {
        targetPostId
        activityType
        userId
        id
        isDeleted
        createdDate
        user {
          userName
          email
          id
        }
        targetUser {
          userName
          email
          id
        }
        targetPost {
          fileUrl
          caption
          id
        }
      }
      activityId
      topicId
      topic {
        title
        description
      }
      messageId
      message {
        text
      }
      notificationType
      title
      description
    }
  }
`;

export const MESSAGE_ADDED = gql`
  subscription messageAdded($userId: Int!) {
    messageAdded(userId: $userId) {
      conversationId
      createdAt
      id
      isDeleted
      senderId
      messageType
      photoUrl
      postId
      text
    }
  }
`;
