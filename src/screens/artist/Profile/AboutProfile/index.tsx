import {Divider, Flex, HStack, Spinner} from 'native-base';
import React, {useState} from 'react';

import {
  ActivityStatistics,
  ActivityStatisticsBox,
  CustomContainer,
} from '~/components';
import {Strings} from '~/assets/strings';
import {heart, wireFrameEye} from '~/assets/icons';
import {navigate} from '~/navigation/methods';
import {useAuthStore} from '~/stores';
import {useUserStatistics} from '~/hooks/artist/Statistics';

function AboutProfile() {
  const {userId} = useAuthStore(state => state);
  const {
    isLoading: isloadingAll,
    data: dataAll,
    refetch,
    isRefetching,
  } = useUserStatistics(userId);
  return (
    <CustomContainer>
      <HStack justifyContent={'space-between'} mt="6" mx="6">
        <Flex flex={1}>
          {isloadingAll ? (
            <Spinner />
          ) : (
            <ActivityStatistics
              value={
                dataAll != undefined
                  ? dataAll?.post_getPosts?.result?.totalCount
                  : 0
              }
              title={Strings.posts}
            />
          )}
        </Flex>
        <Divider orientation="vertical" />
        <Flex flex={1}>
          {isloadingAll ? (
            <Spinner />
          ) : (
            <ActivityStatistics
              value={
                dataAll != undefined &&
                dataAll?.follow_getFollowings?.result != null
                  ? dataAll?.follow_getFollowings?.result?.totalCount
                  : 0
              }
              title={Strings.followings}
              onPress={() => navigate('FollowingScreen', {entityId: userId})}
            />
          )}
        </Flex>
        <Divider orientation="vertical" />
        <Flex flex={1}>
          {isloadingAll ? (
            <Spinner />
          ) : (
            <ActivityStatistics
              value={
                dataAll != undefined &&
                dataAll?.follow_getFollowers?.result != null
                  ? dataAll?.follow_getFollowers?.result?.totalCount
                  : 0
              }
              title={Strings.followers}
              onPress={() => navigate('FollowerScreen', {entityId: userId})}
            />
          )}
        </Flex>
      </HStack>

      <HStack justifyContent={'space-around'} mt="10" mx="6">
        <ActivityStatisticsBox
          value={
            dataAll != undefined
              ? dataAll?.postView_getPostViews?.result?.totalCount
              : 0
          }
          icon={heart}
          title={Strings.postViews}
          onPress={() =>
            navigate('PostViewsScreen', {
              totalCount:
                dataAll != undefined
                  ? dataAll?.postView_getPostViews?.result?.totalCount
                  : 0,
            })
          }
        />

        <ActivityStatisticsBox
          value={
            dataAll != undefined
              ? dataAll?.postLike_getPostLikes?.result?.totalCount
              : 0
          }
          icon={wireFrameEye}
          title={Strings.postLikes}
          onPress={() =>
            navigate('PostLikesScreen', {
              totalCount:
                dataAll != undefined
                  ? dataAll?.postLike_getPostLikes?.result?.totalCount
                  : 0,
            })
          }
        />
      </HStack>
    </CustomContainer>
  );
}

export default AboutProfile;
