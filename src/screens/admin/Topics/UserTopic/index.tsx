import {Divider, HStack, Box, Text} from 'native-base';
import React, {useState} from 'react';
import {scale} from 'react-native-size-matters';

import {
  BackButton,
  CustomContainer,
  ActivityStatistics,
  DeleteTopicModal,
  CustomDropdownButton,
} from '~/components';
import {Strings} from '~/assets/strings/index';
import {
  useGetUserTopicsCountById,
  useGetAllTopicsCount,
  useGetTopicsReport,
} from '~/hooks/artist/Topic';
import {AllTopicsList, CustomFilter} from '~/components';
import {navigate} from '~/navigation/methods';
import {topicFilter} from '~/constants/dropDownData';
import {customFonts} from '~/styles/fonts';
import {Colors} from '~/styles/colors';
import {windowWidth} from '~/styles/globalStyles';
import {View} from 'react-native';
import {useAuthStore} from '~/stores';

const UserTopic = () => {
  const [value, setValue] = useState('');
  const [options, setOptions] = useState({id: 0, title: ''});
  const [showAllTopic, setShowAllTopic] = useState<boolean>(true);
  const {userId} = useAuthStore(state => state);

  const topicOption = {
    where: !showAllTopic
      ? {topic: {topicUsers: {some: {userId: {eq: userId}}}}}
      : undefined,
    order:
      value === topicFilter[0].value
        ? {topic: {id: 'DESC'}}
        : value === topicFilter[1].value
        ? {usersCount: 'DESC'}
        : undefined,
  };

  const {
    isLoading: getAllTopicsLoading,
    data: getAllTopicsData,
    isSuccess: getAllTopicsSuccess,
    isError: getAllTopicsFail,
    error: getAllTopicsErrorMsg,
    fetchNextPage: fetchNextPageGetAllTopics,
    hasNextPage: hasNextPageGetAllTopics,
    refetch: refetchGetAllTopics,
  } = useGetTopicsReport(topicOption);

  const {
    isLoading: userTopicsCountLoading,
    data: userTopicsCountData,
    isSuccess: userTopicsCountSuccess,
    isError: userTopicsCountFail,
    error: userTopicsCountErrorMsg,
    refetch: refetchUserTopicsCount,
  } = useGetUserTopicsCountById();

  const {
    isLoading: allTopicsCountLoading,
    data: allTopicsCountData,
    isSuccess: allTopicsCountSuccess,
    isError: allTopicsCountFail,
    error: allTopicsCountErrorMsg,
    refetch: refetchAllTopicsCount,
  } = useGetAllTopicsCount();

  const onLoadMore = () => {
    if (hasNextPageGetAllTopics) {
      fetchNextPageGetAllTopics();
    }
  };
  const onChangeItem = (item: any) => {
    if (item != null || item != undefined) {
      setOptions(item);
      setValue(item.title);
    } else {
      setOptions({id: 0, title: ''});
      setValue('');
    }
  };

  const isLoading =
    getAllTopicsLoading || userTopicsCountLoading || allTopicsCountLoading;
  const isError = getAllTopicsFail || userTopicsCountFail || allTopicsCountFail;
  const isSuccess =
    getAllTopicsSuccess || userTopicsCountSuccess || allTopicsCountSuccess;

  return (
    <CustomContainer
      isLoading={isLoading}
      isError={isError}
      errorMsg={'Something went wrong!'}
      onPress={() => {
        refetchGetAllTopics();
        refetchUserTopicsCount();
        refetchAllTopicsCount();
      }}>
      <BackButton />

      {isSuccess ? (
        <Box flex={1}>
          <HStack justifyContent={'space-between'} mt="6" mx="6">
            <ActivityStatistics
              value={allTopicsCountData?.topic_getTopics?.result?.totalCount}
              title={Strings.allTopic}
              onPress={() => setShowAllTopic(true)}
            />
            <Divider orientation="vertical" />
            <ActivityStatistics
              value={
                userTopicsCountData?.topicUser_getByUserId?.result?.totalCount
              }
              title={Strings.yourTopic}
              onPress={() => setShowAllTopic(false)}
            />
          </HStack>

          <CustomFilter
            label="Search Topics"
            onPress={() => {
              navigate('TopicSearchScreen');
            }}
            isSearchBtn={true}
          />

          <HStack
            alignItems={'center'}
            justifyContent={'space-between'}
            ml="4"
            mr="1"
            mt="2">
            <Text
              fontFamily={customFonts.chanelRegular}
              color={Colors.txtLight}
              fontSize="md"
              mt="6">
              {'TOPICS'}
            </Text>
            <View style={{width: windowWidth * 0.4, marginTop: scale(10)}}>
              <CustomDropdownButton
                bgColor={Colors.background}
                textColor={Colors.txtMedium}
                fontSize={16}
                name="filter"
                label="filter"
                hideClose={true}
                placeholder="Select..."
                value={options}
                setValue={item => onChangeItem(item)}
                onClose={() => {
                  onChangeItem({id: 0, title: ''});
                }}
                optionsDataList={
                  topicFilter != undefined
                    ? topicFilter.map(x => ({
                        id: x.key,
                        title: x.value,
                      }))
                    : null
                }
              />
            </View>
          </HStack>

          <AllTopicsList
            topicData={getAllTopicsData?.pages}
            onLoadMore={onLoadMore}
            showAllTopic={showAllTopic}
            isUserTopic={showAllTopic ? false : true}
            isLoading={isLoading}
            isAdmin={true}
          />
          <DeleteTopicModal />
        </Box>
      ) : null}
    </CustomContainer>
  );
};

export default UserTopic;
