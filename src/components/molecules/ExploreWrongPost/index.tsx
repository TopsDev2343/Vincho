
import React from 'react'
import { Text, View, StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

import { UserShortInfo, AlternativeScreen } from '~/components';
import { Colors } from '~/styles/colors';
import LinearGradient from 'react-native-linear-gradient';
import { windowWidth } from '~/styles/globalStyles';
import { OptionMenuBtn } from '~/components';
import { Strings } from '~/assets/strings';
import { showTimeAgoText } from '~/utils/showTimeAgoText';


const ExploreWrongPost = ({ item, menuOnPress, imgOnPress }:
     { item?: any, menuOnPress: any, imgOnPress: any }) => {

     return (

          <View>
               <LinearGradient colors={Colors.darkToLightBack1} style={styles.container}>
                    <UserShortInfo name={item?.user?.userName}
                         img={item?.user?.photoUrl}
                         imgOnPress={imgOnPress} onLineTime={showTimeAgoText(item?.createdDate)} />
                    <OptionMenuBtn onPress={menuOnPress} />

               </LinearGradient>
               <AlternativeScreen msg={Strings.wrongFormatTxt} />
          </View>

     )
}

export default ExploreWrongPost;

const styles = StyleSheet.create({
     container: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: windowWidth,
     },
     wrongFormatTxt: {
          color: Colors.white, textAlign: 'center',
          marginTop: scale(200)
     }

})