import React, {useRef} from 'react';
import {Text, Modal, HStack} from 'native-base';
import FlashMessage from 'react-native-flash-message';
import {ActivityIndicator} from 'react-native';
import {useQueryClient} from 'react-query';

import {useDeleteCommentModalStore} from '~/stores';
import {Colors} from '~/styles/colors';
import {Fonts} from '~/styles/fonts';
import {UserOptionMenuBtn} from '~/components';
import {trash} from '~/assets/icons';
import {Strings} from '~/assets/strings/index';
import {BlurView} from '@react-native-community/blur';
import {successSnackBar, windowWidth} from '~/styles/globalStyles';
import {useDeleteTopicPostComment} from '../../../hooks/artist/Topic/index';
import {useDeletePostComment} from '~/hooks/artist/Comments';
import {queryKeys} from '~/constants/queryKeys';
import {goBack} from '~/navigation/methods';
import snackBar from '~/utils/snackBar';
import {messageHelper} from '~/utils/messageHelper';

const DeleteCommentModal = () => {
  const queryClient = useQueryClient();
  const snackBarRef = useRef(null);
  const {deleteCommentModal, setDeleteCommentModal} =
    useDeleteCommentModalStore(state => state);

  const {
    mutate: mutateDeleteTopicComment,
    isLoading: deleteTopicCommentLoading,
  } = useDeleteTopicPostComment();
  const {mutate: mutateDeletePostComment, isLoading: deletePostCommentLoading} =
    useDeletePostComment();

  function deleteComment() {
    const input = {entityId: deleteCommentModal?.commentId};
    if (deleteCommentModal?.isTopicComments) {
      mutateDeleteTopicComment(input as any, {
        onSuccess: successData => {
          if (
            successData?.topicPostComment_deleteTopicPostComment?.value ===
            'Success'
          ) {
            queryClient.invalidateQueries(queryKeys.getTopicCommentsByPostId);
            queryClient.invalidateQueries(queryKeys.getPostTopicDetail);
            queryClient.invalidateQueries(queryKeys.getTopicPosts);
            queryClient.invalidateQueries(queryKeys.getTopicPostsByHashtagId);
            queryClient.invalidateQueries(queryKeys.getAllTopics);
            setDeleteCommentModal({
              showModal: false,
              isTopicComments: false,
              commentId: null,
            });
          }
        },
      });
    } else {
      mutateDeletePostComment(input as any, {
        onSuccess: successData => {
          if (successData?.comment_deleteComment?.value === 'Success') {
            queryClient.invalidateQueries(queryKeys.getCommentsByPostId);
            queryClient.invalidateQueries(queryKeys.getPostById);

            queryClient.invalidateQueries(queryKeys.getPostById);
            queryClient.invalidateQueries([queryKeys.getTopicPosts], {
              exact: false,
            });
            queryClient.invalidateQueries(queryKeys.getPosts);
            queryClient.invalidateQueries(
              queryKeys.getExplorePostsByCategoryId,
            );
            queryClient.invalidateQueries(queryKeys.getFollowingExplorePosts);
            queryClient.invalidateQueries(queryKeys.getNearbyExplorePosts);

            setDeleteCommentModal({
              showModal: false,
              isTopicComments: false,
              commentId: null,
            });
          } else if (
            successData?.comment_deleteComment?.value === 'HasRelatedData'
          ) {
            snackBar(messageHelper('HasRelatedData'));
          }
        },
      });
    }
  }

  return (
    <Modal
      isOpen={deleteCommentModal?.showModal}
      onClose={() =>
        setDeleteCommentModal({
          showModal: false,
          isTopicComments: false,
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
            {deleteTopicCommentLoading || deletePostCommentLoading ? (
              <ActivityIndicator size={28} color={Colors.primary} />
            ) : (
              <Text {...styles['headerTxt']}>{Strings.moreOption}</Text>
            )}

            <HStack mb={16} alignSelf="flex-start" ml={3}>
              <UserOptionMenuBtn
                icon={trash}
                title={Strings.delete}
                onPress={deleteComment}
              />
            </HStack>
          </Modal.Body>
        </BlurView>
        <FlashMessage ref={snackBarRef} position="bottom" />
      </Modal.Content>
    </Modal>
  );
};

export default DeleteCommentModal;

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
