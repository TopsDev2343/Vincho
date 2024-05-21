import React from 'react';
import {Pressable, Box, Spinner} from 'native-base';
import {SvgXml} from 'react-native-svg';
import {scale} from 'react-native-size-matters';

import {coloredLikeBack} from '~/assets/icons';
import {Colors} from '~/styles/colors';

const PostBtnRowItem = ({
  isLoading,
  icon,
  onPress,
  isLike = false,
}: {
  isLoading?: boolean | undefined;
  icon: string;
  onPress: any;
  isLike?: boolean;
}) => {
  return (
    <Pressable onPress={onPress}>
      {isLike ? (
        isLoading ? (
          <Box>
            <SvgXml
              xml={coloredLikeBack}
              width={scale(175)}
              height={scale(50)}
            />
            <Spinner
              color={Colors.OnOverlay}
              position={'absolute'}
              mt={scale(16)}
              ml={scale(82)}
            />
          </Box>
        ) : (
          <SvgXml xml={icon} width={scale(175)} height={scale(50)} />
        )
      ) : (
        <SvgXml xml={icon} width={scale(60)} height={scale(50)} />
      )}
    </Pressable>
  );
};
export default PostBtnRowItem;
