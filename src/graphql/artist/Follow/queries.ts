import {gql} from 'graphql-request';

export const GET_ALL_FOLLOWING = gql`
  query follow_getFollowings(
    $skip: Int
    $take: Int
    $where: FollowFilterInput
    $order: [FollowSortInput!]
    $followerId: Int!
  ) {
    follow_getFollowings(followerId: $followerId) {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          following {
            userName
            photoUrl
            fullName
            id
          }
          followerId
          followingId
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

export const GET_ALL_FOLLOWERS = gql`
  query follow_getFollowers(
    $skip: Int
    $take: Int
    $where: FollowFilterInput
    $order: [FollowSortInput!]
    $followingId: Int!
  ) {
    follow_getFollowers(followingId: $followingId) {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          id
          follower {
            userName
            photoUrl
            id
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
