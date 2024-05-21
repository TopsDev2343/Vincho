import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {scale} from 'react-native-size-matters';
import {Modal} from 'native-base';

import {Colors} from '~/styles/colors';
import {CustomButton} from '~/components';
import {Strings} from '~/assets/strings/index';
import {Fonts} from '~/styles/fonts';
import {useAuthModalStore} from '~/stores';
import {windowWidth} from '~/styles/globalStyles';

const AuthModal = ({navigation}: {navigation: any}) => {
  const {showAuthModal, setShowAuthModal} = useAuthModalStore(state => state);

  function navigateToSignUp() {
    navigation.navigate('SignUpScreen');
    setShowAuthModal(false);
  }

  function navigateToSignIn() {
    navigation.navigate('SignInScreen');
    setShowAuthModal(false);
  }

  return (
    <Modal
      isOpen={showAuthModal}
      onClose={() => setShowAuthModal(false)}
      safeAreaTop={true}>
      <Modal.Content maxWidth={windowWidth} {...styles['bottom']}>
        <Modal.Body>
          <View style={styles.innerContainer}>
            <View>
              <Text style={styles.titleTxt}>{Strings.preLoginTitle}</Text>

              <Text style={styles.bodyTxt}>{Strings.preLoginBody}</Text>
            </View>

            <CustomButton
              title={Strings.signUp}
              titleColor={Colors.txtDark}
              backColor={Colors.primary}
              btnMTop={scale(50)}
              btnMBottom={scale(10)}
              onPress={navigateToSignUp}
            />

            <CustomButton
              title={Strings.signIn}
              titleColor={Colors.txtDark}
              backColor={Colors.primary}
              btnMTop={scale(6)}
              btnMBottom={scale(160)}
              onPress={navigateToSignIn}
            />
          </View>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

export default AuthModal;

const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuIcon: {
    marginTop: scale(20),
    marginLeft: scale(10),
  },
  titleTxt: {
    color: Colors.txtLight,
    ...Fonts.largeRegChanel,
  },
  bodyTxt: {
    color: Colors.txtLight,
    ...Fonts.mediumReg,
  },
  bottom: {
    marginBottom: 0,
    marginTop: 'auto',
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
    backgroundColor: Colors.overlay,
    width: windowWidth,
  },
});
