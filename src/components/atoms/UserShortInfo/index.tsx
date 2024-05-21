import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Image} from 'react-native';
import {scale} from 'react-native-size-matters';

import {Colors} from '~/styles/colors';
import {Fonts} from '~/styles/fonts';
import {useAuthStore, useAuthModalStore} from '~/stores';
import AvatarWithTitle from '../AvatarWithTitle';

type UsersListItemInput = {
  img: string | null;
  name: string;
  imgOnPress?: any;
  onLineTime?: string;
};
const UserShortInfo = (input: UsersListItemInput) => {
  const {userId} = useAuthStore(state => state);
  const {setShowAuthModal} = useAuthModalStore(state => state);
  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        onPress={userId ? input.imgOnPress : () => setShowAuthModal(true)}
        style={styles.imgContainer}
        disabled={input.imgOnPress ? false : true}>
        {/*    <Image source={{ uri: input.img }} style={styles.itemImg} /> */}
        <AvatarWithTitle
          name={input.name}
          onPress={() => {}}
          uri={input.img}
          width={scale(48)}
          height={scale(48)}
          resizeMode={'cover'}
          borderRadius={scale(30)}
        />
        <View style={{marginLeft: scale(16)}}>
          <Text style={styles.itemTxt}>{input.name}</Text>
          {input.onLineTime && (
            <Text style={styles.timeTxt}>{input.onLineTime}</Text>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default UserShortInfo;

const styles = StyleSheet.create({
  itemContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: scale(9),
    marginTop: scale(6),
    flexDirection: 'row',
    paddingHorizontal: scale(6),
    paddingVertical: scale(6),
  },
  itemTxt: {
    color: Colors.txtLight,
    ...Fonts.mediumReg,
  },
  itemImg: {
    width: scale(48),
    height: scale(48),
    resizeMode: 'cover',
    borderRadius: scale(30),
  },
  imgContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
  },
  timeTxt: {
    color: Colors.txtMedium,
    ...Fonts.verySmallReg,
    textAlign: 'left',
  },
});
