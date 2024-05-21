import React, {useCallback, useEffect, useState} from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import DocumentPicker, {types} from 'react-native-document-picker';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  PermissionsAndroid,
  Platform,
  ImageBackground,
} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import ModalContainer from '../ModalContainer';
import {imagePickerOption, cameraOptions} from '~/utils/cameraOptions';
import {Colors} from '~/styles/colors';
import {Image, Toast, View as NativeBaseView} from 'native-base';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {width, height} from '~/utils/dimension';
import {SvgXml} from 'react-native-svg';
import {exploreOutline} from '~/assets/icons';
import {eclipse} from '~/assets/images';
import {BlurView} from '@react-native-community/blur';
import * as RNFS from 'react-native-fs';
import {getFileExtension} from '~/utils/getFileExtension';
import {formats} from '~/@types/global';
import RNConvertPhAsset from 'react-native-convert-ph-asset';
import {NativeModules} from 'react-native';
import snackBar from '~/utils/snackBar';

const AttachmentModal = ({
  visible,
  onClose,
  onSelectFile,
}: {
  visible: boolean;
  onClose: any;
  onSelectFile: any;
}) => {
  const onCloseHandler = () => {
    onClose?.();
  };

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
      .then((image: any) => {
        onClose?.();
        selectFile(image, 'IMAGE');
      })
      .catch(x => {
        //Toast.show({description: x.message, placement: 'top'});
      });
  }

  async function convertIosVideo(param: any) {
    return new Promise(async (resolve, reject) => {
      try {
        let uri = param?.path;
        RNConvertPhAsset.convertVideoFromUrl({
          url: uri,
          convertTo: 'mpeg4',
          quality: 'high',
        })
          .then(response => {
            resolve({response: response});
          })
          .catch(err => {});
      } catch (error) {
        reject({uri: ''});
      }
    });
  }
  const onPressGalleryPhoto = () => {
    ImagePicker.openPicker(imagePickerOption)
      // @ts-ignore
      .then(async (image, type) => {
        if (image.filename != null) {
          image.filename = image.filename.replace(' ', '');
        }
        if (
          Platform.OS == 'ios' &&
          getFileExtension(image?.filename) == formats.Video
        ) {
          if (String(image.path).startsWith('ph://')) {
            await convertIosVideo(image)
              .then(res => {
                image.path = res.response.path;
                image.mime = res.response.mimeType;
                image.filename = res.response.filename;
              })
              .catch(err => {});
          } else if (String(image.path).startsWith('assets-library://')) {
            image.path = image.path.replace('assets-library://', 'file://');
          }
          if (image.mime == '') {
            image.mime = 'video/mp4';
          }
          image.path = image.path.replace('file:///', 'file://');

          let uri = image?.path;
          let tempName = uri.split('/').pop().split('#')[0].split('?')[0];
          image.filename = tempName;
        }

        selectFile(image, image?.mime == 'video/mp4' ? 'VIDEO' : 'IMAGE');
        onClose?.();
      })
      .catch(err => {
        snackBar({
          message: err?.message || 'Some Error occurred!',
          color: Colors.error,
        });
      })
      .finally(onClose);
  };

  const onPressGalleryAudio = () => {
    DocumentPicker.pickSingle({
      type: types.audio,
      copyTo: 'documentDirectory',
    })
      .then(async file => {
        if (file?.type?.split('/')[0] === 'audio') {
          var tempAudio = unescape(
            file.fileCopyUri?.replace('file:///', 'file://'),
          );
          var tempAudio = decodeURI(tempAudio);

          const audio = {
            mime: 'audio/mp4',
            path: tempAudio,
            fileName: null,
            size: file?.size,
          };

          selectFile?.(audio, audio?.mime);
          onClose?.();
        }
      })
      .finally(onClose);
  };

  const onPressDocument = () => {
    DocumentPicker.pick({
      type: types.pdf,
    })
      .then(file => {
        if (file?.[0]?.type === 'application/pdf') {
          const tempPdf = file?.[0];
          const pdf = {
            mime: 'application/pdf',
            path: tempPdf?.uri.replace('file:///', 'file://'),
            fileName: tempPdf?.name,
            size: tempPdf?.size,
          };
          selectFile?.(pdf, 'PDF');
          onClose?.();
        }
      })
      .finally(onClose);
  };

  const selectFile = (file: any, type: string) => {
    //setImageModalVisible(false);
    onSelectFile?.(file, type);
  };

  const buttonData = [
    {name: 'GALLERY', onPressMethod: onPressGalleryPhoto},
    {name: 'FILE', onPressMethod: onPressDocument},
    {name: 'MUSIC', onPressMethod: onPressGalleryAudio},
    {name: 'CAMERA', onPressMethod: onPressOpenCamera},
  ];

  const [photoes, setPhotoes] = useState(null);
  async function hasAndroidPermission() {
    const permission =
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE ||
      PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES;
    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }
    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  }

  useEffect(() => {
    getPhotos();
  }, []);
  async function getPhotos() {
    if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
      return;
    }
    CameraRoll.getPhotos({first: 8, assetType: 'Photos'}).then(
      data => {
        const assets = data.edges;
        const images = assets.map(asset => asset.node.image);
        let array = [{uri: ''}];
        images.forEach(element => {
          array.push(element);
        });
        setPhotoes(array);
        // setPhotoes(images);
      },
      error => {
        console.warn(error);
        snackBar({
          message: err?.message || 'Some Error occurred!',
          color: Colors.error,
        });
      },
    );
  }

  async function onImagePressed(item: any) {
    const imagePath = `${
      RNFS.DocumentDirectoryPath
    }/${new Date().toISOString()}.jpg`.replace(/:/g, '-');

    RNFS.copyAssetsFileIOS(item.uri, imagePath, 0, 0)
      .then(res => {
        onSelectFile?.({path: res, mime: 'image/jpeg'}, 'IMAGE');
        onClose?.();
      })
      .catch(err => {});
  }

  const renderItem = useCallback(({item, index}) => {
    if (index == 0) {
      return (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onPressOpenCamera}
          style={{
            width: width / 3.5,
            height: width / 3.5 + 10,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgb(79,85,103)',
            margin: 1,
          }}>
          <NativeBaseView
            width={verticalScale(60)}
            height={verticalScale(60)}
            justifyContent={'center'}
            alignItems={'center'}>
            <ImageBackground
              resizeMode="contain"
              source={eclipse}
              style={{
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <NativeBaseView
                backgroundColor={'rgba(255,255,255,0.3)'}
                width={2}
                height={2}
                borderRadius={10}
                position={'absolute'}
                left={'30%'}
                top={'13%'}
                zIndex={10}
              />
              <NativeBaseView
                borderRadius={100}
                justifyContent={'center'}
                alignItems={'center'}
                backgroundColor={'rgb(71,54,75)'}
                width={verticalScale(40)}
                height={verticalScale(40)}
                borderWidth={1}
                borderColor={'rgba(255,255,255,0.3)'}>
                <SvgXml
                  width={verticalScale(22)}
                  height={verticalScale(22)}
                  xml={exploreOutline}
                />
              </NativeBaseView>
            </ImageBackground>
          </NativeBaseView>
        </TouchableOpacity>
      );
    }
    return (
      <View style={{margin: 1}}>
        <TouchableOpacity
          onPress={() => {
            onImagePressed(item);
          }}>
          <Image
            source={{uri: item.uri}}
            alt={'image'}
            style={{width: width / 3.5, height: width / 3.5 + 10}}
          />
        </TouchableOpacity>
      </View>
    );
  }, []);

  return (
    <>
      <ModalContainer
        isVisible={visible}
        onClose={onCloseHandler}
        justify={'flex-end'}
        backdropColor={'transparent'}
        backgroundColor={'transparent'}
        style={styles.modalContainer}>
        <BlurView
          blurType="dark"
          blurRadius={25}
          blurAmount={25}
          style={{
            borderRadius: 42,
          }}
          reducedTransparencyFallbackColor="transparent">
          <View style={styles.rowContainer}>
            <FlatList
              style={styles.buttonFlatList}
              contentContainerStyle={styles.buttonsFlatListContianer}
              data={photoes ?? []}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderItem}
              numColumns={3}
            />

            <FlatList
              horizontal={true}
              style={{height: verticalScale(10), flex: 1}}
              renderItem={({item}) => (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={item.onPressMethod}
                  style={[styles.modalItem]}>
                  <Text style={styles.modalItemText}>{item.name}</Text>
                </TouchableOpacity>
              )}
              data={buttonData}
              keyExtractor={(_, index) => `key${index}`}
            />
          </View>
        </BlurView>
      </ModalContainer>
    </>
  );
};

