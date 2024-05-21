import React from 'react';
import {View, StyleSheet} from 'react-native';

import {UserShortInfo} from '~/components';
import {Colors} from '~/styles/colors';
import LinearGradient from 'react-native-linear-gradient';
import {windowWidth} from '~/styles/globalStyles';
import {PlayVideo} from '~/components';
import {OptionMenuBtn} from '~/components';
import {showTimeAgoText} from '~/utils/showTimeAgoText';
import {getFullImageUrl} from '~/hooks/artist/Upload';

const ExploreVideoPost = ({
  item,
  menuOnPress,
  imgOnPress,
}: {
  item?: any;
  menuOnPress: any;
  imgOnPress: any;
}) => {
  let fileUrl = getFullImageUrl(item.fileUrl);

  return (
    <View>
      <LinearGradient colors={Colors.darkToLightBack1} style={styles.container}>
        <UserShortInfo
          name={item?.user?.userName}
          img={item?.user?.photoUrl}
          imgOnPress={imgOnPress}
          onLineTime={showTimeAgoText(item?.createdDate)}
        />
        <OptionMenuBtn onPress={menuOnPress} />
      </LinearGradient>

      <PlayVideo uri={fileUrl} />
    </View>
  );
};

export default ExploreVideoPost;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: windowWidth,
  },
});
