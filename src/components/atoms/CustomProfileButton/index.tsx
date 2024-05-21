//Design Large button

import React from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import { hexToRgba } from '~/utils/hexToRgba';
import { Fonts } from '~/styles/fonts';

type CustomBtnInput = {
     title: string,
     titleColor: string,
     backColor: string,
     onPress: any,
     isLoading?: boolean,
     btnMTop?: number
     btnMBottom?: number,
     containerStyle?: object,
     isDisable?: boolean
}

function CustomProfileButton(input: CustomBtnInput) {

     return (

          <View style={input.containerStyle}>

               <TouchableOpacity
                    disabled={input.isDisable}
                    style={{
                         ...styles.btn,
                         backgroundColor: input.isDisable ? hexToRgba(input.backColor, 0.6) : input.backColor,
                         marginTop: input.btnMTop ? scale(input.btnMTop) : 0,
                         marginBottom: input.btnMBottom ? scale(input.btnMBottom) : 0,
                    }} onPress={input.onPress}>

                    <View style={styles.btnTxtView}>

                         {input.isLoading ?
                              <ActivityIndicator size="small" color={input.titleColor} />
                              : <Text style={{
                                   color: input.isDisable ? hexToRgba(input.titleColor, 0.5) : input.titleColor,
                                   ...styles.btnTxt,
                              }}>{input.title}</Text>}

                    </View>

               </TouchableOpacity>
          </View>
     )
}

export default CustomProfileButton

const styles = StyleSheet.create({
     btn: {
          width:'100%',
          borderRadius: scale(16),
          alignSelf: 'center',
     },
     btnTxtView: {
          paddingVertical: scale(10)
     },
     btnTxt: {
          textAlign: 'center',
          ...Fonts.verySmallReg,
     }
})