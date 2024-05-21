import React from 'react';
import {StyleSheet} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {scale} from 'react-native-size-matters';
import {TouchableOpacity} from 'react-native';

import {
  chatOutline,
  exploreFill,
  chatFill,
  exploreOutline,
  profileFill,
  profileOutline,
  communityFill,
  communityOutline,
} from '~/assets/icons';

const TabBarButton = ({
  isFocused,
  options,
  onPress,
  name,
}: {
  isFocused: boolean;
  options: any;
  onPress: any;
  name: string;
}) => {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityState={isFocused ? {selected: true} : {}}
      accessibilityLabel={options.tabBarAccessibilityLabel}
      testID={options.tabBarTestID}
      onPress={onPress}
      style={{
        marginRight: name === 'Community' ? scale(20) : 0,
        marginLeft: name === 'Chat' ? scale(20) : 0,
        padding: scale(10),
      }}>
      {name === 'Explore' ? (
        isFocused ? (
          <SvgXml {...styles.icon} xml={exploreFill} />
        ) : (
          <SvgXml xml={exploreOutline} />
        )
      ) : null}
      {name === 'Profile' ? (
        isFocused ? (
          <SvgXml {...styles.icon} xml={profileFill} />
        ) : (
          <SvgXml {...styles.icon} xml={profileOutline} />
        )
      ) : null}
      {name === 'Chat' ? (
        isFocused ? (
          <SvgXml {...styles.icon} xml={chatFill} />
        ) : (
          <SvgXml {...styles.icon} xml={chatOutline} />
        )
      ) : null}
      {name === 'Community' ? (
        isFocused ? (
          <SvgXml {...styles.icon} xml={communityFill} />
        ) : (
          <SvgXml {...styles.icon} xml={communityOutline} />
        )
      ) : null}
    </TouchableOpacity>
  );
};

export default TabBarButton;

const styles = StyleSheet.create({
  icon: {
    width: '24',
    height: '24',
  },
});
