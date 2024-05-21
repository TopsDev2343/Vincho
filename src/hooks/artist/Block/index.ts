import {useInfiniteQuery, useMutation, useQueryClient} from 'react-query';
import {
  Block_GetBlocksQuery,
  Block_GetBlocksQueryVariables,
} from '~/generated/graphql';
import graphQLClient, {fetcher} from '~/graphql/fetcher';
import {PAGE_SIZE} from '~/constants/pagination';
import {queryKeys} from '~/constants/queryKeys';
import {GET_BLOCKS} from '~/graphql/artist/Blocks/queries';
import {CREATE_BLOCK, DELETE_BLOCK} from '~/graphql/artist/Blocks/mutations';
import snackBar from '~/utils/snackBar';
import {messageHelper} from '~/utils/messageHelper';

export const useGetBlocks = (where?: any, options?: any) => {
  return useInfiniteQuery<
    Block_GetBlocksQuery,
    any,
    Block_GetBlocksQueryVariables,
    any
  >(
    [queryKeys.getBlocks, where],
    async ({pageParam = 0}) => {
      return fetcher<Block_GetBlocksQuery, Block_GetBlocksQueryVariables>(
        GET_BLOCKS,
        {
          where,
          skip: pageParam * PAGE_SIZE,
          take: PAGE_SIZE,
        },
      )();
    },
    {
      getNextPageParam: (
        lastPage: Block_GetBlocksQuery,
        allPages: Block_GetBlocksQueryVariables[],
      ) => {
        if (lastPage?.block_getBlocks?.result?.pageInfo?.hasNextPage) {
          return allPages.length;
        }
        return undefined;
      },
      select: data => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.block_getBlocks?.result?.items)
            .flat(),
        };
      },
      ...options,
    },
  );
};

export const useDeleteBlock = () => {
  const queryClient = useQueryClient();
  return useMutation<number>(
    (entityId: any) => {
      return fetcher<any, any>(DELETE_BLOCK, {entityId})();
    },
    {
      onSuccess: data => {
        const status = data?.block_deleteBlock.value;
        if (status === 'Success') {
          queryClient.invalidateQueries('getBlocks');
        } else {
          snackBar(messageHelper(data?.block_deleteBlock?.value));
        }
      },
    },
  );
};

export const useCreateBlock = () => {
  const queryClient = useQueryClient();
  return useMutation<number>(
    async input => {
      return fetcher<any, any>(CREATE_BLOCK, {input})();
    },
    {
      onSuccess: data => {
        const status = data?.block_createBlock.status.value;
        if (status === 'Success') {
          queryClient.invalidateQueries('getBlocks');
        }
      },
      onSettled: () => {},
    },
  );
};
