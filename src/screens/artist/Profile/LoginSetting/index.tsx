//Setting
import React from 'react';
import { scale } from 'react-native-size-matters';
import { Text, View, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';

import { Colors } from '~/styles/colors';
import { Strings } from '~/assets/strings';
import { CustomButton } from '~/components';
import { CustomContainer } from '~/components';
import { loginBack } from '~/assets/images';
import { menu } from '~/assets/icons';
import { Fonts } from '~/styles/fonts';

const LoginSetting = ({ navToScreen, navigation, isProfile = false }: { navToScreen: string, navigation: any, isProfile?: boolean }) => {
     return (
          <CustomContainer >

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
                                   {Strings.setUpTitle}
                              </Text>

                              <Text style={styles.bodyTxt}>
                                   {Strings.setUpBody}
                              </Text>
                         </View>

                         <CustomButton title={Strings.setUp}
                              titleColor={Colors.txtDark}
                              backColor={Colors.primary}
                              btnMTop={scale(46)}
                              btnMBottom={scale(10)}
                              onPress={() => navigation.navigate(navToScreen)}
                         />

                    </View>

               </ImageBackground>

          </CustomContainer >
     )
}

export default LoginSetting

const styles = StyleSheet.create({

     container: {
          flex: 1
     },

     innerContainer: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          marginHorizontal: scale(20)
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
