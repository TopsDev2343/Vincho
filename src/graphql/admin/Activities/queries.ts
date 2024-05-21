import {gql} from 'graphql-request';

export const GET_ALL_ACTIVITIES = gql`
  query activity_getActivities(
    $skip: Int
    $take: Int
    $where: ActivityFilterInput
    $order: [ActivitySortInput!]
  ) {
    activity_getActivities {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          activityType
          user {
            userName
            photoUrl
            id
          }
          targetUser {
            createdDate
          }
          targetPost {
            createdDate
            id
          }
          targetComment {
            createdDate
          }
          userId
          targetTopicPost {
            createdDate
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

export const GET_MOST_ACTIVE_USERS = gql`
  query activity_getUsersActivitiesByCount(
    $skip: Int
    $take: Int
    $where: UsersActivitiesByCountDtoFilterInput
    $order: [UsersActivitiesByCountDtoSortInput!]
    $fromDate: DateTime!
    $toDate: DateTime!
  ) {
    activity_getUsersActivitiesByCount(fromDate: $fromDate, toDate: $toDate) {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          user {
            userName
            id
            photoUrl
            fullName
          }
          likeCount
          commentCount
          sharePostCount
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
