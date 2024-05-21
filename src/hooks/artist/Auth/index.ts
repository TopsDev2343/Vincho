import {useState} from 'react';
import auth from '@react-native-firebase/auth';
import snackBar from '~/utils/snackBar';
import {useQueryClient, useMutation, useQuery} from 'react-query';
import {
  statusCodes,
  GoogleSignin,
} from '@react-native-google-signin/google-signin';
import {
  Profile,
  AccessToken,
  GraphRequest,
  LoginManager,
  GraphRequestManager,
} from 'react-native-fbsdk-next';

import appleAuth from '@invertase/react-native-apple-authentication';
import {Config} from 'react-native-config';
import graphQLClient, {fetcher} from '~/graphql/fetcher';
import {Colors} from '~/styles/colors';

import {
  User_SignUpArtistMutation,
  User_SignUpArtistMutationVariables,
  User_LoginQuery,
  User_LoginQueryVariables,
  UserType,
} from '~/generated/graphql';

import {USER_SIGN_UP} from '~/graphql/artist/Auth/mutations';
import {
  USER_SIGN_IN,
  USER_isValidReferralCode,
} from '~/graphql/artist/Auth/queries';
import {storageHelper} from '~/utils/storageHelper';
import {StorageKeys} from '~/constants/storageKeys';
import {replace, resetRoot} from '~/navigation/methods';
import {messageHelper} from '~/utils/messageHelper';
import {useAuthStore, useUserTypeStore} from '~/stores';
import {queryKeys} from '~/constants/queryKeys';
import {appUserType} from '~/@types/global';

GoogleSignin.configure({
  scopes: ['profile', 'email'], // what API you want to access on behalf of the user, default is email and profile
  webClientId: Config.GOOGLE_WEB_CLIENT_ID, // client ID of type WEB for your server (needed to verify user ID and offline access)
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  hostedDomain: '', // specifies a hosted domain restriction
  // @ts-ignore
  loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
  forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
  accountName: '', // [Android] specifies an account name on the device that should be used
  iosClientId: Config.GOOGLE_IOS_CLIENT_ID, // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
  googleServicePlistPath: '', // [iOS] optional, if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
});

const storage = new storageHelper();

//Sign up with email and password using Firebase

export const useSignUpAuth = () => {
  const signUpWithEmailAndPass = async (email: string, password: string) => {
    try {
      const response = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      if (response?.additionalUserInfo?.isNewUser) {
        const idToken = await auth().currentUser?.getIdToken();

        if (idToken) {
          graphQLClient.setHeader('authorization', 'Bearer ' + idToken);

          return {data: idToken, error: null, loading: false};
        } else {
          return {data: null, error: response, loading: false};
        }
      } else {
        return {data: null, error: response, loading: false};
      }
    } catch (errorData: any) {
      const errorMessage = errorData?.message;

      if (errorMessage) {
        snackBar(messageHelper(errorData.code));
      }
      return {data: null, error: errorData, loading: false};
    }
  };

  return {signUpWithEmailAndPass};
};

export const useSignUp = () => {
  const {setUserId} = useAuthStore(state => state);
  const {setUserType} = useUserTypeStore(state => state);
  const queryClient = useQueryClient();
  return useMutation<
    User_SignUpArtistMutation,
    any,
    User_SignUpArtistMutationVariables
  >(
    userInput => {
      return fetcher<
        User_SignUpArtistMutation,
        User_SignUpArtistMutationVariables
      >(USER_SIGN_UP, {userInput})();
    },
    {
      onSuccess: successData => {
        if (successData.user_signUpArtist?.status?.value === 'Success') {
          Promise.all([
            storage.multiSave(
              () => console.log('object'),
              [
                [
                  StorageKeys.USER_IS_LOGGED_IN_ID,
                  JSON.stringify(successData.user_signUpArtist?.result?.id),
                ],
                [StorageKeys.ACCESS_LOCATION_SHOW, ''],
                [StorageKeys.INITIAL_SETUP_SHOW, ''],
                [StorageKeys.FOLLOW_CONTACT_SHOW, ''],
                [StorageKeys.ACCESS_CONTACT_SHOW, ''],
                [StorageKeys.TOPIC_SHOW, ''],
                [StorageKeys.USER_TYPE, UserType.Artist],
              ],
            ),
            /*  snackBar(
              messageHelper(successData.user_signUpArtist?.status?.value),
            ), */
            setUserId(successData.user_signUpArtist?.result?.id),
            setUserType(UserType.Artist),
            queryClient.invalidateQueries(queryKeys.getUserProfile),
          ])
            .then(() => {
              replace('InitSetupScreen', {
                userProfile: successData?.user_signUpArtist?.result,
              });
            })
            .catch(err => err);
        } else {
          snackBar(messageHelper(successData.user_signUpArtist?.status?.value));
        }
      },
      onError: (errorData: any) => {
        snackBar(messageHelper(errorData));
      },
    },
  );
};

