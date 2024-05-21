import React from 'react';
import {Image, View, StyleSheet} from 'react-native';

import {CustomImage, UserShortInfo} from '~/components';
import {Colors} from '~/styles/colors';
import LinearGradient from 'react-native-linear-gradient';
import {windowHeight, windowWidth} from '~/styles/globalStyles';
import {OptionMenuBtn} from '~/components';
import {showTimeAgoText} from '~/utils/showTimeAgoText';
import {getFullImageUrl} from '~/hooks/artist/Upload';
const ExploreImgPost = ({
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
    <View style={styles.container}>
      {/*       <Image source={{uri: fileUrl}} style={styles.img} /> */}
      <CustomImage
        imageSource={fileUrl}
        style={styles.img}
        resizeMode="cover"
      />
      <LinearGradient
        colors={Colors.darkToLightBack1}
        style={styles.gradientContainer}>
        <UserShortInfo
          name={item?.user?.userName}
          img={item?.user?.photoUrl}
          imgOnPress={imgOnPress}
          onLineTime={showTimeAgoText(item?.createdDate)}
        />
        <OptionMenuBtn onPress={menuOnPress} />
      </LinearGradient>
    </View>
  );
};

export default ExploreImgPost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradientContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    width: windowWidth,
    bottom: windowHeight - windowHeight * 0.28,
  },
  img: {
    top: windowHeight * 0.02,
    width: windowWidth,
    height: windowHeight - windowHeight * 0.26,
  },
});
