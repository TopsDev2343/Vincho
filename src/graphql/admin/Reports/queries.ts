import {gql} from 'graphql-request';

export const GET_REPORTED_ACCOUNTS = gql`
  query reportUser_getReportUsers(
    $skip: Int
    $take: Int
    $where: ReportUserFilterInput
    $order: [ReportUserSortInput!]
  ) {
    reportUser_getReportUsers {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          violationType
          description
          reporterUser {
            userName
            photoUrl
            id
            isDeleted
          }
          reportedUser {
            userName
            photoUrl
            id
            isDeleted
          }
          isReviewed
          id
          isDeleted
          createdDate
          adminId
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

export const GET_REPORTED_POSTS = gql`
  query reportPost_getReportPosts(
    $skip: Int
    $take: Int
    $where: ReportPostFilterInput
    $order: [ReportPostSortInput!]
  ) {
    reportPost_getReportPosts {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          reporterUser {
            userName
            id
            isDeleted
          }
          post {
            user {
              userName
              photoUrl
            }
            fileUrl
            fileType
            id
            isDeleted
          }
          violationType
          description
          id
          isDeleted
          createdDate
          isReviewed
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

export const GET_DISABLED_USERS = gql`
  query user_geDisabledUsers(
    $skip: Int
    $take: Int
    $where: UserFilterInput
    $order: [UserSortInput!]
  ) {
    user_getAllUsers {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          isDeleted
          id
          userName
          photoUrl
          fullName
          disabledByUserId
          disabledByUser {
            userName
            fullName
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

export const SET_REVIEW_ACCOUNT = gql`
  mutation reportUser_setAsReviewed($entityId: Int!) {
    reportUser_setAsReviewed(entityId: $entityId) {
      status
    }
  }
`;

export const SET_REVIEW_POST = gql`
  mutation reportPost_setAsReviewed($entityId: Int!) {
    reportPost_setAsReviewed(entityId: $entityId) {
      status
    }
  }
`;

export const GET_REPORTED_ACCOUNTS_COUNT = gql`
  query reportUser_getReportUsersCount(
    $skip: Int
    $take: Int
    $where: ReportUserFilterInput
    $order: [ReportUserSortInput!]
  ) {
    reportUser_getReportUsers {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        totalCount
      }
      status
    }
  }
`;
