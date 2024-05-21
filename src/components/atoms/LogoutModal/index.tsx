import React, {useState} from 'react';
import {scale} from 'react-native-size-matters';
import {ActivityIndicator} from 'react-native';
import {Modal, Box, Text, HStack} from 'native-base';

import {Colors} from '~/styles/colors';
import {Strings} from '~/assets/strings/index';
import {useSignOutAuth} from '~/hooks/artist/Auth';
import {useAuthStore, useUserTypeStore} from '~/stores';
import snackBar from '~/utils/snackBar';
import {messageHelper} from '~/utils/messageHelper';
import {storageHelper} from '~/utils/storageHelper';
import {StorageKeys} from '~/constants/storageKeys';
import {customFonts} from '~/styles/fonts';
import {navigate, resetRoot} from '~/navigation/methods';
import graphQLClient from '~/graphql/fetcher';
import {queryClient} from '~/graphql/AuthProvider';
import {appUserType} from '~/@types/global';
import {removeData} from '~/services/storage';

export const LogoutModal = ({
  showModal,
  setShowModal,
}: {
  showModal: boolean;
  setShowModal: any;
}) => {
  const {setUserId} = useAuthStore(state => state);
  const {setUserType} = useUserTypeStore(state => state);
  const {signOut} = useSignOutAuth();
  const [loading, setLoading] = useState<boolean>(false);

  const storage = new storageHelper();

  const logOutOnPress = async () => {
    setLoading(true);
    await signOut()
      .then(res => {
        storage.multiRemove([StorageKeys.USER_IS_LOGGED_IN_ID]);
        storage.multiRemove([StorageKeys.USER_TYPE]);
        storage.multiRemove([StorageKeys.FCM_TOKEN]);
        setUserId(undefined);
        setUserType(appUserType.Artist);
        graphQLClient.setHeader('authorization', '');
        queryClient.clear();
        setLoading(false);
        setShowModal(false);
        resetRoot('ArtistStack');
      })
      .catch(err => snackBar(messageHelper('SomeError')));
    await removeData('token');
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
              {Strings.wantToLogout}
            </Text>

            <HStack justifyContent={'space-around'} width="50%" mt="6">
              <Text
                onPress={() => setShowModal(false)}
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
                  onPress={logOutOnPress}
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
