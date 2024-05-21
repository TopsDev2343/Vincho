import AsyncStorage from '@react-native-async-storage/async-storage';
import {StorageKeys} from '~/@types/types';

const setData = async (key: StorageKeys, value: any) => {
  try {
    await AsyncStorage.setItem(`@${key}`, JSON.stringify(value));
  } catch (e) {
    // saving error
  }
};

export default setData;
