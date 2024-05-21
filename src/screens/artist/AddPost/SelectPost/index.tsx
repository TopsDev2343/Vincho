import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import {scale} from 'react-native-size-matters';

import {Colors} from '~/styles/colors';
import {CustomContainer, AddPostGalleryList, PostPreview} from '~/components';
import {BackButton} from '~/components';
import {Fonts} from '~/styles/fonts';
import {Strings} from '~/assets/strings/index';
import {getGallery} from '~/utils/getGallery';
import {goBack, replace} from '~/navigation/methods';
import {formats} from '~/@types/global';
import {imageCropper} from '~/utils/imageCropper';
import ImagePicker from 'react-native-image-crop-picker';
import {getFileExtension} from '~/utils/getFileExtension';
import {windowHeight, windowWidth} from '~/styles/globalStyles';
import {Toast} from 'native-base';
import {cameraOptions} from '~/utils/cameraOptions';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import * as RNFS from 'react-native-fs';
import snackBar from '~/utils/snackBar';
import {messageHelper} from '~/utils/messageHelper';
import {packageName} from '~/constants/contants';

const SelectPost = ({route}: {route: any}) => {
  const [album, setAlbum] = useState<object[]>([]);
  const [selectedImg, setSelectedImg] = useState<object>({
    uri: '',
    type: '',
    imagePicker: null,
  });
  async function setImage(element: any) {
    return await new Promise(async (resolve, reject) => {
      await CameraRoll.iosGetImageDataById(
        element?.node?.image.uri,
        false,
      ).then(res => {
        let obj = {
          uri: res.node?.image?.filepath,
          width: res.node?.image?.width,
          height: res.node?.image?.height,
          type: res.node?.type.split('/')[0],
          imagePicker: {
            path: res.node?.image?.filepath,
            mime: `${res.node?.type}/${res.node?.image?.filename
              ?.split('.')
              .pop()}`,
            filename: res.node?.image?.filename,
          },
        };
        resolve(obj);
      });
    });
  }

  async function setVideo(element: any) {
    return new Promise(async (resolve, reject) => {
      const videoPath =
        element?.node?.image?.uri + element?.node?.image?.filename;
      const destPath = `${
        RNFS.TemporaryDirectoryPath
      }${packageName}videos/${Math.random().toString(36)}.mp4`;

      RNFS.copyAssetsVideoIOS(videoPath.replace(' ', ''), destPath)
        .then(res => {
          let tempName = res.split('/').pop().split('#')[0].split('?')[0];
          let obj = {
            uri: res,
            width: element.node?.image?.width,
            height: element.node?.image?.height,
            type: 'video',
            imagePicker: {
              path: res,
              mime: 'video/mp4',
              filename: tempName,
            },
          };
          resolve(obj);
        })
        .catch(err => {});
    });
  }

  async function setAlbumItems(value: any) {
    let albumItems = [];
    var p = Promise.resolve();
    value.forEach(element => {
      if (element?.node?.type == 'image') {
        p = setImage(element).then(result => {
          albumItems.push(result);
        });
      } else if (element?.node?.type == 'video') {
        p = setVideo(element).then(result => {
          albumItems.push(result);
        });
      }
    });
    p.then(() => {
      setAlbum(albumItems);
      setSelectedPost({
        uri: albumItems[0]?.uri,
        width: albumItems[0]?.width,
        height: albumItems[0]?.height,
        type: albumItems[0]?.type,
        imagePicker: {
          path: albumItems[0]?.uri,
          mime: `${albumItems[0]?.type}/${albumItems[0]?.imagePicker?.filename
            ?.split('.')
            .pop()}`,
          filename: albumItems[0]?.imagePicker?.filename,
        },
      });
    });
  }

  async function setAlbumItemsAndroid(value: any) {
    let albumItems = [];
    value.forEach(element => {
      const result = {
        uri: element.node?.image?.uri,
        width: element.node?.image?.width,
        height: element.node?.image?.height,
        type: element.node?.type.split('/')[0],
        imagePicker: {
          path: element.node?.image?.uri,
          mime: element.node?.type,
          filename: element.node?.image?.filename,
        },
      };

      albumItems.push(result);
    });

    setAlbum(albumItems);
    setSelectedPost({
      uri: albumItems[0]?.uri,
      width: albumItems[0]?.width,
      height: albumItems[0]?.height,
      type: albumItems[0]?.type,
      imagePicker: {
        path: albumItems[0]?.uri,
        mime: albumItems[0]?.imagePicker?.mime,
        filename: albumItems[0]?.imagePicker?.filename,
      },
    });
  }
  async function setAlbumList(value: object[]) {
    if (Platform.OS === 'ios') {
      await setAlbumItems(value);
    } else {
      await setAlbumItemsAndroid(value);
    }
  }

  useEffect(() => {
    RNFS.exists(RNFS.TemporaryDirectoryPath + packageName).then(res => {
      if (res == false) {
        RNFS.mkdir(RNFS.TemporaryDirectoryPath + packageName);
      }
    });
    RNFS.exists(RNFS.TemporaryDirectoryPath + packageName + 'videos').then(
      res => {
        if (res == false) {
          RNFS.mkdir(RNFS.TemporaryDirectoryPath + packageName + 'videos');
        }
      },
    );
    getGallery(setAlbumList);
  }, []);

  function setSelectedPost(value: object) {
    setSelectedImg(value);
  }

  async function onSendPostPressed() {
    if (Platform.OS == 'ios' && selectedImg?.type === formats.Image) {
      try {
        const imagePicker = await ImagePicker.openCropper({
          path: selectedImg?.uri,
          // width: selectedImg.width,
          //height: selectedImg.height,
          width: windowWidth,
          height: windowHeight - windowHeight * 0.26,
          mediaType: 'photo',
          //freeStyleCropEnabled: true,
          //showCropFrame: true,
          showCropGuidelines: true,
        });
        let value = {
          uri: imagePicker.path,
          type: getFileExtension(imagePicker.path),
          imagePicker: imagePicker,
        };
        replace('SendPostScreen', {selectedPost: value});
      } catch (err) {}
    } else {
      replace('SendPostScreen', {selectedPost: selectedImg});
    }
  }

  async function openGallery() {
    try {
      const imagePicker = await ImagePicker.openPicker({
        width: windowWidth,
        height: windowWidth,
        mediaType: 'any',
      })
        .then(res => {
          let value = {
            uri:
              Platform.OS == 'ios'
                ? res?.path.replace('file://', '')
                : res?.path,
            type: res?.mime.split('/')[0],
            width: res?.width,
            height: res?.height,
            imagePicker: {
              path:
                Platform.OS == 'ios'
                  ? res?.path.replace('file://', '')
                  : res?.path,
              mime: res?.mime,
              filename: res?.filename,
            },
          };
          setSelectedPost(value);
        })
        .catch(err => {});
    } catch (err) {}
  }

  async function hasAndroidPermissionCamera() {
    const permission = PermissionsAndroid.PERMISSIONS.CAMERA;
    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }
    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  }
  async function onPressOpenCamera() {
    if (Platform.OS === 'android' && !(await hasAndroidPermissionCamera())) {
      Toast.show({
        description: 'User did not grant camera permission',
        placement: 'top',
      });
      return;
    }
    ImagePicker.openCamera(cameraOptions)
      .then((res: any) => {
        let uri = res?.path;
        let tempName = uri.split('/').pop().split('#')[0].split('?')[0];
        uri = uri?.replace('file://', '');
        let value = {
          uri: Platform.OS == 'ios' ? uri.replace('file://', '') : uri,
          type: res?.mime.split('/')[0],
          width: res?.width,
          height: res?.height,
          imagePicker: {
            path: Platform.OS == 'ios' ? uri.replace('file://', '') : uri,
            mime: res?.mime,
            filename: tempName,
          },
        };
        setSelectedPost(value);

        let postValue = {
          uri: value.imagePicker.path,
          type: getFileExtension(value.imagePicker.path),
          imagePicker: value.imagePicker,
        };
        replace('SendPostScreen', {selectedPost: postValue});
      })
      .catch(x => {
        //Toast.show({description: x.message, placement: 'top'});
      });
  }

  function clearTemp() {
    RNFS.exists(RNFS.TemporaryDirectoryPath + packageName + '/videos').then(
      res => {
        if (res == true) {
          RNFS.unlink(RNFS.TemporaryDirectoryPath + packageName + '/videos');
        }
      },
    );
  }

  function onBackPressed() {
    clearTemp();
    goBack();
  }
  return (
    <CustomContainer isLoading={false}>
      <View style={styles.nextBtnContainer}>
        <BackButton
          isModal={true}
          modalOnClose={() => {
            onBackPressed();
          }}
        />
        <Text
          style={styles.nextBtn}
          onPress={() => {
            onSendPostPressed();
          }}>
          {Strings.next.toUpperCase()}
        </Text>
      </View>

      <PostPreview selectedImg={selectedImg} />
      <View style={styles.galleryContainer}>
        <Text
          style={styles.galleryBtn}
          onPress={() => {
            openGallery();
          }}>
          {Strings.showGallery}
        </Text>
        {selectedImg?.type === formats.Image && (
          <TouchableOpacity
            onPress={() => imageCropper(setSelectedPost, selectedImg?.uri)}>
            <Text style={styles.galleryBtn}>{'Edit'}</Text>
          </TouchableOpacity>
        )}
      </View>

      {album?.length !== 0 ? (
        <AddPostGalleryList
          album={album}
          setSelectedPost={setSelectedPost}
          openGallery={() => {
            openGallery();
          }}
          openCamera={() => {
            onPressOpenCamera();
          }}
        />
      ) : null}
    </CustomContainer>
  );
};

export default SelectPost;

const styles = StyleSheet.create({
  nextBtnContainer: {
    marginTop: scale(12),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nextBtn: {
    color: Colors.primary,
    ...Fonts.smallReg,
    marginRight: scale(24),
  },
  galleryBtn: {
    color: Colors.primary,
    ...Fonts.smallReg,
    marginVertical: scale(8),
  },
  galleryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: scale(24),
  },
});
