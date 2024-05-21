import React, {useEffect, useState} from 'react';
import {StyleSheet, FlatList, View} from 'react-native';
import {Text, Divider, HStack} from 'native-base';
import {scale} from 'react-native-size-matters';

import {Colors} from '~/styles/colors';
import {
  ActivityStatistics,
  CustomContainer,
  PostStatisticsListItem,
} from '~/components';
import {Fonts} from '~/styles/fonts';
import {BackButton} from '~/components';
import {Strings} from '~/assets/strings';
import {getLastMonthDate, getTodayDate} from '~/utils/getDatePeriod';
import {
  useGetLikeGrowthMonthly,
  useGetPostForStatistics,
  useGetThisMonthLikes,
} from '~/hooks/artist/Statistics';
import {heart} from '~/assets/icons';
import {calculateGrowthRate} from '~/utils/calculateGrowthRate';

const PostLikes = ({route}: {route: any}) => {
  const totalCount = route?.params?.totalCount;
  const entityId = route?.params?.entityId;

  let date = new Date();
  const startDate1 =
    date.getFullYear() +
    '-' +
    (date.getMonth() + 1 > 10
      ? date.getMonth() + 1
      : '0' + (date.getMonth() + 1)) +
    '-01';
  // const endDate1 = date.getFullYear() + '-' + (date.getMonth() + 1) + '-30';
  const startDate2 =
    date.getFullYear() +
    '-' +
    (date.getMonth() + 1 > 10 ? date.getMonth() : '0' + date.getMonth()) +
    '-01';
  +'-01';
  const endDate2 =
    date.getFullYear() +
    '-' +
    (date.getMonth() + 1 > 10 ? date.getMonth() : '0' + date.getMonth()) +
    '-30';

  const [num1, setNum1] = useState(null);
  const [num2, setNum2] = useState(null);
  const [growthRate, setGrowthRate] = useState(0);
  const [percentageNumber, setPercentageNumber] = useState(0);
  const {
    isLoading: getPostLoading,
    data: getPostData,
    isSuccess: getPostSuccess,
    isError: getPostFail,
    //error: getAllTopicErrorMsg,
    refetch: refetchGetPost,
  } = useGetPostForStatistics({
    skip: 0,
    take: 5,
    where: {createdDate: {gte: getLastMonthDate()}},
    order: [{postLikeCount: 'DESC'}],
    userId: entityId,
  });

  const {isLoading: getThisMonthLikesLoading, data: getThisMonthLikesData} =
    useGetThisMonthLikes({
      and: [{createdDate: {gte: startDate1}}, {post: {userId: {eq: entityId}}}],
    });

  const {isLoading: getLastMonthLikesLoading, data: getLastMonthLikesData} =
    useGetThisMonthLikes({
      and: [
        {createdDate: {lte: endDate2}},
        {createdDate: {gte: startDate2}},
        {post: {userId: {eq: entityId}}},
      ],
    });

  const {data} = useGetLikeGrowthMonthly({
    userId: entityId,
    options: {
      onSuccess: data => {
        let result = calculateGrowthRate(data);
        setGrowthRate(result);
      },
    },
  });

  function renderStatisticsListItem({item}: {item: any}) {
    return (
      <PostStatisticsListItem
        fileUrl={item?.fileUrl}
        progressPercent={
          (item?.postLikeCount /
            getPostData?.post_getByUserId?.result?.items[0]?.postLikeCount) *
          100
        }
        progressValue={item?.postLikeCount}
        icon={heart}
        fileType={item?.fileType}
        progressSubject={'Likes'}
      />
    );
  }

  useEffect(() => {
    if (getThisMonthLikesData != undefined) {
      setNum1(getThisMonthLikesData?.postLike_getPostLikes?.result?.totalCount);
    }
  }, [getThisMonthLikesData]);

  useEffect(() => {
    if (getLastMonthLikesData != undefined) {
      setNum2(getLastMonthLikesData?.postLike_getPostLikes?.result?.totalCount);
    }
  }, [getLastMonthLikesData]);

  useEffect(() => {
    if (num1 != null && num2 != null) {
      let diff = num1 - num2;
      let value = (diff / num2) * 100;
      if (isNaN(value) == false && value != Infinity) {
        if (value < 0) {
          value = -value;
        }
        setPercentageNumber(value.toFixed(0));
      }
    }
  }, [num1, num2]);

  return (
    <CustomContainer
      isLoading={getPostLoading}
      isError={getPostFail}
      onPress={refetchGetPost}>
      {getPostSuccess && (
        <View style={{flex: 1}}>
          <BackButton />

          <HStack mt={12}>
            <ActivityStatistics
              title={Strings.monthLike}
              value={num1}
              desc={
                percentageNumber >= 0
                  ? percentageNumber + '% Better than past month'
                  : percentageNumber + '% had dropped'
              }
            />
            <Divider orientation="vertical" />
            <ActivityStatistics
              title={Strings.totalLikes}
              value={totalCount}
              desc={growthRate + '% Average growth rate'}
            />
          </HStack>

          <Text style={styles.titleTxt}>{Strings.userMostLiked}</Text>

          <FlatList
            data={getPostData?.post_getByUserId?.result?.items}
            renderItem={renderStatisticsListItem}
            showsVerticalScrollIndicator={false}
            numColumns={1}
            keyExtractor={(item: any) => JSON.stringify(item.id)}
            horizontal={false}
          />
        </View>
      )}
    </CustomContainer>
  );
};

export default PostLikes;

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
  },
  titleTxt: {
    color: Colors.txtSemiLight,
    ...Fonts.smallReg,
    textAlign: 'left',
    marginVertical: scale(32),
    marginLeft: scale(16),
  },
});
