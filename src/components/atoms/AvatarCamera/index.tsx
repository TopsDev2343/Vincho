//Design Large button

import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import { SvgXml } from 'react-native-svg';

import { camera } from '~/assets/icons';
import { Colors } from '~/styles/colors';

type avatarCameraInput = {
    onPress: any,
    mTop: number,
    mLeft: number
}

function AvatarCamera(input: avatarCameraInput) {

    return (

        <TouchableOpacity style={[styles.container, {
            top: scale(input.mTop),
            left: scale(input.mLeft)
        }]} onPress={input.onPress}>
            <SvgXml xml={camera} />
        </TouchableOpacity>

    )
}

export default AvatarCamera

const styles = StyleSheet.create({
    container: {
        width: scale(42),
        height: scale(42),
        borderRadius: scale(42),
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',

    }
})