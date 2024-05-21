import {gql} from 'graphql-request';

export const READ_NOTIFICATIONS = gql`
  mutation notification_readAllNotifications {
    notification_readAllNotifications {
      status
    }
  }
`;
