import React from 'react';
import {scale} from 'react-native-size-matters';

import {View, Text, StyleSheet, Linking} from 'react-native';
import {Fonts} from '~/styles/fonts';
import {Colors} from '~/styles/colors';
import {Strings} from '~/assets/strings/index';

const AppSettingItem = ({title}: {title: string}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text
        style={[styles.title, {color: Colors.primary}]}
        onPress={() => Linking.openSettings()}>
        {Strings.deviceSetting}
      </Text>
    </View>
  );
};

export default AppSettingItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: scale(26),
  },
  txt: {
    ...Fonts.smallLight,
    color: Colors.txtLight,
    marginTop: scale(8),
    marginHorizontal: scale(20),
  },
  title: {
    ...Fonts.smallLight,
    color: Colors.txtLight,
    marginHorizontal: scale(16),
  },
});
