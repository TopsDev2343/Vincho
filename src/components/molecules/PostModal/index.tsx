import React, {useRef, useEffect} from 'react';
import {Modal} from 'native-base';
import FlashMessage from 'react-native-flash-message';

import {
  usePostModalStore,
  useClickedPostInfoStore,
  usePostLikeUserId,
  useAuthStore,
  useForwardPostModalStore,
} from '~/stores';
import {PostBtnRow, PostCaption} from '~/components';
import {BlurView} from '@react-native-community/blur';
import {navigate} from '~/navigation/methods';
import {windowWidth, successSnackBar} from '~/styles/globalStyles';
import {useCreateLikePost, useDislikePost} from '~/hooks/artist/Posts';
import {CustomKeyboardAwareScrollView} from '~/components';

const PostModal = () => {
  const snackBarRef = useRef(null);
  const {showPostModal, setShowPostModal} = usePostModalStore(state => state);
  const {postInfo} = useClickedPostInfoStore(state => state);
  const {userId} = useAuthStore(state => state);
  const {setShowForwardPostModal} = useForwardPostModalStore(state => state);

  const {mutate: mutateCreateLike, isLoading: createLikeLoading} =
    useCreateLikePost();
  const {mutate: mutateDislikePost, isLoading: deleteLikeLoading} =
    useDislikePost();
  const {postLikeUserId, setPostLikeUserId} = usePostLikeUserId(state => state);

  useEffect(() => {
    let likedList = postInfo?.postLikes?.map(({userId}) => userId);
    setPostLikeUserId(likedList);
  }, [postInfo]);

  function likeOnPress() {
    const input = {
      postId: postInfo?.id,
      userId: userId,
    };
    if (postLikeUserId?.includes(userId)) {
      mutateDislikePost(input as any, {
        onSuccess: successData => {
          if (successData?.postLike_deletePostLike?.value === 'Success') {
            let likedList = postLikeUserId;
            setPostLikeUserId(likedList?.filter(value => value !== userId));
          }
        },
      });
    } else {
      mutateCreateLike(input as any, {
        onSuccess: successData => {
          if (
            successData?.postLike_createPostLike?.status?.value === 'Success'
          ) {
            setPostLikeUserId([...postLikeUserId, userId]);
          } else {
          }
        },
      });
    }
  }

  function commentOnPress() {
    navigate('CommentsScreen');
    setShowPostModal(false);
  }
  function forwardOnPress() {
    setShowForwardPostModal(true);
    setShowPostModal(false);
  }

  return (
    <Modal
      isOpen={showPostModal}
      onClose={() => setShowPostModal(false)}
      safeAreaTop={true}
      _fade={{exitDuration: 1000}}>
      <Modal.Content {...styles['bottom']} maxWidth={windowWidth}>
        <CustomKeyboardAwareScrollView>
          <BlurView
            blurType="dark"
            blurRadius={25}
            blurAmount={25}
            reducedTransparencyFallbackColor="transparent">
            <Modal.Body>
              <PostCaption isPostModal={true} postInfo={postInfo} />
              <PostBtnRow
                likeOnPress={likeOnPress}
                commentOnPress={commentOnPress}
                forwardOnPress={forwardOnPress}
                isLiked={postLikeUserId?.includes(userId)}
                isLoading={createLikeLoading || deleteLikeLoading}
              />
            </Modal.Body>
          </BlurView>
          <FlashMessage ref={snackBarRef} position="bottom" />
        </CustomKeyboardAwareScrollView>
      </Modal.Content>
    </Modal>
  );
};

export default PostModal;

const styles = {
  bottom: {
    marginBottom: 0,
    marginTop: 'auto',
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
    backgroundColor: 'transparent',
    width: windowWidth,
    flex: 1,
    position: 'absolute',
    bottom: 0,
  },
};
