import {isIos} from '~/utils/helper';

export const IOS_PACKAGE_NAME = 'io.apsy.vincho';
export const ANDROID_PACKAGE_NAME = 'com.vincho';
export const APP_URL = 'https://vincho.com';

export const packageName = isIos ? IOS_PACKAGE_NAME : ANDROID_PACKAGE_NAME;