export default AttachmentModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainerStyle: {
    flexGrow: 1,
  },
  content: {
    paddingHorizontal: scale(32),
  },
  Chat: {
    backgroundColor: 'yellow',
    height: '100%',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: scale(32),
    paddingVertical: verticalScale(8),
  },
  icon: {
    backgroundColor: 'red',
    borderRadius: 100,
    padding: 2,
  },
  separate: {
    height: verticalScale(16),
  },
  modalContainer: {
    marginBottom: 0,
    marginHorizontal: scale(32),
    maxHeight: height / 1.2,
    width: '100%',
    alignSelf: 'center',
    borderTopLeftRadius: 42,
    borderTopRightRadius: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bellow: {
    borderTopLeftRadius: 42,
    borderTopRightRadius: 42,
    backgroundColor: 'transparent',
    maxHeight: verticalScale(134),
    width: '98%',
    position: 'absolute',
    bottom: -2,
  },
  rowContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.transparent,
    alignItems: 'center',
    paddingHorizontal: scale(8),
    borderTopLeftRadius: 42,
    borderTopRightRadius: 42,
    paddingTop: verticalScale(30),
  },
  modalItemText: {
    fontFamily: 'Helvetica',
    fontSize: 14,
    alignSelf: 'center',
    color: Colors.cleanWhite,
  },

  modalItem: {
    width: scale(90),
    height: scale(90),
    alignItems: 'center',
    borderRadius: 100,
    marginHorizontal: scale(9),
    justifyContent: 'center',
    backgroundColor: Colors.attachmentButton,
  },

  popoverText: {
    color: 'white',
    marginLeft: scale(8),
  },
  direction: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  messageContainer: {
    width: '70%',
    minHeight: verticalScale(58),
    paddingVertical: verticalScale(16),
    paddingHorizontal: scale(16),
    borderBottomRightRadius: 35,
    borderBottomLeftRadius: 35,
  },
  buttonsFlatListContianer: {
    justifyContent: 'center',
    alignSelf: 'center',
  },
  buttonFlatList: {
    width: '100%',
    height: '50%',
  },
});
