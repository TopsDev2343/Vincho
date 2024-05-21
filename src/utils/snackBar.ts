import {showMessage} from 'react-native-flash-message';
import {Colors} from '../styles/colors';
import {scale} from 'react-native-size-matters';

function snackBar(options: any) {
  if (options.message == '{}') {
    options.message = 'Network request failed!';
  }
  showMessage({
    message: options.message,
    backgroundColor: Colors.black,
    type: 'default',
    color: options.color,
    position: 'bottom',
    style: {
      borderWidth: scale(1),
      borderRadius: scale(10),
      borderColor: options.color,
    },
    floating: true,
  });
}

export default snackBar;
