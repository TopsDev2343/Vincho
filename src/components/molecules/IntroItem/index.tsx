import React from 'react';
import {
  Text,
  Image,
  View,
  StyleSheet,
  ImageSourcePropType,
  Dimensions,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';

import {Colors} from '~/styles/colors';
import {Fonts} from '~/styles/fonts';
import {PageIndicator} from '~/components';
type IntroItemType = {
  img: ImageSourcePropType;
  imgBack: ImageSourcePropType;
  imgWidth: number;
  activeIndex: number;
  title: string;
  body: string;
  onClick: any;
  writer: string;
};
const {width, height} = Dimensions.get('window');

function IntroItem(input: IntroItemType) {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={input.imgBack}
        style={styles.innerContainer}
        resizeMode={'cover'}
        imageStyle={{
          marginTop: input.activeIndex === 0 ? scale(100) : scale(500),
          height: input.activeIndex === 0 ? scale(550) : scale(200),
          width: '100%',
        }}>
        <View style={{flex: 7.5, justifyContent: 'flex-start'}}>
          <Image
            source={input.img}
            style={{width: scale(input.imgWidth), ...styles.img}}
          />

          <View style={styles.txtContainer}>
            <Text style={styles.titleTxt}>{input.title}</Text>
            {input.writer && (
              <Text style={styles.writerTxt}>{input.writer}</Text>
            )}
            <Text style={styles.bodyTxt}>{input.body}</Text>
          </View>
        </View>

        <View
          style={{
            flex: 2.5,
            paddingTop: verticalScale(16),
            justifyContent: 'center',
            paddingBottom: verticalScale(80),
          }}>
          <PageIndicator
            numOfIndicator={3}
            activeIndex={input.activeIndex}
            marginV={26}
          />
          {/*           <CustomButton
            containerStyle={styles.btnContainer}
            title={input.activeIndex === 2 ? Strings.getStart : Strings.next}
            titleColor={Colors.primary}
            backColor={Colors.introBtnBack}
            onPress={input.onClick}
          /> */}
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

export default IntroItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    height,
  },
  innerContainer: {flex: 1},
  img: {
    height: scale(240),
    alignSelf: 'center',
  },
  txtContainer: {
    alignSelf: 'center',
    marginTop: scale(16),
    marginHorizontal: scale(20),
  },
  titleTxt: {
    ...Fonts.smallRegChanel,
    color: Colors.txtLight,
  },
  writerTxt: {
    ...Fonts.verySmallRegChanel,
    color: Colors.txtLight,
    alignSelf: 'flex-end',
  },
  bodyTxt: {
    marginTop: scale(4),
    fontSize: scale(14),
    lineHeight: scale(24),
    fontFamily: 'Helvetica',
    color: Colors.txtMedium,
    textAlign: 'justify',
  },
  btnContainer: {
    justifyContent: 'flex-end',
    //  flex: 1
  },
});
