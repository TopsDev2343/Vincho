// @ts-nocheck
import {Button, HStack} from 'native-base';
import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import {SvgXml} from 'react-native-svg';
import {close} from '~/assets/icons';
import {customFonts} from '~/styles/fonts';
import ModalContainer from '../ModalContainer';

const SelectImageModal = ({
  visible,
  onClose,
  onPressGallery,
  onPressCamera,
}: {
  visible: boolean;
  onClose: any;
  onPressGallery: any;
  onPressCamera: any;
}) => {
  const onCloseHandler = () => {
    onClose?.();
  };

  const onPressOpenCamera = () => {
    onPressCamera?.();
  };

  const onPressGalleryPhoto = () => {
    onPressGallery?.();
  };

  return (
    <ModalContainer
      isVisible={visible}
      onClose={() => {
        onClose?.();
      }}>
      <View style={{padding: 16}}>
        <HStack justifyContent={'space-between'} alignItems="center" pb="16px">
          <Text
            fontFamily={customFonts.bold}
            fontSize="18"
            fontWeight={'500'}
            textAlign={'left'}>
            Select image:
          </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            style={{padding: 5}}
            onPress={() => {
              onClose?.();
            }}>
            <SvgXml
              xml={close}
              onPress={() => {
                onClose?.();
              }}
            />
          </TouchableOpacity>
        </HStack>
        <Button onPress={onPressGalleryPhoto}>
          <Text>From gallery</Text>
        </Button>
        <View style={styles.separate} />
        <Button onPress={onPressOpenCamera}>
          <Text>Open camera</Text>
        </Button>
      </View>
    </ModalContainer>
  );
};

const styles = StyleSheet.create({
  separate: {
    height: verticalScale(16),
  },
});

export default SelectImageModal;
