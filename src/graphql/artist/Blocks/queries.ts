import {gql} from 'graphql-request';

export const GET_BLOCKS = gql`
query block_getBlocks($skip: Int, $take: Int, $where: BlockFilterInput, $order: [BlockSortInput!]){
    block_getBlocks{
        result(skip: $skip, take: $take, where: $where, order: $order){
            items {
                blockedUser {
                    userName
                    photoUrl
                    fullName
                    id
                  }
                  id
            }
            pageInfo{
                hasNextPage
                hasPreviousPage
            }
            totalCount
        }
        status
    }
}
`;