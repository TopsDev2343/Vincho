import {useMutation, useQueryClient} from 'react-query';
import graphQLClient, {fetcher} from '~/graphql/fetcher';
import {messageHelper} from '~/utils/messageHelper';
import snackBar from '~/utils/snackBar';
import auth from '@react-native-firebase/auth';
import {
  User_CreateAdminMutation,
  User_CreateAdminMutationVariables,
} from '~/generated/graphql';
import {
  Delete_Admin,
  User_ChangeUserActivation,
  User_CreateAdmin,
} from '~/graphql/admin/Admin/mutations';

export const useSignupAdmin = () => {
  const signUpWithEmailAndPass = async (email: string, password: string) => {
    try {
      const response = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      if (response?.additionalUserInfo?.isNewUser) {
        const idToken = response?.user?.getIdToken();
        if (idToken) {
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

export const useCreateAdmin = () => {
  const queryClient = useQueryClient();
  return useMutation<
    User_CreateAdminMutation,
    any,
    User_CreateAdminMutationVariables
  >(
    input => {
      return fetcher<
        User_CreateAdminMutation,
        User_CreateAdminMutationVariables
      >(User_CreateAdmin, input)();
    },
    {
      onSuccess: successData => {
        if (successData.user_createAdmin?.status?.value === 'Success') {
          //snackBar(messageHelper(successData.user_createAdmin?.status?.value));
          queryClient.invalidateQueries('getAllUsers');
        } else {
          snackBar(messageHelper(successData.user_createAdmin?.status?.value));
        }
      },
      onError: (errorData: any) => {
        snackBar(messageHelper(errorData));
      },
    },
  );
};

export const useDeleteAdmin = () => {
  const queryClient = useQueryClient();
  const isActive = false;
  return useMutation<number>(
    async userId => {
      return fetcher<any, any>(User_ChangeUserActivation, {
        isActive,
        userId,
      })();
    },
    {
      onSuccess: data => {
        const status = data?.user_changeUserActivation.status.value;
        if (status === 'Success') {
          queryClient.invalidateQueries('getAllUsers');
        }
      },
    },
  );
};

export const useDeleteAdminPermanently = () => {
  return useMutation<number>(async userId => {
    return fetcher<any, any>(Delete_Admin, {
      userId,
    })();
  });
};
