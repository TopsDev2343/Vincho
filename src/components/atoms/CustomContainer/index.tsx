import React from 'react';

import {StyleSheet, ViewStyle, SafeAreaView} from 'react-native';
import {Colors} from '~/styles/colors';
import {CustomLoading} from '~/components';
import {ErrorView} from '~/components';

const CustomContainer = ({
  style,
  children,
  isLoading = false,
  isError = false,
  errorMsg = '',
  onPress,
  bgColor,
}: {
  children: any;
  isLoading?: boolean;
  isError?: boolean;
  errorMsg?: string;
  onPress?: any;
  style?: ViewStyle;
  bgColor?: string;
}) => {
  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        style,
        {backgroundColor: bgColor || Colors.background},
      ]}>
      {isLoading && <CustomLoading />}
      {isError && <ErrorView onPress={onPress} errorMsg={errorMsg} />}
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {flex: 1},
});

export default CustomContainer;
