import React, {useState, useEffect, useRef} from 'react';
import {Modal, VStack} from 'native-base';
import {
  FlatList,
  TextInput,
  ActivityIndicator,
  Keyboard,
  StyleSheet,
  View,
  Platform,
} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import FlashMessage from 'react-native-flash-message';

import {Colors} from '~/styles/colors';
import {BlurView} from '@react-native-community/blur';
import {
  UsersListItem,
  ErrorView,
  AlternativeScreen,
  CustomLoading,
} from '~/components';
import {Strings} from '~/assets/strings/index';
import {useGetAllFollowing} from '~/hooks/artist/Follow';
import {
  useForwardPostModalStore,
  useAuthStore,
  useClickedPostInfoStore,
} from '~/stores';
import {Fonts} from '~/styles/fonts';
import {useForwardPost, useForwardTopicPost} from '~/hooks/artist/Messages';
import {windowHeight, windowWidth} from '~/styles/globalStyles';
import {CustomKeyboardAwareScrollView} from '~/components';
import {height} from '~/utils/dimension';
import {useKeyboardBottomInset} from '~/utils/useKeyboardBottomInset';

const ForwardPostModal = () => {
  const {showForwardPostModal, setShowForwardPostModal} =
    useForwardPostModalStore(state => state);
  const snackBarRef = useRef(null);
  const [itemId, setItemId] = useState<number>();
  const [sentList, setSentList] = useState<number[]>([]);
  const [msg, setMsg] = useState<string>('');
  const {userId} = useAuthStore(state => state);
  const {postInfo} = useClickedPostInfoStore(state => state);
  const [isForwarding, setIsForwarding] = useState<boolean>(false);
  const [isTopicPost, setIsTopicPost] = useState(false);

  const {isLoading: ForwardPostLoading, mutate: mutateForwardPost} =
    useForwardPost();

  const {isLoading: ForwardTopicPostLoading, mutate: mutateForwardTopicPost} =
    useForwardTopicPost();

  const bottomInset = useKeyboardBottomInset();

  useEffect(() => {
    setMsg('');
    setSentList([]);
    if (postInfo != null && postInfo != undefined) {
      var checkIsTopicPost = 'topicPostLikes' in postInfo;
      setIsTopicPost(checkIsTopicPost);
    }
  }, [postInfo]);

  const onForwardPost = (receiverId: number) => {
    if (postInfo != null && postInfo != undefined) {
      setIsForwarding(true);
      let input = {
        postId: postInfo?.id,
        receiverId: receiverId,
        text: msg,
      };
      mutateForwardPost(input as any, {
        onSuccess: successData => {
          if (
            successData?.message_forwardPostInConversation?.status.value ===
            'Success'
          ) {
            setSentList([...sentList, receiverId]);
          }
          setIsForwarding(false);
          setMsg('');
          myTextInput.current.clear();
        },
      });
    }
  };

  const onForwardTopicPost = (receiverId: number) => {
    if (postInfo != null && postInfo != undefined) {
      setIsForwarding(true);
      let input = {
        topicPostId: postInfo?.id,
        receiverId: receiverId,
        text: msg,
      };
      mutateForwardTopicPost(input as any, {
        onSuccess: successData => {
          if (
            successData?.message_forwardTopicPostInConversation?.status
              .value === 'Success'
          ) {
            setSentList([...sentList, receiverId]);
          }
          setIsForwarding(false);
          setMsg('');
          myTextInput.current.clear();
        },
      });
    }
  };

  const {
    isLoading: getAllFollowingLoading,
    data: getAllFollowingData,
    isError: getAllFollowingFail,
    fetchNextPage: fetchNextPageGetAllFollowing,
    hasNextPage: hasNextPageGetAllFollowing,
    refetch: refetchGetAllFollowing,
  } = useGetAllFollowing({
    followerId: userId,
    where: {following: {isActive: {eq: true}}},
  });

  function setItemIdForLoading(id: number) {
    setItemId(id);
  }

  const onLoadMore = () => {
    if (hasNextPageGetAllFollowing) {
      fetchNextPageGetAllFollowing();
    }
  };

  function renderUserListItem({item}: {item: any}) {
    return (
      <UsersListItem
        item={item?.following}
        btnLoading={ForwardPostLoading || ForwardTopicPostLoading}
        btnOnPress={() => {
          !isTopicPost
            ? onForwardPost(item.followingId)
            : onForwardTopicPost(item.followingId);
        }}
        itemId={itemId}
        setItemId={setItemIdForLoading}
        selectedList={sentList}
        selectedTitle={Strings.send}
        nonSelectedTitle={Strings.sent}
        isForwardMsg={true}
      />
    );
  }
  function listEmpty() {
    return <AlternativeScreen msg={Strings.noFollowing} />;
  }
  const myTextInput = React.createRef();

  return (
    <Modal
      isOpen={showForwardPostModal}
      onClose={() => {
        setMsg('');
        myTextInput.current.clear();
        setShowForwardPostModal(false);
      }}>
      <Modal.Content
        style={styles.bottom}
        maxWidth={windowWidth}
        bottom={bottomInset}>
        <BlurView
          blurType="dark"
          blurRadius={25}
          blurAmount={25}
          reducedTransparencyFallbackColor="transparent">
          {getAllFollowingLoading ||
            ForwardTopicPostLoading ||
            (isForwarding && <CustomLoading />)}
          {getAllFollowingFail && (
            <ErrorView
              errorMsg="Something went wrong!"
              onPress={refetchGetAllFollowing}
            />
          )}
          <View
            style={{
              flex: 1,
              width: windowWidth,
              height: '100%',
            }}>
            <CustomKeyboardAwareScrollView>
              <TextInput
                ref={myTextInput}
                value={msg}
                style={styles.input}
                onChangeText={value => setMsg(value)}
                placeholder="Write Message"
                keyboardType="default"
                maxLength={100}
                placeholderTextColor={Colors.txtMedium}
                multiline={true}
              />

              <FlatList
                style={{
                  height: windowHeight / 1.5,
                }}
                data={getAllFollowingData?.pages}
                renderItem={renderUserListItem}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item: any) => JSON.stringify(item?.id)}
                onEndReachedThreshold={0.5}
                onEndReached={({distanceFromEnd}) => {
                  if (distanceFromEnd < 0) return;
                  onLoadMore();
                }}
                ListEmptyComponent={!getAllFollowingLoading ? listEmpty : null}
              />
            </CustomKeyboardAwareScrollView>
          </View>
        </BlurView>

        <FlashMessage ref={snackBarRef} position="bottom" />
      </Modal.Content>
    </Modal>
  );
};

export default ForwardPostModal;

const styles = StyleSheet.create({
  bottom: {
    marginBottom: 0,
    //marginTop: 'auto',
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
    backgroundColor: Colors.transparent,
    width: windowWidth,
    position: 'absolute',
    bottom: 0,
    height: height,
    overflow: 'scroll',
  },
  listContainer: {
    marginBottom: scale(30),
    marginTop: scale(36),
    flex: 1,
  },
  input: {
    marginVertical: scale(24),
    marginHorizontal: scale(12),
    borderBottomWidth: 1,
    borderColor: Colors.txtMedium,
    paddingHorizontal: scale(12),
    paddingVertical: scale(12),
    maxHeight: verticalScale(100),
    ...Fonts.smallReg,
    color: Colors.txtMedium,
  },
});
