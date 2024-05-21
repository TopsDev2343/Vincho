import {gql} from 'graphql-request';

export const GET_POST_FOR_STATISTICS = gql`
  query post_getByUserId(
    $skip: Int
    $take: Int
    $where: PostFilterInput
    $order: [PostSortInput!]
    $userId: Int!
  ) {
    post_getByUserId(userId: $userId) {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          fileUrl
          fileType
          caption
          viewCount
          userId
          setAsRecommended
          postLikeCount
          commentCount
          reportCount
          id
          isDeleted
          createdDate
          lastModifiedDate
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

// export const GET_All_STATISTICS = gql`
//   query {
//     user_getAllUsers {
//       result {
//         totalCount
//       }
//     }
//     post_getPosts {
//       result(where: {fileType: {eq: IMAGE}}) {
//         totalCount
//       }
//     }
//     postLike_getPostLikes {
//       result(where: {post: {isDeleted: {eq: false}}}) {
//         totalCount
//       }
//     }
//     comment_getComments {
//       result(where: {post: {isDeleted: {eq: false}}}) {
//         totalCount
//       }
//     }
//   }
// `;

export const GET_VIDEOS_STATISTICS = gql`
  query getVideosStatics {
    post_getPosts {
      result(where: {fileType: {eq: VIDEO}}) {
        totalCount
      }
    }
  }
`;

export const GET_THIS_MONTH_LIKES = gql`
  query postLike_getPostLikes(
    $skip: Int
    $take: Int
    $where: PostLikeFilterInput
    $order: [PostLikeSortInput!]
  ) {
    postLike_getPostLikes {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        totalCount
      }
      status
    }
  }
`;

export const GET_THIS_MONTH_VIEWS = gql`
  query postView_getPostViews(
    $skip: Int
    $take: Int
    $where: PostViewFilterInput
    $order: [PostViewSortInput!]
  ) {
    postView_getPostViews {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        totalCount
      }
      status
    }
  }
`;

export const GET_USERCOUNT_PER_MONTH = gql`
  query user_getUserCountPerMonth(
    $skip: Int
    $take: Int
    $where: MonthlyReportDtoFilterInput
  ) {
    user_getUserCountPerMonth {
      result(skip: $skip, take: $take, where: $where) {
        items {
          year
          month
          count
        }
        totalCount
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
      }
      status
    }
  }
`;

export const GET_USERCOUNT_PER_YEAR = gql`
  query user_getUserCountPerYear($skip: Int, $take: Int) {
    user_getUserCountPerYear {
      result(skip: $skip, take: $take) {
        items {
          year
          count
        }
        totalCount
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
      }
      status
    }
  }
`;

export const GET_POSTCOUNT_PER_MONTH = gql`
  query post_getPostCountPerMonth(
    $skip: Int
    $take: Int
    $fileType: FileType!
    $where: MonthlyReportDtoFilterInput
  ) {
    post_getPostCountPerMonth(fileType: $fileType) {
      result(skip: $skip, take: $take, where: $where) {
        items {
          year
          month
          count
        }
        totalCount
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
      }
      status
    }
  }
`;

export const GET_POSTCOUNT_PER_YEAR = gql`
  query post_getPostCountPerYear($skip: Int, $take: Int, $fileType: FileType!) {
    post_getPostCountPerYear(fileType: $fileType) {
      result(skip: $skip, take: $take) {
        items {
          year
          count
        }
        totalCount
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
      }
      status
    }
  }
`;

export const GET_POSTLIKECOUNT_PER_MONTH = gql`
  query post_getLikeCountPerMonth(
    $skip: Int
    $take: Int
    $where: MonthlyReportDtoFilterInput
  ) {
    post_getLikeCountPerMonth {
      result(skip: $skip, take: $take, where: $where) {
        items {
          year
          month
          count
        }
        totalCount
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
      }
      status
    }
  }
`;

export const GET_POSTLIKECOUNT_PER_YEAR = gql`
  query post_getLikeCountPerYear($skip: Int, $take: Int) {
    post_getLikeCountPerYear {
      result(skip: $skip, take: $take) {
        items {
          year
          count
        }
        totalCount
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
      }
      status
    }
  }
`;

export const GET_POSTCOMMENTSCOUNT_PER_MONTH = gql`
  query post_getCommentCountPerMonth(
    $skip: Int
    $take: Int
    $where: MonthlyReportDtoFilterInput
  ) {
    post_getCommentCountPerMonth {
      result(skip: $skip, take: $take, where: $where) {
        items {
          year
          month
          count
        }
        totalCount
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
      }
      status
    }
  }
`;

export const GET_POSTCOMMENTSCOUNT_PER_YEAR = gql`
  query post_getCommentCountPerYear($skip: Int, $take: Int) {
    post_getCommentCountPerYear {
      result(skip: $skip, take: $take) {
        items {
          year
          count
        }
        totalCount
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
      }
      status
    }
  }
`;

export const GET_LIKEGROWTH_PER_MONTH = gql`
  query user_getPostLikesPerMonth($skip: Int, $take: Int, $userId: Int!) {
    user_getPostLikesPerMonth(userId: $userId) {
      result(skip: $skip, take: $take) {
        items {
          year
          month
          count
        }
        totalCount
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
      }
      status
    }
  }
`;

export const GET_VIEWGROWTH_PER_MONTH = gql`
  query user_getPostViewsPerMonth($skip: Int, $take: Int, $userId: Int!) {
    user_getPostViewsPerMonth(userId: $userId) {
      result(skip: $skip, take: $take) {
        items {
          year
          month
          count
        }
        totalCount
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
      }
      status
    }
  }
`;
