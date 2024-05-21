import ImagePicker from 'react-native-image-crop-picker';
import {getFileExtension} from '~/utils/getFileExtension';

export async function openGallery(setValue: any) {
  try {
    const imagePicker = await ImagePicker.openPicker({
      width: 600,
      height: 600,
      cropping: true,
      includeBase64: true,
      mediaType: 'any',
      writeTempFile: true,
      forceJpg: true,
    });
    setValue({
      uri: imagePicker.path,
      type: getFileExtension(imagePicker.path),
      imagePicker: imagePicker,
    });
  } catch (err) {}
}
