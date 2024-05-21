import React, {useState} from 'react';
import {Modal, StyleSheet, TextInput, View} from 'react-native';
import {scale} from 'react-native-size-matters';
import {SvgXml} from 'react-native-svg';

import {BackButton} from '~/components';
import {CustomContainer} from '~/components';
import {Colors} from '~/styles/colors';
import {Fonts} from '~/styles/fonts';
import {tick} from '~/assets/icons';
import {TouchableOpacity} from 'react-native';

const EditBioModal = ({
  bioTxt,
  editBioModal,
  setEditBioModal,
  setBioTxt,
}: {
  bioTxt: string;
  editBioModal: boolean;
  setEditBioModal: any;
  setBioTxt: any;
}) => {
  const [txt, setTxt] = useState<string>(bioTxt);

  function onBack() {
    setEditBioModal(false);
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={editBioModal}
      onRequestClose={() => setEditBioModal(false)}>
      <CustomContainer>
        <View style={styles.backContainer}>
          <BackButton isModal={true} modalOnClose={onBack} />
          <TouchableOpacity
            onPress={() => [setBioTxt(txt), setEditBioModal(false)]}
            style={{
              height: 30,
              justifyContent: 'center',
              zIndex: 99,
            }}>
            <SvgXml xml={tick} style={styles.tickIcon} />
          </TouchableOpacity>
        </View>
        <TextInput
          defaultValue={txt}
          style={styles.input}
          onChangeText={value => setTxt(value)}
          // value={bioTxt}
          maxLength={250}
          placeholder="Bio"
          keyboardType="default"
          multiline={true}
          placeholderTextColor={Colors.txtMedium}
        />
      </CustomContainer>
    </Modal>
  );
};

export default EditBioModal;

const styles = StyleSheet.create({
  input: {
    marginTop: scale(20),
    paddingBottom: scale(16),
    marginHorizontal: scale(12),
    borderBottomWidth: 1,
    borderColor: Colors.txtMedium,
    padding: 10,
    ...Fonts.smallReg,
    color: Colors.txtLight,
  },
  backContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tickIcon: {paddingHorizontal: scale(24)},
});
