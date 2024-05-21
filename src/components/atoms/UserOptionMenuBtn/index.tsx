import React from 'react';
import {Text, Button, VStack} from 'native-base';
import {SvgXml} from 'react-native-svg';

import {Colors} from '~/styles/colors';
import {scale} from 'react-native-size-matters';
import {customFonts} from '~/styles/fonts';

const UserOptionMenuBtn = ({
  icon,
  title,
  onPress,
}: {
  icon: string;
  title: string;
  onPress: any;
}) => {
  return (
    <Button
      onPress={onPress}
      width={24}
      mx={1}
      height={24}
      bg={Colors.OnOverlay}
      borderRadius={6}
      px={0}>
      <VStack alignItems={'center'}>
        <SvgXml xml={icon} />
        <Text
          textAlign={'center'}
          color={Colors.white}
          mt={2}
          style={styles.headerTxt}>
          {title}
        </Text>
      </VStack>
    </Button>
  );
};

export default UserOptionMenuBtn;

const styles = {
  bottom: {
    marginBottom: 0,
    marginTop: 'auto',
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    backgroundColor: Colors.overlay,
  },
  header: {
    borderBottomWidth: 0,
    alignSelf: 'center',
    backgroundColor: Colors.overlay,
  },
  headerTxt: {
    color: Colors.white,
    fontFamily: customFonts.light,
    fontSize: scale(10),
  },
};
