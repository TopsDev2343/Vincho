export type FirebaseToken = {
  aud: string;
  exp: number;
  iat: number;
  iss: string;
  sub: string;
  email: string;
  user_id: string;
  auth_time: number;
  email_verified: boolean;
  firebase: {
    identities: {email?: Array<string>};
    sign_in_provider: 'password' | string;
  };
};
