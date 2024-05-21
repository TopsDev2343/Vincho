import {gql} from 'graphql-request';

export const CREATE_USER_CATEGORIES = gql`
  mutation userCategory_createByCategoryIds(
    $skip: Int
    $take: Int
    $where: UserCategoryFilterInput
    $order: [UserCategorySortInput!]
    $userId: Int!
    $categoryIds: [Int!]
  ) {
    userCategory_createByCategoryIds(
      userId: $userId
      categoryIds: $categoryIds
    ) {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        totalCount
      }
      status
    }
  }
`;

export const CREATE_CATEGORIES = gql`
  mutation category_createCategory($input: CategoryInput) {
    category_createCategory(input: $input) {
      status
    }
  }
`;
