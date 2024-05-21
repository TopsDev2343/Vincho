import React from 'react';
import {Text, Button, HStack, Box} from 'native-base';
import {SvgXml} from 'react-native-svg';

import {Colors} from '~/styles/colors';
import {filledChevronRight} from '~/assets/icons';

const AdminHomeBtn = ({
  title,
  onPress,
  icon,
}: {
  title: string;
  onPress: any;
  icon: string;
}) => {
  return (
    <Button
      my={3}
      height={20}
      bg={Colors.onBackground}
      borderRadius={6}
      onPress={onPress}
      mx={4}>
      <HStack alignItems={'center'} justifyContent={'space-between'}>
        <HStack alignItems={'center'}>
          <Box bg={Colors.onSecondary} p={3} borderRadius={4}>
            <SvgXml xml={icon} />
          </Box>
          <Text color={Colors.txtLight} ml={4} w={'72%'}>
            {title}
          </Text>
        </HStack>
        <SvgXml xml={filledChevronRight} />
      </HStack>
    </Button>
  );
};

export default AdminHomeBtn;
