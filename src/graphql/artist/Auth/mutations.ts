import {gql} from 'graphql-request';

export const USER_SIGN_UP = gql`
  mutation user_signUpArtist($userInput: UserInput) {
    user_signUpArtist(userInput: $userInput) {
      result {
        email
        id
      }
      status
    }
  }
`;
