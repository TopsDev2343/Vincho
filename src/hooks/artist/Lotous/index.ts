import {useQuery} from 'react-query';
import {
  User_GetLotusStatusQuery,
  User_GetLotusStatusQueryVariables,
} from '~/generated/graphql';
import {fetcher} from '~/graphql/fetcher';
import {queryKeys} from '~/constants/queryKeys';
import {USER_GET_LOUTS_STATUS} from '~/graphql/artist/Lotus/queries';

export const useGetLotusStatus = () => {
  return useQuery<
    User_GetLotusStatusQuery,
    any,
    User_GetLotusStatusQueryVariables,
    any
  >([queryKeys.getLotusStatus], async () => {
    return fetcher<User_GetLotusStatusQuery, User_GetLotusStatusQueryVariables>(
      USER_GET_LOUTS_STATUS,
    )();
  });
};
