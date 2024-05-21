import {useMutation} from 'react-query';
import snackBar from '~/utils/snackBar';
import {fileUploader} from '~/services/fileUploader';
import {Colors} from '~/styles/colors';

export const useUploadFile = () => {
  return useMutation(
    async (param: any) => {
      return fileUploader(param);
    },
    {
      onError: errorData => {
        snackBar({message: errorData?.message, color: Colors.error});
      },
    },
  );
};

export function getFullImageUrl(url?: string) {
  if (url?.startsWith('https') || url?.startsWith('http')) {
    return url;
  }
  return (
    //url && `${'https://apsvinchostorage.blob.core.windows.net'}/images/${url}`
    url && `${'https://apsyvinchocdn.azureedge.net'}/images/${url}`
  );
}
