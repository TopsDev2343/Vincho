import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {scale} from 'react-native-size-matters';

import {Colors} from '~/styles/colors';
import {Fonts} from '~/styles/fonts';
import {Strings} from '~/assets/strings/index';
import AutocompleteTags from 'react-native-autocomplete-tags';

type Suggestion = {
  title: string;
  id: number;
};

const AutoCompleteHashTag = ({
  suggestions,
  tags,
  setTags,
  invalidTag,
  onAddNewTag,
}: {
  suggestions: object[];
  tags: Suggestion;
  setTags: any;
  invalidTag: boolean;
  onAddNewTag: any;
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <AutocompleteTags
          tags={tags}
          suggestions={suggestions}
          labelExtractor={item => item.title}
          suggestionExtractor={item => item.title}
          onChangeTags={tags => setTags(tags)}
          onAddNewTag={onAddNewTag}
          onSuggestionPress={item => {
            onAddNewTag(item.title);
          }}
          inputProps={{
            autoCapitalize: 'none',
            autoCorrect: false,
            placeholder: 'Tags',
            placeholderTextColor: Colors.txtMedium,
            style: {
              width: '100%',
              marginBottom: scale(18),
              paddingBottom: scale(6),
              borderBottomWidth: 1,
              borderColor: Colors.txtMedium,
              ...Fonts.mediumReg,
              color: Colors.txtLight,
            },
          }}
          flatListStyle={styles.list}
          renderTag={data => <View style={{display: 'none'}} />}
        />
      </View>

      {invalidTag && (
        <Text style={styles.invalidTagTxt}>{Strings.invalidTag}</Text>
      )}
    </View>
  );
};

export default AutoCompleteHashTag;

const styles = StyleSheet.create({
  container: {zIndex: 100},

  invalidTagTxt: {
    color: Colors.primary,
    ...Fonts.smallReg,
  },
  tagInput: {
    marginHorizontal: scale(12),
    borderBottomWidth: 1,
    borderColor: Colors.txtMedium,
    paddingBottom: scale(6),
    ...Fonts.mediumReg,
    color: Colors.txtLight,
  },
  rowContainer: {
    flexDirection: 'column-reverse',
    alignItems: 'flex-start',
    paddingTop: scale(18),
  },
  list: {
    backgroundColor: Colors.background,
    flex: 1,
    zIndex: 100,
  },
});
