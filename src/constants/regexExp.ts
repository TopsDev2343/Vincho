export const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([1-9]{2,3}\\)[ \\-]*)|([1-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
export const englishLanPattern =
  /^[~`!@#$%^&*()_+=[\]\{}|;':",.\/<>?a-zA-Z0-9\s]+$/;
export const onlyEnglishAlphabet = /^[^-\s][a-zA-Z_ ]+$/;

//export const hashtagRegExp = /(^|\B)#(?![0-9_]+\b)([a-zA-Z0-9_]{1,30})(\b|\r)/g;
export const hashtagRegExp = /#[a-zA-Z0-9_]+/;
export const TopicRegExp = /[a-zA-Z0-9_]+/;
