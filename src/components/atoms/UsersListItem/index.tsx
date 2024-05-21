import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import {scale} from 'react-native-size-matters';

import {Colors} from '~/styles/colors';
import {Fonts} from '~/styles/fonts';
import {useManuallyGetConversationForUser} from '~/hooks/artist/Messages';
import AvatarWithTitle from '../AvatarWithTitle';
import {useAuthStore} from '~/stores';
import {navigate} from '~/navigation/methods';

const UsersListItem = ({
  item,
  btnOnPress,
  btnLoading,
  setItemId,
  itemId,
  selectedList,
  nonSelectedTitle,
  selectedTitle,
  isForwardMsg = false,
}: {
  item: any;
  btnOnPress: any;
  btnLoading: boolean;
  setItemId: any;
  itemId: number | undefined;
  selectedList: number[];
  nonSelectedTitle: string;
  selectedTitle: string;
  isForwardMsg?: boolean;
}) => {
  const {data: lastConversation, refetch: refetchConversation} =
    useManuallyGetConversationForUser(item?.id);
  const {userId} = useAuthStore(state => state);
  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        onPress={() => {
          item?.id != userId
            ? navigate('OtherUserProfile', {
                entityId: item?.id,
              })
            : navigate('Profile');
        }}
        style={styles.imgContainer}>
        <AvatarWithTitle
          uri={item?.photoUrl}
          name={item?.userName}
          width={scale(50)}
          height={scale(50)}
          borderRadius={scale(30)}
          onPress={() => {
            item?.id != userId
              ? navigate('OtherUserProfile', {
                  entityId: item?.id,
                })
              : navigate('Profile');
          }}
        />
        <Text style={styles.itemTxt} numberOfLines={1}>
          {item?.userName}
        </Text>
      </TouchableOpacity>

      {item?.id != userId && (
        <TouchableOpacity
          onPress={() =>
            isForwardMsg
              ? [
                  setItemId(item?.id),
                  refetchConversation(),
                  btnOnPress(
                    item?.id,
                    lastConversation?.message_getConversationForUser?.result
                      ?.id,
                  ),
                ]
              : [setItemId(item?.id), btnOnPress(item?.id)]
          }
          style={styles.followBtn}>
          {btnLoading && itemId === item?.id ? (
            <ActivityIndicator color={Colors.white} />
          ) : (
            <Text
              style={[
                styles.followTxt,
                {
                  color: selectedList.includes(item?.id)
                    ? Colors.white
                    : Colors.primary,
                },
              ]}>
              {selectedList.includes(item?.id)
                ? nonSelectedTitle
                : selectedTitle}
            </Text>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};
export default UsersListItem;

const styles = StyleSheet.create({
  itemContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: scale(16),
    marginTop: scale(6),
    backgroundColor: Colors.transparent,
    flexDirection: 'row',
    paddingHorizontal: scale(6),
    paddingVertical: scale(6),
  },
  itemTxt: {
    color: Colors.txtLight,
    marginLeft: scale(16),
    ...Fonts.smallLight,
    flex: 2,
  },
  itemImg: {
    width: scale(50),
    height: scale(50),
    resizeMode: 'cover',
    borderRadius: scale(30),
  },
  imgContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 7,
    marginRight: scale(10),
  },
  followTxt: {
    color: Colors.primary,
    ...Fonts.smallLight,
    textAlign: 'center',
  },
  followBtn: {
    backgroundColor: Colors.onBackground,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: scale(30),
    paddingVertical: scale(4),
    borderRadius: scale(8),
    flex: 3,
  },
});
