import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';

import {
  BackButton,
  CustomBarChart,
  CustomContainer,
  CustomDateAutocompleteDropdown,
  CustomPieChart,
  DownloadDataButton,
  DropDown,
  HelveticaRegularText,
} from '~/components';
import {Strings} from '~/assets/strings';
import {HStack, View, VStack} from 'native-base';
import {Colors} from '~/styles/colors';
import {scale, verticalScale} from 'react-native-size-matters';
import {width} from '~/utils/dimension';
import {reportFilter} from '~/constants/dropDownData';
import {Formiz} from '@formiz/core';
import {useGetPosts} from '~/hooks/artist/Posts';
import {FileType} from '~/generated/graphql';
import {
  useGetAllCategories,
  useGetPostsByCategoryAndFileType,
} from '~/hooks/artist/Categories';
import {
  getLastMonthDate,
  getLastWeekDate,
  getTodayDate,
  getTomorrowDayDate,
} from '~/utils/getDatePeriod';
import {useGetPostsMonthly, useGetPostsYearly} from '~/hooks/artist/Statistics';
import {windowWidth} from '~/styles/globalStyles';

const VideosScreen = ({route}: {route: any}) => {
  const totalVideos = route.params?.totalVideos;
  const [tempData, setTempData] = useState(null);
  const [tempLabel, setTempLabel] = useState(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('Monthly');
  const [reportData, setReportData] = useState(null);
  const [tempPieData, setTempPieData] = useState(null);

  const [, setPastTime] = useState({id: 1, title: 'Last Week'});
  const [pastTimeId, setPastTimeId] = useState(1);
  const [whereFilter, setWhereFilter] = useState<object | undefined>({});
  const dataMonth = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const randomColor = () =>
    ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(
      0,
      7,
    );
  const currentYear = getTodayDate().split('-')[0];

  const {data, isLoading, hasNextPage, fetchNextPage} = useGetPostsMonthly({
    where: {year: {eq: parseInt(currentYear)}},
    fileType: FileType.Video,
    options: {
      onSuccess: data => {
        setReportData(data?.pages);
      },
    },
    enabled: value == 'Monthly' ? true : false,
  });

  const {
    data: dataYearly,
    isLoading: isLoadingYearly,
    hasNextPage: hasNextPageYearly,
    fetchNextPage: fetchNextPageYearly,
  } = useGetPostsYearly({
    fileType: FileType.Video,
    options: {
      onSuccess: data => {
        setReportData(data?.pages);
      },
    },
    enabled: value == 'Yearly' ? true : false,
  });

  const {data: getCategoriesData} = useGetPostsByCategoryAndFileType({
    fromDate: pastTimeId == 1 ? getLastWeekDate() : getLastMonthDate(),
    toDate: getTomorrowDayDate(),
    fileType: FileType.Video,
    options: {
      onSuccess: data => {
        let dataList = [];
        if (data != null) {
          data?.pages.forEach(element => {
            if (element != undefined && element != null) {
              dataList.push({
                key: element.categoryId,
                value: element.count != null ? element.count : 0,
                color: randomColor(),
                title: element.categoryTitle,
              });
            }
          });
        }
        setTempPieData(dataList);
      },
    },
  });

  useEffect(() => {
    if (hasNextPage) {
      fetchNextPage();
    }
  }, [data]);

  useEffect(() => {
    if (hasNextPageYearly) {
      fetchNextPageYearly();
    }
  }, [dataYearly]);

  useEffect(() => {
    if (value != '' && reportData != null) {
      setChartData();
    }
  }, [value, reportData, isLoading]);

  const setChartData = () => {
    let data = [];
    let lables = [];
    setTempData(null);
    setTempLabel(null);

    if (value == 'Monthly') {
      reportData.forEach(element => {
        data.push(element.count);
        lables.push(dataMonth[element.month - 1]);
      });
    } else if (value == 'Yearly') {
      reportData.forEach(element => {
        data.push(element.count);
        lables.push(element.year);
      });
    }
    setTempData(data);
    setTempLabel(lables);
  };

  function setDropDownValue(dropDownValue: string) {
    setValue(dropDownValue);
  }

  function onPastTimeSelected(value: any) {
    if (value != null || value != undefined) {
      setPastTime(value);
      setPastTimeId(value.id);
    }
  }

  return (
    <CustomContainer isLoading={isLoading || isLoadingYearly}>
      <BackButton />
      <ScrollView>
        <Formiz onValidSubmit={() => {}} connect={() => {}}>
          <View
            my={3}
            height={20}
            bg={Colors.onBackground}
            borderRadius={16}
            mx={4}>
            <VStack
              ml={4}
              flex={1}
              justifyContent={'center'}
              alignItems={'center'}>
              <HelveticaRegularText
                color={Colors.white}
                fontSize={16}
                text={totalVideos}
              />

              <HelveticaRegularText
                color={Colors.white}
                fontSize={10}
                text={Strings.totalVideos}
              />
            </VStack>
          </View>

          <DownloadDataButton data={getCategoriesData} />

          <View>
            {tempData != null && (
              <View px={5} justifyContent={'center'} alignItems={'center'}>
                <HStack
                  mb={10}
                  zIndex={99}
                  justifyContent={'space-between'}
                  alignItems={'center'}
                  width={width - 35}
                  ml={2.5}>
                  <HelveticaRegularText
                    mt={10}
                    text="Number of Videos"
                    fontSize={16}
                    color={Colors.white}
                  />
                  <DropDown
                    open={open}
                    value={value}
                    setValue={setDropDownValue}
                    setOpen={setOpen}
                    dropDownOptions={reportFilter}
                    width={windowWidth * 0.3}
                    marginT={scale(3)}
                    placeHolder={'Select...'}
                  />
                </HStack>
                <View width={width - 35} ml={2.5}>
                  <CustomBarChart data={tempData} labels={tempLabel} />
                </View>
              </View>
            )}
            <View mt={10}>
              <View px={5} justifyContent={'center'} alignItems={'center'}>
                <HStack
                  my={10}
                  zIndex={99}
                  justifyContent={'space-between'}
                  alignItems={'center'}
                  width={width - 35}
                  ml={2.5}>
                  <HelveticaRegularText
                    text="Share of each video's category"
                    fontSize={14}
                    color={Colors.white}
                  />
                  <View>
                    <CustomDateAutocompleteDropdown
                      bgColor={Colors.background}
                      mb={0}
                      name="pastTime"
                      dir={'up'}
                      zIndex={98}
                      label=""
                      onSelectItem={item => {
                        onPastTimeSelected(item);
                      }}
                      defaultValue={{id: 1, title: 'Last Week'}}
                      dataSet={[
                        {id: 1, title: 'Last Week'},
                        {id: 2, title: 'Last Month'},
                      ]}
                    />
                  </View>
                </HStack>
                {tempPieData && <CustomPieChart data={tempPieData} />}
              </View>
            </View>
          </View>
        </Formiz>
      </ScrollView>
    </CustomContainer>
  );
};

export default VideosScreen;
