//Main navigation route
import React from 'react';
import {scale} from 'react-native-size-matters';

import {createDrawerNavigator} from '@react-navigation/drawer';
import Menu from '~/screens/artist/Menu';
import EditProfile from '~/screens/artist/EditProfile';
import Notification from '~/screens/artist/Notification';
import Terms from '~/screens/artist/Terms';
import Policy from '~/screens/artist/Policy';
import {Settings} from '~/screens/artist/Settings';
import ArtistBottomTab from '../artistBottomTab';

export type ArtistDrawerStackParamList = {
  Terms: undefined;
  Policy: undefined;
  EditProfile: undefined;
  Notification: undefined;
  Settings: undefined;
};

export const drawerStack = [
  {
    name: 'TabStack',
    component: ArtistBottomTab,
    options: {headerShown: false},
  },
  {
    name: 'TermsScreen',
    component: Terms,
    options: {headerShown: false},
  },
  {
    name: 'PolicyScreen',
    component: Policy,
    options: {headerShown: false},
  },
  {
    name: 'EditProfileScreen',
    component: EditProfile,
    options: {headerShown: false},
  },
  {
    name: 'NotificationScreen',
    component: Notification,
    options: {headerShown: false},
  },
  {
    name: 'SettingScreen',
    component: Settings,
    options: {headerShown: false},
  },
];

const DrawerNav = createDrawerNavigator();

const ArtistDrawer = () => {
  return (
    <DrawerNav.Navigator
      screenOptions={{
        headerShown: false,
        swipeEnabled: false,
        overlayColor: 'transparent',
        drawerStyle: {
          backgroundColor: 'transparent',
          borderTopRightRadius: scale(30),
          borderBottomRightRadius: scale(30),
        },
      }}
      drawerContent={() => <Menu />}>
      {drawerStack.map(screen => (
        //@ts-ignore
        <DrawerNav.Screen key={screen.name} {...screen} />
      ))}
    </DrawerNav.Navigator>
  );
};

export default ArtistDrawer;
