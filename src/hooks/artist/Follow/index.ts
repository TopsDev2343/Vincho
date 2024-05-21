import {useMutation, useInfiniteQuery, useQueryClient} from 'react-query';
import snackBar from '~/utils/snackBar';
import {Colors} from '~/styles/colors';
import {
  Follow_CreateFollowMutation,
  Follow_CreateFollowMutationVariables,
  Follow_GetFollowingsQueryVariables,
  Follow_GetFollowingsQuery,
  Follow_DeleteFollowMutation,
  Follow_DeleteFollowMutationVariables,
  Follow_GetFollowersQuery,
  Follow_GetFollowersQueryVariables,
  Follow_DeleteFollowByFollowingIdMutation,
  Follow_DeleteFollowByFollowingIdMutationVariables,
} from '~/generated/graphql';
import {
  GET_ALL_FOLLOWING,
  GET_ALL_FOLLOWERS,
} from '~/graphql/artist/Follow/queries';
import {PAGE_SIZE} from '~/constants/pagination';
import {
  CREATE_FOLLOW,
  DELETE_FOLLOW,
  DELETE_FOLLOW_BY_FOLLOWING_ID,
} from '~/graphql/artist/Follow/mutations';
import graphQLClient, {fetcher} from '~/graphql/fetcher';
import {queryKeys} from '~/constants/queryKeys';

export const useFollow = () => {
  return useMutation<
    Follow_CreateFollowMutation,
    any,
    Follow_CreateFollowMutationVariables
  >(
    (input: any) => {
      return fetcher<
        Follow_CreateFollowMutation,
        Follow_CreateFollowMutationVariables
      >(CREATE_FOLLOW, {input})();
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

export const useUnFollow = () => {
  return useMutation<
    Follow_DeleteFollowMutation,
    any,
    Follow_DeleteFollowMutationVariables
  >(
    (entityId: any) => {
      return fetcher<
        Follow_DeleteFollowMutation,
        Follow_DeleteFollowMutationVariables
      >(DELETE_FOLLOW, {entityId})();
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

export const useUnFollowByFollowingId = () => {
  return useMutation<
    Follow_DeleteFollowByFollowingIdMutation,
    any,
    Follow_DeleteFollowByFollowingIdMutationVariables
  >(
    (followingId: any) => {
      return fetcher<
        Follow_DeleteFollowByFollowingIdMutation,
        Follow_DeleteFollowByFollowingIdMutationVariables
      >(DELETE_FOLLOW_BY_FOLLOWING_ID, {
        followingId,
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

export const useGetAllFollowing = ({
  followerId,
  where,
}: {
  followerId: number | undefined;
  where?: any;
}) => {
  return useInfiniteQuery<
    Follow_GetFollowingsQuery,
    any,
    Follow_GetFollowingsQueryVariables,
    any
  >(
    [queryKeys.getAllFollowing, followerId],
    async ({pageParam = 0}) => {
      return fetcher<
        Follow_GetFollowingsQuery,
        Follow_GetFollowingsQueryVariables
      >(GET_ALL_FOLLOWING, {
        skip: pageParam * PAGE_SIZE,
        take: PAGE_SIZE,
        where,
        followerId,
      })();
    },
    {
      getNextPageParam: (
        lastPage: Follow_GetFollowingsQuery,
        allPages: Follow_GetFollowingsQueryVariables[],
      ) => {
        if (lastPage?.follow_getFollowings?.result?.pageInfo?.hasNextPage) {
          return allPages.length;
        }
        return undefined;
      },
      select: data => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.follow_getFollowings?.result?.items)
            .flat(),
        };
      },
    },
  );
};

export const useGetAllFollowers = ({
  followingId,
  where,
}: {
  followingId: number | undefined;
  where?: any;
}) => {
  return useInfiniteQuery<
    Follow_GetFollowersQuery,
    any,
    Follow_GetFollowersQueryVariables,
    any
  >(
    [queryKeys.getAllFollowers, followingId],
    async ({pageParam = 0}) => {
      return fetcher<
        Follow_GetFollowersQuery,
        Follow_GetFollowersQueryVariables
      >(GET_ALL_FOLLOWERS, {
        skip: pageParam * PAGE_SIZE,
        take: PAGE_SIZE,
        where,
        followingId,
      })();
    },
    {
      getNextPageParam: (
        lastPage: Follow_GetFollowersQuery,
        allPages: Follow_GetFollowersQueryVariables[],
      ) => {
        if (lastPage?.follow_getFollowers?.result?.pageInfo?.hasNextPage) {
          return allPages.length;
        }
        return undefined;
      },
      select: data => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.follow_getFollowers?.result?.items)
            .flat(),
        };
      },
    },
  );
};

export const useCreateFollow = () => {
  const queryClient = useQueryClient();
  return useMutation<
    Follow_CreateFollowMutation,
    any,
    Follow_CreateFollowMutationVariables
  >(
    async data => {
      return fetcher<
        Follow_CreateFollowMutation,
        Follow_CreateFollowMutationVariables
      >(CREATE_FOLLOW, {input: data})();
    },
    {
      onSuccess: data => {
        const status = data.follow_createFollow?.status.value;
        if (status === 'Success') {
          queryClient.invalidateQueries('getFollowings');
          queryClient.invalidateQueries('getFollowers');
          queryClient.invalidateQueries('getAllFollowing');
        }
      },
      onError: err => {},
    },
  );
};

export const useDeleteFollow = (entityId: number) => {
  const queryClient = useQueryClient();
  return useMutation<number>(
    async () => {
      return fetcher<any, any>(DELETE_FOLLOW, {entityId})();
    },
    {
      onSuccess: data => {
        const status = data?.follow_deleteFollow.value;
        if (status === 'Success') {
          queryClient.invalidateQueries('getFollowings');
          queryClient.invalidateQueries('getFollowers');
          queryClient.invalidateQueries('getAllFollowing');
        }
      },
      onSettled: () => {},
      onError: err => {},
    },
  );
};
