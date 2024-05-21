import Share from 'react-native-share';
import {Strings} from '~/assets/strings';

export const shareWithSocial = async (url: string, caption: string) => {
  //appstor link would probably be: https://apps.apple.com/us/app/vincho/id1641757490
  const options = {
    title: caption,
    message:
      'Hey there! Check out this cool new app Vincho! We can create and share our art to meet like-minded people there! We can also swipe to collect each other’s art and… So many possibilities to be discovered! Let’s try Vincho together! Who knows? Your next swipe might just bring you soulmate…',
    url: url,
    failOnCancel: false,
  };
  await Share.open(options);
};

export const shareReferralCode = async (url: string, referralCode: string) => {
  //appstor link would probably be: https://apps.apple.com/us/app/vincho/id1641757490
  const options = {
    title: 'Share Referral Code',
    message: `${Strings.referralTxt1} ${referralCode} ${Strings.referralTxt2} `,
    url: url,
    failOnCancel: false,
  };
  await Share.open(options);
};
