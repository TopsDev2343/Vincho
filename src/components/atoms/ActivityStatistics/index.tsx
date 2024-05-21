import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { scale, } from 'react-native-size-matters';
import { Colors } from '~/styles/colors';
import { Fonts } from '~/styles/fonts';

const ActivityStatistics = ({ value, title, desc, onPress }: { value: number | string, title: string, desc?: string, onPress?: any }) => {

     return (

          <TouchableOpacity style={styles.container} onPress={onPress} disabled={onPress ? false : true}>

               <Text style={styles.valueTxt}>{value}</Text>

               <Text style={styles.titleTxt}>{title}</Text>

               {desc && <Text style={styles.descTxt}>{desc}</Text>}

          </TouchableOpacity>
     )
}

export default ActivityStatistics;


const styles = StyleSheet.create({

     container: {
          paddingHorizontal: scale(16),
          marginTop: scale(6),
     },

     valueTxt: {
          color: Colors.txtLight,
          ...Fonts.largeReg,
          textAlign: 'center',
          marginBottom: scale(6)
     },

     titleTxt: {
          color: Colors.txtSemiLight,
          ...Fonts.smallReg,
          textAlign: 'center',
     },

     descTxt: {
          color: Colors.txtMedium,
          ...Fonts.verySmallReg,
          textAlign: 'center',
     },


})