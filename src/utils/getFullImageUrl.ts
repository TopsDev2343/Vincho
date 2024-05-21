import config from 'react-native-config';
export function getFullImageUrl(url?: string) {
    if (url?.includes?.(config.FILE_URL)) {
        return url;
    }
    return url && `${config.FILE_URL}/${url}`;
}
