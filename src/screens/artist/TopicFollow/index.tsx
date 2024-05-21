import React, {useState, useEffect} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import {useQueryClient} from 'react-query';

import {
  CustomContainer,
  BackButton,
  AlternativeScreen,
  CustomAvatar,
  HelveticaRegularText,
} from '~/components';
import {Strings} from '~/assets/strings/index';
import {useAuthStore} from '~/stores';
import {useCreateFollow, useDeleteFollow} from '~/hooks/artist/Follow';
import snackBar from '~/utils/snackBar';
import {messageHelper} from '~/utils/messageHelper';
import {queryKeys} from '~/constants/queryKeys';
import {useGetTopicPostLikes} from '~/hooks/artist/Topic';
import {useGetFollowings} from '~/hooks/artist/Posts';
import {Button, HStack, View as NBView} from 'native-base';
import {Colors} from '~/styles/colors';

const TopicFollow = ({route}: {route: any}) => {
  const queryClient = useQueryClient();
  const {userId} = useAuthStore(state => state);
  const {isLoading: isLoadingFollowing, data: dataFollowing} = useGetFollowings(
    {followerId: userId},
  );

  const {
    isLoading: getPostLikesLoading,
    data: getPostLikesData,
    isError: getPostLikesFail,
    isSuccess: getPostLikesSuccess,
    fetchNextPage: fetchNextPageGetPostLikes,
    hasNextPage: hasNextPageGetPostLikes,
    refetch: refetchGetPostLikes,
  } = useGetTopicPostLikes({
    where: {
      topicPostId: {eq: route?.params?.postId},
      user: {isActive: {eq: true}},
    },
  });

  const onLoadMore = () => {
    if (hasNextPageGetPostLikes) {
      fetchNextPageGetPostLikes();
    }
  };

  useEffect(() => {
    return () => {
      queryClient.removeQueries(queryKeys.getAllFollowers);
    };
  }, []);

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
        if (successData.follow_deleteFollow?.value === 'Success') {
        } else {
          snackBar(messageHelper(successData.follow_deleteFollow?.value));
        }
      },
    });
  };

  function renderUserListItem({item}: {item: any}) {
    let checkFollowing = dataFollowing?.pages.filter(
      x => x.followingId == item.user.id,
    );
    return (
      <NBView
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
      </NBView>
    );
  }

  function listEmpty() {
    return <AlternativeScreen msg={Strings.emptyString} />;
  }

  return (
    <CustomContainer
      isLoading={getPostLikesLoading || isLoadingFollowing}
      isError={getPostLikesFail}
      errorMsg={'Something went wrong'}
      onPress={refetchGetPostLikes}>
      {getPostLikesSuccess ? (
        <View style={styles.container}>
          <BackButton />

          <FlatList
            contentContainerStyle={{flexGrow: 1, marginTop: scale(12)}}
            data={getPostLikesData?.pages}
            renderItem={renderUserListItem}
            showsVerticalScrollIndicator={false}
            numColumns={1}
            keyExtractor={(item: any) => JSON.stringify(item?.id)}
            horizontal={false}
            onEndReachedThreshold={0.5}
            onEndReached={({distanceFromEnd}) => {
              if (distanceFromEnd < 0) return;
              onLoadMore();
            }}
            ListEmptyComponent={!getPostLikesLoading ? listEmpty : null}
          />
        </View>
      ) : null}
    </CustomContainer>
  );
};

export default TopicFollow;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
