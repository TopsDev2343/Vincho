import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';

import {Colors} from '~/styles/colors';
// import {windowWidth} from '~/styles/globalStyles';
// import {dataProvider} from '~/utils/userActivitiesDataProvider';
import {navigate} from '~/navigation/methods';
import AvatarWithTitle from '~/components/atoms/AvatarWithTitle';
import HelveticaRegularText from '~/components/atoms/HelveticaRegularText';
import {SvgXml} from 'react-native-svg';
import {gear} from '~/assets/icons';

const AiFriendsListItem = ({item}: {item: any}) => {
  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        onPress={() => {
          navigate('UpdateTagsAiFriendSrceen', {
            aiFriend: item,
          });
        }}>
        <AvatarWithTitle
          uri={item?.user.photoUrl}
          name={item?.user.fullName}
          onPress={() => {}}
          width={32}
          height={32}
        />
        <View style={styles.rowName}>
          <HelveticaRegularText
            text={item?.user.fullName}
            fontSize={16}
            color={Colors.cleanWhite}
            textAlign={'center'}
            numberOfLines={1}
            width={'50%'}
          />
          <SvgXml stroke={Colors.primary} xml={gear} />
        </View>
      </TouchableOpacity>
    </View>
  );
};
export default AiFriendsListItem;

const styles = StyleSheet.create({
  itemContainer: {
    alignItems: 'center',
    marginHorizontal: scale(16),
    marginVertical: scale(12),
    flexDirection: 'column',
    paddingHorizontal: scale(6),
  },
  rowName: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scale(4),
  },
});
