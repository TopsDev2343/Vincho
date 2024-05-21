import {useQuery} from 'react-query';
import {
  Hashtag_GetHashtagsQueryVariables,
  Hashtag_GetHashtagsQuery,
} from '~/generated/graphql';
import {GET_HASHTAG_LIST} from '~/graphql/artist/Hashtags/queries';
import graphQLClient, {fetcher} from '~/graphql/fetcher';
import {queryKeys} from '~/constants/queryKeys';

export const useGetHashtagList = (input: any) => {
  return useQuery<
    Hashtag_GetHashtagsQuery,
    any,
    Hashtag_GetHashtagsQueryVariables,
    any
  >([queryKeys.getPostForStatistics], async () => {
    return fetcher<Hashtag_GetHashtagsQuery, Hashtag_GetHashtagsQueryVariables>(
      GET_HASHTAG_LIST,
      input,
    )();
  });
};
