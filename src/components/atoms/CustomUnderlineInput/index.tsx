import React, {useState} from 'react';
import {
  TextInput,
  Platform,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import {FormControl, Text, HStack, Box, VStack} from 'native-base';
import {useController} from 'react-hook-form';
import {scale, verticalScale} from 'react-native-size-matters';
import {customFonts} from '~/styles/fonts';
import {Colors} from '~/styles/colors';
import {SvgXml} from 'react-native-svg';
import {closeEye, openEye} from '~/assets/icons';

export default React.forwardRef(
  (
    {
      name,
      placeholder,
      keyboardType,
      backgroundColor = 'transparent',
      label,
      color = Colors.primary,
      textArea = false,
      inputStyle = styles.input,
      icon,
      rightText,
      leftText,
      disabled,
      rightComponent,
      formState,
      validation = false,
      height = verticalScale(56),
      labelFontSize = scale(13),
      fontSize = scale(16),
      autoFocus,
      inputType,
      isHorizontal,
      defaultValue,
    }: {
      name: any;
      placeholder?: string;
      keyboardType?:
        | 'default'
        | 'email-address'
        | 'numeric'
        | 'phone-pad'
        | 'number-pad'
        | 'decimal-pad'
        | 'visible-password'
        | 'ascii-capable'
        | 'numbers-and-punctuation'
        | 'url'
        | 'name-phone-pad'
        | 'twitter'
        | 'web-search'
        | undefined;
      backgroundColor?: string;
      label?: string;
      color?: string;
      textArea?: boolean;
      inputStyle?: TextStyle;
      icon?: any;
      rightText?: string;
      leftText?: string;
      disabled?: boolean;
      rightComponent?: any;
      formState?: any;
      validation?: boolean;
      height?: number;
      labelFontSize?: number;
      fontSize?: number;
      autoFocus?: boolean;
      inputType?: string | undefined;
      isHorizontal?: boolean;
      defaultValue?: string | number;
    },
    ref: any,
  ) => {
    const {field, fieldState} = useController({name});
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [secureText, setSecureText] = useState<boolean>(true);

    const handleSecurePassword = () => {
      setSecureText(prevState => !prevState);
    };

    const isDirty = formState?.isDirty;

    const borderColor = disabled
      ? Colors.disabled
      : fieldState.error
      ? Colors.error
      : !validation
      ? Colors.txtLight
      : isDirty
      ? Colors.error
      : Colors.txtLight;

    const handleFocus = () => {
      setIsFocused(true);
    };

    const handleBlur = (val: any) => {
      setIsFocused(false);
      field.onBlur?.(val);
    };

    //Restrict user to just write in English
    const handleOnChange = (val: any) => {
      field.onChange(val);
    };

    return (
      <FormControl
        isInvalid={fieldState.error}
        w={{base: '92%'}}
        mb={isHorizontal ? -4 : undefined}
        alignSelf={'center'}>
        <Box mt={defaultValue === '' && !isFocused ? '0' : '4'}>
          {(isFocused ||
            field.value ||
            fieldState.error ||
            disabled ||
            defaultValue) && (
            <VStack zIndex={60} position="absolute" left="4" top="-12">
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
                  disabled
                    ? Colors.disabled
                    : field.value || fieldState.error
                    ? Colors.error
                    : defaultValue
                    ? Colors.txtMedium
                    : Colors.primary
                }>
                {label ? label : placeholder}
              </Text>
            </VStack>
          )}
          <HStack
            h={textArea ? `${height * 2}px` : `${height}px`}
            px="2"
            borderBottomWidth="0.5px"
            alignItems="center"
            bg={backgroundColor}
            justifyContent="center"
            borderColor={borderColor}>
            {leftText && (
              <Text
                fontSize={fontSize}
                fontFamily={customFonts.regular}
                color={disabled ? Colors.disabled : Colors.primary}>
                {leftText + ' '}
              </Text>
            )}
            <TextInput
              defaultValue={defaultValue}
              autoFocus={autoFocus}
              ref={ref}
              value={field.value}
              onFocus={handleFocus}
              showSoftInputOnFocus={true}
              onBlur={handleBlur}
              editable={!disabled}
              autoCapitalize="none"
              placeholder={
                !isFocused ? (label ? label : placeholder) : placeholder
              }
              keyboardType={keyboardType}
              onChangeText={handleOnChange}
              numberOfLines={textArea ? 4 : 1}
              multiline={textArea ? true : false}
              textAlignVertical={textArea ? 'top' : 'center'}
              secureTextEntry={inputType === 'password' ? secureText : false}
              placeholderTextColor={
                disabled ? Colors.disabled : Colors.txtMedium
              }
              style={[
                inputStyle,
                {
                  paddingTop: textArea ? 15 : 0,
                  paddingBottom: textArea ? 15 : 0,
                  fontSize: isFocused ? fontSize - 1 : fontSize,
                  textAlignVertical: textArea ? 'top' : 'center',
                  color: disabled ? Colors.disabled : color,
                  textAlign: 'left',
                },
                Platform.OS === 'ios' && {minHeight: height},
              ]}
            />
            {!disabled
              ? inputType === 'password' && (
                  <TouchableOpacity
                    onPress={handleSecurePassword}
                    activeOpacity={0.7}>
                    <SvgXml xml={secureText ? openEye : closeEye} />
                  </TouchableOpacity>
                )
              : null}
            {icon && !isFocused && (
              <SvgXml
                xml={icon}
                fill={disabled ? Colors.disabled : Colors.primary}
              />
            )}
            {rightText && (
              <Text
                fontSize={fontSize}
                fontFamily={customFonts.regular}
                color={disabled ? Colors.disabled : Colors.primary}>
                {rightText}
              </Text>
            )}
            {rightComponent && rightComponent()}
          </HStack>
        </Box>

        <FormControl.ErrorMessage
          fontSize={scale(13)}
          fontFamily={customFonts.regular}
          mt="0.5">
          <Text color={Colors.error}> {fieldState.error?.message}</Text>
        </FormControl.ErrorMessage>

        {isHorizontal && !fieldState.error && (
          <FormControl.HelperText
            fontSize={scale(13)}
            fontFamily={customFonts.regular}
            mt="0">
            {''}
          </FormControl.HelperText>
        )}
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
