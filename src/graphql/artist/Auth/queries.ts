import {gql} from 'graphql-request';

export const USER_SIGN_IN = gql`
  query user_login {
    user_login {
      result {
        userName
        photoUrl
        fullName
        externalId
        userType
        email
        id
      }
      status
    }
  }
`;

export const USER_isValidReferralCode = gql`
  query user_isValidReferralCode($referralCode: String) {
    user_isValidReferralCode(referralCode: $referralCode) {
      status
    }
  }
`;
