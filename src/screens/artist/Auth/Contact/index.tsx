import React, { useState } from 'react';
import { ImageBackground, StyleSheet, View, Text } from 'react-native';
import { scale } from 'react-native-size-matters';
import Contacts from 'react-native-contacts';

import { Colors } from '~/styles/colors';
import { CustomContainer } from '~/components';
import { CustomButton } from '~/components';
import { Strings } from '~/assets/strings/index';
import { contactBack } from '~/assets/images';
import LinearGradient from 'react-native-linear-gradient';
import { Fonts } from '~/styles/fonts';
import snackBar from '~/utils/snackBar';
import { BackButton } from '~/components';
import { replace } from '~/navigation/methods';
import { storageHelper } from '~/utils/storageHelper';
import { requestContactPermission } from '~/utils/userPermission';
import { useContactStore, useAuthRefreshStore } from '~/stores';
import { getValueByKey } from '~/utils/getValueByKey';
import { StorageKeys } from '~/constants/storageKeys';
import { messageHelper } from '~/utils/messageHelper';

const Contact = () => {

     const [loading, setLoading] = useState<boolean>(false);
     const { setContactInfo } = useContactStore(state => state);
     const storage = new storageHelper();
     const { refreshAuth, setRefreshAuth } = useAuthRefreshStore()

     async function getCurrentLocation() {
          setLoading(true)
          if (await requestContactPermission()) {
               Contacts.getAll()
                    .then((contacts) => {
                         setLoading(false)
                         setContactInfo(getValueByKey(contacts))
                         replace('FollowContactScreen')
                    })
                    .catch((e) => {
                         snackBar(messageHelper('SomeError'))
                    })
          }
     };

     function skipNow() {
          storage.multiSave(() => {
               setRefreshAuth(!refreshAuth)
               replace('ChooseTopicScreen')
          }, [[StorageKeys.FOLLOW_CONTACT_SHOW, 'shown'],
          [StorageKeys.ACCESS_CONTACT_SHOW, 'shown']])
     }

     return (
          <CustomContainer>

               <ImageBackground source={contactBack} style={{ flex: 1 }} resizeMode="cover">

                    <LinearGradient style={{ flex: 1, }}
                         colors={Colors.darkToLightBack}>

                         <BackButton />

                         <View style={{ marginTop: scale(36), marginHorizontal: scale(24) }}>
                              <Text style={{ ...Fonts.largeRegChanel, color: Colors.white }}>
                                   {Strings.contactTitle}
                              </Text>
                              <Text style={{ ...Fonts.smallLight, color: Colors.white }}>
                                   {Strings.contactBody}
                              </Text>
                         </View>

                         <View style={{ justifyContent: 'flex-end', alignItems: 'center', flex: 1 }}>
                              <CustomButton title={Strings.import}
                                   titleColor={Colors.txtDark}
                                   backColor={Colors.primary}
                                   isLoading={loading}
                                   onPress={getCurrentLocation}
                              />
                              <CustomButton title={Strings.skipNow}
                                   titleColor={Colors.primary}
                                   backColor={Colors.transparent}
                                   btnMTop={scale(5)}
                                   btnMBottom={scale(16)}
                                   onPress={skipNow}
                              />
                         </View>

                    </LinearGradient>

               </ImageBackground>
          </CustomContainer >
     );
}

export default Contact;

const styles = StyleSheet.create({
     contentContainerStyle: {
          flexGrow: 1,
     },
     image: {
          width: '90%',
          aspectRatio: 1.2,
          alignSelf: 'center',
     },
});
