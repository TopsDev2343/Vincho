
import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { scale } from 'react-native-size-matters';

import { Colors } from '~/styles/colors';
import { Fonts } from '~/styles/fonts';
import { windowHeight } from '~/styles/globalStyles';


const AlternativeScreen = ({ msg, icon }: { msg: string, icon?: string }) => {
     return (
          <View style={styles.container}>
               {icon && <SvgXml xml={icon} width={scale(56)} height={scale(56)} />}
               <Text style={styles.emptyTxt}>{msg}</Text>

          </View>

     )
}

export default AlternativeScreen;

const styles = StyleSheet.create({
     container: {
          marginTop: windowHeight * 0.2,
          alignItems: 'center',
          justifyContent: 'center',
     },
     emptyTxt: {
          color: Colors.white,
          marginHorizontal: scale(48),
          textAlign: 'center',
          ...Fonts.mediumReg,

     }

})