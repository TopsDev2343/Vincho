import { gql } from 'graphql-request';

export const GET_BASECOLLECTIONS = gql`
query baseCollection_getBaseCollections($skip: Int, $take: Int, $where: BaseCollectionFilterInput, $order: [BaseCollectionSortInput!]){
    baseCollection_getBaseCollections{
        result(skip: $skip, take: $take, where: $where, order: $order){
            items {
                id
                title
                collections {
                  id
                  isDeleted
                  post {
                    id
                    fileUrl
                    fileType
                    isDeleted
                  }
                }
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


export const GET_COLLECTIONS = gql`
query collection_getCollections($skip: Int, $take: Int, $where: CollectionFilterInput, $order: [CollectionSortInput!]){
    collection_getCollections{
        result(skip: $skip, take: $take, where: $where, order: $order){
            items {
                baseCollectionId
                post {
                  fileUrl
                  id
                  fileType
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



export const GET_BASECOLLECTION_BY_ID = gql`
query baseCollection_getBaseCollection($entityId: Int!){
    baseCollection_getBaseCollection(entityId:$entityId){
        result{
            title
            id
            collections {
              id
              post {
                fileUrl
                id
                fileType
              }
            }
        }
        status
    }
}
`;