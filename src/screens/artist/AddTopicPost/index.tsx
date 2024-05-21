import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  View,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import {Divider, FlatList, Toast} from 'native-base';
import {SvgXml} from 'react-native-svg';
import {scale, verticalScale} from 'react-native-size-matters';
import {useQueryClient} from 'react-query';

import {Colors} from '~/styles/colors';
import {
  CustomContainer,
  TopicPostGalleryList,
  PostPreview,
  AutoCompleteHashTag,
  CustomKeyboardAwareScrollView,
  AddPostGalleryList,
} from '~/components';
import {BackButton} from '~/components';
import {windowWidth, windowHeight} from '~/styles/globalStyles';
import {plusRounded, lightClose, gallery} from '~/assets/icons';
import {Fonts} from '~/styles/fonts';
import {getFullImageUrl, useUploadFile} from '~/hooks/artist/Upload';
import {useCreateTopicPost} from '~/hooks/artist/Topic';
import {useAuthStore} from '~/stores';
import {Strings} from '~/assets/strings/index';
import snackBar from '~/utils/snackBar';
import {messageHelper} from '~/utils/messageHelper';
import {queryKeys} from '~/constants/queryKeys';
import {getGallery, getTopicGallery} from '~/utils/getGallery';
import {openGallery} from '~/utils/openGallery';
import {useGetHashtagList} from '~/hooks/artist/Hashtags';
import {formats, postFileType} from '~/@types/global';
import {height} from '~/utils/dimension';
import {hashtagRegExp} from '~/constants/regexExp';
import {goBack} from '~/navigation/methods';
import ImagePicker from 'react-native-image-crop-picker';
import {getFileExtension} from '~/utils/getFileExtension';
import {FileType} from '~/generated/graphql';
import {cameraOptions} from '~/utils/cameraOptions';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import * as RNFS from 'react-native-fs';
import {packageName} from '~/constants/contants';

type Suggestion = {
  title: string;
  id: number;
};

