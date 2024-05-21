import * as React from 'react';
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from 'react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 3,
    },
  },
  queryCache: new QueryCache({
    onError: async (error: any) => {
      // console.log('queryCacheError=> ', error);
    },
  }),
  mutationCache: new MutationCache({
    onError: async (error: any) => {
      // console.log('mutationCacheError=> ', error);
    },
  }),
});

export default function AuthProvider({children}: {children: React.ReactNode}) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
