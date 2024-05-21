import {Colors} from '../styles/colors';

export const messageHelper = (message: string) => {
  switch (message) {
    //Backend errors
    case 'Success':
      return {message: 'Successfully done.', color: Colors.success};
    case 'AuthenticationFailed':
      return {message: 'Authentication Failed.', color: Colors.error};
    case 'UserIsNotActive':
      return {message: 'This user has been disbaled.', color: Colors.error};
    case 'NotFound':
      return {message: 'Not Found.', color: Colors.error};
    case 'UnknownError':
      return {message: 'Unknown Error.', color: Colors.error};
    case 'NotEnoghData':
      return {message: 'Not Enough Data.', color: Colors.error};
    case 'Failed':
      return {message: 'Failed.', color: Colors.error};
    case 'UserNotFound':
      return {message: 'User Not Found.', color: Colors.error};
    case 'AlreadyExists':
      return {message: 'Already Exists.', color: Colors.error};
    case 'AlreadyRemoved':
      return {message: 'Already Removed.', color: Colors.error};
    case 'NotAllowd':
      return {message: 'Not Allowed.', color: Colors.error};
    case 'NotAllowd':
      return {message: 'Not Allowed.', color: Colors.error};
    case 'TimeConflict':
      return {message: 'Time Conflict.', color: Colors.error};
    case 'SessionNotFound':
      return {message: 'Session Not Found.', color: Colors.error};
    case 'HostNotFound':
      return {message: 'Host Not Found.', color: Colors.error};
    case 'StripeAccountNotExist':
      return {
        message: 'Stripe Account Not Exist.',
        color: Colors.error,
      };
    case 'PaymentFailed':
      return {message: 'Payment Failed.', color: Colors.error};
    case 'FailedToWidthraw':
      return {message: 'Failed To Widthraw.', color: Colors.error};
    case 'SelfFollowingNotAllowed':
      return {
        message: 'Self Following Not Allowed.',
        color: Colors.error,
      };
    case 'AlreadyFollowed':
      return {message: 'Already Followed.', color: Colors.error};
    case 'InvalidTimeSyntax':
      return {message: 'Invalid Time Syntax.', color: Colors.error};
    case 'InvalidTimeRange':
      return {message: 'Invalid Time Range.', color: Colors.error};
    case 'DiffrenttIds':
      return {message: 'Different Ids.', color: Colors.error};
    case 'HasRelatedData':
      return {message: 'This comment has some replies!', color: Colors.error};

    //My Errors

    case 'SomeError':
      return {message: 'Some Error occurred!', color: Colors.error};
    case 'ChooseOnlyTwo':
      return {
        message: 'You can choose only two categories!',
        color: Colors.error,
      };
    case 'AddDescription':
      return {message: 'Please add a description!', color: Colors.error};
    case 'SelectMedia':
      return {
        message: 'Please select an image or a video!',
        color: Colors.error,
      };
    case 'SelectCategory':
      return {
        message: 'Please Select at list one category!',
        color: Colors.error,
      };
    case 'EmailSent':
      return {
        message: 'Email sent successfully.',
        color: Colors.success,
      };
    case 'Copied':
      return {
        message: 'Copied successfully.',
        color: Colors.success,
      };
    case 'FileTooBig':
      return {message: 'File is too big!', color: Colors.error};

    //Firebase errors

    case 'auth/email-already-in-use':
      return {
        message: 'The email address is already in use by another account.',
        color: Colors.error,
      };
    case 'auth/id-token-expired':
      return {
        message: 'The provided Firebase ID token is expired.',
        color: Colors.error,
      };
    case 'auth/id-token-revoked':
      return {
        message: 'The Firebase ID token has been revoked.',
        color: Colors.error,
      };
    case 'auth/internal-error':
      return {
        message:
          'The Authentication server encountered an unexpected error while trying to process the request. ',
        color: Colors.error,
      };
    case 'auth/user-not-found':
      return {
        message: 'No user found with this email.',
        color: Colors.error,
      };
    case 'auth/wrong-password':
      return {
        message: 'Email or password is wrong.',
        color: Colors.error,
      };
    case 'auth/invalid-email':
      return {
        message: 'The email address is badly formatted.',
        color: Colors.error,
      };
    case 'auth/internal-error':
      return {
        message: 'An internal AuthError has occurred.',
        color: Colors.error,
      };
    case 'auth/weak-password':
      return {
        message: 'The password must be 6 characters long or more.',
        color: Colors.error,
      };
    case 'auth/network-request-failed':
      return {
        message: 'There is a problem with your network connection.',
        color: Colors.error,
      };
    case 'AddTopicName':
      return {message: 'Please add a name!', color: Colors.error};
    case 'AddTopicDescription':
      return {message: 'Please add a description!', color: Colors.error};
    case 'InvalidReferral':
      return {message: 'Invalid Referral Code!', color: Colors.error};
    default:
      return {message: 'Unknown error!', color: Colors.error};
  }
};
