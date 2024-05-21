import * as yup from 'yup';

import React from 'react';
import {ImageBackground, StyleSheet} from 'react-native';
import {yupResolver} from '@hookform/resolvers/yup';
import {FormProvider, useForm} from 'react-hook-form';
import {Flex, HStack, Text, VStack} from 'native-base';
import {scale} from 'react-native-size-matters';

import {Colors} from '~/styles/colors';
import {CustomContainer} from '~/components';
import {CustomKeyboardAwareScrollView} from '~/components';
import {CustomInput} from '~/components';
import {CustomButton} from '~/components';
import {Strings} from '~/assets/strings';
import {customFonts} from '~/styles/fonts';
import {loginBack} from '~/assets/images';
import {useForgotPasswordAuth} from '~/hooks/artist/Auth';
import {BackButton} from '~/components';

const schema = yup.object().shape({
  email: yup.string().email().required('required'),
});

const SendLink = ({navigation}: {navigation: any}) => {
  const {...methods} = useForm<Record<string, any>, object>({
    resolver: yupResolver<yup.AnyObjectSchema>(schema),
    mode: 'onChange',
  });

  //   const [loading, setLoading] = useState<boolean>(false);

  const {handleSubmit, register, formState} = methods;

  const {forgotPassword, loading} = useForgotPasswordAuth();

  const onSend = async (formData: any) => {
    const response = await forgotPassword(formData?.email);
  };

  return (
    <CustomContainer isLoading={loading}>
      <ImageBackground
        source={loginBack}
        style={{height: scale(200), flex: 1}}
        resizeMode="cover">
        <FormProvider {...methods}>
          <CustomKeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.contentContainerStyle}>
            <BackButton />

            <VStack mt="60" ml="6">
              <Text
                fontSize="xl"
                color={Colors.txtLight}
                ml="3"
                fontFamily={customFonts.chanelRegular}
                uppercase={true}>
                {Strings.sendLink}
              </Text>
              <HStack pl="2" pr="8">
                <Text
                  fontSize="md"
                  color={Colors.txtMedium}
                  mt="2"
                  lineHeight="26"
                  fontFamily={customFonts.regular}
                  textAlign={'justify'}>
                  {Strings.sendLinkBody}
                </Text>
              </HStack>
            </VStack>

            <Flex flex={1} justifyContent="center" pb="6">
              <VStack
                pt="2"
                pb="6"
                px="4"
                space="1"
                mx="2"
                backgroundColor={Colors.black}>
                <CustomInput
                  {...register('email')}
                  placeholder="Email"
                  keyboardType="email-address"
                  {...{formState}}
                  validation
                />
              </VStack>

              <CustomButton
                title={Strings.sendLink}
                titleColor={Colors.txtDark}
                backColor={Colors.primary}
                btnMTop={scale(40)}
                btnMBottom={scale(10)}
                onPress={handleSubmit(onSend)}
                isDisable={!formState.isValid}
              />

              <CustomButton
                title={Strings.back}
                titleColor={Colors.primary}
                backColor={Colors.background}
                btnMBottom={scale(10)}
                onPress={() => navigation.goBack()}
              />
            </Flex>
          </CustomKeyboardAwareScrollView>
        </FormProvider>
      </ImageBackground>
    </CustomContainer>
  );
};

export default SendLink;

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
