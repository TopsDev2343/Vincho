import {userActivityType} from '~/@types/global';
import {showTimeAgoText} from './showTimeAgoText';

function activityTypeDescProvider(activityType: string, username: string) {
  switch (activityType) {
    case userActivityType.Block:
      return ` blocked ${username}. `;
    case userActivityType.Comment:
      return ` commented on ${username} post. `;
    case userActivityType.DisLikeComment:
      return ` disliked ${username} comment. `;
    case userActivityType.Follow:
      return ` followed ${username}. `;
    case userActivityType.Like:
      return ` liked ${username} post. `;
    case userActivityType.LikeComment:
      return ` liked ${username} comment. `;
    case userActivityType.Report:
      return ` reported ${username} post. `;
    case userActivityType.Save:
      return ` saved ${username} post. `;
    case userActivityType.Share:
      return ` shared post with ${username}. `;
    case userActivityType.SharePost:
      return ` shared a post. `;
    case userActivityType.ShareTopicPost:
      return ` shared a topic post. `;
    case userActivityType.TopicPostComment:
      return ` commented on a topic post by ${username}. `;
    case userActivityType.TopicPostLike:
      return ` liked a topic post by ${username}. `;
    case userActivityType.TopicPostUnLike:
      return ` disliked a topic post by ${username}. `;
    case userActivityType.UnBlock:
      return ` unblocked ${username}. `;
    case userActivityType.UnFollow:
      return ` unfollowed ${username}. `;
    case userActivityType.UnLike:
      return ` disliked ${username} post. `;
    case userActivityType.UnSave:
      return ` unsaved ${username} post. `;
    default:
      return null;
  }
}

function dataProvider(value: object) {
  if (value?.targetUser) {
    return {
      user: {
        userName: value?.targetUser?.userName,
        photoUrl: value?.targeUser?.photoUrl,
      },
      fileUrl: null,
      activityDesc: activityTypeDescProvider(
        value?.activityType,
        value?.targetUser?.userName,
      ),
      createDate: showTimeAgoText(value?.createdDate),
    };
  } else if (value?.targetPost) {
    return {
      user: value?.targetPost?.user,
      fileUrl: value?.targetPost?.fileUrl,
      fileType: value?.targetPost?.fileType,
      activityDesc: activityTypeDescProvider(
        value?.activityType,
        value?.targetPost?.user?.userName,
      ),
      createDate: showTimeAgoText(value?.createdDate),
    };
  } else if (value?.targetComment) {
    return {
      user: value?.targetComment?.post?.user,
      fileUrl: value?.targetComment?.post?.fileUrl,
      fileType: value?.targetComment?.post?.fileType,
      activityDesc: activityTypeDescProvider(
        value?.activityType,
        value?.targetComment?.post?.user?.userName,
      ),
      createDate: showTimeAgoText(value?.createdDate),
    };
  } else if (value?.targetTopicPost) {
    return {
      user: value?.targetTopicPost?.user,
      fileUrl: value?.targetTopicPost?.fileUrl,
      fileType: value?.targetTopicPost?.fileType,
      activityDesc: activityTypeDescProvider(
        value?.activityType,
        value?.targetTopicPost?.user?.userName,
      ),
      createDate: showTimeAgoText(value?.createdDate),
    };
  }
}

export {dataProvider};