//Sign in with email and password using Firebase
export const useSignInAuth = () => {
  const signInWithEmailAndPass = async (email: string, password: string) => {
    try {
      const response = await auth().signInWithEmailAndPassword(email, password);

      if (response?.user) {
        const idToken = await auth().currentUser?.getIdToken();

        if (idToken) {
          graphQLClient.setHeader('authorization', 'Bearer ' + idToken);

          return {data: idToken, error: null, loading: false};
        } else {
          return {data: null, error: response, loading: false};
        }
      } else {
        return {data: null, error: response, loading: false};
      }
    } catch (errorData: any) {
      const errorMessage = errorData?.message;
      if (errorMessage) {
        snackBar(messageHelper(errorData.code));
      }
      return {data: null, error: errorData, loading: false};
    }
  };

  return {signInWithEmailAndPass};
};

export const useCheckReferralCode = (referralCode: string) => {
  const res = useQuery(
    ['CheckReferralCode', referralCode],
    async () => {
      console.log('useCheckReferralCode', referralCode);

      return fetcher(USER_isValidReferralCode, {
        referralCode,
      })();
    },
    {enabled: !!referralCode},
  );
  return {...res};
};

export const useSignIn = () => {
  const {setUserId} = useAuthStore(state => state);
  const {setUserType} = useUserTypeStore(state => state);
  const queryClient = useQueryClient();
  return useMutation<User_LoginQuery, any, User_LoginQueryVariables>(
    () => {
      return fetcher<User_LoginQuery, User_LoginQueryVariables>(USER_SIGN_IN)();
    },
    {
      onSuccess: successData => {
        if (successData.user_login?.status?.value === 'Success') {
          if (
            successData?.user_login?.result?.userType === appUserType.Artist
          ) {
            Promise.all([
              storage.multiSave(
                () => console.log('login error', 'callback'),
                [
                  [
                    StorageKeys.USER_IS_LOGGED_IN_ID,
                    JSON.stringify(successData.user_login?.result?.id),
                  ],
                  [StorageKeys.ACCESS_LOCATION_SHOW, 'shown'],
                  [StorageKeys.INITIAL_SETUP_SHOW, 'shown'],
                  [StorageKeys.FOLLOW_CONTACT_SHOW, 'shown'],
                  [StorageKeys.ACCESS_CONTACT_SHOW, 'shown'],
                  [StorageKeys.TOPIC_SHOW, 'shown'],
                  [StorageKeys.USER_TYPE, UserType.Artist],
                ],
              ),
              setUserId(successData.user_login?.result?.id),
              setUserType(successData.user_login?.result?.userType),
              queryClient.invalidateQueries(queryKeys.getUserProfile),
            ])
              .then(() => {
                //goBack();
                resetRoot('ArtistStack');
              })
              .catch(err => err);
          } else {
            Promise.all([
              storage.multiSave(
                () => console.log('login error', 'callback'),
                [
                  [
                    StorageKeys.USER_IS_LOGGED_IN_ID,
                    JSON.stringify(successData.user_login?.result?.id),
                  ],
                  [
                    StorageKeys.USER_TYPE,
                    successData.user_login?.result?.userType,
                  ],
                ],
              ),
              setUserId(successData.user_login?.result?.id),
              setUserType(successData.user_login?.result?.userType),
            ])
              .then(() => {
                resetRoot('AdminStack');
              })
              .catch(err => err);
          }
        } else {
          snackBar(messageHelper(successData.user_login?.status?.value));
        }
      },
      onError: (errorData: any) => {
        snackBar(messageHelper(errorData));
      },
    },
  );
};

//Sign up with google
export const useGoogleAuth = () => {
  const {signOut} = useSignOutAuth();

  const signInWithGoogle = async () => {
    try {
      signOut();
      await GoogleSignin.hasPlayServices();
      const googleResponse = await GoogleSignin.signIn();
      const email = googleResponse?.user?.email;
      if (!email) {
        throw new Error('Please accept the email permission');
      }

      const idToken = googleResponse?.idToken;
      if (idToken) {
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        await auth().signInWithCredential(googleCredential);
        const currentUser = auth().currentUser;
        const fbIdToken = await currentUser?.getIdToken();

        graphQLClient.setHeader('authorization', 'Bearer ' + fbIdToken);
        return {
          data: googleResponse,
          success: true,
          loading: false,
          error: false,
        };
      } else {
        return {
          data: null,
          success: false,
          loading: false,
          error: null,
        };
      }
    } catch (err: any) {
      if (err.code === statusCodes.SIGN_IN_CANCELLED) {
        return {
          data: null,
          success: false,
          loading: false,
          error: 'Cancelled by user',
        };
      } else if (err.code === statusCodes.IN_PROGRESS) {
        return {
          data: null,
          success: false,
          loading: false,
          error: 'SignIn in progress',
        };
      } else if (err.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        return {
          data: null,
          success: false,
          loading: false,
          error: 'Google play services not available',
        };
      } else {
        return {
          data: null,
          success: false,
          loading: false,
          error: err,
        };
      }
    }
  };

  return {signInWithGoogle};
};

