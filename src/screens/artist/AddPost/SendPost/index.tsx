import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import {useQueryClient} from 'react-query';

import RNFS from 'react-native-fs';
import {FlatList} from 'react-native-gesture-handler';
import {SvgXml} from 'react-native-svg';
import {postFileType} from '~/@types/global';
import {roundClose} from '~/assets/icons';
import {Strings} from '~/assets/strings/index';
import {
  AddPostCategoryTagList,
  AutoCompleteHashTag,
  BackButton,
  CustomDropdownButton,
  CustomKeyboardAwareScrollView,
  SendPostPreview,
} from '~/components';
import {packageName} from '~/constants/contants';
import {queryKeys} from '~/constants/queryKeys';
import {hashtagRegExp} from '~/constants/regexExp';
import {useGetPostCategories} from '~/hooks/artist/Categories';
import {useGetHashtagList} from '~/hooks/artist/Hashtags';
import {useCreatePost} from '~/hooks/artist/Posts';
import {getFullImageUrl, useUploadFile} from '~/hooks/artist/Upload';
import {goBack} from '~/navigation/methods';
import {useAuthStore} from '~/stores';
import {Colors} from '~/styles/colors';
import {Fonts} from '~/styles/fonts';
import {windowHeight, windowWidth} from '~/styles/globalStyles';
import {messageHelper} from '~/utils/messageHelper';
import snackBar from '~/utils/snackBar';

type Suggestion = {
  title: string;
  id: number;
};

