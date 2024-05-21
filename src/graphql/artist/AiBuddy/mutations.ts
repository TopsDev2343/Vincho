import {gql} from 'graphql-request';

export const CREATE_BUDDY = gql`
  mutation buddy_createBuddy($input: InsertBuddyInput) {
    buddy_createBuddy(input: $input) {
      result {
        id
        personality
        tags
        interactionFrequency
        interactions
        interactionTypes
      }
      status
    }
  }
`;

export const UPDATE_BUDDY = gql`
  mutation buddy_updateBuddy($input: UpdateBuddyInput) {
    buddy_updateBuddy(input: $input) {
      result {
        id
        personality
        tags
        user {
          fullName
          photoUrl
        }
        interactionFrequency
        interactions
        interactionTypes
      }
      status
    }
  }
`;
