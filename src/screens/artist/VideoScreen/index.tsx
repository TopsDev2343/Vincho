import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import Video from 'react-native-video';
import {showMessage} from 'react-native-flash-message';
import {BackButton, CustomContainer} from '~/components';
import {scale, verticalScale} from 'react-native-size-matters';

export default function VideoScreen({route}: {route: any}) {
  const source = route.params?.source;

  const [loading, setLoading] = useState<boolean>(false);

  const onLoad = () => {
    setLoading(false);
  };
  const onLoadStart = () => {
    setLoading(true);
  };

  const onError = () => {
    setLoading(false);
    showMessage({message: 'Something went wrong', type: 'danger'});
  };

  return (
    <CustomContainer isLoading={loading} style={{flex: 1}}>
      <BackButton />
      <View style={styles.flex1}>
        <Video
          source={{uri: source}}
          style={styles.video}
          resizeMode="contain"
          muted={false}
          repeat={false}
          {...{onLoad, onLoadStart, onError}}
          autoPlay
          controls
        />
      </View>
    </CustomContainer>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    height: verticalScale(55),
    paddingHorizontal: scale(32),
    // position: 'absolute',
  },
  iconContainer: {padding: 2},
  flex1: {
    flex: 1,
  },
  video: {
    width: '100%',
    height: '100%',
  },
});
