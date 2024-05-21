import React from 'react';
import { Text, Button, HStack } from 'native-base';
import { SvgXml } from 'react-native-svg';

import { Colors } from '~/styles/colors';
import { filledChevronRight } from '~/assets/icons';
import { scale } from 'react-native-size-matters';


const ReportBtn = ({ title, onPress, }: { title: string, onPress: any, }) => {

     return (

          <Button my={3} height={12} bg={Colors.OnOverlay} borderRadius={6} onPress={onPress}
               w={scale(300)}>
               <HStack alignItems={'center'} justifyContent={'space-between'}>
                    <Text color={Colors.txtLight} width="94%">{title}</Text>
                    <SvgXml xml={filledChevronRight} />
               </HStack>
          </Button>
     )
}

export default ReportBtn;