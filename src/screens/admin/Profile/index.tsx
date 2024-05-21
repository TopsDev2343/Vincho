import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {CustomContainer} from '~/components';
import {StorageKeys} from '~/constants/storageKeys';
import {storageHelper} from '~/utils/storageHelper';
import {useAuthRefreshStore, useAuthStore} from '~/stores';
import AdminProfileScreen from './AdminProfileScreen';
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

const Profile = ({navigation}: {navigation: any}) => {
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
        return <PreLogin navigation={navigation} isProfile={true} />;
        return (
          <LoginSetting
            navToScreen="ChooseTopicScreen"
            navigation={navigation}
            isProfile={true}
          />
        );
      case 'done':
        return <AdminProfileScreen navigation={navigation} />;
      default:
        return <AdminProfileScreen navigation={navigation} />;
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

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
