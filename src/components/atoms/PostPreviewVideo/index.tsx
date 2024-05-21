import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {scale} from 'react-native-size-matters';

import Video from 'react-native-video';
import {windowHeight, windowWidth} from '~/styles/globalStyles';
import {Colors} from '~/styles/colors';
import {speakerOff, speakerOn, play, pause} from '~/assets/icons';
import {HStack} from 'native-base';

const PostPreviewVideo = (uri: any) => {
  const [mute, setMute] = useState<boolean>(true);
  const [paused, setPaused] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      <Video
        source={uri}
        resizeMode={'contain'}
        muted={mute}
        repeat={true}
        style={styles.backgroundVideo}
        paused={paused}
      />

      <HStack style={styles.btnContainer}>
        <TouchableOpacity
          style={styles.soundBtn}
          onPress={() => setMute(!mute)}>
          <SvgXml
            width={scale(24)}
            height={scale(24)}
            xml={mute ? speakerOff : speakerOn}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.pauseBtn}
          onPress={() => setPaused(!paused)}>
          <SvgXml
            width={scale(24)}
            height={scale(24)}
            xml={paused ? play : pause}
          />
        </TouchableOpacity>
      </HStack>
    </View>
  );
};
export default PostPreviewVideo;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    height: windowHeight * 0.4,
  },
  backgroundVideo: {
    width: windowWidth,
    backgroundColor: Colors.background,
    position: 'absolute',
    top: windowHeight * 0.005,
    left: 0,
    bottom: 0,
    right: 0,
  },
  soundBtn: {
    color: Colors.white,
    marginRight: scale(5),
    padding: scale(4),
  },
  pauseBtn: {
    color: Colors.white,
    padding: scale(4),
  },
  btnContainer: {
    alignSelf: 'center',
    marginBottom: scale(windowHeight * 0.05),
  },
});
