import {useFocusEffect} from '@react-navigation/native';

import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text as RNText,
} from 'react-native';
import {View, Text, Button, HStack} from 'native-base';
import Popover from 'react-native-popover-view';
import {scale, verticalScale} from 'react-native-size-matters';

import {fileUploader} from '~/services/fileUploader';
import {getFullImageUrl, useUploadFile} from '~/hooks/artist/Upload';
import {
  useCreateMessage,
  useDeleteMessage,
  useGetConversationForUser,
  useGetConversationIdForUser,
  useGetConversations,
} from '~/hooks/artist/Messages';
import {
  SectionChat,
  AttachmentModal,
  HelveticaRegularText,
  CustomLoading,
} from '~/components';
import {PlayerContextProvider} from '~/components/contexts';
import {createScreen} from '~/components/atoms/createScreen';
import {Colors} from '~/styles/colors';
import {SvgXml} from 'react-native-svg';
import {conversation, plusRounded, send, trash} from '~/assets/icons';
import {useGetProfile} from '~/hooks/artist/Profile';
import SectionTopChat from '~/components/atoms/SectionTopchat';
import moment from 'moment';
import {width} from '~/utils/dimension';
import {useMessageSubscription} from '~/hooks/artist/Notification';
import {useQueryClient} from 'react-query';
import {useAuthStore} from '~/stores';
import {queryKeys} from '~/constants/queryKeys';

