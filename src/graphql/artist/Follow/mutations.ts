import {gql} from 'graphql-request';

export const CREATE_FOLLOW = gql`
  mutation follow_createFollow($input: FollowInput) {
    follow_createFollow(input: $input) {
      result {
        id
        follower {
          userName
          fullName
          id
        }
        following {
          userName
          fullName
          id
        }
      }
      status
    }
  }
`;

export const DELETE_FOLLOW = gql`
  mutation follow_deleteFollow($entityId: Int!) {
    follow_deleteFollow(entityId: $entityId) {
      code
      value
    }
  }
`;

export const DELETE_FOLLOW_BY_FOLLOWING_ID = gql`
  mutation follow_deleteFollowByFollowingId($followingId: Int!) {
    follow_deleteFollowByFollowingId(followingId: $followingId) {
      code
      value
    }
  }
`;
