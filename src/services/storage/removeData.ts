import AsyncStorage from '@react-native-async-storage/async-storage';

const removeData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(`${key}`);
  } catch (e) {
    // remove error
  }
};

export default removeData;
