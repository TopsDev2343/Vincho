import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView, Animated, StyleSheet} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {scale} from 'react-native-size-matters';

import {GlobalStyles} from '~/styles/globalStyles';
import {logo} from '~/assets/icons';
import {Colors} from '~/styles/colors';
import {storageHelper} from '~/utils/storageHelper';
import {StorageKeys} from '~/constants/storageKeys';
import {appUserType} from '~/@types/global';
import {useUserTypeStore} from '~/stores';

const Splash = ({navigation}: {navigation: any}) => {
  const storage = new storageHelper();
  const {userType} = useUserTypeStore(state => state);
  const {setUserType} = useUserTypeStore(state => state);
  const [showCircle, setShowCircle] = useState(false);

  const circleRad1 = useRef(new Animated.Value(scale(130))).current;
  const circleRad2 = useRef(new Animated.Value(scale(150))).current;
  const circleRad3 = useRef(new Animated.Value(scale(170))).current;

  function animOption(scaleValue: number) {
    return {
      toValue: scale(scaleValue),
      duration: 700,
      useNativeDriver: false,
    };
  }

  useEffect(() => {
    Animated.parallel([
      Animated.timing(circleRad1, animOption(190)),
      Animated.timing(circleRad2, animOption(220)),
      Animated.timing(circleRad3, animOption(260)),
    ]).start();
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(circleRad1, animOption(400)),
        Animated.timing(circleRad2, animOption(450)),
        Animated.timing(circleRad3, animOption(500)),
      ]).start(() => {
        setShowCircle(true);
        setTimeout(async () => {
          const hasIntroShown = await storage.singleGet(StorageKeys.INTRO_SHOW);
          const userTypeValue = await storage.singleGet(StorageKeys.USER_TYPE);
          userTypeValue && setUserType(userTypeValue);
          if (hasIntroShown) {
            userTypeValue === appUserType.Artist || userTypeValue == null
              ? navigation.replace('ArtistStack')
              : navigation.replace('AdminStack');
          } else {
            navigation.replace('IntroScreen');
          }
        }, 200);
      });
    }, 900);
  }, []);

  return (
    <SafeAreaView style={[GlobalStyles.screenContainer, GlobalStyles.center]}>
      <Animated.View
        style={{
          width: circleRad3,
          height: circleRad3,
          borderRadius: circleRad3,
          borderColor: showCircle ? 'transparent' : Colors.primaryVariant10,
          ...styles.circleStyle,
        }}>
        <Animated.View
          style={{
            width: circleRad2,
            height: circleRad2,
            borderRadius: circleRad2,
            borderColor: showCircle ? 'transparent' : Colors.primaryVariant20,
            ...styles.circleStyle,
          }}>
          <Animated.View
            style={{
              width: circleRad1,
              height: circleRad1,
              borderRadius: circleRad1,
              borderColor: showCircle ? 'transparent' : Colors.primaryVariant30,
              ...styles.circleStyle,
            }}>
            <SvgXml xml={logo} width={scale(80)} height={scale(80)} />
          </Animated.View>
        </Animated.View>
      </Animated.View>
    </SafeAreaView>
  );
};

export default Splash;

const styles = StyleSheet.create({
  circleStyle: {
    borderWidth: scale(5),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
