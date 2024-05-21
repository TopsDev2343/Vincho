import * as yup from 'yup';

import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {yupResolver} from '@hookform/resolvers/yup';
import {FormProvider, useForm} from 'react-hook-form';
import {Button, Flex, Text, VStack} from 'native-base';
import {scale} from 'react-native-size-matters';
import ImagePicker from 'react-native-image-crop-picker';
import {isError, useQueryClient} from 'react-query';

import {Colors} from '~/styles/colors';
import {
  CustomContainer,
  CustomInput,
  CustomButton,
  BackButton,
  EditAvatar,
  CustomKeyboardAwareScrollView,
} from '~/components';
import {Strings} from '~/assets/strings/index';
import {customFonts} from '~/styles/fonts';
import {messageHelper} from '~/utils/messageHelper';
import {onlyEnglishAlphabet} from '~/constants/regexExp';
import {cameraOptions} from '~/utils/cameraOptions';
import snackBar from '~/utils/snackBar';
import {queryKeys} from '~/constants/queryKeys';
import {useGetUserProfile, useUpdateProfile} from '~/hooks/artist/User';
import {getFullImageUrl, useUploadFile} from '~/hooks/artist/Upload';
import {goBack} from '~/navigation/methods';

const schema = yup.object().shape({
  name: yup
    .string()
    .required('Required')
    .matches(onlyEnglishAlphabet, 'Name is not valid!')
    .max(36, 'Must be 36 characters or less'),
  email: yup.string().email().required('required'),
  password: yup.string().required('Required'),
});

const EditAdminProfileScreen = ({navigation}: {navigation: any}) => {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const {...methods} = useForm<Record<string, any>, object>({
    resolver: yupResolver<yup.AnyObjectSchema>(schema),
    mode: 'onChange',
  });
  const {handleSubmit, register, formState, setValue, getValues} = methods;

  const {
    isLoading: getProfileLoading,
    data: getProfileData,
    isSuccess: getProfileSuccess,
    isError,
    error: getProfileErrorMsg,
    refetch: refetchProfile,
  } = useGetUserProfile();
  useEffect(() => {
    let filePath = getFullImageUrl(
      getProfileData?.user_getProfile?.result?.photoUrl,
    );
    setUserImg(filePath);
    setValue('name', getProfileData?.user_getProfile?.result?.fullName);
    setValue('email', getProfileData?.user_getProfile?.result?.email);
    setValue('password', '12345678');
    setIsLoading(false);
  }, [getProfileData]);

  const {mutate: mutateUpdate, isLoading: updateLoading} = useUpdateProfile();

  const [userImg, setUserImg] = useState<string>('');

  const [userUploadedUrl, setUserUploadedUrl] = useState<string>('');

  const {
    mutate: uploadFileMutate,
    isLoading: isUploading,
    data: data,
  } = useUploadFile();

  async function onPressGalleryPhoto() {
    try {
      const imagePicker = await ImagePicker.openPicker(cameraOptions);
      setUserImg(imagePicker.path);
      uploadFileMutate(imagePicker, {
        onSuccess: (successData: any) => {
          let filePath = getFullImageUrl(successData?.uploadedUrl);
          setUserUploadedUrl?.(filePath);
        },
      });
    } catch (err) {
      snackBar({
        message: err?.message || 'Some Error occurred!',
        color: Colors.error,
      });
    }
  }

  function onSubmit(formData: any) {
    const input = {
      id: getProfileData?.user_getProfile?.result?.id,
      photoUrl:
        userUploadedUrl != ''
          ? userUploadedUrl
          : getProfileData?.user_getProfile?.result?.photoUrl,
      fullName: formData.name,
      phoneNumber: getProfileData?.user_getProfile?.result?.phoneNumber,
      aboutText: getProfileData?.user_getProfile?.result?.aboutText,
      userName: getProfileData?.user_getProfile?.result?.userName,
    };
    mutateUpdate(input as any, {
      onSuccess: successData => {
        if (successData.user_updateProfile?.status.value === 'Success') {
          queryClient.invalidateQueries(queryKeys.getUserProfile);
          goBack();
        } else {
          snackBar(messageHelper(successData.user_updateProfile?.status.value));
        }
      },
    });
  }

  return (
    <CustomContainer
      isError={isError}
      errorMsg={'Something went wrong'}
      onPress={refetchProfile}>
      {!isLoading ? (
        <FormProvider {...methods}>
          <CustomKeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.contentContainerStyle}>
            <BackButton />

            <Flex flex={1} justifyContent="flex-start" pb="6">
              <Flex flex={9}>
                <EditAvatar
                  hasWave={false}
                  onPress={onPressGalleryPhoto}
                  img={userImg}
                  isUploading={isUploading}
                />
                <VStack pt="2" pb="6" px="4" space="4">
                  <CustomInput
                    color={Colors.txtLight}
                    {...register('name')}
                    placeholder={Strings.name}
                    {...{formState}}
                    validation
                  />
                  <CustomInput
                    disabled
                    color={Colors.txtLight}
                    {...register('email')}
                    placeholder={Strings.email}
                    keyboardType="email-address"
                    {...{formState}}
                    validation
                  />
                  <CustomInput
                    disabled
                    color={Colors.txtLight}
                    {...register('password')}
                    placeholder={Strings.password}
                    {...{formState}}
                    validation
                    inputType="password"
                  />
                  <Button
                    variant="link"
                    marginTop={-scale(8)}
                    onPress={() => navigation.navigate('SendLinkScreen')}
                    alignSelf="flex-end">
                    <Text
                      fontSize="xs"
                      color={Colors.primary}
                      fontFamily={customFonts.regular}>
                      {Strings.changePass}
                    </Text>
                  </Button>
                </VStack>
              </Flex>

              <CustomButton
                title={Strings.saveChange}
                titleColor={Colors.txtDark}
                backColor={Colors.primary}
                btnMTop={scale(25)}
                btnMBottom={scale(10)}
                onPress={handleSubmit(onSubmit)}
                // isDisable={!formState.isValid}
                isLoading={updateLoading}
              />
            </Flex>
          </CustomKeyboardAwareScrollView>
        </FormProvider>
      ) : null}
    </CustomContainer>
  );
};

export default EditAdminProfileScreen;

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
