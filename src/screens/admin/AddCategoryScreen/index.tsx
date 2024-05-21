import React, {useState} from 'react';
import {StyleSheet, TextInput, Text} from 'react-native';
import {scale} from 'react-native-size-matters';
import {useQueryClient} from 'react-query';

import {BackButton, CustomButton} from '~/components';
import {CustomContainer} from '~/components';
import {Colors} from '~/styles/colors';
import {Fonts} from '~/styles/fonts';
import {Strings} from '~/assets/strings';
import snackBar from '~/utils/snackBar';
import {messageHelper} from '~/utils/messageHelper';
import {queryKeys} from '~/constants/queryKeys';
import {goBack} from '~/navigation/methods';
import {useCreateCategory} from '~/hooks/artist/Categories';

const AddCategoryScreen = () => {
  const [categoryName, setCategoryName] = useState<string>('');
  const {mutate, isLoading} = useCreateCategory();
  const queryClient = useQueryClient();

  function createCategory() {
    const input = {title: categoryName, isActive: true};
    mutate(input as any, {
      onSuccess: successData => {
        if (successData.category_createCategory?.status.value === 'Success') {
          queryClient.invalidateQueries(queryKeys.getAllCategoriesAdmin);
          queryClient.invalidateQueries(queryKeys.getAllCategories);
          queryClient.invalidateQueries(queryKeys.getCategories);
          queryClient.invalidateQueries(queryKeys.getPostCategories);
          goBack();
        } else {
          snackBar(
            messageHelper(successData.category_createCategory?.status.value),
          );
        }
      },
    });
  }

  return (
    <CustomContainer>
      <BackButton />

      <TextInput
        style={styles.input}
        onChangeText={value => setCategoryName(value)}
        value={categoryName}
        placeholder={Strings.categoryName}
        keyboardType="default"
        multiline={false}
        placeholderTextColor={Colors.txtMedium}
      />

      <CustomButton
        title={'Confirm'}
        titleColor={Colors.txtDark}
        backColor={Colors.primary}
        isLoading={isLoading}
        containerStyle={{flex: 1, justifyContent: 'flex-end'}}
        btnMTop={scale(50)}
        btnMBottom={scale(10)}
        onPress={createCategory}
      />
    </CustomContainer>
  );
};

export default AddCategoryScreen;

const styles = StyleSheet.create({
  input: {
    marginTop: scale(20),
    marginHorizontal: scale(12),
    borderBottomWidth: 1,
    borderColor: Colors.txtMedium,
    padding: scale(10),
    ...Fonts.smallReg,
    lineHeight: scale(18),
    color: Colors.txtLight,
  },
  title: {
    color: Colors.txtMedium,
    ...Fonts.largeReg,
    textAlign: 'center',
    marginTop: scale(16),
  },
  inviteContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.onBackground,
    marginTop: scale(86),
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(8),
    paddingVertical: scale(16),
  },
  inviteTxtContainer: {width: scale(236)},
});
