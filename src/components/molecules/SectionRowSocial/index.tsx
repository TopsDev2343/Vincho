import React from 'react';
import { Platform } from 'react-native';
import { HStack, IconButton, Text, VStack } from 'native-base';
import { scale } from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient';
import { SvgXml } from 'react-native-svg';

import { google, apple, facebook } from '~/assets/icons';
import { Strings } from '~/assets/strings/index';
import { customFonts } from '~/styles/fonts';
import { Colors } from '~/styles/colors';

export default function SectionRowSocial({
  googleOnPress,
  facebookOnPress,
  appleOnPress,
}: {
  googleOnPress: () => void;
  facebookOnPress: () => void;
  appleOnPress: () => void;
}) {
  return (
    <VStack px="4" mt="8" width="full">
      <HStack width="full" alignItems="center">
        <LinearGradient
          end={{ x: 0, y: 0 }} start={{ x: 1, y: 0 }} style={{ height: scale(1), width: scale(130) }}
          colors={Colors.gradientDivider} />
        <Text mx="3" fontSize='xs' color={Colors.txtMedium}
          fontFamily={customFonts.regular}>
          {Strings.useSocial}
        </Text>
        <LinearGradient
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ height: scale(1), width: scale(130) }}
          colors={Colors.gradientDivider} />
      </HStack>
      <HStack mt="4" space="4" justifyContent="center">
        <SocialButton
          name="facebook"
          as={<SvgXml xml={facebook} />}
          onPress={facebookOnPress}
        />
        <SocialButton
          left={4}
          as={<SvgXml xml={google} />}
          name="logo-google"
          onPress={googleOnPress}
        />
        {Platform.OS === 'ios' && (
          <SocialButton
            left={2}
            name="apple"
            as={<SvgXml xml={apple} />}
            onPress={appleOnPress}
          />
        )}
      </HStack>
    </VStack>
  );
}

function SocialButton({ name, as, left, onPress }: any) {
  return (
    <IconButton
      onPress={onPress}
      variant="solid"
      bgColor={Colors.transparent}
      _icon={{
        as,
        name,
        style: {
          left,
        },
      }}
    />
  );
}
