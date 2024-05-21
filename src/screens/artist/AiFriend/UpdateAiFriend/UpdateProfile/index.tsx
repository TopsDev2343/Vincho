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
import {BackButton} from '~/components';
import {imageAvatarOptions} from '~/utils/cameraOptions';
import {navigate} from '~/navigation/methods';
import {useUpdateBuddy} from '~/hooks/artist/AiBuddy';
import {BuddyInteractionFrequencies} from '~/generated/graphql';
import snackBar from '~/utils/snackBar';
import {messageHelper} from '~/utils/messageHelper';

const schema = yup.object().shape({
  name: yup.string().max(36, 'Must be 36 characters or less').required(),
});

const CreateAiBuddy = ({route}: {route: any}) => {
  const {...aiFriend} = route?.params;

  const {...methods} = useForm<Record<string, any>, object>({
    resolver: yupResolver<yup.AnyObjectSchema>(schema),
    mode: 'onChange',
    defaultValues: {name: aiFriend?.user?.fullName},
  });
  const {handleSubmit, register, formState} = methods;

  const [userImg, setUserImg] = useState<string>('');
  const [userUploadedUrl, setUserUploadedUrl] = useState<string>(
    aiFriend?.user?.photoUrl,
  );

  const {mutate: uploadFileMutate, isLoading: isUploading} = useUploadFile();
  const {isLoading: updateLoading, mutate: updateMutate} = useUpdateBuddy();

  async function onPressGalleryPhoto() {
    try {
      const imagePicker = await ImagePicker.openPicker(imageAvatarOptions);
      setUserImg(imagePicker.path);

      uploadFileMutate(imagePicker, {
        onSuccess: (successData: any) => {
          console.log(successData?.uploadedUrl);
          setUserUploadedUrl?.(successData?.uploadedUrl);
        },
      });
    } catch (err) {}
  }

  function onSubmit(formData: any) {
    const name = formData?.name;
    const input = {
      photoUrl: userUploadedUrl != '' ? getFullImageUrl(userUploadedUrl) : '',
      fullName: name,
      id: aiFriend?.id,
      interactionFrquency: BuddyInteractionFrequencies.OnceADay,
      tags: aiFriend?.tags,
      personality: aiFriend?.personality,
    };

    console.log(input);

    updateMutate(input as any, {
      onSuccess: successData => {
        if (successData?.buddy_updateBuddy?.status?.value === 'Success') {
          navigate('Profile');
        } else {
          successData?.buddy_updateBuddy?.status?.code === 9
            ? snackBar({
                message: 'You dont have enough lotus!',
                color: Colors.error,
              })
            : snackBar(
                messageHelper(successData?.buddy_updateBuddy?.status?.value),
              );
        }
      },
    });
  }

  return (
    <CustomContainer>
      <FormProvider {...methods}>
        <CustomKeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}>
          <BackButton />

          <Text
            fontSize="xl"
            color={Colors.txtOverlay}
            my="3"
            alignSelf="center"
            fontFamily={customFonts.regular}>
            {Strings.friendLookLike}
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
                {...register('name')}
                label={Strings.name}
                placeholder={Strings.placeholderNameFriend}
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
              isDisable={!formState.isValid || !userUploadedUrl || isUploading}
            />
          </Flex>
        </CustomKeyboardAwareScrollView>
      </FormProvider>
    </CustomContainer>
  );
};

export default CreateAiBuddy;

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