const SendPost = ({route}: {route: any}) => {
  const [post, setPost] = useState<string>('');
  const [isCreating, setIsCreating] = useState(false);

  const {
    isLoading,
    data: categoriesData,
    fetchNextPage,
    hasNextPage,
    refetch,
    isRefetching,
  } = useGetPostCategories({
    onSuccess: data => {
      setCategoryData(data?.pages);
    },
  });

  const {
    mutate: uploadFileMutate,
    isLoading: isUploading,
    data: data,
  } = useUploadFile();
  const {isLoading: createPostLoading, mutate: mutateCreatePost} =
    useCreatePost();
  const {userId} = useAuthStore(state => state);
  const queryClient = useQueryClient();

  const [tags, setTags] = useState<Suggestion[]>([]);
  const [tagSearch, setTagSearch] = useState<string>('');
  const [invalidTag, setInvalidTag] = useState<boolean>(false);

  const [categoryData, setCategoryData] = useState<object[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [options, setOptions] = useState({id: 0, title: ''});
  const [categoryId, setCategoryId] = useState(0);

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

  function clearTemp() {
    RNFS.exists(RNFS.TemporaryDirectoryPath + packageName + '/videos').then(
      res => {
        if (res == true) {
          RNFS.unlink(RNFS.TemporaryDirectoryPath + packageName + '/videos');
        }
      },
    );
  }
  const createPost = async () => {
    if (post.trim() === '') {
      snackBar(messageHelper('AddDescription'));
    } else if (selectedCategories?.length === 0) {
      snackBar(messageHelper('SelectCategory'));
    } else {
      setIsCreating(true);
      let imagePicker = route?.params?.selectedPost?.imagePicker;

      uploadFileMutate(imagePicker, {
        onSuccess: (successData: any) => {
          clearTemp();
          const input = {
            input: {
              caption: post,
              fileUrl: getFullImageUrl(successData?.uploadedUrl),
              userId: userId,
              viewCount: 0,
              fileType: Object.values(postFileType).includes(
                imagePicker?.mime.split('/')[0]?.toUpperCase(),
              )
                ? imagePicker?.mime.split('/')[0]?.toUpperCase()
                : postFileType.Image,
            },
            categories: selectedCategories,
            hashtags: tags?.map(({title}) => title),
          };
          mutateCreatePost(input, {
            onSuccess: successData => {
              if (successData?.post_createPost?.status?.value === 'Success') {
                queryClient.invalidateQueries(
                  queryKeys.getFollowingExplorePosts,
                );
                queryClient.invalidateQueries(queryKeys.getNearbyExplorePosts);
                queryClient.invalidateQueries(queryKeys.getPosts);
                goBack();
              }
            },
          });
        },
        onSettled: () => {
          setIsCreating(false);
        },
      });
    }
  };

  const onChangeItem = (item: any) => {
    setOptions(item);
    if (item != null || item != undefined) {
      setCategoryId(item.id);
    } else {
      setCategoryId(0);
    }
  };

  useEffect(() => {
    if (categoryId) {
      if (selectedCategories.length < 2) {
        let selected = selectedCategories;
        if (!selected.includes(categoryId)) {
          setSelectedCategories([...selectedCategories, categoryId]);
        }
      } else {
        snackBar(messageHelper('ChooseOnlyTwo'));
        setCategoryId(0);
        setOptions({id: 0, title: ''});
      }
    }
  }, [categoryId]);

  function onCategoryDelete(deletedValue: number) {
    let selected = selectedCategories;
    setSelectedCategories(selected.filter(data => data !== deletedValue));
  }

  function onTagDelete(deletedValue: number) {
    let selected = tags;
    setTags(selected.filter(data => data.id !== deletedValue));
  }

  const hashtagInput = {
    postHashtags: {some: {hashtag: {title: {contains: tagSearch}}}},
  };

  const {data: getHashtagListData} = useGetHashtagList({
    skip: 0,
    take: 10,
    where: hashtagInput,
  });

  function setTagsList(value: any) {
    let obj = tags.filter(x => x.id == value[0].id);
    if (obj.length == 0) {
      setTags(tags => [...tags, {title: value[0].title, id: value[0].id}]);
    }
  }

  function renderItem({item}: {item: any}) {
    return (
      <TouchableWithoutFeedback onPress={() => onTagDelete(item?.id)}>
        <View style={styles.tagItemContainer}>
          <Text style={styles.tagItemText}>{item?.title}</Text>
          <SvgXml xml={roundClose} />
        </View>
      </TouchableWithoutFeedback>
    );
  }

  function onBackPressed() {
    clearTemp();
    goBack();
  }
  return (
    <CustomKeyboardAwareScrollView
      style={{
        flex: 1,
        backgroundColor: Colors.background,
      }}>
      <View style={styles.postBtnContainer}>
        <BackButton
          isModal={true}
          modalOnClose={() => {
            onBackPressed();
          }}
        />
        {createPostLoading || isUploading || isCreating ? (
          <ActivityIndicator
            size="small"
            color={Colors.primary}
            style={styles.indicator}
          />
        ) : (
          <TouchableOpacity
            onPress={() => {
              createPost();
            }}>
            <Text style={styles.postBtn}>{Strings.post}</Text>
          </TouchableOpacity>
        )}
      </View>

      {categoryData && !isLoading ? (
        <View style={styles.dropdownContainer}>
          <CustomDropdownButton
            bgColor={Colors.onBackground}
            textColor={Colors.white}
            fontSize={16}
            name="category"
            label="Category"
            hideClose={true}
            placeholder="Select Category"
            value={options}
            setValue={item => onChangeItem(item)}
            onClose={() => {
              onChangeItem({id: 0, title: ''});
            }}
            optionsDataList={categoriesData?.pages}
            isRefetching={isRefetching}
            refreshing={false}
            onRefresh={refetch}
            refetch={refetch}
            onEndReachedThreshold={0.5}
            onEndReached={({distanceFromEnd}) => {
              if (hasNextPage) {
                fetchNextPage();
              }
            }}
          />
        </View>
      ) : (
        <ActivityIndicator />
      )}
      {categoryData && !isLoading && (
        <AddPostCategoryTagList
          categoryData={categoryData.filter(value =>
            selectedCategories.includes(value?.id),
          )}
          onCategoryDelete={onCategoryDelete}
        />
      )}

      <View style={{marginHorizontal: scale(13)}}>
        <AutoCompleteHashTag
          suggestions={getHashtagListData?.hashtag_getHashtags?.result?.items}
          tags={tags}
          setTags={item => setTagsList(item)}
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

      <TextInput
        style={styles.input}
        onChangeText={value => setPost(value)}
        value={post}
        maxLength={250}
        placeholder="Write caption"
        keyboardType="default"
        placeholderTextColor={Colors.txtMedium}
      />

      <View style={styles.previewContainer}>
        <SendPostPreview selectedImg={route?.params?.selectedPost} />
      </View>
    </CustomKeyboardAwareScrollView>
  );
};

export default SendPost;

const styles = StyleSheet.create({
  postBtnContainer: {
    marginTop: Platform.OS == 'ios' ? verticalScale(50) : verticalScale(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: scale(10),
  },
  postBtn: {
    color: Colors.primary,
    ...Fonts.smallReg,
    marginRight: scale(24),
  },
  invalidTagTxt: {
    color: Colors.primary,
    ...Fonts.smallReg,
    marginLeft: scale(12),
  },
  input: {
    marginVertical: scale(12),
    marginHorizontal: scale(12),
    borderBottomWidth: 1,
    borderColor: Colors.txtMedium,
    paddingBottom: scale(12),
    ...Fonts.mediumReg,
    color: Colors.txtLight,
    zIndex: -100,
  },
  tagInput: {
    marginHorizontal: scale(12),
    borderBottomWidth: 1,
    borderColor: Colors.txtMedium,
    paddingBottom: scale(6),
    ...Fonts.smallReg,
    color: Colors.txtLight,
  },
  galleryBtn: {
    marginHorizontal: windowWidth * 0.1,
    marginVertical: windowHeight * 0.02,
  },
  dropdownContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginTop: scale(6),
    backgroundColor: Colors.onBackground,
    borderRadius: scale(16),
    padding: scale(4),
    marginHorizontal: scale(10),
  },
  previewContainer: {
    marginTop: windowHeight * 0.02,
    zIndex: -200,
    overflow: 'hidden',
    marginHorizontal: scale(13),
  },
  container: {
    flex: 1,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderBottomColor: '#262626',
    borderBottomWidth: 0.5,
    paddingVertical: scale(18),
  },
  indicator: {
    marginRight: scale(24),
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
  tagItemContainer: {
    paddingVertical: windowHeight * 0.002,
    paddingHorizontal: windowWidth * 0.02,
    backgroundColor: Colors.onBackground,
    borderRadius: windowWidth * 0.01,
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: windowWidth * 0.016,
    marginTop: windowHeight * 0.02,
    flexDirection: 'row',
  },
  tagItemText: {
    ...Fonts.smallRegBarlow,
    color: Colors.white,
    marginRight: windowWidth * 0.02,
  },
});
