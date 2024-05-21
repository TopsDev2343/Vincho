import * as yup from 'yup';

import React, {useState} from 'react';
import {ImageBackground, StyleSheet} from 'react-native';
import {yupResolver} from '@hookform/resolvers/yup';
import {FormProvider, useForm} from 'react-hook-form';
import {Button, Flex, HStack, Text, VStack} from 'native-base';
import {SvgXml} from 'react-native-svg';
import {scale} from 'react-native-size-matters';

import {Colors} from '~/styles/colors';
import {CustomContainer} from '~/components';
import {CustomKeyboardAwareScrollView} from '~/components';
import {CustomInput} from '~/components';
import {CustomButton} from '~/components';
import {Strings} from '~/assets/strings/index';
import {SectionRowSocial} from '~/components';
import {customFonts} from '~/styles/fonts';
import {loginBack} from '~/assets/images';
import {
  useSignIn,
  useSignInAuth,
  useGoogleAuth,
  useAppleAuth,
  useFacebookAuth,
} from '~/hooks/artist/Auth';
import {chevronLeft} from '~/assets/icons';
import {BackButton} from '~/components';
import {englishLanPattern} from '~/constants/regexExp';
import {navigate, resetRoot} from '~/navigation/methods';
import {width} from '~/utils/dimension';

const schema = yup.object().shape({
  email: yup
    .string()
    .matches(englishLanPattern, 'email must be valid!')
    .email()
    .required('required'),
  password: yup.string().required('Required'),
});

const SignIn = ({navigation}: {navigation: any}) => {
  const {...methods} = useForm<Record<string, any>, object>({
    resolver: yupResolver<yup.AnyObjectSchema>(schema),
    mode: 'onChange',
  });
  const {signInWithEmailAndPass} = useSignInAuth();
  const {mutate: signInMutate} = useSignIn();
  const {signInWithGoogle} = useGoogleAuth();
  const {signInWithFacebook} = useFacebookAuth();
  const {signInWithApple} = useAppleAuth();

  const [loading, setLoading] = useState<boolean>(false);

  const {handleSubmit, register, formState} = methods;

  const singInOnPress = async (formData: any) => {
    setLoading(true);
    const response = await signInWithEmailAndPass(
      formData?.email,
      formData?.password,
    );
    if (response?.data) {
      completeSignIn();
    } else {
      setLoading(false);
    }
  };

  const googleOnPress = async () => {
    setLoading(true);
    const res = await signInWithGoogle();
    if (res?.data) {
      completeSignIn();
    } else {
      setLoading(false);
    }
  };

  const facebookOnPress = async () => {
    setLoading(true);
    const res = await signInWithFacebook();
    if (res?.data) {
      completeSignIn();
    } else {
      setLoading(false);
    }
  };

  const appleOnPress = async () => {
    setLoading(true);
    const res = await signInWithApple();
    if (res?.data) {
      completeSignIn();
    } else {
      setLoading(false);
    }
  };

  const completeSignIn = async () => {
    signInMutate(
      {},
      {
        onSuccess: () => {
          setLoading(false);
        },
        onError: () => {
          setLoading(false);
        },
      },
    );
  };

  const signUpOnPress = () => {
    navigation.navigate('SignUpScreen');
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

            <VStack my="30" ml="6" justifyContent={'center'}>
              <Text
                fontSize={24}
                color={Colors.txtLight}
                ml="3"
                fontFamily={customFonts.chanelRegular}>
                {Strings.signInTitle}
              </Text>
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
                  textBackgroundColor={Colors.black}
                  {...{formState}}
                  validation
                  inputType="password"
                />
                <Button
                  variant="link"
                  onPress={() => navigation.navigate('SendLinkScreen')}
                  alignSelf="flex-end">
                  <Text
                    fontSize="xs"
                    color={Colors.primary}
                    fontFamily={customFonts.regular}>
                    {Strings.forgetPass}
                  </Text>
                </Button>

                <CustomButton
                  title={Strings.signIn}
                  titleColor={Colors.txtDark}
                  backColor={Colors.primary}
                  btnMTop={scale(25)}
                  btnMBottom={scale(10)}
                  onPress={handleSubmit(singInOnPress)}
                  // onPress={() => resetRoot('AdminStack')}
                  isDisable={!formState.isValid}
                  isLoading={loading}
                  widthNo={width - 75}
                />

                <HStack alignItems="center" justifyContent="center">
                  <Text
                    fontSize="xs"
                    color={Colors.txtMedium}
                    fontFamily={customFonts.regular}>
                    {Strings.signInAgree}
                  </Text>
                  <Button px={1} variant="link">
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

                  <Button
                    px={1}
                    variant="link"
                    // onPress={singInOnPress}
                  >
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
                  {Strings.notHaveAccount}
                </Text>
                <Button px={1} variant="link" onPress={signUpOnPress}>
                  <Text
                    underline
                    color={Colors.primary}
                    fontSize="xs"
                    fontFamily={customFonts.bold}>
                    {Strings.signUp}
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

export default SignIn;

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
