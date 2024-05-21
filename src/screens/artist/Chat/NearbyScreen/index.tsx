import {StatusBar, View} from 'native-base';
import React, {useEffect, useState} from 'react';
import CustomContainer from '~/components/atoms/CustomContainer';
import {Colors} from '~/styles/colors';
import {exploreFill} from '~/assets/icons';
import {SvgXml} from 'react-native-svg';
import {FlatList, TouchableOpacity} from 'react-native';
import {scale} from 'react-native-size-matters';
import HelveticaRegularText from '~/components/atoms/HelveticaRegularText';
import CustomAvatar from '~/components/atoms/CustomAvatar';
import useGetNearbyUsers from '~/hooks/artist/Message/useGetNearbyUsers';
import BackButton from '~/components/atoms/BackButton';
import {navigate} from '~/navigation/methods';
import {useAuthStore} from '~/stores';
import {requestLocationPermission} from '~/utils/userPermission';
import Geolocation from 'react-native-geolocation-service';
import {useGetUserProfile, useUpdateProfile} from '~/hooks/artist/User';
import snackBar from '~/utils/snackBar';
import {useGetConversationIdForUser} from '~/hooks/artist/Messages';
import {getMiles} from '~/utils/getMiles';
import {AvatarWithTitle} from '~/components';

function NearbyScreen({navigation}: {navigation: any}) {
  const {userId} = useAuthStore(state => state);
  const {} = useGetUserProfile({
    onSuccess: data => {
      let obj = data?.user_getProfile?.result;
      if (obj?.location != null) {
        setUserLocation(obj.location?.coordinates);
      }
    },
  });

  const [userLocation, setUserLocation] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [enabled, setEnabled] = useState<boolean>(false);
  const [isAllowed, setIsAllowed] = useState<boolean>(false);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  async function getCurrentLocation() {
    setLoading(true);
    if (await requestLocationPermission()) {
      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;
          setUserLocation([longitude, latitude]);
          setEnabled(true);
          setLoading(false);
          setIsAllowed(true);
        },
        (error: any) => {
          setLoading(false);
          snackBar({message: JSON.stringify(error), color: Colors.error});
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }
  }

  const {isRefetching, isLoading, data, fetchNextPage, hasNextPage, refetch} =
    useGetNearbyUsers({
      currentLocation: userLocation,
      updateLocation: isAllowed,
      enabled,
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

  function renderItem({item}: {item: any}) {
    return (
      <TouchableOpacity
        onPress={() => {
          setIsLoadingConversationId(true);
          setRecieverUser(item);
          setRecieverUserId(item?.id);
        }}
        style={{
          flex: 1,
          flexDirection: 'row',
          marginHorizontal: 20,
          marginTop: 20,
        }}>
        <AvatarWithTitle
          name={item?.userName}
          uri={item?.photoUrl}
          onPress={() => {
            item?.id != userId
              ? navigate('OtherUserProfile', {
                  entityId: item?.id,
                })
              : navigate('Profile');
          }}
          width={scale(50)}
          height={scale(50)}
        />
        <View
          ml={6}
          alignItems={'center'}
          justifyContent={'space-between'}
          flexDirection={'row'}
          flex={1}>
          <HelveticaRegularText
            text={item?.userName}
            fontSize={16}
            color={Colors.cleanWhite}
          />
          <View
            alignSelf={'flex-end'}
            borderRadius={100}
            backgroundColor={Colors.onBackground}
            width={scale(58)}
            height={scale(58)}
            justifyContent={'center'}
            alignItems={'center'}
            py={2}
            px={2}>
            <HelveticaRegularText
              text={
                getMiles(item?.distance)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' mi'
              }
              fontSize={10}
              color={Colors.cleanWhite}
              textAlign={'center'}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <CustomContainer
      style={{flex: 1, paddingHorizontal: 10}}
      isLoading={enabled && (isLoading || loading || isLoadingConversationId)}>
      <StatusBar backgroundColor={Colors.background} />
      <BackButton />

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

      {!lastData && !isLoading && !loading && (
        <View justifyContent={'center'} alignItems={'center'} flex={1}>
          <SvgXml width="42" height="42" xml={exploreFill} />
          <HelveticaRegularText
            text={'There are currently no nearby user.'}
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

export default NearbyScreen;
