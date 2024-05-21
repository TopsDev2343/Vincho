import React, {useState} from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import {FlatList} from 'native-base';
import {scale} from 'react-native-size-matters';
import {BackButton, CustomButton} from '~/components';
import {Colors} from '~/styles/colors';
import {CustomContainer, CustomKeyboardAwareScrollView} from '~/components';
import {windowWidth, windowHeight} from '~/styles/globalStyles';
import {customFonts, Fonts} from '~/styles/fonts';
import {Strings} from '~/assets/strings';
import {Text} from 'native-base';
import {tagHeData} from '~/constants/mockData';

const SelectTagScreen = ({navigation}: {navigation: any}) => {
  const [tags] = useState<string[]>([...tagHeData]);
  const [personality, setPersonality] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  function navigateToCreateProfileAiFriendSrceen() {
    navigation.navigate('CreateProfileAiFriendSrceen', {
      tags: selectedTags,
      personality,
    });
  }

  const onSelectTag = (selected: string, checkExists: boolean) => {
    if (!checkExists) {
      setSelectedTags(prevSelectedTags => [...prevSelectedTags, selected]);
    } else {
      const updatedTags = selectedTags.filter(tag => tag !== selected);
      setSelectedTags([...updatedTags]);
    }
  };

  function renderItem({item}: {item: string}) {
    const checkExists = selectedTags.find(x => x === item);
    return (
      <TouchableOpacity onPress={() => onSelectTag(item, !!checkExists)}>
        <Text style={checkExists ? styles.tagSelectedText : styles.tagText}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <CustomContainer>
      <BackButton />
      <CustomKeyboardAwareScrollView style={{flex: 1}}>
        <Text
          fontSize="2xl"
          color={Colors.txtOverlay}
          my="3"
          alignSelf="center"
          fontFamily={customFonts.regular}>
          {Strings.whatFriendLike}
        </Text>

        <TextInput
          style={styles.input}
          onChangeText={value => setPersonality(value)}
          value={personality}
          maxLength={250}
          multiline={true}
          placeholder={Strings.heLovesEveryday}
          keyboardType="default"
          placeholderTextColor={Colors.txtMedium}
        />

        <View style={styles.tagsList}>
          <FlatList
            data={tags ?? []}
            renderItem={renderItem}
            keyExtractor={item => item}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tagItemContainer}
          />
        </View>

        <CustomButton
          title={'Next'}
          titleColor={Colors.txtDark}
          backColor={Colors.primary}
          containerStyle={styles.btnNext}
          btnMTop={scale(50)}
          btnMBottom={scale(10)}
          isDisable={!selectedTags.length || !personality}
          onPress={navigateToCreateProfileAiFriendSrceen}
        />
      </CustomKeyboardAwareScrollView>
    </CustomContainer>
  );
};

export default SelectTagScreen;

const styles = StyleSheet.create({
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
  title: {
    color: Colors.txtMedium,
    ...Fonts.largeReg,
    textAlign: 'center',
    marginTop: scale(16),
  },

  tagText: {
    color: Colors.white,
    backgroundColor: Colors.onPrimary,
    paddingHorizontal: scale(9),
    paddingVertical: windowHeight * 0.002,
    marginRight: scale(10),
    marginLeft: 0,
    marginTop: scale(12),
    borderColor: Colors.primary,
    borderRadius: windowWidth * 0.01,
    borderWidth: scale(0.5),
    overflow: 'hidden',
    ...Fonts.smallRegBarlow,
  },
  tagSelectedText: {
    color: Colors.white,
    backgroundColor: Colors.primary,
    paddingHorizontal: scale(9),
    paddingVertical: windowHeight * 0.002,
    marginRight: scale(10),
    marginLeft: 0,
    marginTop: scale(12),
    borderColor: Colors.primary,
    borderRadius: windowWidth * 0.01,
    borderWidth: scale(0.5),
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
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  btnNext: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});
