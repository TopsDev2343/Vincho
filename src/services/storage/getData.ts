import AsyncStorage from '@react-native-async-storage/async-storage';
import {StorageKeys} from '~/@types/types';

export const getData = async (key: StorageKeys) => {
  let res = null;
  try {
    const value = await AsyncStorage.getItem(`@${key}`);
    value && (res = JSON.parse(value));
  } catch (e) {
    // error reading value
  }
  return res;
};

export default getData;
