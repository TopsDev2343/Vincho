import {useMutation, useQuery, useQueryClient} from 'react-query';
import graphQLClient, {fetcher} from '../../../graphql/fetcher';
import {USER_UPDATE_PROFILE} from '~/graphql/artist/User/mutations';
import {USER_SIGN_IN} from '~/graphql/artist/Auth/queries';

const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async userInput => {
      return await fetcher<any, any>(USER_UPDATE_PROFILE, {
        userInput,
      })();
    },
    {
      onSuccess: data => {
        if (data.user_updateProfile?.status === 'SUCCESS') {
          queryClient.invalidateQueries('getMyProfile');
        }
      },
    },
  );
};

const useGetProfile = () => {
  const res = useQuery(['getMyProfile'], async () => {
    return fetcher<any, any>(USER_SIGN_IN)();
  });
  return {...res, route: res?.data?.user_login?.result};
};

export {useUpdateProfile, useGetProfile};
