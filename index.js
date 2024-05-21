/**
 * @format
 */
/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry, Text, TextInput} from 'react-native';
import {Text as NBText} from 'native-base';
import App from './src/App';
import {name as appName} from './app.json';
import PushNotification from 'react-native-push-notification';
import 'react-native-gesture-handler';

PushNotification.createChannel(
  {
    channelId: 'default-channel-id',
    channelName: 'Channel', // (required)
  },
  created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
);

AppRegistry.registerComponent(appName, () => App);

if (Text.defaultProps == null) {
  Text.defaultProps = {};
  Text.defaultProps.allowFontScaling = false;
}

if (TextInput.defaultProps == null) {
  TextInput.defaultProps = {};
  TextInput.defaultProps.allowFontScaling = false;
}

if (NBText.defaultProps == null) {
  NBText.defaultProps = {};
  NBText.defaultProps.allowFontScaling = false;
}
