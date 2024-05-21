import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import {SvgXml} from 'react-native-svg';

import {Colors} from '~/styles/colors';
import {Fonts} from '~/styles/fonts';

type MenuItemInput = {
  title: string;
  icon?: any;
  screenName?: string;
  onPress?: any;
  isLogOut?: boolean;
  isOnTop?: true;
  entityId?: number;
};

const MenuItem = (input: MenuItemInput) => {
  const navigation = useNavigation<any>();

  return (
    <TouchableOpacity
      onPress={
        input.isLogOut
          ? () => input.onPress(true)
          : () =>
              input.entityId != null && input.entityId != undefined
                ? navigation.navigate(input.screenName, {
                    entityId: input.entityId,
                  })
                : navigation.navigate(input.screenName)
      }
      style={[
        styles.itemContainer,
        {marginTop: input.isOnTop ? scale(56) : scale(24)},
      ]}>
      {input.icon && <SvgXml xml={input.icon} {...styles.icon} />}
      <Text
        style={[
          styles.itemTxt,
          {
            color: input.isLogOut ? Colors.error : Colors.txtLight,
            marginLeft: input.icon ? scale(24) : scale(16),
          },
        ]}>
        {input.title}
      </Text>
    </TouchableOpacity>
  );
};

export default MenuItem;

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    marginBottom: scale(16),
  },
  itemTxt: {
    ...Fonts.smallReg,
  },
  icon: {
    width: '24',
    height: '24',
    style: {marginLeft: scale(8)},
  },
});
