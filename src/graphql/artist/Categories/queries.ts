import {gql} from 'graphql-request';

export const GET_ALL_CATEGORIES = gql`
  query category_getCategories(
    $skip: Int
    $take: Int
    $where: CategoryFilterInput
    $order: [CategorySortInput!]
  ) {
    category_getCategories {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          title
          isActive
          id
          likeCount
          commentCount
          postCount
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

export const post_getPostsByCategoryAndFileType = gql`
  query post_getPostsByCategoryAndFileType(
    $fromDate: DateTime!
    $toDate: DateTime!
    $fileType: FileType!
    $skip: Int
    $take: Int
  ) {
    post_getPostsByCategoryAndFileType(
      fromDate: $fromDate
      toDate: $toDate
      fileType: $fileType
    ) {
      result(skip: $skip, take: $take) {
        items {
          categoryId
          categoryTitle
          count
        }
      }
      status
    }
  }
`;
