import React, {useRef, useState} from 'react';
import {Text, Modal, HStack, VStack} from 'native-base';
import FlashMessage from 'react-native-flash-message';
import Clipboard from '@react-native-clipboard/clipboard';
import {ActivityIndicator} from 'react-native';
import {useQueryClient} from 'react-query';

import {
  useOptionMenuStore,
  useReportStore,
  useClickedPostInfoStore,
  useAuthStore,
} from '~/stores';
import {Colors} from '~/styles/colors';
import {Fonts} from '~/styles/fonts';
import {UserOptionMenuBtn} from '~/components';
import {share, copy, report, trash, deleteRed} from '~/assets/icons';
import {shareWithSocial} from '~/utils/shareWithSocial';
import {Strings} from '~/assets/strings/index';
import {BlurView} from '@react-native-community/blur';
import {successSnackBar, windowWidth} from '~/styles/globalStyles';
import {useDeletePost, useRecommendPost} from '~/hooks/artist/Posts';
import {queryKeys} from '~/constants/queryKeys';
import {useDeleteTopicPost} from '~/hooks/artist/Topic';
import {DeleteModal} from '~/components/atoms/DeleteModal';
import {canGoBack, goBack} from '~/navigation/methods';
import {useDeletePostFromAllPost} from '~/hooks/artist/Collection';

