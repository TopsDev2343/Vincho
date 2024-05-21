import {StatusBar, View} from 'native-base';
import React, {useState} from 'react';
import {SvgXml} from 'react-native-svg';
import {
  CustomContainer,
  CustomFilter,
  BackButton,
  CustomAvatar,
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
import dayjs from 'dayjs';

function Users({navigation}: {navigation: any}) {
  const {userId} = useAuthStore(state => state);
  const [where] = useState<object | undefined>({
    id: {neq: userId},
    isActive: {eq: true},
  });
  const [order] = useState<object | undefined>({id: SortEnumType.Desc});

  const {isRefetching, isLoading, data, fetchNextPage, hasNextPage, refetch} =
    useGetAllUsers({
      where,
      order,
    });
  const lastData = data?.pages?.[0];

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
          navigate('UserProfile', {
            entityId: item?.id,
          });
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
            navigate('UserProfile', {
              entityId: item?.id,
            });
          }}
        />
        <View ml={5} justifyContent={'center'} width={'100%'}>
          <HelveticaRegularText
            text={userName}
            fontSize={16}
            color={Colors.cleanWhite}
          />
          <Text style={{fontSize: 12, color: Colors.txtMedium}}>
            Joined {dayjs(item.createdDate).format('DD MMMM YYYY')}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <CustomContainer style={{flex: 1, paddingHorizontal: 10}}>
      <StatusBar backgroundColor={Colors.onBackground} />
      <CustomFilter
        isSearchBtn={true}
        label="Search Users"
        onPress={() => {
          navigate('SearchUser', {
            screenName: 'UserProfile',
            showJoinedDate: true,
          });
        }}
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
          style={{marginTop: 10}}
          onRefresh={refetch}
          refreshing={isRefetching}
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
            text={'There is no users to show!'}
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

export default Users;
