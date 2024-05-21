import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Colors} from '~/styles/colors';
import {
  AvatarWithTitle,
  CustomContainer,
  HelveticaRegularText,
  MenuItem,
} from '~/components';
import {Strings} from '~/assets/strings';
import {logOut, allAdmins, admin, reviewed} from '~/assets/icons/index';
import {LogoutModal} from '~/components/atoms/LogoutModal';
import {useGetUserProfile} from '~/hooks/artist/User';
import {useAuthStore, useUserTypeStore} from '~/stores';
import {appUserType} from '~/@types/global';

const AdminProfileScreen = ({navigation}: {navigation: any}) => {
  const {
    isLoading: getProfileLoading,
    data: getProfileData,
    isSuccess: getProfileSuccess,
    isError: getProfileFail,
    error: getProfileErrorMsg,
    refetch: refetchProfile,
  } = useGetUserProfile();

  const [showModal, setShowModal] = useState<boolean>(false);
  const {userType} = useUserTypeStore(state => state);
  const {userId} = useAuthStore(state => state);
  function logoutOnPress(status: boolean) {
    setShowModal(status);
  }
  return (
    <CustomContainer
      isLoading={getProfileLoading}
      isError={getProfileFail}
      onPress={refetchProfile}>
      <View style={styles.container}>
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
            flex: 7,
            paddingHorizontal: 16,
            justifyContent: 'flex-start',
          }}>
          <MenuItem
            title={Strings.profile}
            icon={admin}
            screenName={'EditAdminProfile'}
            isOnTop={true}
          />

          {userType === appUserType.SuperAdmin ? (
            <MenuItem
              title={Strings.admins}
              icon={allAdmins}
              screenName={'AdminList'}
            />
          ) : (
            <MenuItem
              title={Strings.reviewed}
              icon={reviewed}
              screenName={'AdminDetail'}
              entityId={userId}
            />
          )}

          <MenuItem
            title={Strings.logOut}
            icon={logOut}
            onPress={logoutOnPress}
            isLogOut={true}
          />
        </View>

        <LogoutModal showModal={showModal} setShowModal={logoutOnPress} />
      </View>
    </CustomContainer>
  );
};

export default AdminProfileScreen;

const styles = StyleSheet.create({
  innerContainer: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.black,
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
