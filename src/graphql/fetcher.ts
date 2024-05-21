import jwtDecode from 'jwt-decode';
import Config from 'react-native-config';
import auth from '@react-native-firebase/auth';
import {GraphQLClient} from 'graphql-request';
import {getData, storeData} from '~/services/storage';
import {TOKEN_KEY} from '~/constants/mockData';

export const graphQLClient = new GraphQLClient(Config.API_URL as string, {
  timeout: 9999999999,
});

export default graphQLClient;

export async function graphqlFetcher(GQL: string, args?: any) {
  return await graphQLClient.request(GQL, args);
}

export function fetcher<TData, TVariables>(
  query: string,
  variables?: TVariables,
) {
  return async (): Promise<TData> => {
    const token = await getData(TOKEN_KEY);

    if (isTokenExpired(token) && token) {
      const idToken = await auth().currentUser?.getIdToken(true);
      await storeData(TOKEN_KEY, idToken);
      graphQLClient.setHeader('authorization', 'Bearer ' + idToken);
    }
    return await graphqlFetcher(query, variables);
  };
}

export const isTokenExpired = (token: string | null): boolean => {
  if (!token) return true;
  const decoded = jwtDecode<FirebaseToken>(token);
  const isExpired = decoded.exp < Date.now() / 1000;

  return isExpired;
};
