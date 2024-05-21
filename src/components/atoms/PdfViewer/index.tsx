import React, {useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import {SvgXml} from 'react-native-svg';
import {copy, file} from '~/assets/icons';
import FileViewer from 'react-native-file-viewer';
import RNFS from 'react-native-fs';

const PdfViewer = ({
  source,
  containerStyle = styles.container,
}: {
  source: any;
  containerStyle?: ViewStyle;
}) => {
  const [creating, setCreating] = useState(false);
  function getUrlExtension(url) {
    let extension = url.split(/[#?]/)[0].split('.').pop().trim();
    if (extension.toString().length > 4) {
      extension = 'pdf';
    }
    return extension;
  }

  async function goToReading() {
    setCreating(true);
    const extension = getUrlExtension(source);
    const localFile = `${RNFS.DocumentDirectoryPath}/temporaryfile.${extension}`;
    const options = {
      fromUrl: source,
      toFile: localFile,
    };
    RNFS.downloadFile(options)
      .promise.then(() => {
        FileViewer.open(localFile, {
          showOpenWithDialog: true,
          showAppsSuggestions: true,
        });
      })
      .then(() => {
        //FileViewer.open(localFile);
      })
      .finally(() => {
        setCreating(false);
      });
  }

  return (
    <TouchableOpacity
      style={containerStyle}
      activeOpacity={0.7}
      onPress={goToReading}>
      {creating ? (
        <ActivityIndicator />
      ) : (
        <SvgXml width={scale(24)} height={scale(24)} xml={file} />
      )}
    </TouchableOpacity>
  );
};

export default PdfViewer;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: verticalScale(4),
  },
});
