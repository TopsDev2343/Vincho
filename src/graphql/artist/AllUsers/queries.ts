import {gql} from 'graphql-request';

export const GET_ALL_USERS = gql`
  query user_getAllUsers(
    $skip: Int
    $take: Int
    $where: UserFilterInput
    $order: [UserSortInput!]
  ) {
    user_getAllUsers {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          userName
          userType
          photoUrl
          fullName
          email
          id
          createdDate
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
