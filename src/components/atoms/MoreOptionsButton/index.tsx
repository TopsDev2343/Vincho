import React from 'react';
import { Button } from 'native-base';
import { SvgXml } from 'react-native-svg';
import { scale } from 'react-native-size-matters';
import { optionMenu } from '~/assets/icons';
import { Colors } from '~/styles/colors';
const MoreOptionsButton = ({ onPress }: { onPress: any }) => {
    return (
        <Button variant="link" justifyContent='flex-start' alignItems='center'
            onPress={onPress}>
            <SvgXml xml={optionMenu} fill={Colors.white} width={scale(16)} height={scale(16)} />
        </Button>
    )
}
export default MoreOptionsButton 