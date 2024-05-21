import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { scale, } from 'react-native-size-matters';

import { Colors } from '~/styles/colors';
import { Fonts } from '~/styles/fonts';
import { HStack, VStack } from 'native-base';
import { ShinyIcon } from '~/components';


const ActivityStatisticsBox = ({ value, title, onPress, icon }: { value: number | string, title: string, onPress?: any, icon: string }) => {

     return (

          <TouchableOpacity style={styles.container} onPress={onPress} disabled={onPress ? false : true}>

               <HStack alignItems={'center'} >

                    {icon &&
                         <View>
                              <ShinyIcon icon={icon} />
                         </View>}

                    <VStack ml="4">
                         <Text style={styles.valueTxt}>{value}</Text>

                         <Text style={styles.titleTxt}>{title}</Text>
                    </VStack>

               </HStack>

          </TouchableOpacity>
     )
}

export default ActivityStatisticsBox;


const styles = StyleSheet.create({

     container: {
          paddingHorizontal: scale(12),
          paddingVertical: scale(12),
          borderRadius: scale(8),
          borderWidth: scale(1.4),
          borderColor: Colors.onBackground
     },

     valueTxt: {
          color: Colors.txtLight,
          ...Fonts.largeReg,
          textAlign: 'left',
     },

     titleTxt: {
          color: Colors.txtSemiLight,
          ...Fonts.smallReg,
          textAlign: 'left',
     },


})