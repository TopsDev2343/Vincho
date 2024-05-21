import {showTimeAgoText} from './showTimeAgoText';

function dataProvider(value: object) {
  if (value?.activity) {
    let item = value;
    value = value?.activity;
    if (value?.targetUser) {
      return {
        user: {
          userName: value?.targetUser?.userName,
          photoUrl: value?.user?.photoUrl,
        },
        fileUrl: null,
        createDate: showTimeAgoText(value?.createdDate),
      };
    } else if (value?.targetPost) {
      return {
        user: value?.user,
        fileUrl: value?.targetPost?.fileUrl,
        fileType: value?.targetPost?.fileType,
        createDate: showTimeAgoText(value?.createdDate),
      };
    } else if (value?.targetComment) {
      return {
        user: value?.user,
        fileUrl: value?.targetComment?.post?.fileUrl,
        fileType: value?.targetComment?.post?.fileType,
        createDate: showTimeAgoText(value?.createdDate),
      };
    } else if (value?.targetTopicPost) {
      return {
        user: value?.user,
        fileUrl: value?.targetTopicPost?.fileUrl,
        fileType: value?.targetTopicPost?.fileType,
        createDate: showTimeAgoText(value?.createdDate),
      };
    }
  } else {
    return {
      user: value?.user,
      fileUrl: value?.post?.fileUrl,
      fileType: value?.post?.fileType,
      createDate: showTimeAgoText(value?.createdDate),
    };
  }
}

export {dataProvider};
