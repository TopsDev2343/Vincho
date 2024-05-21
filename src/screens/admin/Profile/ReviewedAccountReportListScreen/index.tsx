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
import {SortEnumType, ViolationType} from '~/generated/graphql';
import dayjs from 'dayjs';
import {useGetReportUsers} from '~/hooks/admin/Reports';
import {getKeyByValue} from '~/utils/getKeyByValue';

function ReviewedAccountReportListScreen({route}: {route: any}) {
  const entityId = route.params?.entityId;
  const [where] = useState<object | undefined>({
    isReviewed: {eq: true},
    adminId: {eq: entityId},
  });

  const [order] = useState<object | undefined>({id: SortEnumType.Desc});
  const {isRefetching, isLoading, data, fetchNextPage, hasNextPage, refetch} =
    useGetReportUsers({
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
          name={item?.reportedUser?.userName}
          uri={item?.reportedUser?.photoUrl}
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
        <View ml={5} justifyContent={'space-between'} width={'85%'}>
          <HelveticaRegularText
            text={item?.reportedUser?.userName}
            fontSize={16}
            color={Colors.cleanWhite}
          />
          <HelveticaRegularText
            text={
              'Reported by @' +
              item?.reporterUser?.userName +
              ' at ' +
              dayjs(item.createdDate).format('DD/MM/YYYY') +
              '  ' +
              dayjs(item.createdDate).format('HH:MM') +
              ' - ' +
              getKeyByValue(item?.violationType, ViolationType)
            }
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
            data={data?.pages}
            renderItem={renderItem}
          />
        )}
      </View>
    </CustomContainer>
  );
}

export default ReviewedAccountReportListScreen;
