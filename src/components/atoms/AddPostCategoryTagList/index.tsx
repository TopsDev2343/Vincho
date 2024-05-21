import React from 'react';
import {View, TouchableWithoutFeedback, Text} from 'react-native';
import {scale} from 'react-native-size-matters';
import {SvgXml} from 'react-native-svg';
import {close, roundClose} from '~/assets/icons';
import {Colors} from '~/styles/colors';
import {Fonts} from '~/styles/fonts';
import {windowHeight, windowWidth} from '~/styles/globalStyles';

const AddPostCategoryTagList = ({
  categoryData,
  onCategoryDelete,
}: {
  categoryData: object[];
  onCategoryDelete: any;
}) => {
  return (
    <View
      style={{
        zIndex: -10,
        marginVertical: windowHeight * 0.01,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginRight: windowWidth * 0.03,
        marginLeft: scale(6),
      }}>
      {categoryData?.map((item, index) => {
        return (
          <TouchableWithoutFeedback onPress={() => onCategoryDelete(item?.id)}>
            <View
              style={{
                paddingVertical: windowHeight * 0.002,
                paddingHorizontal: windowWidth * 0.02,
                backgroundColor: Colors.onBackground,
                borderRadius: windowWidth * 0.01,
                alignSelf: 'flex-start',
                alignItems: 'center',
                justifyContent: 'center',
                marginHorizontal: windowWidth * 0.016,
                marginTop: windowHeight * 0.02,
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  ...Fonts.smallRegBarlow,
                  color: Colors.white,
                  marginRight: windowWidth * 0.02,
                }}>
                {item?.title}
              </Text>
              <SvgXml xml={roundClose} />
            </View>
          </TouchableWithoutFeedback>
        );
      })}
    </View>
  );
};

export default AddPostCategoryTagList;
