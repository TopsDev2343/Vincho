import {useMutation, useQuery} from 'react-query';

import snackBar from '~/utils/snackBar';
import {Colors} from '~/styles/colors';
import {
  User_UpdateProfileMutation,
  User_UpdateProfileMutationVariables,
  User_GetProfileQuery,
  User_GetProfileQueryVariables,
  User_GetOtherProfileQuery,
  User_ChangeNotificationDetailMutation,
  User_ChangeNotificationDetailMutationVariables,
} from '~/generated/graphql';
import graphQLClient, {fetcher} from '../../../graphql/fetcher';
import {
  USER_CHANGENOTIFICATION,
  USER_UPDATE_PROFILE,
} from '~/graphql/artist/User/mutations';
import {
  GET_OTHER_USER_PROFILE,
  GET_USER_PROFILE,
} from '~/graphql/artist/User/queries';
import {queryKeys} from '~/constants/queryKeys';

export const useUpdateProfile = () => {
  return useMutation<
    User_UpdateProfileMutation,
    any,
    User_UpdateProfileMutationVariables
  >(
    (userInput: any) => {
      return fetcher<
        User_UpdateProfileMutation,
        User_UpdateProfileMutationVariables
      >(USER_UPDATE_PROFILE, {
        userInput,
      })();
    },
    {
      onError: (errorData: any) => {
        snackBar({
          message: JSON.stringify(errorData),
          color: Colors.error,
        });
      },
    },
  );
};

export const useGetUserProfile = (options?: any) => {
  return useQuery<User_GetProfileQuery, any, User_GetProfileQueryVariables>(
    queryKeys.getUserProfile,
    () => {
      return fetcher<User_GetProfileQuery, User_GetProfileQueryVariables>(
        GET_USER_PROFILE,
      )();
    },
    {...options},
  );
};

export const useGetOtherUserProfile = (userId: number | undefined) => {
  const res = useQuery<User_GetOtherProfileQuery>(
    [queryKeys.getUserProfileById, userId],
    async () => {
      return fetcher<User_GetOtherProfileQuery, any>(GET_OTHER_USER_PROFILE, {
        userId,
      })();
    },
    {enabled: !!userId},
  );
  return {...res, user_getProfile: res?.data?.user_getProfile?.result};
};

export const useUpdateNotification = () => {
  return useMutation<
    User_ChangeNotificationDetailMutation,
    any,
    User_ChangeNotificationDetailMutationVariables
  >(
    (userInput: any) => {
      return fetcher<
        User_ChangeNotificationDetailMutation,
        User_ChangeNotificationDetailMutationVariables
      >(USER_CHANGENOTIFICATION, {userInput})();
    },
    {
      onError: (errorData: any) => {
        snackBar({
          message: JSON.stringify(errorData),
          color: Colors.error,
        });
      },
    },
  );
};
