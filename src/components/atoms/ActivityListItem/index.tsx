import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Image} from 'react-native';
import {scale} from 'react-native-size-matters';

import {Colors} from '~/styles/colors';
import {Fonts} from '~/styles/fonts';
import {failAvatar} from '~/assets/images';
import {getFullImageUrl} from '~/hooks/artist/Upload';

type UsersListItemInput = {
  img: string | null;
  name: string;
  imgOnPress?: any;
  msg?: string;
  date: string;
};
const ActivityListItem = (input: UsersListItemInput) => {
  let fileUrl = getFullImageUrl(input.img);
  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        onPress={input.imgOnPress}
        style={styles.imgContainer}
        disabled={input.imgOnPress ? false : true}>
        {input.img ? (
          <Image source={{uri: fileUrl}} style={styles.itemImg} />
        ) : (
          <Image source={failAvatar} style={styles.itemImg} />
        )}
        <View style={{marginLeft: scale(16)}}>
          <Text style={styles.itemTxt}>{input.name} </Text>
          <Text style={styles.timeTxt}>
            {input.msg} {input.date}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ActivityListItem;

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

  timeTxt: {
    color: Colors.txtMedium,
    ...Fonts.verySmallReg,
    textAlign: 'left',
  },
});
