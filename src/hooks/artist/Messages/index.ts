import {showMessage} from 'react-native-flash-message';
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
  useQuery,
} from 'react-query';
import graphQLClient, {fetcher} from '../../../graphql/fetcher';
import {
  CREATE_MESSAGE,
  DELETE_MESSAGE,
  FORWARD_POST,
  FORWARD_TOPIC_POST,
  REMOVE_CONVERSATIONS,
} from '../../../graphql/artist/Messages/mutations';
import {
  GET_CONVERSATIONS,
  GET_CONVERSATION_FOR_USER,
  GET_CONVERSATION_ID_FOR_USER,
  GET_MESSAGES,
  RECEIVER_PROFILE,
} from '../../../graphql/artist/Messages/queries';
import {
  Message_CreateMessageMutation,
  Message_CreateMessageMutationVariables,
  Message_GetConversationQuery,
  Message_GetConversationQueryVariables,
  Message_RemoveMessageMutation,
  Message_RemoveMessageMutationVariables,
  Message_RemoveConversationMutation,
  Message_RemoveConversationMutationVariables,
  Message_ForwardPostInConversationMutation,
  Message_ForwardPostInConversationMutationVariables,
  Message_ForwardTopicPostInConversationMutation,
  Message_ForwardTopicPostInConversationMutationVariables,
} from '../../../generated/graphql';
import snackBar from '~/utils/snackBar';
import {messageHelper} from '~/utils/messageHelper';
import {queryKeys} from '~/constants/queryKeys';
const PAGE_SIZE = 10;
export const useGetMessages = ({
  where,
  order,
  options = {},
}: {
  where?: any;
  order?: any;
  options?: any;
}) => {
  return useInfiniteQuery(
    ['messages'],
    async ({pageParam = 0}) => {
      return fetcher<any, any>(GET_MESSAGES, {
        skip: pageParam * PAGE_SIZE,
        take: PAGE_SIZE,
        where,
        order,
      })();
    },
    {
      getNextPageParam: (lastPage: any, allPages: any[]) => {
        if (lastPage?.message_getUserMessages?.result?.pageInfo?.hasNextPage) {
          return allPages.length;
        }

        return undefined;
      },
      select: data => ({
        ...data,
        pages: data?.pages
          ?.map(a => a?.message_getUserMessages?.result?.items)
          .reduce((a: string | any[], b: any) => a.concat(b), []),
      }),
      ...options,
    },
  );
};

export const useGetConversations = ({
  conversationId,
  order,
  options = {},
}: {
  order?: any;
  conversationId: number;
  options?: any;
}) => {
  return useInfiniteQuery<
    Message_GetConversationQuery,
    any,
    Message_GetConversationQueryVariables
  >(
    ['conversations', conversationId],
    async ({pageParam = 0}) => {
      return fetcher<
        Message_GetConversationQuery,
        Message_GetConversationQueryVariables
      >(GET_CONVERSATIONS, {
        conversationId,
        skip: pageParam * PAGE_SIZE,
        take: PAGE_SIZE,
        order,
      })();
    },
    {
      getNextPageParam: (
        lastPage: Message_GetConversationQuery,
        allPages: Message_GetConversationQuery[],
      ) => {
        if (lastPage?.message_getConversation?.result?.pageInfo?.hasNextPage) {
          return allPages.length;
        }
        return undefined;
      },
      select: data => ({
        ...data,
        pages: data?.pages
          ?.map(a => a?.message_getConversation?.result?.items)
          .flat(),
      }),
      enabled: !!conversationId,
      ...options,
    },
  );
};

export const useCreateMessage = () => {
  const queryClient = useQueryClient();
  return useMutation<
    Message_CreateMessageMutation,
    any,
    Message_CreateMessageMutationVariables
  >(
    async messageInput => {
      return fetcher<
        Message_CreateMessageMutation,
        Message_CreateMessageMutationVariables
      >(CREATE_MESSAGE, {
        messageInput,
      })();
    },
    {
      onSuccess: data => {
        if (data.message_createMessage?.status.value === 'Success') {
          queryClient.invalidateQueries('messages');
          queryClient.invalidateQueries('conversations');
          queryClient.invalidateQueries('getUserMessages');
          queryClient.invalidateQueries('getUserMessages');
          // showMessage(
          //     getResponseMessage(data.message_createMessage?.status),
          // );
        } else {
          showMessage({
            message: data.message_createMessage?.status.value,
            type: 'danger',
          });
        }
      },
    },
  );
};

export const useDeleteMessage = () => {
  const queryClient = useQueryClient();
  return useMutation<
    Message_RemoveConversationMutation,
    any,
    Message_RemoveMessageMutationVariables
  >(
    async messageId => {
      return fetcher<
        Message_RemoveConversationMutation,
        Message_RemoveMessageMutationVariables
      >(DELETE_MESSAGE, {
        messageId,
      })();
    },
    {
      onSuccess: data => {
        if (data.message_deleteMessage?.status.value === 'Success') {
          queryClient.invalidateQueries('messages');
          queryClient.invalidateQueries('conversations');
        }
      },
      onError: error => {},
    },
  );
};

