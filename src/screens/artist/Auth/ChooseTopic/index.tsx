import React, {useState, useCallback} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';

import {Colors} from '~/styles/colors';
import {CustomContainer, CustomKeyboardAwareScrollView} from '~/components';
import {CustomButton} from '~/components';
import {Strings} from '~/assets/strings/index';
import {Fonts} from '~/styles/fonts';
import {BackButton} from '~/components';
import {storageHelper} from '~/utils/storageHelper';
import {StorageKeys} from '~/constants/storageKeys';
import {TopicBtn} from '~/components';
import {
  useCreateUserCategories,
  useGetAllCategoriesArtist,
} from '~/hooks/artist/Categories';
import {useAuthRefreshStore, useAuthStore} from '~/stores';
import {queryClient} from '~/graphql/AuthProvider';
import {queryKeys} from '~/constants/queryKeys';

const ChooseTopic = ({navigation}: {navigation: any}) => {
  const {
    mutate: mutateCreateUserCategory,
    isLoading: createUserCategoryLoading,
  } = useCreateUserCategories();
  const [selectedTopic, setSelectedTopic] = useState<number[]>([]);
  const storage = new storageHelper();
  const {refreshAuth, setRefreshAuth} = useAuthRefreshStore();
  const {userId} = useAuthStore(state => state);

  const {
    isLoading: getAllCategoriesLoading,
    data: getAllCategoriesData,
    isSuccess: getAllCategoriesSuccess,
    isError: getAllCategoriesFail,
    // error: getAllTopicErrorMsg,
    refetch: refetchGetAllCategories,
  } = useGetAllCategoriesArtist({});

  function chooseTopic() {
    const input = {userId: userId, categoryIds: selectedTopic};
    mutateCreateUserCategory(input as any, {
      onSuccess: successData => {
        if (
          successData?.userCategory_createByCategoryIds?.status.value ===
          'Success'
        ) {
          queryClient.invalidateQueries([queryKeys.getAllCategories]);
          queryClient.invalidateQueries([queryKeys.getCategories]);
          confirm();
        }
      },
    });
  }

  const selectTopic = useCallback(
    (topicId: number) => {
      let selected = selectedTopic;
      if (selected.includes(topicId)) {
        setSelectedTopic(selected.filter(value => value !== topicId));
      } else {
        setSelectedTopic([...selectedTopic, topicId]);
      }
    },
    [selectedTopic],
  );

  function confirm() {
    storage.multiSave(() => {
      setRefreshAuth(!refreshAuth);
      navigation.popToTop();
    }, [
      [StorageKeys.TOPIC_SHOW, 'shown'],
      [StorageKeys.INITIAL_SETUP_SHOW, 'shown'],
    ]);
  }

  return (
    <CustomContainer
      isLoading={getAllCategoriesLoading}
      isError={getAllCategoriesFail}
      errorMsg={'Something went wrong!'}
      onPress={refetchGetAllCategories}>
      {getAllCategoriesSuccess ? (
        <View style={styles.container}>
          <BackButton />
          <View style={styles.topicContainer}>
            <Text style={styles.topicBody}>{Strings.topicBody}</Text>
          </View>

          <CustomKeyboardAwareScrollView>
            <View style={styles.topicBtnContainer}>
              {getAllCategoriesData?.category_getCategories?.result.items.map(
                (item: object) => {
                  return (
                    <TopicBtn
                      key={item?.id}
                      item={item}
                      selectTopic={selectTopic}
                      selectedTopic={selectedTopic}
                    />
                  );
                },
              )}
            </View>
            <View style={styles.confirmBtnContainer}>
              <CustomButton
                title={Strings.letGo}
                titleColor={Colors.txtDark}
                backColor={Colors.primary}
                isLoading={createUserCategoryLoading}
                onPress={chooseTopic}
                isDisable={selectedTopic.length <= 0}
              />
              <CustomButton
                title={Strings.skipNow}
                titleColor={Colors.primary}
                backColor={Colors.transparent}
                btnMTop={scale(5)}
                btnMBottom={scale(16)}
                onPress={confirm}
                isDisable={selectedTopic.length > 0}
              />
            </View>
          </CustomKeyboardAwareScrollView>
        </View>
      ) : null}
    </CustomContainer>
  );
};

export default ChooseTopic;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topicContainer: {
    marginTop: scale(30),
    marginHorizontal: scale(24),
  },
  topicBody: {
    ...Fonts.largeLight,
    color: Colors.white,
    textAlign: 'center',
  },
  topicBtnContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: scale(24),
    marginTop: scale(6),
  },
  confirmBtnContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 1,
    marginTop: verticalScale(16),
  },
});
