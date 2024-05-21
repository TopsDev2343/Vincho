import React from 'react';
import {StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import {SvgXml} from 'react-native-svg';
import {pause, play} from '~/assets/icons';

/**
 * @param {{name: string}} props
 */
const MIcon = props => {
  const {name} = props;

  return (
    <SvgXml
      width={scale(24)}
      height={scale(24)}
      xml={name == 'play' ? play : pause}
    />
    /*         <Ionicons
            {...props}
            name={name}
            style={[styles.default, style ?? {}]}
            size={size ?? 16}
            color={color ?? 'black'}
        /> */
  );
};

const styles = StyleSheet.create({
  default: {
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

export default MIcon;
