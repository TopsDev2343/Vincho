import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {scale} from 'react-native-size-matters';

import Video from 'react-native-video';
import {windowHeight, windowWidth} from '~/styles/globalStyles';
import {Colors} from '~/styles/colors';
import {speakerOff, speakerOn} from '~/assets/icons';

const PlayVideo = (uri: any) => {
  const [mute, setMute] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const player = useRef(null);
  return (
    <View style={styles.container}>
      <Video
        ref={player}
        source={{uri: uri.uri, type: 'mp4'}}
        muted={mute}
        repeat={true}
        resizeMode="cover"
        style={styles.backgroundVideo}
        onReadyForDisplay={() => setIsLoading(false)}
        preferredForwardBufferDuration={5}
        onError={err => {}}
        ignoreSilentSwitch="ignore"
      />

      <TouchableOpacity style={styles.soundBtn} onPress={() => setMute(!mute)}>
        <SvgXml
          width={scale(24)}
          height={scale(24)}
          xml={mute ? speakerOff : speakerOn}
        />
      </TouchableOpacity>

      {isLoading && <ActivityIndicator size={28} color={Colors.primary} />}
    </View>
  );
};
export default PlayVideo;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundVideo: {
    width: windowWidth,
    backgroundColor: Colors.background,
    height: windowHeight * 0.7,
    position: 'absolute',
    top: windowHeight * 0.005,
    left: 0,
    bottom: 0,
    right: 0,
  },
  soundBtn: {
    color: Colors.white,
    alignSelf: 'flex-end',
    top: windowHeight * 0.6,
    marginRight: scale(28),
    padding: scale(4),
  },
});