export const useDeleteConversation = () => {
  const queryClient = useQueryClient();
  return useMutation<
    Message_RemoveMessageMutation,
    any,
    Message_RemoveConversationMutationVariables
  >(
    async conversationId => {
      return fetcher<
        Message_RemoveMessageMutation,
        Message_RemoveConversationMutationVariables
      >(REMOVE_CONVERSATIONS, {
        conversationId,
      })();
    },
    {
      onSuccess: data => {
        if (data.message_removeConversation?.status.value === 'Success') {
          //snackBar(messageHelper('Success'));
          queryClient.invalidateQueries('conversations');
          queryClient.invalidateQueries('messages');
          queryClient.invalidateQueries('getUserMessages');
        } else {
          snackBar(
            messageHelper(data.message_removeConversation?.status.value),
          );
        }
      },
      onError: err => {
        showMessage({message: JSON.stringify(err)});
      },
    },
  );
};
export const useGetUser = ({userId}) => {
  const res = useQuery(['geReceiverProfile'], async () => {
    return fetcher<any, any>(RECEIVER_PROFILE, {userId})();
  });

  return {...res, route: res?.data?.user_getUser?.result};
};
export const useGetConversationForUser = (otherUserId: number) => {
  const res = useQuery(['getConversationForUser', otherUserId], async () => {
    return fetcher<any, any>(GET_CONVERSATION_FOR_USER, {
      otherUserId,
    })();
  });
  return {...res, route: res?.data?.message_getConversationForUser?.result};
};

export const useManuallyGetConversationForUser = (otherUserId: number) => {
  const res = useQuery(
    ['getConversationForUser'],
    async () => {
      return fetcher<any, any>(GET_CONVERSATION_FOR_USER, {
        otherUserId,
      })();
    },
    {
      enabled: false,
    },
  );
  return {...res, route: res?.data?.message_getConversationForUser?.result};
};

export const useGetConversationIdForUser = (
  recieverId: number,
  where: any,
  options: any,
) => {
  return useQuery<string>(
    [queryKeys.getUserMessages, recieverId, where],
    async () => {
      return fetcher<any, any>(GET_CONVERSATION_ID_FOR_USER, {
        where,
      })();
    },
    {
      enabled: !!recieverId,
      ...options,
    },
  );
};

export const useGetConversationIdForUserForward = (
  recieverId: number,
  where: any,
  options: any,
) => {
  return useQuery<string>(
    [queryKeys.getForwardConversation, recieverId],
    async () => {
      return fetcher<any, any>(GET_CONVERSATION_ID_FOR_USER, {
        where,
      })();
    },
    {
      enabled: !!recieverId,
      ...options,
    },
  );
};

export const useForwardPost = () => {
  const queryClient = useQueryClient();
  return useMutation<
    Message_ForwardPostInConversationMutation,
    any,
    Message_ForwardPostInConversationMutationVariables
  >(
    async input => {
      return fetcher<
        Message_ForwardPostInConversationMutation,
        Message_ForwardPostInConversationMutationVariables
      >(FORWARD_POST, {input})();
    },
    {
      onSuccess: data => {
        if (
          data.message_forwardPostInConversation?.status.value === 'Success'
        ) {
          queryClient.invalidateQueries('messages');
          queryClient.invalidateQueries('conversations');
          queryClient.invalidateQueries('getUserMessages');
          queryClient.invalidateQueries('getUserMessages');
        } else {
          showMessage({
            message: data.message_forwardPostInConversation?.status.value,
            type: 'danger',
          });
        }
      },
    },
  );
};

export const useForwardTopicPost = () => {
  const queryClient = useQueryClient();
  return useMutation<
    Message_ForwardTopicPostInConversationMutation,
    any,
    Message_ForwardTopicPostInConversationMutationVariables
  >(
    async input => {
      return fetcher<
        Message_ForwardTopicPostInConversationMutation,
        Message_ForwardTopicPostInConversationMutationVariables
      >(FORWARD_TOPIC_POST, {input})();
    },
    {
      onSuccess: data => {
        if (
          data.message_forwardTopicPostInConversation?.status.value ===
          'Success'
        ) {
          queryClient.invalidateQueries('messages');
          queryClient.invalidateQueries('conversations');
          queryClient.invalidateQueries('getUserMessages');
          queryClient.invalidateQueries('getUserMessages');
        } else {
          showMessage({
            message: data.message_forwardTopicPostInConversation?.status.value,
            type: 'danger',
          });
        }
      },
    },
  );
};
