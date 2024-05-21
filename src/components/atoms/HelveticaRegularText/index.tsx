import {Text} from 'native-base';
import React, {memo} from 'react';
import type {IViewProps} from 'native-base/lib/typescript/components/basic/View/types';

export default memo(function HelveticaRegularText({
  text,
  fontSize,
  color,
  mt,
  textAlign,
  numberOfLines,
  ...otherProps
}: {
  text: string;
  fontSize?: number;
  color?: string;
  mt?: number;
  textAlign?: string;
  numberOfLines?: number;
  otherProps?: IViewProps & React.RefAttributes<unknown>;
}) {
  return (
    <Text
      fontFamily={'Helvetica'}
      fontSize={fontSize}
      color={color}
      mt={mt}
      numberOfLines={numberOfLines}
      textAlign={textAlign}
      {...otherProps}>
      {text}
    </Text>
  );
});
