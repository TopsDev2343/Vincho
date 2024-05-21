import React, {useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';

import {useAuthStore} from '~/stores';
import {StorageKeys} from '~/constants/storageKeys';
import {storageHelper} from '~/utils/storageHelper';

export const useNotification = () => {
  const {userId} = useAuthStore(state => state);
  const storage = new storageHelper();

  useEffect(() => {
    checkPermission();
    // Listen to whether the token changes
    return messaging().onTokenRefresh(token => {
      saveFcmToken(token);
    });
  }, []);

  const checkPermission = async () => {
    const enabled = await messaging().hasPermission();
    enabled === 1 ? getFcmToken() : requestPermission();
  };

  const getFcmToken = async () => {
    const fcmToken = await messaging().getToken();
    fcmToken && (saveFcmToken(fcmToken), messageListener());
  };

  const requestPermission = async () => {
    try {
      await messaging().requestPermission();
      getFcmToken();
    } catch (error) {
      // User has rejected permissions
    }
  };

  const saveFcmToken = async (token: string) => {
    await storage.singleSave(StorageKeys.FCM_TOKEN, token, () => {});
  };

  const messageListener = () => {
    messaging()
      .subscribeToTopic(`user${userId}`)
      .then(async remoteMessage => {});

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage?.data?.notification) {
        }
      });
  };
};
