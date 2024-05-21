import React, {useRef, useState} from 'react';
import {Modal, FlatList, View, Image} from 'native-base';
import FlashMessage from 'react-native-flash-message';
import {ActivityIndicator, TouchableOpacity, Text} from 'react-native';
import {useQueryClient} from 'react-query';

import {useAuthStore, useUserCollectionListStore} from '~/stores';
import {Colors} from '~/styles/colors';
import {Fonts} from '~/styles/fonts';
import {Strings} from '~/assets/strings/index';
import {BlurView} from '@react-native-community/blur';
import {successSnackBar, windowWidth} from '~/styles/globalStyles';
import {queryKeys} from '~/constants/queryKeys';
import {
  useGetBaseCollections,
  useMoveToCollection,
} from '~/hooks/artist/Collection';
import PostPlayVideo from '~/components/atoms/PostPlayVideo';
import {postFileType} from '~/@types/global';
import HelveticaRegularText from '~/components/atoms/HelveticaRegularText';
import {width} from '~/utils/dimension';
import LinearGradient from 'react-native-linear-gradient';
import {messageHelper} from '~/utils/messageHelper';
import snackBar from '~/utils/snackBar';

const UserCollectionList = ({
  postId,
  baseCollectionId,
  collectionId,
}: {
  postId: number;
  baseCollectionId: number;
  collectionId: number;
}) => {
  const queryClient = useQueryClient();
  const snackBarRef = useRef(null);
  const {userCollectionModal, setUserCollectionModal} =
    useUserCollectionListStore(state => state);
  const {userId} = useAuthStore(state => state);
  const {mutate, isLoading: isMoving} = useMoveToCollection();

  const [where] = useState<object | undefined>({
    id: {neq: baseCollectionId},
    userId: {eq: userId},
  });
  const {isRefetching, isLoading, data, fetchNextPage, hasNextPage, refetch} =
    useGetBaseCollections({where: where});

  const moveOnPress = (id: number) => {
    const input = {
      baseCollectionId: id,
      id: collectionId,
      postId: postId,
    };
    mutate(input, {
      onSuccess: successData => {
        if (
          successData?.collection_updateCollection?.status.value === 'Success'
        ) {
          snackBar(
            messageHelper(
              successData.collection_updateCollection?.status.value,
            ),
          );

          queryClient.invalidateQueries(queryKeys.getBaseCollectionById);
          queryClient.invalidateQueries(queryKeys.getBaseCollections);
          setUserCollectionModal(false);
        }
      },
    });
  };
  const renderItem = ({item, index}) => {
    let lastItemPostUrl =
      item?.collections[item.collections?.length - 1]?.post?.fileUrl;
    let fileType =
      item?.collections[item.collections?.length - 1]?.post?.fileType;
    return (
      <View mt={2} flex={1} alignItems={'flex-start'}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            moveOnPress(item.id);
          }}
          style={styles.itemButon}>
          {lastItemPostUrl != '' ? (
            <View style={[styles.itemContainer, {}]}>
              {fileType === postFileType.Image ? (
                <Image
                  source={{uri: lastItemPostUrl}}
                  alt={'image'}
                  style={styles.img}
                />
              ) : fileType === postFileType.Video ? (
                <PostPlayVideo uri={lastItemPostUrl} width={width / 2.1} />
              ) : (
                <LinearGradient
                  colors={Colors.gradientDivider}
                  style={styles.container}>
                  <Text style={styles.wrongFormatTxt}>
                    {Strings.wrongFormatTxt}
                  </Text>
                </LinearGradient>
              )}
            </View>
          ) : (
            <View
              style={[
                styles.itemContainer,
                {backgroundColor: Colors.white},
              ]}></View>
          )}
        </TouchableOpacity>
        <HelveticaRegularText
          text={item?.title}
          fontSize={16}
          color={Colors.white}
          mt={2}
          ml={3}
          textAlign={'left'}
          width={'100%'}
        />
      </View>
    );
  };

  return (
    <Modal
      isOpen={userCollectionModal}
      onClose={() => setUserCollectionModal(false)}
      safeAreaTop={true}>
      <Modal.Content maxWidth={windowWidth} {...styles['bottom']}>
        <BlurView
          blurType="dark"
          blurRadius={25}
          blurAmount={25}
          reducedTransparencyFallbackColor="transparent">
          <Modal.Body alignItems={'center'}>
            {isLoading || isMoving ? (
              <ActivityIndicator size={28} color={Colors.primary} />
            ) : (
              <Text style={styles.headerTxt}>{Strings.moreOption}</Text>
            )}

            <FlatList
              keyExtractor={(item, index) => index.toString()}
              onEndReachedThreshold={0.9}
              onEndReached={() => {
                if (hasNextPage) {
                  fetchNextPage();
                }
              }}
              ListEmptyComponent={
                <HelveticaRegularText
                  text={Strings.emptyString}
                  fontSize={16}
                  color={Colors.cleanWhite}
                  mt={6}
                  textAlign={'center'}
                />
              }
              onRefresh={refetch}
              refreshing={isRefetching}
              data={data?.pages}
              numColumns={2}
              style={{width: '100%'}}
              contentContainerStyle={{justifyContent: 'space-between'}}
              renderItem={renderItem}
            />
          </Modal.Body>
        </BlurView>
        <FlashMessage ref={snackBarRef} position="bottom" />
      </Modal.Content>
    </Modal>
  );
};

export default UserCollectionList;

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
    color: Colors.white,
    ...Fonts.smallReg,
    mb: 8,
  },
  screencContainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 15,
  },
  itemContainer: {
    margin: 1,
    width: width / 2,
    height: width / 2 + 10,
  },
  img: {
    width: width / 2,
    height: width / 2 + 10,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: width / 2,
    height: width / 2 + 10,
  },
  wrongFormatTxt: {
    color: Colors.white,
    textAlign: 'center',
  },
  itemButon: {
    width: width / 2.2,
    height: width / 2.2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
    borderRadius: 16,
    overflow: 'hidden',
    margin: 1,
    marginHorizontal: 5,
  },
};
