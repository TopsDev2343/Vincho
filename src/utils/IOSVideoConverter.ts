/* import {FFmpegKit} from 'ffmpeg-kit-react-native';
import {TemporaryDirectoryPath} from 'react-native-fs';
 */
interface ConverterEngine {
  convert(arg0: string): Promise<string>;
}

class IOSVideoConverter implements ConverterEngine {
  async convert(videoUri: string): Promise<string> {
    const outputVideoName = `video${Date.now()}` + '.mp4';
    const outputVideoUri = `file://${TemporaryDirectoryPath}/${outputVideoName}`;

    try {
      //await FFmpegKit.execute(`-y -i ${videoUri} ${outputVideoUri}`);
    } catch (e) {
      throw new Error('Failed to convert the video');
    }

    return outputVideoUri;
  }
}

export default IOSVideoConverter;
