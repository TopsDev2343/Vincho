import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AdminBottomTab from '../adminBottomTab';
import AdminListScreen from '~/screens/admin/Profile/AdminListScreen';
import AdminProfileScreen from '~/screens/admin/Profile/AdminProfileScreen';
import EditAdminProfileScreen from '~/screens/admin/Profile/EditAdminProfileScreen';
import AddAdminScreen from '~/screens/admin/Profile/AddAdminScreen';
import SendLink from '~/screens/artist/Auth/ForgetPass';
import RecentActivities from '~/screens/admin/RecentActivities';
import ReportedAccounts from '~/screens/admin/ReportedAccounts';
import ReportedPosts from '~/screens/admin/ReportedPosts';
import AdminDetailScreen from '~/screens/admin/Profile/AdminDetailScreen';
import ReviewedAccountReportListScreen from '~/screens/admin/Profile/ReviewedAccountReportListScreen';
import ReviewedPostReportListScreen from '~/screens/admin/Profile/ReviewedPostReportListScreen';
import DisabledUsersListScreen from '~/screens/admin/Profile/DisabledUsersListScreen';
import SearchUserScreen from '~/screens/admin/Chat/SearchUserScreen';
import ConversationScreen from '~/screens/admin/Chat/ConversationScreen';
import UserProfile from '~/screens/admin/Profile/UserProfile';
import UserReportedPosts from '~/screens/admin/Profile/UserReportedPosts';
import {Followers, Followings} from '~/screens/admin/Profile/Follow';
import CategoryListScreen from '~/screens/admin/CategoryListScreen';
import AddCategoryScreen from '~/screens/admin/AddCategoryScreen';
import Statistics from '~/screens/admin/Statistics';
import UsersScreen from '~/screens/admin/Statistics/UsersScreen';
import PhotoesScreen from '~/screens/admin/Statistics/PhotoesScreen';
import LikesScreen from '~/screens/admin/Statistics/LikesScreen';
import VideosScreen from '~/screens/admin/Statistics/VideosScreen';
import CommentsScreen from '~/screens/admin/Statistics/CommentsScreen';
import {
  PostDetailScreen,
  PostLikeListScreen,
  PostCommentListScreen,
  TopicComments,
  TopicPostDetail,
  TopicFollow,
} from '~/screens/admin/PostDetail';
import Community from '~/screens/admin/Topics';
import TopicPosts from '~/screens/admin/TopicPosts';
import {PostLikes, PostViews} from '~/screens/admin/Profile/Statistics';
import UserCommentedPostsScreen from '~/screens/admin/Profile/UserCommentedPostsScreen';
import VideoScreen from '~/screens/artist/VideoScreen';
import ImageScreen from '~/screens/artist/ImageScreen';
import TopicSearch from '~/screens/admin/Topics/TopicSearch';
import HashtagPostsSceen from '~/screens/artist/HashtagPostsSceen';
import HashtagTopicPostsSceen from '~/screens/artist/HashtagTopicPostsSceen';
import CollectionDetailScreen from '~/screens/admin/Profile/CollectionDetailScreen';
export type AdminStackParamList = {
  AdminListScreen: undefined;
  AdminProfileScreen: undefined;
  EditAdminProfileScreen: undefined;
  AddAdminScreen: undefined;
  SendCode: undefined;
  ReportedAccounts: undefined;
  SignIn: undefined;
  SignUp: undefined;
  AdminDetailScreen: undefined;
  ReviewedAccountReportListScreen: undefined;
  //ReportedPostsScreen: undefined;
  ReviewedPostReportListScreen: undefined;
  DisabledUsersListScreen: undefined;
  SearchUserScreen: undefined;
  ConversationScreen: undefined;
  ReportedPosts: undefined;
  UserProfile: undefined;
  UserReportedPosts: undefined;
  CategoryListScreen: undefined;
  AddCategoryScreen: undefined;
  Statistics: undefined;
  TopicSearch: undefined;
};

