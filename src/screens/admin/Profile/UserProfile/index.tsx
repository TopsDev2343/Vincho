import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Pressable, TouchableOpacity} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import {SvgXml} from 'react-native-svg';

import {Colors} from '~/styles/colors';
import {
  AvatarWithTitle,
  BackButton,
  CustomContainer,
  CustomKeyboardAwareScrollView,
  HelveticaRegularText,
} from '~/components';
import {Fonts} from '~/styles/fonts';
import {
  allReports,
  chatOutline,
  disableUser,
  halfCircle,
  warning,
} from '~/assets/icons';
import {windowHeight, windowWidth} from '~/styles/globalStyles';

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
import {useGetOtherUserProfile} from '~/hooks/artist/User';
import AboutProfile from '../AboutProfile';
import CollectionProfileScreen from '../Collection/CollectionProfileScreen';
import PostProfileScreen from '../PostProfileScreen';
import UserTopic from '../UserTopic';
import UserActivities from '../UserActivities';
import {Button, HStack, VStack} from 'native-base';
import {Strings} from '~/assets/strings';
import {useDeleteAdmin} from '~/hooks/admin/Admin';
import snackBar from '~/utils/snackBar';
import {messageHelper} from '~/utils/messageHelper';
import {goBack, navigate} from '~/navigation/methods';
import {useGetConversationIdForUser} from '~/hooks/artist/Messages';
import {DeleteModal} from '~/components/atoms/DeleteModal';
import {useGetReportedAccountsCount} from '~/hooks/admin/Reports';
import {queryClient} from '~/graphql/AuthProvider';
import {queryKeys} from '~/constants/queryKeys';
import {UserType} from '~/generated/graphql';

const PAGE_WIDTH = 120;
const PAGE_HEIGHT = 40;
const DATA = ['Posts', 'Collections', 'Topics', 'About', 'Activity'];

