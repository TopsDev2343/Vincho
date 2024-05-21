import React from 'react';
import {View, StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import DropDownPicker from 'react-native-dropdown-picker';
import {SvgXml} from 'react-native-svg';

import {windowHeight, windowWidth} from '~/styles/globalStyles';
import {Colors} from '~/styles/colors';
import {Fonts} from '~/styles/fonts';
import {chevronDown} from '~/assets/icons';

const DropDown = ({
  open,
  value,
  setOpen,
  setValue,
  dropDownOptions,
  width,
  marginT,
  placeHolder,
}: {
  open: boolean;
  value: string | number;
  setOpen: any;
  setValue: any;
  dropDownOptions: object[];
  width: number;
  marginT: number;
  placeHolder: string;
}) => {
  function arrowUi(arrow: string) {
    return (
      <View style={styles.dropDownArrow}>
        <SvgXml xml={arrow} width={scale(10)} height={scale(10)} />
      </View>
    );
  }

  return (
    <View style={{marginTop: marginT}}>
      <DropDownPicker
        activityIndicatorColor="white"
        activityIndicatorSize={5}
        placeholder={placeHolder}
        open={open}
        value={value}
        items={dropDownOptions}
        setOpen={setOpen}
        setValue={setValue}
        showTickIcon={false}
        style={[styles.dropDown, {width: width}]}
        textStyle={styles.dropDownTxt}
        ArrowDownIconComponent={() => arrowUi(chevronDown)}
        ArrowUpIconComponent={() => arrowUi(chevronDown)}
        dropDownContainerStyle={[styles.dropDownContainer, {width: width}]}
        listItemContainerStyle={[styles.dropDownListItem, {width: width}]}
        selectedItemContainerStyle={styles.dropDownSelected}
        placeholderStyle={styles.placeHolder}
      />
    </View>
  );
};

export default DropDown;

const styles = StyleSheet.create({
  dropDown: {
    borderRadius: 0,
    height: windowHeight * 0.01,
    borderColor: Colors.transparent,
    backgroundColor: Colors.transparent,
  },
  dropDownTxt: {
    color: Colors.white,
    ...Fonts.smallReg,
  },
  dropDownContainer: {
    borderColor: Colors.transparent,
    backgroundColor: Colors.onBackground,
    borderRadius: windowWidth * 0.01,
    marginLeft: windowWidth * 0.01,
  },
  dropDownListItem: {
    height: windowHeight * 0.06,
  },
  dropDownSelected: {
    backgroundColor: Colors.onBackground,
  },
  dropDownArrow: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: scale(3),
  },
  placeHolder: {
    color: Colors.txtMedium,
  },
});
