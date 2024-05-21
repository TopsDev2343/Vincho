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
import {getLastMonthDate} from '~/utils/getDatePeriod';
import {
  useGetPostForStatistics,
  useGetThisMonthViews,
  useGetViewGrowthMonthly,
} from '~/hooks/artist/Statistics';
import {openEye} from '~/assets/icons';
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
  const [percentageNumber, setPercentageNumber] = useState(0);
  const [growthRate, setGrowthRate] = useState(0);

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
    order: [{viewCount: 'DESC'}],
    userId: entityId,
  });

  const {isLoading: getThisMonthViewsLoading, data: getThisMonthViewsData} =
    useGetThisMonthViews({
      and: [
        // {createdDate: {lte: endDate1}},
        {createdDate: {gte: startDate1}},
        {post: {userId: {eq: entityId}}},
      ],
    });

  const {isLoading: getLastMonthViewsLoading, data: getLastMonthViewsData} =
    useGetThisMonthViews({
      and: [
        {createdDate: {lte: endDate2}},
        {createdDate: {gte: startDate2}},
        {post: {userId: {eq: entityId}}},
      ],
    });

  const {data} = useGetViewGrowthMonthly({
    userId: entityId,
    options: {
      onSuccess: data => {
        let result = calculateGrowthRate(data);

        setGrowthRate(result);
      },
    },
  });

  useEffect(() => {
    if (getThisMonthViewsData != undefined) {
      setNum1(getThisMonthViewsData?.postView_getPostViews?.result?.totalCount);
    }
  }, [getThisMonthViewsData]);

  useEffect(() => {
    if (getLastMonthViewsData != undefined) {
      setNum2(getLastMonthViewsData?.postView_getPostViews?.result?.totalCount);
    }
  }, [getLastMonthViewsData]);

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

  function renderStatisticsListItem({item}: {item: any}) {
    return (
      <PostStatisticsListItem
        fileUrl={item?.fileUrl}
        progressValue={item?.viewCount}
        progressPercent={
          (item?.viewCount /
            getPostData?.post_getByUserId?.result?.items[0]?.viewCount) *
          100
        }
        icon={openEye}
        fileType={item?.fileType}
        progressSubject={'Views'}
      />
    );
  }

  return (
    <CustomContainer
      isLoading={getPostLoading}
      isError={getPostFail}
      onPress={refetchGetPost}
      errorMsg={'Something went wrong!'}>
      {getPostSuccess && (
        <View style={{flex: 1}}>
          <BackButton />

          <HStack mt={12}>
            <ActivityStatistics
              title={Strings.monthView}
              value={num1}
              desc={
                percentageNumber >= 0
                  ? percentageNumber + '% Better than past month'
                  : percentageNumber + '% had dropped'
              }
            />
            <Divider orientation="vertical" />
            <ActivityStatistics
              title={Strings.totalViews}
              value={totalCount}
              desc={growthRate + '% Average growth rate'}
            />
          </HStack>

          <Text style={styles.titleTxt}>{Strings.userMostViewed}</Text>

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
