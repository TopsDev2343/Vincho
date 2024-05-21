import React, {useRef} from 'react';
import {Text, Modal, VStack} from 'native-base';
import {BlurView} from '@react-native-community/blur';
import FlashMessage from 'react-native-flash-message';

import {Colors} from '~/styles/colors';
import {Fonts} from '~/styles/fonts';
import {ReportBtn} from '~/components';
import {Strings} from '~/assets/strings';
import {useReportStore, useAuthStore, useClickedPostInfoStore} from '~/stores';
import {useReportPost} from '~/hooks/artist/Posts';
import {reportReason} from '~/@types/global';
import {ActivityIndicator} from 'react-native';
import {
  successSnackBar,
  errorSnackBar,
  windowWidth,
} from '~/styles/globalStyles';
import {useReportTopicPost} from '~/hooks/artist/Topic';

const ReportMenu = () => {
  const {showReportModal, setShowReportModal} = useReportStore(state => state);
  const snackBarRef = useRef(null);
  const {postInfo} = useClickedPostInfoStore(state => state);
  const {mutate: mutateReportPost, isLoading: reportPostLoading} =
    useReportPost();
  const {mutate: mutateReportTopicPost, isLoading: reportPostTopicLoading} =
    useReportTopicPost();
  const {userId} = useAuthStore(state => state);

  function reportOnPress(postId: number, violationType: string) {
    if (showReportModal.isTopicPost) {
      const input = {
        topicPostId: postId,
        violationType: violationType,
        reporterUserId: userId,
        isReviewed: false,
      };
      mutateReportTopicPost(input as any, {
        onSuccess: successData => {
          if (
            successData.reportTopicPost_createReportTopicPost?.status.value !=
            'Success'
          ) {
            snackBarRef?.current?.showMessage({
              message:
                successData.reportTopicPost_createReportTopicPost?.status.value,
              ...errorSnackBar,
            });
          } else {
            setShowReportModal({
              showModal: false,
              isTopicPost: showReportModal.isTopicPost,
            });
          }
        },
      });
    } else {
      const input = {
        postId: postId,
        violationType: violationType,
        reporterUserId: userId,
        isReviewed: false,
      };
      mutateReportPost(input as any, {
        onSuccess: successData => {
          if (
            successData.reportPost_createReportPost?.status.value != 'Success'
          ) {
            snackBarRef?.current?.showMessage({
              message: successData.reportPost_createReportPost?.status.value,
              ...errorSnackBar,
            });
          } else {
            setShowReportModal({
              showModal: false,
              isTopicPost: showReportModal.isTopicPost,
            });
          }
        },
      });
    }
  }

  return (
    <Modal
      isOpen={showReportModal.showModal}
      onClose={() =>
        setShowReportModal({
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
            {reportPostLoading || reportPostTopicLoading ? (
              <ActivityIndicator size={28} color={Colors.primary} />
            ) : (
              <Text {...styles['headerTxt']}>{Strings.report}</Text>
            )}
            <Text {...styles['questionTxt']}>{Strings.whyReport}</Text>
            <VStack mb={12}>
              <ReportBtn
                title={Strings.spam}
                onPress={() => reportOnPress(postInfo?.id, reportReason.Spam)}
              />
              <ReportBtn
                title={Strings.nudity}
                onPress={() => reportOnPress(postInfo?.id, reportReason.Nudity)}
              />
              <ReportBtn
                title={Strings.hate}
                onPress={() => reportOnPress(postInfo?.id, reportReason.Hate)}
              />
              <ReportBtn
                title={Strings.scam}
                onPress={() => reportOnPress(postInfo?.id, reportReason.Scam)}
              />
              <ReportBtn
                title={Strings.something}
                onPress={() => reportOnPress(postInfo?.id, reportReason.other)}
              />
            </VStack>
          </Modal.Body>
        </BlurView>

        <FlashMessage ref={snackBarRef} position="bottom" />
      </Modal.Content>
    </Modal>
  );
};

export default ReportMenu;

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
    mb: 4,
  },
  questionTxt: {
    color: Colors.txtMedium,
    ...Fonts.smallReg,
    mb: 4,
    alignSelf: 'flex-start',
    ml: 1,
  },
};
