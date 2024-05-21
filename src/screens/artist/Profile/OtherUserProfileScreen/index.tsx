import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import {scale} from 'react-native-size-matters';
import {Colors} from '~/styles/colors';
import {
  ActivityStatistics,
  AvatarWithTitle,
  BackButton,
  CustomContainer,
  CustomKeyboardAwareScrollView,
  CustomProfileButton,
  HelveticaRegularText,
  OtherUserProfileOptionMenu,
  PostPlayVideo,
  ReportUser,
} from '~/components';
import {useGetOtherUserProfile} from '~/hooks/artist/User';
import {navigate} from '~/navigation/methods';
import {
  Divider,
  FlatList,
  HStack,
  Image,
  Spinner,
  View as NativeBaseView,
} from 'native-base';
import {Strings} from '~/assets/strings';
import {SvgXml} from 'react-native-svg';
import {getFileExtension} from '~/utils/getFileExtension';
import {formats, postFileType} from '~/@types/global';
import {width} from '~/utils/dimension';
import LinearGradient from 'react-native-linear-gradient';
import {
  useGetFollowers,
  useGetFollowings,
  useGetPosts,
} from '~/hooks/artist/Posts';
import snackBar from '~/utils/snackBar';
import {messageHelper} from '~/utils/messageHelper';
import {useCreateFollow, useDeleteFollow} from '~/hooks/artist/Follow';
import {useAuthStore, useOtherUserProfileOptionMenuStore} from '~/stores';
import MoreOptionsButton from '~/components/atoms/MoreOptionsButton';
import {post} from '~/assets/icons';
import {useGetConversationIdForUser} from '~/hooks/artist/Messages';

