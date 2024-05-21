import {gql} from 'graphql-request';

export const DELETE_BLOCK = gql`
  mutation block_deleteBlock($entityId: Int!) {
    block_deleteBlock(entityId: $entityId) {
      code
      value
    }
  }
`;

export const CREATE_BLOCK = gql`
  mutation block_createBlock($input: BlockInput) {
    block_createBlock(input: $input) {
      status
    }
  }
`;
