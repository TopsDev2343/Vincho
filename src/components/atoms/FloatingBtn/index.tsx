import {Button} from 'native-base';
import React from 'react';
import {scale} from 'react-native-size-matters';

import {windowWidth, windowHeight} from '~/styles/globalStyles';
import {Colors} from '~/styles/colors';

const FloatingBtn = ({
  btnOnPress,
  btnTitle,
  marginT,
  marginB,
}: {
  btnOnPress: any;
  btnTitle: string;
  marginT?: number;
  marginB?: number;
}) => {
  return (
    <Button
      onPress={btnOnPress}
      borderRadius="3xl"
      size="md"
      mt={windowHeight * (marginT ? marginT : 0.005)}
      mb={marginB ? marginB : 0}
      ml={windowWidth * 0.63}
      _pressed={{opacity: 0.7}}
      _text={{
        color: Colors.txtDark,
      }}
      backgroundColor={Colors.primary}
      h={scale(46)}
      w={scale(120)}
      position={marginT ? 'absolute' : undefined}>
      {btnTitle}
    </Button>
  );
};

export default FloatingBtn;
