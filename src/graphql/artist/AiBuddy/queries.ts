import {gql} from 'graphql-request';

export const GET_ALL_BUDDIES = gql`
  query buddy_getBuddies(
    $skip: Int
    $take: Int
    $where: BuddyDtoFilterInput
    $order: [BuddyDtoSortInput!]
  ) {
    buddy_getBuddies {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          id
          user {
            id
            userName
            photoUrl
            fullName
            aboutText
            userType
            isActive
            phoneNumber
          }
          personality
          tags
          interactionFrequency
          interactions
          interactionTypes
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
