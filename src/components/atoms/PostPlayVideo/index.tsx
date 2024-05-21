import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  View,
  Image,
  ActivityIndicator,
  Platform,
  StyleSheet,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {scale} from 'react-native-size-matters';
import {Colors} from '~/styles/colors';
import {play} from '~/assets/icons';
import {getFullImageUrl} from '~/hooks/artist/Upload';
import {createThumbnailVideo} from '~/utils/createThumbnailVideo';
import Video from 'react-native-video';

const PostPlayVideo = ({
  uri,
  width,
  customStyle,
}: {
  uri: any;
  width: number;
  customStyle?: any;
}) => {
  let fileUrl = getFullImageUrl(uri);
  const [, updateState] = useState();
  const [link, setLink] = useState('');
  const [loading, setLoading] = useState<boolean>(false);

  const forceUpdate = useCallback(() => updateState({}), []);
  const player = useRef(null);

  useEffect(() => {
    setLoading(true);
    createImage();
  }, [fileUrl]);

  const createImage = async () => {
    const temp = await createThumbnailVideo(uri);
    setLink(temp);
    setLoading(false);
    forceUpdate();
  };

  return (
    <View
      style={[
        customStyle,
        styles.container,
        {
          width: width,
          height: width,
        },
      ]}>
      {Platform.OS == 'android' ? (
        <Video
          source={{
            uri: fileUrl,
          }}
          resizeMode={'cover'}
          style={[styles.item, {width: width, height: width}]}
          paused={true}
        />
      ) : (
        <Image
          source={{uri: link}}
          style={[styles.item, {width: width, height: width}]}
        />
      )}
      <View style={styles.icon}>
        {loading ? (
          <ActivityIndicator color={Colors.white} size="large" />
        ) : (
          <SvgXml width={scale(24)} height={scale(24)} xml={play} />
        )}
      </View>
    </View>
  );
};
export default PostPlayVideo;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    flex: 1,
    alignSelf: 'flex-end',
    backgroundColor: Colors.onBackground,
    position: 'absolute',
    top: 0,
    right: 0,
  },
  icon: {
    position: 'absolute',
    alignSelf: 'flex-end',
    top: 2,
    padding: scale(4),
  },
});
