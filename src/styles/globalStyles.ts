import {Colors} from './colors';
import {StyleSheet, Dimensions} from 'react-native';
import {scale} from 'react-native-size-matters';
import {height} from '~/utils/dimension';

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

export const GlobalStyles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const successSnackBar = {
  backgroundColor: Colors.black,
  type: 'default',
  color: Colors.success,
  position: 'bottom',
  style: {
    borderWidth: scale(1),
    borderRadius: scale(10),
    borderColor: Colors.success,
  },
  floating: true,
};

export const errorSnackBar = {
  backgroundColor: Colors.black,
  type: 'default',
  color: Colors.error,
  position: 'bottom',
  style: {
    borderWidth: scale(1),
    borderRadius: scale(10),
    borderColor: Colors.error,
  },
  floating: true,
};
