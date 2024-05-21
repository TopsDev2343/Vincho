export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends {[key: string]: unknown}> = {[K in keyof T]: T[K]};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<T extends {[key: string]: unknown}, K extends keyof T> = {
  [_ in K]?: never;
};
export type Incremental<T> =
  | T
  | {[P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: {input: string; output: string};
  String: {input: string; output: string};
  Boolean: {input: boolean; output: boolean};
  Int: {input: number; output: number};
  Float: {input: number; output: number};
  Any: {input: any; output: any};
  /** A coordinate is an array of positions. */
  Coordinates: {input: any; output: any};
  /** The `DateTime` scalar represents an ISO-8601 compliant date time type. */
  DateTime: {input: any; output: any};
  Geometry: {input: any; output: any};
  /** A position is an array of numbers. There MUST be two or more elements. The first two elements are longitude and latitude, or easting and northing, precisely in that order and using decimal numbers. Altitude or elevation MAY be included as an optional third element. */
  Position: {input: any; output: any};
};

export type AiBuddy = {
  __typename?: 'AIBuddy';
  createdDate: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  interactionFrequency?: Maybe<BuddyInteractionFrequencies>;
  interactionList?: Maybe<Array<BuddyInteractions>>;
  interactionTypeList?: Maybe<Array<BuddyInteractionTypes>>;
  interactionTypes?: Maybe<BuddyInteractionTypes>;
  interactions?: Maybe<BuddyInteractions>;
  isDeleted: Scalars['Boolean']['output'];
  lastModifiedDate?: Maybe<Scalars['DateTime']['output']>;
  owner?: Maybe<User>;
  ownerId: Scalars['Int']['output'];
  personality?: Maybe<Scalars['String']['output']>;
  tagList?: Maybe<Array<BuddyTags>>;
  tags?: Maybe<BuddyTags>;
  user?: Maybe<User>;
  userId: Scalars['Int']['output'];
};

export type AiBuddyFilterInput = {
  and?: InputMaybe<Array<AiBuddyFilterInput>>;
  createdDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  interactionFrequency?: InputMaybe<NullableOfBuddyInteractionFrequenciesOperationFilterInput>;
  interactionList?: InputMaybe<ListBuddyInteractionsOperationFilterInput>;
  interactionTypeList?: InputMaybe<ListBuddyInteractionTypesOperationFilterInput>;
  interactionTypes?: InputMaybe<NullableOfBuddyInteractionTypesOperationFilterInput>;
  interactions?: InputMaybe<NullableOfBuddyInteractionsOperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  lastModifiedDate?: InputMaybe<ComparableNullableOfDateTimeOperationFilterInput>;
  or?: InputMaybe<Array<AiBuddyFilterInput>>;
  owner?: InputMaybe<UserFilterInput>;
  ownerId?: InputMaybe<ComparableInt32OperationFilterInput>;
  personality?: InputMaybe<StringOperationFilterInput>;
  tagList?: InputMaybe<ListBuddyTagsOperationFilterInput>;
  tags?: InputMaybe<NullableOfBuddyTagsOperationFilterInput>;
  user?: InputMaybe<UserFilterInput>;
  userId?: InputMaybe<ComparableInt32OperationFilterInput>;
};

export type AiBuddySortInput = {
  createdDate?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  interactionFrequency?: InputMaybe<SortEnumType>;
  interactionTypes?: InputMaybe<SortEnumType>;
  interactions?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  lastModifiedDate?: InputMaybe<SortEnumType>;
  owner?: InputMaybe<UserSortInput>;
  ownerId?: InputMaybe<SortEnumType>;
  personality?: InputMaybe<SortEnumType>;
  tags?: InputMaybe<SortEnumType>;
  user?: InputMaybe<UserSortInput>;
  userId?: InputMaybe<SortEnumType>;
};

export type Activity = {
  __typename?: 'Activity';
  activityType: ActivityType;
  createdDate: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  isDeleted: Scalars['Boolean']['output'];
  lastModifiedDate?: Maybe<Scalars['DateTime']['output']>;
  targetComment?: Maybe<Comment>;
  targetCommentId?: Maybe<Scalars['Int']['output']>;
  targetPost?: Maybe<Post>;
  targetPostId?: Maybe<Scalars['Int']['output']>;
  targetTopicPost?: Maybe<TopicPost>;
  targetTopicPostComment?: Maybe<TopicPostComment>;
  targetTopicPostCommentId?: Maybe<Scalars['Int']['output']>;
  targetTopicPostId?: Maybe<Scalars['Int']['output']>;
  targetUser?: Maybe<User>;
  targetUserId?: Maybe<Scalars['Int']['output']>;
  user?: Maybe<User>;
  userId: Scalars['Int']['output'];
};

export type ActivityCollectionSegment = {
  __typename?: 'ActivityCollectionSegment';
  items?: Maybe<Array<Maybe<Activity>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type ActivityFilterInput = {
  activityType?: InputMaybe<ActivityTypeOperationFilterInput>;
  and?: InputMaybe<Array<ActivityFilterInput>>;
  createdDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  lastModifiedDate?: InputMaybe<ComparableNullableOfDateTimeOperationFilterInput>;
  or?: InputMaybe<Array<ActivityFilterInput>>;
  targetComment?: InputMaybe<CommentFilterInput>;
  targetCommentId?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  targetPost?: InputMaybe<PostFilterInput>;
  targetPostId?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  targetTopicPost?: InputMaybe<TopicPostFilterInput>;
  targetTopicPostComment?: InputMaybe<TopicPostCommentFilterInput>;
  targetTopicPostCommentId?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  targetTopicPostId?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  targetUser?: InputMaybe<UserFilterInput>;
  targetUserId?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  user?: InputMaybe<UserFilterInput>;
  userId?: InputMaybe<ComparableInt32OperationFilterInput>;
};

export type ActivityInput = {
  activityType: ActivityType;
  id?: InputMaybe<Scalars['Int']['input']>;
  targetCommentId?: InputMaybe<Scalars['Int']['input']>;
  targetPostId?: InputMaybe<Scalars['Int']['input']>;
  targetUserId?: InputMaybe<Scalars['Int']['input']>;
  userId: Scalars['Int']['input'];
};

export type ActivitySortInput = {
  activityType?: InputMaybe<SortEnumType>;
  createdDate?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  lastModifiedDate?: InputMaybe<SortEnumType>;
  targetComment?: InputMaybe<CommentSortInput>;
  targetCommentId?: InputMaybe<SortEnumType>;
  targetPost?: InputMaybe<PostSortInput>;
  targetPostId?: InputMaybe<SortEnumType>;
  targetTopicPost?: InputMaybe<TopicPostSortInput>;
  targetTopicPostComment?: InputMaybe<TopicPostCommentSortInput>;
  targetTopicPostCommentId?: InputMaybe<SortEnumType>;
  targetTopicPostId?: InputMaybe<SortEnumType>;
  targetUser?: InputMaybe<UserSortInput>;
  targetUserId?: InputMaybe<SortEnumType>;
  user?: InputMaybe<UserSortInput>;
  userId?: InputMaybe<SortEnumType>;
};

export enum ActivityType {
  Block = 'BLOCK',
  Comment = 'COMMENT',
  DisLikeComment = 'DIS_LIKE_COMMENT',
  Follow = 'FOLLOW',
  Like = 'LIKE',
  LikeComment = 'LIKE_COMMENT',
  Report = 'REPORT',
  Save = 'SAVE',
  Share = 'SHARE',
  SharePost = 'SHARE_POST',
  ShareTopicPost = 'SHARE_TOPIC_POST',
  TopicPostComment = 'TOPIC_POST_COMMENT',
  TopicPostDeleteComment = 'TOPIC_POST_DELETE_COMMENT',
  TopicPostLike = 'TOPIC_POST_LIKE',
  TopicPostUnLike = 'TOPIC_POST_UN_LIKE',
  UnBlock = 'UN_BLOCK',
  UnFollow = 'UN_FOLLOW',
  UnLike = 'UN_LIKE',
  UnSave = 'UN_SAVE',
}

export type ActivityTypeOperationFilterInput = {
  eq?: InputMaybe<ActivityType>;
  in?: InputMaybe<Array<ActivityType>>;
  neq?: InputMaybe<ActivityType>;
  nin?: InputMaybe<Array<ActivityType>>;
};

export enum ApplyPolicy {
  AfterResolver = 'AFTER_RESOLVER',
  BeforeResolver = 'BEFORE_RESOLVER',
}

export type BaseCollection = {
  __typename?: 'BaseCollection';
  collections?: Maybe<Array<Maybe<Collection>>>;
  createdDate: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  isDeleted: Scalars['Boolean']['output'];
  lastModifiedDate?: Maybe<Scalars['DateTime']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
  userId: Scalars['Int']['output'];
};

export type BaseCollectionCollectionSegment = {
  __typename?: 'BaseCollectionCollectionSegment';
  items?: Maybe<Array<Maybe<BaseCollection>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type BaseCollectionFilterInput = {
  and?: InputMaybe<Array<BaseCollectionFilterInput>>;
  collections?: InputMaybe<ListFilterInputTypeOfCollectionFilterInput>;
  createdDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  lastModifiedDate?: InputMaybe<ComparableNullableOfDateTimeOperationFilterInput>;
  or?: InputMaybe<Array<BaseCollectionFilterInput>>;
  title?: InputMaybe<StringOperationFilterInput>;
  user?: InputMaybe<UserFilterInput>;
  userId?: InputMaybe<ComparableInt32OperationFilterInput>;
};

export type BaseCollectionInput = {
  id?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['Int']['input']>;
};

export type BaseCollectionSortInput = {
  createdDate?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  lastModifiedDate?: InputMaybe<SortEnumType>;
  title?: InputMaybe<SortEnumType>;
  user?: InputMaybe<UserSortInput>;
  userId?: InputMaybe<SortEnumType>;
};

export type Block = {
  __typename?: 'Block';
  blockedUser?: Maybe<User>;
  blockedUserId: Scalars['Int']['output'];
  blockerUser?: Maybe<User>;
  blockerUserId: Scalars['Int']['output'];
  createdDate: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  isDeleted: Scalars['Boolean']['output'];
  lastModifiedDate?: Maybe<Scalars['DateTime']['output']>;
};

export type BlockCollectionSegment = {
  __typename?: 'BlockCollectionSegment';
  items?: Maybe<Array<Maybe<Block>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type BlockFilterInput = {
  and?: InputMaybe<Array<BlockFilterInput>>;
  blockedUser?: InputMaybe<UserFilterInput>;
  blockedUserId?: InputMaybe<ComparableInt32OperationFilterInput>;
  blockerUser?: InputMaybe<UserFilterInput>;
  blockerUserId?: InputMaybe<ComparableInt32OperationFilterInput>;
  createdDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  lastModifiedDate?: InputMaybe<ComparableNullableOfDateTimeOperationFilterInput>;
  or?: InputMaybe<Array<BlockFilterInput>>;
};

export type BlockInput = {
  blockedUserId: Scalars['Int']['input'];
  blockerUserId: Scalars['Int']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
};

export type BlockSortInput = {
  blockedUser?: InputMaybe<UserSortInput>;
  blockedUserId?: InputMaybe<SortEnumType>;
  blockerUser?: InputMaybe<UserSortInput>;
  blockerUserId?: InputMaybe<SortEnumType>;
  createdDate?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  lastModifiedDate?: InputMaybe<SortEnumType>;
};

export type BooleanOperationFilterInput = {
  eq?: InputMaybe<Scalars['Boolean']['input']>;
  neq?: InputMaybe<Scalars['Boolean']['input']>;
};

export type BuddyDto = {
  __typename?: 'BuddyDto';
  id: Scalars['Int']['output'];
  interactionFrequency?: Maybe<BuddyInteractionFrequencies>;
  interactionTypes?: Maybe<Array<BuddyInteractionTypes>>;
  interactions?: Maybe<Array<BuddyInteractions>>;
  owner?: Maybe<UserDto>;
  personality?: Maybe<Scalars['String']['output']>;
  tags?: Maybe<Array<BuddyTags>>;
  user?: Maybe<UserDto>;
};

export type BuddyDtoCollectionSegment = {
  __typename?: 'BuddyDtoCollectionSegment';
  items?: Maybe<Array<Maybe<BuddyDto>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type BuddyDtoFilterInput = {
  and?: InputMaybe<Array<BuddyDtoFilterInput>>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  interactionFrequency?: InputMaybe<NullableOfBuddyInteractionFrequenciesOperationFilterInput>;
  interactionTypes?: InputMaybe<ListBuddyInteractionTypesOperationFilterInput>;
  interactions?: InputMaybe<ListBuddyInteractionsOperationFilterInput>;
  or?: InputMaybe<Array<BuddyDtoFilterInput>>;
  owner?: InputMaybe<UserDtoFilterInput>;
  personality?: InputMaybe<StringOperationFilterInput>;
  tags?: InputMaybe<ListBuddyTagsOperationFilterInput>;
  user?: InputMaybe<UserDtoFilterInput>;
};

export type BuddyDtoSortInput = {
  id?: InputMaybe<SortEnumType>;
  interactionFrequency?: InputMaybe<SortEnumType>;
  owner?: InputMaybe<UserDtoSortInput>;
  personality?: InputMaybe<SortEnumType>;
  user?: InputMaybe<UserDtoSortInput>;
};

export enum BuddyInteractionFrequencies {
  OnceADay = 'ONCE_A_DAY',
  Random = 'RANDOM',
}

export enum BuddyInteractionTypes {
  Photo = 'PHOTO',
  Text = 'TEXT',
  Voice = 'VOICE',
}

export type BuddyInteractionTypesOperationFilterInput = {
  eq?: InputMaybe<BuddyInteractionTypes>;
  in?: InputMaybe<Array<BuddyInteractionTypes>>;
  neq?: InputMaybe<BuddyInteractionTypes>;
  nin?: InputMaybe<Array<BuddyInteractionTypes>>;
};

export enum BuddyInteractions {
  GenerateComments = 'GENERATE_COMMENTS',
  SendMessages = 'SEND_MESSAGES',
}

export type BuddyInteractionsOperationFilterInput = {
  eq?: InputMaybe<BuddyInteractions>;
  in?: InputMaybe<Array<BuddyInteractions>>;
  neq?: InputMaybe<BuddyInteractions>;
  nin?: InputMaybe<Array<BuddyInteractions>>;
};

export enum BuddyTags {
  Funny = 'FUNNY',
  Gentle = 'GENTLE',
  Honest = 'HONEST',
  Mysterious = 'MYSTERIOUS',
  Patient = 'PATIENT',
  Reliable = 'RELIABLE',
  Witty = 'WITTY',
}

export type BuddyTagsOperationFilterInput = {
  eq?: InputMaybe<BuddyTags>;
  in?: InputMaybe<Array<BuddyTags>>;
  neq?: InputMaybe<BuddyTags>;
  nin?: InputMaybe<Array<BuddyTags>>;
};

export type Category = {
  __typename?: 'Category';
  commentCount?: Maybe<Scalars['Int']['output']>;
  createdDate: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  isActive: Scalars['Boolean']['output'];
  isDeleted: Scalars['Boolean']['output'];
  lastModifiedDate?: Maybe<Scalars['DateTime']['output']>;
  likeCount?: Maybe<Scalars['Int']['output']>;
  postCategories?: Maybe<Array<Maybe<PostCategory>>>;
  postCount?: Maybe<Scalars['Int']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  userCategories?: Maybe<Array<Maybe<UserCategory>>>;
};

export type CategoryCollectionSegment = {
  __typename?: 'CategoryCollectionSegment';
  items?: Maybe<Array<Maybe<Category>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type CategoryFilterInput = {
  and?: InputMaybe<Array<CategoryFilterInput>>;
  commentCount?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  createdDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  isActive?: InputMaybe<BooleanOperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  lastModifiedDate?: InputMaybe<ComparableNullableOfDateTimeOperationFilterInput>;
  likeCount?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  or?: InputMaybe<Array<CategoryFilterInput>>;
  postCategories?: InputMaybe<ListFilterInputTypeOfPostCategoryFilterInput>;
  postCount?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  title?: InputMaybe<StringOperationFilterInput>;
  userCategories?: InputMaybe<ListFilterInputTypeOfUserCategoryFilterInput>;
};

export type CategoryInput = {
  commentCount?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  isActive: Scalars['Boolean']['input'];
  likeCount?: InputMaybe<Scalars['Int']['input']>;
  postCount?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type CategorySortInput = {
  commentCount?: InputMaybe<SortEnumType>;
  createdDate?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isActive?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  lastModifiedDate?: InputMaybe<SortEnumType>;
  likeCount?: InputMaybe<SortEnumType>;
  postCount?: InputMaybe<SortEnumType>;
  title?: InputMaybe<SortEnumType>;
};

export type Collection = {
  __typename?: 'Collection';
  baseCollection?: Maybe<BaseCollection>;
  baseCollectionId: Scalars['Int']['output'];
  createdDate: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  isDeleted: Scalars['Boolean']['output'];
  lastModifiedDate?: Maybe<Scalars['DateTime']['output']>;
  post?: Maybe<Post>;
  postId: Scalars['Int']['output'];
};

export type CollectionCollectionSegment = {
  __typename?: 'CollectionCollectionSegment';
  items?: Maybe<Array<Maybe<Collection>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type CollectionFilterInput = {
  and?: InputMaybe<Array<CollectionFilterInput>>;
  baseCollection?: InputMaybe<BaseCollectionFilterInput>;
  baseCollectionId?: InputMaybe<ComparableInt32OperationFilterInput>;
  createdDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  lastModifiedDate?: InputMaybe<ComparableNullableOfDateTimeOperationFilterInput>;
  or?: InputMaybe<Array<CollectionFilterInput>>;
  post?: InputMaybe<PostFilterInput>;
  postId?: InputMaybe<ComparableInt32OperationFilterInput>;
};

export type CollectionInput = {
  baseCollectionId: Scalars['Int']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  postId: Scalars['Int']['input'];
};

/** Information about the offset pagination. */
export type CollectionSegmentInfo = {
  __typename?: 'CollectionSegmentInfo';
  /** Indicates whether more items exist following the set defined by the clients arguments. */
  hasNextPage: Scalars['Boolean']['output'];
  /** Indicates whether more items exist prior the set defined by the clients arguments. */
  hasPreviousPage: Scalars['Boolean']['output'];
};

export type CollectionSortInput = {
  baseCollection?: InputMaybe<BaseCollectionSortInput>;
  baseCollectionId?: InputMaybe<SortEnumType>;
  createdDate?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  lastModifiedDate?: InputMaybe<SortEnumType>;
  post?: InputMaybe<PostSortInput>;
  postId?: InputMaybe<SortEnumType>;
};

export type Comment = {
  __typename?: 'Comment';
  childComments?: Maybe<Array<Maybe<Comment>>>;
  commentLikes?: Maybe<Array<Maybe<CommentLike>>>;
  commentText?: Maybe<Scalars['String']['output']>;
  createdDate: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  isDeleted: Scalars['Boolean']['output'];
  lastModifiedDate?: Maybe<Scalars['DateTime']['output']>;
  likeCount: Scalars['Int']['output'];
  parent?: Maybe<Comment>;
  parentId?: Maybe<Scalars['Int']['output']>;
  post?: Maybe<Post>;
  postId: Scalars['Int']['output'];
  user?: Maybe<User>;
  userId: Scalars['Int']['output'];
};

export type CommentCollectionSegment = {
  __typename?: 'CommentCollectionSegment';
  items?: Maybe<Array<Maybe<Comment>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type CommentDto = {
  __typename?: 'CommentDto';
  commentLikes?: Maybe<Array<Maybe<CommentLike>>>;
  commentText?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  isLiked: Scalars['Boolean']['output'];
  likeCount: Scalars['Int']['output'];
  parentId?: Maybe<Scalars['Int']['output']>;
  post?: Maybe<Post>;
  postId: Scalars['Int']['output'];
  replyCount: Scalars['Int']['output'];
  user?: Maybe<User>;
  userId: Scalars['Int']['output'];
};

export type CommentDtoCollectionSegment = {
  __typename?: 'CommentDtoCollectionSegment';
  items?: Maybe<Array<Maybe<CommentDto>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type CommentDtoFilterInput = {
  and?: InputMaybe<Array<CommentDtoFilterInput>>;
  commentLikes?: InputMaybe<ListFilterInputTypeOfCommentLikeFilterInput>;
  commentText?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  isLiked?: InputMaybe<BooleanOperationFilterInput>;
  likeCount?: InputMaybe<ComparableInt32OperationFilterInput>;
  or?: InputMaybe<Array<CommentDtoFilterInput>>;
  parentId?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  post?: InputMaybe<PostFilterInput>;
  postId?: InputMaybe<ComparableInt32OperationFilterInput>;
  replyCount?: InputMaybe<ComparableInt32OperationFilterInput>;
  user?: InputMaybe<UserFilterInput>;
  userId?: InputMaybe<ComparableInt32OperationFilterInput>;
};

export type CommentDtoSortInput = {
  commentText?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isLiked?: InputMaybe<SortEnumType>;
  likeCount?: InputMaybe<SortEnumType>;
  parentId?: InputMaybe<SortEnumType>;
  post?: InputMaybe<PostSortInput>;
  postId?: InputMaybe<SortEnumType>;
  replyCount?: InputMaybe<SortEnumType>;
  user?: InputMaybe<UserSortInput>;
  userId?: InputMaybe<SortEnumType>;
};

export type CommentFilterInput = {
  and?: InputMaybe<Array<CommentFilterInput>>;
  childComments?: InputMaybe<ListFilterInputTypeOfCommentFilterInput>;
  commentLikes?: InputMaybe<ListFilterInputTypeOfCommentLikeFilterInput>;
  commentText?: InputMaybe<StringOperationFilterInput>;
  createdDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  lastModifiedDate?: InputMaybe<ComparableNullableOfDateTimeOperationFilterInput>;
  likeCount?: InputMaybe<ComparableInt32OperationFilterInput>;
  or?: InputMaybe<Array<CommentFilterInput>>;
  parent?: InputMaybe<CommentFilterInput>;
  parentId?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  post?: InputMaybe<PostFilterInput>;
  postId?: InputMaybe<ComparableInt32OperationFilterInput>;
  user?: InputMaybe<UserFilterInput>;
  userId?: InputMaybe<ComparableInt32OperationFilterInput>;
};

export type CommentInput = {
  commentText?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  likeCount: Scalars['Int']['input'];
  parentId?: InputMaybe<Scalars['Int']['input']>;
  postId: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
};

export type CommentLike = {
  __typename?: 'CommentLike';
  comment?: Maybe<Comment>;
  commentId: Scalars['Int']['output'];
  createdDate: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  isDeleted: Scalars['Boolean']['output'];
  lastModifiedDate?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<User>;
  userId: Scalars['Int']['output'];
};

export type CommentLikeCollectionSegment = {
  __typename?: 'CommentLikeCollectionSegment';
  items?: Maybe<Array<Maybe<CommentLike>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type CommentLikeFilterInput = {
  and?: InputMaybe<Array<CommentLikeFilterInput>>;
  comment?: InputMaybe<CommentFilterInput>;
  commentId?: InputMaybe<ComparableInt32OperationFilterInput>;
  createdDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  lastModifiedDate?: InputMaybe<ComparableNullableOfDateTimeOperationFilterInput>;
  or?: InputMaybe<Array<CommentLikeFilterInput>>;
  user?: InputMaybe<UserFilterInput>;
  userId?: InputMaybe<ComparableInt32OperationFilterInput>;
};

export type CommentLikeInput = {
  commentId: Scalars['Int']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  userId: Scalars['Int']['input'];
};

export type CommentLikeSortInput = {
  comment?: InputMaybe<CommentSortInput>;
  commentId?: InputMaybe<SortEnumType>;
  createdDate?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  lastModifiedDate?: InputMaybe<SortEnumType>;
  user?: InputMaybe<UserSortInput>;
  userId?: InputMaybe<SortEnumType>;
};

export type CommentSortInput = {
  commentText?: InputMaybe<SortEnumType>;
  createdDate?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  lastModifiedDate?: InputMaybe<SortEnumType>;
  likeCount?: InputMaybe<SortEnumType>;
  parent?: InputMaybe<CommentSortInput>;
  parentId?: InputMaybe<SortEnumType>;
  post?: InputMaybe<PostSortInput>;
  postId?: InputMaybe<SortEnumType>;
  user?: InputMaybe<UserSortInput>;
  userId?: InputMaybe<SortEnumType>;
};

export type ComparableDateTimeOperationFilterInput = {
  eq?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  neq?: InputMaybe<Scalars['DateTime']['input']>;
  ngt?: InputMaybe<Scalars['DateTime']['input']>;
  ngte?: InputMaybe<Scalars['DateTime']['input']>;
  nin?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  nlt?: InputMaybe<Scalars['DateTime']['input']>;
  nlte?: InputMaybe<Scalars['DateTime']['input']>;
};

export type ComparableDoubleOperationFilterInput = {
  eq?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  in?: InputMaybe<Array<Scalars['Float']['input']>>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  neq?: InputMaybe<Scalars['Float']['input']>;
  ngt?: InputMaybe<Scalars['Float']['input']>;
  ngte?: InputMaybe<Scalars['Float']['input']>;
  nin?: InputMaybe<Array<Scalars['Float']['input']>>;
  nlt?: InputMaybe<Scalars['Float']['input']>;
  nlte?: InputMaybe<Scalars['Float']['input']>;
};

export type ComparableInt32OperationFilterInput = {
  eq?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  neq?: InputMaybe<Scalars['Int']['input']>;
  ngt?: InputMaybe<Scalars['Int']['input']>;
  ngte?: InputMaybe<Scalars['Int']['input']>;
  nin?: InputMaybe<Array<Scalars['Int']['input']>>;
  nlt?: InputMaybe<Scalars['Int']['input']>;
  nlte?: InputMaybe<Scalars['Int']['input']>;
};

export type ComparableNullableOfDateTimeOperationFilterInput = {
  eq?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  neq?: InputMaybe<Scalars['DateTime']['input']>;
  ngt?: InputMaybe<Scalars['DateTime']['input']>;
  ngte?: InputMaybe<Scalars['DateTime']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  nlt?: InputMaybe<Scalars['DateTime']['input']>;
  nlte?: InputMaybe<Scalars['DateTime']['input']>;
};

export type ComparableNullableOfInt32OperationFilterInput = {
  eq?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  neq?: InputMaybe<Scalars['Int']['input']>;
  ngt?: InputMaybe<Scalars['Int']['input']>;
  ngte?: InputMaybe<Scalars['Int']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  nlt?: InputMaybe<Scalars['Int']['input']>;
  nlte?: InputMaybe<Scalars['Int']['input']>;
};

export type ComparableSingleOperationFilterInput = {
  eq?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  in?: InputMaybe<Array<Scalars['Float']['input']>>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  neq?: InputMaybe<Scalars['Float']['input']>;
  ngt?: InputMaybe<Scalars['Float']['input']>;
  ngte?: InputMaybe<Scalars['Float']['input']>;
  nin?: InputMaybe<Array<Scalars['Float']['input']>>;
  nlt?: InputMaybe<Scalars['Float']['input']>;
  nlte?: InputMaybe<Scalars['Float']['input']>;
};

export type Conversation = {
  __typename?: 'Conversation';
  createdDate: Scalars['DateTime']['output'];
  firstUnreadCount: Scalars['Int']['output'];
  firstUser?: Maybe<User>;
  firstUserDeleteAccountDate: Scalars['DateTime']['output'];
  firstUserId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  isDeleted: Scalars['Boolean']['output'];
  isFirstUserDeletedAccount: Scalars['Boolean']['output'];
  isSecondUserDeletedAccount: Scalars['Boolean']['output'];
  lastModifiedDate?: Maybe<Scalars['DateTime']['output']>;
  latestMessageDate: Scalars['DateTime']['output'];
  messages?: Maybe<Array<Maybe<Message>>>;
  secondUnreadCount: Scalars['Int']['output'];
  secondUser?: Maybe<User>;
  secondUserDeleteAccountDate: Scalars['DateTime']['output'];
  secondUserId: Scalars['Int']['output'];
  subject?: Maybe<Scalars['String']['output']>;
};

export type ConversationFilterInput = {
  and?: InputMaybe<Array<ConversationFilterInput>>;
  createdDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  firstUnreadCount?: InputMaybe<ComparableInt32OperationFilterInput>;
  firstUser?: InputMaybe<UserFilterInput>;
  firstUserDeleteAccountDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  firstUserId?: InputMaybe<ComparableInt32OperationFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  isFirstUserDeletedAccount?: InputMaybe<BooleanOperationFilterInput>;
  isSecondUserDeletedAccount?: InputMaybe<BooleanOperationFilterInput>;
  lastModifiedDate?: InputMaybe<ComparableNullableOfDateTimeOperationFilterInput>;
  latestMessageDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  messages?: InputMaybe<ListFilterInputTypeOfMessageFilterInput>;
  or?: InputMaybe<Array<ConversationFilterInput>>;
  secondUnreadCount?: InputMaybe<ComparableInt32OperationFilterInput>;
  secondUser?: InputMaybe<UserFilterInput>;
  secondUserDeleteAccountDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  secondUserId?: InputMaybe<ComparableInt32OperationFilterInput>;
  subject?: InputMaybe<StringOperationFilterInput>;
};

export type ConversationInput = {
  __typename?: 'ConversationInput';
  conversationId: Scalars['Int']['output'];
  lastMessageText?: Maybe<Scalars['String']['output']>;
  latestMessageDate: Scalars['DateTime']['output'];
  subject?: Maybe<Scalars['String']['output']>;
  unreadCount: Scalars['Int']['output'];
  user?: Maybe<User>;
  userEmail?: Maybe<Scalars['String']['output']>;
  userFullName?: Maybe<Scalars['String']['output']>;
  userId: Scalars['Int']['output'];
};

export type ConversationInputCollectionSegment = {
  __typename?: 'ConversationInputCollectionSegment';
  items?: Maybe<Array<Maybe<ConversationInput>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type ConversationInputFilterInput = {
  and?: InputMaybe<Array<ConversationInputFilterInput>>;
  conversationId?: InputMaybe<ComparableInt32OperationFilterInput>;
  lastMessageText?: InputMaybe<StringOperationFilterInput>;
  latestMessageDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  or?: InputMaybe<Array<ConversationInputFilterInput>>;
  subject?: InputMaybe<StringOperationFilterInput>;
  unreadCount?: InputMaybe<ComparableInt32OperationFilterInput>;
  user?: InputMaybe<UserFilterInput>;
  userEmail?: InputMaybe<StringOperationFilterInput>;
  userFullName?: InputMaybe<StringOperationFilterInput>;
  userId?: InputMaybe<ComparableInt32OperationFilterInput>;
};

export type ConversationInputSortInput = {
  conversationId?: InputMaybe<SortEnumType>;
  lastMessageText?: InputMaybe<SortEnumType>;
  latestMessageDate?: InputMaybe<SortEnumType>;
  subject?: InputMaybe<SortEnumType>;
  unreadCount?: InputMaybe<SortEnumType>;
  user?: InputMaybe<UserSortInput>;
  userEmail?: InputMaybe<SortEnumType>;
  userFullName?: InputMaybe<SortEnumType>;
  userId?: InputMaybe<SortEnumType>;
};

export type ConversationSortInput = {
  createdDate?: InputMaybe<SortEnumType>;
  firstUnreadCount?: InputMaybe<SortEnumType>;
  firstUser?: InputMaybe<UserSortInput>;
  firstUserDeleteAccountDate?: InputMaybe<SortEnumType>;
  firstUserId?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  isFirstUserDeletedAccount?: InputMaybe<SortEnumType>;
  isSecondUserDeletedAccount?: InputMaybe<SortEnumType>;
  lastModifiedDate?: InputMaybe<SortEnumType>;
  latestMessageDate?: InputMaybe<SortEnumType>;
  secondUnreadCount?: InputMaybe<SortEnumType>;
  secondUser?: InputMaybe<UserSortInput>;
  secondUserDeleteAccountDate?: InputMaybe<SortEnumType>;
  secondUserId?: InputMaybe<SortEnumType>;
  subject?: InputMaybe<SortEnumType>;
};

export type CoordinateFilterInput = {
  and?: InputMaybe<Array<CoordinateFilterInput>>;
  coordinateValue?: InputMaybe<CoordinateFilterInput>;
  m?: InputMaybe<ComparableDoubleOperationFilterInput>;
  or?: InputMaybe<Array<CoordinateFilterInput>>;
  x?: InputMaybe<ComparableDoubleOperationFilterInput>;
  y?: InputMaybe<ComparableDoubleOperationFilterInput>;
  z?: InputMaybe<ComparableDoubleOperationFilterInput>;
};

export type CoordinateSortInput = {
  coordinateValue?: InputMaybe<CoordinateSortInput>;
  m?: InputMaybe<SortEnumType>;
  x?: InputMaybe<SortEnumType>;
  y?: InputMaybe<SortEnumType>;
  z?: InputMaybe<SortEnumType>;
};

export enum Dimension {
  Collapse = 'COLLAPSE',
  Curve = 'CURVE',
  Dontcare = 'DONTCARE',
  P = 'P',
  Surface = 'SURFACE',
  True = 'TRUE',
  Unknown = 'UNKNOWN',
}

export type DimensionOperationFilterInput = {
  eq?: InputMaybe<Dimension>;
  in?: InputMaybe<Array<Dimension>>;
  neq?: InputMaybe<Dimension>;
  nin?: InputMaybe<Array<Dimension>>;
};

export enum FileType {
  Image = 'IMAGE',
  NotSet = 'NOT_SET',
  Video = 'VIDEO',
}

export type FileTypeOperationFilterInput = {
  eq?: InputMaybe<FileType>;
  in?: InputMaybe<Array<FileType>>;
  neq?: InputMaybe<FileType>;
  nin?: InputMaybe<Array<FileType>>;
};

export type Follow = {
  __typename?: 'Follow';
  createdDate: Scalars['DateTime']['output'];
  follower?: Maybe<User>;
  followerId: Scalars['Int']['output'];
  following?: Maybe<User>;
  followingId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  isDeleted: Scalars['Boolean']['output'];
  lastModifiedDate?: Maybe<Scalars['DateTime']['output']>;
};

export type FollowCollectionSegment = {
  __typename?: 'FollowCollectionSegment';
  items?: Maybe<Array<Maybe<Follow>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type FollowFilterInput = {
  and?: InputMaybe<Array<FollowFilterInput>>;
  createdDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  follower?: InputMaybe<UserFilterInput>;
  followerId?: InputMaybe<ComparableInt32OperationFilterInput>;
  following?: InputMaybe<UserFilterInput>;
  followingId?: InputMaybe<ComparableInt32OperationFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  lastModifiedDate?: InputMaybe<ComparableNullableOfDateTimeOperationFilterInput>;
  or?: InputMaybe<Array<FollowFilterInput>>;
};

export type FollowInput = {
  followerId: Scalars['Int']['input'];
  followingId: Scalars['Int']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
};

export type FollowSortInput = {
  createdDate?: InputMaybe<SortEnumType>;
  follower?: InputMaybe<UserSortInput>;
  followerId?: InputMaybe<SortEnumType>;
  following?: InputMaybe<UserSortInput>;
  followingId?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  lastModifiedDate?: InputMaybe<SortEnumType>;
};

export type FollowerDto = {
  __typename?: 'FollowerDto';
  followerId: Scalars['Int']['output'];
  followerPhotoUrl?: Maybe<Scalars['String']['output']>;
  followerUserName?: Maybe<Scalars['String']['output']>;
  followingId: Scalars['Int']['output'];
  followingPhotoUrl?: Maybe<Scalars['String']['output']>;
  followingUserName?: Maybe<Scalars['String']['output']>;
  isFollowed: Scalars['Boolean']['output'];
};

export type FollowerDtoCollectionSegment = {
  __typename?: 'FollowerDtoCollectionSegment';
  items?: Maybe<Array<Maybe<FollowerDto>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type FollowerDtoFilterInput = {
  and?: InputMaybe<Array<FollowerDtoFilterInput>>;
  followerId?: InputMaybe<ComparableInt32OperationFilterInput>;
  followerPhotoUrl?: InputMaybe<StringOperationFilterInput>;
  followerUserName?: InputMaybe<StringOperationFilterInput>;
  followingId?: InputMaybe<ComparableInt32OperationFilterInput>;
  followingPhotoUrl?: InputMaybe<StringOperationFilterInput>;
  followingUserName?: InputMaybe<StringOperationFilterInput>;
  isFollowed?: InputMaybe<BooleanOperationFilterInput>;
  or?: InputMaybe<Array<FollowerDtoFilterInput>>;
};

export type FollowerDtoSortInput = {
  followerId?: InputMaybe<SortEnumType>;
  followerPhotoUrl?: InputMaybe<SortEnumType>;
  followerUserName?: InputMaybe<SortEnumType>;
  followingId?: InputMaybe<SortEnumType>;
  followingPhotoUrl?: InputMaybe<SortEnumType>;
  followingUserName?: InputMaybe<SortEnumType>;
  isFollowed?: InputMaybe<SortEnumType>;
};

export type ForwardPostInput = {
  conversationId?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  postId?: InputMaybe<Scalars['Int']['input']>;
  receiverId?: InputMaybe<Scalars['Int']['input']>;
  senderId?: InputMaybe<Scalars['Int']['input']>;
  text?: InputMaybe<Scalars['String']['input']>;
};

export type ForwardTopicPostInput = {
  conversationId?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  receiverId?: InputMaybe<Scalars['Int']['input']>;
  senderId?: InputMaybe<Scalars['Int']['input']>;
  text?: InputMaybe<Scalars['String']['input']>;
  topicPostId?: InputMaybe<Scalars['Int']['input']>;
};

export enum GeoJsonGeometryType {
  GeometryCollection = 'GeometryCollection',
  LineString = 'LineString',
  MultiLineString = 'MultiLineString',
  MultiPoint = 'MultiPoint',
  MultiPolygon = 'MultiPolygon',
  Point = 'Point',
  Polygon = 'Polygon',
}

export type GeoJsonInterface = {
  /** The minimum bounding box around the geometry object */
  bbox?: Maybe<Array<Maybe<Scalars['Float']['output']>>>;
  /** The coordinate reference system integer identifier */
  crs?: Maybe<Scalars['Int']['output']>;
  /** The geometry type of the GeoJson object */
  type: GeoJsonGeometryType;
};

export type GeoJsonLineStringInput = {
  /** The "coordinates" field is an array of two or more positions. */
  coordinates?: InputMaybe<Array<InputMaybe<Scalars['Position']['input']>>>;
  /** The coordinate reference system integer identifier */
  crs?: InputMaybe<Scalars['Int']['input']>;
  /** The geometry type of the GeoJson object */
  type?: InputMaybe<GeoJsonGeometryType>;
};

export type GeoJsonLineStringType = GeoJsonInterface & {
  __typename?: 'GeoJSONLineStringType';
  /** The minimum bounding box around the geometry object */
  bbox: Array<Scalars['Float']['output']>;
  /** The "coordinates" field is an array of two or more positions. */
  coordinates?: Maybe<Array<Maybe<Scalars['Position']['output']>>>;
  /** The coordinate reference system integer identifier */
  crs: Scalars['Int']['output'];
  /** The geometry type of the GeoJson object */
  type: GeoJsonGeometryType;
};

export type GeoJsonMultiLineStringInput = {
  /** The "coordinates" field is an array of LineString coordinate arrays. */
  coordinates?: InputMaybe<
    Array<InputMaybe<Array<InputMaybe<Scalars['Position']['input']>>>>
  >;
  /** The coordinate reference system integer identifier */
  crs?: InputMaybe<Scalars['Int']['input']>;
  /** The geometry type of the GeoJson object */
  type?: InputMaybe<GeoJsonGeometryType>;
};

export type GeoJsonMultiLineStringType = GeoJsonInterface & {
  __typename?: 'GeoJSONMultiLineStringType';
  /** The minimum bounding box around the geometry object */
  bbox: Array<Scalars['Float']['output']>;
  /** The "coordinates" field is an array of LineString coordinate arrays. */
  coordinates?: Maybe<Array<Maybe<Scalars['Position']['output']>>>;
  /** The coordinate reference system integer identifier */
  crs: Scalars['Int']['output'];
  /** The geometry type of the GeoJson object */
  type: GeoJsonGeometryType;
};

export type GeoJsonMultiPointInput = {
  /** The "coordinates" field is an array of positions. */
  coordinates?: InputMaybe<Array<InputMaybe<Scalars['Position']['input']>>>;
  /** The coordinate reference system integer identifier */
  crs?: InputMaybe<Scalars['Int']['input']>;
  /** The geometry type of the GeoJson object */
  type?: InputMaybe<GeoJsonGeometryType>;
};

export type GeoJsonMultiPointType = GeoJsonInterface & {
  __typename?: 'GeoJSONMultiPointType';
  /** The minimum bounding box around the geometry object */
  bbox: Array<Scalars['Float']['output']>;
  /** The "coordinates" field is an array of positions. */
  coordinates?: Maybe<Array<Maybe<Scalars['Position']['output']>>>;
  /** The coordinate reference system integer identifier */
  crs: Scalars['Int']['output'];
  /** The geometry type of the GeoJson object */
  type: GeoJsonGeometryType;
};

export type GeoJsonMultiPolygonInput = {
  /** The "coordinates" field is an array of Polygon coordinate arrays. */
  coordinates?: InputMaybe<Scalars['Coordinates']['input']>;
  /** The coordinate reference system integer identifier */
  crs?: InputMaybe<Scalars['Int']['input']>;
  /** The geometry type of the GeoJson object */
  type?: InputMaybe<GeoJsonGeometryType>;
};

export type GeoJsonMultiPolygonType = GeoJsonInterface & {
  __typename?: 'GeoJSONMultiPolygonType';
  /** The minimum bounding box around the geometry object */
  bbox: Array<Scalars['Float']['output']>;
  /** The "coordinates" field is an array of Polygon coordinate arrays. */
  coordinates?: Maybe<Scalars['Coordinates']['output']>;
  /** The coordinate reference system integer identifier */
  crs: Scalars['Int']['output'];
  /** The geometry type of the GeoJson object */
  type: GeoJsonGeometryType;
};

export type GeoJsonPointInput = {
  /** The "coordinates" field is a single position. */
  coordinates?: InputMaybe<Scalars['Position']['input']>;
  /** The coordinate reference system integer identifier */
  crs?: InputMaybe<Scalars['Int']['input']>;
  /** The geometry type of the GeoJson object */
  type?: InputMaybe<GeoJsonGeometryType>;
};

export type GeoJsonPointType = GeoJsonInterface & {
  __typename?: 'GeoJSONPointType';
  /** The minimum bounding box around the geometry object */
  bbox: Array<Scalars['Float']['output']>;
  /** The "coordinates" field is a single position. */
  coordinates?: Maybe<Scalars['Position']['output']>;
  /** The coordinate reference system integer identifier */
  crs: Scalars['Int']['output'];
  /** The geometry type of the GeoJson object */
  type: GeoJsonGeometryType;
};

export type GeoJsonPolygonInput = {
  /** The "coordinates" field MUST be an array of linear ring coordinate arrays. For Polygons with more than one of these rings, the first MUST be the exterior ring, and any others MUST be interior rings. The exterior ring bounds the surface, and the interior rings (if present) bound holes within the surface. */
  coordinates?: InputMaybe<
    Array<InputMaybe<Array<InputMaybe<Scalars['Position']['input']>>>>
  >;
  /** The coordinate reference system integer identifier */
  crs?: InputMaybe<Scalars['Int']['input']>;
  /** The geometry type of the GeoJson object */
  type?: InputMaybe<GeoJsonGeometryType>;
};

export type GeoJsonPolygonType = GeoJsonInterface & {
  __typename?: 'GeoJSONPolygonType';
  /** The minimum bounding box around the geometry object */
  bbox: Array<Scalars['Float']['output']>;
  /** The "coordinates" field MUST be an array of linear ring coordinate arrays. For Polygons with more than one of these rings, the first MUST be the exterior ring, and any others MUST be interior rings. The exterior ring bounds the surface, and the interior rings (if present) bound holes within the surface. */
  coordinates?: Maybe<
    Array<Maybe<Array<Maybe<Scalars['Position']['output']>>>>
  >;
  /** The coordinate reference system integer identifier */
  crs: Scalars['Int']['output'];
  /** The geometry type of the GeoJson object */
  type: GeoJsonGeometryType;
};

export type GeometryContainsOperationFilterInput = {
  buffer?: InputMaybe<Scalars['Float']['input']>;
  geometry: Scalars['Geometry']['input'];
};

export type GeometryDistanceOperationFilterInput = {
  buffer?: InputMaybe<Scalars['Float']['input']>;
  eq?: InputMaybe<Scalars['Float']['input']>;
  geometry: Scalars['Geometry']['input'];
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  in?: InputMaybe<Array<Scalars['Float']['input']>>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  neq?: InputMaybe<Scalars['Float']['input']>;
  ngt?: InputMaybe<Scalars['Float']['input']>;
  ngte?: InputMaybe<Scalars['Float']['input']>;
  nin?: InputMaybe<Array<Scalars['Float']['input']>>;
  nlt?: InputMaybe<Scalars['Float']['input']>;
  nlte?: InputMaybe<Scalars['Float']['input']>;
};

export type GeometryFilterInput = {
  and?: InputMaybe<Array<GeometryFilterInput>>;
  area?: InputMaybe<ComparableDoubleOperationFilterInput>;
  boundary?: InputMaybe<GeometryFilterInput>;
  centroid?: InputMaybe<PointFilterInput>;
  contains?: InputMaybe<GeometryContainsOperationFilterInput>;
  dimension?: InputMaybe<DimensionOperationFilterInput>;
  distance?: InputMaybe<GeometryDistanceOperationFilterInput>;
  envelope?: InputMaybe<GeometryFilterInput>;
  geometryType?: InputMaybe<StringOperationFilterInput>;
  interiorPoint?: InputMaybe<PointFilterInput>;
  intersects?: InputMaybe<GeometryIntersectsOperationFilterInput>;
  isSimple?: InputMaybe<BooleanOperationFilterInput>;
  isValid?: InputMaybe<BooleanOperationFilterInput>;
  length?: InputMaybe<ComparableDoubleOperationFilterInput>;
  ncontains?: InputMaybe<GeometryContainsOperationFilterInput>;
  nintersects?: InputMaybe<GeometryIntersectsOperationFilterInput>;
  noverlaps?: InputMaybe<GeometryOverlapsOperationFilterInput>;
  ntouches?: InputMaybe<GeometryTouchesOperationFilterInput>;
  numPoints?: InputMaybe<ComparableInt32OperationFilterInput>;
  nwithin?: InputMaybe<GeometryWithinOperationFilterInput>;
  ogcGeometryType?: InputMaybe<OgcGeometryTypeOperationFilterInput>;
  or?: InputMaybe<Array<GeometryFilterInput>>;
  overlaps?: InputMaybe<GeometryOverlapsOperationFilterInput>;
  pointOnSurface?: InputMaybe<PointFilterInput>;
  srid?: InputMaybe<ComparableInt32OperationFilterInput>;
  touches?: InputMaybe<GeometryTouchesOperationFilterInput>;
  within?: InputMaybe<GeometryWithinOperationFilterInput>;
};

export type GeometryIntersectsOperationFilterInput = {
  buffer?: InputMaybe<Scalars['Float']['input']>;
  geometry: Scalars['Geometry']['input'];
};

export type GeometryOverlapsOperationFilterInput = {
  buffer?: InputMaybe<Scalars['Float']['input']>;
  geometry: Scalars['Geometry']['input'];
};

export type GeometryTouchesOperationFilterInput = {
  buffer?: InputMaybe<Scalars['Float']['input']>;
  geometry: Scalars['Geometry']['input'];
};

export type GeometryWithinOperationFilterInput = {
  buffer?: InputMaybe<Scalars['Float']['input']>;
  geometry: Scalars['Geometry']['input'];
};

export type Hashtag = {
  __typename?: 'Hashtag';
  createdDate: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  isDeleted: Scalars['Boolean']['output'];
  lastModifiedDate?: Maybe<Scalars['DateTime']['output']>;
  postHashtags?: Maybe<Array<Maybe<PostHashtag>>>;
  title?: Maybe<Scalars['String']['output']>;
  topicPostHashtags?: Maybe<Array<Maybe<TopicPostHashtag>>>;
};

export type HashtagCollectionSegment = {
  __typename?: 'HashtagCollectionSegment';
  items?: Maybe<Array<Maybe<Hashtag>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type HashtagFilterInput = {
  and?: InputMaybe<Array<HashtagFilterInput>>;
  createdDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  lastModifiedDate?: InputMaybe<ComparableNullableOfDateTimeOperationFilterInput>;
  or?: InputMaybe<Array<HashtagFilterInput>>;
  postHashtags?: InputMaybe<ListFilterInputTypeOfPostHashtagFilterInput>;
  title?: InputMaybe<StringOperationFilterInput>;
  topicPostHashtags?: InputMaybe<ListFilterInputTypeOfTopicPostHashtagFilterInput>;
};

export type HashtagSortInput = {
  createdDate?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  lastModifiedDate?: InputMaybe<SortEnumType>;
  title?: InputMaybe<SortEnumType>;
};

export type InsertBuddyInput = {
  fullName?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  personality?: InputMaybe<Scalars['String']['input']>;
  photoUrl?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<Array<BuddyTags>>;
};

export type ListBuddyInteractionTypesOperationFilterInput = {
  all?: InputMaybe<BuddyInteractionTypesOperationFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<BuddyInteractionTypesOperationFilterInput>;
  some?: InputMaybe<BuddyInteractionTypesOperationFilterInput>;
};

export type ListBuddyInteractionsOperationFilterInput = {
  all?: InputMaybe<BuddyInteractionsOperationFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<BuddyInteractionsOperationFilterInput>;
  some?: InputMaybe<BuddyInteractionsOperationFilterInput>;
};

export type ListBuddyTagsOperationFilterInput = {
  all?: InputMaybe<BuddyTagsOperationFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<BuddyTagsOperationFilterInput>;
  some?: InputMaybe<BuddyTagsOperationFilterInput>;
};

export type ListFilterInputTypeOfAiBuddyFilterInput = {
  all?: InputMaybe<AiBuddyFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<AiBuddyFilterInput>;
  some?: InputMaybe<AiBuddyFilterInput>;
};

export type ListFilterInputTypeOfActivityFilterInput = {
  all?: InputMaybe<ActivityFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<ActivityFilterInput>;
  some?: InputMaybe<ActivityFilterInput>;
};

export type ListFilterInputTypeOfBaseCollectionFilterInput = {
  all?: InputMaybe<BaseCollectionFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<BaseCollectionFilterInput>;
  some?: InputMaybe<BaseCollectionFilterInput>;
};

export type ListFilterInputTypeOfCollectionFilterInput = {
  all?: InputMaybe<CollectionFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<CollectionFilterInput>;
  some?: InputMaybe<CollectionFilterInput>;
};

export type ListFilterInputTypeOfCommentFilterInput = {
  all?: InputMaybe<CommentFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<CommentFilterInput>;
  some?: InputMaybe<CommentFilterInput>;
};

export type ListFilterInputTypeOfCommentLikeFilterInput = {
  all?: InputMaybe<CommentLikeFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<CommentLikeFilterInput>;
  some?: InputMaybe<CommentLikeFilterInput>;
};

export type ListFilterInputTypeOfFollowFilterInput = {
  all?: InputMaybe<FollowFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<FollowFilterInput>;
  some?: InputMaybe<FollowFilterInput>;
};

export type ListFilterInputTypeOfLotusTransactionsFilterInput = {
  all?: InputMaybe<LotusTransactionsFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<LotusTransactionsFilterInput>;
  some?: InputMaybe<LotusTransactionsFilterInput>;
};

export type ListFilterInputTypeOfMessageFilterInput = {
  all?: InputMaybe<MessageFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<MessageFilterInput>;
  some?: InputMaybe<MessageFilterInput>;
};

export type ListFilterInputTypeOfPostCategoryFilterInput = {
  all?: InputMaybe<PostCategoryFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<PostCategoryFilterInput>;
  some?: InputMaybe<PostCategoryFilterInput>;
};

export type ListFilterInputTypeOfPostFilterInput = {
  all?: InputMaybe<PostFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<PostFilterInput>;
  some?: InputMaybe<PostFilterInput>;
};

export type ListFilterInputTypeOfPostHashtagFilterInput = {
  all?: InputMaybe<PostHashtagFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<PostHashtagFilterInput>;
  some?: InputMaybe<PostHashtagFilterInput>;
};

export type ListFilterInputTypeOfPostLikeFilterInput = {
  all?: InputMaybe<PostLikeFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<PostLikeFilterInput>;
  some?: InputMaybe<PostLikeFilterInput>;
};

export type ListFilterInputTypeOfPostViewFilterInput = {
  all?: InputMaybe<PostViewFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<PostViewFilterInput>;
  some?: InputMaybe<PostViewFilterInput>;
};

export type ListFilterInputTypeOfReportCommentFilterInput = {
  all?: InputMaybe<ReportCommentFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<ReportCommentFilterInput>;
  some?: InputMaybe<ReportCommentFilterInput>;
};

export type ListFilterInputTypeOfReportPostFilterInput = {
  all?: InputMaybe<ReportPostFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<ReportPostFilterInput>;
  some?: InputMaybe<ReportPostFilterInput>;
};

export type ListFilterInputTypeOfReportTopicPostFilterInput = {
  all?: InputMaybe<ReportTopicPostFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<ReportTopicPostFilterInput>;
  some?: InputMaybe<ReportTopicPostFilterInput>;
};

export type ListFilterInputTypeOfTopicPostCommentFilterInput = {
  all?: InputMaybe<TopicPostCommentFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<TopicPostCommentFilterInput>;
  some?: InputMaybe<TopicPostCommentFilterInput>;
};

export type ListFilterInputTypeOfTopicPostCommentLikeFilterInput = {
  all?: InputMaybe<TopicPostCommentLikeFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<TopicPostCommentLikeFilterInput>;
  some?: InputMaybe<TopicPostCommentLikeFilterInput>;
};

export type ListFilterInputTypeOfTopicPostFilterInput = {
  all?: InputMaybe<TopicPostFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<TopicPostFilterInput>;
  some?: InputMaybe<TopicPostFilterInput>;
};

export type ListFilterInputTypeOfTopicPostHashtagFilterInput = {
  all?: InputMaybe<TopicPostHashtagFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<TopicPostHashtagFilterInput>;
  some?: InputMaybe<TopicPostHashtagFilterInput>;
};

export type ListFilterInputTypeOfTopicPostLikeFilterInput = {
  all?: InputMaybe<TopicPostLikeFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<TopicPostLikeFilterInput>;
  some?: InputMaybe<TopicPostLikeFilterInput>;
};

export type ListFilterInputTypeOfTopicUserFilterInput = {
  all?: InputMaybe<TopicUserFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<TopicUserFilterInput>;
  some?: InputMaybe<TopicUserFilterInput>;
};

export type ListFilterInputTypeOfUserCategoryFilterInput = {
  all?: InputMaybe<UserCategoryFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<UserCategoryFilterInput>;
  some?: InputMaybe<UserCategoryFilterInput>;
};

export type ListResponseBaseOfActivity = {
  __typename?: 'ListResponseBaseOfActivity';
  result?: Maybe<ActivityCollectionSegment>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ListResponseBaseOfActivityResultArgs = {
  order?: InputMaybe<Array<ActivitySortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ActivityFilterInput>;
};

export type ListResponseBaseOfBaseCollection = {
  __typename?: 'ListResponseBaseOfBaseCollection';
  result?: Maybe<BaseCollectionCollectionSegment>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ListResponseBaseOfBaseCollectionResultArgs = {
  order?: InputMaybe<Array<BaseCollectionSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<BaseCollectionFilterInput>;
};

export type ListResponseBaseOfBlock = {
  __typename?: 'ListResponseBaseOfBlock';
  result?: Maybe<BlockCollectionSegment>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ListResponseBaseOfBlockResultArgs = {
  order?: InputMaybe<Array<BlockSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<BlockFilterInput>;
};

export type ListResponseBaseOfBuddyDto = {
  __typename?: 'ListResponseBaseOfBuddyDto';
  result?: Maybe<BuddyDtoCollectionSegment>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ListResponseBaseOfBuddyDtoResultArgs = {
  order?: InputMaybe<Array<BuddyDtoSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<BuddyDtoFilterInput>;
};

export type ListResponseBaseOfCategory = {
  __typename?: 'ListResponseBaseOfCategory';
  result?: Maybe<CategoryCollectionSegment>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ListResponseBaseOfCategoryResultArgs = {
  order?: InputMaybe<Array<CategorySortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<CategoryFilterInput>;
};

export type ListResponseBaseOfCollection = {
  __typename?: 'ListResponseBaseOfCollection';
  result?: Maybe<CollectionCollectionSegment>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ListResponseBaseOfCollectionResultArgs = {
  order?: InputMaybe<Array<CollectionSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<CollectionFilterInput>;
};

export type ListResponseBaseOfComment = {
  __typename?: 'ListResponseBaseOfComment';
  result?: Maybe<CommentCollectionSegment>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ListResponseBaseOfCommentResultArgs = {
  order?: InputMaybe<Array<CommentSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<CommentFilterInput>;
};

export type ListResponseBaseOfCommentDto = {
  __typename?: 'ListResponseBaseOfCommentDto';
  result?: Maybe<CommentDtoCollectionSegment>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ListResponseBaseOfCommentDtoResultArgs = {
  order?: InputMaybe<Array<CommentDtoSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<CommentDtoFilterInput>;
};

export type ListResponseBaseOfCommentLike = {
  __typename?: 'ListResponseBaseOfCommentLike';
  result?: Maybe<CommentLikeCollectionSegment>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ListResponseBaseOfCommentLikeResultArgs = {
  order?: InputMaybe<Array<CommentLikeSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<CommentLikeFilterInput>;
};

export type ListResponseBaseOfConversationInput = {
  __typename?: 'ListResponseBaseOfConversationInput';
  result?: Maybe<ConversationInputCollectionSegment>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ListResponseBaseOfConversationInputResultArgs = {
  order?: InputMaybe<Array<ConversationInputSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ConversationInputFilterInput>;
};

export type ListResponseBaseOfFollow = {
  __typename?: 'ListResponseBaseOfFollow';
  result?: Maybe<FollowCollectionSegment>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ListResponseBaseOfFollowResultArgs = {
  order?: InputMaybe<Array<FollowSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<FollowFilterInput>;
};

export type ListResponseBaseOfFollowerDto = {
  __typename?: 'ListResponseBaseOfFollowerDto';
  result?: Maybe<FollowerDtoCollectionSegment>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ListResponseBaseOfFollowerDtoResultArgs = {
  order?: InputMaybe<Array<FollowerDtoSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<FollowerDtoFilterInput>;
};

export type ListResponseBaseOfHashtag = {
  __typename?: 'ListResponseBaseOfHashtag';
  result?: Maybe<HashtagCollectionSegment>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ListResponseBaseOfHashtagResultArgs = {
  order?: InputMaybe<Array<HashtagSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<HashtagFilterInput>;
};

export type ListResponseBaseOfMessage = {
  __typename?: 'ListResponseBaseOfMessage';
  result?: Maybe<MessageCollectionSegment>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ListResponseBaseOfMessageResultArgs = {
  order?: InputMaybe<Array<MessageSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<MessageFilterInput>;
};

export type ListResponseBaseOfMonthlyReportDto = {
  __typename?: 'ListResponseBaseOfMonthlyReportDto';
  result?: Maybe<MonthlyReportDtoCollectionSegment>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ListResponseBaseOfMonthlyReportDtoResultArgs = {
  order?: InputMaybe<Array<MonthlyReportDtoSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<MonthlyReportDtoFilterInput>;
};

export type ListResponseBaseOfNotification = {
  __typename?: 'ListResponseBaseOfNotification';
  result?: Maybe<NotificationCollectionSegment>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ListResponseBaseOfNotificationResultArgs = {
  order?: InputMaybe<Array<NotificationSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<NotificationFilterInput>;
};

export type ListResponseBaseOfPost = {
  __typename?: 'ListResponseBaseOfPost';
  result?: Maybe<PostCollectionSegment>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ListResponseBaseOfPostResultArgs = {
  order?: InputMaybe<Array<PostSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<PostFilterInput>;
};

export type ListResponseBaseOfPostCategory = {
  __typename?: 'ListResponseBaseOfPostCategory';
  result?: Maybe<PostCategoryCollectionSegment>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ListResponseBaseOfPostCategoryResultArgs = {
  order?: InputMaybe<Array<PostCategorySortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<PostCategoryFilterInput>;
};

export type ListResponseBaseOfPostLike = {
  __typename?: 'ListResponseBaseOfPostLike';
  result?: Maybe<PostLikeCollectionSegment>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ListResponseBaseOfPostLikeResultArgs = {
  order?: InputMaybe<Array<PostLikeSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<PostLikeFilterInput>;
};

export type ListResponseBaseOfPostSave = {
  __typename?: 'ListResponseBaseOfPostSave';
  result?: Maybe<PostSaveCollectionSegment>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ListResponseBaseOfPostSaveResultArgs = {
  order?: InputMaybe<Array<PostSaveSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<PostSaveFilterInput>;
};

export type ListResponseBaseOfPostView = {
  __typename?: 'ListResponseBaseOfPostView';
  result?: Maybe<PostViewCollectionSegment>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ListResponseBaseOfPostViewResultArgs = {
  order?: InputMaybe<Array<PostViewSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<PostViewFilterInput>;
};

export type ListResponseBaseOfPostsByCategoryAndFileTypeDto = {
  __typename?: 'ListResponseBaseOfPostsByCategoryAndFileTypeDto';
  result?: Maybe<PostsByCategoryAndFileTypeDtoCollectionSegment>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ListResponseBaseOfPostsByCategoryAndFileTypeDtoResultArgs = {
  order?: InputMaybe<Array<PostsByCategoryAndFileTypeDtoSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<PostsByCategoryAndFileTypeDtoFilterInput>;
};

export type ListResponseBaseOfReportComment = {
  __typename?: 'ListResponseBaseOfReportComment';
  result?: Maybe<ReportCommentCollectionSegment>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ListResponseBaseOfReportCommentResultArgs = {
  order?: InputMaybe<Array<ReportCommentSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ReportCommentFilterInput>;
};

export type ListResponseBaseOfReportPost = {
  __typename?: 'ListResponseBaseOfReportPost';
  result?: Maybe<ReportPostCollectionSegment>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ListResponseBaseOfReportPostResultArgs = {
  order?: InputMaybe<Array<ReportPostSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ReportPostFilterInput>;
};

export type ListResponseBaseOfReportTopicPost = {
  __typename?: 'ListResponseBaseOfReportTopicPost';
  result?: Maybe<ReportTopicPostCollectionSegment>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ListResponseBaseOfReportTopicPostResultArgs = {
  order?: InputMaybe<Array<ReportTopicPostSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ReportTopicPostFilterInput>;
};

export type ListResponseBaseOfReportTopicPostComment = {
  __typename?: 'ListResponseBaseOfReportTopicPostComment';
  result?: Maybe<ReportTopicPostCommentCollectionSegment>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ListResponseBaseOfReportTopicPostCommentResultArgs = {
  order?: InputMaybe<Array<ReportTopicPostCommentSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ReportTopicPostCommentFilterInput>;
};

export type ListResponseBaseOfReportUser = {
  __typename?: 'ListResponseBaseOfReportUser';
  result?: Maybe<ReportUserCollectionSegment>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ListResponseBaseOfReportUserResultArgs = {
  order?: InputMaybe<Array<ReportUserSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ReportUserFilterInput>;
};

export type ListResponseBaseOfTopic = {
  __typename?: 'ListResponseBaseOfTopic';
  result?: Maybe<TopicCollectionSegment>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ListResponseBaseOfTopicResultArgs = {
  order?: InputMaybe<Array<TopicSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<TopicFilterInput>;
};

export type ListResponseBaseOfTopicPost = {
  __typename?: 'ListResponseBaseOfTopicPost';
  result?: Maybe<TopicPostCollectionSegment>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ListResponseBaseOfTopicPostResultArgs = {
  order?: InputMaybe<Array<TopicPostSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<TopicPostFilterInput>;
};

export type ListResponseBaseOfTopicPostComment = {
  __typename?: 'ListResponseBaseOfTopicPostComment';
  result?: Maybe<TopicPostCommentCollectionSegment>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ListResponseBaseOfTopicPostCommentResultArgs = {
  order?: InputMaybe<Array<TopicPostCommentSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<TopicPostCommentFilterInput>;
};

export type ListResponseBaseOfTopicPostCommentDto = {
  __typename?: 'ListResponseBaseOfTopicPostCommentDto';
  result?: Maybe<TopicPostCommentDtoCollectionSegment>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ListResponseBaseOfTopicPostCommentDtoResultArgs = {
  order?: InputMaybe<Array<TopicPostCommentDtoSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<TopicPostCommentDtoFilterInput>;
};

export type ListResponseBaseOfTopicPostCommentLike = {
  __typename?: 'ListResponseBaseOfTopicPostCommentLike';
  result?: Maybe<TopicPostCommentLikeCollectionSegment>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ListResponseBaseOfTopicPostCommentLikeResultArgs = {
  order?: InputMaybe<Array<TopicPostCommentLikeSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<TopicPostCommentLikeFilterInput>;
};

export type ListResponseBaseOfTopicPostLike = {
  __typename?: 'ListResponseBaseOfTopicPostLike';
  result?: Maybe<TopicPostLikeCollectionSegment>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ListResponseBaseOfTopicPostLikeResultArgs = {
  order?: InputMaybe<Array<TopicPostLikeSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<TopicPostLikeFilterInput>;
};

export type ListResponseBaseOfTopicReportDto = {
  __typename?: 'ListResponseBaseOfTopicReportDto';
  result?: Maybe<TopicReportDtoCollectionSegment>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ListResponseBaseOfTopicReportDtoResultArgs = {
  order?: InputMaybe<Array<TopicReportDtoSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<TopicReportDtoFilterInput>;
};

export type ListResponseBaseOfTopicUser = {
  __typename?: 'ListResponseBaseOfTopicUser';
  result?: Maybe<TopicUserCollectionSegment>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ListResponseBaseOfTopicUserResultArgs = {
  order?: InputMaybe<Array<TopicUserSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<TopicUserFilterInput>;
};

export type ListResponseBaseOfUser = {
  __typename?: 'ListResponseBaseOfUser';
  result?: Maybe<UserCollectionSegment>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ListResponseBaseOfUserResultArgs = {
  order?: InputMaybe<Array<UserSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<UserFilterInput>;
};

export type ListResponseBaseOfUserCategory = {
  __typename?: 'ListResponseBaseOfUserCategory';
  result?: Maybe<UserCategoryCollectionSegment>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ListResponseBaseOfUserCategoryResultArgs = {
  order?: InputMaybe<Array<UserCategorySortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<UserCategoryFilterInput>;
};

export type ListResponseBaseOfUserDistanceDto = {
  __typename?: 'ListResponseBaseOfUserDistanceDto';
  result?: Maybe<UserDistanceDtoCollectionSegment>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ListResponseBaseOfUserDistanceDtoResultArgs = {
  order?: InputMaybe<Array<UserDistanceDtoSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<UserDistanceDtoFilterInput>;
};

export type ListResponseBaseOfUsersActivitiesByCountDto = {
  __typename?: 'ListResponseBaseOfUsersActivitiesByCountDto';
  result?: Maybe<UsersActivitiesByCountDtoCollectionSegment>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ListResponseBaseOfUsersActivitiesByCountDtoResultArgs = {
  order?: InputMaybe<Array<UsersActivitiesByCountDtoSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<UsersActivitiesByCountDtoFilterInput>;
};

export type ListResponseBaseOfYearlyReportDto = {
  __typename?: 'ListResponseBaseOfYearlyReportDto';
  result?: Maybe<YearlyReportDtoCollectionSegment>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ListResponseBaseOfYearlyReportDtoResultArgs = {
  order?: InputMaybe<Array<YearlyReportDtoSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<YearlyReportDtoFilterInput>;
};

export enum LotusTransactionModes {
  Decrease = 'DECREASE',
  Increase = 'INCREASE',
}

export type LotusTransactionModesOperationFilterInput = {
  eq?: InputMaybe<LotusTransactionModes>;
  in?: InputMaybe<Array<LotusTransactionModes>>;
  neq?: InputMaybe<LotusTransactionModes>;
  nin?: InputMaybe<Array<LotusTransactionModes>>;
};

export enum LotusTransactionTypes {
  Bonus = 'BONUS',
  CreateBuddy = 'CREATE_BUDDY',
  UserInvite = 'USER_INVITE',
}

export type LotusTransactionTypesOperationFilterInput = {
  eq?: InputMaybe<LotusTransactionTypes>;
  in?: InputMaybe<Array<LotusTransactionTypes>>;
  neq?: InputMaybe<LotusTransactionTypes>;
  nin?: InputMaybe<Array<LotusTransactionTypes>>;
};

export type LotusTransactions = {
  __typename?: 'LotusTransactions';
  amount: Scalars['Float']['output'];
  createdDate: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  isDeleted: Scalars['Boolean']['output'];
  lastModifiedDate?: Maybe<Scalars['DateTime']['output']>;
  transactionMode: LotusTransactionModes;
  transactionType: LotusTransactionTypes;
  user?: Maybe<User>;
  userId: Scalars['Int']['output'];
};

export type LotusTransactionsFilterInput = {
  amount?: InputMaybe<ComparableSingleOperationFilterInput>;
  and?: InputMaybe<Array<LotusTransactionsFilterInput>>;
  createdDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  lastModifiedDate?: InputMaybe<ComparableNullableOfDateTimeOperationFilterInput>;
  or?: InputMaybe<Array<LotusTransactionsFilterInput>>;
  transactionMode?: InputMaybe<LotusTransactionModesOperationFilterInput>;
  transactionType?: InputMaybe<LotusTransactionTypesOperationFilterInput>;
  user?: InputMaybe<UserFilterInput>;
  userId?: InputMaybe<ComparableInt32OperationFilterInput>;
};

export type Message = {
  __typename?: 'Message';
  conversation?: Maybe<Conversation>;
  conversationId: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  createdDate: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  isDeleted: Scalars['Boolean']['output'];
  lastModifiedDate?: Maybe<Scalars['DateTime']['output']>;
  messageType: MessageType;
  photoUrl?: Maybe<Scalars['String']['output']>;
  post?: Maybe<Post>;
  postId?: Maybe<Scalars['Int']['output']>;
  sender?: Maybe<User>;
  senderId: Scalars['Int']['output'];
  text?: Maybe<Scalars['String']['output']>;
  topicPost?: Maybe<TopicPost>;
  topicPostId?: Maybe<Scalars['Int']['output']>;
};

export type MessageCollectionSegment = {
  __typename?: 'MessageCollectionSegment';
  items?: Maybe<Array<Maybe<Message>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type MessageFilterInput = {
  and?: InputMaybe<Array<MessageFilterInput>>;
  conversation?: InputMaybe<ConversationFilterInput>;
  conversationId?: InputMaybe<ComparableInt32OperationFilterInput>;
  createdAt?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  createdDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  lastModifiedDate?: InputMaybe<ComparableNullableOfDateTimeOperationFilterInput>;
  messageType?: InputMaybe<MessageTypeOperationFilterInput>;
  or?: InputMaybe<Array<MessageFilterInput>>;
  photoUrl?: InputMaybe<StringOperationFilterInput>;
  post?: InputMaybe<PostFilterInput>;
  postId?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  sender?: InputMaybe<UserFilterInput>;
  senderId?: InputMaybe<ComparableInt32OperationFilterInput>;
  text?: InputMaybe<StringOperationFilterInput>;
  topicPost?: InputMaybe<TopicPostFilterInput>;
  topicPostId?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
};

export type MessageInput = {
  conversationId?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  messageType: MessageType;
  photoUrl?: InputMaybe<Scalars['String']['input']>;
  postId?: InputMaybe<Scalars['Int']['input']>;
  receiverId?: InputMaybe<Scalars['Int']['input']>;
  subject?: InputMaybe<Scalars['String']['input']>;
  text?: InputMaybe<Scalars['String']['input']>;
  topicPostId?: InputMaybe<Scalars['Int']['input']>;
};

export type MessageSortInput = {
  conversation?: InputMaybe<ConversationSortInput>;
  conversationId?: InputMaybe<SortEnumType>;
  createdAt?: InputMaybe<SortEnumType>;
  createdDate?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  lastModifiedDate?: InputMaybe<SortEnumType>;
  messageType?: InputMaybe<SortEnumType>;
  photoUrl?: InputMaybe<SortEnumType>;
  post?: InputMaybe<PostSortInput>;
  postId?: InputMaybe<SortEnumType>;
  sender?: InputMaybe<UserSortInput>;
  senderId?: InputMaybe<SortEnumType>;
  text?: InputMaybe<SortEnumType>;
  topicPost?: InputMaybe<TopicPostSortInput>;
  topicPostId?: InputMaybe<SortEnumType>;
};

export enum MessageType {
  File = 'FILE',
  ForwardedMessage = 'FORWARDED_MESSAGE',
  Photo = 'PHOTO',
  Text = 'TEXT',
  Video = 'VIDEO',
  Voice = 'VOICE',
}

export type MessageTypeOperationFilterInput = {
  eq?: InputMaybe<MessageType>;
  in?: InputMaybe<Array<MessageType>>;
  neq?: InputMaybe<MessageType>;
  nin?: InputMaybe<Array<MessageType>>;
};

export type MonthlyReportDto = {
  __typename?: 'MonthlyReportDto';
  count: Scalars['Int']['output'];
  month: Scalars['Int']['output'];
  year: Scalars['Int']['output'];
};

export type MonthlyReportDtoCollectionSegment = {
  __typename?: 'MonthlyReportDtoCollectionSegment';
  items?: Maybe<Array<Maybe<MonthlyReportDto>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type MonthlyReportDtoFilterInput = {
  and?: InputMaybe<Array<MonthlyReportDtoFilterInput>>;
  count?: InputMaybe<ComparableInt32OperationFilterInput>;
  month?: InputMaybe<ComparableInt32OperationFilterInput>;
  or?: InputMaybe<Array<MonthlyReportDtoFilterInput>>;
  year?: InputMaybe<ComparableInt32OperationFilterInput>;
};

export type MonthlyReportDtoSortInput = {
  count?: InputMaybe<SortEnumType>;
  month?: InputMaybe<SortEnumType>;
  year?: InputMaybe<SortEnumType>;
};

export type Mutation = {
  __typename?: 'Mutation';
  TopicPostLike_deleteTopicPostLike?: Maybe<ResponseStatus>;
  activit_createActivit?: Maybe<ResponseBaseOfActivity>;
  activit_deleteActivit?: Maybe<ResponseStatus>;
  activit_updateActivit?: Maybe<ResponseBaseOfActivity>;
  baseCollectio_createBaseCollectio?: Maybe<ResponseBaseOfBaseCollection>;
  baseCollectio_deleteBaseCollectio?: Maybe<ResponseStatus>;
  baseCollectio_updateBaseCollectio?: Maybe<ResponseBaseOfBaseCollection>;
  baseCollection_createBaseCollection?: Maybe<ResponseBaseOfBaseCollection>;
  baseCollection_deleteBaseCollection?: Maybe<ResponseStatus>;
  baseCollection_updateBaseCollection?: Maybe<ResponseBaseOfBaseCollection>;
  bloc_createBloc?: Maybe<ResponseBaseOfBlock>;
  bloc_deleteBloc?: Maybe<ResponseStatus>;
  bloc_updateBloc?: Maybe<ResponseBaseOfBlock>;
  block_createBlock?: Maybe<ResponseBaseOfBlock>;
  block_deleteBlock?: Maybe<ResponseStatus>;
  block_updateBlock?: Maybe<ResponseBaseOfBlock>;
  buddy_createBuddy?: Maybe<ResponseBaseOfBuddyDto>;
  buddy_updateBuddy?: Maybe<ResponseBaseOfBuddyDto>;
  categor_createCategor?: Maybe<ResponseBaseOfCategory>;
  categor_deleteCategor?: Maybe<ResponseStatus>;
  categor_updateCategor?: Maybe<ResponseBaseOfCategory>;
  category_createCategory?: Maybe<ResponseBaseOfCategory>;
  category_deleteCategory?: Maybe<ResponseStatus>;
  category_updateCategory?: Maybe<ResponseBaseOfCategory>;
  collectio_createCollectio?: Maybe<ResponseBaseOfCollection>;
  collectio_deleteCollectio?: Maybe<ResponseStatus>;
  collectio_updateCollectio?: Maybe<ResponseBaseOfCollection>;
  collection_createCollection?: Maybe<ResponseBaseOfCollection>;
  collection_deleteFromCollection?: Maybe<ResponseStatus>;
  collection_updateCollection?: Maybe<ResponseBaseOfCollection>;
  commen_createCommen?: Maybe<ResponseBaseOfComment>;
  commen_deleteCommen?: Maybe<ResponseStatus>;
  commen_updateCommen?: Maybe<ResponseBaseOfComment>;
  commentLik_createCommentLik?: Maybe<ResponseBaseOfCommentLike>;
  commentLik_deleteCommentLik?: Maybe<ResponseStatus>;
  commentLik_updateCommentLik?: Maybe<ResponseBaseOfCommentLike>;
  commentLike_createCommentLike?: Maybe<ResponseBaseOfCommentLike>;
  commentLike_deleteCommentLike?: Maybe<ResponseStatus>;
  comment_createComment?: Maybe<ResponseBaseOfComment>;
  comment_deleteComment?: Maybe<ResponseStatus>;
  comment_disLikeComment?: Maybe<ResponseBaseOfComment>;
  comment_likeComment?: Maybe<ResponseBaseOfComment>;
  comment_updateComment?: Maybe<ResponseBaseOfComment>;
  create?: Maybe<ResponseBaseOfPostSave>;
  delete?: Maybe<ResponseStatus>;
  follo_createFollo?: Maybe<ResponseBaseOfFollow>;
  follo_deleteFollo?: Maybe<ResponseStatus>;
  follo_updateFollo?: Maybe<ResponseBaseOfFollow>;
  follow_createFollow?: Maybe<ResponseBaseOfFollow>;
  follow_deleteFollow?: Maybe<ResponseStatus>;
  follow_deleteFollowByFollowingId?: Maybe<ResponseStatus>;
  message_createMessage?: Maybe<ResponseBaseOfMessage>;
  message_deleteMessage?: Maybe<ResponseBase>;
  message_forwardPostInConversation?: Maybe<ResponseBaseOfMessage>;
  message_forwardTopicPostInConversation?: Maybe<ResponseBaseOfMessage>;
  message_removeConversation?: Maybe<ResponseBase>;
  notification_readAllNotifications?: Maybe<ResponseBase>;
  notification_readNotification?: Maybe<ResponseBaseOfNotification>;
  pos_createPos?: Maybe<ResponseBaseOfPost>;
  pos_deletePos?: Maybe<ResponseStatus>;
  pos_updatePos?: Maybe<ResponseBaseOfPost>;
  postCategor_createPostCategor?: Maybe<ResponseBaseOfPostCategory>;
  postCategor_deletePostCategor?: Maybe<ResponseStatus>;
  postCategor_updatePostCategor?: Maybe<ResponseBaseOfPostCategory>;
  postCategory_createPostCategory?: Maybe<ResponseBaseOfPostCategory>;
  postCategory_deletePostCategory?: Maybe<ResponseStatus>;
  postCategory_updatePostCategory?: Maybe<ResponseBaseOfPostCategory>;
  postLik_createPostLik?: Maybe<ResponseBaseOfPostLike>;
  postLik_deletePostLik?: Maybe<ResponseStatus>;
  postLik_updatePostLik?: Maybe<ResponseBaseOfPostLike>;
  postLike_createPostLike?: Maybe<ResponseBaseOfPostLike>;
  postLike_deletePostLike?: Maybe<ResponseStatus>;
  postSav_createPostSav?: Maybe<ResponseBaseOfPostSave>;
  postSav_deletePostSav?: Maybe<ResponseStatus>;
  postSav_updatePostSav?: Maybe<ResponseBaseOfPostSave>;
  postSave_createPostSave?: Maybe<ResponseBaseOfPostSave>;
  postSave_deletePostSave?: Maybe<ResponseStatus>;
  postVie_createPostVie?: Maybe<ResponseBaseOfPostView>;
  postVie_deletePostVie?: Maybe<ResponseStatus>;
  postVie_updatePostVie?: Maybe<ResponseBaseOfPostView>;
  postView_createPostView?: Maybe<ResponseBaseOfPostView>;
  postView_deletePostView?: Maybe<ResponseStatus>;
  post_createPost?: Maybe<ResponseBaseOfPost>;
  post_deletePost?: Maybe<ResponseStatus>;
  post_setAsRecommended?: Maybe<ResponseBaseOfPost>;
  post_updatePost?: Maybe<ResponseBaseOfPost>;
  remove?: Maybe<ResponseStatus>;
  reportCommen_createReportCommen?: Maybe<ResponseBaseOfReportComment>;
  reportCommen_deleteReportCommen?: Maybe<ResponseStatus>;
  reportCommen_updateReportCommen?: Maybe<ResponseBaseOfReportComment>;
  reportComment_createReportComment?: Maybe<ResponseBaseOfReportComment>;
  reportComment_deleteReportComment?: Maybe<ResponseStatus>;
  reportComment_setAsReviewed?: Maybe<ResponseBaseOfReportComment>;
  reportComment_updateReportComment?: Maybe<ResponseBaseOfReportComment>;
  reportPos_createReportPos?: Maybe<ResponseBaseOfReportPost>;
  reportPos_deleteReportPos?: Maybe<ResponseStatus>;
  reportPos_updateReportPos?: Maybe<ResponseBaseOfReportPost>;
  reportPost_createReportPost?: Maybe<ResponseBaseOfReportPost>;
  reportPost_deleteReportPost?: Maybe<ResponseStatus>;
  reportPost_setAsReviewed?: Maybe<ResponseBaseOfReportPost>;
  reportPost_updateReportPost?: Maybe<ResponseBaseOfReportPost>;
  reportTopicPos_createReportTopicPos?: Maybe<ResponseBaseOfReportTopicPost>;
  reportTopicPos_deleteReportTopicPos?: Maybe<ResponseStatus>;
  reportTopicPos_updateReportTopicPos?: Maybe<ResponseBaseOfReportTopicPost>;
  reportTopicPostCommen_createReportTopicPostCommen?: Maybe<ResponseBaseOfReportTopicPostComment>;
  reportTopicPostCommen_deleteReportTopicPostCommen?: Maybe<ResponseStatus>;
  reportTopicPostCommen_updateReportTopicPostCommen?: Maybe<ResponseBaseOfReportTopicPostComment>;
  reportTopicPost_createReportTopicPost?: Maybe<ResponseBaseOfReportTopicPost>;
  reportTopicPost_deleteReportTopicPost?: Maybe<ResponseStatus>;
  reportTopicPost_setAsReviewed?: Maybe<ResponseBaseOfReportTopicPost>;
  reportTopicPost_updateReportTopicPost?: Maybe<ResponseBaseOfReportTopicPost>;
  reportUse_createReportUse?: Maybe<ResponseBaseOfReportUser>;
  reportUse_deleteReportUse?: Maybe<ResponseStatus>;
  reportUse_updateReportUse?: Maybe<ResponseBaseOfReportUser>;
  reportUser_createReportUser?: Maybe<ResponseBaseOfReportUser>;
  reportUser_deleteReportUser?: Maybe<ResponseStatus>;
  reportUser_setAsReviewed?: Maybe<ResponseBaseOfReportUser>;
  reportUser_updateReportUser?: Maybe<ResponseBaseOfReportUser>;
  topi_createTopi?: Maybe<ResponseBaseOfTopic>;
  topi_deleteTopi?: Maybe<ResponseStatus>;
  topi_updateTopi?: Maybe<ResponseBaseOfTopic>;
  topicPos_createTopicPos?: Maybe<ResponseBaseOfTopicPost>;
  topicPos_deleteTopicPos?: Maybe<ResponseStatus>;
  topicPos_updateTopicPos?: Maybe<ResponseBaseOfTopicPost>;
  topicPostCommen_createTopicPostCommen?: Maybe<ResponseBaseOfTopicPostComment>;
  topicPostCommen_deleteTopicPostCommen?: Maybe<ResponseStatus>;
  topicPostCommen_updateTopicPostCommen?: Maybe<ResponseBaseOfTopicPostComment>;
  topicPostCommentLik_createTopicPostCommentLik?: Maybe<ResponseBaseOfTopicPostCommentLike>;
  topicPostCommentLik_deleteTopicPostCommentLik?: Maybe<ResponseStatus>;
  topicPostCommentLik_updateTopicPostCommentLik?: Maybe<ResponseBaseOfTopicPostCommentLike>;
  topicPostCommentLike_createTopicPostCommentLike?: Maybe<ResponseBaseOfTopicPostCommentLike>;
  topicPostCommentLike_deleteTopicPostCommentLike?: Maybe<ResponseStatus>;
  topicPostComment_createTopicPostComment?: Maybe<ResponseBaseOfTopicPostComment>;
  topicPostComment_deleteTopicPostComment?: Maybe<ResponseStatus>;
  topicPostComment_updateTopicPostComment?: Maybe<ResponseBaseOfTopicPostComment>;
  topicPostLik_createTopicPostLik?: Maybe<ResponseBaseOfTopicPostLike>;
  topicPostLik_deleteTopicPostLik?: Maybe<ResponseStatus>;
  topicPostLik_updateTopicPostLik?: Maybe<ResponseBaseOfTopicPostLike>;
  topicPostLike_createTopicPostLike?: Maybe<ResponseBaseOfTopicPostLike>;
  topicPost_createTopicPost?: Maybe<ResponseBaseOfTopicPost>;
  topicPost_deleteTopicPost?: Maybe<ResponseStatus>;
  topicPost_setAsRecommended?: Maybe<ResponseBaseOfTopicPost>;
  topicPost_updateTopicPost?: Maybe<ResponseBaseOfTopicPost>;
  topicUse_createTopicUse?: Maybe<ResponseBaseOfTopicUser>;
  topicUse_deleteTopicUse?: Maybe<ResponseStatus>;
  topicUse_updateTopicUse?: Maybe<ResponseBaseOfTopicUser>;
  topicUser_createByTopicIds?: Maybe<ListResponseBaseOfTopicUser>;
  topicUser_createTopicUser?: Maybe<ResponseBaseOfTopicUser>;
  topicUser_customDeleteTopicUser?: Maybe<ResponseStatus>;
  topicUser_deleteTopicUser?: Maybe<ResponseStatus>;
  topicUser_updateTopicUser?: Maybe<ResponseBaseOfTopicUser>;
  topic_createTopic?: Maybe<ResponseBaseOfTopic>;
  topic_deleteTopic?: Maybe<ResponseStatus>;
  topic_updateTopic?: Maybe<ResponseBaseOfTopic>;
  update?: Maybe<ResponseBaseOfPostSave>;
  use_createUse?: Maybe<ResponseBaseOfUser>;
  use_deleteUse?: Maybe<ResponseStatus>;
  use_updateUse?: Maybe<ResponseBaseOfUser>;
  userCategor_createUserCategor?: Maybe<ResponseBaseOfUserCategory>;
  userCategor_deleteUserCategor?: Maybe<ResponseStatus>;
  userCategor_updateUserCategor?: Maybe<ResponseBaseOfUserCategory>;
  userCategory_createByCategoryIds?: Maybe<ListResponseBaseOfUserCategory>;
  userCategory_createUserCategory?: Maybe<ResponseBaseOfUserCategory>;
  userCategory_deleteUserCategory?: Maybe<ResponseStatus>;
  userCategory_updateUserCategory?: Maybe<ResponseBaseOfUserCategory>;
  user_changeNotificationDetail?: Maybe<ResponseBaseOfUser>;
  user_changeUserActivation?: Maybe<ResponseBaseOfUser>;
  user_createAdmin?: Maybe<ResponseBaseOfUser>;
  user_deleteAccount?: Maybe<ResponseBaseOfUser>;
  user_getNearbyUsers?: Maybe<ListResponseBaseOfUserDistanceDto>;
  user_removeUser?: Maybe<ResponseStatus>;
  user_signUpArtist?: Maybe<ResponseBaseOfUser>;
  user_updateProfile?: Maybe<ResponseBaseOfUser>;
};

export type MutationTopicPostLike_DeleteTopicPostLikeArgs = {
  topicPostId: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
};

export type MutationActivit_CreateActivitArgs = {
  input?: InputMaybe<ActivityInput>;
};

export type MutationActivit_DeleteActivitArgs = {
  entityId: Scalars['Int']['input'];
};

export type MutationActivit_UpdateActivitArgs = {
  input?: InputMaybe<ActivityInput>;
};

export type MutationBaseCollectio_CreateBaseCollectioArgs = {
  postIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type MutationBaseCollectio_DeleteBaseCollectioArgs = {
  entityId: Scalars['Int']['input'];
};

export type MutationBaseCollectio_UpdateBaseCollectioArgs = {
  input?: InputMaybe<BaseCollectionInput>;
  postIds?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type MutationBaseCollection_CreateBaseCollectionArgs = {
  postIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type MutationBaseCollection_DeleteBaseCollectionArgs = {
  entityId: Scalars['Int']['input'];
};

export type MutationBaseCollection_UpdateBaseCollectionArgs = {
  input?: InputMaybe<BaseCollectionInput>;
  postIds?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type MutationBloc_CreateBlocArgs = {
  input?: InputMaybe<BlockInput>;
};

export type MutationBloc_DeleteBlocArgs = {
  entityId: Scalars['Int']['input'];
};

export type MutationBloc_UpdateBlocArgs = {
  input?: InputMaybe<BlockInput>;
};

export type MutationBlock_CreateBlockArgs = {
  input?: InputMaybe<BlockInput>;
};

export type MutationBlock_DeleteBlockArgs = {
  entityId: Scalars['Int']['input'];
};

export type MutationBlock_UpdateBlockArgs = {
  input?: InputMaybe<BlockInput>;
};

export type MutationBuddy_CreateBuddyArgs = {
  input?: InputMaybe<InsertBuddyInput>;
};

export type MutationBuddy_UpdateBuddyArgs = {
  input?: InputMaybe<UpdateBuddyInput>;
};

export type MutationCategor_CreateCategorArgs = {
  input?: InputMaybe<CategoryInput>;
};

export type MutationCategor_DeleteCategorArgs = {
  entityId: Scalars['Int']['input'];
};

export type MutationCategor_UpdateCategorArgs = {
  input?: InputMaybe<CategoryInput>;
};

export type MutationCategory_CreateCategoryArgs = {
  input?: InputMaybe<CategoryInput>;
};

export type MutationCategory_DeleteCategoryArgs = {
  entityId: Scalars['Int']['input'];
};

export type MutationCategory_UpdateCategoryArgs = {
  input?: InputMaybe<CategoryInput>;
};

export type MutationCollectio_CreateCollectioArgs = {
  input?: InputMaybe<CollectionInput>;
};

export type MutationCollectio_DeleteCollectioArgs = {
  baseCollectionId: Scalars['Int']['input'];
  postId: Scalars['Int']['input'];
};

export type MutationCollectio_UpdateCollectioArgs = {
  input?: InputMaybe<CollectionInput>;
};

export type MutationCollection_CreateCollectionArgs = {
  input?: InputMaybe<CollectionInput>;
};

export type MutationCollection_DeleteFromCollectionArgs = {
  baseCollectionId: Scalars['Int']['input'];
  postId: Scalars['Int']['input'];
};

export type MutationCollection_UpdateCollectionArgs = {
  input?: InputMaybe<CollectionInput>;
};

export type MutationCommen_CreateCommenArgs = {
  input?: InputMaybe<CommentInput>;
};

export type MutationCommen_DeleteCommenArgs = {
  entityId: Scalars['Int']['input'];
};

export type MutationCommen_UpdateCommenArgs = {
  input?: InputMaybe<CommentInput>;
};

export type MutationCommentLik_CreateCommentLikArgs = {
  input?: InputMaybe<CommentLikeInput>;
};

export type MutationCommentLik_DeleteCommentLikArgs = {
  commentId: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
};

export type MutationCommentLik_UpdateCommentLikArgs = {
  input?: InputMaybe<CommentLikeInput>;
};

export type MutationCommentLike_CreateCommentLikeArgs = {
  input?: InputMaybe<CommentLikeInput>;
};

export type MutationCommentLike_DeleteCommentLikeArgs = {
  commentId: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
};

export type MutationComment_CreateCommentArgs = {
  input?: InputMaybe<CommentInput>;
};

export type MutationComment_DeleteCommentArgs = {
  entityId: Scalars['Int']['input'];
};

export type MutationComment_DisLikeCommentArgs = {
  id: Scalars['Int']['input'];
};

export type MutationComment_LikeCommentArgs = {
  id: Scalars['Int']['input'];
};

export type MutationComment_UpdateCommentArgs = {
  input?: InputMaybe<CommentInput>;
};

export type MutationCreateArgs = {
  input?: InputMaybe<PostSaveInput>;
};

export type MutationDeleteArgs = {
  entityId: Scalars['Int']['input'];
};

export type MutationFollo_CreateFolloArgs = {
  input?: InputMaybe<FollowInput>;
};

export type MutationFollo_DeleteFolloArgs = {
  entityId: Scalars['Int']['input'];
};

export type MutationFollo_UpdateFolloArgs = {
  input?: InputMaybe<FollowInput>;
};

export type MutationFollow_CreateFollowArgs = {
  input?: InputMaybe<FollowInput>;
};

export type MutationFollow_DeleteFollowArgs = {
  entityId: Scalars['Int']['input'];
};

export type MutationFollow_DeleteFollowByFollowingIdArgs = {
  followingId: Scalars['Int']['input'];
};

export type MutationMessage_CreateMessageArgs = {
  messageInput?: InputMaybe<MessageInput>;
};

export type MutationMessage_DeleteMessageArgs = {
  messageId: Scalars['Int']['input'];
};

export type MutationMessage_ForwardPostInConversationArgs = {
  input?: InputMaybe<ForwardPostInput>;
};

export type MutationMessage_ForwardTopicPostInConversationArgs = {
  input?: InputMaybe<ForwardTopicPostInput>;
};

export type MutationMessage_RemoveConversationArgs = {
  conversationId: Scalars['Int']['input'];
};

export type MutationNotification_ReadAllNotificationsArgs = {
  ids?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type MutationNotification_ReadNotificationArgs = {
  notificationId: Scalars['Int']['input'];
};

export type MutationPos_CreatePosArgs = {
  input?: InputMaybe<PostInput>;
};

export type MutationPos_DeletePosArgs = {
  entityId: Scalars['Int']['input'];
};

export type MutationPos_UpdatePosArgs = {
  categories?: InputMaybe<Array<Scalars['Int']['input']>>;
  input?: InputMaybe<PostInput>;
};

export type MutationPostCategor_CreatePostCategorArgs = {
  input?: InputMaybe<PostCategoryInput>;
};

export type MutationPostCategor_DeletePostCategorArgs = {
  entityId: Scalars['Int']['input'];
};

export type MutationPostCategor_UpdatePostCategorArgs = {
  input?: InputMaybe<PostCategoryInput>;
};

export type MutationPostCategory_CreatePostCategoryArgs = {
  input?: InputMaybe<PostCategoryInput>;
};

export type MutationPostCategory_DeletePostCategoryArgs = {
  entityId: Scalars['Int']['input'];
};

export type MutationPostCategory_UpdatePostCategoryArgs = {
  input?: InputMaybe<PostCategoryInput>;
};

export type MutationPostLik_CreatePostLikArgs = {
  input?: InputMaybe<PostLikeInput>;
};

export type MutationPostLik_DeletePostLikArgs = {
  postId: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
};

export type MutationPostLik_UpdatePostLikArgs = {
  input?: InputMaybe<PostLikeInput>;
};

export type MutationPostLike_CreatePostLikeArgs = {
  input?: InputMaybe<PostLikeInput>;
};

export type MutationPostLike_DeletePostLikeArgs = {
  postId: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
};

export type MutationPostSav_CreatePostSavArgs = {
  input?: InputMaybe<PostSaveInput>;
};

export type MutationPostSav_DeletePostSavArgs = {
  postId: Scalars['Int']['input'];
};

export type MutationPostSav_UpdatePostSavArgs = {
  input?: InputMaybe<PostSaveInput>;
};

export type MutationPostSave_CreatePostSaveArgs = {
  input?: InputMaybe<PostSaveInput>;
};

export type MutationPostSave_DeletePostSaveArgs = {
  postId: Scalars['Int']['input'];
};

export type MutationPostVie_CreatePostVieArgs = {
  input?: InputMaybe<PostViewInput>;
};

export type MutationPostVie_DeletePostVieArgs = {
  postId: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
};

export type MutationPostVie_UpdatePostVieArgs = {
  input?: InputMaybe<PostViewInput>;
};

export type MutationPostView_CreatePostViewArgs = {
  input?: InputMaybe<PostViewInput>;
};

export type MutationPostView_DeletePostViewArgs = {
  postId: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
};

export type MutationPost_CreatePostArgs = {
  categories?: InputMaybe<Array<Scalars['Int']['input']>>;
  hashtags?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  input?: InputMaybe<PostInput>;
};

export type MutationPost_DeletePostArgs = {
  entityId: Scalars['Int']['input'];
};

export type MutationPost_SetAsRecommendedArgs = {
  entityId: Scalars['Int']['input'];
  setAsRecommended: Scalars['Boolean']['input'];
};

export type MutationPost_UpdatePostArgs = {
  categories?: InputMaybe<Array<Scalars['Int']['input']>>;
  input?: InputMaybe<PostInput>;
};

export type MutationRemoveArgs = {
  entityId: Scalars['Int']['input'];
};

export type MutationReportCommen_CreateReportCommenArgs = {
  input?: InputMaybe<ReportCommentInput>;
};

export type MutationReportCommen_DeleteReportCommenArgs = {
  entityId: Scalars['Int']['input'];
};

export type MutationReportCommen_UpdateReportCommenArgs = {
  input?: InputMaybe<ReportCommentInput>;
};

export type MutationReportComment_CreateReportCommentArgs = {
  input?: InputMaybe<ReportCommentInput>;
};

export type MutationReportComment_DeleteReportCommentArgs = {
  entityId: Scalars['Int']['input'];
};

export type MutationReportComment_SetAsReviewedArgs = {
  entityId: Scalars['Int']['input'];
};

export type MutationReportComment_UpdateReportCommentArgs = {
  input?: InputMaybe<ReportCommentInput>;
};

export type MutationReportPos_CreateReportPosArgs = {
  input?: InputMaybe<ReportPostInput>;
};

export type MutationReportPos_DeleteReportPosArgs = {
  entityId: Scalars['Int']['input'];
};

export type MutationReportPos_UpdateReportPosArgs = {
  input?: InputMaybe<ReportPostInput>;
};

export type MutationReportPost_CreateReportPostArgs = {
  input?: InputMaybe<ReportPostInput>;
};

export type MutationReportPost_DeleteReportPostArgs = {
  entityId: Scalars['Int']['input'];
};

export type MutationReportPost_SetAsReviewedArgs = {
  entityId: Scalars['Int']['input'];
};

export type MutationReportPost_UpdateReportPostArgs = {
  input?: InputMaybe<ReportPostInput>;
};

export type MutationReportTopicPos_CreateReportTopicPosArgs = {
  input?: InputMaybe<ReportTopicPostInput>;
};

export type MutationReportTopicPos_DeleteReportTopicPosArgs = {
  entityId: Scalars['Int']['input'];
};

export type MutationReportTopicPos_UpdateReportTopicPosArgs = {
  input?: InputMaybe<ReportTopicPostInput>;
};

export type MutationReportTopicPostCommen_CreateReportTopicPostCommenArgs = {
  input?: InputMaybe<ReportTopicPostCommentInput>;
};

export type MutationReportTopicPostCommen_DeleteReportTopicPostCommenArgs = {
  entityId: Scalars['Int']['input'];
};

export type MutationReportTopicPostCommen_UpdateReportTopicPostCommenArgs = {
  input?: InputMaybe<ReportTopicPostCommentInput>;
};

export type MutationReportTopicPost_CreateReportTopicPostArgs = {
  input?: InputMaybe<ReportTopicPostInput>;
};

export type MutationReportTopicPost_DeleteReportTopicPostArgs = {
  entityId: Scalars['Int']['input'];
};

export type MutationReportTopicPost_SetAsReviewedArgs = {
  entityId: Scalars['Int']['input'];
};

export type MutationReportTopicPost_UpdateReportTopicPostArgs = {
  input?: InputMaybe<ReportTopicPostInput>;
};

export type MutationReportUse_CreateReportUseArgs = {
  input?: InputMaybe<ReportUserInput>;
};

export type MutationReportUse_DeleteReportUseArgs = {
  entityId: Scalars['Int']['input'];
};

export type MutationReportUse_UpdateReportUseArgs = {
  input?: InputMaybe<ReportUserInput>;
};

export type MutationReportUser_CreateReportUserArgs = {
  input?: InputMaybe<ReportUserInput>;
};

export type MutationReportUser_DeleteReportUserArgs = {
  entityId: Scalars['Int']['input'];
};

export type MutationReportUser_SetAsReviewedArgs = {
  entityId: Scalars['Int']['input'];
};

export type MutationReportUser_UpdateReportUserArgs = {
  input?: InputMaybe<ReportUserInput>;
};

export type MutationTopi_CreateTopiArgs = {
  input?: InputMaybe<TopicInput>;
  invitedUserIds?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type MutationTopi_DeleteTopiArgs = {
  entityId: Scalars['Int']['input'];
};

export type MutationTopi_UpdateTopiArgs = {
  input?: InputMaybe<TopicInput>;
};

export type MutationTopicPos_CreateTopicPosArgs = {
  input?: InputMaybe<TopicPostInput>;
};

export type MutationTopicPos_DeleteTopicPosArgs = {
  entityId: Scalars['Int']['input'];
};

export type MutationTopicPos_UpdateTopicPosArgs = {
  input?: InputMaybe<TopicPostInput>;
};

export type MutationTopicPostCommen_CreateTopicPostCommenArgs = {
  input?: InputMaybe<TopicPostCommentInput>;
};

export type MutationTopicPostCommen_DeleteTopicPostCommenArgs = {
  entityId: Scalars['Int']['input'];
};

export type MutationTopicPostCommen_UpdateTopicPostCommenArgs = {
  input?: InputMaybe<TopicPostCommentInput>;
};

export type MutationTopicPostCommentLik_CreateTopicPostCommentLikArgs = {
  input?: InputMaybe<TopicPostCommentLikeInput>;
};

export type MutationTopicPostCommentLik_DeleteTopicPostCommentLikArgs = {
  commentId: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
};

export type MutationTopicPostCommentLik_UpdateTopicPostCommentLikArgs = {
  input?: InputMaybe<TopicPostCommentLikeInput>;
};

export type MutationTopicPostCommentLike_CreateTopicPostCommentLikeArgs = {
  input?: InputMaybe<TopicPostCommentLikeInput>;
};

export type MutationTopicPostCommentLike_DeleteTopicPostCommentLikeArgs = {
  commentId: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
};

export type MutationTopicPostComment_CreateTopicPostCommentArgs = {
  input?: InputMaybe<TopicPostCommentInput>;
};

export type MutationTopicPostComment_DeleteTopicPostCommentArgs = {
  entityId: Scalars['Int']['input'];
};

export type MutationTopicPostComment_UpdateTopicPostCommentArgs = {
  input?: InputMaybe<TopicPostCommentInput>;
};

export type MutationTopicPostLik_CreateTopicPostLikArgs = {
  input?: InputMaybe<TopicPostLikeInput>;
};

export type MutationTopicPostLik_DeleteTopicPostLikArgs = {
  topicPostId: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
};

export type MutationTopicPostLik_UpdateTopicPostLikArgs = {
  input?: InputMaybe<TopicPostLikeInput>;
};

export type MutationTopicPostLike_CreateTopicPostLikeArgs = {
  input?: InputMaybe<TopicPostLikeInput>;
};

export type MutationTopicPost_CreateTopicPostArgs = {
  hashtags?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  input?: InputMaybe<TopicPostInput>;
};

export type MutationTopicPost_DeleteTopicPostArgs = {
  entityId: Scalars['Int']['input'];
};

export type MutationTopicPost_SetAsRecommendedArgs = {
  entityId: Scalars['Int']['input'];
  setAsRecommended: Scalars['Boolean']['input'];
};

export type MutationTopicPost_UpdateTopicPostArgs = {
  input?: InputMaybe<TopicPostInput>;
};

export type MutationTopicUse_CreateTopicUseArgs = {
  input?: InputMaybe<TopicUserInput>;
};

export type MutationTopicUse_DeleteTopicUseArgs = {
  entityId: Scalars['Int']['input'];
};

export type MutationTopicUse_UpdateTopicUseArgs = {
  input?: InputMaybe<TopicUserInput>;
};

export type MutationTopicUser_CreateByTopicIdsArgs = {
  topicIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  userId: Scalars['Int']['input'];
};

export type MutationTopicUser_CreateTopicUserArgs = {
  input?: InputMaybe<TopicUserInput>;
};

export type MutationTopicUser_CustomDeleteTopicUserArgs = {
  topicId: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
};

export type MutationTopicUser_DeleteTopicUserArgs = {
  entityId: Scalars['Int']['input'];
};

export type MutationTopicUser_UpdateTopicUserArgs = {
  input?: InputMaybe<TopicUserInput>;
};

export type MutationTopic_CreateTopicArgs = {
  input?: InputMaybe<TopicInput>;
  invitedUserIds?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type MutationTopic_DeleteTopicArgs = {
  entityId: Scalars['Int']['input'];
};

export type MutationTopic_UpdateTopicArgs = {
  input?: InputMaybe<TopicInput>;
};

export type MutationUpdateArgs = {
  input?: InputMaybe<PostSaveInput>;
};

export type MutationUse_CreateUseArgs = {
  input?: InputMaybe<UserInput>;
};

export type MutationUse_DeleteUseArgs = {
  entityId: Scalars['Int']['input'];
};

export type MutationUse_UpdateUseArgs = {
  input?: InputMaybe<UserInput>;
};

export type MutationUserCategor_CreateUserCategorArgs = {
  input?: InputMaybe<UserCategoryInput>;
};

export type MutationUserCategor_DeleteUserCategorArgs = {
  entityId: Scalars['Int']['input'];
};

export type MutationUserCategor_UpdateUserCategorArgs = {
  input?: InputMaybe<UserCategoryInput>;
};

export type MutationUserCategory_CreateByCategoryIdsArgs = {
  categoryIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  userId: Scalars['Int']['input'];
};

export type MutationUserCategory_CreateUserCategoryArgs = {
  input?: InputMaybe<UserCategoryInput>;
};

export type MutationUserCategory_DeleteUserCategoryArgs = {
  entityId: Scalars['Int']['input'];
};

export type MutationUserCategory_UpdateUserCategoryArgs = {
  input?: InputMaybe<UserCategoryInput>;
};

export type MutationUser_ChangeNotificationDetailArgs = {
  userInput?: InputMaybe<UserNotificationDetailInput>;
};

export type MutationUser_ChangeUserActivationArgs = {
  isActive: Scalars['Boolean']['input'];
  userId: Scalars['Int']['input'];
};

export type MutationUser_CreateAdminArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  userInput?: InputMaybe<UserInput>;
};

export type MutationUser_DeleteAccountArgs = {
  userId: Scalars['Int']['input'];
};

export type MutationUser_GetNearbyUsersArgs = {
  currentLocation?: InputMaybe<Scalars['Position']['input']>;
  updateLocation?: Scalars['Boolean']['input'];
};

export type MutationUser_SignUpArtistArgs = {
  userInput?: InputMaybe<UserInput>;
};

export type MutationUser_UpdateProfileArgs = {
  userInput?: InputMaybe<UserInput>;
};

export type Notification = {
  __typename?: 'Notification';
  activity?: Maybe<Activity>;
  activityId?: Maybe<Scalars['Int']['output']>;
  createdDate: Scalars['DateTime']['output'];
  deleteAccountDate: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  isDeleted: Scalars['Boolean']['output'];
  isDeletedAccount: Scalars['Boolean']['output'];
  isReaded: Scalars['Boolean']['output'];
  lastModifiedDate?: Maybe<Scalars['DateTime']['output']>;
  message?: Maybe<Message>;
  messageId?: Maybe<Scalars['Int']['output']>;
  notificationType: NotificationType;
  post?: Maybe<Post>;
  postId?: Maybe<Scalars['Int']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  topic?: Maybe<Topic>;
  topicId?: Maybe<Scalars['Int']['output']>;
  topicPost?: Maybe<TopicPost>;
  topicPostId?: Maybe<Scalars['Int']['output']>;
  user?: Maybe<User>;
  userId: Scalars['Int']['output'];
};

export type NotificationCollectionSegment = {
  __typename?: 'NotificationCollectionSegment';
  items?: Maybe<Array<Maybe<Notification>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type NotificationFilterInput = {
  activity?: InputMaybe<ActivityFilterInput>;
  activityId?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  and?: InputMaybe<Array<NotificationFilterInput>>;
  createdDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  deleteAccountDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  description?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  isDeletedAccount?: InputMaybe<BooleanOperationFilterInput>;
  isReaded?: InputMaybe<BooleanOperationFilterInput>;
  lastModifiedDate?: InputMaybe<ComparableNullableOfDateTimeOperationFilterInput>;
  message?: InputMaybe<MessageFilterInput>;
  messageId?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  notificationType?: InputMaybe<NotificationTypeOperationFilterInput>;
  or?: InputMaybe<Array<NotificationFilterInput>>;
  post?: InputMaybe<PostFilterInput>;
  postId?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  title?: InputMaybe<StringOperationFilterInput>;
  topic?: InputMaybe<TopicFilterInput>;
  topicId?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  topicPost?: InputMaybe<TopicPostFilterInput>;
  topicPostId?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  user?: InputMaybe<UserFilterInput>;
  userId?: InputMaybe<ComparableInt32OperationFilterInput>;
};

export type NotificationInputsInput = {
  description: Scalars['String']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  title: Scalars['String']['input'];
  userId: Scalars['Int']['input'];
};

export type NotificationSortInput = {
  activity?: InputMaybe<ActivitySortInput>;
  activityId?: InputMaybe<SortEnumType>;
  createdDate?: InputMaybe<SortEnumType>;
  deleteAccountDate?: InputMaybe<SortEnumType>;
  description?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  isDeletedAccount?: InputMaybe<SortEnumType>;
  isReaded?: InputMaybe<SortEnumType>;
  lastModifiedDate?: InputMaybe<SortEnumType>;
  message?: InputMaybe<MessageSortInput>;
  messageId?: InputMaybe<SortEnumType>;
  notificationType?: InputMaybe<SortEnumType>;
  post?: InputMaybe<PostSortInput>;
  postId?: InputMaybe<SortEnumType>;
  title?: InputMaybe<SortEnumType>;
  topic?: InputMaybe<TopicSortInput>;
  topicId?: InputMaybe<SortEnumType>;
  topicPost?: InputMaybe<TopicPostSortInput>;
  topicPostId?: InputMaybe<SortEnumType>;
  user?: InputMaybe<UserSortInput>;
  userId?: InputMaybe<SortEnumType>;
};

export enum NotificationType {
  CreateActivity = 'CREATE_ACTIVITY',
  CreateChat = 'CREATE_CHAT',
  CreateTopic = 'CREATE_TOPIC',
  InvitedToTopic = 'INVITED_TO_TOPIC',
  PostDeletedByAdmin = 'POST_DELETED_BY_ADMIN',
  SetAsRecommended = 'SET_AS_RECOMMENDED',
}

export type NotificationTypeOperationFilterInput = {
  eq?: InputMaybe<NotificationType>;
  in?: InputMaybe<Array<NotificationType>>;
  neq?: InputMaybe<NotificationType>;
  nin?: InputMaybe<Array<NotificationType>>;
};

export type NullableOfBuddyInteractionFrequenciesOperationFilterInput = {
  eq?: InputMaybe<BuddyInteractionFrequencies>;
  in?: InputMaybe<Array<InputMaybe<BuddyInteractionFrequencies>>>;
  neq?: InputMaybe<BuddyInteractionFrequencies>;
  nin?: InputMaybe<Array<InputMaybe<BuddyInteractionFrequencies>>>;
};

export type NullableOfBuddyInteractionTypesOperationFilterInput = {
  eq?: InputMaybe<BuddyInteractionTypes>;
  in?: InputMaybe<Array<InputMaybe<BuddyInteractionTypes>>>;
  neq?: InputMaybe<BuddyInteractionTypes>;
  nin?: InputMaybe<Array<InputMaybe<BuddyInteractionTypes>>>;
};

export type NullableOfBuddyInteractionsOperationFilterInput = {
  eq?: InputMaybe<BuddyInteractions>;
  in?: InputMaybe<Array<InputMaybe<BuddyInteractions>>>;
  neq?: InputMaybe<BuddyInteractions>;
  nin?: InputMaybe<Array<InputMaybe<BuddyInteractions>>>;
};

export type NullableOfBuddyTagsOperationFilterInput = {
  eq?: InputMaybe<BuddyTags>;
  in?: InputMaybe<Array<InputMaybe<BuddyTags>>>;
  neq?: InputMaybe<BuddyTags>;
  nin?: InputMaybe<Array<InputMaybe<BuddyTags>>>;
};

export enum OgcGeometryType {
  CircularString = 'CIRCULAR_STRING',
  CompoundCurve = 'COMPOUND_CURVE',
  Curve = 'CURVE',
  CurvePolygon = 'CURVE_POLYGON',
  GeometryCollection = 'GEOMETRY_COLLECTION',
  LineString = 'LINE_STRING',
  MultiCurve = 'MULTI_CURVE',
  MultiLineString = 'MULTI_LINE_STRING',
  MultiPoint = 'MULTI_POINT',
  MultiPolygon = 'MULTI_POLYGON',
  MultiSurface = 'MULTI_SURFACE',
  Point = 'POINT',
  Polygon = 'POLYGON',
  PolyhedralSurface = 'POLYHEDRAL_SURFACE',
  Surface = 'SURFACE',
  Tin = 'TIN',
}

export type OgcGeometryTypeOperationFilterInput = {
  eq?: InputMaybe<OgcGeometryType>;
  in?: InputMaybe<Array<OgcGeometryType>>;
  neq?: InputMaybe<OgcGeometryType>;
  nin?: InputMaybe<Array<OgcGeometryType>>;
};

export type PointDto = {
  __typename?: 'PointDto';
  latitude: Scalars['Float']['output'];
  longitude: Scalars['Float']['output'];
};

export type PointDtoFilterInput = {
  and?: InputMaybe<Array<PointDtoFilterInput>>;
  latitude?: InputMaybe<ComparableDoubleOperationFilterInput>;
  longitude?: InputMaybe<ComparableDoubleOperationFilterInput>;
  or?: InputMaybe<Array<PointDtoFilterInput>>;
};

export type PointDtoSortInput = {
  latitude?: InputMaybe<SortEnumType>;
  longitude?: InputMaybe<SortEnumType>;
};

export type PointFilterInput = {
  and?: InputMaybe<Array<PointFilterInput>>;
  area?: InputMaybe<ComparableDoubleOperationFilterInput>;
  boundary?: InputMaybe<GeometryFilterInput>;
  centroid?: InputMaybe<PointFilterInput>;
  contains?: InputMaybe<GeometryContainsOperationFilterInput>;
  dimension?: InputMaybe<DimensionOperationFilterInput>;
  distance?: InputMaybe<GeometryDistanceOperationFilterInput>;
  envelope?: InputMaybe<GeometryFilterInput>;
  geometryType?: InputMaybe<StringOperationFilterInput>;
  interiorPoint?: InputMaybe<PointFilterInput>;
  intersects?: InputMaybe<GeometryIntersectsOperationFilterInput>;
  isSimple?: InputMaybe<BooleanOperationFilterInput>;
  isValid?: InputMaybe<BooleanOperationFilterInput>;
  length?: InputMaybe<ComparableDoubleOperationFilterInput>;
  m?: InputMaybe<ComparableDoubleOperationFilterInput>;
  ncontains?: InputMaybe<GeometryContainsOperationFilterInput>;
  nintersects?: InputMaybe<GeometryIntersectsOperationFilterInput>;
  noverlaps?: InputMaybe<GeometryOverlapsOperationFilterInput>;
  ntouches?: InputMaybe<GeometryTouchesOperationFilterInput>;
  numPoints?: InputMaybe<ComparableInt32OperationFilterInput>;
  nwithin?: InputMaybe<GeometryWithinOperationFilterInput>;
  ogcGeometryType?: InputMaybe<OgcGeometryTypeOperationFilterInput>;
  or?: InputMaybe<Array<PointFilterInput>>;
  overlaps?: InputMaybe<GeometryOverlapsOperationFilterInput>;
  pointOnSurface?: InputMaybe<PointFilterInput>;
  srid?: InputMaybe<ComparableInt32OperationFilterInput>;
  touches?: InputMaybe<GeometryTouchesOperationFilterInput>;
  within?: InputMaybe<GeometryWithinOperationFilterInput>;
  x?: InputMaybe<ComparableDoubleOperationFilterInput>;
  y?: InputMaybe<ComparableDoubleOperationFilterInput>;
  z?: InputMaybe<ComparableDoubleOperationFilterInput>;
};

export type PointSortInput = {
  x?: InputMaybe<SortEnumType>;
  y?: InputMaybe<SortEnumType>;
  z?: InputMaybe<SortEnumType>;
};

export type Post = {
  __typename?: 'Post';
  caption?: Maybe<Scalars['String']['output']>;
  collections?: Maybe<Array<Maybe<Collection>>>;
  commentCount?: Maybe<Scalars['Int']['output']>;
  comments?: Maybe<Array<Maybe<Comment>>>;
  createdDate: Scalars['DateTime']['output'];
  fileType: FileType;
  fileUrl?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  isDeleted: Scalars['Boolean']['output'];
  lastModifiedDate?: Maybe<Scalars['DateTime']['output']>;
  postCategories?: Maybe<Array<Maybe<PostCategory>>>;
  postHashtags?: Maybe<Array<Maybe<PostHashtag>>>;
  postLikeCount?: Maybe<Scalars['Int']['output']>;
  postLikes?: Maybe<Array<Maybe<PostLike>>>;
  postViews?: Maybe<Array<Maybe<PostView>>>;
  reportCount?: Maybe<Scalars['Int']['output']>;
  reportPosts?: Maybe<Array<Maybe<ReportPost>>>;
  setAsRecommended: Scalars['Boolean']['output'];
  targetPost?: Maybe<Array<Maybe<Activity>>>;
  user?: Maybe<User>;
  userId: Scalars['Int']['output'];
  viewCount: Scalars['Int']['output'];
};

export type PostCategory = {
  __typename?: 'PostCategory';
  category?: Maybe<Category>;
  categoryId: Scalars['Int']['output'];
  createdDate: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  isDeleted: Scalars['Boolean']['output'];
  lastModifiedDate?: Maybe<Scalars['DateTime']['output']>;
  post?: Maybe<Post>;
  postId: Scalars['Int']['output'];
};

export type PostCategoryCollectionSegment = {
  __typename?: 'PostCategoryCollectionSegment';
  items?: Maybe<Array<Maybe<PostCategory>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type PostCategoryFilterInput = {
  and?: InputMaybe<Array<PostCategoryFilterInput>>;
  category?: InputMaybe<CategoryFilterInput>;
  categoryId?: InputMaybe<ComparableInt32OperationFilterInput>;
  createdDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  lastModifiedDate?: InputMaybe<ComparableNullableOfDateTimeOperationFilterInput>;
  or?: InputMaybe<Array<PostCategoryFilterInput>>;
  post?: InputMaybe<PostFilterInput>;
  postId?: InputMaybe<ComparableInt32OperationFilterInput>;
};

export type PostCategoryInput = {
  categoryId: Scalars['Int']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  postId: Scalars['Int']['input'];
};

export type PostCategorySortInput = {
  category?: InputMaybe<CategorySortInput>;
  categoryId?: InputMaybe<SortEnumType>;
  createdDate?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  lastModifiedDate?: InputMaybe<SortEnumType>;
  post?: InputMaybe<PostSortInput>;
  postId?: InputMaybe<SortEnumType>;
};

export type PostCollectionSegment = {
  __typename?: 'PostCollectionSegment';
  items?: Maybe<Array<Maybe<Post>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type PostFilterInput = {
  and?: InputMaybe<Array<PostFilterInput>>;
  caption?: InputMaybe<StringOperationFilterInput>;
  collections?: InputMaybe<ListFilterInputTypeOfCollectionFilterInput>;
  commentCount?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  comments?: InputMaybe<ListFilterInputTypeOfCommentFilterInput>;
  createdDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  fileType?: InputMaybe<FileTypeOperationFilterInput>;
  fileUrl?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  lastModifiedDate?: InputMaybe<ComparableNullableOfDateTimeOperationFilterInput>;
  or?: InputMaybe<Array<PostFilterInput>>;
  postCategories?: InputMaybe<ListFilterInputTypeOfPostCategoryFilterInput>;
  postHashtags?: InputMaybe<ListFilterInputTypeOfPostHashtagFilterInput>;
  postLikeCount?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  postLikes?: InputMaybe<ListFilterInputTypeOfPostLikeFilterInput>;
  postViews?: InputMaybe<ListFilterInputTypeOfPostViewFilterInput>;
  reportCount?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  reportPosts?: InputMaybe<ListFilterInputTypeOfReportPostFilterInput>;
  setAsRecommended?: InputMaybe<BooleanOperationFilterInput>;
  targetPost?: InputMaybe<ListFilterInputTypeOfActivityFilterInput>;
  user?: InputMaybe<UserFilterInput>;
  userId?: InputMaybe<ComparableInt32OperationFilterInput>;
  viewCount?: InputMaybe<ComparableInt32OperationFilterInput>;
};

export type PostHashtag = {
  __typename?: 'PostHashtag';
  createdDate: Scalars['DateTime']['output'];
  hashtag?: Maybe<Hashtag>;
  hashtagId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  isDeleted: Scalars['Boolean']['output'];
  lastModifiedDate?: Maybe<Scalars['DateTime']['output']>;
  post?: Maybe<Post>;
  postId: Scalars['Int']['output'];
};

export type PostHashtagFilterInput = {
  and?: InputMaybe<Array<PostHashtagFilterInput>>;
  createdDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  hashtag?: InputMaybe<HashtagFilterInput>;
  hashtagId?: InputMaybe<ComparableInt32OperationFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  lastModifiedDate?: InputMaybe<ComparableNullableOfDateTimeOperationFilterInput>;
  or?: InputMaybe<Array<PostHashtagFilterInput>>;
  post?: InputMaybe<PostFilterInput>;
  postId?: InputMaybe<ComparableInt32OperationFilterInput>;
};

export type PostInput = {
  caption?: InputMaybe<Scalars['String']['input']>;
  commentCount?: InputMaybe<Scalars['Int']['input']>;
  fileType: FileType;
  fileUrl?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  postLikeCount?: InputMaybe<Scalars['Int']['input']>;
  reportCount?: InputMaybe<Scalars['Int']['input']>;
  userId: Scalars['Int']['input'];
  viewCount: Scalars['Int']['input'];
};

export type PostLike = {
  __typename?: 'PostLike';
  createdDate: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  isDeleted: Scalars['Boolean']['output'];
  lastModifiedDate?: Maybe<Scalars['DateTime']['output']>;
  post?: Maybe<Post>;
  postId: Scalars['Int']['output'];
  user?: Maybe<User>;
  userId: Scalars['Int']['output'];
};

export type PostLikeCollectionSegment = {
  __typename?: 'PostLikeCollectionSegment';
  items?: Maybe<Array<Maybe<PostLike>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type PostLikeFilterInput = {
  and?: InputMaybe<Array<PostLikeFilterInput>>;
  createdDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  lastModifiedDate?: InputMaybe<ComparableNullableOfDateTimeOperationFilterInput>;
  or?: InputMaybe<Array<PostLikeFilterInput>>;
  post?: InputMaybe<PostFilterInput>;
  postId?: InputMaybe<ComparableInt32OperationFilterInput>;
  user?: InputMaybe<UserFilterInput>;
  userId?: InputMaybe<ComparableInt32OperationFilterInput>;
};

export type PostLikeInput = {
  id?: InputMaybe<Scalars['Int']['input']>;
  postId: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
};

export type PostLikeSortInput = {
  createdDate?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  lastModifiedDate?: InputMaybe<SortEnumType>;
  post?: InputMaybe<PostSortInput>;
  postId?: InputMaybe<SortEnumType>;
  user?: InputMaybe<UserSortInput>;
  userId?: InputMaybe<SortEnumType>;
};

export type PostSave = {
  __typename?: 'PostSave';
  createdDate: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  isDeleted: Scalars['Boolean']['output'];
  lastModifiedDate?: Maybe<Scalars['DateTime']['output']>;
  post?: Maybe<Post>;
  postId: Scalars['Int']['output'];
  user?: Maybe<User>;
  userId: Scalars['Int']['output'];
};

export type PostSaveCollectionSegment = {
  __typename?: 'PostSaveCollectionSegment';
  items?: Maybe<Array<Maybe<PostSave>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type PostSaveFilterInput = {
  and?: InputMaybe<Array<PostSaveFilterInput>>;
  createdDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  lastModifiedDate?: InputMaybe<ComparableNullableOfDateTimeOperationFilterInput>;
  or?: InputMaybe<Array<PostSaveFilterInput>>;
  post?: InputMaybe<PostFilterInput>;
  postId?: InputMaybe<ComparableInt32OperationFilterInput>;
  user?: InputMaybe<UserFilterInput>;
  userId?: InputMaybe<ComparableInt32OperationFilterInput>;
};

export type PostSaveInput = {
  id?: InputMaybe<Scalars['Int']['input']>;
  postId: Scalars['Int']['input'];
};

export type PostSaveSortInput = {
  createdDate?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  lastModifiedDate?: InputMaybe<SortEnumType>;
  post?: InputMaybe<PostSortInput>;
  postId?: InputMaybe<SortEnumType>;
  user?: InputMaybe<UserSortInput>;
  userId?: InputMaybe<SortEnumType>;
};

export type PostSortInput = {
  caption?: InputMaybe<SortEnumType>;
  commentCount?: InputMaybe<SortEnumType>;
  createdDate?: InputMaybe<SortEnumType>;
  fileType?: InputMaybe<SortEnumType>;
  fileUrl?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  lastModifiedDate?: InputMaybe<SortEnumType>;
  postLikeCount?: InputMaybe<SortEnumType>;
  reportCount?: InputMaybe<SortEnumType>;
  setAsRecommended?: InputMaybe<SortEnumType>;
  user?: InputMaybe<UserSortInput>;
  userId?: InputMaybe<SortEnumType>;
  viewCount?: InputMaybe<SortEnumType>;
};

export type PostView = {
  __typename?: 'PostView';
  createdDate: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  isDeleted: Scalars['Boolean']['output'];
  lastModifiedDate?: Maybe<Scalars['DateTime']['output']>;
  post?: Maybe<Post>;
  postId: Scalars['Int']['output'];
  user?: Maybe<User>;
  userId: Scalars['Int']['output'];
};

export type PostViewCollectionSegment = {
  __typename?: 'PostViewCollectionSegment';
  items?: Maybe<Array<Maybe<PostView>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type PostViewFilterInput = {
  and?: InputMaybe<Array<PostViewFilterInput>>;
  createdDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  lastModifiedDate?: InputMaybe<ComparableNullableOfDateTimeOperationFilterInput>;
  or?: InputMaybe<Array<PostViewFilterInput>>;
  post?: InputMaybe<PostFilterInput>;
  postId?: InputMaybe<ComparableInt32OperationFilterInput>;
  user?: InputMaybe<UserFilterInput>;
  userId?: InputMaybe<ComparableInt32OperationFilterInput>;
};

export type PostViewInput = {
  id?: InputMaybe<Scalars['Int']['input']>;
  postId: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
};

export type PostViewSortInput = {
  createdDate?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  lastModifiedDate?: InputMaybe<SortEnumType>;
  post?: InputMaybe<PostSortInput>;
  postId?: InputMaybe<SortEnumType>;
  user?: InputMaybe<UserSortInput>;
  userId?: InputMaybe<SortEnumType>;
};

export type PostsByCategoryAndFileTypeDto = {
  __typename?: 'PostsByCategoryAndFileTypeDto';
  categoryId: Scalars['Int']['output'];
  categoryTitle?: Maybe<Scalars['String']['output']>;
  count: Scalars['Int']['output'];
};

export type PostsByCategoryAndFileTypeDtoCollectionSegment = {
  __typename?: 'PostsByCategoryAndFileTypeDtoCollectionSegment';
  items?: Maybe<Array<Maybe<PostsByCategoryAndFileTypeDto>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type PostsByCategoryAndFileTypeDtoFilterInput = {
  and?: InputMaybe<Array<PostsByCategoryAndFileTypeDtoFilterInput>>;
  categoryId?: InputMaybe<ComparableInt32OperationFilterInput>;
  categoryTitle?: InputMaybe<StringOperationFilterInput>;
  count?: InputMaybe<ComparableInt32OperationFilterInput>;
  or?: InputMaybe<Array<PostsByCategoryAndFileTypeDtoFilterInput>>;
};

export type PostsByCategoryAndFileTypeDtoSortInput = {
  categoryId?: InputMaybe<SortEnumType>;
  categoryTitle?: InputMaybe<SortEnumType>;
  count?: InputMaybe<SortEnumType>;
};

export type Query = {
  __typename?: 'Query';
  CommentLike_getCommentLike?: Maybe<SingleResponseBaseOfCommentLike>;
  CommentLike_getCommentLikes?: Maybe<ListResponseBaseOfCommentLike>;
  TopicPostComment_getByUserId?: Maybe<ListResponseBaseOfTopicPostComment>;
  activit_getActivit?: Maybe<SingleResponseBaseOfActivity>;
  activit_getActivity?: Maybe<ListResponseBaseOfActivity>;
  activities_getByDateRange?: Maybe<ListResponseBaseOfActivity>;
  activity_getActivities?: Maybe<ListResponseBaseOfActivity>;
  activity_getActivity?: Maybe<SingleResponseBaseOfActivity>;
  activity_getByTargetCommentId?: Maybe<ListResponseBaseOfActivity>;
  activity_getByTargetPostId?: Maybe<ListResponseBaseOfActivity>;
  activity_getByTargetUserId?: Maybe<ListResponseBaseOfActivity>;
  activity_getByUserId?: Maybe<ListResponseBaseOfActivity>;
  activity_getUsersActivitiesByCount?: Maybe<ListResponseBaseOfUsersActivitiesByCountDto>;
  baseCollectio_getBaseCollectio?: Maybe<SingleResponseBaseOfBaseCollection>;
  baseCollectio_getBaseCollection?: Maybe<ListResponseBaseOfBaseCollection>;
  baseCollection_getBaseCollection?: Maybe<SingleResponseBaseOfBaseCollection>;
  baseCollection_getBaseCollections?: Maybe<ListResponseBaseOfBaseCollection>;
  baseCollection_getByUserId?: Maybe<ListResponseBaseOfBaseCollection>;
  bloc_getBloc?: Maybe<SingleResponseBaseOfBlock>;
  bloc_getBlock?: Maybe<ListResponseBaseOfBlock>;
  block_getBlock?: Maybe<SingleResponseBaseOfBlock>;
  block_getBlocks?: Maybe<ListResponseBaseOfBlock>;
  block_getByBlockedUserId?: Maybe<ListResponseBaseOfBlock>;
  block_getByBlockerUserId?: Maybe<ListResponseBaseOfBlock>;
  buddy_getBuddies?: Maybe<ListResponseBaseOfBuddyDto>;
  categor_getCategor?: Maybe<SingleResponseBaseOfCategory>;
  categor_getCategory?: Maybe<ListResponseBaseOfCategory>;
  category_getCategories?: Maybe<ListResponseBaseOfCategory>;
  category_getCategory?: Maybe<SingleResponseBaseOfCategory>;
  collectio_getCollectio?: Maybe<SingleResponseBaseOfCollection>;
  collectio_getCollection?: Maybe<ListResponseBaseOfCollection>;
  collection_getByBaseCollectionId?: Maybe<ListResponseBaseOfCollection>;
  collection_getByPostId?: Maybe<ListResponseBaseOfCollection>;
  collection_getCollection?: Maybe<SingleResponseBaseOfCollection>;
  collection_getCollections?: Maybe<ListResponseBaseOfCollection>;
  commen_getCommen?: Maybe<SingleResponseBaseOfComment>;
  commen_getComment?: Maybe<ListResponseBaseOfComment>;
  commentLik_getCommentLik?: Maybe<SingleResponseBaseOfCommentLike>;
  commentLik_getCommentLike?: Maybe<ListResponseBaseOfCommentLike>;
  commentLike_getByCommentId?: Maybe<ListResponseBaseOfCommentLike>;
  commentLike_getByUserId?: Maybe<ListResponseBaseOfCommentLike>;
  comment_customeGetComments?: Maybe<ListResponseBaseOfCommentDto>;
  comment_getByPostId?: Maybe<ListResponseBaseOfComment>;
  comment_getByUserId?: Maybe<ListResponseBaseOfComment>;
  comment_getComment?: Maybe<SingleResponseBaseOfComment>;
  comment_getComments?: Maybe<ListResponseBaseOfComment>;
  follo_getFollo?: Maybe<SingleResponseBaseOfFollow>;
  follo_getFollow?: Maybe<ListResponseBaseOfFollow>;
  follow_customeGetFollowers?: Maybe<ListResponseBaseOfFollowerDto>;
  follow_getFollow?: Maybe<SingleResponseBaseOfFollow>;
  follow_getFollowers?: Maybe<ListResponseBaseOfFollow>;
  follow_getFollowings?: Maybe<ListResponseBaseOfFollow>;
  follow_getFollows?: Maybe<ListResponseBaseOfFollow>;
  get?: Maybe<SingleResponseBaseOfPostSave>;
  hashta_getHashta?: Maybe<SingleResponseBaseOfHashtag>;
  hashta_getHashtag?: Maybe<ListResponseBaseOfHashtag>;
  hashtag_getHashtag?: Maybe<SingleResponseBaseOfHashtag>;
  hashtag_getHashtags?: Maybe<ListResponseBaseOfHashtag>;
  items?: Maybe<ListResponseBaseOfPostSave>;
  message_getConversation?: Maybe<ListResponseBaseOfMessage>;
  message_getConversationForUser?: Maybe<ResponseBaseOfConversation>;
  message_getUserMessages?: Maybe<ListResponseBaseOfConversationInput>;
  notification_getNotifications?: Maybe<ListResponseBaseOfNotification>;
  pos_getPos?: Maybe<SingleResponseBaseOfPost>;
  pos_getPost?: Maybe<ListResponseBaseOfPost>;
  postCategor_getPostCategor?: Maybe<SingleResponseBaseOfPostCategory>;
  postCategor_getPostCategory?: Maybe<ListResponseBaseOfPostCategory>;
  postCategory_getPostCategories?: Maybe<ListResponseBaseOfPostCategory>;
  postCategory_getPostCategory?: Maybe<SingleResponseBaseOfPostCategory>;
  postLik_getPostLik?: Maybe<SingleResponseBaseOfPostLike>;
  postLik_getPostLike?: Maybe<ListResponseBaseOfPostLike>;
  postLike_getByPostId?: Maybe<ListResponseBaseOfPostLike>;
  postLike_getByUserId?: Maybe<ListResponseBaseOfPostLike>;
  postLike_getPostLike?: Maybe<SingleResponseBaseOfPostLike>;
  postLike_getPostLikes?: Maybe<ListResponseBaseOfPostLike>;
  postSav_getPostSav?: Maybe<SingleResponseBaseOfPostSave>;
  postSav_getPostSave?: Maybe<ListResponseBaseOfPostSave>;
  postSave_getByPostId?: Maybe<SingleResponseBaseOfPostSave>;
  postSave_getPostSave?: Maybe<SingleResponseBaseOfPostSave>;
  postSave_getPostSaves?: Maybe<ListResponseBaseOfPostSave>;
  postVie_getPostVie?: Maybe<SingleResponseBaseOfPostView>;
  postVie_getPostView?: Maybe<ListResponseBaseOfPostView>;
  postView_getByPostId?: Maybe<ListResponseBaseOfPostView>;
  postView_getByUserId?: Maybe<ListResponseBaseOfPostView>;
  postView_getPostView?: Maybe<SingleResponseBaseOfPostView>;
  postView_getPostViews?: Maybe<ListResponseBaseOfPostView>;
  post_getByCategoryId?: Maybe<ListResponseBaseOfPost>;
  post_getByCategoryIds?: Maybe<ListResponseBaseOfPost>;
  post_getByHashtagIds?: Maybe<ListResponseBaseOfPost>;
  post_getByUserId?: Maybe<ListResponseBaseOfPost>;
  post_getCommentCountPerMonth?: Maybe<ListResponseBaseOfMonthlyReportDto>;
  post_getCommentCountPerYear?: Maybe<ListResponseBaseOfYearlyReportDto>;
  post_getFollowingPosts?: Maybe<ListResponseBaseOfPost>;
  post_getLikeCountPerMonth?: Maybe<ListResponseBaseOfMonthlyReportDto>;
  post_getLikeCountPerYear?: Maybe<ListResponseBaseOfYearlyReportDto>;
  post_getMostCommentedPosts?: Maybe<ListResponseBaseOfPost>;
  post_getMostPopular?: Maybe<ListResponseBaseOfPost>;
  post_getPost?: Maybe<SingleResponseBaseOfPost>;
  post_getPostCountPerMonth?: Maybe<ListResponseBaseOfMonthlyReportDto>;
  post_getPostCountPerYear?: Maybe<ListResponseBaseOfYearlyReportDto>;
  post_getPosts?: Maybe<ListResponseBaseOfPost>;
  post_getPostsByCategoryAndFileType?: Maybe<ListResponseBaseOfPostsByCategoryAndFileTypeDto>;
  post_getPostsNearMe?: Maybe<ListResponseBaseOfPost>;
  post_getUnViewedPosts?: Maybe<ListResponseBaseOfPost>;
  reportCommen_getReportCommen?: Maybe<SingleResponseBaseOfReportComment>;
  reportCommen_getReportComment?: Maybe<ListResponseBaseOfReportComment>;
  reportComment_getByCommentId?: Maybe<ListResponseBaseOfReportComment>;
  reportComment_getByReporterUserId?: Maybe<ListResponseBaseOfReportComment>;
  reportComment_getReportComment?: Maybe<SingleResponseBaseOfReportComment>;
  reportComment_getReportComments?: Maybe<ListResponseBaseOfReportComment>;
  reportPos_getReportPos?: Maybe<SingleResponseBaseOfReportPost>;
  reportPos_getReportPost?: Maybe<ListResponseBaseOfReportPost>;
  reportPost_getByPostId?: Maybe<ListResponseBaseOfReportPost>;
  reportPost_getByReporterUserId?: Maybe<ListResponseBaseOfReportPost>;
  reportPost_getReportPost?: Maybe<SingleResponseBaseOfReportPost>;
  reportPost_getReportPosts?: Maybe<ListResponseBaseOfReportPost>;
  reportTopicPos_getReportTopicPos?: Maybe<SingleResponseBaseOfReportTopicPost>;
  reportTopicPos_getReportTopicPost?: Maybe<ListResponseBaseOfReportTopicPost>;
  reportTopicPostCommen_getReportTopicPostCommen?: Maybe<SingleResponseBaseOfReportTopicPostComment>;
  reportTopicPostCommen_getReportTopicPostComment?: Maybe<ListResponseBaseOfReportTopicPostComment>;
  reportTopicPost_getByReporterUserId?: Maybe<ListResponseBaseOfReportTopicPost>;
  reportTopicPost_getByTopicPostId?: Maybe<ListResponseBaseOfReportTopicPost>;
  reportTopicPost_getReportTopicPost?: Maybe<SingleResponseBaseOfReportTopicPost>;
  reportTopicPost_getReportTopicPosts?: Maybe<ListResponseBaseOfReportTopicPost>;
  reportUse_getReportUse?: Maybe<SingleResponseBaseOfReportUser>;
  reportUse_getReportUser?: Maybe<ListResponseBaseOfReportUser>;
  reportUser_getByReportedUserId?: Maybe<ListResponseBaseOfReportUser>;
  reportUser_getByReporterUserId?: Maybe<ListResponseBaseOfReportUser>;
  reportUser_getReportUser?: Maybe<SingleResponseBaseOfReportUser>;
  reportUser_getReportUsers?: Maybe<ListResponseBaseOfReportUser>;
  topi_getTopi?: Maybe<SingleResponseBaseOfTopic>;
  topi_getTopic?: Maybe<ListResponseBaseOfTopic>;
  topicPos_getTopicPos?: Maybe<SingleResponseBaseOfTopicPost>;
  topicPos_getTopicPost?: Maybe<ListResponseBaseOfTopicPost>;
  topicPostCommen_getTopicPostCommen?: Maybe<SingleResponseBaseOfTopicPostComment>;
  topicPostCommen_getTopicPostComment?: Maybe<ListResponseBaseOfTopicPostComment>;
  topicPostCommentLik_getTopicPostCommentLik?: Maybe<SingleResponseBaseOfTopicPostCommentLike>;
  topicPostCommentLik_getTopicPostCommentLike?: Maybe<ListResponseBaseOfTopicPostCommentLike>;
  topicPostCommentLike_getByTopicPostCommentId?: Maybe<ListResponseBaseOfTopicPostCommentLike>;
  topicPostCommentLike_getByUserId?: Maybe<ListResponseBaseOfTopicPostCommentLike>;
  topicPostCommentLike_getTopicPostCommentLike?: Maybe<SingleResponseBaseOfTopicPostCommentLike>;
  topicPostCommentLike_getTopicPostCommentLikes?: Maybe<ListResponseBaseOfTopicPostCommentLike>;
  topicPostComment_customeGetTopicPostComments?: Maybe<ListResponseBaseOfTopicPostCommentDto>;
  topicPostComment_getByTopicPostId?: Maybe<ListResponseBaseOfTopicPostComment>;
  topicPostComment_getTopicPostComment?: Maybe<SingleResponseBaseOfTopicPostComment>;
  topicPostComment_getTopicPostComments?: Maybe<ListResponseBaseOfTopicPostComment>;
  topicPostLik_getTopicPostLik?: Maybe<SingleResponseBaseOfTopicPostLike>;
  topicPostLik_getTopicPostLike?: Maybe<ListResponseBaseOfTopicPostLike>;
  topicPostLike_getByTopicPostId?: Maybe<ListResponseBaseOfTopicPostLike>;
  topicPostLike_getByUserId?: Maybe<ListResponseBaseOfTopicPostLike>;
  topicPostLike_getTopicPostLike?: Maybe<SingleResponseBaseOfTopicPostLike>;
  topicPostLike_getTopicPostLikes?: Maybe<ListResponseBaseOfTopicPostLike>;
  topicPost_getByHashtagIds?: Maybe<ListResponseBaseOfTopicPost>;
  topicPost_getByTopicId?: Maybe<ListResponseBaseOfTopicPost>;
  topicPost_getByUserId?: Maybe<ListResponseBaseOfTopicPost>;
  topicPost_getTopicPost?: Maybe<SingleResponseBaseOfTopicPost>;
  topicPost_getTopicPosts?: Maybe<ListResponseBaseOfTopicPost>;
  topicUse_getTopicUse?: Maybe<SingleResponseBaseOfTopicUser>;
  topicUse_getTopicUser?: Maybe<ListResponseBaseOfTopicUser>;
  topicUser_getByInvitedByUserId?: Maybe<ListResponseBaseOfTopicUser>;
  topicUser_getByTopicId?: Maybe<ListResponseBaseOfTopicUser>;
  topicUser_getByUserId?: Maybe<ListResponseBaseOfTopicUser>;
  topicUser_getTopicUser?: Maybe<SingleResponseBaseOfTopicUser>;
  topicUser_getTopicUsers?: Maybe<ListResponseBaseOfTopicUser>;
  topic_getMostPopular?: Maybe<ListResponseBaseOfTopic>;
  topic_getTopic?: Maybe<SingleResponseBaseOfTopic>;
  topic_getTopics?: Maybe<ListResponseBaseOfTopic>;
  topic_getTopicsReport?: Maybe<ListResponseBaseOfTopicReportDto>;
  use_getUse?: Maybe<SingleResponseBaseOfUser>;
  use_getUser?: Maybe<ListResponseBaseOfUser>;
  userCategor_getUserCategor?: Maybe<SingleResponseBaseOfUserCategory>;
  userCategor_getUserCategory?: Maybe<ListResponseBaseOfUserCategory>;
  userCategory_getUserCategories?: Maybe<ListResponseBaseOfUserCategory>;
  userCategory_getUserCategory?: Maybe<SingleResponseBaseOfUserCategory>;
  user_getActivestUsers?: Maybe<ListResponseBaseOfUser>;
  user_getAllUsers?: Maybe<ListResponseBaseOfUser>;
  user_getCurrentUser?: Maybe<SingleResponseBaseOfUser>;
  user_getLotusStatus?: Maybe<ResponseBaseOfUserLotusDto>;
  user_getPostLikesPerMonth?: Maybe<ListResponseBaseOfMonthlyReportDto>;
  user_getPostLikesPerYear?: Maybe<ListResponseBaseOfYearlyReportDto>;
  user_getPostViewsPerMonth?: Maybe<ListResponseBaseOfMonthlyReportDto>;
  user_getPostViewsPerYear?: Maybe<ListResponseBaseOfYearlyReportDto>;
  user_getProfile?: Maybe<SingleResponseBaseOfUser>;
  user_getUserCountPerMonth?: Maybe<ListResponseBaseOfMonthlyReportDto>;
  user_getUserCountPerYear?: Maybe<ListResponseBaseOfYearlyReportDto>;
  user_login?: Maybe<ResponseBaseOfUser>;
  user_signIn?: Maybe<SingleResponseBaseOfUser>;
};

export type QueryCommentLike_GetCommentLikeArgs = {
  entityId: Scalars['Int']['input'];
};

export type QueryTopicPostComment_GetByUserIdArgs = {
  userId: Scalars['Int']['input'];
};

export type QueryActivit_GetActivitArgs = {
  entityId: Scalars['Int']['input'];
};

export type QueryActivities_GetByDateRangeArgs = {
  activityType?: InputMaybe<ActivityType>;
  fromDate?: InputMaybe<Scalars['DateTime']['input']>;
  toDate?: InputMaybe<Scalars['DateTime']['input']>;
};

export type QueryActivity_GetActivityArgs = {
  entityId: Scalars['Int']['input'];
};

export type QueryActivity_GetByTargetCommentIdArgs = {
  targetCommentId: Scalars['Int']['input'];
};

export type QueryActivity_GetByTargetPostIdArgs = {
  targetPostId: Scalars['Int']['input'];
};

export type QueryActivity_GetByTargetUserIdArgs = {
  targetUserId: Scalars['Int']['input'];
};

export type QueryActivity_GetByUserIdArgs = {
  userId: Scalars['Int']['input'];
};

export type QueryActivity_GetUsersActivitiesByCountArgs = {
  fromDate: Scalars['DateTime']['input'];
  toDate: Scalars['DateTime']['input'];
};

export type QueryBaseCollectio_GetBaseCollectioArgs = {
  entityId: Scalars['Int']['input'];
};

export type QueryBaseCollection_GetBaseCollectionArgs = {
  entityId: Scalars['Int']['input'];
};

export type QueryBaseCollection_GetByUserIdArgs = {
  userId: Scalars['Int']['input'];
};

export type QueryBloc_GetBlocArgs = {
  entityId: Scalars['Int']['input'];
};

export type QueryBlock_GetBlockArgs = {
  entityId: Scalars['Int']['input'];
};

export type QueryBlock_GetByBlockedUserIdArgs = {
  blockedUserId: Scalars['Int']['input'];
};

export type QueryBlock_GetByBlockerUserIdArgs = {
  blockerUserId: Scalars['Int']['input'];
};

export type QueryCategor_GetCategorArgs = {
  entityId: Scalars['Int']['input'];
};

export type QueryCategory_GetCategoryArgs = {
  entityId: Scalars['Int']['input'];
};

export type QueryCollectio_GetCollectioArgs = {
  entityId: Scalars['Int']['input'];
};

export type QueryCollection_GetByBaseCollectionIdArgs = {
  baseCollectionId: Scalars['Int']['input'];
};

export type QueryCollection_GetByPostIdArgs = {
  postId: Scalars['Int']['input'];
};

export type QueryCollection_GetCollectionArgs = {
  entityId: Scalars['Int']['input'];
};

export type QueryCommen_GetCommenArgs = {
  entityId: Scalars['Int']['input'];
};

export type QueryCommentLik_GetCommentLikArgs = {
  entityId: Scalars['Int']['input'];
};

export type QueryCommentLike_GetByCommentIdArgs = {
  commentId: Scalars['Int']['input'];
};

export type QueryCommentLike_GetByUserIdArgs = {
  userId: Scalars['Int']['input'];
};

export type QueryComment_GetByPostIdArgs = {
  postId: Scalars['Int']['input'];
};

export type QueryComment_GetByUserIdArgs = {
  userId: Scalars['Int']['input'];
};

export type QueryComment_GetCommentArgs = {
  entityId: Scalars['Int']['input'];
};

export type QueryFollo_GetFolloArgs = {
  entityId: Scalars['Int']['input'];
};

export type QueryFollow_CustomeGetFollowersArgs = {
  userId: Scalars['Int']['input'];
};

export type QueryFollow_GetFollowArgs = {
  entityId: Scalars['Int']['input'];
};

export type QueryFollow_GetFollowersArgs = {
  followingId: Scalars['Int']['input'];
};

export type QueryFollow_GetFollowingsArgs = {
  followerId: Scalars['Int']['input'];
};

export type QueryGetArgs = {
  entityId: Scalars['Int']['input'];
};

export type QueryHashta_GetHashtaArgs = {
  entityId: Scalars['Int']['input'];
};

export type QueryHashtag_GetHashtagArgs = {
  entityId: Scalars['Int']['input'];
};

export type QueryMessage_GetConversationArgs = {
  conversationId: Scalars['Int']['input'];
};

export type QueryMessage_GetConversationForUserArgs = {
  otherUserId: Scalars['Int']['input'];
};

export type QueryMessage_GetUserMessagesArgs = {
  includeDeletedRows?: Scalars['Boolean']['input'];
};

export type QueryPos_GetPosArgs = {
  entityId: Scalars['Int']['input'];
};

export type QueryPostCategor_GetPostCategorArgs = {
  entityId: Scalars['Int']['input'];
};

export type QueryPostCategory_GetPostCategoryArgs = {
  entityId: Scalars['Int']['input'];
};

export type QueryPostLik_GetPostLikArgs = {
  entityId: Scalars['Int']['input'];
};

export type QueryPostLike_GetByPostIdArgs = {
  postId: Scalars['Int']['input'];
};

export type QueryPostLike_GetByUserIdArgs = {
  userId: Scalars['Int']['input'];
};

export type QueryPostLike_GetPostLikeArgs = {
  entityId: Scalars['Int']['input'];
};

export type QueryPostSav_GetPostSavArgs = {
  entityId: Scalars['Int']['input'];
};

export type QueryPostSave_GetByPostIdArgs = {
  postId: Scalars['Int']['input'];
};

export type QueryPostSave_GetPostSaveArgs = {
  entityId: Scalars['Int']['input'];
};

export type QueryPostVie_GetPostVieArgs = {
  entityId: Scalars['Int']['input'];
};

export type QueryPostView_GetByPostIdArgs = {
  postId: Scalars['Int']['input'];
};

export type QueryPostView_GetByUserIdArgs = {
  userId: Scalars['Int']['input'];
};

export type QueryPostView_GetPostViewArgs = {
  entityId: Scalars['Int']['input'];
};

export type QueryPost_GetByCategoryIdArgs = {
  categoryId: Scalars['Int']['input'];
};

export type QueryPost_GetByCategoryIdsArgs = {
  categoryIds?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type QueryPost_GetByHashtagIdsArgs = {
  hashtagIds?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type QueryPost_GetByUserIdArgs = {
  userId: Scalars['Int']['input'];
};

export type QueryPost_GetFollowingPostsArgs = {
  categoryIds?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type QueryPost_GetMostPopularArgs = {
  categoryIds?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type QueryPost_GetPostArgs = {
  entityId: Scalars['Int']['input'];
};

export type QueryPost_GetPostCountPerMonthArgs = {
  fileType: FileType;
};

export type QueryPost_GetPostCountPerYearArgs = {
  fileType: FileType;
};

export type QueryPost_GetPostsByCategoryAndFileTypeArgs = {
  fileType: FileType;
  fromDate: Scalars['DateTime']['input'];
  toDate: Scalars['DateTime']['input'];
};

export type QueryPost_GetPostsNearMeArgs = {
  categoryIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  location?: InputMaybe<Scalars['Position']['input']>;
};

export type QueryReportCommen_GetReportCommenArgs = {
  entityId: Scalars['Int']['input'];
};

export type QueryReportComment_GetByCommentIdArgs = {
  commentId: Scalars['Int']['input'];
};

export type QueryReportComment_GetByReporterUserIdArgs = {
  reporterUserId: Scalars['Int']['input'];
};

export type QueryReportComment_GetReportCommentArgs = {
  entityId: Scalars['Int']['input'];
};

export type QueryReportPos_GetReportPosArgs = {
  entityId: Scalars['Int']['input'];
};

export type QueryReportPost_GetByPostIdArgs = {
  postId: Scalars['Int']['input'];
};

export type QueryReportPost_GetByReporterUserIdArgs = {
  reporterUserId: Scalars['Int']['input'];
};

export type QueryReportPost_GetReportPostArgs = {
  entityId: Scalars['Int']['input'];
};

export type QueryReportTopicPos_GetReportTopicPosArgs = {
  entityId: Scalars['Int']['input'];
};

export type QueryReportTopicPostCommen_GetReportTopicPostCommenArgs = {
  entityId: Scalars['Int']['input'];
};

export type QueryReportTopicPost_GetByReporterUserIdArgs = {
  reporterUserId: Scalars['Int']['input'];
};

export type QueryReportTopicPost_GetByTopicPostIdArgs = {
  topicPostId: Scalars['Int']['input'];
};

export type QueryReportTopicPost_GetReportTopicPostArgs = {
  entityId: Scalars['Int']['input'];
};

export type QueryReportUse_GetReportUseArgs = {
  entityId: Scalars['Int']['input'];
};

export type QueryReportUser_GetByReportedUserIdArgs = {
  reportedUserId: Scalars['Int']['input'];
};

export type QueryReportUser_GetByReporterUserIdArgs = {
  reporterUserId: Scalars['Int']['input'];
};

export type QueryReportUser_GetReportUserArgs = {
  entityId: Scalars['Int']['input'];
};

export type QueryTopi_GetTopiArgs = {
  entityId: Scalars['Int']['input'];
};

export type QueryTopicPos_GetTopicPosArgs = {
  entityId: Scalars['Int']['input'];
};

export type QueryTopicPostCommen_GetTopicPostCommenArgs = {
  entityId: Scalars['Int']['input'];
};

export type QueryTopicPostCommentLik_GetTopicPostCommentLikArgs = {
  entityId: Scalars['Int']['input'];
};

export type QueryTopicPostCommentLike_GetByTopicPostCommentIdArgs = {
  topicPostCommentId: Scalars['Int']['input'];
};

export type QueryTopicPostCommentLike_GetByUserIdArgs = {
  userId: Scalars['Int']['input'];
};

export type QueryTopicPostCommentLike_GetTopicPostCommentLikeArgs = {
  entityId: Scalars['Int']['input'];
};

export type QueryTopicPostComment_GetByTopicPostIdArgs = {
  topicPostId: Scalars['Int']['input'];
};

export type QueryTopicPostComment_GetTopicPostCommentArgs = {
  entityId: Scalars['Int']['input'];
};

export type QueryTopicPostLik_GetTopicPostLikArgs = {
  entityId: Scalars['Int']['input'];
};

export type QueryTopicPostLike_GetByTopicPostIdArgs = {
  topicPostId: Scalars['Int']['input'];
};

export type QueryTopicPostLike_GetByUserIdArgs = {
  userId: Scalars['Int']['input'];
};

export type QueryTopicPostLike_GetTopicPostLikeArgs = {
  entityId: Scalars['Int']['input'];
};

export type QueryTopicPost_GetByHashtagIdsArgs = {
  hashtagIds?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type QueryTopicPost_GetByTopicIdArgs = {
  topicId: Scalars['Int']['input'];
};

export type QueryTopicPost_GetByUserIdArgs = {
  userId: Scalars['Int']['input'];
};

export type QueryTopicPost_GetTopicPostArgs = {
  entityId: Scalars['Int']['input'];
};

export type QueryTopicUse_GetTopicUseArgs = {
  entityId: Scalars['Int']['input'];
};

export type QueryTopicUser_GetByInvitedByUserIdArgs = {
  userId: Scalars['Int']['input'];
};

export type QueryTopicUser_GetByTopicIdArgs = {
  topicId: Scalars['Int']['input'];
};

export type QueryTopicUser_GetByUserIdArgs = {
  userId: Scalars['Int']['input'];
};

export type QueryTopicUser_GetTopicUserArgs = {
  entityId: Scalars['Int']['input'];
};

export type QueryTopic_GetTopicArgs = {
  entityId: Scalars['Int']['input'];
};

export type QueryUse_GetUseArgs = {
  entityId: Scalars['Int']['input'];
};

export type QueryUserCategor_GetUserCategorArgs = {
  entityId: Scalars['Int']['input'];
};

export type QueryUserCategory_GetUserCategoryArgs = {
  entityId: Scalars['Int']['input'];
};

export type QueryUser_GetActivestUsersArgs = {
  activityType: ActivityType;
  fromDate?: InputMaybe<Scalars['DateTime']['input']>;
  toDate?: InputMaybe<Scalars['DateTime']['input']>;
};

export type QueryUser_GetPostLikesPerMonthArgs = {
  userId?: InputMaybe<Scalars['Int']['input']>;
};

export type QueryUser_GetPostLikesPerYearArgs = {
  userId?: InputMaybe<Scalars['Int']['input']>;
};

export type QueryUser_GetPostViewsPerMonthArgs = {
  userId?: InputMaybe<Scalars['Int']['input']>;
};

export type QueryUser_GetPostViewsPerYearArgs = {
  userId?: InputMaybe<Scalars['Int']['input']>;
};

export type QueryUser_GetProfileArgs = {
  userId?: InputMaybe<Scalars['Int']['input']>;
};

export type ReferredUserDto = {
  __typename?: 'ReferredUserDto';
  createdAt: Scalars['DateTime']['output'];
  fullName?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  photoUrl?: Maybe<Scalars['String']['output']>;
};

export type ReportComment = {
  __typename?: 'ReportComment';
  admin?: Maybe<User>;
  adminId?: Maybe<Scalars['Int']['output']>;
  comment?: Maybe<Comment>;
  commentId: Scalars['Int']['output'];
  createdDate: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  isDeleted: Scalars['Boolean']['output'];
  isReviewed: Scalars['Boolean']['output'];
  lastModifiedDate?: Maybe<Scalars['DateTime']['output']>;
  reporterUser?: Maybe<User>;
  reporterUserId: Scalars['Int']['output'];
  violationType: ViolationType;
};

export type ReportCommentCollectionSegment = {
  __typename?: 'ReportCommentCollectionSegment';
  items?: Maybe<Array<Maybe<ReportComment>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type ReportCommentFilterInput = {
  admin?: InputMaybe<UserFilterInput>;
  adminId?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  and?: InputMaybe<Array<ReportCommentFilterInput>>;
  comment?: InputMaybe<CommentFilterInput>;
  commentId?: InputMaybe<ComparableInt32OperationFilterInput>;
  createdDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  description?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  isReviewed?: InputMaybe<BooleanOperationFilterInput>;
  lastModifiedDate?: InputMaybe<ComparableNullableOfDateTimeOperationFilterInput>;
  or?: InputMaybe<Array<ReportCommentFilterInput>>;
  reporterUser?: InputMaybe<UserFilterInput>;
  reporterUserId?: InputMaybe<ComparableInt32OperationFilterInput>;
  violationType?: InputMaybe<ViolationTypeOperationFilterInput>;
};

export type ReportCommentInput = {
  adminId?: InputMaybe<Scalars['Int']['input']>;
  commentId: Scalars['Int']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  isReviewed: Scalars['Boolean']['input'];
  reporterUserId: Scalars['Int']['input'];
  violationType: ViolationType;
};

export type ReportCommentSortInput = {
  admin?: InputMaybe<UserSortInput>;
  adminId?: InputMaybe<SortEnumType>;
  comment?: InputMaybe<CommentSortInput>;
  commentId?: InputMaybe<SortEnumType>;
  createdDate?: InputMaybe<SortEnumType>;
  description?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  isReviewed?: InputMaybe<SortEnumType>;
  lastModifiedDate?: InputMaybe<SortEnumType>;
  reporterUser?: InputMaybe<UserSortInput>;
  reporterUserId?: InputMaybe<SortEnumType>;
  violationType?: InputMaybe<SortEnumType>;
};

export type ReportPost = {
  __typename?: 'ReportPost';
  admin?: Maybe<User>;
  adminId?: Maybe<Scalars['Int']['output']>;
  createdDate: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  isDeleted: Scalars['Boolean']['output'];
  isReviewed: Scalars['Boolean']['output'];
  lastModifiedDate?: Maybe<Scalars['DateTime']['output']>;
  post?: Maybe<Post>;
  postId: Scalars['Int']['output'];
  reporterUser?: Maybe<User>;
  reporterUserId: Scalars['Int']['output'];
  violationType: ViolationType;
};

export type ReportPostCollectionSegment = {
  __typename?: 'ReportPostCollectionSegment';
  items?: Maybe<Array<Maybe<ReportPost>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type ReportPostFilterInput = {
  admin?: InputMaybe<UserFilterInput>;
  adminId?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  and?: InputMaybe<Array<ReportPostFilterInput>>;
  createdDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  description?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  isReviewed?: InputMaybe<BooleanOperationFilterInput>;
  lastModifiedDate?: InputMaybe<ComparableNullableOfDateTimeOperationFilterInput>;
  or?: InputMaybe<Array<ReportPostFilterInput>>;
  post?: InputMaybe<PostFilterInput>;
  postId?: InputMaybe<ComparableInt32OperationFilterInput>;
  reporterUser?: InputMaybe<UserFilterInput>;
  reporterUserId?: InputMaybe<ComparableInt32OperationFilterInput>;
  violationType?: InputMaybe<ViolationTypeOperationFilterInput>;
};

export type ReportPostInput = {
  adminId?: InputMaybe<Scalars['Int']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  isReviewed: Scalars['Boolean']['input'];
  postId: Scalars['Int']['input'];
  reporterUserId: Scalars['Int']['input'];
  violationType: ViolationType;
};

export type ReportPostSortInput = {
  admin?: InputMaybe<UserSortInput>;
  adminId?: InputMaybe<SortEnumType>;
  createdDate?: InputMaybe<SortEnumType>;
  description?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  isReviewed?: InputMaybe<SortEnumType>;
  lastModifiedDate?: InputMaybe<SortEnumType>;
  post?: InputMaybe<PostSortInput>;
  postId?: InputMaybe<SortEnumType>;
  reporterUser?: InputMaybe<UserSortInput>;
  reporterUserId?: InputMaybe<SortEnumType>;
  violationType?: InputMaybe<SortEnumType>;
};

export type ReportTopicPost = {
  __typename?: 'ReportTopicPost';
  admin?: Maybe<User>;
  adminId?: Maybe<Scalars['Int']['output']>;
  createdDate: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  isDeleted: Scalars['Boolean']['output'];
  isReviewed: Scalars['Boolean']['output'];
  lastModifiedDate?: Maybe<Scalars['DateTime']['output']>;
  reporterUser?: Maybe<User>;
  reporterUserId: Scalars['Int']['output'];
  topicPost?: Maybe<TopicPost>;
  topicPostId: Scalars['Int']['output'];
  violationType: ViolationType;
};

export type ReportTopicPostCollectionSegment = {
  __typename?: 'ReportTopicPostCollectionSegment';
  items?: Maybe<Array<Maybe<ReportTopicPost>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type ReportTopicPostComment = {
  __typename?: 'ReportTopicPostComment';
  admin?: Maybe<User>;
  adminId?: Maybe<Scalars['Int']['output']>;
  createdDate: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  isDeleted: Scalars['Boolean']['output'];
  isReviewed: Scalars['Boolean']['output'];
  lastModifiedDate?: Maybe<Scalars['DateTime']['output']>;
  reporterUser?: Maybe<User>;
  reporterUserId: Scalars['Int']['output'];
  topicPostComment?: Maybe<TopicPostComment>;
  topicPostCommentId: Scalars['Int']['output'];
  violationType: ViolationType;
};

export type ReportTopicPostCommentCollectionSegment = {
  __typename?: 'ReportTopicPostCommentCollectionSegment';
  items?: Maybe<Array<Maybe<ReportTopicPostComment>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type ReportTopicPostCommentFilterInput = {
  admin?: InputMaybe<UserFilterInput>;
  adminId?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  and?: InputMaybe<Array<ReportTopicPostCommentFilterInput>>;
  createdDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  description?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  isReviewed?: InputMaybe<BooleanOperationFilterInput>;
  lastModifiedDate?: InputMaybe<ComparableNullableOfDateTimeOperationFilterInput>;
  or?: InputMaybe<Array<ReportTopicPostCommentFilterInput>>;
  reporterUser?: InputMaybe<UserFilterInput>;
  reporterUserId?: InputMaybe<ComparableInt32OperationFilterInput>;
  topicPostComment?: InputMaybe<TopicPostCommentFilterInput>;
  topicPostCommentId?: InputMaybe<ComparableInt32OperationFilterInput>;
  violationType?: InputMaybe<ViolationTypeOperationFilterInput>;
};

export type ReportTopicPostCommentInput = {
  adminId?: InputMaybe<Scalars['Int']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  isReviewed: Scalars['Boolean']['input'];
  reporterUserId: Scalars['Int']['input'];
  topicPostCommentId: Scalars['Int']['input'];
  violationType: ViolationType;
};

export type ReportTopicPostCommentSortInput = {
  admin?: InputMaybe<UserSortInput>;
  adminId?: InputMaybe<SortEnumType>;
  createdDate?: InputMaybe<SortEnumType>;
  description?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  isReviewed?: InputMaybe<SortEnumType>;
  lastModifiedDate?: InputMaybe<SortEnumType>;
  reporterUser?: InputMaybe<UserSortInput>;
  reporterUserId?: InputMaybe<SortEnumType>;
  topicPostComment?: InputMaybe<TopicPostCommentSortInput>;
  topicPostCommentId?: InputMaybe<SortEnumType>;
  violationType?: InputMaybe<SortEnumType>;
};

export type ReportTopicPostFilterInput = {
  admin?: InputMaybe<UserFilterInput>;
  adminId?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  and?: InputMaybe<Array<ReportTopicPostFilterInput>>;
  createdDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  description?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  isReviewed?: InputMaybe<BooleanOperationFilterInput>;
  lastModifiedDate?: InputMaybe<ComparableNullableOfDateTimeOperationFilterInput>;
  or?: InputMaybe<Array<ReportTopicPostFilterInput>>;
  reporterUser?: InputMaybe<UserFilterInput>;
  reporterUserId?: InputMaybe<ComparableInt32OperationFilterInput>;
  topicPost?: InputMaybe<TopicPostFilterInput>;
  topicPostId?: InputMaybe<ComparableInt32OperationFilterInput>;
  violationType?: InputMaybe<ViolationTypeOperationFilterInput>;
};

export type ReportTopicPostInput = {
  adminId?: InputMaybe<Scalars['Int']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  isReviewed: Scalars['Boolean']['input'];
  reporterUserId: Scalars['Int']['input'];
  topicPostId: Scalars['Int']['input'];
  violationType: ViolationType;
};

export type ReportTopicPostSortInput = {
  admin?: InputMaybe<UserSortInput>;
  adminId?: InputMaybe<SortEnumType>;
  createdDate?: InputMaybe<SortEnumType>;
  description?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  isReviewed?: InputMaybe<SortEnumType>;
  lastModifiedDate?: InputMaybe<SortEnumType>;
  reporterUser?: InputMaybe<UserSortInput>;
  reporterUserId?: InputMaybe<SortEnumType>;
  topicPost?: InputMaybe<TopicPostSortInput>;
  topicPostId?: InputMaybe<SortEnumType>;
  violationType?: InputMaybe<SortEnumType>;
};

export type ReportUser = {
  __typename?: 'ReportUser';
  admin?: Maybe<User>;
  adminId?: Maybe<Scalars['Int']['output']>;
  createdDate: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  isDeleted: Scalars['Boolean']['output'];
  isReviewed: Scalars['Boolean']['output'];
  lastModifiedDate?: Maybe<Scalars['DateTime']['output']>;
  reportedUser?: Maybe<User>;
  reportedUserId: Scalars['Int']['output'];
  reporterUser?: Maybe<User>;
  reporterUserId: Scalars['Int']['output'];
  violationType: ViolationType;
};

export type ReportUserCollectionSegment = {
  __typename?: 'ReportUserCollectionSegment';
  items?: Maybe<Array<Maybe<ReportUser>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type ReportUserFilterInput = {
  admin?: InputMaybe<UserFilterInput>;
  adminId?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  and?: InputMaybe<Array<ReportUserFilterInput>>;
  createdDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  description?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  isReviewed?: InputMaybe<BooleanOperationFilterInput>;
  lastModifiedDate?: InputMaybe<ComparableNullableOfDateTimeOperationFilterInput>;
  or?: InputMaybe<Array<ReportUserFilterInput>>;
  reportedUser?: InputMaybe<UserFilterInput>;
  reportedUserId?: InputMaybe<ComparableInt32OperationFilterInput>;
  reporterUser?: InputMaybe<UserFilterInput>;
  reporterUserId?: InputMaybe<ComparableInt32OperationFilterInput>;
  violationType?: InputMaybe<ViolationTypeOperationFilterInput>;
};

export type ReportUserInput = {
  adminId?: InputMaybe<Scalars['Int']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  isReviewed: Scalars['Boolean']['input'];
  reportedUserId: Scalars['Int']['input'];
  reporterUserId: Scalars['Int']['input'];
  violationType: ViolationType;
};

export type ReportUserSortInput = {
  admin?: InputMaybe<UserSortInput>;
  adminId?: InputMaybe<SortEnumType>;
  createdDate?: InputMaybe<SortEnumType>;
  description?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  isReviewed?: InputMaybe<SortEnumType>;
  lastModifiedDate?: InputMaybe<SortEnumType>;
  reportedUser?: InputMaybe<UserSortInput>;
  reportedUserId?: InputMaybe<SortEnumType>;
  reporterUser?: InputMaybe<UserSortInput>;
  reporterUserId?: InputMaybe<SortEnumType>;
  violationType?: InputMaybe<SortEnumType>;
};

export type ResponseBase = {
  __typename?: 'ResponseBase';
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfActivity = {
  __typename?: 'ResponseBaseOfActivity';
  result?: Maybe<Activity>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfBaseCollection = {
  __typename?: 'ResponseBaseOfBaseCollection';
  result?: Maybe<BaseCollection>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfBlock = {
  __typename?: 'ResponseBaseOfBlock';
  result?: Maybe<Block>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfBuddyDto = {
  __typename?: 'ResponseBaseOfBuddyDto';
  result?: Maybe<BuddyDto>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfCategory = {
  __typename?: 'ResponseBaseOfCategory';
  result?: Maybe<Category>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfCollection = {
  __typename?: 'ResponseBaseOfCollection';
  result?: Maybe<Collection>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfComment = {
  __typename?: 'ResponseBaseOfComment';
  result?: Maybe<Comment>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfCommentLike = {
  __typename?: 'ResponseBaseOfCommentLike';
  result?: Maybe<CommentLike>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfConversation = {
  __typename?: 'ResponseBaseOfConversation';
  result?: Maybe<Conversation>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfFollow = {
  __typename?: 'ResponseBaseOfFollow';
  result?: Maybe<Follow>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfMessage = {
  __typename?: 'ResponseBaseOfMessage';
  result?: Maybe<Message>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfNotification = {
  __typename?: 'ResponseBaseOfNotification';
  result?: Maybe<Notification>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfPost = {
  __typename?: 'ResponseBaseOfPost';
  result?: Maybe<Post>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfPostCategory = {
  __typename?: 'ResponseBaseOfPostCategory';
  result?: Maybe<PostCategory>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfPostLike = {
  __typename?: 'ResponseBaseOfPostLike';
  result?: Maybe<PostLike>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfPostSave = {
  __typename?: 'ResponseBaseOfPostSave';
  result?: Maybe<PostSave>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfPostView = {
  __typename?: 'ResponseBaseOfPostView';
  result?: Maybe<PostView>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfReportComment = {
  __typename?: 'ResponseBaseOfReportComment';
  result?: Maybe<ReportComment>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfReportPost = {
  __typename?: 'ResponseBaseOfReportPost';
  result?: Maybe<ReportPost>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfReportTopicPost = {
  __typename?: 'ResponseBaseOfReportTopicPost';
  result?: Maybe<ReportTopicPost>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfReportTopicPostComment = {
  __typename?: 'ResponseBaseOfReportTopicPostComment';
  result?: Maybe<ReportTopicPostComment>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfReportUser = {
  __typename?: 'ResponseBaseOfReportUser';
  result?: Maybe<ReportUser>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfTopic = {
  __typename?: 'ResponseBaseOfTopic';
  result?: Maybe<Topic>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfTopicPost = {
  __typename?: 'ResponseBaseOfTopicPost';
  result?: Maybe<TopicPost>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfTopicPostComment = {
  __typename?: 'ResponseBaseOfTopicPostComment';
  result?: Maybe<TopicPostComment>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfTopicPostCommentLike = {
  __typename?: 'ResponseBaseOfTopicPostCommentLike';
  result?: Maybe<TopicPostCommentLike>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfTopicPostLike = {
  __typename?: 'ResponseBaseOfTopicPostLike';
  result?: Maybe<TopicPostLike>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfTopicUser = {
  __typename?: 'ResponseBaseOfTopicUser';
  result?: Maybe<TopicUser>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfUser = {
  __typename?: 'ResponseBaseOfUser';
  result?: Maybe<User>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfUserCategory = {
  __typename?: 'ResponseBaseOfUserCategory';
  result?: Maybe<UserCategory>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfUserLotusDto = {
  __typename?: 'ResponseBaseOfUserLotusDto';
  result?: Maybe<UserLotusDto>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseStatus = {
  __typename?: 'ResponseStatus';
  code: Scalars['Int']['output'];
  value?: Maybe<Scalars['String']['output']>;
};

export type SingleResponseBaseOfActivity = {
  __typename?: 'SingleResponseBaseOfActivity';
  result?: Maybe<Activity>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type SingleResponseBaseOfBaseCollection = {
  __typename?: 'SingleResponseBaseOfBaseCollection';
  result?: Maybe<BaseCollection>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type SingleResponseBaseOfBlock = {
  __typename?: 'SingleResponseBaseOfBlock';
  result?: Maybe<Block>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type SingleResponseBaseOfCategory = {
  __typename?: 'SingleResponseBaseOfCategory';
  result?: Maybe<Category>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type SingleResponseBaseOfCollection = {
  __typename?: 'SingleResponseBaseOfCollection';
  result?: Maybe<Collection>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type SingleResponseBaseOfComment = {
  __typename?: 'SingleResponseBaseOfComment';
  result?: Maybe<Comment>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type SingleResponseBaseOfCommentLike = {
  __typename?: 'SingleResponseBaseOfCommentLike';
  result?: Maybe<CommentLike>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type SingleResponseBaseOfFollow = {
  __typename?: 'SingleResponseBaseOfFollow';
  result?: Maybe<Follow>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type SingleResponseBaseOfHashtag = {
  __typename?: 'SingleResponseBaseOfHashtag';
  result?: Maybe<Hashtag>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type SingleResponseBaseOfPost = {
  __typename?: 'SingleResponseBaseOfPost';
  result?: Maybe<Post>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type SingleResponseBaseOfPostCategory = {
  __typename?: 'SingleResponseBaseOfPostCategory';
  result?: Maybe<PostCategory>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type SingleResponseBaseOfPostLike = {
  __typename?: 'SingleResponseBaseOfPostLike';
  result?: Maybe<PostLike>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type SingleResponseBaseOfPostSave = {
  __typename?: 'SingleResponseBaseOfPostSave';
  result?: Maybe<PostSave>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type SingleResponseBaseOfPostView = {
  __typename?: 'SingleResponseBaseOfPostView';
  result?: Maybe<PostView>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type SingleResponseBaseOfReportComment = {
  __typename?: 'SingleResponseBaseOfReportComment';
  result?: Maybe<ReportComment>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type SingleResponseBaseOfReportPost = {
  __typename?: 'SingleResponseBaseOfReportPost';
  result?: Maybe<ReportPost>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type SingleResponseBaseOfReportTopicPost = {
  __typename?: 'SingleResponseBaseOfReportTopicPost';
  result?: Maybe<ReportTopicPost>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type SingleResponseBaseOfReportTopicPostComment = {
  __typename?: 'SingleResponseBaseOfReportTopicPostComment';
  result?: Maybe<ReportTopicPostComment>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type SingleResponseBaseOfReportUser = {
  __typename?: 'SingleResponseBaseOfReportUser';
  result?: Maybe<ReportUser>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type SingleResponseBaseOfTopic = {
  __typename?: 'SingleResponseBaseOfTopic';
  result?: Maybe<Topic>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type SingleResponseBaseOfTopicPost = {
  __typename?: 'SingleResponseBaseOfTopicPost';
  result?: Maybe<TopicPost>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type SingleResponseBaseOfTopicPostComment = {
  __typename?: 'SingleResponseBaseOfTopicPostComment';
  result?: Maybe<TopicPostComment>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type SingleResponseBaseOfTopicPostCommentLike = {
  __typename?: 'SingleResponseBaseOfTopicPostCommentLike';
  result?: Maybe<TopicPostCommentLike>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type SingleResponseBaseOfTopicPostLike = {
  __typename?: 'SingleResponseBaseOfTopicPostLike';
  result?: Maybe<TopicPostLike>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type SingleResponseBaseOfTopicUser = {
  __typename?: 'SingleResponseBaseOfTopicUser';
  result?: Maybe<TopicUser>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type SingleResponseBaseOfUser = {
  __typename?: 'SingleResponseBaseOfUser';
  result?: Maybe<User>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type SingleResponseBaseOfUserCategory = {
  __typename?: 'SingleResponseBaseOfUserCategory';
  result?: Maybe<UserCategory>;
  status?: Maybe<Scalars['Any']['output']>;
};

export enum SortEnumType {
  Asc = 'ASC',
  Desc = 'DESC',
}

export type StringOperationFilterInput = {
  and?: InputMaybe<Array<StringOperationFilterInput>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  eq?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  ncontains?: InputMaybe<Scalars['String']['input']>;
  nendsWith?: InputMaybe<Scalars['String']['input']>;
  neq?: InputMaybe<Scalars['String']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  nstartsWith?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<StringOperationFilterInput>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  messageAdded?: Maybe<Message>;
  notificationAdded?: Maybe<Notification>;
  testSubscription: Scalars['Int']['output'];
};

export type SubscriptionMessageAddedArgs = {
  userId: Scalars['Int']['input'];
};

export type SubscriptionNotificationAddedArgs = {
  userId: Scalars['Int']['input'];
};

export type Topic = {
  __typename?: 'Topic';
  createdDate: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  isDeleted: Scalars['Boolean']['output'];
  lastModifiedDate?: Maybe<Scalars['DateTime']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  topicPosts?: Maybe<Array<Maybe<TopicPost>>>;
  topicUsers?: Maybe<Array<Maybe<TopicUser>>>;
};

export type TopicCollectionSegment = {
  __typename?: 'TopicCollectionSegment';
  items?: Maybe<Array<Maybe<Topic>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type TopicFilterInput = {
  and?: InputMaybe<Array<TopicFilterInput>>;
  createdDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  description?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  lastModifiedDate?: InputMaybe<ComparableNullableOfDateTimeOperationFilterInput>;
  or?: InputMaybe<Array<TopicFilterInput>>;
  title?: InputMaybe<StringOperationFilterInput>;
  topicPosts?: InputMaybe<ListFilterInputTypeOfTopicPostFilterInput>;
  topicUsers?: InputMaybe<ListFilterInputTypeOfTopicUserFilterInput>;
};

export type TopicInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type TopicPost = {
  __typename?: 'TopicPost';
  caption?: Maybe<Scalars['String']['output']>;
  commentCount?: Maybe<Scalars['Int']['output']>;
  createdDate: Scalars['DateTime']['output'];
  fileType: FileType;
  fileUrl?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  isDeleted: Scalars['Boolean']['output'];
  lastModifiedDate?: Maybe<Scalars['DateTime']['output']>;
  likeCount: Scalars['Int']['output'];
  reportCount?: Maybe<Scalars['Int']['output']>;
  reportTopicPosts?: Maybe<Array<Maybe<ReportTopicPost>>>;
  setAsRecommended: Scalars['Boolean']['output'];
  topic?: Maybe<Topic>;
  topicId: Scalars['Int']['output'];
  topicPostComments?: Maybe<Array<Maybe<TopicPostComment>>>;
  topicPostHashtags?: Maybe<Array<Maybe<TopicPostHashtag>>>;
  topicPostLikes?: Maybe<Array<Maybe<TopicPostLike>>>;
  user?: Maybe<User>;
  userId: Scalars['Int']['output'];
  viewCount: Scalars['Int']['output'];
};

export type TopicPostCollectionSegment = {
  __typename?: 'TopicPostCollectionSegment';
  items?: Maybe<Array<Maybe<TopicPost>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type TopicPostComment = {
  __typename?: 'TopicPostComment';
  childComments?: Maybe<Array<Maybe<TopicPostComment>>>;
  commentText?: Maybe<Scalars['String']['output']>;
  createdDate: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  isDeleted: Scalars['Boolean']['output'];
  lastModifiedDate?: Maybe<Scalars['DateTime']['output']>;
  likeCount: Scalars['Int']['output'];
  parent?: Maybe<TopicPostComment>;
  parentId?: Maybe<Scalars['Int']['output']>;
  topicPost?: Maybe<TopicPost>;
  topicPostCommentLikes?: Maybe<Array<Maybe<TopicPostCommentLike>>>;
  topicPostId: Scalars['Int']['output'];
  user?: Maybe<User>;
  userId: Scalars['Int']['output'];
};

export type TopicPostCommentCollectionSegment = {
  __typename?: 'TopicPostCommentCollectionSegment';
  items?: Maybe<Array<Maybe<TopicPostComment>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type TopicPostCommentDto = {
  __typename?: 'TopicPostCommentDto';
  commentText?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  isLiked: Scalars['Boolean']['output'];
  likeCount: Scalars['Int']['output'];
  parentId?: Maybe<Scalars['Int']['output']>;
  replyCount: Scalars['Int']['output'];
  topicPost?: Maybe<TopicPost>;
  topicPostCommentLikes?: Maybe<Array<Maybe<TopicPostCommentLike>>>;
  topicPostId: Scalars['Int']['output'];
  user?: Maybe<User>;
  userId: Scalars['Int']['output'];
};

export type TopicPostCommentDtoCollectionSegment = {
  __typename?: 'TopicPostCommentDtoCollectionSegment';
  items?: Maybe<Array<Maybe<TopicPostCommentDto>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type TopicPostCommentDtoFilterInput = {
  and?: InputMaybe<Array<TopicPostCommentDtoFilterInput>>;
  commentText?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  isLiked?: InputMaybe<BooleanOperationFilterInput>;
  likeCount?: InputMaybe<ComparableInt32OperationFilterInput>;
  or?: InputMaybe<Array<TopicPostCommentDtoFilterInput>>;
  parentId?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  replyCount?: InputMaybe<ComparableInt32OperationFilterInput>;
  topicPost?: InputMaybe<TopicPostFilterInput>;
  topicPostCommentLikes?: InputMaybe<ListFilterInputTypeOfTopicPostCommentLikeFilterInput>;
  topicPostId?: InputMaybe<ComparableInt32OperationFilterInput>;
  user?: InputMaybe<UserFilterInput>;
  userId?: InputMaybe<ComparableInt32OperationFilterInput>;
};

export type TopicPostCommentDtoSortInput = {
  commentText?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isLiked?: InputMaybe<SortEnumType>;
  likeCount?: InputMaybe<SortEnumType>;
  parentId?: InputMaybe<SortEnumType>;
  replyCount?: InputMaybe<SortEnumType>;
  topicPost?: InputMaybe<TopicPostSortInput>;
  topicPostId?: InputMaybe<SortEnumType>;
  user?: InputMaybe<UserSortInput>;
  userId?: InputMaybe<SortEnumType>;
};

export type TopicPostCommentFilterInput = {
  and?: InputMaybe<Array<TopicPostCommentFilterInput>>;
  childComments?: InputMaybe<ListFilterInputTypeOfTopicPostCommentFilterInput>;
  commentText?: InputMaybe<StringOperationFilterInput>;
  createdDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  lastModifiedDate?: InputMaybe<ComparableNullableOfDateTimeOperationFilterInput>;
  likeCount?: InputMaybe<ComparableInt32OperationFilterInput>;
  or?: InputMaybe<Array<TopicPostCommentFilterInput>>;
  parent?: InputMaybe<TopicPostCommentFilterInput>;
  parentId?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  topicPost?: InputMaybe<TopicPostFilterInput>;
  topicPostCommentLikes?: InputMaybe<ListFilterInputTypeOfTopicPostCommentLikeFilterInput>;
  topicPostId?: InputMaybe<ComparableInt32OperationFilterInput>;
  user?: InputMaybe<UserFilterInput>;
  userId?: InputMaybe<ComparableInt32OperationFilterInput>;
};

export type TopicPostCommentInput = {
  commentText?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  likeCount: Scalars['Int']['input'];
  parentId?: InputMaybe<Scalars['Int']['input']>;
  topicPostId: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
};

export type TopicPostCommentLike = {
  __typename?: 'TopicPostCommentLike';
  createdDate: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  isDeleted: Scalars['Boolean']['output'];
  lastModifiedDate?: Maybe<Scalars['DateTime']['output']>;
  topicPostComment?: Maybe<TopicPostComment>;
  topicPostCommentId: Scalars['Int']['output'];
  user?: Maybe<User>;
  userId: Scalars['Int']['output'];
};

export type TopicPostCommentLikeCollectionSegment = {
  __typename?: 'TopicPostCommentLikeCollectionSegment';
  items?: Maybe<Array<Maybe<TopicPostCommentLike>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type TopicPostCommentLikeFilterInput = {
  and?: InputMaybe<Array<TopicPostCommentLikeFilterInput>>;
  createdDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  lastModifiedDate?: InputMaybe<ComparableNullableOfDateTimeOperationFilterInput>;
  or?: InputMaybe<Array<TopicPostCommentLikeFilterInput>>;
  topicPostComment?: InputMaybe<TopicPostCommentFilterInput>;
  topicPostCommentId?: InputMaybe<ComparableInt32OperationFilterInput>;
  user?: InputMaybe<UserFilterInput>;
  userId?: InputMaybe<ComparableInt32OperationFilterInput>;
};

export type TopicPostCommentLikeInput = {
  id?: InputMaybe<Scalars['Int']['input']>;
  topicPostCommentId: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
};

export type TopicPostCommentLikeSortInput = {
  createdDate?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  lastModifiedDate?: InputMaybe<SortEnumType>;
  topicPostComment?: InputMaybe<TopicPostCommentSortInput>;
  topicPostCommentId?: InputMaybe<SortEnumType>;
  user?: InputMaybe<UserSortInput>;
  userId?: InputMaybe<SortEnumType>;
};

export type TopicPostCommentSortInput = {
  commentText?: InputMaybe<SortEnumType>;
  createdDate?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  lastModifiedDate?: InputMaybe<SortEnumType>;
  likeCount?: InputMaybe<SortEnumType>;
  parent?: InputMaybe<TopicPostCommentSortInput>;
  parentId?: InputMaybe<SortEnumType>;
  topicPost?: InputMaybe<TopicPostSortInput>;
  topicPostId?: InputMaybe<SortEnumType>;
  user?: InputMaybe<UserSortInput>;
  userId?: InputMaybe<SortEnumType>;
};

export type TopicPostFilterInput = {
  and?: InputMaybe<Array<TopicPostFilterInput>>;
  caption?: InputMaybe<StringOperationFilterInput>;
  commentCount?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  createdDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  fileType?: InputMaybe<FileTypeOperationFilterInput>;
  fileUrl?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  lastModifiedDate?: InputMaybe<ComparableNullableOfDateTimeOperationFilterInput>;
  likeCount?: InputMaybe<ComparableInt32OperationFilterInput>;
  or?: InputMaybe<Array<TopicPostFilterInput>>;
  reportCount?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  reportTopicPosts?: InputMaybe<ListFilterInputTypeOfReportTopicPostFilterInput>;
  setAsRecommended?: InputMaybe<BooleanOperationFilterInput>;
  topic?: InputMaybe<TopicFilterInput>;
  topicId?: InputMaybe<ComparableInt32OperationFilterInput>;
  topicPostComments?: InputMaybe<ListFilterInputTypeOfTopicPostCommentFilterInput>;
  topicPostHashtags?: InputMaybe<ListFilterInputTypeOfTopicPostHashtagFilterInput>;
  topicPostLikes?: InputMaybe<ListFilterInputTypeOfTopicPostLikeFilterInput>;
  user?: InputMaybe<UserFilterInput>;
  userId?: InputMaybe<ComparableInt32OperationFilterInput>;
  viewCount?: InputMaybe<ComparableInt32OperationFilterInput>;
};

export type TopicPostHashtag = {
  __typename?: 'TopicPostHashtag';
  createdDate: Scalars['DateTime']['output'];
  hashtag?: Maybe<Hashtag>;
  hashtagId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  isDeleted: Scalars['Boolean']['output'];
  lastModifiedDate?: Maybe<Scalars['DateTime']['output']>;
  topicPost?: Maybe<TopicPost>;
  topicPostId: Scalars['Int']['output'];
};

export type TopicPostHashtagFilterInput = {
  and?: InputMaybe<Array<TopicPostHashtagFilterInput>>;
  createdDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  hashtag?: InputMaybe<HashtagFilterInput>;
  hashtagId?: InputMaybe<ComparableInt32OperationFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  lastModifiedDate?: InputMaybe<ComparableNullableOfDateTimeOperationFilterInput>;
  or?: InputMaybe<Array<TopicPostHashtagFilterInput>>;
  topicPost?: InputMaybe<TopicPostFilterInput>;
  topicPostId?: InputMaybe<ComparableInt32OperationFilterInput>;
};

export type TopicPostInput = {
  caption?: InputMaybe<Scalars['String']['input']>;
  commentCount?: InputMaybe<Scalars['Int']['input']>;
  fileType: FileType;
  fileUrl?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  likeCount: Scalars['Int']['input'];
  reportCount?: InputMaybe<Scalars['Int']['input']>;
  topicId: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
  viewCount: Scalars['Int']['input'];
};

export type TopicPostLike = {
  __typename?: 'TopicPostLike';
  createdDate: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  isDeleted: Scalars['Boolean']['output'];
  lastModifiedDate?: Maybe<Scalars['DateTime']['output']>;
  topicPost?: Maybe<TopicPost>;
  topicPostId: Scalars['Int']['output'];
  user?: Maybe<User>;
  userId: Scalars['Int']['output'];
};

export type TopicPostLikeCollectionSegment = {
  __typename?: 'TopicPostLikeCollectionSegment';
  items?: Maybe<Array<Maybe<TopicPostLike>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type TopicPostLikeFilterInput = {
  and?: InputMaybe<Array<TopicPostLikeFilterInput>>;
  createdDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  lastModifiedDate?: InputMaybe<ComparableNullableOfDateTimeOperationFilterInput>;
  or?: InputMaybe<Array<TopicPostLikeFilterInput>>;
  topicPost?: InputMaybe<TopicPostFilterInput>;
  topicPostId?: InputMaybe<ComparableInt32OperationFilterInput>;
  user?: InputMaybe<UserFilterInput>;
  userId?: InputMaybe<ComparableInt32OperationFilterInput>;
};

export type TopicPostLikeInput = {
  id?: InputMaybe<Scalars['Int']['input']>;
  topicPostId: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
};

export type TopicPostLikeSortInput = {
  createdDate?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  lastModifiedDate?: InputMaybe<SortEnumType>;
  topicPost?: InputMaybe<TopicPostSortInput>;
  topicPostId?: InputMaybe<SortEnumType>;
  user?: InputMaybe<UserSortInput>;
  userId?: InputMaybe<SortEnumType>;
};

export type TopicPostSortInput = {
  caption?: InputMaybe<SortEnumType>;
  commentCount?: InputMaybe<SortEnumType>;
  createdDate?: InputMaybe<SortEnumType>;
  fileType?: InputMaybe<SortEnumType>;
  fileUrl?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  lastModifiedDate?: InputMaybe<SortEnumType>;
  likeCount?: InputMaybe<SortEnumType>;
  reportCount?: InputMaybe<SortEnumType>;
  setAsRecommended?: InputMaybe<SortEnumType>;
  topic?: InputMaybe<TopicSortInput>;
  topicId?: InputMaybe<SortEnumType>;
  user?: InputMaybe<UserSortInput>;
  userId?: InputMaybe<SortEnumType>;
  viewCount?: InputMaybe<SortEnumType>;
};

export type TopicReportDto = {
  __typename?: 'TopicReportDto';
  commentsCount: Scalars['Int']['output'];
  likesCount: Scalars['Int']['output'];
  topic?: Maybe<Topic>;
  usersCount: Scalars['Int']['output'];
};

export type TopicReportDtoCollectionSegment = {
  __typename?: 'TopicReportDtoCollectionSegment';
  items?: Maybe<Array<Maybe<TopicReportDto>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type TopicReportDtoFilterInput = {
  and?: InputMaybe<Array<TopicReportDtoFilterInput>>;
  commentsCount?: InputMaybe<ComparableInt32OperationFilterInput>;
  likesCount?: InputMaybe<ComparableInt32OperationFilterInput>;
  or?: InputMaybe<Array<TopicReportDtoFilterInput>>;
  topic?: InputMaybe<TopicFilterInput>;
  usersCount?: InputMaybe<ComparableInt32OperationFilterInput>;
};

export type TopicReportDtoSortInput = {
  commentsCount?: InputMaybe<SortEnumType>;
  likesCount?: InputMaybe<SortEnumType>;
  topic?: InputMaybe<TopicSortInput>;
  usersCount?: InputMaybe<SortEnumType>;
};

export type TopicSortInput = {
  createdDate?: InputMaybe<SortEnumType>;
  description?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  lastModifiedDate?: InputMaybe<SortEnumType>;
  title?: InputMaybe<SortEnumType>;
};

export type TopicUser = {
  __typename?: 'TopicUser';
  createdDate: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  invitedByUser?: Maybe<User>;
  invitedByUserId?: Maybe<Scalars['Int']['output']>;
  isDeleted: Scalars['Boolean']['output'];
  lastModifiedDate?: Maybe<Scalars['DateTime']['output']>;
  topic?: Maybe<Topic>;
  topicId: Scalars['Int']['output'];
  user?: Maybe<User>;
  userId: Scalars['Int']['output'];
};

export type TopicUserCollectionSegment = {
  __typename?: 'TopicUserCollectionSegment';
  items?: Maybe<Array<Maybe<TopicUser>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type TopicUserFilterInput = {
  and?: InputMaybe<Array<TopicUserFilterInput>>;
  createdDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  invitedByUser?: InputMaybe<UserFilterInput>;
  invitedByUserId?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  lastModifiedDate?: InputMaybe<ComparableNullableOfDateTimeOperationFilterInput>;
  or?: InputMaybe<Array<TopicUserFilterInput>>;
  topic?: InputMaybe<TopicFilterInput>;
  topicId?: InputMaybe<ComparableInt32OperationFilterInput>;
  user?: InputMaybe<UserFilterInput>;
  userId?: InputMaybe<ComparableInt32OperationFilterInput>;
};

export type TopicUserInput = {
  id?: InputMaybe<Scalars['Int']['input']>;
  invitedByUserId?: InputMaybe<Scalars['Int']['input']>;
  topicId: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
};

export type TopicUserSortInput = {
  createdDate?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  invitedByUser?: InputMaybe<UserSortInput>;
  invitedByUserId?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  lastModifiedDate?: InputMaybe<SortEnumType>;
  topic?: InputMaybe<TopicSortInput>;
  topicId?: InputMaybe<SortEnumType>;
  user?: InputMaybe<UserSortInput>;
  userId?: InputMaybe<SortEnumType>;
};

export type UpdateBuddyInput = {
  fullName?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  interactionFrquency: BuddyInteractionFrequencies;
  interactionTypes?: InputMaybe<Array<BuddyInteractionTypes>>;
  interactions?: InputMaybe<Array<BuddyInteractions>>;
  personality?: InputMaybe<Scalars['String']['input']>;
  photoUrl?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<Array<BuddyTags>>;
};

export type User = {
  __typename?: 'User';
  aboutText?: Maybe<Scalars['String']['output']>;
  activities?: Maybe<Array<Maybe<Activity>>>;
  baseCollections?: Maybe<Array<Maybe<BaseCollection>>>;
  buddies?: Maybe<Array<Maybe<AiBuddy>>>;
  buddyUser?: Maybe<AiBuddy>;
  comments?: Maybe<Array<Maybe<Comment>>>;
  createdDate: Scalars['DateTime']['output'];
  disabledByUser?: Maybe<User>;
  disabledByUserId?: Maybe<Scalars['Int']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  externalId?: Maybe<Scalars['String']['output']>;
  followers?: Maybe<Array<Maybe<Follow>>>;
  followings?: Maybe<Array<Maybe<Follow>>>;
  fullName?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  inviteByReferralCode?: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  isDeleted: Scalars['Boolean']['output'];
  lastModifiedDate?: Maybe<Scalars['DateTime']['output']>;
  location?: Maybe<GeoJsonPointType>;
  lotusTransactions?: Maybe<Array<Maybe<LotusTransactions>>>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  photoUrl?: Maybe<Scalars['String']['output']>;
  postLikes?: Maybe<Array<Maybe<PostLike>>>;
  posts?: Maybe<Array<Maybe<Post>>>;
  referralCode?: Maybe<Scalars['String']['output']>;
  reportComments?: Maybe<Array<Maybe<ReportComment>>>;
  reportPosts?: Maybe<Array<Maybe<ReportPost>>>;
  showCommentNotifications: Scalars['Boolean']['output'];
  showLikeNotifications: Scalars['Boolean']['output'];
  showNewMessageNotifications: Scalars['Boolean']['output'];
  showOtherNotifications: Scalars['Boolean']['output'];
  showRecomandationNotifications: Scalars['Boolean']['output'];
  userCategories?: Maybe<Array<Maybe<UserCategory>>>;
  userName?: Maybe<Scalars['String']['output']>;
  userType: UserType;
};

export type UserCategory = {
  __typename?: 'UserCategory';
  category?: Maybe<Category>;
  categoryId: Scalars['Int']['output'];
  createdDate: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  isDeleted: Scalars['Boolean']['output'];
  lastModifiedDate?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<User>;
  userId: Scalars['Int']['output'];
};

export type UserCategoryCollectionSegment = {
  __typename?: 'UserCategoryCollectionSegment';
  items?: Maybe<Array<Maybe<UserCategory>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type UserCategoryFilterInput = {
  and?: InputMaybe<Array<UserCategoryFilterInput>>;
  category?: InputMaybe<CategoryFilterInput>;
  categoryId?: InputMaybe<ComparableInt32OperationFilterInput>;
  createdDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  lastModifiedDate?: InputMaybe<ComparableNullableOfDateTimeOperationFilterInput>;
  or?: InputMaybe<Array<UserCategoryFilterInput>>;
  user?: InputMaybe<UserFilterInput>;
  userId?: InputMaybe<ComparableInt32OperationFilterInput>;
};

export type UserCategoryInput = {
  categoryId: Scalars['Int']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  userId: Scalars['Int']['input'];
};

export type UserCategorySortInput = {
  category?: InputMaybe<CategorySortInput>;
  categoryId?: InputMaybe<SortEnumType>;
  createdDate?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  lastModifiedDate?: InputMaybe<SortEnumType>;
  user?: InputMaybe<UserSortInput>;
  userId?: InputMaybe<SortEnumType>;
};

export type UserCollectionSegment = {
  __typename?: 'UserCollectionSegment';
  items?: Maybe<Array<Maybe<User>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type UserDistanceDto = {
  __typename?: 'UserDistanceDto';
  aboutText?: Maybe<Scalars['String']['output']>;
  distance: Scalars['Float']['output'];
  fullName?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  location?: Maybe<Scalars['Position']['output']>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  photoUrl?: Maybe<Scalars['String']['output']>;
  userName?: Maybe<Scalars['String']['output']>;
};

export type UserDistanceDtoCollectionSegment = {
  __typename?: 'UserDistanceDtoCollectionSegment';
  items?: Maybe<Array<Maybe<UserDistanceDto>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type UserDistanceDtoFilterInput = {
  aboutText?: InputMaybe<StringOperationFilterInput>;
  and?: InputMaybe<Array<UserDistanceDtoFilterInput>>;
  distance?: InputMaybe<ComparableDoubleOperationFilterInput>;
  fullName?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  location?: InputMaybe<CoordinateFilterInput>;
  or?: InputMaybe<Array<UserDistanceDtoFilterInput>>;
  phoneNumber?: InputMaybe<StringOperationFilterInput>;
  photoUrl?: InputMaybe<StringOperationFilterInput>;
  userName?: InputMaybe<StringOperationFilterInput>;
};

export type UserDistanceDtoSortInput = {
  aboutText?: InputMaybe<SortEnumType>;
  distance?: InputMaybe<SortEnumType>;
  fullName?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  location?: InputMaybe<CoordinateSortInput>;
  phoneNumber?: InputMaybe<SortEnumType>;
  photoUrl?: InputMaybe<SortEnumType>;
  userName?: InputMaybe<SortEnumType>;
};

export type UserDto = {
  __typename?: 'UserDto';
  aboutText?: Maybe<Scalars['String']['output']>;
  fullName?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  isActive: Scalars['Boolean']['output'];
  location?: Maybe<PointDto>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  photoUrl?: Maybe<Scalars['String']['output']>;
  userName?: Maybe<Scalars['String']['output']>;
  userType: UserType;
};

export type UserDtoFilterInput = {
  aboutText?: InputMaybe<StringOperationFilterInput>;
  and?: InputMaybe<Array<UserDtoFilterInput>>;
  fullName?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  isActive?: InputMaybe<BooleanOperationFilterInput>;
  location?: InputMaybe<PointDtoFilterInput>;
  or?: InputMaybe<Array<UserDtoFilterInput>>;
  phoneNumber?: InputMaybe<StringOperationFilterInput>;
  photoUrl?: InputMaybe<StringOperationFilterInput>;
  userName?: InputMaybe<StringOperationFilterInput>;
  userType?: InputMaybe<UserTypeOperationFilterInput>;
};

export type UserDtoSortInput = {
  aboutText?: InputMaybe<SortEnumType>;
  fullName?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isActive?: InputMaybe<SortEnumType>;
  location?: InputMaybe<PointDtoSortInput>;
  phoneNumber?: InputMaybe<SortEnumType>;
  photoUrl?: InputMaybe<SortEnumType>;
  userName?: InputMaybe<SortEnumType>;
  userType?: InputMaybe<SortEnumType>;
};

export type UserFilterInput = {
  aboutText?: InputMaybe<StringOperationFilterInput>;
  activities?: InputMaybe<ListFilterInputTypeOfActivityFilterInput>;
  and?: InputMaybe<Array<UserFilterInput>>;
  baseCollections?: InputMaybe<ListFilterInputTypeOfBaseCollectionFilterInput>;
  buddies?: InputMaybe<ListFilterInputTypeOfAiBuddyFilterInput>;
  buddyUser?: InputMaybe<AiBuddyFilterInput>;
  comments?: InputMaybe<ListFilterInputTypeOfCommentFilterInput>;
  createdDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  disabledByUser?: InputMaybe<UserFilterInput>;
  disabledByUserId?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  email?: InputMaybe<StringOperationFilterInput>;
  externalId?: InputMaybe<StringOperationFilterInput>;
  followers?: InputMaybe<ListFilterInputTypeOfFollowFilterInput>;
  followings?: InputMaybe<ListFilterInputTypeOfFollowFilterInput>;
  fullName?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  inviteByReferralCode?: InputMaybe<StringOperationFilterInput>;
  isActive?: InputMaybe<BooleanOperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  lastModifiedDate?: InputMaybe<ComparableNullableOfDateTimeOperationFilterInput>;
  location?: InputMaybe<PointFilterInput>;
  lotusTransactions?: InputMaybe<ListFilterInputTypeOfLotusTransactionsFilterInput>;
  or?: InputMaybe<Array<UserFilterInput>>;
  phoneNumber?: InputMaybe<StringOperationFilterInput>;
  photoUrl?: InputMaybe<StringOperationFilterInput>;
  postLikes?: InputMaybe<ListFilterInputTypeOfPostLikeFilterInput>;
  posts?: InputMaybe<ListFilterInputTypeOfPostFilterInput>;
  referralCode?: InputMaybe<StringOperationFilterInput>;
  reportComments?: InputMaybe<ListFilterInputTypeOfReportCommentFilterInput>;
  reportPosts?: InputMaybe<ListFilterInputTypeOfReportPostFilterInput>;
  showCommentNotifications?: InputMaybe<BooleanOperationFilterInput>;
  showLikeNotifications?: InputMaybe<BooleanOperationFilterInput>;
  showNewMessageNotifications?: InputMaybe<BooleanOperationFilterInput>;
  showOtherNotifications?: InputMaybe<BooleanOperationFilterInput>;
  showRecomandationNotifications?: InputMaybe<BooleanOperationFilterInput>;
  userCategories?: InputMaybe<ListFilterInputTypeOfUserCategoryFilterInput>;
  userName?: InputMaybe<StringOperationFilterInput>;
  userType?: InputMaybe<UserTypeOperationFilterInput>;
};

export type UserInput = {
  aboutText?: InputMaybe<Scalars['String']['input']>;
  disabledByUserId?: InputMaybe<Scalars['Int']['input']>;
  fullName?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  location?: InputMaybe<Scalars['Position']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  photoUrl?: InputMaybe<Scalars['String']['input']>;
  referralCode?: InputMaybe<Scalars['String']['input']>;
  userName?: InputMaybe<Scalars['String']['input']>;
};

export type UserLotusDto = {
  __typename?: 'UserLotusDto';
  invitedUsers?: Maybe<Array<Maybe<ReferredUserDto>>>;
  lotusCount: Scalars['Int']['output'];
  referralCode?: Maybe<Scalars['String']['output']>;
};

export type UserNotificationDetailInput = {
  id?: InputMaybe<Scalars['Int']['input']>;
  showCommentNotifications: Scalars['Boolean']['input'];
  showLikeNotifications: Scalars['Boolean']['input'];
  showNewMessageNotifications: Scalars['Boolean']['input'];
  showOtherNotifications: Scalars['Boolean']['input'];
  showRecomandationNotifications: Scalars['Boolean']['input'];
};

export type UserSortInput = {
  aboutText?: InputMaybe<SortEnumType>;
  buddyUser?: InputMaybe<AiBuddySortInput>;
  createdDate?: InputMaybe<SortEnumType>;
  disabledByUser?: InputMaybe<UserSortInput>;
  disabledByUserId?: InputMaybe<SortEnumType>;
  email?: InputMaybe<SortEnumType>;
  externalId?: InputMaybe<SortEnumType>;
  fullName?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  inviteByReferralCode?: InputMaybe<SortEnumType>;
  isActive?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  lastModifiedDate?: InputMaybe<SortEnumType>;
  location?: InputMaybe<PointSortInput>;
  phoneNumber?: InputMaybe<SortEnumType>;
  photoUrl?: InputMaybe<SortEnumType>;
  referralCode?: InputMaybe<SortEnumType>;
  showCommentNotifications?: InputMaybe<SortEnumType>;
  showLikeNotifications?: InputMaybe<SortEnumType>;
  showNewMessageNotifications?: InputMaybe<SortEnumType>;
  showOtherNotifications?: InputMaybe<SortEnumType>;
  showRecomandationNotifications?: InputMaybe<SortEnumType>;
  userName?: InputMaybe<SortEnumType>;
  userType?: InputMaybe<SortEnumType>;
};

export enum UserType {
  Admin = 'ADMIN',
  AiBuddy = 'AI_BUDDY',
  Artist = 'ARTIST',
  SuperAdmin = 'SUPER_ADMIN',
}

export type UserTypeOperationFilterInput = {
  eq?: InputMaybe<UserType>;
  in?: InputMaybe<Array<UserType>>;
  neq?: InputMaybe<UserType>;
  nin?: InputMaybe<Array<UserType>>;
};

export type UsersActivitiesByCountDto = {
  __typename?: 'UsersActivitiesByCountDto';
  commentCount: Scalars['Int']['output'];
  likeCount: Scalars['Int']['output'];
  sharePostCount: Scalars['Int']['output'];
  user?: Maybe<User>;
};

export type UsersActivitiesByCountDtoCollectionSegment = {
  __typename?: 'UsersActivitiesByCountDtoCollectionSegment';
  items?: Maybe<Array<Maybe<UsersActivitiesByCountDto>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type UsersActivitiesByCountDtoFilterInput = {
  and?: InputMaybe<Array<UsersActivitiesByCountDtoFilterInput>>;
  commentCount?: InputMaybe<ComparableInt32OperationFilterInput>;
  likeCount?: InputMaybe<ComparableInt32OperationFilterInput>;
  or?: InputMaybe<Array<UsersActivitiesByCountDtoFilterInput>>;
  sharePostCount?: InputMaybe<ComparableInt32OperationFilterInput>;
  user?: InputMaybe<UserFilterInput>;
};

export type UsersActivitiesByCountDtoSortInput = {
  commentCount?: InputMaybe<SortEnumType>;
  likeCount?: InputMaybe<SortEnumType>;
  sharePostCount?: InputMaybe<SortEnumType>;
  user?: InputMaybe<UserSortInput>;
};

export enum ViolationType {
  BullyingOrHarassment = 'BULLYING_OR_HARASSMENT',
  EatingDisorder = 'EATING_DISORDER',
  FalseInformation = 'FALSE_INFORMATION',
  HateSpeechOrSymbols = 'HATE_SPEECH_OR_SYMBOLS',
  IntellectualPropertyViolation = 'INTELLECTUAL_PROPERTY_VIOLATION',
  IJustDontLikeIt = 'I_JUST_DONT_LIKE_IT',
  NudityOrSexualActivity = 'NUDITY_OR_SEXUAL_ACTIVITY',
  Other = 'OTHER',
  SaleOfIllegalOrRegulatedGoods = 'SALE_OF_ILLEGAL_OR_REGULATED_GOODS',
  ScamOrFraud = 'SCAM_OR_FRAUD',
  Spam = 'SPAM',
  SuicideOrSelfInjury = 'SUICIDE_OR_SELF_INJURY',
  ViolenceOrDangerousOrganizations = 'VIOLENCE_OR_DANGEROUS_ORGANIZATIONS',
}

export type ViolationTypeOperationFilterInput = {
  eq?: InputMaybe<ViolationType>;
  in?: InputMaybe<Array<ViolationType>>;
  neq?: InputMaybe<ViolationType>;
  nin?: InputMaybe<Array<ViolationType>>;
};

export type YearlyReportDto = {
  __typename?: 'YearlyReportDto';
  count: Scalars['Int']['output'];
  year: Scalars['Int']['output'];
};

export type YearlyReportDtoCollectionSegment = {
  __typename?: 'YearlyReportDtoCollectionSegment';
  items?: Maybe<Array<Maybe<YearlyReportDto>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type YearlyReportDtoFilterInput = {
  and?: InputMaybe<Array<YearlyReportDtoFilterInput>>;
  count?: InputMaybe<ComparableInt32OperationFilterInput>;
  or?: InputMaybe<Array<YearlyReportDtoFilterInput>>;
  year?: InputMaybe<ComparableInt32OperationFilterInput>;
};

export type YearlyReportDtoSortInput = {
  count?: InputMaybe<SortEnumType>;
  year?: InputMaybe<SortEnumType>;
};

export type Activity_GetActivitiesQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ActivityFilterInput>;
  order?: InputMaybe<Array<ActivitySortInput> | ActivitySortInput>;
}>;

export type Activity_GetActivitiesQuery = {
  __typename?: 'Query';
  activity_getActivities?: {
    __typename?: 'ListResponseBaseOfActivity';
    status?: any | null;
    result?: {
      __typename?: 'ActivityCollectionSegment';
      totalCount: number;
      items?: Array<{
        __typename?: 'Activity';
        activityType: ActivityType;
        userId: number;
        id: number;
        createdDate: any;
        user?: {
          __typename?: 'User';
          userName?: string | null;
          photoUrl?: string | null;
          id: number;
        } | null;
        targetUser?: {__typename?: 'User'; createdDate: any} | null;
        targetPost?: {__typename?: 'Post'; createdDate: any; id: number} | null;
        targetComment?: {__typename?: 'Comment'; createdDate: any} | null;
        targetTopicPost?: {
          __typename?: 'TopicPost';
          createdDate: any;
          id: number;
        } | null;
      } | null> | null;
      pageInfo: {
        __typename?: 'CollectionSegmentInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    } | null;
  } | null;
};

export type Activity_GetUsersActivitiesByCountQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<UsersActivitiesByCountDtoFilterInput>;
  order?: InputMaybe<
    | Array<UsersActivitiesByCountDtoSortInput>
    | UsersActivitiesByCountDtoSortInput
  >;
  fromDate: Scalars['DateTime']['input'];
  toDate: Scalars['DateTime']['input'];
}>;

export type Activity_GetUsersActivitiesByCountQuery = {
  __typename?: 'Query';
  activity_getUsersActivitiesByCount?: {
    __typename?: 'ListResponseBaseOfUsersActivitiesByCountDto';
    status?: any | null;
    result?: {
      __typename?: 'UsersActivitiesByCountDtoCollectionSegment';
      totalCount: number;
      items?: Array<{
        __typename?: 'UsersActivitiesByCountDto';
        likeCount: number;
        commentCount: number;
        sharePostCount: number;
        user?: {
          __typename?: 'User';
          userName?: string | null;
          id: number;
          photoUrl?: string | null;
          fullName?: string | null;
        } | null;
      } | null> | null;
      pageInfo: {
        __typename?: 'CollectionSegmentInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    } | null;
  } | null;
};

export type User_CreateAdminMutationVariables = Exact<{
  userInput?: InputMaybe<UserInput>;
  email?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
}>;

export type User_CreateAdminMutation = {
  __typename?: 'Mutation';
  user_createAdmin?: {
    __typename?: 'ResponseBaseOfUser';
    status?: any | null;
    result?: {__typename?: 'User'; email?: string | null; id: number} | null;
  } | null;
};

export type User_ChangeUserActivationMutationVariables = Exact<{
  isActive: Scalars['Boolean']['input'];
  userId: Scalars['Int']['input'];
}>;

export type User_ChangeUserActivationMutation = {
  __typename?: 'Mutation';
  user_changeUserActivation?: {
    __typename?: 'ResponseBaseOfUser';
    status?: any | null;
  } | null;
};

export type User_DeleteAccountMutationVariables = Exact<{
  userId: Scalars['Int']['input'];
}>;

export type User_DeleteAccountMutation = {
  __typename?: 'Mutation';
  user_deleteAccount?: {
    __typename?: 'ResponseBaseOfUser';
    status?: any | null;
  } | null;
};

export type ReportUser_GetReportUsersQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ReportUserFilterInput>;
  order?: InputMaybe<Array<ReportUserSortInput> | ReportUserSortInput>;
}>;

export type ReportUser_GetReportUsersQuery = {
  __typename?: 'Query';
  reportUser_getReportUsers?: {
    __typename?: 'ListResponseBaseOfReportUser';
    status?: any | null;
    result?: {
      __typename?: 'ReportUserCollectionSegment';
      totalCount: number;
      items?: Array<{
        __typename?: 'ReportUser';
        violationType: ViolationType;
        description?: string | null;
        isReviewed: boolean;
        id: number;
        isDeleted: boolean;
        createdDate: any;
        adminId?: number | null;
        reporterUser?: {
          __typename?: 'User';
          userName?: string | null;
          photoUrl?: string | null;
          id: number;
          isDeleted: boolean;
        } | null;
        reportedUser?: {
          __typename?: 'User';
          userName?: string | null;
          photoUrl?: string | null;
          id: number;
          isDeleted: boolean;
        } | null;
      } | null> | null;
      pageInfo: {
        __typename?: 'CollectionSegmentInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    } | null;
  } | null;
};

export type ReportPost_GetReportPostsQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ReportPostFilterInput>;
  order?: InputMaybe<Array<ReportPostSortInput> | ReportPostSortInput>;
}>;

export type ReportPost_GetReportPostsQuery = {
  __typename?: 'Query';
  reportPost_getReportPosts?: {
    __typename?: 'ListResponseBaseOfReportPost';
    status?: any | null;
    result?: {
      __typename?: 'ReportPostCollectionSegment';
      totalCount: number;
      items?: Array<{
        __typename?: 'ReportPost';
        violationType: ViolationType;
        description?: string | null;
        id: number;
        isDeleted: boolean;
        createdDate: any;
        isReviewed: boolean;
        reporterUser?: {
          __typename?: 'User';
          userName?: string | null;
          id: number;
          isDeleted: boolean;
        } | null;
        post?: {
          __typename?: 'Post';
          fileUrl?: string | null;
          fileType: FileType;
          id: number;
          isDeleted: boolean;
          user?: {
            __typename?: 'User';
            userName?: string | null;
            photoUrl?: string | null;
          } | null;
        } | null;
      } | null> | null;
      pageInfo: {
        __typename?: 'CollectionSegmentInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    } | null;
  } | null;
};

export type User_GeDisabledUsersQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<UserFilterInput>;
  order?: InputMaybe<Array<UserSortInput> | UserSortInput>;
}>;

export type User_GeDisabledUsersQuery = {
  __typename?: 'Query';
  user_getAllUsers?: {
    __typename?: 'ListResponseBaseOfUser';
    status?: any | null;
    result?: {
      __typename?: 'UserCollectionSegment';
      totalCount: number;
      items?: Array<{
        __typename?: 'User';
        isDeleted: boolean;
        id: number;
        userName?: string | null;
        photoUrl?: string | null;
        fullName?: string | null;
        disabledByUserId?: number | null;
        disabledByUser?: {
          __typename?: 'User';
          userName?: string | null;
          fullName?: string | null;
        } | null;
      } | null> | null;
      pageInfo: {
        __typename?: 'CollectionSegmentInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    } | null;
  } | null;
};

export type ReportUser_SetAsReviewedMutationVariables = Exact<{
  entityId: Scalars['Int']['input'];
}>;

export type ReportUser_SetAsReviewedMutation = {
  __typename?: 'Mutation';
  reportUser_setAsReviewed?: {
    __typename?: 'ResponseBaseOfReportUser';
    status?: any | null;
  } | null;
};

export type ReportPost_SetAsReviewedMutationVariables = Exact<{
  entityId: Scalars['Int']['input'];
}>;

export type ReportPost_SetAsReviewedMutation = {
  __typename?: 'Mutation';
  reportPost_setAsReviewed?: {
    __typename?: 'ResponseBaseOfReportPost';
    status?: any | null;
  } | null;
};

export type ReportUser_GetReportUsersCountQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ReportUserFilterInput>;
  order?: InputMaybe<Array<ReportUserSortInput> | ReportUserSortInput>;
}>;

export type ReportUser_GetReportUsersCountQuery = {
  __typename?: 'Query';
  reportUser_getReportUsers?: {
    __typename?: 'ListResponseBaseOfReportUser';
    status?: any | null;
    result?: {
      __typename?: 'ReportUserCollectionSegment';
      totalCount: number;
    } | null;
  } | null;
};

export type Notification_ReadAllNotificationsMutationVariables = Exact<{
  [key: string]: never;
}>;

export type Notification_ReadAllNotificationsMutation = {
  __typename?: 'Mutation';
  notification_readAllNotifications?: {
    __typename?: 'ResponseBase';
    status?: any | null;
  } | null;
};

export type Buddy_CreateBuddyMutationVariables = Exact<{
  input?: InputMaybe<InsertBuddyInput>;
}>;

export type Buddy_CreateBuddyMutation = {
  __typename?: 'Mutation';
  buddy_createBuddy?: {
    __typename?: 'ResponseBaseOfBuddyDto';
    status?: any | null;
    result?: {
      __typename?: 'BuddyDto';
      id: number;
      personality?: string | null;
      tags?: Array<BuddyTags> | null;
      interactionFrequency?: BuddyInteractionFrequencies | null;
      interactions?: Array<BuddyInteractions> | null;
      interactionTypes?: Array<BuddyInteractionTypes> | null;
    } | null;
  } | null;
};

export type Buddy_UpdateBuddyMutationVariables = Exact<{
  input?: InputMaybe<UpdateBuddyInput>;
}>;

export type Buddy_UpdateBuddyMutation = {
  __typename?: 'Mutation';
  buddy_updateBuddy?: {
    __typename?: 'ResponseBaseOfBuddyDto';
    status?: any | null;
    result?: {
      __typename?: 'BuddyDto';
      id: number;
      personality?: string | null;
      tags?: Array<BuddyTags> | null;
      interactionFrequency?: BuddyInteractionFrequencies | null;
      interactions?: Array<BuddyInteractions> | null;
      interactionTypes?: Array<BuddyInteractionTypes> | null;
      user?: {
        __typename?: 'UserDto';
        fullName?: string | null;
        photoUrl?: string | null;
      } | null;
    } | null;
  } | null;
};

export type Buddy_GetBuddiesQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<BuddyDtoFilterInput>;
  order?: InputMaybe<Array<BuddyDtoSortInput> | BuddyDtoSortInput>;
}>;

export type Buddy_GetBuddiesQuery = {
  __typename?: 'Query';
  buddy_getBuddies?: {
    __typename?: 'ListResponseBaseOfBuddyDto';
    status?: any | null;
    result?: {
      __typename?: 'BuddyDtoCollectionSegment';
      totalCount: number;
      items?: Array<{
        __typename?: 'BuddyDto';
        id: number;
        personality?: string | null;
        tags?: Array<BuddyTags> | null;
        interactionFrequency?: BuddyInteractionFrequencies | null;
        interactions?: Array<BuddyInteractions> | null;
        interactionTypes?: Array<BuddyInteractionTypes> | null;
        user?: {
          __typename?: 'UserDto';
          id: number;
          userName?: string | null;
          photoUrl?: string | null;
          fullName?: string | null;
          aboutText?: string | null;
          userType: UserType;
          isActive: boolean;
          phoneNumber?: string | null;
        } | null;
      } | null> | null;
      pageInfo: {
        __typename?: 'CollectionSegmentInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    } | null;
  } | null;
};

export type User_GetAllUsersQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<UserFilterInput>;
  order?: InputMaybe<Array<UserSortInput> | UserSortInput>;
}>;

export type User_GetAllUsersQuery = {
  __typename?: 'Query';
  user_getAllUsers?: {
    __typename?: 'ListResponseBaseOfUser';
    status?: any | null;
    result?: {
      __typename?: 'UserCollectionSegment';
      totalCount: number;
      items?: Array<{
        __typename?: 'User';
        userName?: string | null;
        userType: UserType;
        photoUrl?: string | null;
        fullName?: string | null;
        email?: string | null;
        id: number;
        createdDate: any;
        isDeleted: boolean;
      } | null> | null;
      pageInfo: {
        __typename?: 'CollectionSegmentInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    } | null;
  } | null;
};

export type User_SignUpArtistMutationVariables = Exact<{
  userInput?: InputMaybe<UserInput>;
}>;

export type User_SignUpArtistMutation = {
  __typename?: 'Mutation';
  user_signUpArtist?: {
    __typename?: 'ResponseBaseOfUser';
    status?: any | null;
    result?: {__typename?: 'User'; email?: string | null; id: number} | null;
  } | null;
};

export type User_LoginQueryVariables = Exact<{[key: string]: never}>;

export type User_LoginQuery = {
  __typename?: 'Query';
  user_login?: {
    __typename?: 'ResponseBaseOfUser';
    status?: any | null;
    result?: {
      __typename?: 'User';
      userName?: string | null;
      photoUrl?: string | null;
      fullName?: string | null;
      externalId?: string | null;
      userType: UserType;
      email?: string | null;
      id: number;
    } | null;
  } | null;
};

export type Block_DeleteBlockMutationVariables = Exact<{
  entityId: Scalars['Int']['input'];
}>;

export type Block_DeleteBlockMutation = {
  __typename?: 'Mutation';
  block_deleteBlock?: {
    __typename?: 'ResponseStatus';
    code: number;
    value?: string | null;
  } | null;
};

export type Block_CreateBlockMutationVariables = Exact<{
  input?: InputMaybe<BlockInput>;
}>;

export type Block_CreateBlockMutation = {
  __typename?: 'Mutation';
  block_createBlock?: {
    __typename?: 'ResponseBaseOfBlock';
    status?: any | null;
  } | null;
};

export type Block_GetBlocksQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<BlockFilterInput>;
  order?: InputMaybe<Array<BlockSortInput> | BlockSortInput>;
}>;

export type Block_GetBlocksQuery = {
  __typename?: 'Query';
  block_getBlocks?: {
    __typename?: 'ListResponseBaseOfBlock';
    status?: any | null;
    result?: {
      __typename?: 'BlockCollectionSegment';
      totalCount: number;
      items?: Array<{
        __typename?: 'Block';
        id: number;
        blockedUser?: {
          __typename?: 'User';
          userName?: string | null;
          photoUrl?: string | null;
          fullName?: string | null;
          id: number;
        } | null;
      } | null> | null;
      pageInfo: {
        __typename?: 'CollectionSegmentInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    } | null;
  } | null;
};

export type UserCategory_CreateByCategoryIdsMutationVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<UserCategoryFilterInput>;
  order?: InputMaybe<Array<UserCategorySortInput> | UserCategorySortInput>;
  userId: Scalars['Int']['input'];
  categoryIds?: InputMaybe<
    Array<Scalars['Int']['input']> | Scalars['Int']['input']
  >;
}>;

export type UserCategory_CreateByCategoryIdsMutation = {
  __typename?: 'Mutation';
  userCategory_createByCategoryIds?: {
    __typename?: 'ListResponseBaseOfUserCategory';
    status?: any | null;
    result?: {
      __typename?: 'UserCategoryCollectionSegment';
      totalCount: number;
    } | null;
  } | null;
};

export type Category_CreateCategoryMutationVariables = Exact<{
  input?: InputMaybe<CategoryInput>;
}>;

export type Category_CreateCategoryMutation = {
  __typename?: 'Mutation';
  category_createCategory?: {
    __typename?: 'ResponseBaseOfCategory';
    status?: any | null;
  } | null;
};

export type Category_GetCategoriesQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<CategoryFilterInput>;
  order?: InputMaybe<Array<CategorySortInput> | CategorySortInput>;
}>;

export type Category_GetCategoriesQuery = {
  __typename?: 'Query';
  category_getCategories?: {
    __typename?: 'ListResponseBaseOfCategory';
    status?: any | null;
    result?: {
      __typename?: 'CategoryCollectionSegment';
      totalCount: number;
      items?: Array<{
        __typename?: 'Category';
        title?: string | null;
        isActive: boolean;
        id: number;
        likeCount?: number | null;
        commentCount?: number | null;
        postCount?: number | null;
      } | null> | null;
      pageInfo: {
        __typename?: 'CollectionSegmentInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    } | null;
  } | null;
};

export type Post_GetPostsByCategoryAndFileTypeQueryVariables = Exact<{
  fromDate: Scalars['DateTime']['input'];
  toDate: Scalars['DateTime']['input'];
  fileType: FileType;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
}>;

export type Post_GetPostsByCategoryAndFileTypeQuery = {
  __typename?: 'Query';
  post_getPostsByCategoryAndFileType?: {
    __typename?: 'ListResponseBaseOfPostsByCategoryAndFileTypeDto';
    status?: any | null;
    result?: {
      __typename?: 'PostsByCategoryAndFileTypeDtoCollectionSegment';
      items?: Array<{
        __typename?: 'PostsByCategoryAndFileTypeDto';
        categoryId: number;
        categoryTitle?: string | null;
        count: number;
      } | null> | null;
    } | null;
  } | null;
};

export type Collection_CreateCollectionMutationVariables = Exact<{
  input?: InputMaybe<CollectionInput>;
}>;

export type Collection_CreateCollectionMutation = {
  __typename?: 'Mutation';
  collection_createCollection?: {
    __typename?: 'ResponseBaseOfCollection';
    status?: any | null;
  } | null;
};

export type BaseCollection_CreateBaseCollectionMutationVariables = Exact<{
  title?: InputMaybe<Scalars['String']['input']>;
  postIds?: InputMaybe<
    Array<Scalars['Int']['input']> | Scalars['Int']['input']
  >;
}>;

export type BaseCollection_CreateBaseCollectionMutation = {
  __typename?: 'Mutation';
  baseCollection_createBaseCollection?: {
    __typename?: 'ResponseBaseOfBaseCollection';
    status?: any | null;
  } | null;
};

export type BaseCollection_DeleteBaseCollectionMutationVariables = Exact<{
  entityId: Scalars['Int']['input'];
}>;

export type BaseCollection_DeleteBaseCollectionMutation = {
  __typename?: 'Mutation';
  baseCollection_deleteBaseCollection?: {
    __typename?: 'ResponseStatus';
    code: number;
    value?: string | null;
  } | null;
};

export type BaseCollection_UpdateBaseCollectionMutationVariables = Exact<{
  input?: InputMaybe<BaseCollectionInput>;
  postIds?: InputMaybe<
    Array<Scalars['Int']['input']> | Scalars['Int']['input']
  >;
}>;

export type BaseCollection_UpdateBaseCollectionMutation = {
  __typename?: 'Mutation';
  baseCollection_updateBaseCollection?: {
    __typename?: 'ResponseBaseOfBaseCollection';
    status?: any | null;
  } | null;
};

export type Collection_DeleteFromCollectionMutationVariables = Exact<{
  baseCollectionId: Scalars['Int']['input'];
  postId: Scalars['Int']['input'];
}>;

export type Collection_DeleteFromCollectionMutation = {
  __typename?: 'Mutation';
  collection_deleteFromCollection?: {
    __typename?: 'ResponseStatus';
    code: number;
    value?: string | null;
  } | null;
};

export type Collection_UpdateCollectionMutationVariables = Exact<{
  input?: InputMaybe<CollectionInput>;
}>;

export type Collection_UpdateCollectionMutation = {
  __typename?: 'Mutation';
  collection_updateCollection?: {
    __typename?: 'ResponseBaseOfCollection';
    status?: any | null;
  } | null;
};

export type PostSav_DeletePostSavMutationVariables = Exact<{
  postId: Scalars['Int']['input'];
}>;

export type PostSav_DeletePostSavMutation = {
  __typename?: 'Mutation';
  postSav_deletePostSav?: {
    __typename?: 'ResponseStatus';
    code: number;
    value?: string | null;
  } | null;
};

export type BaseCollection_GetBaseCollectionsQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<BaseCollectionFilterInput>;
  order?: InputMaybe<Array<BaseCollectionSortInput> | BaseCollectionSortInput>;
}>;

export type BaseCollection_GetBaseCollectionsQuery = {
  __typename?: 'Query';
  baseCollection_getBaseCollections?: {
    __typename?: 'ListResponseBaseOfBaseCollection';
    status?: any | null;
    result?: {
      __typename?: 'BaseCollectionCollectionSegment';
      totalCount: number;
      items?: Array<{
        __typename?: 'BaseCollection';
        id: number;
        title?: string | null;
        collections?: Array<{
          __typename?: 'Collection';
          id: number;
          isDeleted: boolean;
          post?: {
            __typename?: 'Post';
            id: number;
            fileUrl?: string | null;
            fileType: FileType;
            isDeleted: boolean;
          } | null;
        } | null> | null;
      } | null> | null;
      pageInfo: {
        __typename?: 'CollectionSegmentInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    } | null;
  } | null;
};

export type Collection_GetCollectionsQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<CollectionFilterInput>;
  order?: InputMaybe<Array<CollectionSortInput> | CollectionSortInput>;
}>;

export type Collection_GetCollectionsQuery = {
  __typename?: 'Query';
  collection_getCollections?: {
    __typename?: 'ListResponseBaseOfCollection';
    status?: any | null;
    result?: {
      __typename?: 'CollectionCollectionSegment';
      totalCount: number;
      items?: Array<{
        __typename?: 'Collection';
        baseCollectionId: number;
        id: number;
        post?: {
          __typename?: 'Post';
          fileUrl?: string | null;
          id: number;
          fileType: FileType;
        } | null;
      } | null> | null;
      pageInfo: {
        __typename?: 'CollectionSegmentInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    } | null;
  } | null;
};

export type BaseCollection_GetBaseCollectionQueryVariables = Exact<{
  entityId: Scalars['Int']['input'];
}>;

export type BaseCollection_GetBaseCollectionQuery = {
  __typename?: 'Query';
  baseCollection_getBaseCollection?: {
    __typename?: 'SingleResponseBaseOfBaseCollection';
    status?: any | null;
    result?: {
      __typename?: 'BaseCollection';
      title?: string | null;
      id: number;
      collections?: Array<{
        __typename?: 'Collection';
        id: number;
        post?: {
          __typename?: 'Post';
          fileUrl?: string | null;
          id: number;
          fileType: FileType;
        } | null;
      } | null> | null;
    } | null;
  } | null;
};

export type Comment_CreateCommentMutationVariables = Exact<{
  input?: InputMaybe<CommentInput>;
}>;

export type Comment_CreateCommentMutation = {
  __typename?: 'Mutation';
  comment_createComment?: {
    __typename?: 'ResponseBaseOfComment';
    status?: any | null;
    result?: {
      __typename?: 'Comment';
      likeCount: number;
      userId: number;
      parentId?: number | null;
      postId: number;
      id: number;
      createdDate: any;
    } | null;
  } | null;
};

export type CommentLike_CreateCommentLikeMutationVariables = Exact<{
  input?: InputMaybe<CommentLikeInput>;
}>;

export type CommentLike_CreateCommentLikeMutation = {
  __typename?: 'Mutation';
  commentLike_createCommentLike?: {
    __typename?: 'ResponseBaseOfCommentLike';
    status?: any | null;
  } | null;
};

export type CommentLike_DeleteCommentLikeMutationVariables = Exact<{
  userId: Scalars['Int']['input'];
  commentId: Scalars['Int']['input'];
}>;

export type CommentLike_DeleteCommentLikeMutation = {
  __typename?: 'Mutation';
  commentLike_deleteCommentLike?: {
    __typename?: 'ResponseStatus';
    code: number;
    value?: string | null;
  } | null;
};

export type Comment_DeleteCommentMutationVariables = Exact<{
  entityId: Scalars['Int']['input'];
}>;

export type Comment_DeleteCommentMutation = {
  __typename?: 'Mutation';
  comment_deleteComment?: {
    __typename?: 'ResponseStatus';
    code: number;
    value?: string | null;
  } | null;
};

export type TopicPostCommentLike_CreateTopicPostCommentLikeMutationVariables =
  Exact<{
    input?: InputMaybe<TopicPostCommentLikeInput>;
  }>;

export type TopicPostCommentLike_CreateTopicPostCommentLikeMutation = {
  __typename?: 'Mutation';
  topicPostCommentLike_createTopicPostCommentLike?: {
    __typename?: 'ResponseBaseOfTopicPostCommentLike';
    status?: any | null;
  } | null;
};

export type TopicPostCommentLike_DeleteTopicPostCommentLikeMutationVariables =
  Exact<{
    userId: Scalars['Int']['input'];
    commentId: Scalars['Int']['input'];
  }>;

export type TopicPostCommentLike_DeleteTopicPostCommentLikeMutation = {
  __typename?: 'Mutation';
  topicPostCommentLike_deleteTopicPostCommentLike?: {
    __typename?: 'ResponseStatus';
    code: number;
    value?: string | null;
  } | null;
};

export type Comment_GetByPostIdQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<CommentFilterInput>;
  order?: InputMaybe<Array<CommentSortInput> | CommentSortInput>;
  postId: Scalars['Int']['input'];
}>;

export type Comment_GetByPostIdQuery = {
  __typename?: 'Query';
  comment_getByPostId?: {
    __typename?: 'ListResponseBaseOfComment';
    status?: any | null;
    result?: {
      __typename?: 'CommentCollectionSegment';
      totalCount: number;
      items?: Array<{
        __typename?: 'Comment';
        commentText?: string | null;
        likeCount: number;
        userId: number;
        parentId?: number | null;
        postId: number;
        id: number;
        createdDate: any;
        commentLikes?: Array<{
          __typename?: 'CommentLike';
          user?: {__typename?: 'User'; id: number} | null;
        } | null> | null;
        user?: {
          __typename?: 'User';
          userName?: string | null;
          photoUrl?: string | null;
          fullName?: string | null;
          id: number;
        } | null;
        childComments?: Array<{
          __typename?: 'Comment';
          commentText?: string | null;
          likeCount: number;
          userId: number;
          parentId?: number | null;
          postId: number;
          id: number;
          createdDate: any;
          user?: {
            __typename?: 'User';
            photoUrl?: string | null;
            userName?: string | null;
            id: number;
          } | null;
        } | null> | null;
        post?: {
          __typename?: 'Post';
          id: number;
          postLikeCount?: number | null;
          commentCount?: number | null;
          caption?: string | null;
          postHashtags?: Array<{
            __typename?: 'PostHashtag';
            hashtag?: {
              __typename?: 'Hashtag';
              title?: string | null;
              id: number;
            } | null;
          } | null> | null;
          postLikes?: Array<{
            __typename?: 'PostLike';
            postId: number;
          } | null> | null;
          user?: {
            __typename?: 'User';
            photoUrl?: string | null;
            userName?: string | null;
          } | null;
        } | null;
      } | null> | null;
      pageInfo: {
        __typename?: 'CollectionSegmentInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    } | null;
  } | null;
};

export type Comment_CustomeGetCommentsQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<CommentDtoFilterInput>;
  order?: InputMaybe<Array<CommentDtoSortInput> | CommentDtoSortInput>;
}>;

export type Comment_CustomeGetCommentsQuery = {
  __typename?: 'Query';
  comment_customeGetComments?: {
    __typename?: 'ListResponseBaseOfCommentDto';
    status?: any | null;
    result?: {
      __typename?: 'CommentDtoCollectionSegment';
      totalCount: number;
      items?: Array<{
        __typename?: 'CommentDto';
        commentText?: string | null;
        likeCount: number;
        replyCount: number;
        userId: number;
        parentId?: number | null;
        postId: number;
        id?: number | null;
        isLiked: boolean;
        commentLikes?: Array<{
          __typename?: 'CommentLike';
          user?: {__typename?: 'User'; id: number} | null;
        } | null> | null;
        user?: {
          __typename?: 'User';
          userName?: string | null;
          photoUrl?: string | null;
          fullName?: string | null;
          id: number;
        } | null;
        post?: {
          __typename?: 'Post';
          id: number;
          postLikeCount?: number | null;
          commentCount?: number | null;
          caption?: string | null;
          postHashtags?: Array<{
            __typename?: 'PostHashtag';
            hashtag?: {
              __typename?: 'Hashtag';
              title?: string | null;
              id: number;
            } | null;
          } | null> | null;
          postLikes?: Array<{
            __typename?: 'PostLike';
            postId: number;
          } | null> | null;
          user?: {
            __typename?: 'User';
            photoUrl?: string | null;
            userName?: string | null;
          } | null;
        } | null;
      } | null> | null;
      pageInfo: {
        __typename?: 'CollectionSegmentInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    } | null;
  } | null;
};

export type Comment_GetCommentsQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<CommentFilterInput>;
  order?: InputMaybe<Array<CommentSortInput> | CommentSortInput>;
}>;

export type Comment_GetCommentsQuery = {
  __typename?: 'Query';
  comment_getComments?: {
    __typename?: 'ListResponseBaseOfComment';
    status?: any | null;
    result?: {
      __typename?: 'CommentCollectionSegment';
      totalCount: number;
      items?: Array<{
        __typename?: 'Comment';
        commentText?: string | null;
        likeCount: number;
        userId: number;
        parentId?: number | null;
        postId: number;
        id: number;
        createdDate: any;
        commentLikes?: Array<{
          __typename?: 'CommentLike';
          user?: {__typename?: 'User'; id: number} | null;
        } | null> | null;
        user?: {
          __typename?: 'User';
          userName?: string | null;
          photoUrl?: string | null;
          fullName?: string | null;
          id: number;
        } | null;
        childComments?: Array<{
          __typename?: 'Comment';
          commentText?: string | null;
          likeCount: number;
          userId: number;
          parentId?: number | null;
          postId: number;
          id: number;
          createdDate: any;
          user?: {
            __typename?: 'User';
            photoUrl?: string | null;
            userName?: string | null;
            id: number;
          } | null;
        } | null> | null;
        post?: {
          __typename?: 'Post';
          id: number;
          fileUrl?: string | null;
          postLikeCount?: number | null;
          commentCount?: number | null;
          caption?: string | null;
          postHashtags?: Array<{
            __typename?: 'PostHashtag';
            hashtag?: {
              __typename?: 'Hashtag';
              title?: string | null;
              id: number;
            } | null;
          } | null> | null;
          postLikes?: Array<{
            __typename?: 'PostLike';
            postId: number;
          } | null> | null;
          user?: {
            __typename?: 'User';
            photoUrl?: string | null;
            userName?: string | null;
          } | null;
        } | null;
      } | null> | null;
      pageInfo: {
        __typename?: 'CollectionSegmentInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    } | null;
  } | null;
};

export type Follow_CreateFollowMutationVariables = Exact<{
  input?: InputMaybe<FollowInput>;
}>;

export type Follow_CreateFollowMutation = {
  __typename?: 'Mutation';
  follow_createFollow?: {
    __typename?: 'ResponseBaseOfFollow';
    status?: any | null;
    result?: {
      __typename?: 'Follow';
      id: number;
      follower?: {
        __typename?: 'User';
        userName?: string | null;
        fullName?: string | null;
        id: number;
      } | null;
      following?: {
        __typename?: 'User';
        userName?: string | null;
        fullName?: string | null;
        id: number;
      } | null;
    } | null;
  } | null;
};

export type Follow_DeleteFollowMutationVariables = Exact<{
  entityId: Scalars['Int']['input'];
}>;

export type Follow_DeleteFollowMutation = {
  __typename?: 'Mutation';
  follow_deleteFollow?: {
    __typename?: 'ResponseStatus';
    code: number;
    value?: string | null;
  } | null;
};

export type Follow_DeleteFollowByFollowingIdMutationVariables = Exact<{
  followingId: Scalars['Int']['input'];
}>;

export type Follow_DeleteFollowByFollowingIdMutation = {
  __typename?: 'Mutation';
  follow_deleteFollowByFollowingId?: {
    __typename?: 'ResponseStatus';
    code: number;
    value?: string | null;
  } | null;
};

export type Follow_GetFollowingsQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<FollowFilterInput>;
  order?: InputMaybe<Array<FollowSortInput> | FollowSortInput>;
  followerId: Scalars['Int']['input'];
}>;

export type Follow_GetFollowingsQuery = {
  __typename?: 'Query';
  follow_getFollowings?: {
    __typename?: 'ListResponseBaseOfFollow';
    status?: any | null;
    result?: {
      __typename?: 'FollowCollectionSegment';
      totalCount: number;
      items?: Array<{
        __typename?: 'Follow';
        followerId: number;
        followingId: number;
        id: number;
        following?: {
          __typename?: 'User';
          userName?: string | null;
          photoUrl?: string | null;
          fullName?: string | null;
          id: number;
        } | null;
      } | null> | null;
      pageInfo: {
        __typename?: 'CollectionSegmentInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    } | null;
  } | null;
};

export type Follow_GetFollowersQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<FollowFilterInput>;
  order?: InputMaybe<Array<FollowSortInput> | FollowSortInput>;
  followingId: Scalars['Int']['input'];
}>;

export type Follow_GetFollowersQuery = {
  __typename?: 'Query';
  follow_getFollowers?: {
    __typename?: 'ListResponseBaseOfFollow';
    status?: any | null;
    result?: {
      __typename?: 'FollowCollectionSegment';
      totalCount: number;
      items?: Array<{
        __typename?: 'Follow';
        id: number;
        follower?: {
          __typename?: 'User';
          userName?: string | null;
          photoUrl?: string | null;
          id: number;
        } | null;
      } | null> | null;
      pageInfo: {
        __typename?: 'CollectionSegmentInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    } | null;
  } | null;
};

export type Hashtag_GetHashtagsQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<HashtagFilterInput>;
  order?: InputMaybe<Array<HashtagSortInput> | HashtagSortInput>;
}>;

export type Hashtag_GetHashtagsQuery = {
  __typename?: 'Query';
  hashtag_getHashtags?: {
    __typename?: 'ListResponseBaseOfHashtag';
    status?: any | null;
    result?: {
      __typename?: 'HashtagCollectionSegment';
      totalCount: number;
      items?: Array<{
        __typename?: 'Hashtag';
        title?: string | null;
        id: number;
      } | null> | null;
      pageInfo: {
        __typename?: 'CollectionSegmentInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    } | null;
  } | null;
};

export type User_GetLotusStatusQueryVariables = Exact<{[key: string]: never}>;

export type User_GetLotusStatusQuery = {
  __typename?: 'Query';
  user_getLotusStatus?: {
    __typename?: 'ResponseBaseOfUserLotusDto';
    status?: any | null;
    result?: {
      __typename?: 'UserLotusDto';
      referralCode?: string | null;
      lotusCount: number;
      invitedUsers?: Array<{
        __typename?: 'ReferredUserDto';
        id: number;
        photoUrl?: string | null;
        createdAt: any;
        fullName?: string | null;
      } | null> | null;
    } | null;
  } | null;
};

export type Message_DeleteMessageMutationVariables = Exact<{
  messageId: Scalars['Int']['input'];
}>;

export type Message_DeleteMessageMutation = {
  __typename?: 'Mutation';
  message_deleteMessage?: {
    __typename?: 'ResponseBase';
    status?: any | null;
  } | null;
};

export type Message_RemoveConversationMutationVariables = Exact<{
  conversationId: Scalars['Int']['input'];
}>;

export type Message_RemoveConversationMutation = {
  __typename?: 'Mutation';
  message_removeConversation?: {
    __typename?: 'ResponseBase';
    status?: any | null;
  } | null;
};

export type Message_CreateMessageMutationVariables = Exact<{
  messageInput?: InputMaybe<MessageInput>;
}>;

export type Message_CreateMessageMutation = {
  __typename?: 'Mutation';
  message_createMessage?: {
    __typename?: 'ResponseBaseOfMessage';
    status?: any | null;
    result?: {
      __typename?: 'Message';
      id: number;
      createdAt: any;
      text?: string | null;
      messageType: MessageType;
      photoUrl?: string | null;
      senderId: number;
      conversationId: number;
    } | null;
  } | null;
};

export type Message_ForwardPostInConversationMutationVariables = Exact<{
  input?: InputMaybe<ForwardPostInput>;
}>;

export type Message_ForwardPostInConversationMutation = {
  __typename?: 'Mutation';
  message_forwardPostInConversation?: {
    __typename?: 'ResponseBaseOfMessage';
    status?: any | null;
    result?: {__typename?: 'Message'; id: number} | null;
  } | null;
};

export type Message_ForwardTopicPostInConversationMutationVariables = Exact<{
  input?: InputMaybe<ForwardTopicPostInput>;
}>;

export type Message_ForwardTopicPostInConversationMutation = {
  __typename?: 'Mutation';
  message_forwardTopicPostInConversation?: {
    __typename?: 'ResponseBaseOfMessage';
    status?: any | null;
    result?: {__typename?: 'Message'; id: number} | null;
  } | null;
};

export type Message_GetMessagesQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ConversationInputFilterInput>;
  order?: InputMaybe<
    Array<ConversationInputSortInput> | ConversationInputSortInput
  >;
  includeDeletedRows: Scalars['Boolean']['input'];
}>;

export type Message_GetMessagesQuery = {
  __typename?: 'Query';
  message_getUserMessages?: {
    __typename?: 'ListResponseBaseOfConversationInput';
    status?: any | null;
    result?: {
      __typename?: 'ConversationInputCollectionSegment';
      totalCount: number;
      items?: Array<{
        __typename?: 'ConversationInput';
        userId: number;
        userEmail?: string | null;
        userFullName?: string | null;
        subject?: string | null;
        lastMessageText?: string | null;
        conversationId: number;
        unreadCount: number;
        latestMessageDate: any;
      } | null> | null;
      pageInfo: {
        __typename?: 'CollectionSegmentInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    } | null;
  } | null;
};

export type Message_GetConversationQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<MessageFilterInput>;
  order?: InputMaybe<Array<MessageSortInput> | MessageSortInput>;
  conversationId: Scalars['Int']['input'];
}>;

export type Message_GetConversationQuery = {
  __typename?: 'Query';
  message_getConversation?: {
    __typename?: 'ListResponseBaseOfMessage';
    status?: any | null;
    result?: {
      __typename?: 'MessageCollectionSegment';
      totalCount: number;
      items?: Array<{
        __typename?: 'Message';
        messageType: MessageType;
        photoUrl?: string | null;
        createdAt: any;
        conversationId: number;
        senderId: number;
        text?: string | null;
        id: number;
        isDeleted: boolean;
        conversation?: {
          __typename?: 'Conversation';
          subject?: string | null;
          firstUserId: number;
          secondUserId: number;
          firstUnreadCount: number;
          secondUnreadCount: number;
          latestMessageDate: any;
          id: number;
          isDeleted: boolean;
          firstUser?: {
            __typename?: 'User';
            email?: string | null;
            photoUrl?: string | null;
            fullName?: string | null;
          } | null;
          secondUser?: {
            __typename?: 'User';
            photoUrl?: string | null;
            email?: string | null;
            fullName?: string | null;
          } | null;
        } | null;
        post?: {
          __typename?: 'Post';
          id: number;
          fileUrl?: string | null;
          caption?: string | null;
          fileType: FileType;
          user?: {
            __typename?: 'User';
            photoUrl?: string | null;
            email?: string | null;
            fullName?: string | null;
            userName?: string | null;
          } | null;
        } | null;
        topicPost?: {
          __typename?: 'TopicPost';
          id: number;
          fileUrl?: string | null;
          caption?: string | null;
          fileType: FileType;
          user?: {
            __typename?: 'User';
            photoUrl?: string | null;
            email?: string | null;
            fullName?: string | null;
            userName?: string | null;
          } | null;
        } | null;
        sender?: {
          __typename?: 'User';
          email?: string | null;
          userType: UserType;
          externalId?: string | null;
          id: number;
          isDeleted: boolean;
        } | null;
      } | null> | null;
      pageInfo: {
        __typename?: 'CollectionSegmentInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    } | null;
  } | null;
};

export type Message_GetConversationForUserQueryVariables = Exact<{
  otherUserId: Scalars['Int']['input'];
}>;

export type Message_GetConversationForUserQuery = {
  __typename?: 'Query';
  message_getConversationForUser?: {
    __typename?: 'ResponseBaseOfConversation';
    status?: any | null;
    result?: {
      __typename?: 'Conversation';
      subject?: string | null;
      firstUserId: number;
      secondUserId: number;
      firstUnreadCount: number;
      secondUnreadCount: number;
      latestMessageDate: any;
      id: number;
      isDeleted: boolean;
      messages?: Array<{
        __typename?: 'Message';
        messageType: MessageType;
      } | null> | null;
      firstUser?: {
        __typename?: 'User';
        id: number;
        fullName?: string | null;
        email?: string | null;
        photoUrl?: string | null;
      } | null;
      secondUser?: {
        __typename?: 'User';
        id: number;
        fullName?: string | null;
        photoUrl?: string | null;
        email?: string | null;
      } | null;
    } | null;
  } | null;
};

export type GetConversationIdForUserQueryVariables = Exact<{
  where?: InputMaybe<ConversationInputFilterInput>;
}>;

export type GetConversationIdForUserQuery = {
  __typename?: 'Query';
  message_getUserMessages?: {
    __typename?: 'ListResponseBaseOfConversationInput';
    status?: any | null;
    result?: {
      __typename?: 'ConversationInputCollectionSegment';
      totalCount: number;
      items?: Array<{
        __typename?: 'ConversationInput';
        conversationId: number;
      } | null> | null;
    } | null;
  } | null;
};

export type NotificationAddedSubscriptionVariables = Exact<{
  userId: Scalars['Int']['input'];
}>;

export type NotificationAddedSubscription = {
  __typename?: 'Subscription';
  notificationAdded?: {
    __typename?: 'Notification';
    activityId?: number | null;
    topicId?: number | null;
    messageId?: number | null;
    notificationType: NotificationType;
    title?: string | null;
    description?: string | null;
    activity?: {
      __typename?: 'Activity';
      targetPostId?: number | null;
      activityType: ActivityType;
      userId: number;
      id: number;
      isDeleted: boolean;
      createdDate: any;
      user?: {
        __typename?: 'User';
        userName?: string | null;
        email?: string | null;
        id: number;
      } | null;
      targetUser?: {
        __typename?: 'User';
        userName?: string | null;
        email?: string | null;
        id: number;
      } | null;
      targetPost?: {
        __typename?: 'Post';
        fileUrl?: string | null;
        caption?: string | null;
        id: number;
      } | null;
    } | null;
    topic?: {
      __typename?: 'Topic';
      title?: string | null;
      description?: string | null;
    } | null;
    message?: {__typename?: 'Message'; text?: string | null} | null;
  } | null;
};

export type MessageAddedSubscriptionVariables = Exact<{
  userId: Scalars['Int']['input'];
}>;

export type MessageAddedSubscription = {
  __typename?: 'Subscription';
  messageAdded?: {
    __typename?: 'Message';
    conversationId: number;
    createdAt: any;
    id: number;
    isDeleted: boolean;
    senderId: number;
    messageType: MessageType;
    photoUrl?: string | null;
    postId?: number | null;
    text?: string | null;
  } | null;
};

export type ReportPost_CreateReportPostMutationVariables = Exact<{
  input?: InputMaybe<ReportPostInput>;
}>;

export type ReportPost_CreateReportPostMutation = {
  __typename?: 'Mutation';
  reportPost_createReportPost?: {
    __typename?: 'ResponseBaseOfReportPost';
    status?: any | null;
  } | null;
};

export type PostLike_CreatePostLikeMutationVariables = Exact<{
  input?: InputMaybe<PostLikeInput>;
}>;

export type PostLike_CreatePostLikeMutation = {
  __typename?: 'Mutation';
  postLike_createPostLike?: {
    __typename?: 'ResponseBaseOfPostLike';
    status?: any | null;
    result?: {
      __typename?: 'PostLike';
      userId: number;
      postId: number;
      id: number;
    } | null;
  } | null;
};

export type PostLike_DeletePostLikeMutationVariables = Exact<{
  userId: Scalars['Int']['input'];
  postId: Scalars['Int']['input'];
}>;

export type PostLike_DeletePostLikeMutation = {
  __typename?: 'Mutation';
  postLike_deletePostLike?: {
    __typename?: 'ResponseStatus';
    code: number;
    value?: string | null;
  } | null;
};

export type Post_CreatePostMutationVariables = Exact<{
  input?: InputMaybe<PostInput>;
  categories?: InputMaybe<
    Array<Scalars['Int']['input']> | Scalars['Int']['input']
  >;
  hashtags?: InputMaybe<
    | Array<InputMaybe<Scalars['String']['input']>>
    | InputMaybe<Scalars['String']['input']>
  >;
}>;

export type Post_CreatePostMutation = {
  __typename?: 'Mutation';
  post_createPost?: {
    __typename?: 'ResponseBaseOfPost';
    status?: any | null;
    result?: {__typename?: 'Post'; id: number} | null;
  } | null;
};

export type Post_DeletePostMutationVariables = Exact<{
  entityId: Scalars['Int']['input'];
}>;

export type Post_DeletePostMutation = {
  __typename?: 'Mutation';
  post_deletePost?: {
    __typename?: 'ResponseStatus';
    code: number;
    value?: string | null;
  } | null;
};

export type PostView_CreatePostViewMutationVariables = Exact<{
  input?: InputMaybe<PostViewInput>;
}>;

export type PostView_CreatePostViewMutation = {
  __typename?: 'Mutation';
  postView_createPostView?: {
    __typename?: 'ResponseBaseOfPostView';
    status?: any | null;
    result?: {
      __typename?: 'PostView';
      userId: number;
      postId: number;
      id: number;
    } | null;
  } | null;
};

export type PostSave_CreatePostSaveMutationVariables = Exact<{
  input?: InputMaybe<PostSaveInput>;
}>;

export type PostSave_CreatePostSaveMutation = {
  __typename?: 'Mutation';
  postSave_createPostSave?: {
    __typename?: 'ResponseBaseOfPostSave';
    status?: any | null;
    result?: {
      __typename?: 'PostSave';
      userId: number;
      postId: number;
      id: number;
    } | null;
  } | null;
};

export type Post_SetAsRecommendedMutationVariables = Exact<{
  entityId: Scalars['Int']['input'];
  setAsRecommended: Scalars['Boolean']['input'];
}>;

export type Post_SetAsRecommendedMutation = {
  __typename?: 'Mutation';
  post_setAsRecommended?: {
    __typename?: 'ResponseBaseOfPost';
    status?: any | null;
    result?: {__typename?: 'Post'; id: number} | null;
  } | null;
};

export type Post_GetByUserIdQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<PostFilterInput>;
  order?: InputMaybe<Array<PostSortInput> | PostSortInput>;
  userId: Scalars['Int']['input'];
}>;

export type Post_GetByUserIdQuery = {
  __typename?: 'Query';
  post_getByUserId?: {
    __typename?: 'ListResponseBaseOfPost';
    status?: any | null;
    result?: {
      __typename?: 'PostCollectionSegment';
      totalCount: number;
      items?: Array<{
        __typename?: 'Post';
        fileUrl?: string | null;
        fileType: FileType;
        caption?: string | null;
        viewCount: number;
        userId: number;
        setAsRecommended: boolean;
        postLikeCount?: number | null;
        commentCount?: number | null;
        reportCount?: number | null;
        id: number;
        isDeleted: boolean;
        createdDate: any;
        lastModifiedDate?: any | null;
      } | null> | null;
      pageInfo: {
        __typename?: 'CollectionSegmentInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    } | null;
  } | null;
};

export type GetVideosStaticsQueryVariables = Exact<{[key: string]: never}>;

export type GetVideosStaticsQuery = {
  __typename?: 'Query';
  post_getPosts?: {
    __typename?: 'ListResponseBaseOfPost';
    result?: {__typename?: 'PostCollectionSegment'; totalCount: number} | null;
  } | null;
};

export type PostLike_GetPostLikesQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<PostLikeFilterInput>;
  order?: InputMaybe<Array<PostLikeSortInput> | PostLikeSortInput>;
}>;

export type PostLike_GetPostLikesQuery = {
  __typename?: 'Query';
  postLike_getPostLikes?: {
    __typename?: 'ListResponseBaseOfPostLike';
    status?: any | null;
    result?: {
      __typename?: 'PostLikeCollectionSegment';
      totalCount: number;
    } | null;
  } | null;
};

export type PostView_GetPostViewsQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<PostViewFilterInput>;
  order?: InputMaybe<Array<PostViewSortInput> | PostViewSortInput>;
}>;

export type PostView_GetPostViewsQuery = {
  __typename?: 'Query';
  postView_getPostViews?: {
    __typename?: 'ListResponseBaseOfPostView';
    status?: any | null;
    result?: {
      __typename?: 'PostViewCollectionSegment';
      totalCount: number;
    } | null;
  } | null;
};

export type User_GetUserCountPerMonthQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<MonthlyReportDtoFilterInput>;
}>;

export type User_GetUserCountPerMonthQuery = {
  __typename?: 'Query';
  user_getUserCountPerMonth?: {
    __typename?: 'ListResponseBaseOfMonthlyReportDto';
    status?: any | null;
    result?: {
      __typename?: 'MonthlyReportDtoCollectionSegment';
      totalCount: number;
      items?: Array<{
        __typename?: 'MonthlyReportDto';
        year: number;
        month: number;
        count: number;
      } | null> | null;
      pageInfo: {
        __typename?: 'CollectionSegmentInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    } | null;
  } | null;
};

export type User_GetUserCountPerYearQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
}>;

export type User_GetUserCountPerYearQuery = {
  __typename?: 'Query';
  user_getUserCountPerYear?: {
    __typename?: 'ListResponseBaseOfYearlyReportDto';
    status?: any | null;
    result?: {
      __typename?: 'YearlyReportDtoCollectionSegment';
      totalCount: number;
      items?: Array<{
        __typename?: 'YearlyReportDto';
        year: number;
        count: number;
      } | null> | null;
      pageInfo: {
        __typename?: 'CollectionSegmentInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    } | null;
  } | null;
};

export type Post_GetPostCountPerMonthQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  fileType: FileType;
  where?: InputMaybe<MonthlyReportDtoFilterInput>;
}>;

export type Post_GetPostCountPerMonthQuery = {
  __typename?: 'Query';
  post_getPostCountPerMonth?: {
    __typename?: 'ListResponseBaseOfMonthlyReportDto';
    status?: any | null;
    result?: {
      __typename?: 'MonthlyReportDtoCollectionSegment';
      totalCount: number;
      items?: Array<{
        __typename?: 'MonthlyReportDto';
        year: number;
        month: number;
        count: number;
      } | null> | null;
      pageInfo: {
        __typename?: 'CollectionSegmentInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    } | null;
  } | null;
};

export type Post_GetPostCountPerYearQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  fileType: FileType;
}>;

export type Post_GetPostCountPerYearQuery = {
  __typename?: 'Query';
  post_getPostCountPerYear?: {
    __typename?: 'ListResponseBaseOfYearlyReportDto';
    status?: any | null;
    result?: {
      __typename?: 'YearlyReportDtoCollectionSegment';
      totalCount: number;
      items?: Array<{
        __typename?: 'YearlyReportDto';
        year: number;
        count: number;
      } | null> | null;
      pageInfo: {
        __typename?: 'CollectionSegmentInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    } | null;
  } | null;
};

export type Post_GetLikeCountPerMonthQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<MonthlyReportDtoFilterInput>;
}>;

export type Post_GetLikeCountPerMonthQuery = {
  __typename?: 'Query';
  post_getLikeCountPerMonth?: {
    __typename?: 'ListResponseBaseOfMonthlyReportDto';
    status?: any | null;
    result?: {
      __typename?: 'MonthlyReportDtoCollectionSegment';
      totalCount: number;
      items?: Array<{
        __typename?: 'MonthlyReportDto';
        year: number;
        month: number;
        count: number;
      } | null> | null;
      pageInfo: {
        __typename?: 'CollectionSegmentInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    } | null;
  } | null;
};

export type Post_GetLikeCountPerYearQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
}>;

export type Post_GetLikeCountPerYearQuery = {
  __typename?: 'Query';
  post_getLikeCountPerYear?: {
    __typename?: 'ListResponseBaseOfYearlyReportDto';
    status?: any | null;
    result?: {
      __typename?: 'YearlyReportDtoCollectionSegment';
      totalCount: number;
      items?: Array<{
        __typename?: 'YearlyReportDto';
        year: number;
        count: number;
      } | null> | null;
      pageInfo: {
        __typename?: 'CollectionSegmentInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    } | null;
  } | null;
};

export type Post_GetCommentCountPerMonthQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<MonthlyReportDtoFilterInput>;
}>;

export type Post_GetCommentCountPerMonthQuery = {
  __typename?: 'Query';
  post_getCommentCountPerMonth?: {
    __typename?: 'ListResponseBaseOfMonthlyReportDto';
    status?: any | null;
    result?: {
      __typename?: 'MonthlyReportDtoCollectionSegment';
      totalCount: number;
      items?: Array<{
        __typename?: 'MonthlyReportDto';
        year: number;
        month: number;
        count: number;
      } | null> | null;
      pageInfo: {
        __typename?: 'CollectionSegmentInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    } | null;
  } | null;
};

export type Post_GetCommentCountPerYearQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
}>;

export type Post_GetCommentCountPerYearQuery = {
  __typename?: 'Query';
  post_getCommentCountPerYear?: {
    __typename?: 'ListResponseBaseOfYearlyReportDto';
    status?: any | null;
    result?: {
      __typename?: 'YearlyReportDtoCollectionSegment';
      totalCount: number;
      items?: Array<{
        __typename?: 'YearlyReportDto';
        year: number;
        count: number;
      } | null> | null;
      pageInfo: {
        __typename?: 'CollectionSegmentInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    } | null;
  } | null;
};

export type User_GetPostLikesPerMonthQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  userId: Scalars['Int']['input'];
}>;

export type User_GetPostLikesPerMonthQuery = {
  __typename?: 'Query';
  user_getPostLikesPerMonth?: {
    __typename?: 'ListResponseBaseOfMonthlyReportDto';
    status?: any | null;
    result?: {
      __typename?: 'MonthlyReportDtoCollectionSegment';
      totalCount: number;
      items?: Array<{
        __typename?: 'MonthlyReportDto';
        year: number;
        month: number;
        count: number;
      } | null> | null;
      pageInfo: {
        __typename?: 'CollectionSegmentInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    } | null;
  } | null;
};

export type User_GetPostViewsPerMonthQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  userId: Scalars['Int']['input'];
}>;

export type User_GetPostViewsPerMonthQuery = {
  __typename?: 'Query';
  user_getPostViewsPerMonth?: {
    __typename?: 'ListResponseBaseOfMonthlyReportDto';
    status?: any | null;
    result?: {
      __typename?: 'MonthlyReportDtoCollectionSegment';
      totalCount: number;
      items?: Array<{
        __typename?: 'MonthlyReportDto';
        year: number;
        month: number;
        count: number;
      } | null> | null;
      pageInfo: {
        __typename?: 'CollectionSegmentInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    } | null;
  } | null;
};

export type Topic_CreateTopicMutationVariables = Exact<{
  input?: InputMaybe<TopicInput>;
  invitedUserIds?: InputMaybe<
    Array<Scalars['Int']['input']> | Scalars['Int']['input']
  >;
}>;

export type Topic_CreateTopicMutation = {
  __typename?: 'Mutation';
  topic_createTopic?: {
    __typename?: 'ResponseBaseOfTopic';
    status?: any | null;
    result?: {__typename?: 'Topic'; id: number} | null;
  } | null;
};

export type TopicUser_CreateTopicUserMutationVariables = Exact<{
  input?: InputMaybe<TopicUserInput>;
}>;

export type TopicUser_CreateTopicUserMutation = {
  __typename?: 'Mutation';
  topicUser_createTopicUser?: {
    __typename?: 'ResponseBaseOfTopicUser';
    status?: any | null;
  } | null;
};

export type TopicPost_CreateTopicPostMutationVariables = Exact<{
  input?: InputMaybe<TopicPostInput>;
  hashtags?: InputMaybe<
    | Array<InputMaybe<Scalars['String']['input']>>
    | InputMaybe<Scalars['String']['input']>
  >;
}>;

export type TopicPost_CreateTopicPostMutation = {
  __typename?: 'Mutation';
  topicPost_createTopicPost?: {
    __typename?: 'ResponseBaseOfTopicPost';
    status?: any | null;
    result?: {__typename?: 'TopicPost'; id: number} | null;
  } | null;
};

export type TopicPostLike_CreateTopicPostLikeMutationVariables = Exact<{
  input?: InputMaybe<TopicPostLikeInput>;
}>;

export type TopicPostLike_CreateTopicPostLikeMutation = {
  __typename?: 'Mutation';
  topicPostLike_createTopicPostLike?: {
    __typename?: 'ResponseBaseOfTopicPostLike';
    status?: any | null;
  } | null;
};

export type TopicPostLike_DeleteTopicPostLikeMutationVariables = Exact<{
  userId: Scalars['Int']['input'];
  topicPostId: Scalars['Int']['input'];
}>;

export type TopicPostLike_DeleteTopicPostLikeMutation = {
  __typename?: 'Mutation';
  TopicPostLike_deleteTopicPostLike?: {
    __typename?: 'ResponseStatus';
    code: number;
    value?: string | null;
  } | null;
};

export type TopicPostComment_CreateTopicPostCommentMutationVariables = Exact<{
  input?: InputMaybe<TopicPostCommentInput>;
}>;

export type TopicPostComment_CreateTopicPostCommentMutation = {
  __typename?: 'Mutation';
  topicPostComment_createTopicPostComment?: {
    __typename?: 'ResponseBaseOfTopicPostComment';
    status?: any | null;
    result?: {
      __typename?: 'TopicPostComment';
      likeCount: number;
      userId: number;
      parentId?: number | null;
      topicPostId: number;
      id: number;
      createdDate: any;
    } | null;
  } | null;
};

export type TopicPostComment_DeleteTopicPostCommentMutationVariables = Exact<{
  entityId: Scalars['Int']['input'];
}>;

export type TopicPostComment_DeleteTopicPostCommentMutation = {
  __typename?: 'Mutation';
  topicPostComment_deleteTopicPostComment?: {
    __typename?: 'ResponseStatus';
    code: number;
    value?: string | null;
  } | null;
};

export type TopicPost_DeleteTopicPostMutationVariables = Exact<{
  entityId: Scalars['Int']['input'];
}>;

export type TopicPost_DeleteTopicPostMutation = {
  __typename?: 'Mutation';
  topicPost_deleteTopicPost?: {
    __typename?: 'ResponseStatus';
    code: number;
    value?: string | null;
  } | null;
};

export type ReportTopicPost_CreateReportTopicPostMutationVariables = Exact<{
  input?: InputMaybe<ReportTopicPostInput>;
}>;

export type ReportTopicPost_CreateReportTopicPostMutation = {
  __typename?: 'Mutation';
  reportTopicPost_createReportTopicPost?: {
    __typename?: 'ResponseBaseOfReportTopicPost';
    status?: any | null;
  } | null;
};

export type Topic_DeleteTopicMutationVariables = Exact<{
  entityId: Scalars['Int']['input'];
}>;

export type Topic_DeleteTopicMutation = {
  __typename?: 'Mutation';
  topic_deleteTopic?: {
    __typename?: 'ResponseStatus';
    code: number;
    value?: string | null;
  } | null;
};

export type Topic_AllTopicsQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<TopicFilterInput>;
  order?: InputMaybe<Array<TopicSortInput> | TopicSortInput>;
}>;

export type Topic_AllTopicsQuery = {
  __typename?: 'Query';
  topic_getTopics?: {
    __typename?: 'ListResponseBaseOfTopic';
    status?: any | null;
    result?: {
      __typename?: 'TopicCollectionSegment';
      totalCount: number;
      items?: Array<{
        __typename?: 'Topic';
        title?: string | null;
        description?: string | null;
        id: number;
        topicUsers?: Array<{
          __typename?: 'TopicUser';
          userId: number;
        } | null> | null;
      } | null> | null;
      pageInfo: {
        __typename?: 'CollectionSegmentInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    } | null;
  } | null;
};

export type TopicUser_GetByUserIdQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<TopicUserFilterInput>;
  order?: InputMaybe<Array<TopicUserSortInput> | TopicUserSortInput>;
  userId: Scalars['Int']['input'];
}>;

export type TopicUser_GetByUserIdQuery = {
  __typename?: 'Query';
  topicUser_getByUserId?: {
    __typename?: 'ListResponseBaseOfTopicUser';
    status?: any | null;
    result?: {
      __typename?: 'TopicUserCollectionSegment';
      totalCount: number;
      items?: Array<{
        __typename?: 'TopicUser';
        topicId: number;
        userId: number;
        invitedByUserId?: number | null;
        id: number;
        topic?: {
          __typename?: 'Topic';
          title?: string | null;
          description?: string | null;
          id: number;
        } | null;
      } | null> | null;
      pageInfo: {
        __typename?: 'CollectionSegmentInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    } | null;
  } | null;
};

export type TopicUser_GetCountByUserIdQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<TopicUserFilterInput>;
  order?: InputMaybe<Array<TopicUserSortInput> | TopicUserSortInput>;
  userId: Scalars['Int']['input'];
}>;

export type TopicUser_GetCountByUserIdQuery = {
  __typename?: 'Query';
  topicUser_getByUserId?: {
    __typename?: 'ListResponseBaseOfTopicUser';
    status?: any | null;
    result?: {
      __typename?: 'TopicUserCollectionSegment';
      totalCount: number;
    } | null;
  } | null;
};

export type Topic_GetTopicsCountQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<TopicFilterInput>;
  order?: InputMaybe<Array<TopicSortInput> | TopicSortInput>;
}>;

export type Topic_GetTopicsCountQuery = {
  __typename?: 'Query';
  topic_getTopics?: {
    __typename?: 'ListResponseBaseOfTopic';
    status?: any | null;
    result?: {__typename?: 'TopicCollectionSegment'; totalCount: number} | null;
  } | null;
};

export type TopicPost_GetByTopicIdQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<TopicPostFilterInput>;
  order?: InputMaybe<Array<TopicPostSortInput> | TopicPostSortInput>;
  topicId: Scalars['Int']['input'];
}>;

export type TopicPost_GetByTopicIdQuery = {
  __typename?: 'Query';
  topicPost_getByTopicId?: {
    __typename?: 'ListResponseBaseOfTopicPost';
    status?: any | null;
    result?: {
      __typename?: 'TopicPostCollectionSegment';
      totalCount: number;
      items?: Array<{
        __typename?: 'TopicPost';
        caption?: string | null;
        topicId: number;
        commentCount?: number | null;
        userId: number;
        fileUrl?: string | null;
        fileType: FileType;
        likeCount: number;
        id: number;
        createdDate: any;
        reportCount?: number | null;
        user?: {
          __typename?: 'User';
          userName?: string | null;
          photoUrl?: string | null;
        } | null;
        topicPostComments?: Array<{
          __typename?: 'TopicPostComment';
          id: number;
        } | null> | null;
      } | null> | null;
      pageInfo: {
        __typename?: 'CollectionSegmentInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    } | null;
  } | null;
};

export type TopicPost_GetTopicPostQueryVariables = Exact<{
  entityId: Scalars['Int']['input'];
}>;

export type TopicPost_GetTopicPostQuery = {
  __typename?: 'Query';
  topicPost_getTopicPost?: {
    __typename?: 'SingleResponseBaseOfTopicPost';
    status?: any | null;
    result?: {
      __typename?: 'TopicPost';
      fileUrl?: string | null;
      fileType: FileType;
      caption?: string | null;
      userId: number;
      likeCount: number;
      commentCount?: number | null;
      reportCount?: number | null;
      id: number;
      createdDate: any;
      user?: {
        __typename?: 'User';
        userName?: string | null;
        photoUrl?: string | null;
        id: number;
      } | null;
      topicPostComments?: Array<{
        __typename?: 'TopicPostComment';
        commentText?: string | null;
      } | null> | null;
      topicPostHashtags?: Array<{
        __typename?: 'TopicPostHashtag';
        hashtag?: {
          __typename?: 'Hashtag';
          title?: string | null;
          id: number;
        } | null;
      } | null> | null;
      topicPostLikes?: Array<{
        __typename?: 'TopicPostLike';
        userId: number;
      } | null> | null;
    } | null;
  } | null;
};

export type TopicPostComment_GetByTopicPostIdQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<TopicPostCommentFilterInput>;
  order?: InputMaybe<
    Array<TopicPostCommentSortInput> | TopicPostCommentSortInput
  >;
  topicPostId: Scalars['Int']['input'];
}>;

export type TopicPostComment_GetByTopicPostIdQuery = {
  __typename?: 'Query';
  topicPostComment_getByTopicPostId?: {
    __typename?: 'ListResponseBaseOfTopicPostComment';
    status?: any | null;
    result?: {
      __typename?: 'TopicPostCommentCollectionSegment';
      totalCount: number;
      items?: Array<{
        __typename?: 'TopicPostComment';
        commentText?: string | null;
        likeCount: number;
        parentId?: number | null;
        id: number;
        createdDate: any;
        user?: {
          __typename?: 'User';
          userName?: string | null;
          photoUrl?: string | null;
          id: number;
        } | null;
        childComments?: Array<{
          __typename?: 'TopicPostComment';
          commentText?: string | null;
          likeCount: number;
          id: number;
          user?: {
            __typename?: 'User';
            photoUrl?: string | null;
            userName?: string | null;
            id: number;
          } | null;
        } | null> | null;
      } | null> | null;
      pageInfo: {
        __typename?: 'CollectionSegmentInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    } | null;
  } | null;
};

export type TopicPostLike_GetTopicPostLikesQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<TopicPostLikeFilterInput>;
  order?: InputMaybe<Array<TopicPostLikeSortInput> | TopicPostLikeSortInput>;
}>;

export type TopicPostLike_GetTopicPostLikesQuery = {
  __typename?: 'Query';
  topicPostLike_getTopicPostLikes?: {
    __typename?: 'ListResponseBaseOfTopicPostLike';
    status?: any | null;
    result?: {
      __typename?: 'TopicPostLikeCollectionSegment';
      totalCount: number;
      items?: Array<{
        __typename?: 'TopicPostLike';
        user?: {
          __typename?: 'User';
          userName?: string | null;
          photoUrl?: string | null;
          id: number;
        } | null;
      } | null> | null;
      pageInfo: {
        __typename?: 'CollectionSegmentInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    } | null;
  } | null;
};

export type TopicPostComment_CustomeGetTopicPostCommentsQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<TopicPostCommentDtoFilterInput>;
  order?: InputMaybe<
    Array<TopicPostCommentDtoSortInput> | TopicPostCommentDtoSortInput
  >;
}>;

export type TopicPostComment_CustomeGetTopicPostCommentsQuery = {
  __typename?: 'Query';
  topicPostComment_customeGetTopicPostComments?: {
    __typename?: 'ListResponseBaseOfTopicPostCommentDto';
    status?: any | null;
    result?: {
      __typename?: 'TopicPostCommentDtoCollectionSegment';
      totalCount: number;
      items?: Array<{
        __typename?: 'TopicPostCommentDto';
        commentText?: string | null;
        likeCount: number;
        parentId?: number | null;
        userId: number;
        replyCount: number;
        id?: number | null;
        isLiked: boolean;
        user?: {
          __typename?: 'User';
          userName?: string | null;
          photoUrl?: string | null;
          id: number;
        } | null;
      } | null> | null;
      pageInfo: {
        __typename?: 'CollectionSegmentInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    } | null;
  } | null;
};

export type TopicPost_GetByHashtagIdsQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<TopicPostFilterInput>;
  order?: InputMaybe<Array<TopicPostSortInput> | TopicPostSortInput>;
  hashtagIds?: InputMaybe<
    Array<Scalars['Int']['input']> | Scalars['Int']['input']
  >;
}>;

export type TopicPost_GetByHashtagIdsQuery = {
  __typename?: 'Query';
  topicPost_getByHashtagIds?: {
    __typename?: 'ListResponseBaseOfTopicPost';
    status?: any | null;
    result?: {
      __typename?: 'TopicPostCollectionSegment';
      totalCount: number;
      items?: Array<{
        __typename?: 'TopicPost';
        caption?: string | null;
        topicId: number;
        commentCount?: number | null;
        userId: number;
        fileUrl?: string | null;
        fileType: FileType;
        likeCount: number;
        id: number;
        createdDate: any;
        reportCount?: number | null;
        user?: {
          __typename?: 'User';
          userName?: string | null;
          photoUrl?: string | null;
        } | null;
        topicPostComments?: Array<{
          __typename?: 'TopicPostComment';
          id: number;
        } | null> | null;
      } | null> | null;
      pageInfo: {
        __typename?: 'CollectionSegmentInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    } | null;
  } | null;
};

export type Topic_GetTopicsReportQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<TopicReportDtoFilterInput>;
  order?: InputMaybe<Array<TopicReportDtoSortInput> | TopicReportDtoSortInput>;
}>;

export type Topic_GetTopicsReportQuery = {
  __typename?: 'Query';
  topic_getTopicsReport?: {
    __typename?: 'ListResponseBaseOfTopicReportDto';
    status?: any | null;
    result?: {
      __typename?: 'TopicReportDtoCollectionSegment';
      totalCount: number;
      items?: Array<{
        __typename?: 'TopicReportDto';
        usersCount: number;
        commentsCount: number;
        likesCount: number;
        topic?: {
          __typename?: 'Topic';
          id: number;
          title?: string | null;
          description?: string | null;
          topicUsers?: Array<{
            __typename?: 'TopicUser';
            userId: number;
          } | null> | null;
        } | null;
      } | null> | null;
      pageInfo: {
        __typename?: 'CollectionSegmentInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    } | null;
  } | null;
};

export type User_UpdateProfileMutationVariables = Exact<{
  userInput?: InputMaybe<UserInput>;
}>;

export type User_UpdateProfileMutation = {
  __typename?: 'Mutation';
  user_updateProfile?: {
    __typename?: 'ResponseBaseOfUser';
    status?: any | null;
    result?: {
      __typename?: 'User';
      userName?: string | null;
      photoUrl?: string | null;
      fullName?: string | null;
      aboutText?: string | null;
      userType: UserType;
      isActive: boolean;
      phoneNumber?: string | null;
      externalId?: string | null;
      email?: string | null;
      id: number;
      isDeleted: boolean;
      createdDate: any;
      lastModifiedDate?: any | null;
      location?: {
        __typename?: 'GeoJSONPointType';
        coordinates?: any | null;
      } | null;
    } | null;
  } | null;
};

export type ReportUser_CreateReportUserMutationVariables = Exact<{
  input?: InputMaybe<ReportUserInput>;
}>;

export type ReportUser_CreateReportUserMutation = {
  __typename?: 'Mutation';
  reportUser_createReportUser?: {
    __typename?: 'ResponseBaseOfReportUser';
    status?: any | null;
    result?: {
      __typename?: 'ReportUser';
      violationType: ViolationType;
      description?: string | null;
      reporterUserId: number;
      reportedUserId: number;
      id: number;
    } | null;
  } | null;
};

export type User_ChangeNotificationDetailMutationVariables = Exact<{
  userInput?: InputMaybe<UserNotificationDetailInput>;
}>;

export type User_ChangeNotificationDetailMutation = {
  __typename?: 'Mutation';
  user_changeNotificationDetail?: {
    __typename?: 'ResponseBaseOfUser';
    status?: any | null;
    result?: {__typename?: 'User'; id: number} | null;
  } | null;
};

export type User_GetOtherProfileQueryVariables = Exact<{
  userId: Scalars['Int']['input'];
}>;

export type User_GetOtherProfileQuery = {
  __typename?: 'Query';
  user_getProfile?: {
    __typename?: 'SingleResponseBaseOfUser';
    status?: any | null;
    result?: {
      __typename?: 'User';
      userName?: string | null;
      userType: UserType;
      photoUrl?: string | null;
      fullName?: string | null;
      aboutText?: string | null;
      phoneNumber?: string | null;
      isActive: boolean;
      email?: string | null;
      id: number;
      userCategories?: Array<{
        __typename?: 'UserCategory';
        category?: {
          __typename?: 'Category';
          title?: string | null;
          id: number;
        } | null;
      } | null> | null;
    } | null;
  } | null;
};

export type User_GetProfileQueryVariables = Exact<{[key: string]: never}>;

export type User_GetProfileQuery = {
  __typename?: 'Query';
  user_getProfile?: {
    __typename?: 'SingleResponseBaseOfUser';
    status?: any | null;
    result?: {
      __typename?: 'User';
      userName?: string | null;
      photoUrl?: string | null;
      fullName?: string | null;
      aboutText?: string | null;
      phoneNumber?: string | null;
      email?: string | null;
      id: number;
      showNewMessageNotifications: boolean;
      showLikeNotifications: boolean;
      showCommentNotifications: boolean;
      showRecomandationNotifications: boolean;
      showOtherNotifications: boolean;
      location?: {
        __typename?: 'GeoJSONPointType';
        coordinates?: any | null;
      } | null;
      userCategories?: Array<{
        __typename?: 'UserCategory';
        category?: {
          __typename?: 'Category';
          title?: string | null;
          id: number;
        } | null;
      } | null> | null;
    } | null;
  } | null;
};

export type Message_GetUserMessagesQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ConversationInputFilterInput>;
  order?: InputMaybe<
    Array<ConversationInputSortInput> | ConversationInputSortInput
  >;
  includeDeletedRows?: InputMaybe<Scalars['Boolean']['input']>;
}>;

export type Message_GetUserMessagesQuery = {
  __typename?: 'Query';
  message_getUserMessages?: {
    __typename?: 'ListResponseBaseOfConversationInput';
    status?: any | null;
    result?: {
      __typename?: 'ConversationInputCollectionSegment';
      totalCount: number;
      items?: Array<{
        __typename?: 'ConversationInput';
        userEmail?: string | null;
        userFullName?: string | null;
        subject?: string | null;
        conversationId: number;
        unreadCount: number;
        latestMessageDate: any;
        lastMessageText?: string | null;
        user?: {
          __typename?: 'User';
          id: number;
          userName?: string | null;
          photoUrl?: string | null;
        } | null;
      } | null> | null;
      pageInfo: {
        __typename?: 'CollectionSegmentInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    } | null;
  } | null;
};

export type User_GetNearbyUsersMutationVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  currentLocation?: InputMaybe<Scalars['Position']['input']>;
  updateLocation: Scalars['Boolean']['input'];
}>;

export type User_GetNearbyUsersMutation = {
  __typename?: 'Mutation';
  user_getNearbyUsers?: {
    __typename?: 'ListResponseBaseOfUserDistanceDto';
    status?: any | null;
    result?: {
      __typename?: 'UserDistanceDtoCollectionSegment';
      totalCount: number;
      items?: Array<{
        __typename?: 'UserDistanceDto';
        userName?: string | null;
        photoUrl?: string | null;
        distance: number;
        id: number;
      } | null> | null;
      pageInfo: {
        __typename?: 'CollectionSegmentInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    } | null;
  } | null;
};
