import React from 'react';
import {View, TouchableWithoutFeedback, Platform} from 'react-native';
import {scale} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import {SvgXml} from 'react-native-svg';

import {plus} from '~/assets/icons';
import {Colors} from '~/styles/colors';
import {windowHeight, windowWidth} from '~/styles/globalStyles';
import {useAuthModalStore, useAuthStore} from '~/stores';

const AddPostBtn = () => {
  const {setShowAuthModal} = useAuthModalStore(state => state);
  const {userId} = useAuthStore(state => state);
  const navigation = useNavigation<any>();

  function btnOnPress() {
    if (userId) {
      navigation.navigate('SelectPostScreen');
    } else {
      setShowAuthModal(true);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={btnOnPress}>
      <View
        style={{
          width: scale(50),
          height: scale(50),
          backgroundColor: Colors.primary,
          borderRadius: scale(48),
          bottom: windowHeight * 0.05,
          position: 'absolute',
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <SvgXml
          width={windowWidth * 0.06}
          height={windowWidth * 0.06}
          xml={plus}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AddPostBtn;
