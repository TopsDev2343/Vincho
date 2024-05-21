import {Avatar, Center} from 'native-base';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Colors} from '~/styles/colors';
import {getImageUrl} from '~/utils/image';
import type {IViewProps} from 'native-base/lib/typescript/components/basic/View/types';
import {getFullImageUrl} from '~/hooks/artist/Upload';

const CustomAvatar = ({
  uri,
  onPress,
  ...otherProps
}: {
  uri?: string | null;
  onPress?: () => void;
  otherProps: IViewProps & React.RefAttributes<unknown>;
}) => {
  return (
    <TouchableOpacity disabled={!onPress} onPress={onPress}>
      <Center>
        <Avatar
          size={'md'}
          source={{uri: getFullImageUrl(uri)}}
          backgroundColor={Colors.cleanWhite}
          {...otherProps}
        />
      </Center>
    </TouchableOpacity>
  );
};

export default CustomAvatar;
