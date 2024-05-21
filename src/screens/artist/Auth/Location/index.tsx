import React, {useState} from 'react';
import {ImageBackground, StyleSheet, View, Text} from 'react-native';
import {scale} from 'react-native-size-matters';
import Geolocation from 'react-native-geolocation-service';

import {Colors} from '~/styles/colors';
import {CustomContainer, CustomButton, BackButton} from '~/components';

import {Strings} from '~/assets/strings/index';
import {locationBack} from '~/assets/images';
import LinearGradient from 'react-native-linear-gradient';
import {Fonts} from '~/styles/fonts';
import {requestLocationPermission} from '~/utils/userPermission';
import snackBar from '~/utils/snackBar';
import {useGetUserProfile, useUpdateProfile} from '~/hooks/artist/User';
import {navigate} from '~/navigation/methods';
import {storageHelper} from '~/utils/storageHelper';
import {useAuthRefreshStore} from '~/stores';
import {messageHelper} from '~/utils/messageHelper';
import {StorageKeys} from '~/constants/storageKeys';

const Location = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const storage = new storageHelper();
  const {mutate: mutateUpdate, isLoading: updateLoading} = useUpdateProfile();
  const {refreshAuth, setRefreshAuth} = useAuthRefreshStore();

  const {data: userProfile, isLoading: profileLoading} = useGetUserProfile();

  async function getCurrentLocation() {
    setLoading(true);
    if (await requestLocationPermission()) {
      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;
          setLoading(false);
          onSubmit([longitude, latitude]);
        },
        (error: any) => {
          setLoading(false);
          snackBar({message: JSON.stringify(error), color: Colors.error});
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    } else {
      setLoading(false);
      skip();
    }
  }

  function onSubmit(location: [number, number]) {
    if (location.length > 0) {
      const profile = userProfile?.user_getProfile?.result;
      let input = {
        aboutText: profile?.aboutText,
        fullName: profile?.fullName,
        phoneNumber: profile?.phoneNumber,
        photoUrl: profile?.photoUrl,
        userName: profile?.userName,
        location: location,
      };

      mutateUpdate(input as any, {
        onSuccess: successData => {
          if (successData.user_updateProfile?.status.value === 'Success') {
            storage.multiSave(() => {
              setRefreshAuth(!refreshAuth);
              navigate('ContactScreen', {});
            }, [
              [StorageKeys.ACCESS_LOCATION_SHOW, 'shown'],
              [StorageKeys.INITIAL_SETUP_SHOW, 'shown'],
            ]);
          } else {
            snackBar(
              messageHelper(successData.user_updateProfile?.status.value),
            );
          }
        },
      });
    }
  }

  function skip() {
    storage.multiSave(() => {
      setRefreshAuth(!refreshAuth);
      navigate('ContactScreen', {});
    }, [
      [StorageKeys.ACCESS_LOCATION_SHOW, 'shown'],
      [StorageKeys.INITIAL_SETUP_SHOW, 'shown'],
    ]);
  }
  return (
    <CustomContainer>
      <ImageBackground
        source={locationBack}
        style={styles.container}
        resizeMode="cover">
        <LinearGradient
          style={styles.container}
          colors={Colors.darkToLightBack}>
          <BackButton />

          <View style={styles.headerContainer}>
            <Text style={styles.title}>{Strings.locationTitle}</Text>
            <Text style={styles.body}>{Strings.locationBody}</Text>
          </View>

          <View style={styles.btnContainer}>
            <CustomButton
              title={Strings.allowAccess}
              titleColor={Colors.txtDark}
              backColor={Colors.primary}
              onPress={getCurrentLocation}
              isLoading={updateLoading || loading || profileLoading}
            />
            <CustomButton
              title={Strings.notAllow}
              titleColor={Colors.primary}
              backColor={Colors.transparent}
              btnMTop={scale(5)}
              btnMBottom={scale(16)}
              onPress={skip}
            />
          </View>
        </LinearGradient>
      </ImageBackground>
    </CustomContainer>
  );
};

export default Location;

const styles = StyleSheet.create({
  container: {flex: 1},
  contentContainerStyle: {
    flexGrow: 1,
  },
  headerContainer: {
    marginTop: scale(56),
    marginHorizontal: scale(24),
  },
  title: {
    ...Fonts.largeRegChanel,
    color: Colors.white,
  },
  body: {
    ...Fonts.smallLight,
    color: Colors.white,
  },
  btnContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 1,
  },
  image: {
    width: '90%',
    aspectRatio: 1.2,
    alignSelf: 'center',
  },
});
