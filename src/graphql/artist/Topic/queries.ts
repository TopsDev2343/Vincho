import {gql} from 'graphql-request';

export const GET_ALL_TOPICS = gql`
  query topic_AllTopics(
    $skip: Int
    $take: Int
    $where: TopicFilterInput
    $order: [TopicSortInput!]
  ) {
    topic_getTopics {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          title
          description
          id
          topicUsers {
            userId
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

export const GET_TOPICS_BY_USER_ID = gql`
  query topicUser_getByUserId(
    $skip: Int
    $take: Int
    $where: TopicUserFilterInput
    $order: [TopicUserSortInput!]
    $userId: Int!
  ) {
    topicUser_getByUserId(userId: $userId) {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          topic {
            title
            description
            id
          }
          topicId
          userId
          invitedByUserId
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

export const GET_TOPICS_COUNT_BY_USER_ID = gql`
  query topicUser_getCountByUserId(
    $skip: Int
    $take: Int
    $where: TopicUserFilterInput
    $order: [TopicUserSortInput!]
    $userId: Int!
  ) {
    topicUser_getByUserId(userId: $userId) {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        totalCount
      }
      status
    }
  }
`;

export const GET_ALL_TOPICS_COUNT = gql`
  query topic_getTopicsCount(
    $skip: Int
    $take: Int
    $where: TopicFilterInput
    $order: [TopicSortInput!]
  ) {
    topic_getTopics {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        totalCount
      }
      status
    }
  }
`;

export const GET_TOPIC_POSTS = gql`
  query topicPost_getByTopicId(
    $skip: Int
    $take: Int
    $where: TopicPostFilterInput
    $order: [TopicPostSortInput!]
    $topicId: Int!
  ) {
    topicPost_getByTopicId(topicId: $topicId) {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          caption
          topicId
          user {
            userName
            photoUrl
          }
          topicPostComments {
            id
          }
          commentCount
          userId
          fileUrl
          fileType
          likeCount
          id
          createdDate
          reportCount
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

export const GET_TOPIC_POST_DETAIL = gql`
  query topicPost_getTopicPost($entityId: Int!) {
    topicPost_getTopicPost(entityId: $entityId) {
      result {
        fileUrl
        fileType
        caption
        user {
          userName
          photoUrl
          id
        }
        userId
        topicPostComments {
          commentText
        }
        topicPostHashtags {
          hashtag {
            title
            id
          }
        }
        topicPostLikes {
          userId
        }
        likeCount
        commentCount
        reportCount
        id
        createdDate
      }
      status
    }
  }
`;

export const GET_TOPIC_COMMENTS_BY_POST_ID = gql`
  query topicPostComment_getByTopicPostId(
    $skip: Int
    $take: Int
    $where: TopicPostCommentFilterInput
    $order: [TopicPostCommentSortInput!]
    $topicPostId: Int!
  ) {
    topicPostComment_getByTopicPostId(topicPostId: $topicPostId) {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          commentText
          likeCount
          parentId
          user {
            userName
            photoUrl
            id
          }
          childComments {
            commentText
            likeCount
            id
            user {
              photoUrl
              userName
              id
            }
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

export const GET_TOPIC_POST_LIKES = gql`
  query topicPostLike_getTopicPostLikes(
    $skip: Int
    $take: Int
    $where: TopicPostLikeFilterInput
    $order: [TopicPostLikeSortInput!]
  ) {
    topicPostLike_getTopicPostLikes {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          user {
            userName
            photoUrl
            id
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

export const GET_CUSTOME_TOPIC_COMMENTS_BY_POST_ID = gql`
  query topicPostComment_customeGetTopicPostComments(
    $skip: Int
    $take: Int
    $where: TopicPostCommentDtoFilterInput
    $order: [TopicPostCommentDtoSortInput!]
  ) {
    topicPostComment_customeGetTopicPostComments {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          commentText
          likeCount
          parentId
          user {
            userName
            photoUrl
            id
          }
          userId
          replyCount
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

export const GET_HASHTAG_TOPIC_POSTS = gql`
  query topicPost_getByHashtagIds(
    $skip: Int
    $take: Int
    $where: TopicPostFilterInput
    $order: [TopicPostSortInput!]
    $hashtagIds: [Int!]
  ) {
    topicPost_getByHashtagIds(hashtagIds: $hashtagIds) {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          caption
          topicId
          user {
            userName
            photoUrl
          }
          topicPostComments {
            id
          }
          commentCount
          userId
          fileUrl
          fileType
          likeCount
          id
          createdDate
          reportCount
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

export const GET_TOPICS_REPORT = gql`
  query topic_getTopicsReport(
    $skip: Int
    $take: Int
    $where: TopicReportDtoFilterInput
    $order: [TopicReportDtoSortInput!]
  ) {
    topic_getTopicsReport {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          topic {
            id
            title
            description
            topicUsers {
              userId
            }
          }
          usersCount
          commentsCount
          likesCount
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
