
import React from 'react';
import { View, TouchableWithoutFeedback, Text } from 'react-native';

import { Colors } from '~/styles/colors';
import { Fonts } from '~/styles/fonts';
import { windowHeight, windowWidth } from '~/styles/globalStyles';

const TopicBtn = ({ item, selectTopic, selectedTopic }: { item: any, selectTopic: any, selectedTopic: number[] }) => {

     return (
          <TouchableWithoutFeedback onPress={() => selectTopic(item?.id)}>
               <View style={{
                    paddingVertical: windowHeight * 0.01,
                    paddingHorizontal: windowWidth * 0.05,
                    backgroundColor: selectedTopic.includes(item?.id) ? Colors.primary : Colors.onBackground,
                    borderRadius: windowWidth * 0.01,
                    alignSelf: 'flex-start',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginHorizontal: windowWidth * 0.016,
                    marginVertical: windowHeight * 0.01,
               }}>
                    <Text style={{ ...Fonts.verySmallLight, color: selectedTopic.includes(item?.id) ? Colors.onPrimary : Colors.white }}>{item.title}</Text>
               </View>
          </TouchableWithoutFeedback>
     )
}

export default TopicBtn;