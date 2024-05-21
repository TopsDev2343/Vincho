//<Avatar size="2xl" alignSelf='center' />

import * as yup from 'yup';
import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {yupResolver} from '@hookform/resolvers/yup';
import {FormProvider, useForm} from 'react-hook-form';
import {Flex, Text, VStack} from 'native-base';
import ImagePicker from 'react-native-image-crop-picker';

import {Colors} from '~/styles/colors';
import {CustomContainer} from '~/components';
import {CustomKeyboardAwareScrollView} from '~/components';
import {CustomInput} from '~/components';
import {CustomButton} from '~/components';
import {Strings} from '~/assets/strings';
import {customFonts} from '~/styles/fonts';
import {EditAvatar} from '~/components';
import {getFullImageUrl, useUploadFile} from '~/hooks/artist/Upload';
import {navigate} from '~/navigation/methods';
import {BackButton} from '~/components';
import {phoneRegExp} from '~/constants/regexExp';
import {cameraOptions} from '~/utils/cameraOptions';
import {useUpdateProfile} from '~/hooks/artist/User';
import snackBar from '~/utils/snackBar';
import {messageHelper} from '~/utils/messageHelper';

const schema = yup.object().shape({
  username: yup
    .string()
    // .matches(englishLanPattern, 'Only English language is allowed.')
    .max(36, 'Must be 36 characters or less')
    .nullable(),
  bio: yup.string().max(250, 'Must be 250 characters or less'),
  phoneNumber: yup
    .string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .length(10, 'Phone number should be 10 digit!')
    .nullable(),
});

const InitSetup = ({route}: {navigation: any; route: any}) => {
  const {...methods} = useForm<Record<string, any>, object>({
    resolver: yupResolver<yup.AnyObjectSchema>(schema),
    mode: 'onChange',
  });
  const [loading] = useState<boolean>(false);

  const userProfile = route.params?.userProfile;

  const {handleSubmit, register, formState} = methods;

  const [userImg, setUserImg] = useState<string>('');
  const [userUploadedUrl, setUserUploadedUrl] = useState<string>('');

  const {mutate: uploadFileMutate, isLoading: isUploading} = useUploadFile();
  const {mutate: mutateUpdate, isLoading: updateLoading} = useUpdateProfile();
  async function onPressGalleryPhoto() {
    try {
      const imagePicker = await ImagePicker.openPicker(cameraOptions);
      setUserImg(imagePicker.path);
      uploadFileMutate(imagePicker, {
        onSuccess: (successData: any) => {
          setUserUploadedUrl?.(successData?.uploadedUrl);
        },
      });
    } catch (err) {}
  }
  function onSubmit(formData: any) {
    const val = Math.floor(1000 + Math.random() * 9000);
    const timeStamp = Date.now();
    const userName = formData?.username
      ? formData?.username
      : userProfile?.email
      ? `${userProfile?.email.split('@')[0]}${val}`
      : `user${timeStamp}`;
    const input = {
      photoUrl: userUploadedUrl != '' ? getFullImageUrl(userUploadedUrl) : '',
      fullName: '',
      // referralCode: formData.referralCode ?? '',
      phoneNumber: formData.phoneNumber ?? '',
      aboutText: formData.bio ? formData.bio : '',
      id: null,
      userName,
    };

    mutateUpdate(input as any, {
      onSuccess: successData => {
        if (successData.user_updateProfile?.status.value === 'Success') {
          input.id = successData.user_updateProfile?.result?.id;
          navigate('ChooseTopicScreen');
        } else {
          successData.user_updateProfile?.status.code === 7
            ? snackBar({
                message: 'User name already exists!',
                color: Colors.error,
              })
            : snackBar(
                messageHelper(successData.user_updateProfile?.status.value),
              );
        }
      },
    });
  }

  return (
    <CustomContainer isLoading={loading}>
      <FormProvider {...methods}>
        <CustomKeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}>
          <BackButton />

          <Text
            fontSize="xl"
            color={Colors.txtLight}
            my="3"
            alignSelf="center"
            fontFamily={customFonts.regular}>
            {Strings.initSetupBody}
          </Text>

          <Flex flex={1} pb="6">
            <EditAvatar
              hasWave
              onPress={onPressGalleryPhoto}
              img={userImg}
              isUploading={isUploading}
            />
            <VStack pt="4" pb="6" px="4" space="1">
              <CustomInput
                {...register('phoneNumber')}
                placeholder={Strings.phoneNumber}
                {...{formState}}
                validation
                keyboardType="phone-pad"
                leftText="+1"
              />
              <CustomInput
                {...register('username')}
                placeholder={Strings.userName}
                {...{formState}}
                validation
              />
              {/* <CustomInput
                {...register('referralCode')}
                placeholder={Strings.referralCode}
                {...{formState}}
                validation
              /> */}
              <CustomInput
                {...register('bio')}
                placeholder={Strings.bio}
                {...{formState}}
                validation
              />
            </VStack>

            <CustomButton
              title={Strings.next}
              titleColor={Colors.txtDark}
              backColor={Colors.primary}
              containerStyle={{flex: 1, justifyContent: 'flex-end'}}
              onPress={handleSubmit(onSubmit)}
              isLoading={updateLoading}
              isDisable={!formState.isValid}
            />
          </Flex>
        </CustomKeyboardAwareScrollView>
      </FormProvider>
    </CustomContainer>
  );
};

export default InitSetup;

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
