import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {Colors} from '~/styles/colors';
import {Fonts} from '~/styles/fonts';
import {windowHeight, windowWidth} from '~/styles/globalStyles';

const HashtagItem = ({
  hashtagName,
  onPress,
}: {
  hashtagName: string;
  onPress: () => void;
}) => {
  return <Text onPress={onPress} style={styles.txt}>{`${hashtagName}`}</Text>;
};

export default HashtagItem;

const styles = StyleSheet.create({
  txt: {
    paddingVertical: windowHeight * 0.001,
    paddingHorizontal: windowWidth * 0.02,
    backgroundColor: Colors.onBackground,
    alignSelf: 'center',
    marginHorizontal: windowWidth * 0.01,
    ...Fonts.verySmallLight,
    textAlign: 'center',
    color: Colors.txtLight,
  },
});
