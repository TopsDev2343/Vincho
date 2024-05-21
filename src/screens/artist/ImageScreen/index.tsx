import React, {useState} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {BackButton, CustomContainer, CustomImage} from '~/components';

export default function ImageScreen({route}: {route: any}) {
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
        {/*         <Image
          source={{uri: source}}
          style={styles.image}
          resizeMode="contain"
          {...{onLoad, onLoadStart, onError}}
        /> */}
        <CustomImage
          imageSource={source}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
    </CustomContainer>
  );
}

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
