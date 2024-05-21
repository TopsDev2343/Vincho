import {gql} from 'graphql-request';

export const GET_MESSAGES = gql`
  query message_getMessages(
    $skip: Int
    $take: Int
    $where: ConversationInputFilterInput
    $order: [ConversationInputSortInput!]
    $includeDeletedRows: Boolean!
  ) {
    message_getUserMessages(includeDeletedRows: $includeDeletedRows) {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          userId
          userEmail
          userFullName
          subject
          lastMessageText
          conversationId
          unreadCount
          latestMessageDate
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
export const GET_CONVERSATIONS = gql`
  query message_getConversation(
    $skip: Int
    $take: Int
    $where: MessageFilterInput
    $order: [MessageSortInput!]
    $conversationId: Int!
  ) {
    message_getConversation(conversationId: $conversationId) {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          messageType
          photoUrl
          createdAt
          conversationId
          conversation {
            subject
            firstUserId
            secondUserId
            firstUser {
              email
              photoUrl
              fullName
            }
            secondUser {
              photoUrl
              email
              fullName
            }
            firstUnreadCount
            secondUnreadCount
            latestMessageDate
            id
            isDeleted
          }
          post {
            id
            fileUrl
            caption
            fileType
            user {
              photoUrl
              email
              fullName
              userName
            }
          }
          topicPost {
            id
            fileUrl
            caption
            fileType
            user {
              photoUrl
              email
              fullName
              userName
            }
          }
          senderId
          sender {
            email
            userType
            externalId
            id
            isDeleted
          }
          text
          id
          isDeleted
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
// export const RECEIVER_PROFILE = gql`
//   query user_getReciverProfile($userId: Int!) {
//     user_getUser(userId: $userId) {
//       result {
//         isActive
//         createdAt
//         email
//         userType
//         isNotificationEnabled
//         city
//         photoUrl
//         fullName
//         longitude
//         latitude
//         zipCode
//         genders
//         age
//         ethnicity
//         educationLevel
//         currentIncome
//         industry
//         amount
//         amountType
//         whereDoYouWantToWork
//         howFarAreYouWillingToTravelToGetCertified
//         whereDidYouHearAboutOnedegreeCareers
//         whereDidYouHearAboutOnedegreeCareersTextForOther

//         externalId
//         id
//         isDeleted
//       }
//       status
//     }
//   }
// `;
export const GET_CONVERSATION_FOR_USER = gql`
  query message_getConversationForUser($otherUserId: Int!) {
    message_getConversationForUser(otherUserId: $otherUserId) {
      result {
        subject
        messages {
          messageType
        }
        firstUserId
        firstUser {
          id
          fullName
          email
          photoUrl
        }
        secondUserId
        secondUser {
          id
          fullName
          photoUrl
          email
        }
        firstUnreadCount
        secondUnreadCount
        latestMessageDate
        id
        isDeleted
      }
      status
    }
  }
`;

export const GET_CONVERSATION_ID_FOR_USER = gql`
  query getConversationIdForUser($where: ConversationInputFilterInput) {
    message_getUserMessages(includeDeletedRows: false) {
      status
      result(where: $where) {
        totalCount
        items {
          conversationId
        }
      }
    }
  }
`;
