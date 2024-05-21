import React from 'react';
import {View} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {scale} from 'react-native-size-matters';
import {
  chatOutline,
  chatFill,
  searchFill,
  search,
  usersFill,
  usersOutline,
  homeFill,
  homeOutline,
  profileFill,
  profileOutline,
} from '~/assets/icons';
import Explore from '~/screens/admin/Explore';
import Home from '~/screens/admin/Home';
import Users from '~/screens/admin/Users';
import Chat from '~/screens/admin/Chat';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Colors} from '~/styles/colors';
import Profile from '~/screens/admin/Profile';
import {windowHeight} from '~/styles/globalStyles';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export type AdminBottomTabStackParamList = {
  Home: undefined;
  Explore: undefined;
  Users: undefined;
  Chat: undefined;
  Profile: undefined;
};

export const adminTabStack = [
  {
    name: 'Home',
    component: Home,
    options: {
      tabBarIcon: ({focused}: {focused: boolean}) => (
        <View>
          {focused ? (
            <SvgXml width="24" height="24" xml={homeFill} />
          ) : (
            <SvgXml width="24" height="24" xml={homeOutline} />
          )}
        </View>
      ),

      headerShown: false,
    },
  },
  {
    name: 'Explore',
    component: Explore,
    options: {
      tabBarIcon: ({focused}: {focused: boolean}) => (
        <View>
          {focused ? (
            <SvgXml width="24" height="24" xml={searchFill} />
          ) : (
            <SvgXml width="24" height="24" xml={search} />
          )}
        </View>
      ),

      headerShown: false,
    },
  },
  {
    name: 'Users',
    component: Users,
    options: {
      tabBarIcon: ({focused}: {focused: boolean}) => (
        <View>
          {focused ? (
            <SvgXml width="24" height="24" xml={usersFill} />
          ) : (
            <SvgXml width="24" height="24" xml={usersOutline} />
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
        <View>
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

export default function AdminBottomTab() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AdminTab"
        component={AdminTab}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

const AdminTab = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarShowLabel: false,
      tabBarActiveBackgroundColor: Colors.blackOverlay,
      tabBarStyle: {
        backgroundColor: Colors.black,
        height: windowHeight * 0.1,
      },
    }}
    initialRouteName="feed">
    {adminTabStack.map(screen => (
      //@ts-ignore
      <Tab.Screen key={screen.name} {...screen} />
    ))}
  </Tab.Navigator>
);
