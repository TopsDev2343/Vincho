import {noImageUrl} from '~/constants/image';
import type {Maybe} from '~/generated/graphql';

export const getImageUrl = (fileName: Maybe<string> | undefined) => {
  if (fileName?.startsWith('http://') || fileName?.startsWith('https://')) {
    return fileName;
  }

  if (fileName) {
    // return 'https://apsvinchostorage.blob.core.windows.net/images/' + fileName;
    return 'https://apsyvinchocdn.azureedge.net/images/' + fileName;
  } else {
    return noImageUrl;
  }
};
