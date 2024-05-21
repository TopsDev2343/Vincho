import {StatusBar, View} from 'native-base';
import React, {useState} from 'react';
import {
  CustomContainer,
  BackButton,
  HelveticaRegularText,
  AvatarWithTitle,
} from '~/components';
import {Colors} from '~/styles/colors';
import {FlatList, TouchableOpacity} from 'react-native';
import {SortEnumType} from '~/generated/graphql';
import {useGetDisbaledUsers} from '~/hooks/admin/Reports';

function DisabledUsersListScreen({route}: {route: any}) {
  const entityId = route.params?.entityId;
  const [where] = useState<object | undefined>({
    disabledByUserId: {eq: entityId},
  });

  const [order] = useState<object | undefined>({id: SortEnumType.Desc});
  const {isRefetching, isLoading, data, fetchNextPage, hasNextPage, refetch} =
    useGetDisbaledUsers({
      where,
      order,
    });

  const lastData = data?.pages?.[0];
  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          /*  navigate('AdminDetail', {
                    entityId: item?.id,
                  }); */
        }}
        style={{
          flex: 1,
          flexDirection: 'row',
          marginHorizontal: 10,
          marginVertical: 10,
        }}>
        <AvatarWithTitle
          name={item?.userName}
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
        <View ml={5} justifyContent={'center'} width={'100%'}>
          <HelveticaRegularText
            text={item?.userName}
            fontSize={16}
            color={Colors.white}
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
            data={data?.pages}
            renderItem={renderItem}
          />
        )}
      </View>
    </CustomContainer>
  );
}

export default DisabledUsersListScreen;
