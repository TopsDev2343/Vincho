import {gql} from 'graphql-request';

export const User_CreateAdmin = gql`
  mutation user_createAdmin(
    $userInput: UserInput
    $email: String
    $password: String
  ) {
    user_createAdmin(
      userInput: $userInput
      email: $email
      password: $password
    ) {
      result {
        email
        id
      }
      status
    }
  }
`;

export const User_ChangeUserActivation = gql`
  mutation user_changeUserActivation($isActive: Boolean!, $userId: Int!) {
    user_changeUserActivation(isActive: $isActive, userId: $userId) {
      status
    }
  }
`;

export const Delete_Admin = gql`
  mutation user_deleteAccount($userId: Int!) {
    user_deleteAccount(userId: $userId) {
      status
    }
  }
`;
