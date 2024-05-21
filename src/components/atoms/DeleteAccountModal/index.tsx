import React, {useState} from 'react';
import {scale} from 'react-native-size-matters';
import {ActivityIndicator} from 'react-native';
import {Modal, Box, Text, HStack} from 'native-base';

import {Colors} from '~/styles/colors';
import {useSignOutAuth} from '~/hooks/artist/Auth';
import {useAuthStore, useUserTypeStore} from '~/stores';
import snackBar from '~/utils/snackBar';
import {messageHelper} from '~/utils/messageHelper';
import {storageHelper} from '~/utils/storageHelper';
import {StorageKeys} from '~/constants/storageKeys';
import {customFonts} from '~/styles/fonts';
import {resetRoot} from '~/navigation/methods';
import graphQLClient from '~/graphql/fetcher';
import {queryClient} from '~/graphql/AuthProvider';
import {appUserType} from '~/@types/global';
import {removeData} from '~/services/storage';
import {FormProvider, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import CustomInput from '../CustomInput';
import {useDeleteAdminPermanently} from '~/hooks/admin/Admin';
import {queryKeys} from '~/constants/queryKeys';

const schema = yup.object().shape({
  delete: yup
    .string()
    .oneOf(['delete', 'Delete'], 'Please type delete')
    .required('required'),
});

export const DeleteAccountModal = ({
  showModal,
  setShowModal,
}: {
  showModal: boolean;
  setShowModal: any;
}) => {
  const {mutate: mutateDelete, isLoading: isDeleting} =
    useDeleteAdminPermanently();

  const {...methods} = useForm<Record<string, any>, object>({
    resolver: yupResolver<yup.AnyObjectSchema>(schema),
    mode: 'onChange',
  });
  const {handleSubmit, register, formState} = methods;

  const {userId, setUserId} = useAuthStore(state => state);
  const {setUserType} = useUserTypeStore(state => state);
  const {signOut} = useSignOutAuth();
  const [loading, setLoading] = useState<boolean>(false);

  const storage = new storageHelper();

  const logOutOnPress = async () => {
    mutateDelete(userId, {
      onSuccess: async successData => {
        if (successData.user_deleteAccount?.status.value == 'Success') {
          queryClient.invalidateQueries([queryKeys.getAllUsers]);
          queryClient.invalidateQueries([queryKeys.getNearbyUsers]);

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
        } else {
          snackBar(messageHelper(successData.user_deleteAccount?.status.value));
        }
      },
    });
  };
  return (
    <Modal
      isOpen={showModal}
      onClose={() => setShowModal(false)}
      safeAreaTop={true}>
      <Modal.Content width="75%" backgroundColor={Colors.onPrimary}>
        <Modal.Body>
          <FormProvider {...methods}>
            <Box alignItems={'center'}>
              <Text
                fontFamily={customFonts.regular}
                fontSize="md"
                color={Colors.white}>
                Are you sure you want to delete your account permanently?{'\n'}
                By deleting your account, history and all your including data
                will be deleted. Please type the word delete here
              </Text>
              <CustomInput
                {...register('delete')}
                placeholder="Type delete"
                textBackgroundColor={Colors.onPrimary}
                {...{formState}}
                validation
              />

              <HStack justifyContent={'space-around'} width="100%" mt="6">
                <Text
                  onPress={() => setShowModal(false)}
                  fontFamily={customFonts.bold}
                  color={Colors.white}
                  fontSize="md">
                  Cancel
                </Text>
                {loading || isDeleting ? (
                  <ActivityIndicator
                    color={Colors.white}
                    style={{alignSelf: 'flex-start', marginLeft: scale(12)}}
                  />
                ) : (
                  <Text
                    onPress={handleSubmit(logOutOnPress)}
                    color={Colors.primary}
                    fontFamily={customFonts.bold}
                    fontSize="md">
                    Delete
                  </Text>
                )}
              </HStack>
            </Box>
          </FormProvider>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};