const UserOptionMenu = ({isAdmin}: {isAdmin?: Boolean}) => {
  const queryClient = useQueryClient();
  const snackBarRef = useRef(null);
  const {optionMenuModal, setOptionMenuModal} = useOptionMenuStore(
    state => state,
  );
  const {setShowReportModal} = useReportStore(state => state);
  const {postInfo} = useClickedPostInfoStore(state => state);
  const {userId} = useAuthStore(state => state);
  const {mutate: mutateDeletePost, isLoading: deletePostLoading} =
    useDeletePost();
  const {mutate: mutateDeleteTopicPost, isLoading: deleteTopicPostLoading} =
    useDeleteTopicPost();
  const {mutate: mutateRecommendPost, isLoading: recommendPostLoading} =
    useRecommendPost();

  const {mutate: mutateDeleteFromAllPost, isLoading: deleteFromAllPostLoading} =
    useDeletePostFromAllPost();

  const [showModal, setShowModal] = useState<boolean>(false);

  function copyToClipboard(info: string) {
    let description =
      'Created by ' + postInfo?.user?.userName + ' \n in Vincho App \n' + info;

    Clipboard.setString(description);
    snackBarRef?.current?.showMessage({
      message: 'Copied',
      ...successSnackBar,
    });
  }

  function deletePost() {
    const input = {entityId: postInfo?.id};
    if (optionMenuModal.isTopicPost) {
      mutateDeleteTopicPost(input as any, {
        onSuccess: successData => {
          if (successData?.topicPost_deleteTopicPost?.value === 'Success') {
            queryClient.invalidateQueries(queryKeys.getTopicPosts);
            goBack();
          } else {
            snackBarRef?.current?.showMessage({
              message: successData?.topicPost_deleteTopicPost?.value,
              ...successSnackBar,
            });
          }
        },
      });
    } else {
      mutateDeletePost(input as any, {
        onSuccess: successData => {
          if (successData?.post_deletePost?.value === 'Success') {
            queryClient.invalidateQueries(
              queryKeys.getExplorePostsByCategoryId,
            );
            queryClient.invalidateQueries(queryKeys.getFollowingExplorePosts);
            queryClient.invalidateQueries(queryKeys.getPopularExplorePosts);
            queryClient.invalidateQueries(queryKeys.getPosts);
            if (canGoBack()) {
              goBack();
            }
            setOptionMenuModal({
              showModal: false,
              isTopicPost: false,
            });
          }
        },
      });
    }
  }

  function setAsRecommendation() {
    const input = {
      entityId: postInfo?.id,
      setAsRecommended: !postInfo?.setAsRecommended,
    };

    mutateRecommendPost(input as any, {
      onSuccess: successData => {
        if (successData?.post_setAsRecommended?.status?.value === 'Success') {
          queryClient.invalidateQueries(queryKeys.getExplorePostsByCategoryId);
          queryClient.invalidateQueries(queryKeys.getFollowingExplorePosts);
          queryClient.invalidateQueries(queryKeys.getPopularExplorePosts);
          queryClient.invalidateQueries(queryKeys.getPosts);
          queryClient.invalidateQueries(queryKeys.getPostById);
          setOptionMenuModal({
            showModal: false,
            isTopicPost: false,
          });
        }
      },
    });
  }

  function deletePostFromAllPost() {
    if (optionMenuModal.showDeleteFromCollection) {
      const input = {postId: postInfo?.id};
      mutateDeleteFromAllPost(input as any, {
        onSuccess: successData => {
          if (successData?.postSav_deletePostSav?.value === 'Success') {
            queryClient.invalidateQueries(queryKeys.getCollections);
            queryClient.invalidateQueries(queryKeys.getBaseCollectionById);
            queryClient.invalidateQueries(queryKeys.getBaseCollections);
            queryClient.invalidateQueries(queryKeys.getPostSave);
            setOptionMenuModal({
              showModal: false,
              isTopicPost: false,
              showDeleteFromCollection: false,
            });
            goBack();
          } else {
            snackBarRef?.current?.showMessage({
              message: successData?.postSav_deletePostSav?.value,
              ...successSnackBar,
            });
          }
        },
      });
    }
  }
  return (
    <Modal
      isOpen={optionMenuModal.showModal}
      onClose={() =>
        setOptionMenuModal({
          showModal: false,
          isTopicPost: false,
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
            {deletePostLoading ||
            deleteTopicPostLoading ||
            recommendPostLoading ||
            deleteFromAllPostLoading ? (
              <ActivityIndicator size={28} color={Colors.primary} />
            ) : (
              <Text {...styles['headerTxt']}>{Strings.moreOption}</Text>
            )}
            {isAdmin == false && (
              <VStack>
                <HStack
                  mb={
                    userId == postInfo?.user?.id ||
                    optionMenuModal.showDeleteFromCollection == true
                      ? 4
                      : 16
                  }>
                  <UserOptionMenuBtn
                    icon={share}
                    title={Strings.share}
                    onPress={() =>
                      shareWithSocial(postInfo?.fileUrl, postInfo?.caption)
                    }
                  />
                  <UserOptionMenuBtn
                    icon={copy}
                    title={Strings.copy}
                    onPress={() => copyToClipboard(postInfo?.fileUrl)}
                  />
                  {userId != postInfo?.user?.id ? (
                    <UserOptionMenuBtn
                      icon={report}
                      title={Strings.report}
                      onPress={() => [
                        setShowReportModal({
                          showModal: true,
                          isTopicPost: optionMenuModal.isTopicPost,
                        }),
                        setOptionMenuModal({
                          showModal: false,
                          isTopicPost: optionMenuModal.isTopicPost,
                        }),
                      ]}
                    />
                  ) : (
                    userId == postInfo?.user?.id && (
                      <UserOptionMenuBtn
                        icon={trash}
                        title={Strings.delete}
                        onPress={() => {
                          setShowModal(true);
                        }}
                      />
                    )
                  )}
                </HStack>
                {optionMenuModal?.showDeleteFromCollection && (
                  <HStack mb={userId == postInfo?.user?.id ? 4 : 16}>
                    <UserOptionMenuBtn
                      icon={deleteRed}
                      title={Strings.deleteFromAllPost}
                      onPress={() => deletePostFromAllPost()}
                    />
                  </HStack>
                )}
              </VStack>
            )}
            {isAdmin == true && (
              <HStack mb={16}>
                <UserOptionMenuBtn
                  icon={null}
                  title={Strings.delete}
                  onPress={() => {
                    setShowModal(true);
                  }}
                />

                {optionMenuModal.isTopicPost == false && (
                  <UserOptionMenuBtn
                    icon={null}
                    title={
                      postInfo?.setAsRecommended
                        ? Strings.removeRecommendation
                        : Strings.setAsRecommendation
                    }
                    onPress={() => {
                      setAsRecommendation();
                    }}
                  />
                )}
              </HStack>
            )}
          </Modal.Body>

          <DeleteModal
            showModal={showModal}
            setShowModal={setShowModal}
            deleteOnPress={() => {
              deletePost();
            }}
            title={Strings.wantToDeletePost}
          />
        </BlurView>
        <FlashMessage ref={snackBarRef} position="bottom" />
      </Modal.Content>
    </Modal>
  );
};

export default UserOptionMenu;

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