export const adminStack = [
  {
    name: 'AdminTabStack',
    component: AdminBottomTab,
    options: {headerShown: false},
  },
  {
    name: 'AdminList',
    component: AdminListScreen,
    options: {headerShown: false},
  },
  {
    name: 'AdminProfile',
    component: AdminProfileScreen,
    options: {headerShown: false},
  },
  {
    name: 'EditAdminProfile',
    component: EditAdminProfileScreen,
    options: {headerShown: false},
  },
  {
    name: 'AddAdmin',
    component: AddAdminScreen,
    options: {headerShown: false},
  },
  {
    name: 'SendLinkScreen',
    component: SendLink,
    options: {headerShown: false},
  },
  {
    name: 'RecentActivityScreen',
    component: RecentActivities,
    options: {headerShown: false},
  },
  {
    name: 'ReportedAccountScreen',
    component: ReportedAccounts,
    options: {headerShown: false},
  },
  {
    name: 'AdminDetail',
    component: AdminDetailScreen,
    options: {headerShown: false},
  },
  {
    name: 'ReviewedAccountReportList',
    component: ReviewedAccountReportListScreen,
    options: {headerShown: false},
  },
  {
    name: 'ReviewedPostReportList',
    component: ReviewedPostReportListScreen,
    options: {headerShown: false},
  },
  {
    name: 'DisabledUsersList',
    component: DisabledUsersListScreen,
    options: {headerShown: false},
  },
  {
    name: 'SearchUser',
    component: SearchUserScreen,
    options: {headerShown: false},
  },
  {
    name: 'Conversation',
    component: ConversationScreen,
    options: {headerShown: false},
  },
  {
    name: 'ReportedPostScreen',
    component: ReportedPosts,
    options: {headerShown: false},
  },
  {
    name: 'UserProfile',
    component: UserProfile,
    options: {headerShown: false},
  },
  {
    name: 'UserReportedPosts',
    component: UserReportedPosts,
    options: {headerShown: false},
  },
  {
    name: 'FollowingScreen',
    component: Followings,
    options: {headerShown: false},
  },
  {
    name: 'FollowerScreen',
    component: Followers,
    options: {headerShown: false},
  },
  {
    name: 'CategoryList',
    component: CategoryListScreen,
    options: {headerShown: false},
  },
  {
    name: 'AddCategory',
    component: AddCategoryScreen,
    options: {headerShown: false},
  },
  {
    name: 'StatisticsScreen',
    component: Statistics,
    options: {headerShown: false},
  },
  {
    name: 'Users',
    component: UsersScreen,
    options: {headerShown: false},
  },
  {
    name: 'Photoes',
    component: PhotoesScreen,
    options: {headerShown: false},
  },
  {
    name: 'Likes',
    component: LikesScreen,
    options: {headerShown: false},
  },
  {
    name: 'Videos',
    component: VideosScreen,
    options: {headerShown: false},
  },
  {
    name: 'Comments',
    component: CommentsScreen,
    options: {headerShown: false},
  },
  {
    name: 'PostLikeList',
    component: PostLikeListScreen,
    options: {headerShown: false},
  },
  {
    name: 'PostCommentList',
    component: PostCommentListScreen,
    options: {headerShown: false},
  },
  {
    name: 'PostViewsScreen',
    component: PostViews,
    options: {headerShown: false},
  },
  {
    name: 'PostLikesScreen',
    component: PostLikes,
    options: {headerShown: false},
  },
  {
    name: 'CommunityScreen',
    component: Community,
    options: {headerShown: false},
  },
  {
    name: 'TopicPostScreen',
    component: TopicPosts,
    options: {headerShown: false},
  },
  {
    name: 'PostDetail',
    component: PostDetailScreen,
    options: {headerShown: false},
  },
  {
    name: 'UserCommentedPosts',
    component: UserCommentedPostsScreen,
    options: {headerShown: false},
  },
  {
    name: 'Video',
    component: VideoScreen,
    options: {headerShown: false},
  },
  {
    name: 'Image',
    component: ImageScreen,
    options: {headerShown: false},
  },
  {
    name: 'TopicSearchScreen',
    component: TopicSearch,
    options: {headerShown: false},
  },
  {
    name: 'TopicPostDetailScreen',
    component: TopicPostDetail,
    options: {headerShown: false},
  },
  {
    name: 'TopicCommentScreen',
    component: TopicComments,
    options: {headerShown: false},
  },
  {
    name: 'TopicFollowScreen',
    component: TopicFollow,
    options: {headerShown: false},
  },
  {
    name: 'HashtagPosts',
    component: HashtagPostsSceen,
    options: {headerShown: false},
  },
  {
    name: 'HashtagTopicPosts',
    component: HashtagTopicPostsSceen,
    options: {headerShown: false},
  },
  {
    name: 'CollectionDetail',
    component: CollectionDetailScreen,
    options: {headerShown: false},
  },
];

const Stack = createNativeStackNavigator();

export default function Admin() {
  return (
    <Stack.Navigator>
      {adminStack.map(screen => (
        //@ts-ignore
        <Stack.Screen key={screen.name} {...screen} />
      ))}
    </Stack.Navigator>
  );
}
