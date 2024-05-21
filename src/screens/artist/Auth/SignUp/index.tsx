import * as yup from 'yup';

import React, {useState} from 'react';
import {ImageBackground, StyleSheet} from 'react-native';
import {yupResolver} from '@hookform/resolvers/yup';
import {FormProvider, useForm} from 'react-hook-form';
import {Button, Flex, HStack, Text, VStack} from 'native-base';
import {scale} from 'react-native-size-matters';

import {Colors} from '~/styles/colors';
import {CustomContainer} from '~/components';
import {CustomKeyboardAwareScrollView} from '~/components';
import {CustomInput} from '~/components';
import {CustomButton} from '~/components';
import {Strings} from '~/assets/strings';
import {SectionRowSocial} from '~/components';
import {customFonts} from '~/styles/fonts';
import {loginBack} from '~/assets/images';
import {
  useSignUp,
  useSignUpAuth,
  useGoogleAuth,
  useAppleAuth,
  useFacebookAuth,
  useCheckReferralCode,
} from '~/hooks/artist/Auth';
import {BackButton} from '~/components';
import {englishLanPattern} from '~/constants/regexExp';
import {width} from '~/utils/dimension';
import {navigate} from '~/navigation/methods';
import snackBar from '~/utils/snackBar';
import {messageHelper} from '~/utils/messageHelper';

const schema = yup.object().shape({
  email: yup
    .string()
    .matches(englishLanPattern, 'email must be a valid email!')
    .email()
    .required('required'),
  password: yup
    .string()
    .max(36, 'Must be 36 characters or less')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/,
      'Must Contain 6 Characters,One Uppercase, One Lowercase and One Number',
    )
    .required('Required'),
});

