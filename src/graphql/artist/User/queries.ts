import {gql} from 'graphql-request';

export const GET_OTHER_USER_PROFILE = gql`
  query user_getOtherProfile($userId: Int!) {
    user_getProfile(userId: $userId) {
      result {
        userName
        userType
        photoUrl
        fullName
        aboutText
        phoneNumber
        isActive
        userCategories {
          category {
            title
            id
          }
        }
        email
        id
      }
      status
    }
  }
`;

export const GET_USER_PROFILE = gql`
  query user_getProfile {
    user_getProfile {
      result {
        userName
        photoUrl
        fullName
        aboutText
        phoneNumber
        location {
          coordinates
        }
        userCategories {
          category {
            title
            id
          }
        }
        email
        id
        showNewMessageNotifications
        showLikeNotifications
        showCommentNotifications
        showRecomandationNotifications
        showOtherNotifications
      }
      status
    }
  }
`;

export const message_getUserMessages = gql`
  query message_getUserMessages(
    $skip: Int
    $take: Int
    $where: ConversationInputFilterInput
    $order: [ConversationInputSortInput!]
    $includeDeletedRows: Boolean
  ) {
    message_getUserMessages(includeDeletedRows: $includeDeletedRows) {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          userEmail
          userFullName
          subject
          conversationId
          user {
            id
            userName
            photoUrl
          }
          unreadCount
          latestMessageDate
          lastMessageText
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

export const user_getNearbyUsers = gql`
  mutation user_getNearbyUsers(
    $skip: Int
    $take: Int
    $currentLocation: Position
    $updateLocation: Boolean!
  ) {
    user_getNearbyUsers(
      currentLocation: $currentLocation
      updateLocation: $updateLocation
    ) {
      result(skip: $skip, take: $take) {
        items {
          userName
          photoUrl
          distance
          id
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
