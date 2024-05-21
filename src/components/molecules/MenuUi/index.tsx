import React from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import {scale} from 'react-native-size-matters';

import {MenuItem} from '~/components';
import {Strings} from '~/assets/strings';
import {
  profileOutline,
  notification,
  setting,
  terms,
  privacy,
  logOut,
} from '~/assets/icons/index';
import {useAuthStore} from '~/stores';

const MenuUi = ({logoutOnPress}: {logoutOnPress: any}) => {
  const {userId} = useAuthStore(state => state);

  return (
    <View style={styles.container}>
      {userId ? (
        <View style={styles.container}>
          <MenuItem
            title={Strings.profile}
            icon={profileOutline}
            screenName={'EditProfileScreen'}
            isOnTop={true}
          />
          <MenuItem
            title={Strings.notification}
            icon={notification}
            screenName={'NotificationScreen'}
          />
          <MenuItem
            title={Strings.settings}
            icon={setting}
            screenName={'SettingScreen'}
          />
          <MenuItem
            title={Strings.term}
            icon={terms}
            screenName={'TermsScreen'}
          />
          <MenuItem
            title={Strings.policy}
            icon={privacy}
            screenName={'PolicyScreen'}
          />
          <MenuItem
            title={Strings.logOut}
            icon={logOut}
            onPress={logoutOnPress}
            isLogOut={true}
          />
        </View>
      ) : (
        <View style={styles.container}>
          <MenuItem
            title={Strings.term}
            icon={terms}
            screenName={'TermsScreen'}
            isOnTop={true}
          />
          <MenuItem
            title={Strings.policy}
            icon={privacy}
            screenName={'PolicyScreen'}
          />
        </View>
      )}
    </View>
  );
};

export default MenuUi;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopRightRadius: Platform.OS === 'android' ? scale(30) : 0,
    borderBottomRightRadius: Platform.OS === 'android' ? scale(30) : 0,
    overflow: 'hidden',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
