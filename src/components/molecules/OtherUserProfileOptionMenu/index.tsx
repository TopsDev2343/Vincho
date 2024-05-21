import React, {useRef, useState} from 'react';
import {Text, Modal, HStack} from 'native-base';
import FlashMessage from 'react-native-flash-message';
import {ActivityIndicator} from 'react-native';

import {
  useAuthStore,
  useOtherUserProfileOptionMenuStore,
  useReportUserStore,
} from '~/stores';
import {Colors} from '~/styles/colors';
import {Fonts} from '~/styles/fonts';
import {UserOptionMenuBtn} from '~/components';
import {share, report, block, profileOutline} from '~/assets/icons';
import {shareWithSocial} from '~/utils/shareWithSocial';
import {Strings} from '~/assets/strings/index';
import {BlurView} from '@react-native-community/blur';
import {windowWidth} from '~/styles/globalStyles';
import {
  useCreateBlock,
  useDeleteBlock,
  useGetBlocks,
} from '~/hooks/artist/Block';
import snackBar from '~/utils/snackBar';
import {messageHelper} from '~/utils/messageHelper';
import {queryKeys} from '~/constants/queryKeys';
import {useQueryClient} from 'react-query';

const OtherUserProfileOptionMenu = ({
  entityId,
  isChat,
}: {
  entityId: number;
  isChat?: boolean;
}) => {
  const queryClient = useQueryClient();
  const snackBarRef = useRef(null);
  const {showModal, setShowModal} = useOtherUserProfileOptionMenuStore(
    state => state,
  );
  const {setShowReportModal} = useReportUserStore(state => state);
  const {userId} = useAuthStore(state => state);
  const {mutate, isLoading} = useCreateBlock();
  const [blockedId, setblockedId] = useState(0);
  const {mutate: unFollowUserMutate, isLoading: isUnBlocking} =
    useDeleteBlock();

  const {isLoading: isLoadingBlock} = useGetBlocks(
    {
      blockerUserId: {eq: userId},
      blockedUserId: {eq: entityId},
    },
    {
      onSuccess: data => {
        if (data?.pages.length > 0) {
          setblockedId(data?.pages[0]?.id);
        } else {
          setblockedId(0);
        }
      },
    },
  );

  function blockUser() {
    const input = {
      blockedUserId: entityId,
      blockerUserId: userId,
    };
    mutate(input as any, {
      onSuccess: successData => {
        if (successData?.block_createBlock?.value !== 'Success') {
          snackBar(messageHelper(successData.block_createBlock?.status.value));
        }
      },
    });
  }

  const deleteBlock = () => {
    let entityId = blockedId;
    unFollowUserMutate(entityId as any, {
      onSuccess: successData => {
        if (successData.block_deleteBlock?.value !== 'Success') {
          snackBar(messageHelper(successData.block_deleteBlock?.value));
        }
      },
    });
  };

  return (
    <Modal
      isOpen={showModal}
      onClose={() => setShowModal(false)}
      safeAreaTop={true}>
      <Modal.Content maxWidth={windowWidth} {...styles['bottom']}>
        <BlurView
          blurType="dark"
          blurRadius={25}
          blurAmount={25}
          reducedTransparencyFallbackColor="transparent">
          <Modal.Body alignItems={'center'}>
            {isLoading || isLoadingBlock ? (
              <ActivityIndicator size={28} color={Colors.primary} />
            ) : (
              <Text {...styles['headerTxt']}>{Strings.moreOption}</Text>
            )}
            <HStack mb={16}>
              {!isChat && (
                <UserOptionMenuBtn
                  icon={share}
                  title={Strings.share}
                  onPress={() => {
                    const userInitialInfo = queryClient.getQueryData([
                      queryKeys.getUserProfileById,
                      entityId,
                    ]);
                    shareWithSocial(
                      userInitialInfo?.user_getProfile?.result?.photoUrl != null
                        ? userInitialInfo?.user_getProfile?.result?.photoUrl
                        : 'No Photo Founded',
                      userInitialInfo?.user_getProfile?.result?.userName,
                    );
                  }}
                />
              )}
              {!isLoadingBlock ? (
                blockedId == 0 ? (
                  <UserOptionMenuBtn
                    icon={block}
                    title={Strings.block}
                    onPress={() => blockUser()}
                  />
                ) : (
                  <UserOptionMenuBtn
                    icon={profileOutline}
                    title={Strings.unblock}
                    onPress={() => deleteBlock()}
                  />
                )
              ) : null}

              <UserOptionMenuBtn
                icon={report}
                title={Strings.report}
                onPress={() => {
                  setShowModal(false);
                  setShowReportModal(true);
                }}
              />
            </HStack>
          </Modal.Body>
        </BlurView>
        <FlashMessage ref={snackBarRef} position="bottom" />
      </Modal.Content>
    </Modal>
  );
};

export default OtherUserProfileOptionMenu;

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
