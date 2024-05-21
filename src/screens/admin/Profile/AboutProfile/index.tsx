import {Divider, Flex, HStack, Spinner} from 'native-base';
import React from 'react';

import {
  ActivityStatistics,
  ActivityStatisticsBox,
  CustomContainer,
  CustomKeyboardAwareScrollView,
} from '~/components';
import {Strings} from '~/assets/strings';
import {comment, heart, wireFrameEye} from '~/assets/icons';
import {navigate} from '~/navigation/methods';
import {useUserStatistics} from '~/hooks/artist/Statistics';

function AboutProfile({entityId}: {entityId: number}) {
  const {isLoading: isloadingAll, data: dataAll} = useUserStatistics(entityId);

  return (
    <CustomContainer>
      <CustomKeyboardAwareScrollView>
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
                  dataAll != undefined
                    ? dataAll?.follow_getFollowings?.result?.totalCount
                    : 0
                }
                title={Strings.followings}
                onPress={() =>
                  navigate('FollowingScreen', {entityId: entityId})
                }
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
                  dataAll != undefined
                    ? dataAll?.follow_getFollowers?.result?.totalCount
                    : 0
                }
                title={Strings.followers}
                onPress={() => navigate('FollowerScreen', {entityId: entityId})}
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
                entityId: entityId,
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
                entityId: entityId,
                totalCount:
                  dataAll != undefined
                    ? dataAll?.postLike_getPostLikes?.result?.totalCount
                    : 0,
              })
            }
          />
        </HStack>

        <HStack justifyContent={'space-between'} my="6" mx="6">
          <ActivityStatisticsBox
            value={
              dataAll != undefined
                ? dataAll?.comment_getComments?.result?.totalCount
                : 0
            }
            icon={comment}
            title={Strings.comments}
            onPress={() =>
              navigate('UserCommentedPosts', {
                entityId: entityId,
                totalCount:
                  dataAll != undefined
                    ? dataAll?.comment_getComments?.result?.totalCount
                    : 0,
              })
            }
          />
        </HStack>
      </CustomKeyboardAwareScrollView>
    </CustomContainer>
  );
}

export default AboutProfile;
