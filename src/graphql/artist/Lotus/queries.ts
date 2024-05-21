import {gql} from 'graphql-request';

export const USER_GET_LOUTS_STATUS = gql`
  query user_getLotusStatus {
    user_getLotusStatus {
      result {
        referralCode
        lotusCount
        invitedUsers {
          id
          photoUrl
          createdAt
          fullName
          userName
        }
      }
      status
    }
  }
`;
