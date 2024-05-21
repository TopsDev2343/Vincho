import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query';
import {
  BaseCollection_GetBaseCollection,
  BaseCollection_GetBaseCollectionsQuery,
  BaseCollection_GetBaseCollectionsQueryVariables,
  Collection_DeleteFromCollectionMutation,
  Collection_DeleteFromCollectionMutationVariables,
  Collection_GetCollectionsQuery,
  Collection_GetCollectionsQueryVariables,
  Collection_UpdateCollectionMutation,
  Collection_UpdateCollectionMutationVariables,
  PostSav_deletePostSavMutation,
  PostSav_deletePostSavMutationVariables,
} from '~/generated/graphql';
import graphQLClient, {fetcher} from '~/graphql/fetcher';
import {PAGE_SIZE} from '~/constants/pagination';
import {queryKeys} from '~/constants/queryKeys';
import {
  GET_BASECOLLECTIONS,
  GET_BASECOLLECTION_BY_ID,
  GET_COLLECTIONS,
} from '~/graphql/artist/Collections/queries';
import {
  CREATE_BASECOLLECTION,
  DELETE_COLLECTION,
  DELETE_FROM_ALLPOST,
  DELETE_FROM_COLLECTION,
  UPDATE_BASECOLLECTION,
  UPDATE_COLLECTION,
} from '~/graphql/artist/Collections/mutations';
import snackBar from '~/utils/snackBar';
import {Colors} from '~/styles/colors';

export const useGetBaseCollections = ({
  where,
  order,
  options = {},
}: {
  where?: any;
  order?: any;
  options?: any;
}) => {
  return useInfiniteQuery<
    BaseCollection_GetBaseCollectionsQuery,
    any,
    BaseCollection_GetBaseCollectionsQueryVariables,
    any
  >(
    [queryKeys.getBaseCollections, where, order],
    async ({pageParam = 0}) => {
      return fetcher<
        BaseCollection_GetBaseCollectionsQuery,
        BaseCollection_GetBaseCollectionsQueryVariables
      >(GET_BASECOLLECTIONS, {
        skip: pageParam * 30,
        take: 30,
        where,
        order,
      })();
    },
    {
      getNextPageParam: (
        lastPage: BaseCollection_GetBaseCollectionsQuery,
        allPages: BaseCollection_GetBaseCollectionsQueryVariables[],
      ) => {
        if (
          lastPage?.baseCollection_getBaseCollections?.result?.pageInfo
            ?.hasNextPage
        ) {
          return allPages.length;
        }
        return undefined;
      },
      select: data => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.baseCollection_getBaseCollections?.result?.items)
            .flat(),
        };
      },
      ...options,
    },
  );
};

export const useCreateCollection = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({title, postIds}: {title: String; postIds: []}) => {
      return await fetcher<any, any>(CREATE_BASECOLLECTION, {
        title,
        postIds,
      })();
    },
    {
      onSuccess: data => {
        if (
          data.baseCollection_createBaseCollection?.status.value === 'Success'
        ) {
          queryClient.invalidateQueries('getBaseCollections');
        }
      },
    },
  );
};

export const useDeleteCollection = () => {
  const queryClient = useQueryClient();
  return useMutation<number>(
    async entityId => {
      return fetcher<any, any>(DELETE_COLLECTION, {entityId})();
    },
    {
      onSuccess: data => {
        const status = data?.baseCollection_deleteBaseCollection.value;
        if (status === 'Success') {
          queryClient.invalidateQueries('getBaseCollections');
        }
      },
      onSettled: () => {},
    },
  );
};

export const useGetCollections = ({
  where,
  options,
}: {
  where: String;
  options: any;
}) => {
  return useInfiniteQuery<
    Collection_GetCollectionsQuery,
    any,
    Collection_GetCollectionsQueryVariables,
    any
  >(
    [queryKeys.getCollections],
    async ({pageParam = 0}) => {
      return fetcher<
        Collection_GetCollectionsQuery,
        Collection_GetCollectionsQueryVariables
      >(GET_COLLECTIONS, {
        skip: pageParam * PAGE_SIZE,
        take: PAGE_SIZE,
        where,
      })();
    },
    {
      getNextPageParam: (
        lastPage: Collection_GetCollectionsQuery,
        allPages: Collection_GetCollectionsQueryVariables[],
      ) => {
        if (
          lastPage?.collection_getCollections?.result?.pageInfo?.hasNextPage
        ) {
          return allPages.length;
        }
        return undefined;
      },
      select: data => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.collection_getCollections?.result?.items)
            .flat(),
        };
      },
      ...options,
    },
  );
};

export const useUpdateCollection = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({input, postIds}: {input: any; postIds: []}) => {
      return await fetcher<any, any>(UPDATE_BASECOLLECTION, {
        input,
        postIds,
      })();
    },
    {
      onSuccess: data => {
        if (
          data.baseCollection_updateBaseCollection?.status.value === 'Success'
        ) {
          queryClient.invalidateQueries('getBaseCollections');
          queryClient.invalidateQueries('getBaseCollectionById');
        }
      },
    },
  );
};

export const useGetBaseCollectionById = (entityId: number) => {
  return useQuery<BaseCollection_GetBaseCollection>(
    [queryKeys.getBaseCollectionById, entityId],
    async () => {
      return fetcher<any, any>(GET_BASECOLLECTION_BY_ID, {
        entityId,
      })();
    },
    {
      enabled: !!entityId,
    },
  );
};

export const useDeletePostFromCollection = () => {
  return useMutation<
    Collection_DeleteFromCollectionMutation,
    any,
    Collection_DeleteFromCollectionMutationVariables
  >(
    ({
      baseCollectionId,
      postId,
    }: {
      baseCollectionId: number;
      postId: number;
    }) => {
      return fetcher<
        Collection_DeleteFromCollectionMutation,
        Collection_DeleteFromCollectionMutationVariables
      >(DELETE_FROM_COLLECTION, {
        baseCollectionId,
        postId,
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

export const useMoveToCollection = () => {
  return useMutation<
    Collection_UpdateCollectionMutation,
    any,
    Collection_UpdateCollectionMutationVariables
  >(
    input => {
      return fetcher<
        Collection_UpdateCollectionMutation,
        Collection_UpdateCollectionMutationVariables
      >(UPDATE_COLLECTION, {
        input,
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

export const useDeletePostFromAllPost = () => {
  return useMutation<
    PostSav_deletePostSavMutation,
    any,
    PostSav_deletePostSavMutationVariables
  >(
    input => {
      return fetcher<
        PostSav_deletePostSavMutation,
        PostSav_deletePostSavMutationVariables
      >(DELETE_FROM_ALLPOST, input)();
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
