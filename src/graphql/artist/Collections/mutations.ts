import {gql} from 'graphql-request';

export const CREATE_COLLECTION = gql`
  mutation collection_createCollection($input: CollectionInput) {
    collection_createCollection(input: $input) {
      status
    }
  }
`;

export const CREATE_BASECOLLECTION = gql`
  mutation baseCollection_createBaseCollection(
    $title: String
    $postIds: [Int!]
  ) {
    baseCollection_createBaseCollection(title: $title, postIds: $postIds) {
      status
    }
  }
`;

export const DELETE_COLLECTION = gql`
  mutation baseCollection_deleteBaseCollection($entityId: Int!) {
    baseCollection_deleteBaseCollection(entityId: $entityId) {
      code
      value
    }
  }
`;

export const UPDATE_BASECOLLECTION = gql`
  mutation baseCollection_updateBaseCollection(
    $input: BaseCollectionInput
    $postIds: [Int!]
  ) {
    baseCollection_updateBaseCollection(input: $input, postIds: $postIds) {
      status
    }
  }
`;

export const DELETE_FROM_COLLECTION = gql`
  mutation collection_deleteFromCollection(
    $baseCollectionId: Int!
    $postId: Int!
  ) {
    collection_deleteFromCollection(
      baseCollectionId: $baseCollectionId
      postId: $postId
    ) {
      code
      value
    }
  }
`;

export const UPDATE_COLLECTION = gql`
  mutation collection_updateCollection($input: CollectionInput) {
    collection_updateCollection(input: $input) {
      status
    }
  }
`;

export const DELETE_FROM_ALLPOST = gql`
  mutation postSav_deletePostSav($postId: Int!) {
    postSav_deletePostSav(postId: $postId) {
      code
      value
    }
  }
`;
