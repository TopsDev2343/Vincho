import {useInfiniteQuery, useMutation, useQueryClient} from 'react-query';

import snackBar from '~/utils/snackBar';
import {
  Buddy_CreateBuddyMutation,
  Buddy_CreateBuddyMutationVariables,
  Buddy_UpdateBuddyMutation,
  Buddy_UpdateBuddyMutationVariables,
  Buddy_GetBuddiesQuery,
  Buddy_GetBuddiesQueryVariables,
} from '~/generated/graphql';
import {fetcher} from '../../../graphql/fetcher';
import {CREATE_BUDDY, UPDATE_BUDDY} from '~/graphql/artist/AiBuddy/mutations';

import {Colors} from '~/styles/colors';
import {queryKeys} from '~/constants/queryKeys';
import {PAGE_SIZE} from '~/constants/pagination';
import {GET_ALL_BUDDIES} from '~/graphql/artist/AiBuddy/queries';

export const useCreateBuddy = () => {
  const queryClient = useQueryClient();
  return useMutation<
    Buddy_CreateBuddyMutation,
    any,
    Buddy_CreateBuddyMutationVariables
  >(
    (input: any) => {
      return fetcher<
        Buddy_CreateBuddyMutation,
        Buddy_CreateBuddyMutationVariables
      >(CREATE_BUDDY, {
        input,
      })();
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(queryKeys.getAllBuddies);
      },
      onError: (errorData: any) => {
        snackBar({
          message: JSON.stringify(errorData),
          color: Colors.error,
        });
      },
    },
  );
};

export const useUpdateBuddy = () => {
  const queryClient = useQueryClient();
  return useMutation<
    Buddy_UpdateBuddyMutation,
    any,
    Buddy_UpdateBuddyMutationVariables
  >(
    (input: any) => {
      return fetcher<
        Buddy_UpdateBuddyMutation,
        Buddy_UpdateBuddyMutationVariables
      >(UPDATE_BUDDY, {
        input,
      })();
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(queryKeys.getAllBuddies);
      },
      onError: (errorData: any) => {
        snackBar({
          message: JSON.stringify(errorData),
          color: Colors.error,
        });
      },
    },
  );
};

export const useGetAllBuddies = ({
  where,
  options,
}: {
  where?: any;
  options?: any;
}) => {
  return useInfiniteQuery<
    Buddy_GetBuddiesQuery,
    any,
    Buddy_GetBuddiesQueryVariables,
    any
  >(
    [queryKeys.getAllBuddies, where],
    async ({pageParam = 0}) => {
      return fetcher<Buddy_GetBuddiesQuery, Buddy_GetBuddiesQueryVariables>(
        GET_ALL_BUDDIES,
        {
          skip: pageParam * PAGE_SIZE,
          take: PAGE_SIZE,
          where,
          order: {id: 'DESC'},
        },
      )();
    },
    {
      getNextPageParam: (
        lastPage: Buddy_GetBuddiesQuery,
        allPages: Buddy_GetBuddiesQuery[],
      ) => {
        if (lastPage?.buddy_getBuddies?.result?.pageInfo?.hasNextPage) {
          return allPages.length;
        }
        return undefined;
      },
      select: data => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.buddy_getBuddies?.result?.items)
            .flat(),
        };
      },
      ...options,
    },
  );
};
