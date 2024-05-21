import React from 'react';
import {View, TouchableWithoutFeedback, Text} from 'react-native';
import {Colors} from '~/styles/colors';
import {Fonts} from '~/styles/fonts';
import {windowHeight, windowWidth} from '~/styles/globalStyles';

const CategoriesBtn = ({
  item,
  selectCategory,
  selectedCategory,
}: {
  item: any;
  selectCategory: any;
  selectedCategory: number[] | number | undefined;
}) => {
  return (
    <TouchableWithoutFeedback onPress={() => selectCategory(item?.id)}>
      <View
        style={{
          paddingVertical: windowHeight * 0.004,
          paddingHorizontal: windowWidth * 0.05,
          //backgroundColor: Colors.primary,
          backgroundColor:
            selectedCategory === item?.id
              ? Colors.primary
              : Colors.onBackground,
          borderRadius: windowWidth * 0.01,
          alignSelf: 'flex-start',
          alignItems: 'center',
          justifyContent: 'center',
          marginHorizontal: windowWidth * 0.01,
          height: windowWidth * 0.07,
        }}>
        <Text
          style={{
            ...Fonts.verySmallLight,
            textAlign: 'center',
            color:
              selectedCategory === item?.id ? Colors.onPrimary : Colors.white,
          }}>
          {item?.title.toUpperCase()}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CategoriesBtn;
