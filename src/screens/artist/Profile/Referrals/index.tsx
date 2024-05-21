import React from 'react';
import {StyleSheet, View, FlatList, Text} from 'react-native';
import {scale} from 'react-native-size-matters';
import {
  CustomContainer,
  AvatarWithTitle,
  HelveticaRegularText,
  ReferralCode,
} from '~/components';

import {Strings} from '~/assets/strings';
import {Fonts} from '~/styles/fonts';
import {ScrollView} from 'react-native';
import {TouchableOpacity} from 'react-native';
import dayjs from 'dayjs';
import {Colors} from '~/styles/colors';
import {Avatar} from 'native-base';
import {logoGold} from '~/assets/images';
import {useGetLotusStatus} from '~/hooks/artist/Lotous';
import {navigate} from '~/navigation/methods';

const Referrals = () => {
  const {
    data: getLotousData,
    isLoading: getLotusLoading,
    isError: getLotusFail,
    isSuccess: getLotusSuccess,
    refetch: getLotusRefetch,
  } = useGetLotusStatus();

  // useEffect(() => {
  //   console.log(
  //     'getLotousData',
  //     getLotousData?.user_getLotusStatus?.result?.invitedUsers,
  //   );
  // }, [getLotousData]);

  function renderActivitiesListItem({item}: {item: any}) {
    let fullName = '';
    if (item?.fullName == null || item?.fullName == '') {
      fullName = item?.userName ?? 'New User';
    } else {
      fullName = item?.fullName;
    }

    return (
      <TouchableOpacity
        onPress={() => {
          navigate('OtherUserProfile', {entityId: item?.id});
        }}
        style={styles.card}>
        <AvatarWithTitle
          width={54}
          height={54}
          name={fullName}
          uri={item?.photoUrl}
        />
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
            alignItems: 'center',
            marginStart: 14,
            flexDirection: 'row',
          }}>
          <HelveticaRegularText
            text={fullName}
            fontSize={16}
            color={Colors.cleanWhite}
          />
          <Text style={{fontSize: 14, color: Colors.txtMedium}}>
            {dayjs(item?.createdAt).format('DD MMMM YYYY')}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <CustomContainer
      isLoading={getLotusLoading}
      isError={getLotusFail}
      errorMsg={'Something went wrong'}
      onPress={getLotusRefetch}>
      {getLotusSuccess && !getLotusLoading ? (
        <View style={{flex: 1}}>
          <ScrollView>
            <ReferralCode
              userName={
                getLotousData?.user_getLotusStatus?.result?.referralCode
              }
            />

            <View style={styles.card}>
              <Avatar
                backgroundColor={Colors.OnOverlay}
                width={54}
                height={54}
                source={logoGold}
              />
              <View style={{marginHorizontal: 10}}>
                <HelveticaRegularText
                  text={`${Strings.youHave} ${getLotousData?.user_getLotusStatus?.result?.lotusCount} ${Strings.lotusFlowers}`}
                  fontSize={16}
                  color={Colors.cleanWhite}
                />
              </View>
            </View>
            <Text
              style={{
                ...Fonts.smallBold,
                color: Colors.white,
                marginHorizontal: 10,
                marginTop: scale(12),
              }}>
              {Strings.peopleInvited}
            </Text>

            <FlatList
              contentContainerStyle={{flexGrow: 1}}
              data={getLotousData?.user_getLotusStatus?.result?.invitedUsers}
              renderItem={renderActivitiesListItem}
              showsVerticalScrollIndicator={false}
              numColumns={1}
              keyExtractor={(item: any) => JSON.stringify(item?.id)}
              horizontal={false}
              onEndReachedThreshold={0.5}
              onEndReached={({}) => {}}
            />
          </ScrollView>
        </View>
      ) : null}
    </CustomContainer>
  );
};

export default Referrals;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 10,
    padding: 13,
    backgroundColor: Colors.onBackground,
    borderRadius: 16,
  },
});
