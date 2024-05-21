import {userActivityType, appUserType} from '~/@types/global';
import {
  getTodayDate,
  getLastWeekDate,
  getLastMonthDate,
} from '../utils/getDatePeriod';

export function recentActivitiesFilter(value: string, selectedTab: any) {
  let filterInput;

  if (selectedTab === 3) {
    filterInput = {
      userType: {eq: appUserType.Artist},
      createdDate: {
        gte:
          value === 'Daily'
            ? getTodayDate()
            : value === 'Weekly'
            ? getLastWeekDate()
            : getLastMonthDate(),
      },
    };
  } else {
    filterInput = [
      {
        user: {userType: {eq: appUserType.Artist}},
        createdDate: {
          gte:
            value === 'Daily'
              ? getTodayDate()
              : value === 'Weekly'
              ? getLastWeekDate()
              : getLastMonthDate(),
        },
        or: [
          {activityType: {eq: userActivityType.SharePost}},
          {activityType: {eq: userActivityType.ShareTopicPost}},
        ],
      },
      {
        user: {userType: {eq: appUserType.Artist}},
        createdDate: {
          gte:
            value === 'Daily'
              ? getTodayDate()
              : value === 'Weekly'
              ? getLastWeekDate()
              : getLastMonthDate(),
        },
        or: [
          {activityType: {eq: userActivityType.Like}},
          {activityType: {eq: userActivityType.TopicPostLike}},
        ],
      },
      {
        user: {userType: {eq: appUserType.Artist}},
        createdDate: {
          gte:
            value === 'Daily'
              ? getTodayDate()
              : value === 'Weekly'
              ? getLastWeekDate()
              : getLastMonthDate(),
        },
        or: [
          {activityType: {eq: userActivityType.Comment}},
          {activityType: {eq: userActivityType.TopicPostComment}},
        ],
      },
      {
        user: {userType: {eq: appUserType.Artist}},
        createdDate: {
          gte:
            value === 'Daily'
              ? getTodayDate()
              : value === 'Weekly'
              ? getLastWeekDate()
              : getLastMonthDate(),
        },
        or: [
          {activityType: {eq: userActivityType.SharePost}},
          {activityType: {eq: userActivityType.ShareTopicPost}},
        ],
      },
    ];
  }

  return filterInput;
}

export function recentActivitiesFilterSatistic(value: number) {
  let filterInput;
  filterInput = [
    {
      or: [
        {activityType: {eq: userActivityType.SharePost}},
        {activityType: {eq: userActivityType.ShareTopicPost}},
      ],
      and: [
        {
          createdDate: {
            gte: value === 1 ? getLastWeekDate() : getLastMonthDate(),
          },
        },
        {user: {userType: {eq: appUserType.Artist}}},
      ],
    },
    {
      or: [
        {activityType: {eq: userActivityType.Like}},
        {activityType: {eq: userActivityType.TopicPostLike}},
      ],
      and: [
        {
          createdDate: {
            gte: value === 1 ? getLastWeekDate() : getLastMonthDate(),
          },
        },
        {user: {userType: {eq: appUserType.Artist}}},
      ],
    },
    {
      or: [
        {activityType: {eq: userActivityType.Comment}},
        {activityType: {eq: userActivityType.TopicPostComment}},
      ],
      and: [
        {
          createdDate: {
            gte: value === 1 ? getLastWeekDate() : getLastMonthDate(),
          },
        },
        {user: {userType: {eq: appUserType.Artist}}},
      ],
    },
    {
      or: [
        {activityType: {eq: userActivityType.SharePost}},
        {activityType: {eq: userActivityType.ShareTopicPost}},
      ],
      and: [
        {
          createdDate: {
            gte: value === 1 ? getLastWeekDate() : getLastMonthDate(),
          },
        },
        {user: {userType: {eq: appUserType.Artist}}},
      ],
    },
  ];

  return filterInput;
}
