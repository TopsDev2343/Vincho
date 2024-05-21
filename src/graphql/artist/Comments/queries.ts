import {gql} from 'graphql-request';

export const GET_COMMENTS_BY_POST_ID = gql`
  query comment_getByPostId(
    $skip: Int
    $take: Int
    $where: CommentFilterInput
    $order: [CommentSortInput!]
    $postId: Int!
  ) {
    comment_getByPostId(postId: $postId) {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          commentText
          likeCount
          commentLikes {
            user {
              id
            }
          }
          user {
            userName
            photoUrl
            fullName
            id
          }
          childComments {
            commentText
            likeCount
            userId
            parentId
            postId
            id
            user {
              photoUrl
              userName
              id
            }
            createdDate
          }
          post {
            id
            postLikeCount
            commentCount
            postHashtags {
              hashtag {
                title
                id
              }
            }
            postLikes {
              postId
            }
            caption
            user {
              photoUrl
              userName
            }
          }
          userId
          parentId
          postId
          id
          createdDate
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

export const GET_CUSTOME_COMMENTS_BY_POST_ID = gql`
  query comment_customeGetComments(
    $skip: Int
    $take: Int
    $where: CommentDtoFilterInput
    $order: [CommentDtoSortInput!]
  ) {
    comment_customeGetComments {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          commentText
          likeCount
          replyCount
          commentLikes {
            user {
              id
            }
          }
          user {
            userName
            photoUrl
            fullName
            id
          }
          post {
            id
            postLikeCount
            commentCount
            postHashtags {
              hashtag {
                title
                id
              }
            }
            postLikes {
              postId
            }
            caption
            user {
              photoUrl
              userName
            }
          }
          userId
          parentId
          postId
          id
          isLiked
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

export const GET_COMMENTS = gql`
  query comment_getComments(
    $skip: Int
    $take: Int
    $where: CommentFilterInput
    $order: [CommentSortInput!]
  ) {
    comment_getComments {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          commentText
          likeCount
          commentLikes {
            user {
              id
            }
          }
          user {
            userName
            photoUrl
            fullName
            id
          }
          childComments {
            commentText
            likeCount
            userId
            parentId
            postId
            id
            user {
              photoUrl
              userName
              id
            }
            createdDate
          }
          post {
            id
            fileUrl
            postLikeCount
            commentCount
            postHashtags {
              hashtag {
                title
                id
              }
            }
            postLikes {
              postId
            }
            caption
            user {
              photoUrl
              userName
            }
          }
          userId
          parentId
          postId
          id
          createdDate
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
