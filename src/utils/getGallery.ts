import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {requestGalleryPermission} from '~/utils/userPermission';
import snackBar from '~/utils/snackBar';
import {messageHelper} from '~/utils/messageHelper';
import {Colors} from '~/styles/colors';

export async function getGallery(setAlbum: any) {
  if (await requestGalleryPermission()) {
    CameraRoll.getPhotos({
      first: 20,
      assetType: 'All',
    })
      .then(r => {
        setAlbum(r.edges);
      })

      .catch(err => {
        console.error(err);
        snackBar({message: err?.message, color: Colors.error});
      });
  }
}

export async function getTopicGallery(setAlbum: any) {
  if (await requestGalleryPermission()) {
    CameraRoll.getPhotos({
      first: 20,
      assetType: 'All',
    })
      .then(r => {
        setAlbum(r.edges);
      })

      .catch(err => {
        console.error(err);
        snackBar({
          message: err?.message || 'Some Error occurred!',
          color: Colors.error,
        });
      });
  }
}
