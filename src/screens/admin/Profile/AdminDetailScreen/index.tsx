import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Colors} from '~/styles/colors';
import {
  AdminDetailItem,
  AvatarWithTitle,
  BackButton,
  CustomContainer,
  HelveticaRegularText,
} from '~/components';
import {useGetOtherUserProfile} from '~/hooks/artist/User';
import {Button, VStack} from 'native-base';
import {SvgXml} from 'react-native-svg';
import {disableUser} from '~/assets/icons';
import {Strings} from '~/assets/strings';
import snackBar from '~/utils/snackBar';
import {messageHelper} from '~/utils/messageHelper';
import {goBack} from '~/navigation/methods';
import {useDeleteAdminPermanently} from '~/hooks/admin/Admin';
import {useUserTypeStore} from '~/stores';
import {appUserType} from '~/@types/global';
import {DeleteModal} from '~/components/atoms/DeleteModal';
import {queryClient} from '~/graphql/AuthProvider';
import {queryKeys} from '~/constants/queryKeys';

const AdminDetailScreen = ({route}: {route: any}) => {
  const entityId = route.params?.entityId;
  const [showModal, setShowModal] = useState<boolean>(false);
  const {userType} = useUserTypeStore(state => state);
  const {
    isLoading: getProfileLoading,
    data: getProfileData,
    isSuccess: getProfileSuccess,
    isError: getProfileFail,
    error: getProfileErrorMsg,
    refetch: refetchProfile,
  } = useGetOtherUserProfile(entityId);

  const {mutate: mutateDelete, isLoading: isDeleting} =
    useDeleteAdminPermanently();

  function deleteOnPress() {
    mutateDelete(entityId, {
      onSuccess: successData => {
        if (successData.user_deleteAccount?.status.value == 'Success') {
          queryClient.invalidateQueries([queryKeys.getAllUsers]);
          queryClient.invalidateQueries([queryKeys.getNearbyUsers]);
          goBack();
        } else {
          snackBar(messageHelper(successData.user_deleteAccount?.status.value));
        }
      },
    });
  }

  return (
    <CustomContainer
      isLoading={getProfileLoading}
      isError={getProfileFail}
      onPress={refetchProfile}>
      <View style={styles.container}>
        <BackButton />
        <View style={styles.innerContainer}>
          <AvatarWithTitle
            uri={getProfileData?.user_getProfile?.result?.photoUrl}
            name={
              getProfileData?.user_getProfile?.result?.fullName
                ? getProfileData?.user_getProfile?.result?.fullName
                : getProfileData?.user_getProfile?.result?.userName
            }
            onPress={() => {}}
            width={32}
            height={32}
          />

          <HelveticaRegularText
            text={
              getProfileData?.user_getProfile?.result?.fullName
                ? getProfileData?.user_getProfile?.result?.fullName
                : getProfileData?.user_getProfile?.result?.userName
            }
            fontSize={16}
            color={Colors.cleanWhite}
            mt={4}
            textAlign={'center'}
          />
        </View>

        <View
          style={{
            flex: 6,
            paddingHorizontal: 6,
            justifyContent: 'flex-start',
            marginTop: 20,
          }}>
          <AdminDetailItem
            title={'Reviewed Posts Reports'}
            screenName={'ReviewedPostReportList'}
            entityId={entityId}
          />

          <AdminDetailItem
            title={'Reviewed Accounts Reports'}
            screenName={'ReviewedAccountReportList'}
            entityId={entityId}
          />

          <AdminDetailItem
            title={'Disabled Users by this admin'}
            screenName={'DisabledUsersList'}
            entityId={entityId}
          />
        </View>

        {userType === appUserType.SuperAdmin && (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: Colors.onBackground,
            }}>
            <Button
              onPress={() => {
                setShowModal(true);
              }}
              width={24}
              mx={2}
              px={0}
              bg={Colors.onBackground}
              borderRadius={6}
              isLoading={isDeleting}>
              <VStack alignItems={'center'}>
                <SvgXml xml={disableUser} />
                <HelveticaRegularText
                  textAlign={'center'}
                  text={Strings.deleteAdmin}
                  fontSize={12}
                  color={Colors.error}
                  mt={2}
                />
              </VStack>
            </Button>
          </View>
        )}
      </View>
      <DeleteModal
        showModal={showModal}
        setShowModal={setShowModal}
        deleteOnPress={() => {
          deleteOnPress();
        }}
        title={Strings.wantToDeleteAdmin}
      />
    </CustomContainer>
  );
};

export default AdminDetailScreen;

const styles = StyleSheet.create({
  innerContainer: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  title: {
    fontSize: 24,
    marginVertical: 16,
  },
});
