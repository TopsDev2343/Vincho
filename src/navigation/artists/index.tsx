import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignUp from '~/screens/artist/Auth/SignUp';
import ArtistDrawer from '../artistDrawer';
import SendLink from '~/screens/artist/Auth/ForgetPass';
import SignIn from '~/screens/artist/Auth/SignIn';
import InitSetup from '~/screens/artist/Auth/InitSetup';
import Location from '~/screens/artist/Auth/Location';
import Contact from '~/screens/artist/Auth/Contact';
import ChooseTopic from '~/screens/artist/Auth/ChooseTopic';
import NearbyScreen from '~/screens/artist/Chat/NearbyScreen';
import SearchUserScreen from '~/screens/artist/Chat/SearchUserScreen';
import ConversationScreen from '~/screens/artist/Chat/ConversationScreen';
import Comments from '~/screens/artist/Comments';
import TopicSearch from '~/screens/artist/Topics/TopicSearch';
import AddTopic from '~/screens/artist/AddTopic';
import InviteTopic from '~/screens/artist/InviteTopic';
import {
  PostDetailScreen,
  PostLikeListScreen,
  CollectionPostDetailScreen,
} from '~/screens/artist/PostDetail';
import TopicPosts from '~/screens/artist/TopicPosts';
import AddTopicPost from '~/screens/artist/AddTopicPost';
import {
  AddCollectionScreen,
  CollectionDetailScreen,
  EditCollectionScreen,
} from '~/screens/artist/Profile/Collection';
import TopicPostDetail from '~/screens/artist/TopicPostDetail';
import TopicComments from '~/screens/artist/TopicComments';
import UserActivities from '~/screens/artist/Profile/UserActivities';
import {Followers, Followings} from '~/screens/artist/Follow';
import {PostViews, PostLikes} from '~/screens/artist/Statistics';
import TopicFollow from '~/screens/artist/TopicFollow';
import OtherUserProfileScreen from '~/screens/artist/Profile/OtherUserProfileScreen';
import LoginSetting from '~/screens/artist/Profile/LoginSetting';
import PreLogin from '~/screens/artist/Profile/PreLogin';
import UserProfile from '~/screens/artist/Profile/UserProfile';
import FollowContact from '~/screens/artist/Auth/FollowContact';
import {BlockUsersScreen} from '~/screens/artist/Settings';
import VideoScreen from '~/screens/artist/VideoScreen';
import ImageScreen from '~/screens/artist/ImageScreen';
import HashtagPostsSceen from '~/screens/artist/HashtagPostsSceen';
import HashtagTopicPostsSceen from '~/screens/artist/HashtagTopicPostsSceen';
import SelectTagsAiFriendSrceen from '~/screens/artist/AiFriend/CreateAiFriend/SelectTags';
import CreateProfileAiFriendSrceen from '~/screens/artist/AiFriend/CreateAiFriend/CreateProfile';
import UpdateTagsAiFriendSrceen from '~/screens/artist/AiFriend/UpdateAiFriend/UpdateTags';
import UpdateProfileAiFriendSrceen from '~/screens/artist/AiFriend/UpdateAiFriend/UpdateProfile';

export type ArtistStackParamList = {
  Splash: undefined;
  Intro: undefined;
  SignUp: undefined;
  SendCode: undefined;
  SignIn: undefined;
  InitSetup: undefined;
  Location: {
    username: string;
    phoneNumber: string;
    bio: string;
    userImg: string | null;
  };
  Contact: undefined;
  ChooseTopic: undefined;
  NearbyScreen: undefined;
  SearchUserScreen: undefined;
  ConversationScreen: undefined;
  PostDetailScreen: undefined;
  InviteTopic: {topicId: number};
  PostLikeListScreen: undefined;
  TopicPosts: {TopicId: number; isUserTopic: boolean};
  AddTopicPost: {TopicId: number};
  AddCollectionScreen: undefined;
  CollectionDetailScreen: undefined;
  EditCollectionScreen: undefined;
  TopicComments: {postId: number};
  TopicPostDetail: {postId: number};
  BlockUsersScreen: undefined;
  TopicFollow: {postId: number};
  OtherUserProfileScreen: undefined;
  CollectionPostDetailScreen: undefined;
  SignInScreen: undefined;
};

