import React from 'react';
import {StyleSheet} from 'react-native';
import {FormControl, Text, Box, VStack} from 'native-base';
import {useController} from 'react-hook-form';
import {scale} from 'react-native-size-matters';
import {customFonts} from '~/styles/fonts';
import {Colors} from '~/styles/colors';

export default React.forwardRef(
  (
    {
      name,
      placeholder,
      backgroundColor = 'transparent',
      label,
      formState,
      labelFontSize = scale(13),
      fontSize = scale(13),
      validation = false,
      setEditBioModal,
      textBackgroundColor,
    }: {
      name: any;
      placeholder?: string;
      backgroundColor?: string;
      label?: string;
      color?: string;
      formState?: any;
      height?: number;
      labelFontSize?: number;
      fontSize?: number;
      validation?: boolean;
      setEditBioModal: any;
      textBackgroundColor?: string;
    },
    ref: any,
  ) => {
    const {field, fieldState} = useController({name});
    const isDirty = formState?.isDirty;
    const borderColor = fieldState.error
      ? Colors.error
      : !validation
      ? Colors.txtLight
      : isDirty
      ? Colors.error
      : Colors.txtLight;

    return (
      <FormControl
        isInvalid={fieldState.error}
        w={{base: '92%'}}
        alignSelf={'center'}
        mt="2">
        <VStack
          zIndex={60}
          position="absolute"
          left="2"
          top="-12"
          backgroundColor={
            textBackgroundColor != undefined
              ? textBackgroundColor
              : Colors.background
          }>
          <Box
            position="absolute"
            bottom="25%"
            zIndex={59}
            bg={Colors.background}
            h="2"
            w="100%"
          />
          <Text
            ml="3"
            mr="4"
            zIndex={60}
            fontSize={labelFontSize}
            fontFamily={customFonts.regular}
            color={
              field.value || fieldState.error ? Colors.error : Colors.primary
            }>
            {label ? label : placeholder}
          </Text>
        </VStack>

        <Box
          px="2"
          borderWidth="0.5px"
          borderRadius="xl"
          bg={backgroundColor}
          borderColor={borderColor}
          h="16">
          <Text
            onPress={() => setEditBioModal(true)}
            color={Colors.white}
            fontSize={fontSize}
            h="16"
            numberOfLines={1}
            ellipsizeMode="tail"
            mt={5}
            paddingLeft={3}>
            {field.value ? field.value : placeholder}
          </Text>
        </Box>

        <FormControl.ErrorMessage
          fontSize={scale(13)}
          fontFamily={customFonts.regular}
          mt="0.5">
          <Text color={Colors.error}> {fieldState.error?.message}</Text>
        </FormControl.ErrorMessage>
      </FormControl>
    );
  },
);

const styles = StyleSheet.create({
  input: {
    flex: 1,
    fontFamily: customFonts.regular,
    height: '100%',
  },
});
