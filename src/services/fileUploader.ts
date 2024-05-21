import {Platform} from 'react-native';
import ReactNativeBlobUtil from 'react-native-blob-util';
import * as RNFS from 'react-native-fs';
import {RNS3} from 'react-native-aws3';

export const fileUploader = async (param: any) => {
  let uri = param?.path;
  const mime: string = param?.mime;
  const name: string =
    param?.filename ?? `image${Date.now()}` + '.' + uri?.split('.').pop();

  return new Promise(async (resolve, reject) => {
    try {
      //account dev
      /*       const options = {
        bucket: 'apsy-dev-bucket',
        region: 'us-west-1',
        accessKey: '0000',
        secretKey: '000',
      }; */
      //account client
      const options = {
        bucket: 'apsy-vincho-bucket',
        region: 'us-west-1',
        accessKey: 00000
        secretKey: '000000',
      };

      const localUri =
        Platform.OS === 'ios' ? decodeURI(uri?.replace('file://', '/')) : uri;

      const file = {
        uri: localUri,
        name: name,
        type: mime,
      };
      RNS3.put(file, options).then(response => {
        if (response.status !== 201)
          reject({message: 'Failed to upload image to S3'});
        else {
          resolve({
            ...response?.body,
            uploadedUrl: response?.body?.postResponse?.location,
          });
        }
      });

      /*       //   const sasContainerUri = 'https://apsvinchostorage.blob.core.windows.net';
      const sasContainerUri = 'https://apsyvinchocdn.azureedge.net';
      const customBlobName = Math.random().toString(16).slice(2);
      const container = 'images';
      const sasToken =
        'sp=racwdli&st=2022-09-11T13:50:48Z&se=2122-09-11T21:50:48Z&spr=https&sv=2021-06-08&sr=c&sig=sr90nPPXQTN%2BZXPak8KzSLQPOh7nZIUex5ct9kdUkgY%3D';
      const assetPath = `${sasContainerUri}/${container}/${customBlobName}${name}`;

      const localUri =
        Platform.OS === 'ios' ? decodeURI(uri?.replace('file://', '/')) : uri;

      const fileBase64 = await RNFS.readFile(localUri, 'base64');

      const res = await ReactNativeBlobUtil.fetch(
        'PUT',
        `${assetPath}?${sasToken}`,
        {
          'x-ms-blob-type': 'BlockBlob',
          'content-type': 'application/octet-stream',
          'x-ms-blob-content-type': mime || 'image/png',
        },
        fileBase64,
      );

      if (res?.respInfo?.status === 201) {
        resolve({...res, uploadedUrl: `${customBlobName}${name}`});
      } */
    } catch (error) {
      reject(error);
    }
  });
};
