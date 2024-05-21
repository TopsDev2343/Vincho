import React, {useRef} from 'react';
import {Text, Modal, VStack} from 'native-base';
import {BlurView} from '@react-native-community/blur';
import FlashMessage from 'react-native-flash-message';

import {Colors} from '~/styles/colors';
import {Fonts} from '~/styles/fonts';
import {ReportBtn} from '~/components';
import {Strings} from '~/assets/strings';
import {useReportUserStore, useAuthStore} from '~/stores';
import {useReportUser} from '~/hooks/artist/Posts';
import {reportReason} from '~/@types/global';
import {ActivityIndicator} from 'react-native';
import {
  successSnackBar,
  errorSnackBar,
  windowWidth,
} from '~/styles/globalStyles';

const ReportUser = ({entityId}: {entityId: number}) => {
  const {showReportModal, setShowReportModal} = useReportUserStore(
    state => state,
  );
  const snackBarRef = useRef(null);
  const {mutate, isLoading} = useReportUser();
  const {userId} = useAuthStore(state => state);

  function reportOnPress(violationType: string) {
    const input = {
      reportedUserId: entityId,
      violationType: violationType,
      reporterUserId: userId,
      isReviewed: false,
    };
    mutate(input as any, {
      onSuccess: successData => {
        if (
          successData.reportUser_createReportUser?.status.value === 'Success'
        ) {
          setShowReportModal(false);
        } else {
          snackBarRef?.current?.showMessage({
            message: successData.reportUser_createReportUser?.status.value,
            ...errorSnackBar,
          });
        }
      },
    });
  }

  return (
    <Modal
      isOpen={showReportModal}
      onClose={() => setShowReportModal(false)}
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
              <Text {...styles['headerTxt']}>{Strings.report}</Text>
            )}
            <Text {...styles['questionTxt']}>{Strings.whyReportUser}</Text>
            <VStack mb={12}>
              <ReportBtn
                title={Strings.spam}
                onPress={() => reportOnPress(reportReason.Spam)}
              />
              <ReportBtn
                title={Strings.nudity}
                onPress={() => reportOnPress(reportReason.Nudity)}
              />
              <ReportBtn
                title={Strings.hate}
                onPress={() => reportOnPress(reportReason.Hate)}
              />
              <ReportBtn
                title={Strings.scam}
                onPress={() => reportOnPress(reportReason.Scam)}
              />
              <ReportBtn
                title={Strings.something}
                onPress={() => reportOnPress(reportReason.other)}
              />
            </VStack>
          </Modal.Body>
        </BlurView>

        <FlashMessage ref={snackBarRef} position="bottom" />
      </Modal.Content>
    </Modal>
  );
};

export default ReportUser;

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
