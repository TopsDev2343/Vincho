import {FormControl, Stack, Text, useDisclose, View} from 'native-base';
import React, {memo, useEffect, useState} from 'react';
import {Platform, TouchableOpacity} from 'react-native';
import ConfirmActionSheet from '../ConfirmActionSheet';
import {scale, verticalScale} from 'react-native-size-matters';
import {Colors} from '~/styles/colors';
import {chevronDown, close, lightClose} from '~/assets/icons';
import {SvgXml} from 'react-native-svg';

const CustomDropdownButton = React.forwardRef((props, ref) => {
  const {
    label,
    helper,
    placeholder,
    type,
    isDisabled,
    required,
    formatValue,
    keepValue,
    asyncValidations,
    defaultValue,
    optionsDataList,
    value,
    setValue,
    onClose,
    bgColor,
    hideClose,
    textColor,
    fontSize,
    containerStyle,
    ...otherProps
  } = props;

  const {
    onClose: onCloseSignOutActionSheet,
    onOpen: onOpenSignOutActionSheet,
    isOpen: isOpenSignOutActionSheet,
  } = useDisclose();
  return (
    <View style={{flex: 1, width: '100%'}}>
      <ConfirmActionSheet
        onClose={onCloseSignOutActionSheet}
        isOpen={isOpenSignOutActionSheet}
        optionDataList={optionsDataList}
        setValue={setValue}
        {...otherProps}
      />
      <Stack flex={1} width={'100%'}>
        <TouchableOpacity
          onPress={onOpenSignOutActionSheet}
          style={[
            {
              backgroundColor: bgColor || Colors.onBackground,
              justifyContent: 'center',
              height: verticalScale(46),
              marginRight: scale(10),
              width: '80%',
              flex: 9,
            },
            containerStyle,
          ]}>
          <Text
            numberOfLines={1}
            style={{
              fontFamily: 'Helvetica',
              fontSize: fontSize || 14,
              color:
                value.title == '' && textColor != null
                  ? textColor
                  : Colors.white,
              padding: 14,
              paddingBottom: 0,
            }}>
            {value.title != '' ? value.title : placeholder}
          </Text>
        </TouchableOpacity>
        {!hideClose && (
          <TouchableOpacity
            onPress={onClose}
            style={{
              position: 'absolute',
              right: scale(0),
              zIndex: 99,
              top: verticalScale(20),
              flex: 1,
            }}>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                paddingLeft: scale(3),
              }}>
              <SvgXml xml={lightClose} width={scale(10)} height={scale(10)} />
            </View>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={onOpenSignOutActionSheet}
          style={{
            position: 'absolute',
            right: scale(25),
            zIndex: 100,
            top: verticalScale(20),
            flex: 2,
          }}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              paddingLeft: scale(3),
            }}>
            <SvgXml xml={chevronDown} width={scale(10)} height={scale(10)} />
          </View>
        </TouchableOpacity>
      </Stack>
    </View>
  );
});

CustomDropdownButton.displayName = 'CustomDropdownButton';

export default memo(CustomDropdownButton);
