import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import {scale} from 'react-native-size-matters';

import {Colors} from '~/styles/colors';
import {Fonts} from '~/styles/fonts';
import {navigate} from '~/navigation/methods';
import {useAuthStore} from '~/stores';
import useDeleteTopicModalStore from '~/stores/deleteTopicModalStore';
import {Button, HStack} from 'native-base';
import {SvgXml} from 'react-native-svg';
import {optionMenu} from '~/assets/icons';

const TopicsItem = ({
  item,
  isUserTopic,
  isAdmin,
}: {
  item: any;
  isUserTopic: boolean;
  isAdmin: boolean;
}) => {
  const {userId} = useAuthStore(state => state);
  const {deleteTopicModal, setDeleteTopicModal} = useDeleteTopicModalStore(
    state => state,
  );

  function deleteTopic(id: number) {
    if (isAdmin == true) {
      setDeleteTopicModal({
        showModal: true,
        topicId: item?.id,
      });
    }
  }
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigate('TopicPostScreen', {
          topicId: item?.id,
          isUserTopic: isUserTopic
            ? true
            : item?.topicUsers?.find(value => value.userId === userId)
            ? true
            : false,
        })
      }>
      <HStack justifyContent={'space-between'}>
        <Text
          style={[
            styles.titleTxt,
            [
              {
                backgroundColor:
                  deleteTopicModal.showModal == true &&
                  deleteTopicModal.topicId == item?.id
                    ? Colors.actionSheetColor
                    : Colors.transparent,
                color:
                  deleteTopicModal.showModal == true &&
                  deleteTopicModal.topicId == item?.id
                    ? Colors.txtMedium
                    : Colors.txtLight,
              },
            ],
          ]}>
          {item?.title}
        </Text>
        {isAdmin && (
          <Button
            variant="link"
            justifyContent="flex-start"
            alignItems="center"
            padding={0}
            onPress={() => {
              deleteTopic(item?.id);
            }}>
            <SvgXml
              xml={optionMenu}
              fill={Colors.white}
              width={scale(16)}
              height={scale(16)}
            />
          </Button>
        )}
      </HStack>

      <Text
        style={[
          styles.descTxt,
          [
            {
              backgroundColor:
                deleteTopicModal.showModal == true &&
                deleteTopicModal.topicId == item?.id
                  ? Colors.actionSheetColor
                  : Colors.transparent,
              color:
                deleteTopicModal.showModal == true &&
                deleteTopicModal.topicId == item?.id
                  ? Colors.txtLight
                  : Colors.txtMedium,
            },
          ],
        ]}
        numberOfLines={2}>
        {item?.description}
      </Text>
    </TouchableOpacity>
  );
};

export default TopicsItem;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scale(16),
    marginTop: scale(16),
    width: '100%',
  },

  titleTxt: {
    color: Colors.txtLight,
    ...Fonts.mediumReg,
    textAlign: 'left',
    lineHeight: scale(24),
  },

  descTxt: {
    color: Colors.txtMedium,
    ...Fonts.verySmallReg,
    textAlign: 'left',
  },
});
