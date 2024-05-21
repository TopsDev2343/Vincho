import {gql} from 'graphql-request';

export const GET_POST_LIKES = gql`
  query postLike_getPostLikes(
    $skip: Int
    $take: Int
    $where: PostLikeFilterInput
    $order: [PostLikeSortInput!]
  ) {
    postLike_getPostLikes {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          user {
            userName
            photoUrl
            fullName
            id
          }
          post {
            id
            fileUrl
            caption
            fileType
          }
          userId
          postId
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

export const GET_FOLLOWINGS = gql`
  query follow_getFollowings(
    $followerId: Int!
    $skip: Int
    $take: Int
    $where: FollowFilterInput
    $order: [FollowSortInput!]
  ) {
    follow_getFollowings(followerId: $followerId) {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          followingId
          followerId
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

export const GET_EXPLORE_POST_BY_CATEGORY_ID = gql`
  query post_getByCategoryIds(
    $skip: Int
    $take: Int
    $where: PostFilterInput
    $order: [PostSortInput!]
    $categoryIds: [Int!]
  ) {
    post_getByCategoryIds(categoryIds: $categoryIds) {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          fileUrl
          caption
          fileType
          postLikeCount
          commentCount
          reportCount
          user {
            userName
            photoUrl
            id
          }
          userId
          postLikes {
            id
            userId
          }
          id
          createdDate
          postHashtags {
            hashtag {
              title
              id
            }
          }
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

export const GET_POPULAR_EXPLORE_POST = gql`
  query post_getMostPopular(
    $skip: Int
    $take: Int
    $where: PostFilterInput
    $order: [PostSortInput!]
  ) {
    post_getMostPopular {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          fileUrl
          caption
          fileType
          postLikeCount
          commentCount
          user {
            userName
            photoUrl
            id
          }
          postHashtags {
            hashtag {
              title
              id
            }
          }
          userId
          postLikes {
            userId
          }
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

export const GET_FOLLOWING_EXPLORE_POST = gql`
  query post_getFollowingPosts(
    $skip: Int
    $take: Int
    $where: PostFilterInput
    $order: [PostSortInput!]
   
  ) {
    post_getFollowingPosts() {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          fileUrl
          caption
          fileType
          postLikeCount
          commentCount
          setAsRecommended
          user {
            userName
            photoUrl
            id
          }
          userId
          postHashtags {
            hashtag {
              title
              id
            }
          }
          postLikes {
            userId
            id
          }
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

export const GET_POSTS = gql`
  query post_getPosts(
    $skip: Int
    $take: Int
    $where: PostFilterInput
    $order: [PostSortInput!]
   
  ) {
    post_getPosts() {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          fileUrl
          caption
          fileType
          postLikeCount
          commentCount
          reportCount
          setAsRecommended
          user {
            userName
            photoUrl
            id
          }
          userId
          postLikes {
            id
          }
          id
          createdDate
          postHashtags {
            hashtag {
              title
              id
            }
          }
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

export const GET_POST_BY_ID = gql`
  query post_getPost($entityId: Int!) {
    post_getPost(entityId: $entityId) {
      result {
        fileUrl
        caption
        fileType
        user {
          fullName
          userName
          photoUrl
          id
        }
        userId
        comments {
          commentText
        }
        postLikes {
          id
          userId
        }
        commentCount
        postLikeCount
        id
        reportCount
        createdDate
        setAsRecommended
        postHashtags {
          hashtag {
            title
            id
          }
        }
      }
      status
    }
  }
`;

export const GET_FOLLOWERS = gql`
  query follow_getFollowers(
    $followingId: Int!
    $skip: Int
    $take: Int
    $where: FollowFilterInput
    $order: [FollowSortInput!]
  ) {
    follow_getFollowers(followingId: $followingId) {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          followingId
          followerId
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

export const GET_NEARBY_EXPLORE_POST = `
query post_getPostsNearMe($skip: Int, $take: Int, $where: PostFilterInput, $order: [PostSortInput!], $location: Position, $categoryIds: [Int!]){
  post_getPostsNearMe(location: $location, categoryIds: $categoryIds){
      result(skip: $skip, take: $take, where: $where, order: $order){
      items {
        fileUrl
        caption
        fileType
        postLikeCount
        commentCount
        setAsRecommended
        user {
          userName
          photoUrl
          id
        }
        postHashtags {
          hashtag {
            title
            id
          }
        }
        userId
        postLikes {
          userId
          id
        }
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

export const GET_UNVIEWED_POSTS = gql`
  query post_getUnViewedPosts(
    $skip: Int
    $take: Int
    $where: PostFilterInput
    $order: [PostSortInput!]
   
  ) {
    post_getUnViewedPosts() {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          fileUrl
          caption
          fileType
          postLikeCount
          commentCount
          reportCount
          user {
            userName
            photoUrl
            id
          }
          userId
          postLikes {
            id
            userId
          }
          id
          createdDate
          postHashtags {
            hashtag {
              title
              id
            }
          }
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

export const GET_EXPLORE_POST_BY_HASHTAG_ID = gql`
  query post_getByHashtagIds(
    $skip: Int
    $take: Int
    $where: PostFilterInput
    $order: [PostSortInput!]
    $hashtagIds: [Int!]
  ) {
    post_getByHashtagIds(hashtagIds: $hashtagIds) {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          fileUrl
          caption
          fileType
          postLikeCount
          commentCount
          reportCount
          user {
            userName
            photoUrl
            id
          }
          userId
          postLikes {
            id
            userId
          }
          id
          createdDate
          postHashtags {
            hashtag {
              title
              id
            }
          }
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

export const GET_POST_SAVES = gql`
  query postSav_getPostSave(
    $skip: Int
    $take: Int
    $where: PostSaveFilterInput
    $order: [PostSaveSortInput!]
  ) {
    postSav_getPostSave {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          user {
            userName
            photoUrl
            fullName
            id
          }
          post {
            id
            fileUrl
            caption
            fileType
          }
          userId
          postId
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
