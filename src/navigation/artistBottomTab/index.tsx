import React from 'react';
import {View} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {scale} from 'react-native-size-matters';

import {
  chatOutline,
  exploreFill,
  chatFill,
  exploreOutline,
  profileFill,
  profileOutline,
  communityFill,
  communityOutline,
} from '~/assets/icons';
import Explore from '~/screens/artist/Explore';
import Profile from '~/screens/artist/Profile';
import Community from '~/screens/artist/Topics';
import Chat from '~/screens/artist/Chat';
import SelectPost from '~/screens/artist/AddPost/SelectPost';
import SendPost from '~/screens/artist/AddPost/SendPost';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CustomTabBar} from '~/components';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export type ArtistBottomTabStackParamList = {
  Chat: undefined;
  Explore: undefined;
  Profile: undefined;
  Community: undefined;
};

export const tabStack = [
  {
    name: 'Explore',
    component: Explore,
    options: {
      tabBarIcon: ({focused}: {focused: boolean}) => (
        <View>
          {focused ? (
            <SvgXml width="24" height="24" xml={exploreFill} />
          ) : (
            <SvgXml width="24" height="24" xml={exploreOutline} />
          )}
        </View>
      ),

      headerShown: false,
    },
  },
  {
    name: 'Community',
    component: Community,
    options: {
      tabBarIcon: ({focused}: {focused: boolean}) => (
        <View style={{marginRight: scale(28)}}>
          {focused ? (
            <SvgXml width="24" height="24" xml={communityFill} />
          ) : (
            <SvgXml width="24" height="24" xml={communityOutline} />
          )}
        </View>
      ),

      headerShown: false,
    },
  },
  {
    name: 'Chat',
    component: Chat,
    options: {
      tabBarIcon: ({focused}: {focused: boolean}) => (
        <View style={{marginLeft: scale(28)}}>
          {focused ? (
            <SvgXml width="24" height="24" xml={chatFill} />
          ) : (
            <SvgXml width="24" height="24" xml={chatOutline} />
          )}
        </View>
      ),

      headerShown: false,
    },
  },
  {
    name: 'Profile',
    component: Profile,
    options: {
      tabBarIcon: ({focused}: {focused: boolean}) => (
        <View>
          {focused ? (
            <SvgXml width="24" height="24" xml={profileFill} />
          ) : (
            <SvgXml width="24" height="24" xml={profileOutline} />
          )}
        </View>
      ),

      headerShown: false,
    },
  },
];

export default function ArtistBottomTab() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainTab"
        component={MainTab}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="SelectPostScreen"
        component={SelectPost}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SendPostScreen"
        component={SendPost}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
const MainTab = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarShowLabel: false,
    }}
    tabBar={props => <CustomTabBar {...props} />}
    initialRouteName="feed">
    {tabStack.map(screen => (
      //@ts-ignore
      <Tab.Screen key={screen.name} {...screen} />
    ))}
  </Tab.Navigator>
);
