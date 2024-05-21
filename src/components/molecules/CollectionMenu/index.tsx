import React, {useRef, useState} from 'react';
import {Text, Modal, VStack, HStack, Button} from 'native-base';
import {BlurView} from '@react-native-community/blur';
import FlashMessage from 'react-native-flash-message';
import {Colors} from '~/styles/colors';
import {Fonts} from '~/styles/fonts';
import {HelveticaRegularText} from '~/components';
import {useCollectionStore} from '~/stores';
import {ActivityIndicator} from 'react-native';
import {successSnackBar, errorSnackBar} from '~/styles/globalStyles';
import {scale, verticalScale} from 'react-native-size-matters';
import {SvgXml} from 'react-native-svg';
import {deleteRed, edit} from '~/assets/icons';
import {DeleteModal} from '~/components/atoms/DeleteModal';
import {goBack, navigate} from '~/navigation/methods';
import {useDeleteCollection} from '~/hooks/artist/Collection';
import {Strings} from '~/assets/strings';

const CollectionMenu = ({
  entityId,
  collections,
  title,
}: {
  entityId: number;
  collections: any;
  title: String;
}) => {
  const {showCollectionModal, setShowCollectionModal} = useCollectionStore(
    state => state,
  );
  const snackBarRef = useRef(null);
  const {mutate: mutateDelete, isLoading: isDeleting} = useDeleteCollection();
  const [showModal, setShowModal] = useState<boolean>(false);
  function deleteOnPress() {
    mutateDelete(entityId, {
      onSuccess: successData => {
        if (
          successData.baseCollection_deleteBaseCollection?.value == 'Success'
        ) {
          goBack();
        } else {
          snackBarRef?.current?.showMessage({
            message: successData.baseCollection_deleteBaseCollection?.value,
            ...errorSnackBar,
          });
        }
      },
    });
  }
  function editOnPress() {
    navigate('EditCollection', {
      entityId: entityId,
      collections: collections,
      title: title,
    });
    setShowCollectionModal(false);
  }
  return (
    <Modal
      isOpen={showCollectionModal}
      onClose={() => setShowCollectionModal(false)}
      safeAreaTop={true}>
      <Modal.Content width="100%" {...styles['bottom']}>
        <BlurView
          blurType="dark"
          blurRadius={25}
          blurAmount={25}
          reducedTransparencyFallbackColor="transparent">
          <Modal.Body alignItems={'center'}>
            {isDeleting ? (
              <ActivityIndicator size={28} color={Colors.primary} />
            ) : (
              <Text {...styles['headerTxt']}>More Option</Text>
            )}
            <HStack mb={12} justifyContent={'space-evenly'} width={'100%'}>
              <Button
                my={3}
                bg={Colors.OnOverlay}
                borderRadius={6}
                onPress={editOnPress}
                w={scale(104)}
                h={scale(109)}>
                <VStack alignItems={'center'} justifyContent={'center'}>
                  <SvgXml xml={edit} />
                  <HelveticaRegularText
                    text={'Edit Collection'}
                    fontSize={12}
                    color={Colors.txtLight}
                    width="100%"
                    mt={verticalScale(5)}
                  />
                </VStack>
              </Button>

              <Button
                my={3}
                bg={Colors.OnOverlay}
                borderRadius={6}
                onPress={() => {
                  setShowModal(true);
                }}
                w={scale(104)}
                h={scale(109)}>
                <VStack alignItems={'center'} justifyContent={'center'}>
                  <SvgXml xml={deleteRed} />
                  <HelveticaRegularText
                    text={'Delete Collection'}
                    fontSize={12}
                    color={Colors.txtLight}
                    width="100%"
                    mt={verticalScale(5)}
                  />
                </VStack>
              </Button>
            </HStack>
          </Modal.Body>

          <DeleteModal
            showModal={showModal}
            setShowModal={setShowModal}
            deleteOnPress={() => {
              deleteOnPress();
            }}
            title={Strings.wantToDeleteCollection}
          />
        </BlurView>

        <FlashMessage ref={snackBarRef} position="bottom" />
      </Modal.Content>
    </Modal>
  );
};

export default CollectionMenu;

const styles = {
  bottom: {
    marginBottom: 0,
    marginTop: 'auto',
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
    backgroundColor: Colors.transparent,
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
