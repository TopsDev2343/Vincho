import * as yup from 'yup';

import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {yupResolver} from '@hookform/resolvers/yup';
import {FormProvider, useForm} from 'react-hook-form';
import {Button, Flex, Text, VStack} from 'native-base';
import {scale} from 'react-native-size-matters';
import ImagePicker from 'react-native-image-crop-picker';
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
import {messageHelper} from '~/utils/messageHelper';
import {onlyEnglishAlphabet} from '~/constants/regexExp';
import {cameraOptions} from '~/utils/cameraOptions';
import snackBar from '~/utils/snackBar';
import {useUploadFile} from '~/hooks/artist/Upload';
import {useCreateAdmin, useSignupAdmin} from '~/hooks/admin/Admin';
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

const AddAdminScreen = ({navigation}: {navigation: any}) => {
  const {...methods} = useForm<Record<string, any>, object>({
    resolver: yupResolver<yup.AnyObjectSchema>(schema),
    mode: 'onChange',
  });
  const {handleSubmit, register, formState, setValue, getValues} = methods;

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

  const {mutate: createAdminMutate, isLoading} = useCreateAdmin();

  const onSubmit = async (formData: any) => {
    const input = {
      email: formData?.email,
      password: formData.password,
      userInput: {
        photoUrl: userUploadedUrl,
        fullName: formData.name,
        userName: formData.name,
      },
    };
    createAdminMutate(input, {
      onSuccess: successData => {
        if (successData.user_createAdmin?.status?.value === 'Success') {
          goBack();
        }
      },
      onError: () => {},
    });
  };

  return (
    <CustomContainer>
      {!isLoading || !isUploading ? (
        <FormProvider {...methods}>
          <CustomKeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.contentContainerStyle}>
            <BackButton />

            <Flex flex={1} justifyContent="flex-start" pb="6">
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
                  placeholder={Strings.adminName}
                  {...{formState}}
                  validation
                />
                <CustomInput
                  color={Colors.txtLight}
                  {...register('email')}
                  placeholder={Strings.email}
                  keyboardType="email-address"
                  {...{formState}}
                  validation
                />
                <CustomInput
                  color={Colors.txtLight}
                  {...register('password')}
                  placeholder={Strings.password}
                  {...{formState}}
                  validation
                  inputType="password"
                />
              </VStack>

              <CustomButton
                title={Strings.saveChange}
                titleColor={Colors.txtDark}
                backColor={Colors.primary}
                btnMTop={scale(25)}
                btnMBottom={scale(10)}
                onPress={handleSubmit(onSubmit)}
                isDisable={!formState.isValid}
                isLoading={isLoading || isUploading}
              />
            </Flex>
          </CustomKeyboardAwareScrollView>
        </FormProvider>
      ) : null}
    </CustomContainer>
  );
};

export default AddAdminScreen;

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
