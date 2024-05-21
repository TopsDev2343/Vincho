
import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { scale } from 'react-native-size-matters';

import { retry } from '~/assets/icons';
import { Colors } from '~/styles/colors';
import { Fonts } from '~/styles/fonts';

const ErrorView = ({ errorMsg = '', onPress }: { errorMsg: string, onPress: any }) => {

     return (
          <SafeAreaView style={styles.container}>
               <View style={styles.innerContainer}>
                    <Text style={styles.errorTxt}>{errorMsg}</Text>
                    <TouchableOpacity onPress={onPress} style={styles.btn}>
                         <SvgXml xml={retry} {...styles.icon} />
                    </TouchableOpacity>
               </View>
          </SafeAreaView>
     )

}

export default ErrorView;

const styles = StyleSheet.create({

     container: {
          flex: 1
     },
     innerContainer:
     {
          flex: 1,
          backgroundColor: Colors.background,
          alignItems: 'center',
          justifyContent: 'center'
     },
     errorTxt: {
          ...Fonts.largeLight,
          color: Colors.white,
          marginTop: scale(20)
     },
     btn: { marginTop: scale(12) },
     icon: {
          width: scale(36),
          height: scale(36)
     }

})