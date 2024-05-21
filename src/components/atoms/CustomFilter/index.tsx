import {HStack, Input, Button, Text, Box} from 'native-base';
import React, {memo} from 'react';
import {scale, verticalScale} from 'react-native-size-matters';
import {SvgXml} from 'react-native-svg';
import {search} from '~/assets/icons';
import {Colors} from '~/styles/colors';

export default memo(function CustomAuthButton({
  label,
  onPress,
  value,
  setValue,
  isSearchBtn,
  height,
}: {
  label: string;
  onPress?: () => void;
  value?: string;
  setValue?: any;
  isSearchBtn?: any;
  height?: number;
}) {
  return (
    <HStack alignItems={'center'} justifyContent={'center'}>
      {isSearchBtn ? (
        <HStack
          w={{
            base: '95%',
            md: '5%',
          }}
          h={height ? height : scale(48)}
          p={2}
          mt={6}
          alignItems="center"
          borderWidth={0}
          borderRadius={16}
          backgroundColor={Colors.onBackground}>
          <Button
            width={'100%'}
            onPress={onPress}
            backgroundColor={Colors.onBackground}
            h={scale(48)}
            justifyContent={'flex-start'}
            alignItems={'center'}>
            <HStack justifyContent={'center'} alignItems={'center'}>
              <SvgXml width={scale(24)} height={scale(24)} xml={search} />
              <Text color={Colors.txtMedium} ml="3">
                {label}
              </Text>
            </HStack>
          </Button>
        </HStack>
      ) : (
        <Input
          w={{
            base: '95%',
            md: '5%',
          }}
          h={height ? height : scale(48)}
          p={2}
          value={value}
          onChangeText={setValue}
          onSubmitEditing={onPress}
          returnKeyType={'search'}
          borderWidth={0}
          borderRadius={16}
          backgroundColor={Colors.onBackground}
          _focus={{backgroundColor: Colors.onBackground}}
          InputLeftElement={
            <SvgXml
              width={scale(24)}
              height={scale(24)}
              xml={search}
              style={{
                marginRight: 12,
                marginLeft: 16,
              }}
            />
          }
          fontSize={16}
          placeholder={label}
          placeholderTextColor={Colors.txtMedium}
          color={Colors.txtMedium}
          fontFamily={'Helvetica'}
        />
      )}
    </HStack>
  );
});
