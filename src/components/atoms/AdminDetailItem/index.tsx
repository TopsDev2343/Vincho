import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import {Colors} from '~/styles/colors';
import {Fonts} from '~/styles/fonts';
import {HStack, View} from 'native-base';
import HelveticaRegularText from '../HelveticaRegularText';

type AdminDetailItemInput = {
  title: string;
  screenName?: string;
  onPress?: any;
  entityId: number;
};

const AdminDetailItem = (input: AdminDetailItemInput) => {
  const navigation = useNavigation<any>();

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(input.screenName, {entityId: input.entityId})
      }
      style={styles.itemContainer}>
      <HStack
        borderWidth={1}
        borderColor={Colors.onBackground}
        backgroundColor={Colors.onBackground}
        borderRadius={16}
        minHeight={70}
        mx={2.5}
        justifyContent={'flex-start'}
        alignItems={'center'}
        p={2}
        flex={1}>
        <View
          width={scale(60)}
          height={scale(60)}
          justifyContent={'center'}
          alignItems={'center'}
          borderRadius={100}>
          <View style={styles.container}>
            <View style={styles.shinyDot} />
            <View style={styles.shinyCircle}></View>
          </View>
        </View>
        <HelveticaRegularText
          text={input.title}
          fontSize={16}
          color={Colors.white}
          ml={2}
        />
      </HStack>
    </TouchableOpacity>
  );
};

export default AdminDetailItem;

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    marginBottom: scale(16),
    width: '100%',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  shinyDot: {
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.5)',
    width: scale(6),
    height: scale(6),
    borderWidth: scale(0.2),
    shadowColor: 'rgba(255,255,255,1)',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    zIndex: 10,
    marginRight: scale(26),
    marginBottom: -scale(8),
    shadowOpacity: 10,
    elevation: 6,
  },
  shinyCircle: {
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(71,54,75)',
    width: scale(36),
    height: scale(36),
    borderWidth: scale(0.2),
    borderColor: 'rgba(255,255,255,1)',
    shadowColor: 'rgba(255,255,255,0.7)',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    elevation: 6,
  },
});
