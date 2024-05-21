import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';

import {
  ActivityListItem,
  AlternativeScreen,
  BackButton,
  CustomBarChart,
  CustomContainer,
  CustomDateAutocompleteDropdown,
  DownloadDataButton,
  DropDown,
  HelveticaRegularText,
} from '~/components';
import {Strings} from '~/assets/strings';
import {FlatList, HStack, View, VStack} from 'native-base';
import {Colors} from '~/styles/colors';
import {scale} from 'react-native-size-matters';
import {width} from '~/utils/dimension';
import {reportFilter} from '~/constants/dropDownData';
import {useGetMostActiveUsers} from '~/hooks/admin/Activities';
import {Formiz} from '@formiz/core';
import {
  useGetJoinedUsersMonthly,
  useGetJoinedUsersYearly,
} from '~/hooks/artist/Statistics';
import {windowWidth} from '~/styles/globalStyles';
import {
  getLastMonthDate,
  getLastWeekDate,
  getTodayDate,
} from '~/utils/getDatePeriod';
import {navigate} from '~/navigation/methods';
import {useAuthStore} from '~/stores';

const UsersScreen = ({route}: {route: any}) => {
  const {userId} = useAuthStore(state => state);
  const totalUsers = route.params?.totalUsers;
  const [tempData, setTempData] = useState(null);
  const [tempLabel, setTempLabel] = useState(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('Monthly');
  const [reportData, setReportData] = useState(null);

  const [, setPageSize] = useState({id: 50, title: '50'});
  const [, setType] = useState({id: 1, title: 'Posts'});
  const [, setPastTime] = useState({id: 1, title: 'Last Week'});

  const [pageSizeId, setPageSizeId] = useState(50);
  const [pastTimeId, setPastTimeId] = useState(1);
  const [typeId, setTypeId] = useState(1);

  const [whereFilter, setWhereFilter] = useState<object | undefined>({
    sharePostCount: {gt: 0},
  });
  const [order, setOrder] = useState<object | undefined>({
    sharePostCount: 'DESC',
  });

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
  const currentYear = getTodayDate().split('-')[0];

  const {data, isLoading, hasNextPage, fetchNextPage} =
    useGetJoinedUsersMonthly({
      where: {year: {eq: parseInt(currentYear)}},
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
  } = useGetJoinedUsersYearly({
    options: {
      onSuccess: data => {
        setReportData(data?.pages);
      },
    },
    enabled: value == 'Yearly' ? true : false,
  });

  const {
    isLoading: getActivitiesLoading,
    data: getActivitiesData,
    isSuccess: getActivitiesSuccess,
    isError: getActivitiesFail,
    fetchNextPage: fetchNextPageGetActivities,
    hasNextPage: hasNextPageGetActivities,
    refetch: refetchGetActivities,
  } = useGetMostActiveUsers({
    where: whereFilter,
    order: order,
    fromDate: pastTimeId == 1 ? getLastWeekDate() : getLastMonthDate(),
    toDate: getTodayDate(),
    pageSize: pageSizeId,
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

  function onPageSizeSelected(value: any) {
    if (value != null || value != undefined) {
      setPageSize(value);
      setPageSizeId(value.id);
    }
  }

  function onTypeSelected(value: any) {
    if (value != null || value != undefined) {
      setType(value);
      setTypeId(value.id);
    }
  }

  function onPastTimeSelected(value: any) {
    if (value != null || value != undefined) {
      setPastTime(value);
      setPastTimeId(value.id);
    }
  }

  const onLoadMore = () => {
    if (hasNextPageGetActivities) {
      fetchNextPageGetActivities();
    }
  };

  useEffect(() => {
    switch (typeId) {
      case 1:
        setWhereFilter({
          sharePostCount: {gt: 0},
        });
        setOrder({
          sharePostCount: 'DESC',
        });
        break;
      case 2:
        setWhereFilter({
          likeCount: {gt: 0},
        });
        setOrder({
          likeCount: 'DESC',
        });
        break;
      case 3:
        setWhereFilter({
          commentCount: {gt: 0},
        });
        setOrder({
          commentCount: 'DESC',
        });
        break;
    }
  }, [typeId]);

  function renderActivityListItem({item}: {item: object}) {
    var msg = '';
    var selectedTab = typeId - 1;
    switch (selectedTab) {
      case 0:
        msg = `Shared ${item?.sharePostCount?.toString()}` + ' post';
        if (item?.sharePostCount > 1) {
          msg = msg + 's';
        }
        break;
      case 1:
        msg = `Liked ${item?.likeCount?.toString()}` + ' post';
        if (item?.likeCount > 1) {
          msg = msg + 's';
        }
        break;
      case 2:
        msg = `Commented on ${item?.commentCount?.toString()}` + ' post';
        if (item?.commentCount > 1) {
          msg = msg + 's';
        }
        break;
      default:
        msg = 'Joined to Vincho ';
    }

    return (
      <ActivityListItem
        img={item?.user?.photoUrl}
        name={item?.user?.userName}
        msg={msg}
        imgOnPress={() => {
          item?.user?.id != userId
            ? navigate('UserProfile', {entityId: item?.user?.id})
            : navigate('Profile');
        }}
        date=""
      />
    );
  }

  function listEmpty() {
    return <AlternativeScreen msg={Strings.emptyString} />;
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
                text={totalUsers}
              />

              <HelveticaRegularText
                color={Colors.white}
                fontSize={10}
                text={Strings.totalUsers}
              />
            </VStack>
          </View>
          <DownloadDataButton data={getActivitiesData} />

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
                    text="Joined Users"
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
          </View>

          <View mt={10} pt={4} background={Colors.onBackground}>
            <HelveticaRegularText
              text="Most Active Users"
              fontSize={16}
              px={3}
              color={Colors.white}
            />
            <HStack justifyContent={'space-between'} mt={4}>
              <View flex={4}>
                <CustomDateAutocompleteDropdown
                  name="pageSize"
                  dir={'up'}
                  zIndex={99}
                  label=""
                  onSelectItem={item => {
                    onPageSizeSelected(item);
                  }}
                  defaultValue={{id: 50, title: '50'}}
                  dataSet={[
                    {id: 50, title: '50'},
                    {id: 30, title: '30'},
                    {id: 10, title: '10'},
                  ]}
                />
              </View>

              <View flex={4.5}>
                <CustomDateAutocompleteDropdown
                  name="type"
                  dir={'up'}
                  zIndex={98}
                  label=""
                  onSelectItem={item => {
                    onTypeSelected(item);
                  }}
                  defaultValue={{id: 1, title: 'Posts'}}
                  dataSet={[
                    {id: 1, title: 'Posts'},
                    {id: 2, title: 'Likes'},
                    {id: 3, title: 'Comments'},
                  ]}
                />
              </View>

              <View flex={3.4}>
                <CustomDateAutocompleteDropdown
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
          </View>

          {/*           <ActivityTab
            activityData={getActivitiesData?.pages}
            selectedTab={typeId - 1}
            onLoadMore={onLoadMore}
            isLoading={getActivitiesLoading}
            isError={getActivitiesFail}
            bgColor={Colors.onBackground}
          /> */}

          <FlatList
            contentContainerStyle={{marginTop: scale(12)}}
            data={getActivitiesData?.pages}
            renderItem={renderActivityListItem}
            showsVerticalScrollIndicator={false}
            numColumns={1}
            keyExtractor={(item: any) => JSON.stringify(item?.id)}
            horizontal={false}
            onEndReachedThreshold={0.9}
            onEndReached={({distanceFromEnd}) => {
              onLoadMore();
            }}
            ListEmptyComponent={
              !getActivitiesLoading && !getActivitiesFail ? listEmpty : null
            }
          />
        </Formiz>
      </ScrollView>
    </CustomContainer>
  );
};

export default UsersScreen;
