
import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import { SvgXml } from 'react-native-svg';

import { optionMenu } from '~/assets/icons'
import { useAuthModalStore, useAuthStore } from '~/stores';

const OptionMenuBtn = ({ onPress }: { onPress: any }) => {
     const { userId } = useAuthStore(state => state);
     const { setShowAuthModal } = useAuthModalStore(state => state);
     return (

          <TouchableOpacity onPress={userId ? onPress : () => setShowAuthModal(true)}>
               <SvgXml {...styles.icon} />
          </TouchableOpacity>
     )
}

export default OptionMenuBtn;

const styles = StyleSheet.create({

     icon: {
          xml: optionMenu,
          width: scale(20),
          height: scale(20),
          style: { marginRight: scale(12) },
     },

})