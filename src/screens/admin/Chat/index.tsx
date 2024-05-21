import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {CustomContainer} from '~/components';
import {StorageKeys} from '~/constants/storageKeys';
import {storageHelper} from '~/utils/storageHelper';
import ChatList from './ChatList';
import {useAuthStore, useAuthRefreshStore} from '~/stores';
import PreLogin from '~/screens/artist/Profile/PreLogin';
import LoginSetting from '~/screens/artist/Profile/LoginSetting';

const screensArray = [
  'SignUpScreen',
  'InitSetupScreen',
  'LocationScreen',
  'ContactScreen',
  'FollowContact',
  'ChooseTopicScreen',
];

const keysArray = [
  StorageKeys.USER_IS_LOGGED_IN_ID,
  StorageKeys.INITIAL_SETUP_SHOW,
  StorageKeys.ACCESS_LOCATION_SHOW,
  StorageKeys.ACCESS_CONTACT_SHOW,
  StorageKeys.FOLLOW_CONTACT_SHOW,
  StorageKeys.TOPIC_SHOW,
];

const Chat = ({navigation}: {navigation: any}) => {
  const getScreen = new storageHelper();
  const [targetScreen, setTargetScreen] = useState<string | undefined>('');
  const {userId} = useAuthStore(state => state);
  const {refreshAuth} = useAuthRefreshStore();

  async function renderScreen() {
    if (userId) {
      const result = await getScreen.navScreen(screensArray, keysArray);
      setTargetScreen(result);
    } else {
      setTargetScreen('SignUpScreen');
    }
  }

  useEffect(() => {
    renderScreen();
  }, [userId, refreshAuth]);

  function renderView() {
    switch (targetScreen) {
      case 'SignUpScreen':
        return <PreLogin navigation={navigation} />;
      case 'done':
        return <ChatList navigation={navigation} />;
      default:
        return <ChatList navigation={navigation} />;
    }
  }

  return (
    <CustomContainer>
      {targetScreen ? (
        <View style={styles.container}>{renderView()}</View>
      ) : null}
    </CustomContainer>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
