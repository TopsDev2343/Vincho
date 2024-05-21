import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {scale} from 'react-native-size-matters';

import {Colors} from '~/styles/colors';
import {Fonts} from '~/styles/fonts';
import {Strings} from '~/assets/strings/index';
import AutocompleteTopics from 'react-native-autocomplete-tags';

type Suggestion = {
  title: string;
  id: number;
};

const AutoCompleteTopic = ({
  suggestions,
  topics,
  setTopics,
  invalidTopic,
  onAddNewTopic,
}: {
  suggestions: object[];
  topics: Suggestion;
  setTopics: any;
  invalidTopic: boolean;
  onAddNewTopic: any;
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <AutocompleteTopics
          tags={topics}
          suggestions={suggestions}
          labelExtractor={item => item.title}
          suggestionExtractor={item => item.title}
          onChangeTags={topics => setTopics(topics)}
          onAddNewTag={onAddNewTopic}
          onSuggestionPress={item => {
            onAddNewTopic(item.title);
          }}
          inputProps={{
            autoCapitalize: 'none',
            autoCorrect: false,
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
          renderTag={() => <View style={styles.emptyTag} />}
        />
      </View>

      {invalidTopic && (
        <Text style={styles.invalidTagTxt}>{Strings.invalidTopic}</Text>
      )}
    </View>
  );
};

export default AutoCompleteTopic;

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
  emptyTag: {
    display: 'none',
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
