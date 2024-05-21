import React, {useState} from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import {scale} from 'react-native-size-matters';

import {CustomContainer, DeleteAccountModal, MenuItem} from '~/components';
import {BackButton} from '~/components';
import {Colors} from '~/styles/colors';
import {Fonts} from '~/styles/fonts';
import {Strings} from '~/assets/strings';
import {AppSettingItem} from '~/components';
import {navigate} from '~/navigation/methods';

const Settings = ({navigation}: {navigation: any}) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <CustomContainer>
      <BackButton />

      <AppSettingItem title={Strings.accessLocation} />
      <AppSettingItem title={Strings.accessContacts} />
      <Text
        style={styles.txt}
        onPress={() => {
          navigate('BlockUsers');
        }}>
        {Strings.blockUser}
      </Text>

      <MenuItem
        title={Strings.deleteAccount}
        onPress={() => {
          setShowModal(true);
        }}
        isLogOut={true}
      />

      <DeleteAccountModal showModal={showModal} setShowModal={setShowModal} />
    </CustomContainer>
  );
};

export default Settings;

const styles = StyleSheet.create({
  txt: {
    ...Fonts.smallLight,
    color: Colors.txtLight,
    marginTop: scale(40),
    marginHorizontal: scale(16),
    marginBottom: scale(16),
  },
});
