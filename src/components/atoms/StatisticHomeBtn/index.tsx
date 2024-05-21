import React from 'react';
import {Text, Button, HStack, Box, VStack} from 'native-base';
import {SvgXml} from 'react-native-svg';

import {Colors} from '~/styles/colors';
import {filledChevronRight} from '~/assets/icons';

const StatisticHomeBtn = ({
  title,
  value,
  onPress,
}: {
  title: string;
  value: string;
  onPress: any;
}) => {
  return (
    <Button
      my={3}
      height={20}
      bg={Colors.onBackground}
      borderRadius={16}
      onPress={onPress}
      mx={4}>
      <HStack alignItems={'center'} justifyContent={'space-between'}>
        <HStack alignItems={'center'}>
          <VStack ml={4} w={'84%'}>
            <Text color={Colors.white} fontSize={16}>
              {value}
            </Text>
            <Text color={Colors.white} fontSize={10}>
              {title}
            </Text>
          </VStack>
        </HStack>
        <SvgXml xml={filledChevronRight} />
      </HStack>
    </Button>
  );
};

export default StatisticHomeBtn;
