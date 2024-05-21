//Design waiting predictions list item ui

import React, {useState} from 'react';
import {View, Text, Switch, StyleSheet} from 'react-native';
import {Colors} from '~/styles/colors';
import {scale} from 'react-native-size-matters';
import {Fonts} from '~/styles/fonts';

const SwitchItem = ({
  item,
  setSelectedList,
}: {
  item: any;
  setSelectedList: any;
}) => {
  const [isEnabled, setIsEnabled] = useState(item.switch);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{item.name}</Text>
      <Switch
        trackColor={{false: Colors.disabled, true: Colors.primary}}
        thumbColor={isEnabled ? Colors.primary : Colors.disabled}
        ios_backgroundColor={Colors.primary}
        onValueChange={value => {
          setIsEnabled(value);
          setSelectedList(item, value);
        }}
        value={isEnabled}
      />
    </View>
  );
};

export default SwitchItem;

const styles = StyleSheet.create({
  container: {
    zIndex: 0,
    marginHorizontal: scale(4),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: scale(12),
    borderColor: Colors.secondary,
  },
  title: {
    ...Fonts.mediumLight,
    color: Colors.txtLight,
    marginHorizontal: scale(16),
  },
});