const UserProfile = ({route}: {route: any}) => {
  const entityId = route.params?.entityId;
  const [showModal, setShowModal] = useState<boolean>(false);

  const pages = {
    Posts: <PostProfileScreen entityId={entityId} />,
    Collections: <CollectionProfileScreen entityId={entityId} />,
    Topics: <UserTopic entityId={entityId} />,
    About: <AboutProfile entityId={entityId} />,
    Activity: <UserActivities entityId={entityId} />,
  };
  const r = React.useRef<ICarouselInstance>(null);
  const [loop] = React.useState(true);

  const {
    isLoading: getProfileLoading,
    data: getProfileData,
    isSuccess: getProfileSuccess,
    isError: getProfileFail,
    error: getProfileErrorMsg,
    refetch: refetchProfile,
  } = useGetOtherUserProfile(entityId);

  const {data: report} = useGetReportedAccountsCount({
    where: {reportedUserId: {eq: entityId}},
  });
  const [currentPageName, setCurrentPageName] = React.useState('Posts');

  const {mutate: mutateDelete, isLoading: isDeleting} = useDeleteAdmin();
  function deleteOnPress() {
    mutateDelete(entityId, {
      onSuccess: successData => {
        if (successData.user_changeUserActivation?.status.value == 'Success') {
          queryClient.invalidateQueries([queryKeys.getAllUsers]);
          queryClient.invalidateQueries([queryKeys.getNearbyUsers]);
          goBack();
        } else {
          snackBar(
            messageHelper(successData.user_changeUserActivation?.status.value),
          );
        }
      },
    });
  }

  const [recieverUserId, setRecieverUserId] = useState<number>();
  const [isLoadingConversationId, setIsLoadingConversationId] =
    useState<boolean>(false);

  const result = useGetConversationIdForUser(
    recieverUserId,
    {userId: {eq: recieverUserId}},
    {
      onSuccess: data => {
        let conversationId = 0;
        if (data?.message_getUserMessages?.result?.totalCount > 0) {
          conversationId =
            data?.message_getUserMessages?.result?.items[0]?.conversationId;
        }
        navigate('Conversation', {
          receiverId: entityId,
          headerData: getProfileData?.user_getProfile?.result,
          conversationId: conversationId,
        });
        setRecieverUserId(undefined);
        setIsLoadingConversationId(false);
      },
    },
  );

  return (
    <CustomContainer
      isLoading={getProfileLoading}
      isError={getProfileFail}
      onPress={refetchProfile}>
      <BackButton />
      <View style={{flex: 9}}>
        <CustomKeyboardAwareScrollView>
          <View style={{flex: 1}}>
            <View style={styles.innerContainer}>
              {report?.reportUser_getReportUsers?.result?.totalCount > 0 && (
                <TouchableOpacity
                  onPress={() => {
                    navigate('ReportedAccountScreen', {entityId: entityId});
                  }}
                  style={styles.reportContainer}>
                  <SvgXml xml={warning} />
                  <HelveticaRegularText
                    text={
                      report?.reportUser_getReportUsers?.result?.totalCount
                        ? report?.reportUser_getReportUsers?.result
                            ?.totalCount == 1
                          ? report?.reportUser_getReportUsers?.result
                              ?.totalCount + ' user reported this account'
                          : report?.reportUser_getReportUsers?.result
                              ?.totalCount + ' users reported this account'
                        : '0 user reported this account'
                    }
                    fontSize={12}
                    pl={4}
                    pr={2}
                    color={Colors.warning}
                  />
                </TouchableOpacity>
              )}
              <AvatarWithTitle
                uri={getProfileData?.user_getProfile?.result?.photoUrl}
                name={
                  getProfileData?.user_getProfile?.result?.fullName
                    ? getProfileData?.user_getProfile?.result?.fullName
                    : getProfileData?.user_getProfile?.result?.userName
                }
                onPress={() => {}}
                width={24}
                height={24}
              />

              <HStack>
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
                {/*                 <HelveticaRegularText
                  text={
                    !getProfileData?.user_getProfile?.result?.isActive
                      ? '(Disabled)'
                      : ''
                  }
                  fontSize={16}
                  color={Colors.error}
                  mt={4}
                  textAlign={'center'}
                /> */}
              </HStack>

              <HelveticaRegularText
                text={getProfileData?.user_getProfile?.result?.aboutText}
                fontSize={14}
                color={Colors.cleanWhite}
                mt={4}
                textAlign={'justify'}
                numberOfLines={4}
                width={'100%'}
              />
            </View>

            <View style={{flex: 1}}>
              <View
                style={{
                  marginBottom: 20,
                  marginTop: verticalScale(10),
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
                        animationValue={animationValue}
                        label={item}
                        onPress={() => {
                          r.current?.scrollTo({
                            count: animationValue.value,
                            animated: true,
                          });
                          setCurrentPageName(item);
                        }}
                      />
                    );
                  }}
                  autoPlay={false}
                />
              </View>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  paddingBottom: verticalScale(10),
                }}>
                <SvgXml
                  xml={halfCircle}
                  zIndex={100}
                  width={scale(50)}
                  height={verticalScale(10)}
                />
              </View>
              {pages[currentPageName]}
            </View>
          </View>
        </CustomKeyboardAwareScrollView>
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: Colors.onBackground,
        }}>
        <HStack justifyContent={'space-between'} flex={1} width={'100%'}>
          <Button
            onPress={() => {
              navigate('UserReportedPosts', {
                entityId: entityId,
              });
            }}
            width={24}
            px={0}
            bg={Colors.onBackground}
            borderRadius={6}>
            <VStack alignItems={'center'}>
              <SvgXml xml={allReports} />
              <HelveticaRegularText
                textAlign={'center'}
                text={Strings.allReports}
                fontSize={12}
                color={Colors.warning}
                mt={2}
              />
            </VStack>
          </Button>

          <Button
            onPress={() => {
              setShowModal(true);
            }}
            isDisabled={
              getProfileData?.user_getProfile?.result?.userType !=
              UserType.Artist
            }
            width={24}
            px={0}
            bg={Colors.onBackground}
            borderRadius={6}
            isLoading={isDeleting}>
            <VStack alignItems={'center'}>
              <SvgXml xml={disableUser} />
              <HelveticaRegularText
                textAlign={'center'}
                text={Strings.disableUser}
                fontSize={12}
                color={Colors.error}
                mt={2}
              />
            </VStack>
          </Button>

          <Button
            onPress={() => {
              setIsLoadingConversationId(true);
              setRecieverUserId(entityId);
            }}
            width={24}
            px={0}
            bg={Colors.onBackground}
            borderRadius={6}
            isLoading={isLoadingConversationId}>
            <VStack alignItems={'center'}>
              <SvgXml xml={chatOutline} />
              <HelveticaRegularText
                textAlign={'center'}
                text={Strings.sendMessage}
                fontSize={12}
                color={Colors.white}
                mt={2}
              />
            </VStack>
          </Button>
        </HStack>
      </View>
      <DeleteModal
        showModal={showModal}
        setShowModal={setShowModal}
        deleteOnPress={() => {
          deleteOnPress();
        }}
        title={Strings.wantToDisableUser}
      />
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
    marginBottom: 20,
    maxHeight: verticalScale(200),
  },
  menuIcon: {
    marginLeft: scale(10),
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
  reportContainer: {
    alignSelf: 'center',
    backgroundColor: Colors.onBackground,
    zIndex: 100,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Colors.warning,
    padding: 10,
    flexDirection: 'row',
    marginBottom: 20,
  },
});

interface Props {
  animationValue: Animated.SharedValue<number>;
  label: string;
  onPress?: () => void;
}

const Item: React.FC<Props> = props => {
  const {animationValue, label, onPress} = props;

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
        <Animated.Text
          style={[
            {fontSize: 16, fontFamily: 'Helvetica', color: Colors.cleanWhite},
            labelStyle,
          ]}>
          {label}
        </Animated.Text>
      </Animated.View>
    </Pressable>
  );
};
