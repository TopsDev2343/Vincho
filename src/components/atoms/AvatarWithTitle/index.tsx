import {Avatar, HStack, View} from 'native-base';
import React from 'react';
import {Colors} from '~/styles/colors';
import {abbr} from '~/utils/abbr';
import {getImageUrl} from '~/utils/image';
import HelveticaRegularText from '../HelveticaRegularText';
import type {IViewProps} from 'native-base/lib/typescript/components/basic/View/types';
import {Pressable} from 'react-native';
import {getFullImageUrl} from '~/hooks/artist/Upload';

export default function AvatarWithTitle({
  name,
  uri,
  onPress,
  fontSize,
  ...otherProps
}: {
  name?: string | null;
  uri?: string | null;
  onPress?: () => void;
  fontSize?: number;
  otherProps: IViewProps & React.RefAttributes<unknown>;
}) {
  if (uri != null && uri != '') {
    uri = getFullImageUrl(uri);
    return (
      <View justifyContent={'center'} alignItems={'center'}>
        <Pressable onPress={onPress}>
          <Avatar
            width={32}
            height={32}
            borderRadius={100}
            source={{uri: getImageUrl(uri)}}
            backgroundColor={Colors.txtMedium}
            justifyContent={'center'}
            alignItems={'center'}
            {...otherProps}
          />
        </Pressable>
      </View>
    );
  }
  if (name == null) {
    name = 'New User';
  }

  return (
    <HStack justifyContent={'center'} alignItems={'flex-start'}>
      <Pressable onPress={onPress}>
        <View
          background={Colors.txtMedium}
          width={32}
          height={32}
          borderRadius={100}
          justifyContent={'center'}
          alignItems={'center'}
          {...otherProps}>
          <HelveticaRegularText
            fontSize={fontSize || 24}
            text={name != null ? abbr(name) : ''}
            color={Colors.white}
          />
        </View>
      </Pressable>
    </HStack>
  );
}
