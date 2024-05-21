import {useEffect} from 'react';
import {
  MESSAGE_ADDED,
  NOTIFICATION_ADDED,
} from '~/graphql/artist/Notification/subscriptions';
import {Config} from 'react-native-config';

export const useNotificationSubscription = ({
  userId,
  callback,
}: {
  userId: number;
  callback: (data: any) => void;
}) => {
  useEffect(() => {
    const ws = new WebSocket(Config.API_URL, 'graphql-ws');
    ws.onopen = () => {
      const notification = {
        id: '1',
        type: 'start',
        payload: {
          variables: {userId: userId},
          extensions: {},
          operationName: null,
          query: NOTIFICATION_ADDED,
        },
      };
      ws.send(JSON.stringify(notification));
    };
    ws.onmessage = callback;
    return () => {
      // Unsubscribe before exit
      ws.send(JSON.stringify({id: '1', type: 'stop'}));
      ws.close();
    };
  }, []);
};

export const useMessageSubscription = ({
  userId,
  callback,
}: {
  userId: number;
  callback: (data: any) => void;
}) => {
  useEffect(() => {
    const ws = new WebSocket(Config.API_URL, 'graphql-ws');
    ws.onopen = () => {
      const notificationMessage = {
        id: '1',
        type: 'start',
        payload: {
          variables: {userId: userId},
          extensions: {},
          operationName: null,
          query: MESSAGE_ADDED,
        },
      };
      ws.send(JSON.stringify(notificationMessage));
    };
    ws.onmessage = callback;
    return () => {
      // Unsubscribe before exit
      ws.send(JSON.stringify({id: '1', type: 'stop'}));
      ws.close();
    };
  }, []);
};
