import React, {useEffect} from 'react';
import {useQueryClient} from 'react-query';
import {View} from 'react-native';
import {CustomContainer, TopicPostsList, CustomButton} from '~/components';
import {BackButton} from '~/components';
import {useCreateTopicUser, useGetTopicPosts} from '~/hooks/artist/Topic';
import {navigate} from '~/navigation/methods';
import {Strings} from '~/assets/strings';
import {Colors} from '~/styles/colors';
import {useAuthStore} from '~/stores';
import {queryKeys} from '~/constants/queryKeys';
import {useFocusEffect} from '@react-navigation/native';

const TopicPosts = ({route}: {route: any}) => {
  const {userId} = useAuthStore(state => state);
  const {
    isLoading: createTopicUserLoading,
    mutate: mutateCreateTopicUser,
    isSuccess: createTopicUserSuccess,
  } = useCreateTopicUser();
  const queryClient = useQueryClient();

  const JoinTopic = async () => {
    const input = {topicId: route?.params?.topicId, userId: userId};
    mutateCreateTopicUser(input, {
      onSuccess: successData => {
        queryClient.invalidateQueries(queryKeys.getTopicsByUserId);
        queryClient.invalidateQueries(queryKeys.getTopicsCountByUserId);
        queryClient.invalidateQueries(queryKeys.getAllTopics);
        /*   snackBar(
          messageHelper(successData?.topicUser_createTopicUser?.status?.value),
        ); */
      },
    });
  };

  const {
    isLoading: getTopicPostsLoading,
    data: getTopicPostsData,
    isSuccess: getTopicPostsSuccess,
    isError: getTopicPostsFail,
    //  error: getTopicPostsErrorMsg,
    fetchNextPage: fetchNextPageGetTopicPosts,
    hasNextPage: hasNextPageGetTopicPosts,
    refetch: refetchGetTopicPosts,
    isRefetching: refetchingTopicPosts,
  } = useGetTopicPosts(route?.params?.topicId);

  const onLoadMore = () => {
    if (hasNextPageGetTopicPosts) {
      fetchNextPageGetTopicPosts();
    }
  };

  useEffect(() => {
    return () => {
      queryClient.removeQueries(queryKeys.getTopicPosts);
    };
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      refetchGetTopicPosts();
    }, []),
  );

  return (
    <CustomContainer
      isLoading={getTopicPostsLoading}
      isError={getTopicPostsFail}
      errorMsg={'Something went wrong!'}
      onPress={refetchGetTopicPosts}>
      <BackButton />

      {getTopicPostsSuccess && (
        <View style={{flex: 1}}>
          <TopicPostsList
            onLoadMore={onLoadMore}
            data={getTopicPostsData?.pages}
            isLoading={getTopicPostsLoading}
            refetch={refetchGetTopicPosts}
            isRefetching={refetchingTopicPosts}
          />
          <CustomButton
            title={
              createTopicUserSuccess || route?.params?.isUserTopic
                ? Strings.addTopicPost
                : Strings.joinTopic
            }
            titleColor={Colors.onPrimary}
            backColor={Colors.primary}
            btnMBottom={10}
            btnMTop={2}
            isLoading={createTopicUserLoading}
            onPress={
              createTopicUserSuccess || route?.params?.isUserTopic
                ? () =>
                    navigate('AddTopicPostScreen', {
                      topicId: route?.params?.topicId,
                    })
                : JoinTopic
            }
          />
        </View>
      )}
    </CustomContainer>
  );
};

export default TopicPosts;
