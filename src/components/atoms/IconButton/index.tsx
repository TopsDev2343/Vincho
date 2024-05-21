import React, {ReactNode} from 'react';
import {
  ViewStyle,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  TouchableOpacityProps,
} from 'react-native';
import {Colors} from '~/styles/colors';
import MIcon from '../MIcon';

type IconButtonProps = TouchableOpacityProps & {
  iconName: string;
  iconSize: number;
  iconColor: string;
  isLoading: boolean;
  iconStyle: ViewStyle;
  iconComponent: ReactNode;
  containerStyle: ViewStyle;
};

export function IconButton(props: IconButtonProps) {
  return (
    <TouchableOpacity
      {...props}
      activeOpacity={0.8}
      style={[styles.container, props.containerStyle]}>
      {props.isLoading ? (
        <ActivityIndicator color={Colors.white} size="small" />
      ) : (
        <MIcon name={props.iconName} />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
