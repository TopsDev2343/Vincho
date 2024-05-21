//Design page indicator

import React from 'react';
import {View, StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';

import {Colors} from '~/styles/colors';

type IndicatorInputTyp = {
  numOfIndicator: number;
  activeIndex: number;
  marginV: number;
};

function PageIndicator(input: IndicatorInputTyp) {
  return (
    <View style={{marginVertical: input.marginV, ...styles.dotView}}>
      {[...Array(input.numOfIndicator).keys()].map(index => (
        <View
          key={index}
          style={
            input.activeIndex === index
              ? {...styles.activeDot}
              : {...styles.inActiveDot}
          }
        />
      ))}
    </View>
  );
}

export default PageIndicator;

const styles = StyleSheet.create({
  dotView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeDot: {
    width: scale(7),
    height: scale(7),
    borderRadius: scale(3.5),
    marginHorizontal: scale(3),
    backgroundColor: Colors.primary,
  },
  inActiveDot: {
    width: scale(5),
    height: scale(5),
    borderRadius: scale(2.5),
    marginHorizontal: scale(3),
    backgroundColor: Colors.txtLight,
  },
});