const SignUp = ({navigation}: {navigation: any}) => {
  const {...methods} = useForm<Record<string, any>, object>({
    resolver: yupResolver<yup.AnyObjectSchema>(schema),
    mode: 'onChange',
  });

  const {handleSubmit, register, formState} = methods;

  const {signUpWithEmailAndPass} = useSignUpAuth();
  const {mutate: signUpMutate} = useSignUp();
  const {signInWithGoogle} = useGoogleAuth();
  const {signInWithFacebook} = useFacebookAuth();
  const {signInWithApple} = useAppleAuth();

  const [loading, setLoading] = useState<boolean>(false);
  const [hasReferralCode, setHasReferralCode] = useState<Boolean>(false);

  const referralCode = methods.watch('referralCode', '');
  const {refetch: refetchCheckReferralCode} =
    useCheckReferralCode(referralCode);

  const signInOnPress = () => {
    navigation.navigate('SignInScreen');
  };

  const signUpOnPress = async formData => {
    setLoading(true);

    try {
      if (formData?.referralCode) {
        const referralResponse = await refetchCheckReferralCode(
          formData?.referralCode,
        );
        if (
          referralResponse?.data?.user_isValidReferralCode?.status?.value ==
          'Success'
        ) {
          const signUpRes = await signUpWithEmailAndPass(
            formData.email,
            formData.password,
          );

          if (signUpRes?.data) {
            completeSignUp(formData?.referralCode);
          } else {
            setLoading(false);
          }
        } else {
          setLoading(false);
          snackBar(snackBar(messageHelper('InvalidReferral')));
        }
      } else {
        const signUpRes = await signUpWithEmailAndPass(
          formData.email,
          formData.password,
        );
        if (signUpRes?.data) {
          completeSignUp();
        } else {
          setLoading(false);
        }
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const completeSignUp = async (referralCode?: string) => {
    const input = {};
    if (referralCode) {
      input.referralCode = referralCode;
    }
    signUpMutate(input as any, {
      onSuccess: () => {
        setLoading(false);
      },
      onError: () => {
        setLoading(false);
      },
    });
  };

  const googleOnPress = async () => {
    setLoading(true);
    const res = await signInWithGoogle();
    if (res?.data) {
      completeSignUp();
    } else {
      setLoading(false);
    }
  };

  const facebookOnPress = async () => {
    setLoading(true);
    const res = await signInWithFacebook();
    if (res?.data) {
      completeSignUp();
    } else {
      setLoading(false);
    }
  };

  const appleOnPress = async () => {
    setLoading(true);
    const res = await signInWithApple();
    if (res?.data) {
      completeSignUp();
    } else {
      setLoading(false);
    }
  };

  return (
    <CustomContainer>
      <ImageBackground
        source={loginBack}
        style={{height: scale(200), flex: 1}}
        resizeMode="cover">
        <FormProvider {...methods}>
          <CustomKeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.contentContainerStyle}>
            <BackButton />

            <VStack my="30" ml="6">
              {/* <Text
                fontSize={24}
                color={Colors.txtLight}
                ml="3"
                fontFamily={customFonts.chanelRegular}>
                {Strings.signUpTitle}
              </Text> */}
              <HStack>
                <Text
                  fontSize={18}
                  color={Colors.txtMedium}
                  ml="3"
                  mt="2"
                  fontFamily={customFonts.regular}>
                  {Strings.signUpBody}
                  <Text color={Colors.primary}>{Strings.art}</Text>
                </Text>
              </HStack>
            </VStack>

            <Flex flex={1} justifyContent="flex-end" pb="6">
              <VStack
                pt="2"
                pb="6"
                px="4"
                space="1"
                mx="2"
                borderRadius="xl"
                backgroundColor={Colors.black}>
                <CustomInput
                  {...register('email')}
                  placeholder="Email"
                  keyboardType="email-address"
                  textBackgroundColor={Colors.black}
                  {...{formState}}
                  validation
                />
                <CustomInput
                  {...register('password')}
                  placeholder="Password"
                  {...{formState}}
                  textBackgroundColor={Colors.black}
                  validation
                  inputType="password"
                />

                <HStack
                  alignItems="center"
                  justifyContent="left"
                  ml={6}
                  mb={-5}>
                  <Button px={1} variant="link">
                    <Text
                      onPress={() => {
                        setHasReferralCode(true);
                      }}
                      underline
                      color={Colors.txtMedium}
                      fontSize="sm"
                      fontFamily={customFonts.regular}>
                      I have a Referral code
                    </Text>
                  </Button>
                </HStack>

                {hasReferralCode && (
                  <CustomInput
                    {...register('referralCode')}
                    placeholder={Strings.referralCode}
                    {...{formState}}
                    validation
                  />
                )}

                <CustomButton
                  title={Strings.signUp}
                  titleColor={Colors.txtDark}
                  backColor={Colors.primary}
                  btnMTop={scale(25)}
                  btnMBottom={scale(10)}
                  onPress={handleSubmit(signUpOnPress)}
                  isDisable={!formState.isValid}
                  isLoading={loading}
                  widthNo={width - 75}
                />

                <HStack alignItems="center" justifyContent="center">
                  <Text
                    fontSize="xs"
                    color={Colors.txtMedium}
                    fontFamily={customFonts.regular}>
                    {Strings.signUpAgree}
                  </Text>
                  <Button
                    px={1}
                    variant="link"
                    //  onPress={signInOnPress}
                  >
                    <Text
                      onPress={() => {
                        navigate('TermsScreen');
                      }}
                      underline
                      color={Colors.txtMedium}
                      fontSize="xs"
                      fontFamily={customFonts.regular}>
                      {Strings.terms}
                    </Text>
                  </Button>
                </HStack>

                <HStack alignItems="center" justifyContent="center" mt="-5">
                  <Text
                    fontSize="xs"
                    color={Colors.txtMedium}
                    fontFamily={customFonts.regular}>
                    {' '}
                    and{' '}
                  </Text>

                  <Button px={1} variant="link">
                    <Text
                      onPress={() => {
                        navigate('PolicyScreen');
                      }}
                      underline
                      color={Colors.txtMedium}
                      fontSize="xs"
                      fontFamily={customFonts.regular}>
                      {Strings.privacy}
                    </Text>
                  </Button>
                </HStack>
              </VStack>

              <SectionRowSocial
                {...{googleOnPress, facebookOnPress, appleOnPress}}
              />
              <HStack alignItems="center" justifyContent="center">
                <Text
                  fontSize="xs"
                  color={Colors.txtMedium}
                  fontFamily={customFonts.regular}>
                  {Strings.haveAccount}
                </Text>
                <Button px={1} variant="link" onPress={signInOnPress}>
                  <Text
                    underline
                    color={Colors.primary}
                    fontSize="xs"
                    fontFamily={customFonts.bold}>
                    {Strings.signIn}
                  </Text>
                </Button>
              </HStack>
            </Flex>
          </CustomKeyboardAwareScrollView>
        </FormProvider>
      </ImageBackground>
    </CustomContainer>
  );
};

export default SignUp;

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
