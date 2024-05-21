import dayjs from 'dayjs';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import relativeTime from 'dayjs/plugin/relativeTime';
import {scale, verticalScale} from 'react-native-size-matters';

import BackButton from '../BackButton';
import {Colors} from '~/styles/colors';
import CustomAvatar from '../CustomAvatar';
import HelveticaRegularText from '../HelveticaRegularText';
import MoreOptionsButton from '../MoreOptionsButton';
import AvatarWithTitle from '../AvatarWithTitle';
import {navigate} from '~/navigation/methods';
import useAuthStore from '~/stores/authStore';
import {useOtherUserProfileOptionMenuStore} from '~/stores';
import OtherUserProfileOptionMenu from '~/components/molecules/OtherUserProfileOptionMenu';
import ReportMenu from '~/components/molecules/ReportMenu';
import ReportUser from '~/components/molecules/ReportUser';

dayjs.extend(relativeTime);

const SectionTopChat = props => {
  const {style, data, isAdmin = false} = props;
  const {userId} = useAuthStore(state => state);
  const {setShowModal} = useOtherUserProfileOptionMenuStore(state => state);

  return (
    <View style={[styles.SectionTopChat, style]}>
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
        }}>
        <View style={{flex: 2}}>
          <BackButton />
        </View>
        <View
          style={{
            flex: 7,
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexDirection: 'row',
            paddingLeft: 20,
          }}>
          {data?.photoUrl ? (
            <CustomAvatar
              uri={data.photoUrl}
              onPress={() => {
                data?.id != userId
                  ? isAdmin == false
                    ? navigate('OtherUserProfile', {
                        entityId: data?.id,
                      })
                    : navigate('UserProfile', {
                        entityId: data?.id,
                      })
                  : navigate('Profile');
              }}
              width={scale(34)}
              height={scale(34)}
              borderWidth={2}
              borderColor={'#D9C1F3'}
            />
          ) : (
            <View style={styles.avatar}>
              <AvatarWithTitle
                name={data?.fullName ? `${data?.fullName}` : data?.userName}
                onPress={() => {
                  data?.id != userId
                    ? isAdmin == false
                      ? navigate('OtherUserProfile', {
                          entityId: data?.id,
                        })
                      : navigate('UserProfile', {
                          entityId: data?.id,
                        })
                    : navigate('Profile');
                }}
                width={scale(34)}
                height={scale(34)}></AvatarWithTitle>
            </View>
          )}
          <HelveticaRegularText
            text={data?.fullName ? `${data?.fullName}` : data?.userName}
            fontSize={12}
            color={Colors.cleanWhite}
            ml={2}
          />
        </View>

        <View style={{flex: 1}}>
          {isAdmin == false && (
            <MoreOptionsButton
              onPress={() => {
                setShowModal(true);
              }}
            />
          )}
        </View>
      </View>

      <ReportUser entityId={data?.id} />

      <OtherUserProfileOptionMenu entityId={data?.id} isChat={true} />
    </View>
  );
};
const styles = StyleSheet.create({
  SectionTopchat: {
    backgroundColor: Colors.chatTopSection,
    width: '100%',
    flexDirection: 'row',
    height: verticalScale(48),
  },
  avatar: {
    width: scale(34),
    height: scale(34),
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eaeaea',
  },
});
export default React.memo(SectionTopChat);