const AddTopicPost = ({route}: {route: any}) => {
  const queryClient = useQueryClient();
  const [album, setAlbum] = useState<object[]>([]);
  const [post, setPost] = useState<string>('');
  const [selectedImg, setSelectedImg] = useState<object>({
    uri: '',
    type: '',
    imagePicker: null,
  });
  const {
    mutate: uploadFileMutate,
    isLoading: isUploading,
    data: data,
  } = useUploadFile();
  const {isLoading: createTopicPostLoading, mutate: mutateCreateTopicPost} =
    useCreateTopicPost();
  const {userId} = useAuthStore(state => state);

  const [tags, setTags] = useState<Suggestion[]>([]);
  const [invalidTag, setInvalidTag] = useState<boolean>(false);
  const [tagSearch, setTagSearch] = useState<string>('');

  const hashtagInput = {
    postHashtags: {some: {hashtag: {title: {contains: tagSearch}}}},
  };

  const {data: getHashtagListData} = useGetHashtagList({
    skip: 0,
    take: 10,
    where: hashtagInput,
  });

  const onAddNewTag = (input: string) => {
    try {
      if (hashtagRegExp.test(input)) {
        let checkExists = tags.find(x => x.title == input);
        if (checkExists == null) {
          setInvalidTag(false);
          setTagSearch(input);
          setTags(tags => [...tags, {title: input, id: input}]);
        }
      } else {
        setInvalidTag(true);
      }
    } catch {
      setInvalidTag(true);
    }
  };

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
                ? res?.path.replace('file:///', 'file://')
                : res?.path,
            type: res?.mime.split('/')[0],
            width: res?.width,
            height: res?.height,
            imagePicker: {
              path:
                Platform.OS == 'ios'
                  ? res?.path.replace('file:///', 'file://')
                  : res?.path,
              mime: res?.mime,
              filename: res?.filename,
            },
          };
          setSelectedImg(value);
        })
        .catch(err => {});
    } catch (err) {}
  }

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
    });
  }

  async function setAlbumList(value: object[]) {
    await setAlbumItems(value);
  }

  useEffect(() => {
    RNFS.exists(RNFS.TemporaryDirectoryPath + packageName).then(res => {
      if (res == false) {
        RNFS.mkdir(RNFS.TemporaryDirectoryPath + packageName);
      }
    });
    RNFS.exists(RNFS.TemporaryDirectoryPath + packageName + '/videos').then(
      res => {
        if (res == false) {
          RNFS.mkdir(RNFS.TemporaryDirectoryPath + packageName + '/videos');
        }
      },
    );
    getGallery(setAlbumList);
  }, []);

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

  async function setSelectedPost(valueFile: object) {
    if (Platform.OS == 'ios' && valueFile?.type === formats.Image) {
      try {
        const imagePicker = await ImagePicker.openCropper({
          path: valueFile?.uri,
          width: valueFile.width,
          height: valueFile.height,
          mediaType: 'photo',
          freeStyleCropEnabled: true,
          showCropFrame: true,
          showCropGuidelines: true,
        });
        let value = {
          uri: imagePicker.path,
          type: getFileExtension(imagePicker.path),
          imagePicker: imagePicker,
        };
        setSelectedImg(value);
      } catch (err) {
        //snackBar(messageHelper('SomeError'));
      }
    } else {
      setSelectedImg(valueFile);
    }
  }

  function createPost() {
    if (post.trim() === '') {
      snackBar(messageHelper('AddDescription'));
    } else {
      let input = {
        input: {
          caption: post,
          topicId: route?.params?.topicId,
          userId: userId,
          fileUrl: '',
          viewCount: 0,
          likeCount: 0,
          fileType: FileType.NotSet,
        },
        hashtags: tags?.map(({title}) => title),
      };
      if (selectedImg?.imagePicker) {
        input.input.fileType = Object.values(postFileType).includes(
          selectedImg?.imagePicker?.mime.split('/')[0]?.toUpperCase(),
        )
          ? selectedImg?.imagePicker?.mime.split('/')[0]?.toUpperCase()
          : postFileType.Image;
        uploadFileMutate(selectedImg?.imagePicker, {
          onSuccess: (successData: any) => {
            clearTemp();
            input.input.fileUrl = getFullImageUrl(successData?.uploadedUrl);
            createTopicPost(input);
          },
        });
      } else {
        createTopicPost(input);
      }
    }
  }

  function onImgClose() {
    setSelectedImg({
      uri: '',
      type: '',
      imagePicker: null,
    });
  }

  function createTopicPost(input: any) {
    mutateCreateTopicPost(input, {
      onSuccess: successData => {
        if (
          successData?.topicPost_createTopicPost?.status?.value === 'Success'
        ) {
          queryClient.invalidateQueries(queryKeys.getTopicPosts);
          setPost('');
          goBack();
        } else {
          snackBar(
            messageHelper(
              successData?.topicPost_createTopicPost?.status?.value,
            ),
          );
        }
      },
    });
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
        if (!uri.toString().startsWith('file://')) {
          uri = 'file://' + uri;
        }
        let value = {
          uri: Platform.OS == 'ios' ? uri.replace('file:///', 'file://') : uri,
          type: res?.mime.split('/')[0],
          width: res?.width,
          height: res?.height,
          imagePicker: {
            path:
              Platform.OS == 'ios' ? uri.replace('file:///', 'file://') : uri,
            mime: res?.mime,
            filename: tempName,
          },
        };
        let postValue = {
          uri: value.imagePicker.path,
          type: getFileExtension(value.imagePicker.path),
          imagePicker: value.imagePicker,
        };
        setSelectedImg(postValue);
      })
      .catch(x => {});
  }

  function renderItem({item}: {item: any}) {
    return <Text style={styles.tagText}>{item.title}</Text>;
  }

  return (
    <CustomContainer isLoading={false} style={{flex: 1}}>
      <BackButton
        isModal={true}
        modalOnClose={() => {
          onBackPressed();
        }}
      />

      {createTopicPostLoading || isUploading ? (
        <ActivityIndicator
          size="small"
          color={Colors.primary}
          style={styles.indicator}
        />
      ) : (
        <Text style={styles.postBtn} onPress={createPost}>
          {Strings.post}
        </Text>
      )}

      <View style={{flex: 1}}>
        <View style={{flex: 7}}>
          <CustomKeyboardAwareScrollView style={{flex: 1}}>
            <TextInput
              style={styles.input}
              onChangeText={value => setPost(value)}
              value={post}
              multiline={true}
              placeholder="Post"
              keyboardType="default"
              maxLength={100}
              placeholderTextColor={Colors.txtMedium}
            />

            <View style={{marginHorizontal: scale(13)}}>
              <AutoCompleteHashTag
                suggestions={
                  getHashtagListData?.hashtag_getHashtags?.result?.items
                }
                tags={tags}
                setTags={setTags}
                invalidTag={invalidTag}
                onAddNewTag={onAddNewTag}
              />
            </View>
            <View style={styles.tagsList}>
              <FlatList
                data={tags ?? []}
                renderItem={renderItem}
                keyExtractor={item => item?.id}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            </View>

            {selectedImg?.uri && (
              <TouchableOpacity style={styles.closeBtn} onPress={onImgClose}>
                <SvgXml xml={lightClose} width={scale(16)} height={scale(16)} />
              </TouchableOpacity>
            )}
            <PostPreview selectedImg={selectedImg} />
          </CustomKeyboardAwareScrollView>
        </View>

        <View style={{flex: 3, justifyContent: 'flex-end'}}>
          {selectedImg?.uri ? null : album?.length !== 0 ? (
            <TopicPostGalleryList
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

          <Divider
            bg={Colors.white}
            size={0.4}
            mx={3}
            width={windowWidth * 0.99}
            mt={3}
          />

          <TouchableOpacity
            style={styles.galleryBtn}
            onPress={() => openGallery()}>
            <SvgXml
              xml={gallery}
              fill={Colors.white}
              width={scale(16)}
              height={scale(16)}
            />
          </TouchableOpacity>
        </View>
      </View>
    </CustomContainer>
  );
};

export default AddTopicPost;

const styles = StyleSheet.create({
  container: {flex: 1},
  indicator: {
    alignSelf: 'flex-end',
    marginRight: scale(12),
  },
  postBtn: {
    color: Colors.primary,
    alignSelf: 'flex-end',
    marginRight: scale(12),
    ...Fonts.smallReg,
  },
  input: {
    marginBottom: scale(12),
    marginHorizontal: scale(12),
    borderBottomWidth: 1,
    borderColor: Colors.txtMedium,
    paddingBottom: scale(12),
    ...Fonts.mediumReg,
    color: Colors.txtLight,
    minHeight: verticalScale(48),
    lineHeight: scale(24),
  },
  galleryBtn: {
    marginRight: windowWidth * 0.1,
    marginLeft: windowWidth * 0.08,
    marginVertical: windowHeight * 0.02,
    borderWidth: 1,
    borderColor: Colors.white,
    width: scale(30),
    height: scale(30),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  closeBtn: {
    marginTop: scale(4),
    marginRight: scale(8),
    alignSelf: 'flex-end',
    backgroundColor: Colors.background,
    borderRadius: scale(30),
    width: scale(24),
    height: scale(24),
    alignItems: 'center',
    justifyContent: 'center',
  },
  tagText: {
    color: Colors.white,
    backgroundColor: Colors.onBackground,
    paddingHorizontal: scale(9),
    paddingVertical: windowHeight * 0.002,
    marginRight: scale(10),
    marginLeft: 0,
    marginTop: scale(6),
    borderRadius: windowWidth * 0.01,
    overflow: 'hidden',
    ...Fonts.smallRegBarlow,
  },
  tagsList: {
    flexDirection: 'row',
    marginBottom: scale(8),
    marginHorizontal: scale(12),
    zIndex: -99,
  },
});
