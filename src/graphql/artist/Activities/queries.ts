import {gql} from 'graphql-request';

export const GET_ACTIVITIES_BY_USER_ID = gql`
  query activity_getByUserId(
    $skip: Int
    $take: Int
    $where: ActivityFilterInput
    $order: [ActivitySortInput!]
    $userId: Int!
  ) {
    activity_getByUserId(userId: $userId) {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          user {
            userName
            id
            photoUrl
            fullName
          }
          activityType
          targetUser {
            userName
            photoUrl
            id
            isActive
          }
          targetPost {
            fileUrl
            fileType
            user {
              userName
              photoUrl
            }
            id
          }
          targetComment {
            commentText
            post {
              id
              fileUrl
              fileType
              user {
                userName
                photoUrl
              }
            }
            id
          }
          targetTopicPost {
            user {
              userName
              photoUrl
            }
            fileUrl
            fileType
            id
          }
          id
          createdDate
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
        totalCount
      }
      status
    }
  }
`;

export const GET_NOTIFICATIONS = gql`
  query notification_getNotifications(
    $skip: Int
    $take: Int
    $where: NotificationFilterInput
    $order: [NotificationSortInput!]
  ) {
    notification_getNotifications() {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          id
          notificationType
          user{
            id
            photoUrl
            userName
            fullName
          }
          post {
            fileUrl
            fileType
            id
          }
          message {
            senderId
            conversationId
          }
          createdDate
          activity {
            user {
              userName
              id
              photoUrl
              fullName
            }
            activityType
            targetUser {
              userName
              photoUrl
              id
              isActive
            }
            targetPost {
              fileUrl
              fileType
              user {
                userName
                photoUrl
              }
              id
            }
            targetComment {
              commentText
              post {
                id
                fileUrl
                fileType
                user {
                  userName
                  photoUrl
                }
              }
              id
            }
            targetTopicPost {
              user {
                userName
                photoUrl
              }
              fileUrl
              fileType
              id
            }
          id
          createdDate
          }
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
        totalCount
      }
      status
    }
  }
`;

export const GET_NOTIFICATIONS_COUNTS = gql`
  query notification_getNotifications(
    $skip: Int
    $take: Int
    $where: NotificationFilterInput
    $order: [NotificationSortInput!]
  ) {
    notification_getNotifications {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        totalCount
      }
      status
    }
  }
`;