//Sign up with apple
export const useAppleAuth = () => {
  const {signOut} = useSignOutAuth();

  const signInWithApple = async () => {
    try {
      signOut();
      if (appleAuth.isSupported) {
        const appleAuthRequestResponse = await appleAuth.performRequest({
          requestedOperation: appleAuth.Operation.LOGIN,
          requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
        });
        if (!appleAuthRequestResponse.identityToken) {
          return {
            data: null,
            success: false,
            loading: false,
            error: 'Apple Sign-In failed - no identify token returned',
          };
        }
        const fullResult = appleAuthRequestResponse;
        const idToken = appleAuthRequestResponse.identityToken;
        const nonce = appleAuthRequestResponse.nonce;
        const appleCredential = auth.AppleAuthProvider.credential(
          idToken,
          nonce,
        );

        await auth().signInWithCredential(appleCredential);
        const currentUser = auth().currentUser;
        const fbIdToken = await currentUser?.getIdToken();

        graphQLClient.setHeader('authorization', 'Bearer ' + fbIdToken);
        return {
          data: {
            fbIdToken,
            fullResult,
          },
          success: true,
          loading: false,
          error: false,
        };
      } else {
        const message = 'Apple authentication is not supported in your device.';
        snackBar({message, color: Colors.error});
        return {
          data: null,
          success: false,
          loading: false,
          error: message,
        };
      }
    } catch (err: any) {
      return {
        data: null,
        success: false,
        loading: false,
        error: err,
      };
    }
  };

  return {signInWithApple};
};

//Sign out
export const useSignOutAuth = () => {
  const signOut = async () => {
    const firebaseAuth = auth();
    if (firebaseAuth.currentUser) {
      await firebaseAuth.signOut();
    }
  };

  return {signOut};
};

//Forget password
export const useForgotPasswordAuth = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const forgotPassword = async (email: string) => {
    setLoading(true);
    try {
      await auth()
        .sendPasswordResetEmail(email)
        .then(() => {
          setLoading(false);
          snackBar(messageHelper('EmailSent'));
        })
        .catch((errorData: any) => {
          setLoading(false);
          const errorMessage = errorData?.message;
          if (errorMessage) {
            snackBar(messageHelper(errorData.code));
          }
        });
    } catch (err: any) {
      setLoading(false);

      snackBar(messageHelper('SomeError'));
    }
  };
  return {forgotPassword, loading};
};

export const useFacebookAuth = () => {
  const {signOut} = useSignOutAuth();

  const signInWithFacebook = async () => {
    try {
      signOut();
      LoginManager.logOut();
      const fbResult = await LoginManager.logInWithPermissions([
        'email',
        'public_profile',
      ]);

      if (
        fbResult &&
        !fbResult.isCancelled &&
        fbResult.declinedPermissions &&
        fbResult.declinedPermissions.includes('email')
      ) {
        return {
          data: null,
          success: false,
          loading: false,
          error: 'Please accept the email permission',
        };
      }
      if (fbResult.isCancelled) {
        return {
          data: null,
          success: false,
          loading: false,
          error: 'Cancelled by user',
        };
      }
      const data = await AccessToken.getCurrentAccessToken();

      if (!data || !data.accessToken) {
        return {
          data: null,
          success: false,
          loading: false,
          error: "Couldn't obtain access token",
        };
      }
      const accessToken = data.accessToken;
      const currentProfile = await getProfile(accessToken);

      const facebookCredential = auth.FacebookAuthProvider.credential(
        data.accessToken,
      );

      await auth().signInWithCredential(facebookCredential);
      const currentUser = auth().currentUser;

      const fbIdToken = await currentUser?.getIdToken();

      graphQLClient.setHeader('authorization', 'Bearer ' + fbIdToken);
      return {
        data: {
          fbIdToken,
          fullResult: {
            user: currentProfile,
            loginResult: fbResult,
          },
        },
        success: true,
        loading: false,
        error: false,
      };
    } catch (err: any) {
      if (err.code === statusCodes.SIGN_IN_CANCELLED) {
        return {
          data: null,
          success: false,
          loading: false,
          error: 'Cancelled by user',
        };
      } else if (err.code === statusCodes.IN_PROGRESS) {
        return {
          data: null,
          success: false,
          loading: false,
          error: 'SignIn in progress',
        };
      } else if (err.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        return {
          data: null,
          success: false,
          loading: false,
          error: 'Google play services not available',
        };
      } else {
        return {
          data: null,
          success: false,
          loading: false,
          error: err,
        };
      }
    }
  };

  const getProfile = async (accessToken: any) => {
    const currentProfile = await Profile.getCurrentProfile();
    if (!currentProfile || !currentProfile.email) {
      const graphProfile = await _fetchProfileWithGraph(accessToken);
      return graphProfile;
    } else {
      return currentProfile;
    }
  };

  const _fetchProfileWithGraph = async (accessToken: any) => {
    return new Promise((resolve, reject) => {
      const infoRequest = new GraphRequest(
        '/me',
        {
          accessToken,
          parameters: {
            fields: {
              string: 'email,name,first_name,middle_name,last_name',
            },
          },
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        },
      );
      new GraphRequestManager().addRequest(infoRequest).start();
    });
  };

  return {signInWithFacebook};
};
