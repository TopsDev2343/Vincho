import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './methods';
import {useNotification} from '~/hooks/artist/PushNotification';

import Splash from '~/screens/artist/Splash';
import Intro from '~/screens/artist/Intro';
import Artists from './artists';
import Admin from './admin';

import SignUp from '~/screens/artist/Auth/SignUp';
import SignIn from '~/screens/artist/Auth/SignIn';

export const mainStack = [
  {
    name: 'SplashScreen',
    component: Splash,
    options: {headerShown: false},
  },
  {
    name: 'IntroScreen',
    component: Intro,
    options: {headerShown: false},
  },
  {
    name: 'ArtistStack',
    component: Artists,
    options: {headerShown: false},
  },
  {
    name: 'AdminStack',
    component: Admin,
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
];

const Stack = createNativeStackNavigator();

export default function RootScreen() {
  useNotification();
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        {mainStack.map(screen => (
          //@ts-ignore
          <Stack.Screen key={screen.name} {...screen} />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
