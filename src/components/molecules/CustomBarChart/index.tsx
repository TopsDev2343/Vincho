import {View} from 'native-base';
import React, {memo} from 'react';

import {verticalScale} from 'react-native-size-matters';
import {width} from '~/utils/dimension';
import VerticalBarGraph from '@chartiful/react-native-vertical-bar-graph';
import {Colors} from '~/styles/colors';

const config = {
  xAxisLabelStyle: {
    position: 'right',
    fontFamily: 'Helvetica',
    fontSize: 10,
    color: Colors.secondary,
  },
  yAxisLabelStyle: {
    rotation: -35,
    fontFamily: 'Helvetica',
    fontSize: 10,
    color: Colors.secondary,
  },
  xAxisBackgroundLineStyle: {
    strokeWidth: 1,
    color: '#D9D9D9',
  },
};

export default memo(function CustomBarChart({
  data,
  labels,
}: {
  data: any;
  labels: any;
}) {
  return (
    <View flexDirection={'row-reverse'} width={width - 10}>
      <View flex={9}>
        <VerticalBarGraph
          data={data}
          labels={labels}
          width={width - 10}
          height={verticalScale(216)}
          barRadius={4}
          barWidthPercentage={0.1}
          barColor={Colors.secondary}
          baseConfig={config}
        />
        <View />
      </View>
    </View>
  );
});
