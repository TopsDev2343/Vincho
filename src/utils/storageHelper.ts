//Helper class for async storage

import AsyncStorage from '@react-native-async-storage/async-storage';
//import { CryptoJS } from 'crypto-js';
export class storageHelper {
  //Encrypt token
  /*    encryptValue(value:string,key:string) {
          let encryptedToken = CryptoJS.AES.encrypt(value, key).toString();
          return encryptedToken
     } */

  //Decrypt token
  /*   decryptValue(value:string,key:string) {
          let decryptToken = CryptoJS.AES.decrypt(value, key).toString(CryptoJS.enc.Utf8);
          return decryptToken
     } */

  //Save user authentication token
  saveAuthToken(value: string, key: string, callback: any) {
    AsyncStorage.setItem(key, value, callback);
    /*  let encryptedToken = this.encryptValue(value,key)
          try {
               AsyncStorage.setItem(key, encryptedToken, callback)
          } catch (e) {
               throw (e)
          } */
  }
  //Get user authentication token
  async getAuthToken(key: string) {
    try {
      let token = await AsyncStorage.getItem(key);
      return token;
      /* if(encryptedToken!==null){
                    let decryptToken = this.decryptValue(encryptedToken,key)
                    return decryptToken
               } */
      return null;
    } catch (e) {
      throw e;
    }
  }

  //Save a data in asyncStorage
  singleSave(value: string, key: string, callback: any) {
    try {
      return AsyncStorage.setItem(key, value, callback);
    } catch (e) {
      throw e;
    }
  }

  //data: [key0,value0], [key1,value1], ....
  multiSave(callback: () => void, data: [string, string][]) {
    try {
      return AsyncStorage.multiSet(data, callback);
    } catch (e) {
      throw e;
    }
  }

  async multiGet(key: string[]) {
    try {
      let result = await AsyncStorage.multiGet(key);
      /*   let newArray = result.map(element => {
                    return [element[0], JSON.parse(element[1])]
               }); */
      return result;
    } catch (e) {
      throw e;
    }
  }

  async navScreen(screenName: string[], key: string[]) {
    let storedValue = await this.multiGet(key);
    for (let i = 0; i < storedValue.length; i++) {
      if (!storedValue[i][1]) {
        return screenName[i];
      }
    }
    return 'done';
  }

  async multiRemove(key: string[]) {
    try {
      let result = await AsyncStorage.multiRemove(key);
      return result;
    } catch (e) {
      throw e;
    }
  }

  async singleGet(key: string) {
    try {
      let result = await AsyncStorage.getItem(key);
      return result;
    } catch (e) {
      throw e;
    }
  }
}
