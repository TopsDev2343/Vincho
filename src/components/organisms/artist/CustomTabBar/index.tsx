import React from 'react';
import {View} from 'react-native';

import {AddPostBtn} from '~/components';
import {TabBarButton} from '~/components';
import {Colors} from '~/styles/colors';
import {windowHeight} from '~/styles/globalStyles';

const CustomTabBar = ({
  state,
  descriptors,
  navigation,
}: {
  state: any;
  descriptors: any;
  navigation: any;
}) => {
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          backgroundColor: Colors.onBackground,
          height: windowHeight * 0.08,
        }}>
        {state.routes.map((route: any, index: string) => {
          const {options} = descriptors[route.key];
          const isFocused = state.index === index;
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              navigation.navigate({name: route.name, merge: true});
            }
          };

          return (
            <TabBarButton
              key={index}
              isFocused={isFocused}
              options={options}
              onPress={onPress}
              name={route.name}
            />
          );
        })}
      </View>

      <AddPostBtn />
    </View>
  );
};
export default CustomTabBar;
