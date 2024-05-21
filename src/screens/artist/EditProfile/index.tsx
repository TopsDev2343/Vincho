//<Avatar size="2xl" alignSelf='center' />

import * as yup from 'yup';

import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {yupResolver} from '@hookform/resolvers/yup';
import {FormProvider, useForm} from 'react-hook-form';
import {Button, Flex, Text, VStack} from 'native-base';
import {scale} from 'react-native-size-matters';
import ImagePicker from 'react-native-image-crop-picker';
import {useQueryClient} from 'react-query';

import {Colors} from '~/styles/colors';
import {
  CustomContainer,
  CustomInput,
  CustomButton,
  BackButton,
  EditAvatar,
  ClickableInput,
  EditBioModal,
  CustomKeyboardAwareScrollView,
} from '~/components';
import {Strings} from '~/assets/strings/index';
import {customFonts} from '~/styles/fonts';
import {getFullImageUrl, useUploadFile} from '~/hooks/artist/Upload';
import {useUpdateProfile} from '~/hooks/artist/User';
import {messageHelper} from '~/utils/messageHelper';
import {
  englishLanPattern,
  onlyEnglishAlphabet,
  phoneRegExp,
} from '~/constants/regexExp';
import {cameraOptions} from '~/utils/cameraOptions';
import snackBar from '~/utils/snackBar';
import {queryKeys} from '~/constants/queryKeys';
import {goBack} from '~/navigation/methods';

const schema = yup.object().shape({
  name: yup
    .string()
    .required('Required')
    .typeError('Required')
    .matches(onlyEnglishAlphabet, 'Name is not valid!')
    .max(36, 'Must be 36 characters or less'),
  bio: yup
    .string()
    .required('Required')
    .typeError('Required')
    .max(250, 'Must be 250 characters or less'),
  username: yup
    .string()
    .required('Required')
    .typeError('Required')
    .matches(englishLanPattern, 'Only English language is allowed.')
    .max(36, 'Must be 36 characters or less'),
  phoneNumber: yup
    .string()
    .required('Required')
    .typeError('Required')
    .matches(phoneRegExp, 'Phone number is not valid')
    .length(10, 'Phone number should be 10 digit!'),
  email: yup.string().email().required('required'),
  password: yup.string().required('Required'),
});

const EditProfile = ({navigation}: {navigation: any}) => {
  const queryClient = useQueryClient();
  const [editBioModal, setEditBioModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const {...methods} = useForm<Record<string, any>, object>({
    resolver: yupResolver<yup.AnyObjectSchema>(schema),
    mode: 'onChange',
  });
  const {handleSubmit, register, formState, setValue, getValues} = methods;

  useEffect(() => {
    const userInitialInfo = queryClient.getQueryData([
      queryKeys.getUserProfile,
    ]);
    let fileUrl = getFullImageUrl(
      userInitialInfo?.user_getProfile?.result?.photoUrl,
    );
    setUserImg(fileUrl);
    setValue('bio', userInitialInfo?.user_getProfile?.result?.aboutText);
    setValue('name', userInitialInfo?.user_getProfile?.result?.fullName);
    setValue('username', userInitialInfo?.user_getProfile?.result?.userName);
    setValue(
      'phoneNumber',
      userInitialInfo?.user_getProfile?.result?.phoneNumber,
    );
    setValue('email', userInitialInfo?.user_getProfile?.result?.email);
    setValue('password', '12345678');
    setIsLoading(false);
  }, []);

  function setBioTxt(value: string) {
    setValue('bio', value);
  }

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
          setUserUploadedUrl?.(successData?.uploadedUrl);
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
      photoUrl: userUploadedUrl != '' ? userUploadedUrl : userImg,
      fullName: formData.name,
      phoneNumber: formData.phoneNumber,
      aboutText: formData.bio,
      userName: formData.username,
    };
    mutateUpdate(input as any, {
      onSuccess: successData => {
        if (successData.user_updateProfile?.status.value === 'Success') {
          //snackBar(messageHelper(successData.user_updateProfile?.status.value));
          queryClient.invalidateQueries(queryKeys.getUserProfile);
          goBack();
        } else {
          snackBar(messageHelper(successData.user_updateProfile?.status.value));
        }
      },
    });
  }

  return (
    <CustomContainer>
      {!isLoading ? (
        <FormProvider {...methods}>
          <CustomKeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.contentContainerStyle}>
            <BackButton />

            <Flex flex={1} justifyContent="flex-end" pb="6">
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

                <ClickableInput
                  label={'bio'}
                  {...register('bio')}
                  setEditBioModal={setEditBioModal}
                />

                <CustomInput
                  color={Colors.txtLight}
                  {...register('username')}
                  placeholder={Strings.userName}
                  {...{formState}}
                  validation
                />
                <CustomInput
                  color={Colors.txtLight}
                  {...register('phoneNumber')}
                  placeholder={Strings.phoneNumber}
                  {...{formState}}
                  validation
                  keyboardType="phone-pad"
                  leftText="+1"
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
      <EditBioModal
        bioTxt={getValues('bio')}
        editBioModal={editBioModal}
        setEditBioModal={setEditBioModal}
        setBioTxt={setBioTxt}
      />
    </CustomContainer>
  );
};

export default EditProfile;

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
