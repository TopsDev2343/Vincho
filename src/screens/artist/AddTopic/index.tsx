import React, {useState} from 'react';
import {StyleSheet, TextInput, Text} from 'react-native';
import {scale} from 'react-native-size-matters';
import {useQueryClient} from 'react-query';

import {
  BackButton,
  CustomButton,
  CustomKeyboardAwareScrollView,
} from '~/components';
import {CustomContainer} from '~/components';
import {Colors} from '~/styles/colors';
import {Fonts} from '~/styles/fonts';
import {Strings} from '~/assets/strings';
import {useCreateTopic} from '~/hooks/artist/Topic';
import snackBar from '~/utils/snackBar';
import {messageHelper} from '~/utils/messageHelper';
import {useAuthStore} from '~/stores';
import {queryKeys} from '~/constants/queryKeys';
import {navigate, replace} from '~/navigation/methods';

const AddTopic = () => {
  const [topicName, setTopicName] = useState<string>('');
  const [topicDescription, setTopicDescription] = useState<string>('');
  const {mutate: mutateCreateTopic, isLoading: createTopicLoading} =
    useCreateTopic();
  const {userId} = useAuthStore(state => state);
  const queryClient = useQueryClient();

  function publishTopic() {
    if (topicName.trim() === '') {
      snackBar(messageHelper('AddTopicName'));
    } else if (topicDescription.trim() === '') {
      snackBar(messageHelper('AddTopicDescription'));
    } else {
      const input = {
        title: topicName,
        description: topicDescription,
        id: userId,
      };
      mutateCreateTopic(input as any, {
        onSuccess: successData => {
          if (successData.topic_createTopic?.status.value === 'Success') {
            queryClient.invalidateQueries(queryKeys.getAllTopics);
            queryClient.invalidateQueries(queryKeys.getTopicsByUserId);
            queryClient.invalidateQueries(queryKeys.getTopicsCountByUserId);
            queryClient.invalidateQueries(queryKeys.getAllTopicsCount);
            replace('InviteTopicScreen', {
              topicId: successData.topic_createTopic?.result?.id,
            });
          }
        },
      });
    }
  }

  return (
    <CustomContainer>
      <CustomKeyboardAwareScrollView style={{flexGrow: 1, flex: 1}}>
        <BackButton />

        <Text style={styles.title}>{Strings.addTopic}</Text>

        <TextInput
          style={styles.input}
          onChangeText={value => setTopicName(value)}
          value={topicName}
          placeholder={Strings.topicName}
          keyboardType="default"
          multiline={true}
          maxLength={100}
          placeholderTextColor={Colors.txtMedium}
        />
        <TextInput
          style={styles.input}
          onChangeText={value => setTopicDescription(value)}
          value={topicDescription}
          placeholder={Strings.topicDes}
          keyboardType="default"
          multiline={true}
          maxLength={250}
          placeholderTextColor={Colors.txtMedium}
        />

        <CustomButton
          title={Strings.publishTopic}
          titleColor={Colors.txtDark}
          backColor={Colors.primary}
          isLoading={createTopicLoading}
          containerStyle={{flex: 1, justifyContent: 'flex-end'}}
          btnMTop={scale(50)}
          btnMBottom={scale(10)}
          onPress={publishTopic}
        />
      </CustomKeyboardAwareScrollView>
    </CustomContainer>
  );
};

export default AddTopic;

const styles = StyleSheet.create({
  input: {
    marginTop: scale(20),
    marginHorizontal: scale(12),
    borderBottomWidth: 1,
    borderColor: Colors.txtMedium,
    padding: 10,
    ...Fonts.smallReg,
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
