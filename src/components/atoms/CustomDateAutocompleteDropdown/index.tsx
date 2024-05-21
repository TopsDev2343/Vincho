import {useField} from '@formiz/core';
import {FormControl, Stack} from 'native-base';
import React, {
  memo,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {AutocompleteDropdown} from 'react-native-autocomplete-dropdown';
import {scale, verticalScale} from 'react-native-size-matters';
import {SvgXml} from 'react-native-svg';
import {chevronDown} from '~/assets/icons';
import {Colors} from '~/styles/colors';
import {width} from '~/utils/dimension';
import HelveticaRegularText from '../HelveticaRegularText';

const CustomDateAutocompleteDropdown = React.forwardRef((props, ref) => {
  const {id, isValid, isSubmitted, resetKey, setValue, value, errorMessage} =
    useField(props);

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
    dir,
    zIndex,
    showClear,
    bgColor,
    mb,
    ...otherProps
  } = props;

  const [isTouched, setIsTouched] = useState(false);
  const showError = !isValid && (isTouched || isSubmitted);
  const dropdownController = useRef(null);

  useEffect(() => {
    setIsTouched(false);
  }, [resetKey]);

  const onSetItem = item => {
    dropdownController.current.setItem(item);
    dropdownController.current.close();
  };
  useImperativeHandle(ref, () => ({
    onSetItem,
  }));

  return (
    <FormControl
      isRequired={!!required}
      isInvalid={showError}
      isDisabled={isDisabled}
      mb={mb != null ? mb : 3}
      zIndex={zIndex || 100}>
      <Stack>
        <TouchableOpacity
          onPress={() => {
            dropdownController.current.toggle();
          }}
          style={{
            height: verticalScale(48),
            position: 'absolute',
            bottom: 0,
            width: '100%',
            zIndex: zIndex + 1 || 101,
          }}></TouchableOpacity>
        <AutocompleteDropdown
          ref={ref}
          id={id}
          controller={controller => {
            dropdownController.current = controller;
          }}
          clearOnFocus={false}
          closeOnBlur={true}
          closeOnSubmit={false}
          value={defaultValue}
          initialValue={defaultValue}
          useFilter={false}
          direction={dir || 'up'}
          onSelectItem={data => {
            setIsTouched(true);
            setValue(data?.id ? +data?.id : undefined);
          }}
          containerStyle={{
            backgroundColor: bgColor ? bgColor : Colors.onBackground,
            justifyContent: 'center',
            alignSelf: 'flex-start',
            height: verticalScale(44),
          }}
          textInputProps={{
            placeholder: placeholder ? placeholder : '',
            autoCorrect: false,
            autoCapitalize: 'none',
            editable: false,
            style: {
              backgroundColor: bgColor ? bgColor : Colors.onBackground,
              fontFamily: 'Helvetica',
              fontSize: 14,
              textAlign: 'right',
              color: Colors.white,
            },
          }}
          showClear={showClear || false}
          suggestionsListContainerStyle={{
            backgroundColor: Colors.onBackground,
          }}
          suggestionsListTextStyle={{
            color: Colors.white,
            fontFamily: 'Helvetica',
            fontSize: 14,
          }}
          renderItem={(item, text) => (
            <HelveticaRegularText
              text={item.title}
              //fontWeight={item.title == text ? 'bold' : null}
              p={3}
              fontSize={scale(14)}
              lineHeight={scale(24)}
              color={Colors.white}
              borderColor={Colors.transparent}
              backgroundColor={Colors.warning}
            />
          )}
          ChevronIconComponent={
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                paddingLeft: scale(3),
              }}>
              <SvgXml xml={chevronDown} width={scale(10)} height={scale(10)} />
            </View>
          }
          ItemSeparatorComponent={<View />}
          inputHeight={verticalScale(34)}
          rightButtonsContainerStyle={{
            backgroundColor: bgColor ? bgColor : Colors.onBackground,
            marginRight: -8,
            paddingRight: 5,
          }}
          {...props}
        />

        <FormControl.ErrorMessage>
          {showError && errorMessage}
        </FormControl.ErrorMessage>
      </Stack>
    </FormControl>
  );
});

CustomDateAutocompleteDropdown.displayName = 'CustomDateAutocompleteDropdown';

export default memo(CustomDateAutocompleteDropdown);
