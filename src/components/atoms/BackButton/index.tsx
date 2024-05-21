import React from 'react';
import {Button, HStack, Text} from 'native-base';
import {SvgXml} from 'react-native-svg';
import {scale} from 'react-native-size-matters';

import {goBack} from '~/navigation/methods';
import {chevronLeft} from '~/assets/icons';
import {Colors} from '~/styles/colors';
import {customFonts} from '~/styles/fonts';
import {Strings} from '~/assets/strings';

const BackButton = ({
  isModal,
  modalOnClose,
}: {
  isModal?: boolean;
  modalOnClose?: any;
}) => {
  return (
    <Button
      variant="link"
      justifyContent="flex-start"
      alignItems="center"
      onPress={() => (isModal ? modalOnClose() : goBack())}>
      <HStack>
        <SvgXml
          xml={chevronLeft}
          fill={Colors.white}
          width={scale(16)}
          height={scale(16)}
        />
        <Text
          fontSize="xs"
          color={Colors.txtLight}
          ml="3"
          fontFamily={customFonts.regular}>
          {Strings.back}
        </Text>
      </HStack>
    </Button>
  );
};

export default BackButton;
