console.warn = () => null;
LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
LogBox.ignoreAllLogs(true);

import React, {useCallback, useEffect, useState} from 'react';
import RootScreen from './navigation';
import {NativeBaseProvider} from 'native-base';
import {QueryClient} from 'react-query';
import FlashMessage from 'react-native-flash-message';
import auth from '@react-native-firebase/auth';

import graphQLClient from './graphql/fetcher';
import {useAuthStore, useUserTypeStore} from '~/stores';
import {storageHelper} from './utils/storageHelper';
import {StorageKeys} from '~/constants/storageKeys';
import {LogBox} from 'react-native';
import {navigate, resetRoot} from './navigation/methods';
import {useNotification} from './hooks/artist/PushNotification';
import snackBar from './utils/snackBar';
import {messageHelper} from './utils/messageHelper';
import {useSignOutAuth} from './hooks/artist/Auth';
import {removeData, storeData} from './services/storage';
import AuthProvider from './graphql/AuthProvider';
import {appUserType} from './@types/global';

const queryClient = new QueryClient();

export default function App() {
  useNotification();
  const {setUserId} = useAuthStore(state => state);
  const {setUserType} = useUserTypeStore(state => state);
  const storage = new storageHelper();
  const [initializing, setInitializing] = useState(true);
  const {signOut} = useSignOutAuth();

  const logOut = async () => {
    await signOut()
      .then(res => {
        storage.multiRemove([StorageKeys.USER_IS_LOGGED_IN_ID]);
        storage.multiRemove([StorageKeys.USER_TYPE]);
        storage.multiRemove([StorageKeys.FCM_TOKEN]);
        setUserId(undefined);
        setUserType(appUserType.Artist);
        graphQLClient.setHeader('authorization', '');
        queryClient.clear();
        navigate('SignInScreen');
      })
      .catch(err => snackBar(messageHelper('SomeError')));
    await removeData('token');
  };

  const handleUser = useCallback(
    async user => {
      if (user) {
        const idToken = await auth().currentUser?.getIdToken();
        if (idToken) {
          graphQLClient.setHeader('authorization', 'Bearer ' + idToken);
          await storeData('token', idToken);
        } else {
          await logOut();
        }
        const userId = await storage.singleGet(
          StorageKeys.USER_IS_LOGGED_IN_ID,
        );
        if (userId) {
          setUserId(JSON.parse(userId));
        } else {
          setUserId(undefined);
        }
      } else {
        await logOut();
      }
      if (initializing) {
        setInitializing(false);
      }
    },
    [initializing, setUserId],
  );

  useEffect(() => {
    const unsubscribe = auth().onIdTokenChanged(handleUser);
    return () => unsubscribe();
  }, [handleUser]);

  return (
    <AuthProvider>
      <NativeBaseProvider>
        <RootScreen />
        <FlashMessage duration={5000} />
      </NativeBaseProvider>
    </AuthProvider>
  );
}
