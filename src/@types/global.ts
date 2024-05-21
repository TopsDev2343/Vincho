export enum formats {
  Image = 'image',
  Video = 'video',
  None = 'none',
}
export enum reportReason {
  Spam = 'SPAM',
  Nudity = 'NUDITY_OR_SEXUAL_ACTIVITY',
  Hate = 'HATE_SPEECH_OR_SYMBOLS',
  Scam = 'SCAM_OR_FRAUD',
  other = 'OTHER',
}

export enum userActivityType {
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
  TopicPostLike = 'TOPIC_POST_LIKE',
  TopicPostUnLike = 'TOPIC_POST_UN_LIKE',
  UnBlock = 'UN_BLOCK',
  UnFollow = 'UN_FOLLOW',
  UnLike = 'UN_LIKE',
  UnSave = 'UN_SAVE',
}

export enum postFileType {
  Image = 'IMAGE',
  Video = 'VIDEO',
}

export enum appUserType {
  Admin = 'ADMIN',
  Artist = 'ARTIST',
  SuperAdmin = 'SUPER_ADMIN',
}

declare global {
  type FirebaseToken = {
    aud: string;
    exp: number;
    iat: number;
    iss: string;
    sub: string;
    email: string;
    user_id: string;
    auth_time: number;
    email_verified: boolean;
    firebase: {
      identities: {email?: Array<string>};
      sign_in_provider: 'password' | string;
    };
  };
}
