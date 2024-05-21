import React, {useState} from 'react';
import {View, StyleSheet, Platform, SafeAreaView} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import {scale} from 'react-native-size-matters';

import {MenuUi} from '~/components';
import {LogoutModal} from '~/components/atoms/LogoutModal';
import {Colors} from '~/styles/colors';

const Menu = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  function logoutOnPress(status: boolean) {
    setShowModal(status);
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.iosMenuContainer}>
        <MenuUi logoutOnPress={logoutOnPress} />
      </SafeAreaView>

      <LogoutModal showModal={showModal} setShowModal={logoutOnPress} />
    </View>
  );
};

export default Menu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopRightRadius: Platform.OS === 'android' ? scale(30) : 0,
    borderBottomRightRadius: Platform.OS === 'android' ? scale(30) : 0,
    overflow: 'hidden',
  },
  iosMenuContainer: {
    flex: 1,
    backgroundColor: Colors.onBackground,
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
