import React, {useState} from 'react';
import {scale} from 'react-native-size-matters';
import {ActivityIndicator} from 'react-native';
import {Modal, Box, Text, HStack} from 'native-base';

import {Colors} from '~/styles/colors';
import {Strings} from '~/assets/strings/index';
import {customFonts} from '~/styles/fonts';
import {useCollectionStore} from '~/stores';

export const DeleteModal = ({
  showModal,
  setShowModal,
  deleteOnPress,
  title,
}: {
  showModal: boolean;
  setShowModal: any;
  deleteOnPress: () => void;
  title: string;
}) => {
  const {setShowCollectionModal} = useCollectionStore(state => state);
  const [loading, setLoading] = useState<boolean>(false);
  const deletePressed = async () => {
    //setLoading(true)
    deleteOnPress();
    setShowCollectionModal(false);
    setShowModal(false);
  };
  return (
    <Modal
      isOpen={showModal}
      onClose={() => setShowModal(false)}
      safeAreaTop={true}>
      <Modal.Content width="75%">
        <Modal.Body>
          <Box alignItems={'center'}>
            <Text fontFamily={customFonts.regular} fontSize="md">
              {title}
            </Text>

            <HStack justifyContent={'space-evenly'} mt="6" width={'75%'}>
              <Text
                onPress={() => {
                  setShowModal(false);
                  setShowCollectionModal(false);
                }}
                fontFamily={customFonts.bold}
                fontSize="md">
                {Strings.no}
              </Text>
              {loading ? (
                <ActivityIndicator
                  color={Colors.white}
                  style={{alignSelf: 'flex-start', marginLeft: scale(12)}}
                />
              ) : (
                <Text
                  onPress={deletePressed}
                  fontFamily={customFonts.bold}
                  fontSize="md">
                  {Strings.yes}
                </Text>
              )}
            </HStack>
          </Box>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};