const ConversationScreen = createScreen(
  ({route}: {route: any}) => {
    const {userId} = useAuthStore(state => state);
    const flatListRef = useRef();
    const queryClient = useQueryClient();
    const receiverId =
      route?.params?.receiverId || route?.params?.headerData?.id;
    const paramsConversationId = route?.params?.conversationId;
    const headerData = route?.params?.headerData;

    const [textMessage, setTextMessage] = useState('');
    const [attachModal, setAttachModal] = useState(false);
    const [UploadLoading, setLoading] = useState(false);
    const [messageData, setMessageData] = useState(undefined);

    useMessageSubscription({
      userId: userId,
      callback: (inputData: any) => onGetMessage(inputData),
    });
    const onGetMessage = (event: any) => {
      const res = JSON.parse(event.data);

      if (
        res?.type !== 'ka' &&
        res.type === 'data' &&
        res?.payload?.data?.messageAdded
      ) {
        setMessageData(res?.payload?.data?.messageAdded);
        queryClient.invalidateQueries('conversations');
        queryClient.invalidateQueries('getConversationForUser');
        queryClient.invalidateQueries(queryKeys.getUserMessages);
      }
    };
    useEffect(() => {
      closeMessage();
    }, [messageData]);

    const closeMessage = () => {
      setTimeout(() => {
        setMessageData(undefined);
      }, 10000);
    };

    const {data: conversationIdForUserData, isLoading: conversationLoading} =
      useGetConversationIdForUser(receiverId, {userId: {eq: receiverId}}, {});

    const [conversationId, setConversationId] = useState(paramsConversationId);
    useFocusEffect(
      React.useCallback(() => {
        if (
          conversationId == 0 ||
          conversationId == null ||
          conversationId == undefined
        ) {
          if (
            conversationIdForUserData?.message_getUserMessages?.result
              ?.totalCount > 0
          ) {
            setConversationId(
              conversationIdForUserData?.message_getUserMessages?.result
                ?.items[0]?.conversationId,
            );
          } else setConversationId(paramsConversationId);
        }
      }, [conversationIdForUserData]),
    );

    useEffect(() => {}, [conversationId]);

    const [showPopover, setShowPopover] = useState({
      visible: false,
      index: 0,
    });

    const attachOnPress = () => {
      setAttachModal(true);
    };

    const onCloseAttachModal = () => {
      setAttachModal(false);
    };

    const {isLoading, data: user} = useGetProfile();
    const {mutate: uploadFileMutate, isLoading: isUploading} = useUploadFile();

    const {
      isLoading: isLoadingConversations,
      data: allConversations,
      fetchNextPage,
      hasNextPage,
      refetch,
      isRefetching,
    } = useGetConversations({
      conversationId,
      order: {createdAt: 'DESC'},
    });

    const allConversationsData = allConversations?.pages ?? [];
    const {isLoading: isLoadingSendMessage, mutate: mutateSendMessage} =
      useCreateMessage();

    const {isLoading: isLoadingDeleteMessage, mutate: mutateDeleteMessage} =
      useDeleteMessage();

    const renderItem = ({item, index}) => {
      const currentUser = item?.senderId === user?.user_login?.result?.id;
      if (item.type && item.type === 'day') {
        const currentDate = moment().format('YYYY-MM-DD');
        if (item.date === currentDate) {
          return (
            <RNText
              style={{
                width: width,
                marginBottom: 10,
              }}>
              <HStack
                width={width}
                justifyContent={'center'}
                alignItems={'center'}>
                <View
                  mt={1}
                  flex={1}
                  borderBottomWidth={1}
                  borderColor={Colors.txtMedium}
                  borderStyle={'dashed'}
                />
                <Text
                  alignSelf={'center'}
                  px={3}
                  color={Colors.txtMedium}
                  fontSize={12}>
                  Today
                </Text>
                <View
                  mt={1}
                  flex={1}
                  borderBottomWidth={1}
                  borderColor={Colors.txtMedium}
                  borderStyle={'dashed'}
                />
              </HStack>
            </RNText>
          );
        }
        return (
          <Text
            fontSize={12}
            width={'100%'}
            textAlign={'center'}
            color={Colors.txtMedium}
            mb={2}>
            {item.date}
          </Text>
        );
      }
      return (
        <Popover
          backgroundStyle={'rgba(0,0,0,0.3)'}
          isVisible={showPopover.visible && showPopover.index === index}
          style={{backgroundColor: 'red'}}
          onRequestClose={() =>
            setShowPopover({
              visible: false,
              index: index,
            })
          }
          from={
            <TouchableOpacity
              activeOpacity={0.9}
              style={{
                width: 'auto',
                maxWidth: '90%',
                alignSelf: currentUser ? 'flex-end' : 'flex-start',
                marginLeft: currentUser ? 0 : 20,
                marginRight: currentUser ? 20 : 0,
              }}
              onLongPress={() =>
                currentUser
                  ? setShowPopover({
                      visible: true,
                      index: index,
                    })
                  : null
              }>
              <SectionChat
                item={item}
                index={index}
                user={currentUser ? true : false}
                style={
                  item.messageType === 'PHOTO'
                    ? {
                        backgroundColor: Colors.transparent,
                        padding: 0,
                        marginHorizontal: -20,
                      }
                    : null
                }
              />
            </TouchableOpacity>
          }>
          <View style={styles.popoverContainer}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => deleteOnPress(item, index)}
              style={styles.direction}>
              <SvgXml
                xml={trash}
                fill={Colors.error}
                width={scale(16)}
                height={scale(16)}
              />
              <Text style={styles.popoverText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </Popover>
      );
    };

    const deleteOnPress = (item, index) => {
      const messageId = item?.id;
      mutateDeleteMessage(messageId);
      setShowPopover({
        visible: false,
        index: index,
      });
    };

    const onLoadMore = () => {
      if (hasNextPage) {
        fetchNextPage();
      }
    };

    const onSend = ({messageInput}) => {
      mutateSendMessage(messageInput, {
        onSuccess: successData => {
          if (successData.message_createMessage?.status.value === 'Success') {
            setTextMessage('');
            const tempConversationId =
              successData?.message_createMessage?.result?.conversationId;
            setConversationId(tempConversationId);

            queryClient.invalidateQueries(queryKeys.getUserMessages);
          }
        },
        onError: error => {},
      });
    };

    const onSelectFile = async (file, type) => {
      setLoading(true);
      setTimeout(async () => {
        const res = await fileUploader(file);
        const uploadedUrl = res?.uploadedUrl;
        if (uploadedUrl) {
          let tempConversationId =
            conversationId == null || conversationId == undefined
              ? paramsConversationId
              : conversationId;

          let tempUploadedUrl = getFullImageUrl(uploadedUrl);
          const messageInput = {
            text: '',
            conversationId: tempConversationId,
            messageType:
              type == 'PDF'
                ? 'FILE'
                : type == 'audio/mp4'
                ? 'VOICE'
                : type == 'VIDEO'
                ? 'VIDEO'
                : 'PHOTO',
            photoUrl: tempUploadedUrl,
            receiverId: receiverId,
          };
          onSend({messageInput});
          setLoading(false);
        }
      }, 600);
    };

    const renderFooter = () => {
      return hasNextPage ? (
        <View mb={18}>
          <ActivityIndicator size={scale(32)} color={'red'} />
        </View>
      ) : null;
    };

    const groupedDays = (messages: any) => {
      return messages.reduce((acc, el, i) => {
        const messageDay = moment(el.createdAt).format('YYYY-MM-DD');
        if (acc[messageDay]) {
          return {...acc, [messageDay]: acc[messageDay].concat([el])};
        }
        return {...acc, [messageDay]: [el]};
      }, {});
    };

    const generateItems = (messages: any) => {
      if (messages != null) {
        const days = groupedDays(messages);
        const sortedDays = Object.keys(days).sort(
          (x, y) =>
            moment(y, 'YYYY-MM-DD').unix() - moment(x, 'YYYY-MM-DD').unix(),
        );
        const items = sortedDays.reduce((acc, date) => {
          const sortedMessages = days[date].sort(
            (x, y) => new Date(y.createdAt) - new Date(x.createdAt),
          );
          return acc.concat([...sortedMessages, {type: 'day', date, id: date}]);
        }, []);
        return items;
      }
    };

    return (
      <PlayerContextProvider>
        <View style={styles.Chat3}>
          <SectionTopChat data={headerData} isAdmin={true} />
          {(isUploading ||
            UploadLoading ||
            conversationLoading ||
            isLoadingConversations) && <CustomLoading />}

          <FlatList
            inverted
            ref={flatListRef}
            renderItem={renderItem}
            style={styles.container}
            data={generateItems(allConversationsData)}
            onEndReachedThreshold={0.5}
            ListFooterComponent={renderFooter}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps={'handled'}
            keyExtractor={(_, index) => `key${index}`}
            contentContainerStyle={styles.contentContainerStyle}
            onEndReached={({distanceFromEnd}) => {
              if (distanceFromEnd < 0) return;
              onLoadMore();
            }}
            ListEmptyComponent={
              !isLoadingConversations && !conversationLoading ? (
                <View
                  justifyContent={'flex-start'}
                  alignItems={'center'}
                  flex={1}
                  pb={'70%'}>
                  <SvgXml width="42" height="42" xml={conversation} />
                  <HelveticaRegularText
                    text={'No message yet. send first message!'}
                    fontSize={16}
                    color={Colors.cleanWhite}
                    mt={6}
                    textAlign={'center'}
                  />
                </View>
              ) : null
            }
          />

          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 10}>
            <View style={styles.inputWrapper}>
              <View
                style={{
                  alignSelf: 'center',
                  flex: 1,
                }}>
                <Button
                  variant="link"
                  justifyContent="center"
                  alignItems="center"
                  p={0}
                  mt={1.5}
                  onPress={() =>
                    onSend({
                      messageInput: {
                        conversationId,
                        text: textMessage,
                        messageType: 'TEXT',
                        receiverId: receiverId,
                      },
                    })
                  }
                  isLoading={isLoadingSendMessage}
                  disabled={
                    isUploading ||
                    UploadLoading ||
                    isLoadingSendMessage ||
                    textMessage.length == 0
                  }
                  style={styles.sendButton}>
                  <SvgXml
                    xml={send}
                    fill={Colors.white}
                    width={scale(40)}
                    height={scale(Platform.OS == 'ios' ? 40 : 30)}
                  />
                </Button>
              </View>

              <TextInput
                multiline
                value={textMessage}
                style={{
                  marginTop: 10,
                  color: Colors.txtMedium,
                  fontSize: 16,
                  fontFamily: 'Helvetica',
                  flex: 8,
                }}
                placeholderTextColor={Colors.txtMedium}
                onChangeText={setTextMessage}
                placeholder="Message..."
              />
              <View
                style={{
                  alignSelf: 'flex-end',
                  flex: 1,
                  marginBottom: verticalScale(5),
                }}>
                <Button
                  variant="link"
                  justifyContent="center"
                  alignItems="center"
                  onPress={attachOnPress}
                  isLoading={isUploading || UploadLoading}
                  disabled={
                    isUploading || UploadLoading || isLoadingSendMessage
                  }>
                  <SvgXml xml={plusRounded} fill={Colors.white} />
                </Button>
              </View>
            </View>
          </KeyboardAvoidingView>
          {attachModal && (
            <AttachmentModal
              visible={attachModal}
              onSelectFile={onSelectFile}
              onClose={onCloseAttachModal}
            />
          )}
        </View>
      </PlayerContextProvider>
    );
  },
  {
    scrollView: false,
    paddingBottom: false,
    paddingTop: false,
  },
);
const styles = StyleSheet.create({
  Chat3: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  contentContainerStyle: {
    paddingVertical: verticalScale(0),
  },
  separate: {
    backgroundColor: 'red',
    height: verticalScale(16),
  },
  container: {
    // flex: 1,
  },
  popoverContainer: {
    padding: 16,
  },
  direction: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  popoverText: {
    color: 'red',
    marginLeft: scale(8),
  },
  inputWrapper: {
    padding: 5,
    flexDirection: 'row-reverse',
    alignItems: 'flex-start',
    backgroundColor: Colors.onBackground,
    borderRadius: 20,
    margin: 20,
    marginTop: 5,
    minHeight: verticalScale(38),
    paddingVertical: Platform.OS == 'ios' ? 5 : 1,
  },
  sendButton: {
    marginRight: 5,
  },
});
export default ConversationScreen;
