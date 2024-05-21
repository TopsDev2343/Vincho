import React, {useRef} from 'react';
import {Text, Modal, HStack, Button, VStack} from 'native-base';
import FlashMessage from 'react-native-flash-message';
import Clipboard from '@react-native-clipboard/clipboard';
import {ActivityIndicator} from 'react-native';
import {useQueryClient} from 'react-query';

import {
  useOptionMenuStore,
  useReportStore,
  useClickedPostInfoStore,
  useAuthStore,
  useUserCollectionListStore,
} from '~/stores';
import {Colors} from '~/styles/colors';
import {Fonts} from '~/styles/fonts';
import {UserOptionMenuBtn, HelveticaRegularText} from '~/components';
import {
  share,
  copy,
  report,
  trash,
  deleteRed,
  filledChevronRight,
  angelRight,
} from '~/assets/icons';
import {shareWithSocial} from '~/utils/shareWithSocial';
import {Strings} from '~/assets/strings/index';
import {BlurView} from '@react-native-community/blur';
import {successSnackBar, windowWidth} from '~/styles/globalStyles';
import {useDeletePost} from '~/hooks/artist/Posts';
import {queryKeys} from '~/constants/queryKeys';
import useCollectionOptionMenuStore from '~/stores/userCollectionOptionMenuStore';
import {SvgXml} from 'react-native-svg';
import {useDeletePostFromCollection} from '~/hooks/artist/Collection';
import snackBar from '~/utils/snackBar';
import {messageHelper} from '~/utils/messageHelper';

const UserCollectionOptionMenu = ({
  postId,
  baseCollectionId,
}: {
  postId: number;
  baseCollectionId: number;
}) => {
  const queryClient = useQueryClient();
  const snackBarRef = useRef(null);
  const {showModal, setShowModal} = useCollectionOptionMenuStore(
    state => state,
  );
  const {setShowReportModal} = useReportStore(state => state);
  const {setUserCollectionModal} = useUserCollectionListStore(state => state);

  const {postInfo} = useClickedPostInfoStore(state => state);
  const {userId} = useAuthStore(state => state);
  const {mutate: mutateDeletePost, isLoading: deletePostLoading} =
    useDeletePostFromCollection();

  function copyToClipboard(info: string) {
    let description =
      'Created by ' + postInfo?.user?.userName + ' \n in Vincho App \n' + info;

    Clipboard.setString(description);
    snackBarRef?.current?.showMessage({
      message: 'Copied',
      ...successSnackBar,
    });
  }

  function deleteFromCollection() {
    mutateDeletePost(
      {baseCollectionId: baseCollectionId, postId: postId},
      {
        onSuccess: successData => {
          if (
            successData?.collection_deleteFromCollection?.value === 'Success'
          ) {
            /* snackBar(
              messageHelper(successData.collection_deleteFromCollection?.value),
            ); */
            queryClient.invalidateQueries(queryKeys.getBaseCollectionById);
            queryClient.invalidateQueries(queryKeys.getBaseCollections);
            setShowModal(false);
          }
        },
      },
    );
  }

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
            {deletePostLoading ? (
              <ActivityIndicator size={28} color={Colors.primary} />
            ) : (
              <Text {...styles['headerTxt']}>{Strings.moreOption}</Text>
            )}
            <HStack mb={4}>
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
              <UserOptionMenuBtn
                icon={report}
                title={Strings.report}
                onPress={() => [setShowReportModal(true), setShowModal(false)]}
              />
            </HStack>

            <HStack mb={16}>
              <Button
                onPress={() => [
                  setUserCollectionModal(true),
                  setShowModal(false),
                ]}
                width={24}
                mx={2}
                px={0}
                height={24}
                bg={Colors.OnOverlay}
                borderRadius={6}>
                <VStack alignItems={'center'}>
                  <SvgXml xml={angelRight} />
                  <HelveticaRegularText
                    textAlign={'center'}
                    text={Strings.moveToAnotherCollection}
                    fontSize={12}
                    color={Colors.white}
                    mt={2}
                  />
                </VStack>
              </Button>

              <Button
                onPress={() => {
                  deleteFromCollection();
                }}
                width={24}
                mx={2}
                height={24}
                bg={Colors.OnOverlay}
                borderRadius={6}>
                <VStack alignItems={'center'}>
                  <SvgXml xml={deleteRed} />
                  <HelveticaRegularText
                    textAlign={'center'}
                    text={Strings.deleteFromCollection}
                    fontSize={12}
                    color={Colors.white}
                    mt={2}
                  />
                </VStack>
              </Button>
            </HStack>
          </Modal.Body>
        </BlurView>
        <FlashMessage ref={snackBarRef} position="bottom" />
      </Modal.Content>
    </Modal>
  );
};

export default UserCollectionOptionMenu;

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
