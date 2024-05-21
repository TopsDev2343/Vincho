import {HStack, StatusBar, View} from 'native-base';
import React, {useEffect, useRef, useState} from 'react';
import {AvatarWithTitle, CustomContainer, ShinyIcon} from '~/components';
import {CustomFilter} from '~/components';
import {Colors} from '~/styles/colors';
import {chatFill, exploreOutline} from '~/assets/icons';
import {SvgXml} from 'react-native-svg';
import {FlatList, TouchableOpacity} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import {HelveticaRegularText} from '~/components';
import useGetUserMessages from '~/hooks/artist/Message/useGetUserMessages';
import {navigate} from '~/navigation/methods';
import {SortEnumType} from '~/generated/graphql';
import {useAiFriendsStore, useAuthStore} from '~/stores';
import {useQueryClient} from 'react-query';
import {useMessageSubscription} from '~/hooks/artist/Notification';
import {queryKeys} from '~/constants/queryKeys';
import {errorSnackBar} from '~/styles/globalStyles';
import {useDeleteConversation} from '~/hooks/artist/Messages';
import {DeleteModal} from '~/components/atoms/DeleteModal';
import {Strings} from '~/assets/strings';
import {setTimeAgoText} from '~/utils/getDatePeriod';
import {useFocusEffect} from '@react-navigation/native';

function ChatList() {
  const [order] = useState<object | undefined>({
    latestMessageDate: SortEnumType.Desc,
  });
  const [conversationId, setConversationId] = useState(0);

  const [conversations, setConversations] = useState([]);
  const {userId} = useAuthStore(state => state);
  const [messageData, setMessageData] = useState(undefined);
  const queryClient = useQueryClient();
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
      setConversations([
        ...conversations,
        {
          conversationId: res?.payload?.data?.messageAdded?.conversationId,
          hasUnreadMessage: true,
        },
      ]);
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

  const {isRefetching, isLoading, data, fetchNextPage, hasNextPage, refetch} =
    useGetUserMessages({order});

  const lastData = data?.pages?.[0];
  const [value, setValue] = useState('');
  const snackBarRef = useRef(null);
  const {mutate: mutateDelete} = useDeleteConversation();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [aiData, setAiData] = useState([]);

  function deleteOnPress(conversationId: number) {
    mutateDelete(conversationId, {
      onSuccess: successData => {
        if (
          successData.message_removeConversation?.status?.value == 'Success'
        ) {
          queryClient.invalidateQueries('getUserMessages');
        } else {
          snackBarRef?.current?.showMessage({
            message: successData.message_removeConversation?.status?.value,
            ...errorSnackBar,
          });
        }
      },
    });
  }

  function renderItem({item}: {item: any}) {
    return (
      <TouchableOpacity
        onPress={() => {
          navigate('Conversation', {
            conversationId: item.conversationId,
            headerData: item.user,
          });
        }}
        style={{
          flex: 1,
          flexDirection: 'row',
          marginHorizontal: 10,
          marginVertical: 10,
        }}
        onLongPress={() => {
          setConversationId(item?.conversationId);
          setShowModal(true);
        }}>
        <AvatarWithTitle
          uri={item.user?.photoUrl}
          name={item?.userName}
          width={scale(50)}
          height={scale(50)}
          onPress={() => {
            navigate('Conversation', {
              conversationId: item.conversationId,
              headerData: item.user,
            });
          }}
        />
        <View ml={6} justifyContent={'space-between'} width={'82%'}>
          <HStack>
            <HelveticaRegularText
              text={item.user.userName != '' ? item.user.userName : 'New User'}
              fontSize={16}
              color={Colors.cleanWhite}
              flex={7.5}
            />

            <HelveticaRegularText
              text={setTimeAgoText(item.latestMessageDate)}
              fontSize={12}
              color={Colors.txtMedium}
              flex={2.5}
              mr={4}
              textAlign={'right'}
            />
          </HStack>
          <HStack justifyContent={'space-between'} width={'95%'}>
            <HelveticaRegularText
              text={
                item.lastMessageText != ''
                  ? item.lastMessageText
                  : 'Sent an attachment'
              }
              fontSize={12}
              color={Colors.txtMedium}
              numberOfLines={1}
            />
            {item.unreadCount > 0 && (
              <View
                width={scale(10)}
                height={scale(10)}
                borderRadius={scale(10)}
                backgroundColor={Colors.primary}
                alignSelf={'center'}></View>
            )}
          </HStack>
        </View>
      </TouchableOpacity>
    );
  }
  // aiFriends
  const {aiFriends, initializeAiFriends} = useAiFriendsStore();

  useEffect(() => {
    if (aiFriends?.length > 0 && data?.pages) {
      const newAiDate = aiFriends.map(aiFriend => {
        return {
          userEmail: `${aiFriend.name}@vincho.com`,
          user: {
            id: aiFriend.name,
            userName: aiFriend.name,
            photoUrl: aiFriend.profile,
          },
        };
      });
      setAiData([...data?.pages, ...newAiDate]);
    }
  }, [aiFriends]);

  useFocusEffect(
    React.useCallback(() => {
      // aiFriend
      initializeAiFriends();
      //
      queryClient.invalidateQueries(queryKeys.getUserMessages);
    }, [data]),
  );
  return (
    <CustomContainer
      isLoading={isLoading}
      style={{flex: 1, paddingTop: verticalScale(20), paddingHorizontal: 10}}>
      <StatusBar backgroundColor={Colors.onBackground} />
      <CustomFilter
        isSearchBtn={true}
        label="Search Users"
        onPress={() => {
          navigate('SearchUser');
        }}
        value={value}
        setValue={setValue}
      />

      <TouchableOpacity
        onPress={() => {
          navigate('Nearby');
        }}>
        <HStack
          borderWidth={1}
          borderColor={Colors.onBackground}
          borderRadius={16}
          minHeight={70}
          mx={2.5}
          my={4}
          justifyContent={'center'}
          alignItems={'center'}
          p={2}>
          <View
            width={scale(60)}
            height={scale(60)}
            justifyContent={'center'}
            alignItems={'center'}
            borderRadius={100}>
            <ShinyIcon icon={exploreOutline} />
          </View>
          <HelveticaRegularText
            text={'Nearby Users'}
            fontSize={16}
            color={Colors.cleanWhite}
            ml={2}
          />
        </HStack>
      </TouchableOpacity>

      {lastData && (
        <FlatList
          extraData={conversations}
          contentContainerStyle={{marginRight: 10}}
          keyExtractor={(item, index) =>
            item?.conversationId
              ? item?.conversationId?.toString()
              : index.toString()
          }
          onEndReachedThreshold={0.9}
          onEndReached={() => {
            if (hasNextPage) {
              fetchNextPage();
            }
          }}
          onRefresh={refetch}
          refreshing={isRefetching}
          showsVerticalScrollIndicator={false}
          data={aiData}
          renderItem={renderItem}
        />
      )}
      {!lastData && !isLoading && (
        <View
          justifyContent={'flex-start'}
          alignItems={'center'}
          flex={1}
          pt={16}>
          <SvgXml width="42" height="42" xml={chatFill} />
          <HelveticaRegularText
            text={'No Conversation yet.'}
            fontSize={16}
            color={Colors.cleanWhite}
            mt={6}
            textAlign={'center'}
          />
        </View>
      )}

      <DeleteModal
        showModal={showModal}
        setShowModal={setShowModal}
        deleteOnPress={() => {
          deleteOnPress(conversationId);
        }}
        title={Strings.wantToDeleteConversation}
      />
    </CustomContainer>
  );
}

export default ChatList;
