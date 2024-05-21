import React, {useEffect, useState, useCallback} from 'react';
import {
  ActivityIndicator,
  Image,
  TouchableOpacity,
  View,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import {SvgXml} from 'react-native-svg';
import {play} from '~/assets/icons';
import {navigate} from '~/navigation/methods';
import {Colors} from '~/styles/colors';
import {createThumbnailVideo} from '~/utils/createThumbnailVideo';

export default function VideoPlayer({
  source,
  containerStyle = styles.container,
}: {
  source?: any;
  containerStyle?: ViewStyle;
}) {
  const [, updateState] = useState();
  const [link, setLink] = useState('');
  const [loading, setLoading] = useState<boolean>(false);

  const forceUpdate = useCallback(() => updateState({}), []);

  useEffect(() => {
    setLoading(true);
    createImage();
  }, [source]);

  const createImage = async () => {
    const temp = await createThumbnailVideo(source);
    setLink(temp);
    setLoading(false);
    forceUpdate();
  };

  const playOnPress = () => {
    navigate('Video', {source});
  };

  return (
    <View style={containerStyle}>
      <Image source={{uri: link}} style={styles.thumbnail} />
      <View style={styles.iconContainer}>
        {loading ? (
          <ActivityIndicator color={Colors.white} size="large" />
        ) : (
          <TouchableOpacity activeOpacity={0.7} onPress={playOnPress}>
            <SvgXml width={scale(24)} height={scale(24)} xml={play} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: scale(150),
    marginVertical: verticalScale(4),
    marginHorizontal: scale(4),
    borderWidth: 1,
    borderColor: Colors.onBackground,
  },
  thumbnail: {
    width: scale(150),
    height: scale(150),
    borderRadius: 5,
  },
  iconContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
