import React, {useState} from 'react';
import {StyleSheet, StatusBar} from 'react-native';

import {
  BackButton,
  CustomAvatar,
  CustomContainer,
  CustomKeyboardAwareScrollView,
  CustomLoading,
  HelveticaRegularText,
} from '~/components';
import {Colors} from '~/styles/colors';
import {scale, verticalScale} from 'react-native-size-matters';
import {View, FlatList, HStack, Button} from 'native-base';
import {useGetFollowings, useGetPostLikes} from '~/hooks/artist/Posts';
import {useCreateFollow, useDeleteFollow} from '~/hooks/artist/Follow';
import {useAuthStore} from '~/stores';
import snackBar from '~/utils/snackBar';
import {messageHelper} from '~/utils/messageHelper';

const PostLikeListScreen = ({route}: {route: any}) => {
  const entityId = route?.params?.entityId;
  const {userId} = useAuthStore(state => state);
  const [where] = useState<object | undefined>({
    postId: {eq: entityId},
    //userId: {neq: userId},
  });
  const {isLoading, data, fetchNextPage, hasNextPage, refetch, isRefetching} =
    useGetPostLikes({where});

  const {isLoading: isLoadingFollowing, data: dataFollowing} = useGetFollowings(
    {followerId: userId},
  );

  const {mutate, isLoading: isFollowing} = useCreateFollow();
  const [followId, setFollowId] = useState(0);
  const [deleteId, setDeleteId] = useState(0);
  const {mutate: unFollowUserMutate, isLoading: isUnFollowing} =
    useDeleteFollow(deleteId);

  const followUser = (followingId: number) => {
    setFollowId(followingId);
    const input = {followerId: userId, followingId: followingId};
    mutate(input as any, {
      onSuccess: successData => {
        if (successData.follow_createFollow?.status.value === 'Success') {
          //snackBar(messageHelper(successData.follow_createFollow?.status.value))
        } else {
          snackBar(
            messageHelper(successData.follow_createFollow?.status.value),
          );
        }
      },
    });
  };
  const unFollowUser = (id: number) => {
    setDeleteId(id);
    unFollowUserMutate(id, {
      onSuccess: successData => {
        if (successData.follow_deleteFollow?.value !== 'Success') {
          snackBar(messageHelper(successData.follow_deleteFollow?.value));
        }
      },
    });
  };
  function renderItem({item}: {item: any}) {
    let checkFollowing = dataFollowing?.pages.filter(
      x => x.followingId == item.user.id,
    );
    return (
      <View
        flex={1}
        justifyContent={'space-between'}
        alignItems={'center'}
        flexDirection={'row'}
        px={4}
        py={3}>
        <HStack alignItems={'center'}>
          <CustomAvatar
            uri={item.user.photoUrl}
            onPress={() => {}}
            width={scale(40)}
            height={scale(40)}
          />

          <HelveticaRegularText
            text={
              item.user?.fullName
                ? `${item.user?.fullName}`
                : item.user?.userName
            }
            fontSize={16}
            color={Colors.txtLight}
            ml={4}
          />
        </HStack>
        {item.user.id != userId && (
          <View>
            {checkFollowing?.length == 0 ? (
              <Button
                variant={'link'}
                onPress={() => {
                  followUser(item.user.id);
                }}
                background={Colors.onBackground}
                px={2}
                py={1}
                width={scale(80)}
                borderRadius={8}
                alignItems={'center'}
                height={verticalScale(36)}
                isLoading={isFollowing && followId == item.user.id}>
                <HelveticaRegularText
                  text={'+ Follow'}
                  fontSize={14}
                  color={Colors.primary}
                />
              </Button>
            ) : (
              <Button
                variant={'link'}
                onPress={() => {
                  unFollowUser(checkFollowing[0]?.id);
                }}
                background={Colors.onBackground}
                px={2}
                py={1}
                width={scale(80)}
                borderRadius={8}
                alignItems={'center'}
                height={verticalScale(36)}
                isLoading={isUnFollowing && deleteId == checkFollowing[0]?.id}>
                <HelveticaRegularText
                  text={'Following'}
                  fontSize={14}
                  color={Colors.primary}
                />
              </Button>
            )}
          </View>
        )}
      </View>
    );
  }
  if (isLoading || isLoadingFollowing) {
    return (
      <View flex={1} style={{backgroundColor: Colors.background}}>
        <CustomLoading style={{backgroundColor: Colors.background}} />
      </View>
    );
  }
  return (
    <CustomContainer style={{flex: 1}}>
      <CustomKeyboardAwareScrollView>
        <StatusBar backgroundColor={Colors.background} />
        <BackButton />
        <FlatList
          style={styles.container}
          data={data?.pages}
          refreshing={isRefetching}
          onRefresh={refetch}
          keyExtractor={(item, index) =>
            item?.id ? item?.id?.toString() : index?.toString()
          }
          renderItem={renderItem}
          scrollEnabled={false}
          onEndReachedThreshold={0.5}
          onEndReached={({distanceFromEnd}) => {
            if (distanceFromEnd < 0) return;
            if (hasNextPage) {
              fetchNextPage();
            }
          }}
        />
      </CustomKeyboardAwareScrollView>
    </CustomContainer>
  );
};

export default PostLikeListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatar: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eaeaea',
  },
});
