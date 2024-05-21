
import React from 'react';
import { View, TouchableWithoutFeedback, Text } from 'react-native';
import { Colors } from '~/styles/colors';
import { Fonts } from '~/styles/fonts';
import { windowHeight, windowWidth } from '~/styles/globalStyles';

const TopTabBtn = ({ item, selectTab, selectedTab }:
     { item: any, selectTab: any, selectedTab: number[] | number | undefined }) => {

     return (
          <TouchableWithoutFeedback onPress={() => selectTab(item?.id)}>
               <View style={{
                    paddingVertical: windowHeight * 0.004,
                    paddingHorizontal: windowWidth * 0.05,
                    //backgroundColor: Colors.primary,
                    backgroundColor: selectedTab === item?.id ? Colors.onSecondary : Colors.background,
                    borderRadius: windowWidth * 0.01,
                    alignSelf: 'flex-start',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginHorizontal: windowWidth * 0.015,
               }}>
                    <Text style={{
                         ...Fonts.smallLight, textAlign: 'center',
                         color: Colors.white
                    }}>{item?.title}</Text>
               </View>
          </TouchableWithoutFeedback>
     )
}

export default TopTabBtn;