const OtherUserProfileScreen = ({route}: {route: any}) => {
  const entityId = route.params?.entityId;
  const [followEntityId, setFollowEntityId] = useState(0);
  const [isfollowing, setIsfollowing] = useState(false);
  const {userId} = useAuthStore(state => state);
  const {setShowModal} = useOtherUserProfileOptionMenuStore(state => state);
  const [recieverUserId, setRecieverUserId] = useState<number>();
  const [isLoadingConversationId, setIsLoadingConversationId] =
    useState<boolean>(false);

  const {
    isLoading: getProfileLoading,
    data: getProfileData,
    isSuccess: getProfileSuccess,
    isError: getProfileFail,
    error: getProfileErrorMsg,
    refetch: refetchProfile,
  } = useGetOtherUserProfile(entityId);

  const [where] = useState<object | undefined>({userId: {eq: entityId}});
  const {isRefetching, isLoading, data, fetchNextPage, hasNextPage, refetch} =
    useGetPosts({where, order: {id: 'DESC'}});

  const {isLoading: isLoadingFollowing, data: dataFollowing} = useGetFollowings(
    {followerId: entityId},
  );

  const {isLoading: isLoadingFollowers, data: dataFollowers} = useGetFollowers({
    followingId: entityId,
  });

  const lastData = data?.pages?.[0];
  useEffect(() => {
    let checkExist = dataFollowers?.pages.filter(x => x.followerId == userId);
    if (checkExist?.length > 0) {
      setIsfollowing(true);
    } else {
      setIsfollowing(false);
    }
  }, [dataFollowers]);

  const {mutate, isLoading: isFollowing} = useCreateFollow();
  const {mutate: unFollowUserMutate, isLoading: isUnFollowing} =
    useDeleteFollow(followEntityId);

  const followUser = () => {
    const input = {followerId: userId, followingId: entityId};
    mutate(input as any, {
      onSuccess: successData => {
        if (successData.follow_createFollow?.status.value === 'Success') {
          setFollowEntityId(successData.follow_createFollow?.result?.id);
          /*  snackBar(
            messageHelper(successData.follow_createFollow?.status.value),
          ); */
          setIsfollowing(true);
        } else {
          snackBar(
            messageHelper(successData.follow_createFollow?.status.value),
          );
        }
      },
    });
  };

  const unFollowUser = () => {
    let checkExist = dataFollowers?.pages.filter(x => x.followerId == userId);
    if (checkExist?.length > 0) {
      setFollowEntityId(checkExist[0].id);
      unFollowUserMutate(checkExist[0].id, {
        onSuccess: successData => {
          if (successData.follow_deleteFollow?.value === 'Success') {
            //snackBar(messageHelper(successData.follow_deleteFollow?.value));
            setIsfollowing(false);
          } else {
            snackBar(messageHelper(successData.follow_deleteFollow?.value));
          }
        },
      });
    }
  };

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

  const renderItem = ({item, index}) => {
    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity
          onPress={() => {
            navigate('PostDetail', {entityId: item.id});
          }}>
          {item?.fileType === postFileType.Image ? (
            <Image
              source={{uri: item.fileUrl}}
              alt={'image'}
              style={styles.img}
            />
          ) : item?.fileType === postFileType.Video ? (
            <PostPlayVideo uri={item?.fileUrl} width={width / 3.1} />
          ) : (
            <LinearGradient
              colors={Colors.gradientDivider}
              style={styles.itemLinearcontainer}>
              <Text style={styles.wrongFormatTxt}>
                {Strings.wrongFormatTxt}
              </Text>
            </LinearGradient>
          )}
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <CustomContainer
      isLoading={getProfileLoading}
      isError={getProfileFail}
      onPress={refetchProfile}>
      <CustomKeyboardAwareScrollView>
        <BackButton />

        <View style={{alignSelf: 'flex-end'}}>
          <MoreOptionsButton
            onPress={() => {
              setShowModal(true);
            }}
          />
        </View>

        <View style={styles.container}>
          <AvatarWithTitle
            uri={getProfileData?.user_getProfile?.result?.photoUrl}
            onPress={() => {}}
            name={
              getProfileData?.user_getProfile?.result?.fullName
                ? getProfileData?.user_getProfile?.result?.fullName
                : getProfileData?.user_getProfile?.result?.userName
            }
            width={24}
            height={24}
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
            numberOfLines={3}
            width={'100%'}
          />

          <HStack justifyContent={'space-between'} mt={6}>
            {isLoading ? (
              <Spinner />
            ) : (
              <ActivityStatistics
                value={data?.pages.length}
                title={Strings.posts}
              />
            )}
            <Divider orientation="vertical" />
            {isLoadingFollowing || isLoading ? (
              <Spinner />
            ) : (
              <ActivityStatistics
                value={dataFollowing?.pages.length}
                title={Strings.followings}
                onPress={() =>
                  navigate('FollowingScreen', {entityId: entityId})
                }
              />
            )}
            <Divider orientation="vertical" />
            {isLoadingFollowers || isUnFollowing ? (
              <Spinner />
            ) : (
              <ActivityStatistics
                value={dataFollowers?.pages.length}
                title={Strings.followers}
                onPress={() => navigate('FollowerScreen', {entityId: entityId})}
              />
            )}
          </HStack>

          <HStack justifyContent={'space-between'}>
            <CustomProfileButton
              title={Strings.sendMessage}
              titleColor={Colors.txtDark}
              backColor={Colors.primary}
              btnMTop={scale(25)}
              btnMBottom={scale(10)}
              isLoading={isLoadingConversationId}
              onPress={() => {
                setIsLoadingConversationId(true);
                setRecieverUserId(entityId);
              }}
              containerStyle={{flex: 1, marginRight: 5}}
            />

            {/*   {!isLoadingFollowers && dataFollowers?.pages.filter(x=>x.) ? : } */}
            {!isfollowing ? (
              <CustomProfileButton
                title={Strings.plusfollow}
                titleColor={Colors.txtDark}
                backColor={Colors.primary}
                btnMTop={scale(25)}
                btnMBottom={scale(10)}
                onPress={() => {
                  followUser();
                }}
                containerStyle={{flex: 1, marginLeft: 5}}
                isLoading={isFollowing || isLoadingFollowers}
              />
            ) : (
              <CustomProfileButton
                title={Strings.unfollow}
                titleColor={Colors.txtDark}
                backColor={Colors.primary}
                btnMTop={scale(25)}
                btnMBottom={scale(10)}
                onPress={() => {
                  unFollowUser();
                }}
                containerStyle={{flex: 1, marginLeft: 5}}
                isLoading={isUnFollowing || isLoadingFollowers}
              />
            )}
            {/*       <AlternativeScreen icon="post" msg="No post yet." /> */}
          </HStack>
        </View>

        {lastData && (
          <FlatList
            keyExtractor={(item, index) =>
              item?.id ? item?.id?.toString() : index.toString()
            }
            onEndReachedThreshold={0.9}
            onEndReached={() => {
              if (hasNextPage) {
                fetchNextPage();
              }
            }}
            bounces={false}
            onRefresh={refetch}
            refreshing={isRefetching}
            showsVerticalScrollIndicator={false}
            data={data?.pages}
            numColumns={3}
            style={{width: '100%', marginTop: 20}}
            contentContainerStyle={{
              justifyContent: 'center',
              alignSelf: 'flex-start',
            }}
            renderItem={renderItem}
          />
        )}

        {!lastData && !isLoading && (
          <NativeBaseView
            justifyContent={'center'}
            alignItems={'center'}
            flex={1}
            pt={20}>
            <SvgXml width="42" height="42" xml={post} />
            <HelveticaRegularText
              text={'No post yet. Try send your first post.'}
              fontSize={16}
              color={Colors.cleanWhite}
              mt={6}
              textAlign={'center'}
            />
          </NativeBaseView>
        )}
      </CustomKeyboardAwareScrollView>

      <ReportUser entityId={entityId} />

      <OtherUserProfileOptionMenu entityId={entityId} />
    </CustomContainer>
  );
};

export default OtherUserProfileScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    paddingHorizontal: scale(20),
  },
  title: {
    fontSize: 24,
    marginVertical: 16,
  },
  itemContainer: {
    margin: 1,
    width: width / 3.1,
    height: width / 3.1,
  },
  img: {
    width: width / 3.1,
    height: width / 3.1,
  },
  itemLinearcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: width / 3.1,
    height: width / 3.1,
  },
  wrongFormatTxt: {
    color: Colors.white,
    textAlign: 'center',
  },
});
