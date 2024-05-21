import {FlatList, View} from 'native-base';
import React, {memo} from 'react';
import {Text} from 'react-native';

import {PieChart} from 'react-native-gifted-charts';
import {Colors} from '~/styles/colors';
import {width} from '~/utils/dimension';

const renderDot = color => {
  return (
    <View
      style={{
        height: 10,
        width: 20,
        borderRadius: 5,
        backgroundColor: color,
        marginRight: 10,
      }}
    />
  );
};

function renderListItem({item}: {item: object}) {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 16,
        paddingHorizontal: 16,
      }}>
      {renderDot(item.color)}
      <Text style={{color: 'white', fontFamily: 'Helvetica', fontSize: 12}}>
        {item.title + ' : '}
        {item.value != null ? item.value : 0}
      </Text>
    </View>
  );
}

export default memo(function CustomPieChart({data}: {data: any}) {
  return (
    <View>
      <View
        style={{alignItems: 'center', justifyContent: 'center', width: width}}>
        <PieChart
          data={data}
          showGradient
          showText={true}
          textSize={16}
          showValuesAsLabels
          textColor={Colors.primary}
          radius={120}
          donut
          innerCircleColor={Colors.background}
          innerCircleBorderWidth={0}
          innerCircleBorderColor={Colors.background}
          strokeWidth={0}
          strokeColor={Colors.background}
        />
      </View>
      <FlatList
        style={{marginTop: 16}}
        data={data}
        renderItem={renderListItem}
        showsVerticalScrollIndicator={false}
        numColumns={3}
        keyExtractor={(item: any) => JSON.stringify(item?.key)}
      />

      {/*       
      {data.map(element => (
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginBottom: 10,
            paddingHorizontal: 16,
          }}>
          {renderDot(element.color)}
          <Text style={{color: 'white', fontFamily: 'Helvetica', fontSize: 12}}>
            {element.title + ' : '}
            {element.value != null ? element.value : 0}
          </Text>
        </View>
      ))} */}
    </View>
  );
});
