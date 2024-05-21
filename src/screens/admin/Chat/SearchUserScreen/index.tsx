import {StatusBar, View} from 'native-base';
import React, {useState} from 'react';
import {SvgXml} from 'react-native-svg';
import {
  CustomContainer,
  CustomFilter,
  BackButton,
  HelveticaRegularText,
  AvatarWithTitle,
} from '~/components';
import {Colors} from '~/styles/colors';
import {chatFill} from '~/assets/icons';
import {FlatList, Text, TouchableOpacity} from 'react-native';
import {SortEnumType} from '~/generated/graphql';
import useGetAllUsers from '~/hooks/artist/Message/useGetAllUsers';
import {navigate} from '~/navigation/methods';
import {useAuthStore} from '~/stores';
import {useGetConversationIdForUser} from '~/hooks/artist/Messages';
import dayjs from 'dayjs';

function SearchUserScreen({route}: {route: any}) {
  const screenName = route?.params?.screenName;
  const showJoinedDate = route?.params?.showJoinedDate;

  const [value, setValue] = useState('');
  const {userId} = useAuthStore(state => state);
  const [where, setWhere] = useState<object | undefined>({
    id: {neq: userId},
    isActive: {eq: true},
  });
  const [order] = useState<object | undefined>({id: SortEnumType.Desc});

  const whereClause = route.params?.whereClause;
  if (whereClause != undefined) {
    if (where == undefined) {
      setWhere(whereClause);
    }
  }
  const {isRefetching, isLoading, data, fetchNextPage, hasNextPage, refetch} =
    useGetAllUsers({
      where,
      order,
    });
  const lastData = data?.pages?.[0];

  const [recieverUserId, setRecieverUserId] = useState<number>();
  const [recieverUser, setRecieverUser] = useState(null);
  const [isLoadingConversationId, setIsLoadingConversationId] =
    useState<boolean>(false);
  const result = useGetConversationIdForUser(
    recieverUserId,
    {userId: {eq: recieverUserId}},
    {
      onSuccess: data => {
        let conversationId = 0;
        if (data?.message_getUserMessages?.result?.totalCount > 0) {
          conversationId =
            data?.message_getUserMessages?.result?.items[0]?.conversationId;
        }
        navigate('Conversation', {
          //receiverId: item?.id,
          conversationId: conversationId,
          headerData: recieverUser,
        });

        setRecieverUserId(undefined);
        setRecieverUser(null);
        setIsLoadingConversationId(false);
      },
    },
  );

  const onItemPressed = (item: any) => {
    if (screenName === 'Conversation') {
      setIsLoadingConversationId(true);
      setRecieverUser(item);
      setRecieverUserId(item?.id);
    } else {
      navigate(screenName, {
        receiverId: item?.id,
        headerData: item,
        entityId: item.id,
      });
    }
  };
  function renderItem({item}: {item: any}) {
    let userName = '';
    if (item?.userName == null || item?.userName == '') {
      userName = 'New User';
    } else {
      userName = item?.userName;
    }
    return (
      <TouchableOpacity
        onPress={() => {
          onItemPressed(item);
        }}
        style={{
          flex: 1,
          flexDirection: 'row',
          marginHorizontal: 10,
          marginVertical: 10,
        }}>
        <AvatarWithTitle
          width={12}
          height={12}
          name={item?.userName}
          uri={item?.photoUrl}
          onPress={() => {
            onItemPressed(item);
          }}
        />
        <View ml={5} justifyContent={'center'} width={'100%'}>
          <HelveticaRegularText
            text={userName}
            fontSize={16}
            color={Colors.cleanWhite}
          />
          {showJoinedDate == true && (
            <Text style={{fontSize: 12, color: Colors.txtMedium}}>
              Joined {dayjs(item.createdDate).format('DD MMMM YYYY')}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <CustomContainer
      style={{flex: 1, paddingHorizontal: 10}}
      isLoading={isLoadingConversationId}>
      <StatusBar backgroundColor={Colors.onBackground} />
      <BackButton />
      <CustomFilter
        label="Search Users"
        onPress={() => {
          if (value) {
            setWhere(prev => ({...prev, userName: {contains: value}}));
          } else {
            setWhere({id: {neq: userId}, isActive: {eq: true}});
          }
        }}
        value={value}
        setValue={setValue}
      />

      <HelveticaRegularText
        text={'Result'}
        fontSize={16}
        color={Colors.cleanWhite}
        mt={4}
        ml={3}
        textAlign={'left'}
      />

      {lastData && (
        <FlatList
          keyExtractor={(item, index) =>
            item?.id ? item?.id?.toString() : index.toString()
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
          data={data?.pages}
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
            text={'There is not any result. Try another search.'}
            fontSize={16}
            color={Colors.cleanWhite}
            mt={6}
            textAlign={'center'}
          />
        </View>
      )}
    </CustomContainer>
  );
}

export default SearchUserScreen;
