

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { scale } from 'react-native-size-matters';

const ShinyIcon = ({ icon }: { icon: string }) => {

     return (
          <View style={styles.container}>
               <View
                    style={styles.shinyDot} />
               <View
                    style={styles.shinyCircle}>
                    <SvgXml width={scale(22)} height={scale(22)} xml={icon} />
               </View>
          </View>
     )
}

export default ShinyIcon;

const styles = StyleSheet.create({
     container: {
          justifyContent: 'center',
          alignItems: 'center'
     },
     shinyDot: {
          borderRadius: 100,
          justifyContent: 'center', alignItems: 'center',
          backgroundColor: 'rgba(255,255,255,0.5)',
          width: scale(6),
          height: scale(6),
          borderWidth: scale(0.2),
          shadowColor: "rgba(255,255,255,1)",
          shadowOffset: {
               width: 0,
               height: 0,
          },
          zIndex: 10,
          marginRight: scale(26),
          marginBottom: -scale(8),
          shadowOpacity: 10,
          elevation: 6,
     },
     shinyCircle: {
          borderRadius: 100,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgb(71,54,75)',
          width: scale(36),
          height: scale(36),
          borderWidth: scale(0.2),
          borderColor: 'rgba(255,255,255,1)',
          shadowColor: "rgba(255,255,255,0.7)",
          shadowOffset: {
               width: 0,
               height: 0,
          },
          shadowOpacity: 1,
          elevation: 6,
     }
})