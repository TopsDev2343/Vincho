
import React from 'react';
import { ImageBackground, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { scale } from 'react-native-size-matters';
import { SvgXml } from 'react-native-svg';

import { Colors } from '~/styles/colors';
import { CustomButton } from '~/components';
import { Strings } from '~/assets/strings';
import { Fonts } from '~/styles/fonts';
import { loginBack } from '~/assets/images';
import { menu } from '~/assets/icons';
import { CustomContainer } from '~/components';

const PreLogin = ({ navigation, isProfile = false }: { navigation: any, isProfile?: boolean }) => {

     function navigateToSignUp() {
          navigation.navigate('SignUpScreen')
     }

     function navigateToSignIn() {
          navigation.navigate('SignInScreen')
     }

     return (
          <CustomContainer isLoading={false}>

               <ImageBackground source={loginBack} style={{
                    height: scale(200), flex: 1,

               }} resizeMode="cover">

                    {isProfile && <TouchableOpacity
                         onPress={() => navigation.openDrawer()}
                         style={styles.menuIcon}>
                         <SvgXml xml={menu} width={scale(20)} height={scale(20)}
                         />
                    </TouchableOpacity>}

                    <View style={styles.innerContainer}>

                         <View>
                              <Text style={styles.titleTxt}>
                                   {Strings.preLoginTitle}
                              </Text>

                              <Text style={styles.bodyTxt}>
                                   {Strings.preLoginBody}
                              </Text>
                         </View>

                         <CustomButton title={Strings.signUp}
                              titleColor={Colors.txtDark}
                              backColor={Colors.primary}
                              btnMTop={scale(50)}
                              btnMBottom={scale(10)}
                              onPress={navigateToSignUp}
                         />

                         <CustomButton title={Strings.signIn}
                              titleColor={Colors.txtDark}
                              backColor={Colors.primary}
                              btnMTop={scale(3)}
                              btnMBottom={scale(10)}
                              onPress={navigateToSignIn}
                         />
                    </View>

               </ImageBackground>
          </CustomContainer >
     );
}

export default PreLogin;

const styles = StyleSheet.create({

     innerContainer: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center'
     },
     menuIcon: {
          marginTop: scale(20),
          marginLeft: scale(10)
     },
     titleTxt: {
          color: Colors.txtLight,
          ...Fonts.largeRegChanel
     },
     bodyTxt: {
          color: Colors.txtMedium,
          ...Fonts.mediumReg
     },
});
