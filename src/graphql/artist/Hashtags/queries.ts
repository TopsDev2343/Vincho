import {gql} from 'graphql-request';

export const GET_HASHTAG_LIST = gql`
  query hashtag_getHashtags(
    $skip: Int
    $take: Int
    $where: HashtagFilterInput
    $order: [HashtagSortInput!]
  ) {
    hashtag_getHashtags {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          title
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
