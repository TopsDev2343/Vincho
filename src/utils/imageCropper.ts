import ImagePicker from 'react-native-image-crop-picker';
import {getFileExtension} from '~/utils/getFileExtension';
import {windowWidth, windowHeight} from '../styles/globalStyles';

export async function imageCropper(setValue: any, path: string) {
  try {
    const imagePicker = await ImagePicker.openCropper({
      path: path,
      //width: windowWidth,
      //height: windowHeight,
      width: windowWidth,
      height: windowHeight - windowHeight * 0.26,
      mediaType: 'photo',
      //freeStyleCropEnabled: true,
      //showCropFrame: true,
      showCropGuidelines: true,
    });
    setValue({
      uri: imagePicker.path,
      type: getFileExtension(imagePicker.path),
      imagePicker: imagePicker,
    });
  } catch (err) {
    //snackBar(messageHelper('SomeError'));
  }
}
