import {createThumbnail} from 'react-native-create-thumbnail-kamran';

export const createThumbnailVideo = async (url: string) => {
  return createThumbnail({
    url: url,
    timeStamp: 1000,
  })
    .then((response: any) => {
      return response?.path;
    })
    .catch((err: any) => {});
};
