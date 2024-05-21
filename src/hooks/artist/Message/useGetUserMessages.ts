import {useInfiniteQuery} from 'react-query';
import {PAGE_SIZE} from '~/constants/pagination';
import {queryKeys} from '~/constants/queryKeys';
import type {
  ConversationInput,
  Message_GetUserMessages,
} from '~/generated/graphql';
import graphQLClient, {fetcher} from '~/graphql/fetcher';
import {message_getUserMessages} from '~/graphql/artist/User/queries';

const useGetUserMessages = ({
  where,
  order,
  options = {},
}: {
  where?: any;
  order?: any;
  options?: any;
}) => {
  return useInfiniteQuery<Message_GetUserMessages, any, ConversationInput, any>(
    [queryKeys.getUserMessages, where, order],
    async ({pageParam = 0}) => {
      return fetcher<Message_GetUserMessages, any>(message_getUserMessages, {
        skip: pageParam * PAGE_SIZE,
        take: PAGE_SIZE,
        where,
        order,
        includeDeletedRows: false,
      })();
    },
    {
      getNextPageParam: (
        lastPage: Message_GetUserMessages,
        allPages: Message_GetUserMessages[],
      ) => {
        if (lastPage?.message_getUserMessages?.result?.pageInfo?.hasNextPage) {
          return allPages.length;
        }
        return undefined;
      },
      select: data => ({
        ...data,
        pages: data?.pages
          ?.map(a => a.message_getUserMessages?.result?.items)
          .flat(),
      }),
      ...options,
    },
  );
};

export default useGetUserMessages;
