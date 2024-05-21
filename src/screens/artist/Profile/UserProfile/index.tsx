import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
  Pressable,
} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import {SvgXml} from 'react-native-svg';
import {useNavigation} from '@react-navigation/native';

import {Colors} from '~/styles/colors';
import {
  AvatarWithTitle,
  CustomButton,
  CustomContainer,
  CustomKeyboardAwareScrollView,
  HelveticaRegularText,
} from '~/components';
import {Fonts} from '~/styles/fonts';
import {halfCircle, menu} from '~/assets/icons';
import {windowHeight, windowWidth} from '~/styles/globalStyles';
import {profileBackground} from '~/assets/images';

import Animated, {
  Extrapolate,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Carousel, {ICarouselInstance} from 'react-native-reanimated-carousel';
import {width} from '~/utils/dimension';
import {useGetUserProfile} from '~/hooks/artist/User';
import NearbyProfileScreen from '../NearbyProfileScreen';
import PostProfileScreen from '../PostProfileScreen';
import CollectionProfileScreen from '../Collection/CollectionProfileScreen';
import AboutProfile from '../AboutProfile';
import UserActivities from '../UserActivities';
import AiFriends from '../AiFriends';
import NotificationList from '../../NotificationList';
import {
  useGetNotificationReadedCount,
  useReadNotifcations,
} from '~/hooks/artist/Activities';
import {Strings} from '~/assets/strings';
import Referrals from '../Referrals';
//import UserActivities from '../UserActivities';

const PAGE_WIDTH = 120;
const PAGE_HEIGHT = 40;
const DATA = [
  'Posts',
  'Referrals',
  'Collections',
  'Nearby',
  'Friends',
  'About',
  'Notification',
  'Activity',
];
const pages = {
  Posts: <PostProfileScreen />,
  Referrals: <Referrals />,
  Collections: <CollectionProfileScreen />,
  Nearby: <NearbyProfileScreen />,
  About: <AboutProfile />,
  Friends: <AiFriends />,
  Notification: <NotificationList />,
  Activity: <UserActivities />,
};

const UserProfile = ({navigation}: {navigation: any}) => {
  const r = React.useRef<ICarouselInstance>(null);
  const [loop] = React.useState(true);
  const nav = useNavigation();
  const [showNotif, setShowNotif] = useState(false);

  const {
    isLoading: getProfileLoading,
    data: getProfileData,
    isError: getProfileFail,
    refetch: refetchProfile,
  } = useGetUserProfile();

  function navigateToCreateAiFirend() {
    setCurrentPageName('Friends');
    r.current?.scrollTo({index: 4, animated: false});
    navigation.navigate('SelectTagsAiFriendSrceen');
  }

  const {data: getCountData} = useGetNotificationReadedCount({
    isReaded: {eq: false},
  });

  const {mutate: mutateReadNotifs} = useReadNotifcations();

  useEffect(() => {
    if (getCountData?.notification_getNotifications?.result?.totalCount > 0) {
      setShowNotif(true);
    }
  }, [getCountData]);
  const readNotifications = () => {
    mutateReadNotifs({});
    setShowNotif(false);
  };

  const [currentPageName, setCurrentPageName] = React.useState('Posts');
  return (
    <CustomContainer
      isLoading={getProfileLoading}
      isError={getProfileFail}
      onPress={refetchProfile}>
      <CustomKeyboardAwareScrollView>
        <View style={styles.container}>
          <View
            style={{
              height: verticalScale(260),
              backgroundColor: Colors.background,
            }}>
            <TouchableOpacity
              onPress={() => nav.openDrawer()}
              style={[{marginTop: scale(20)}, styles.menuIcon]}>
              <SvgXml xml={menu} width={scale(20)} height={scale(20)} />
            </TouchableOpacity>
            <View style={styles.menubarContainer}>
              <ImageBackground
                resizeMode="cover"
                source={profileBackground}
                style={styles.menubarImage}>
                <SvgXml
                  xml={halfCircle}
                  zIndex={100}
                  top={verticalScale(-22)}
                  width={scale(50)}
                  height={verticalScale(10)}
                />
              </ImageBackground>
            </View>
            <View style={styles.innerContainer}>
              <AvatarWithTitle
                uri={getProfileData?.user_getProfile?.result?.photoUrl}
                name={getProfileData?.user_getProfile?.result?.userName}
                onPress={() => {}}
                width={32}
                height={32}
              />

              <HelveticaRegularText
                text={
                  getProfileData?.user_getProfile?.result?.fullName
                    ? getProfileData?.user_getProfile?.result?.fullName
                    : getProfileData?.user_getProfile?.result?.userName
                }
                fontSize={16}
                color={Colors.cleanWhite}
                mt={4}
                textAlign={'center'}
              />
              <HelveticaRegularText
                text={getProfileData?.user_getProfile?.result?.aboutText}
                fontSize={14}
                color={Colors.cleanWhite}
                mt={4}
                textAlign={'justify'}
                numberOfLines={4}
                width={'100%'}
              />
              <CustomButton
                title={Strings.createYourFriend}
                titleColor={Colors.txtDark}
                backColor={Colors.primary}
                btnMTop={scale(6)}
                onPress={navigateToCreateAiFirend}
              />
            </View>
          </View>
          <View style={{flex: 1}}>
            <View
              style={{
                marginBottom: 20,
                marginTop: verticalScale(10),
                paddingBottom: verticalScale(20),
              }}>
              <Carousel
                key={`${loop}`}
                ref={r}
                loop={loop}
                style={{
                  width: width,
                  height: PAGE_HEIGHT,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                width={PAGE_WIDTH}
                height={PAGE_HEIGHT}
                data={DATA}
                onSnapToItem={index => {
                  r.current?.scrollTo({index: index, animated: false});
                  setCurrentPageName(DATA[index]);
                }}
                renderItem={({item, animationValue}) => {
                  return (
                    <Item
                      showNotif={showNotif}
                      animationValue={animationValue}
                      label={item}
                      onPress={() => {
                        r.current?.scrollTo({
                          count: animationValue.value,
                          animated: true,
                        });
                        setCurrentPageName(item);
                        if (item == 'Notification' && showNotif) {
                          readNotifications();
                        }
                      }}
                    />
                  );
                }}
                autoPlay={false}
              />
            </View>
            {pages[currentPageName]}
          </View>
        </View>
      </CustomKeyboardAwareScrollView>
    </CustomContainer>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: scale(20),
    height: verticalScale(200),
  },
  menuIcon: {
    marginLeft: scale(16),
    zIndex: 100,
  },
  titleTxt: {
    color: Colors.txtLight,
    ...Fonts.largeRegChanel,
  },
  bodyTxt: {
    color: Colors.txtMedium,
    ...Fonts.mediumReg,
  },
  menubarContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: windowWidth,
    height: windowHeight,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  menubarImage: {
    width: windowWidth,
    height: windowHeight,
    justifyContent: 'flex-end',
    alignItems: 'center',
    top: '-50%',
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginVertical: 16,
  },
});

interface Props {
  animationValue: Animated.SharedValue<number>;
  label: string;
  onPress?: () => void;
  showNotif: boolean;
}

const Item: React.FC<Props> = props => {
  const {animationValue, label, onPress, showNotif} = props;

  const translateY = useSharedValue(0);

  const containerStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      animationValue.value,
      [-1, 0, 1],
      [0.5, 1, 0.5],
      Extrapolate.CLAMP,
    );

    return {
      opacity,
    };
  }, [animationValue]);

  const labelStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      animationValue.value,
      [-1, 0, 1],
      [1, 1.25, 1],
      Extrapolate.CLAMP,
    );

    const color = interpolateColor(
      animationValue.value,
      [-1, 0, 1],
      [Colors.txtMedium, Colors.cleanWhite, Colors.txtMedium],
    );

    return {
      transform: [{scale}, {translateY: translateY.value}],
      color,
    };
  }, [animationValue, translateY]);

  const onPressIn = React.useCallback(() => {
    translateY.value = withTiming(-8, {duration: 250});
  }, [translateY]);

  const onPressOut = React.useCallback(() => {
    translateY.value = withTiming(0, {duration: 250});
  }, [translateY]);

  return (
    <Pressable
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={{}}>
      <Animated.View
        style={[
          {
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          },
          containerStyle,
        ]}>
        {label == 'Notification' && showNotif && (
          <View
            style={{
              width: scale(8),
              height: scale(8),
              borderRadius: scale(100),
              backgroundColor: Colors.primary,
              position: 'absolute',
              top: 8,
              left: 8,
            }}
          />
        )}

        <Animated.Text
          style={[
            {fontSize: 14, fontFamily: 'Helvetica', color: Colors.cleanWhite},
            labelStyle,
          ]}>
          {label}
        </Animated.Text>
      </Animated.View>
    </Pressable>
  );
};
