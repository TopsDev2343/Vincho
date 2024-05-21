import {StatusBar, View} from 'native-base';
import React, {useState} from 'react';
import {
  CustomContainer,
  BackButton,
  CustomAvatar,
  HelveticaRegularText,
  CustomButton,
  AvatarWithTitle,
} from '~/components';
import {Colors} from '~/styles/colors';
import {FlatList, Platform, TouchableOpacity} from 'react-native';
import {SortEnumType, UserType} from '~/generated/graphql';
import {navigate} from '~/navigation/methods';
import useAuthStore from '~/stores/authStore';
import useGetAllUsers from '~/hooks/artist/Message/useGetAllUsers';
import {verticalScale} from 'react-native-size-matters';

function AdminListScreen({navigation}: {navigation: any}) {
  const {userId} = useAuthStore(state => state);
  const [where] = useState<object | undefined>({
    userType: {eq: UserType.Admin},
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

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigate('AdminDetail', {
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
          name={item.userName}
          uri={item?.photoUrl}
          onPress={() => {
            /*  item?.id != userId
                      ? navigate('OtherUserProfile', {
                          entityId: item?.id,
                        })
                      : navigate('Profile'); */
          }}
          width={12}
          height={12}
        />
        <View ml={5} justifyContent={'space-between'} width={'100%'}>
          <HelveticaRegularText
            text={
              item?.fullName == 'Deleted Account'
                ? item?.userName + '(' + item?.fullName + ')'
                : item?.userName
            }
            fontSize={16}
            color={Colors.cleanWhite}
          />
          <HelveticaRegularText
            text={item?.email}
            fontSize={12}
            color={Colors.txtMedium}
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <CustomContainer
      style={{flex: 1, paddingHorizontal: 10}}
      isLoading={isLoading}>
      <StatusBar backgroundColor={Colors.onBackground} />
      <BackButton />
      <View flex={9}>
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
      </View>

      <View
        flex={1}
        mb={Platform.OS == 'android' ? verticalScale(4) : undefined}>
        <CustomButton
          title={'Add New Admin'}
          titleColor={Colors.txtDark}
          backColor={Colors.primary}
          isLoading={false}
          containerStyle={{flex: 1, justifyContent: 'flex-end'}}
          onPress={() => {
            navigate('AddAdmin');
          }}
        />
      </View>
    </CustomContainer>
  );
}

export default AdminListScreen;
