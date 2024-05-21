import {gql} from 'graphql-request';

export const DELETE_MESSAGE = gql`
  mutation message_deleteMessage($messageId: Int!) {
    message_deleteMessage(messageId: $messageId) {
      status
    }
  }
`;

export const REMOVE_CONVERSATIONS = gql`
  mutation message_removeConversation($conversationId: Int!) {
    message_removeConversation(conversationId: $conversationId) {
      status
    }
  }
`;

export const CREATE_MESSAGE = gql`
  mutation message_createMessage($messageInput: MessageInput) {
    message_createMessage(messageInput: $messageInput) {
      result {
        id
        createdAt
        text
        messageType
        photoUrl
        senderId
        conversationId
      }
      status
    }
  }
`;

export const FORWARD_POST = gql`
  mutation message_forwardPostInConversation($input: ForwardPostInput) {
    message_forwardPostInConversation(input: $input) {
      result {
        id
      }
      status
    }
  }
`;

export const FORWARD_TOPIC_POST = gql`
  mutation message_forwardTopicPostInConversation(
    $input: ForwardTopicPostInput
  ) {
    message_forwardTopicPostInConversation(input: $input) {
      result {
        id
      }
      status
    }
  }
`;
