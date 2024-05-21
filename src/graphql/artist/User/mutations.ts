import {gql} from 'graphql-request';

export const USER_UPDATE_PROFILE = gql`
  mutation user_updateProfile($userInput: UserInput) {
    user_updateProfile(userInput: $userInput) {
      result {
        userName
        photoUrl
        fullName
        location {
          coordinates
        }
        aboutText
        userType
        isActive
        phoneNumber
        externalId
        email
        id
        isDeleted
        createdDate
        lastModifiedDate
      }
      status
    }
  }
`;

export const REPORT_USER = gql`
  mutation reportUser_createReportUser($input: ReportUserInput) {
    reportUser_createReportUser(input: $input) {
      result {
        violationType
        description
        reporterUserId
        reportedUserId
        id
      }
      status
    }
  }
`;

export const USER_CHANGENOTIFICATION = gql`
  mutation user_changeNotificationDetail(
    $userInput: UserNotificationDetailInput
  ) {
    user_changeNotificationDetail(userInput: $userInput) {
      result {
        id
      }
      status
    }
  }
`;
