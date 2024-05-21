import {formats} from '~/@types/global';

export const getFileExtension = (fileUrl: string): string => {
  const imageExtension = ['png', 'jpg', 'jpeg', 'bmp', 'gif', 'webp', 'psd'];
  const videoExtension = [
    'mp4',
    'm4a',
    'fmp4',
    'flv',
    'mkv',
    'mov',
    'wmv',
    'avi',
    'avchd',
    'f4v',
    'swf',
  ];

  if (fileUrl) {
    const fileExtension = fileUrl?.slice(
      (Math.max(0, fileUrl.lastIndexOf('.')) || Infinity) + 1,
    );

    if (imageExtension.includes(fileExtension.toLowerCase())) {
      return formats.Image;
    } else if (videoExtension.includes(fileExtension.toLowerCase())) {
      return formats.Video;
    } else {
      return formats.None;
    }
  } else {
    return formats.None;
  }
};

export const getGalleryFileExtension = (fileExtension: string): string => {
  const imageExtension = ['png', 'jpg', 'jpeg', 'bmp', 'gif', 'webp', 'psd'];
  const videoExtension = [
    'mp4',
    'm4a',
    'fmp4',
    'flv',
    'mkv',
    'mov',
    'wmv',
    'avi',
    'avchd',
    'f4v',
    'swf',
  ];

  if (fileExtension) {
    if (imageExtension.includes(fileExtension.toLowerCase())) {
      return formats.Image;
    } else if (videoExtension.includes(fileExtension.toLowerCase())) {
      return formats.Video;
    } else {
      return formats.None;
    }
  } else {
    return formats.None;
  }
};
