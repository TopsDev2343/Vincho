import React, {useRef, useState} from 'react';
import {Text, Modal, HStack} from 'native-base';
import FlashMessage from 'react-native-flash-message';
import {ActivityIndicator} from 'react-native';
import {useQueryClient} from 'react-query';

import {Colors} from '~/styles/colors';
import {Fonts} from '~/styles/fonts';
import {UserOptionMenuBtn} from '~/components';
import {trash} from '~/assets/icons';
import {Strings} from '~/assets/strings/index';
import {BlurView} from '@react-native-community/blur';
import {successSnackBar, windowWidth} from '~/styles/globalStyles';
import {queryKeys} from '~/constants/queryKeys';
import useDeleteTopicModalStore from '~/stores/deleteTopicModalStore';
import {useDeleteTopic} from '~/hooks/artist/Topic';
import {DeleteModal} from '~/components/atoms/DeleteModal';

const DeleteTopicModal = () => {
  const queryClient = useQueryClient();
  const snackBarRef = useRef(null);
  const {deleteTopicModal, setDeleteTopicModal} = useDeleteTopicModalStore(
    state => state,
  );

  const {mutate, isLoading} = useDeleteTopic();
  const [showModal, setShowModal] = useState<boolean>(false);

  function deleteTopic() {
    const input = {entityId: deleteTopicModal?.topicId};
    mutate(input as any, {
      onSuccess: successData => {
        if (successData?.topic_deleteTopic?.value === 'Success') {
          queryClient.invalidateQueries(queryKeys.getAllTopics);
          queryClient.invalidateQueries(queryKeys.getAllTopicsCount);
          queryClient.invalidateQueries(queryKeys.getTopicsByUserId);
          setDeleteTopicModal({
            showModal: false,
            topicId: null,
          });
        }
      },
    });
  }

  return (
    <Modal
      isOpen={deleteTopicModal?.showModal}
      onClose={() =>
        setDeleteTopicModal({
          showModal: false,
          commentId: null,
        })
      }
      safeAreaTop={true}>
      <Modal.Content maxWidth={windowWidth} {...styles['bottom']}>
        <BlurView
          blurType="dark"
          blurRadius={25}
          blurAmount={25}
          reducedTransparencyFallbackColor="transparent">
          <Modal.Body alignItems={'center'}>
            {isLoading ? (
              <ActivityIndicator size={28} color={Colors.primary} />
            ) : (
              <Text {...styles['headerTxt']}>{Strings.moreOption}</Text>
            )}

            <HStack mb={16} alignSelf="flex-start" ml={3}>
              <UserOptionMenuBtn
                icon={trash}
                title={Strings.delete}
                onPress={() => {
                  setShowModal(true);
                }}
              />
            </HStack>
          </Modal.Body>
        </BlurView>
        <FlashMessage ref={snackBarRef} position="bottom" />
        <DeleteModal
          showModal={showModal}
          setShowModal={setShowModal}
          deleteOnPress={() => {
            deleteTopic();
          }}
          title={Strings.wantToDeleteTopic}
        />
      </Modal.Content>
    </Modal>
  );
};

export default DeleteTopicModal;

const styles = {
  bottom: {
    marginBottom: 0,
    marginTop: 'auto',
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
    backgroundColor: Colors.transparent,
    width: windowWidth,
  },
  headerTxt: {
    color: Colors.txtLight,
    ...Fonts.smallReg,
    mb: 8,
  },
};
