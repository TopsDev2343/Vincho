import Video from 'react-native-video';
import React, {useRef, useState, useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {usePlayer} from '~/components/contexts';
import {IconButton} from '../IconButton';
import Slider from '@react-native-community/slider';
import {Colors} from '~/styles/colors';
import {scale} from 'react-native-size-matters';

const pad = (n, width, z = 0) => {
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
};

const formatTime = position => [
  pad(Math.floor(position / 60), 2),
  pad(position % 60, 2),
];

const PlayVoice = ({soundItem, index}) => {
  const audioElement = useRef(null);
  const [paused, setPaused] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [totalLength, setTotalLength] = useState(1);
  const {playedIndex, setPlayedIndex} = usePlayer();
  const [currentPosition, setCurrentPosition] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(formatTime(0));

  const setDuration = data => {
    setTotalLength(Math.floor(data.duration));
    setIsLoading(false);
  };

  const setTime = data => setCurrentPosition(Math.floor(data.currentTime));

  const seek = async time => {
    time = Math.round(time);
    audioElement.current && audioElement.current.seek(time);
    setCurrentPosition(time);
    setPaused(true);
  };

  const onEnd = () => {
    seek(0);
    setPaused(true);
  };

  useEffect(() => {
    setElapsedTime(formatTime(currentPosition));
  }, [currentPosition]);

  useEffect(() => {
    if (playedIndex != null && playedIndex != index) setPaused(true);
  }, [playedIndex]);

  return (
    <View style={styles.container}>
      <IconButton
        iconSize={32}
        isLoading={isLoading}
        iconColor={'red'}
        containerStyle={styles.button}
        onPress={() => {
          playedIndex != index && setPlayedIndex(index);
          setPaused(!paused);
        }}
        iconName={!paused ? 'pause-circle' : 'play'}
      />
      <Slider
        style={styles.slider}
        value={currentPosition}
        maximumTrackTintColor="gray"
        thumbTintColor={Colors.white}
        onSlidingComplete={seek.bind(this)}
        onSlidingStart={() => setPaused(true)}
        minimumTrackTintColor={Colors.primary}
        maximumValue={Math.max(totalLength, 1, currentPosition + 1)}
      />
      <Text style={{color: Colors.white}}>
        {elapsedTime[0] + ':' + elapsedTime[1] || '00:00'}
      </Text>
      <Video
        audioOnly
        onEnd={onEnd}
        repeat={false}
        paused={paused}
        ref={audioElement}
        playInBackground={false}
        style={styles.audioElement}
        source={{uri: soundItem}}
        onLoad={setDuration.bind(this)}
        onProgress={setTime.bind(this)}
        onLoadStart={() => setIsLoading(true)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: scale(200),
  },
  audioElement: {
    height: 0,
    width: 0,
  },
  slider: {
    flex: 1,
  },
  button: {
    width: 32,
    height: 32,
  },
});

export default React.memo(PlayVoice);