export const artistStack = [
  {
    name: 'DrawerStack',
    component: ArtistDrawer,
    options: {headerShown: false},
  },
  {
    name: 'SignUpScreen',
    component: SignUp,
    options: {headerShown: false},
  },
  {
    name: 'SignInScreen',
    component: SignIn,
    options: {headerShown: false},
  },
  {
    name: 'SendLinkScreen',
    component: SendLink,
    options: {headerShown: false},
  },
  {
    name: 'InitSetupScreen',
    component: InitSetup,
    options: {headerShown: false},
  },
  {
    name: 'LocationScreen',
    component: Location,
    options: {headerShown: false},
  },
  {
    name: 'ContactScreen',
    component: Contact,
    options: {headerShown: false},
  },
  {
    name: 'ChooseTopicScreen',
    component: ChooseTopic,
    options: {headerShown: false},
  },
  {
    name: 'LoginSettingScreen',
    component: LoginSetting,
    options: {headerShown: false},
  },
  {
    name: 'PreLoginScreen',
    component: PreLogin,
    options: {headerShown: false},
  },
  {
    name: 'UserProfileScreen',
    component: UserProfile,
    options: {headerShown: false},
  },
  {
    name: 'FollowContactScreen',
    component: FollowContact,
    options: {headerShown: false},
  },
  {
    name: 'Nearby',
    component: NearbyScreen,
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
    name: 'CommentsScreen',
    component: Comments,
    options: {headerShown: false},
  },
  {
    name: 'TopicSearchScreen',
    component: TopicSearch,
    options: {headerShown: false},
  },
  {
    name: 'PostDetail',
    component: PostDetailScreen,
    options: {headerShown: false},
  },
  {
    name: 'AddTopicScreen',
    component: AddTopic,
    options: {headerShown: false},
  },
  {
    name: 'InviteTopicScreen',
    component: InviteTopic,
    options: {headerShown: false},
  },
  {
    name: 'PostLikeList',
    component: PostLikeListScreen,
    options: {headerShown: false},
  },
  {
    name: 'TopicPostScreen',
    component: TopicPosts,
    options: {headerShown: false},
  },
  {
    name: 'AddTopicPostScreen',
    component: AddTopicPost,
    options: {headerShown: false},
  },
  {
    name: 'AddCollection',
    component: AddCollectionScreen,
    options: {headerShown: false},
  },
  {
    name: 'CollectionDetail',
    component: CollectionDetailScreen,
    options: {headerShown: false},
  },
  {
    name: 'EditCollection',
    component: EditCollectionScreen,
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
    name: 'UserActivitiesScreen',
    component: UserActivities,
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
    name: 'BlockUsers',
    component: BlockUsersScreen,
    options: {headerShown: false},
  },
  {
    name: 'TopicFollowScreen',
    component: TopicFollow,
    options: {headerShown: false},
  },
  {
    name: 'OtherUserProfile',
    component: OtherUserProfileScreen,
    options: {headerShown: false},
  },
  {
    name: 'CollectionPostDetail',
    component: CollectionPostDetailScreen,
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
    name: 'SelectTagsAiFriendSrceen',
    component: SelectTagsAiFriendSrceen,
    options: {headerShown: false},
  },
  {
    name: 'CreateProfileAiFriendSrceen',
    component: CreateProfileAiFriendSrceen,
    options: {headerShown: false},
  },
  {
    name: 'UpdateTagsAiFriendSrceen',
    component: UpdateTagsAiFriendSrceen,
    options: {headerShown: false},
  },
  {
    name: 'UpdateProfileAiFriendSrceen',
    component: UpdateProfileAiFriendSrceen,
    options: {headerShown: false},
  },
];

const Stack = createNativeStackNavigator();

export default function Artists() {
  return (
    <Stack.Navigator>
      {artistStack.map(screen => (
        //@ts-ignore
        <Stack.Screen key={screen.name} {...screen} />
      ))}
    </Stack.Navigator>
  );
}
