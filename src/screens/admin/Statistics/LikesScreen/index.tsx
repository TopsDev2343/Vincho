import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

import {
  AlternativeScreen,
  BackButton,
  CustomBarChart,
  CustomContainer,
  CustomDateAutocompleteDropdown,
  CustomDropdownButton,
  CustomImage,
  DownloadDataButton,
  DropDown,
  HelveticaRegularText,
  PostPlayVideo,
} from '~/components';
import {Strings} from '~/assets/strings';
import {FlatList, HStack, View, VStack} from 'native-base';
import {Colors} from '~/styles/colors';
import {scale, verticalScale} from 'react-native-size-matters';
import {width} from '~/utils/dimension';
import {reportFilter} from '~/constants/dropDownData';
import {Formiz} from '@formiz/core';
import {useGetPosts} from '~/hooks/artist/Posts';
import dayjs from 'dayjs';
import {failAvatar} from '~/assets/images';
import {Fonts} from '~/styles/fonts';
import {FileType} from '~/generated/graphql';
import {useGetCategories} from '~/hooks/artist/Categories';
import {
  getLastMonthDate,
  getLastWeekDate,
  getTodayDate,
} from '~/utils/getDatePeriod';
import {
  useGetPostLikesMonthly,
  useGetPostLikesYearly,
} from '~/hooks/artist/Statistics';
import {navigate} from '~/navigation/methods';
import {windowWidth} from '~/styles/globalStyles';

const LikesScreen = ({route}: {route: any}) => {
  const totalLikes = route.params?.totalLikes;
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
  const [categoryId, setCategoryId] = useState(0);
  const [typeId, setTypeId] = useState(1);
  const [options, setOptions] = useState({id: 0, title: ''});
  const [categoryDataList, setCategoryDataList] = useState([]);

  const [whereFilter, setWhereFilter] = useState<object | undefined>({
    postLikeCount: {neq: null},
  });

  const currentYear = getTodayDate().split('-')[0];

  const {data, isLoading, hasNextPage, fetchNextPage} = useGetPostLikesMonthly({
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
  } = useGetPostLikesYearly({
    options: {
      onSuccess: data => {
        setReportData(data?.pages);
      },
    },
    enabled: value == 'Yearly' ? true : false,
  });

  const {
    isLoading: getPostsLoading,
    data: getPostsData,
    isError: getPostsFail,
    fetchNextPage: fetchNextPageGetPosts,
    hasNextPage: hasNextPageGetPosts,
  } = useGetPosts({
    where: whereFilter,
    order: {postLikeCount: 'DESC'},
    pageSize: pageSizeId,
  });

  const {
    isLoading: categoryIsLoading,
    data: categoryData,
    fetchNextPage: fetchNextPageCategory,
    hasNextPage: hasNextPageCategory,
    refetch: refetchCategory,
    isRefetching: isRefetchingCategory,
  } = useGetCategories(
    {
      onSuccess: data => {
        let list = data?.pages.map(x => ({
          id: x.id,
          title: x.title,
        }));
        setCategoryDataList(list);
      },
    },
    null,
  );

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
    if (hasNextPageGetPosts) {
      fetchNextPageGetPosts();
    }
  };

  function renderListItem({item}: {item: object}) {
    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity
          onPress={() => {
            navigate('PostDetail', {entityId: item?.id});
          }}
          style={styles.imgContainer}>
          {item?.fileType == FileType.Image ? (
            item?.fileUrl ? (
              <CustomImage
                imageSource={item?.fileUrl}
                style={styles.itemImg}
                resizeMode="cover"
              />
            ) : (
              <CustomImage
                imageSource={failAvatar}
                style={styles.itemImg}
                resizeMode="cover"
              />
            )
          ) : (
            <View style={styles.itemImg}>
              <PostPlayVideo uri={item?.fileUrl} width={scale(48)} />
            </View>
          )}
          <View style={{marginLeft: scale(16), flex: 8}}>
            <Text style={styles.itemTxt}>{item.postLikeCount + ' Likes'} </Text>
            <Text style={styles.timeTxt} numberOfLines={1}>
              {'Posted by @' + item.user?.userName + ' at '}{' '}
              {dayjs(item?.createdDate).format('DD/MM/YYYY') +
                '   ' +
                dayjs(item?.createdDate).format('HH:MM')}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  function listEmpty() {
    return <AlternativeScreen msg={Strings.emptyString} />;
  }

  const onChangeItem = (item: any) => {
    setOptions(item);
    if (item != null || item != undefined) {
      if (item.id > 0) {
        setCategoryId(item.id);
      } else {
        setCategoryId(0);
      }
    } else {
      setCategoryId(0);
    }
  };

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

  useEffect(() => {
    if (typeId == 1) {
      setWhereFilter(prev => ({...prev, fileType: {eq: FileType.Image}}));
    } else if (typeId == 2) {
      setWhereFilter(prev => ({...prev, fileType: {eq: FileType.Video}}));
    }
  }, [typeId]);

  useEffect(() => {
    if (categoryId > 0) {
      setWhereFilter(prev => ({
        ...prev,
        postCategories: {all: {categoryId: {eq: categoryId}}},
      }));
    } else {
      setWhereFilter(prev => ({
        ...prev,
        postCategories: {all: {categoryId: {neq: categoryId}}},
      }));
    }
  }, [categoryId]);

  useEffect(() => {
    setWhereFilter(prev => ({
      ...prev,
      postLikes: {
        some: {
          createdDate: {
            gte: pastTimeId === 1 ? getLastWeekDate() : getLastMonthDate(),
          },
        },
      },
    }));
  }, [pastTimeId]);

  return (
    <CustomContainer
      isLoading={isLoading || getPostsLoading || isLoadingYearly}>
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
                text={totalLikes}
              />

              <HelveticaRegularText
                color={Colors.white}
                fontSize={10}
                text={Strings.totalLikes}
              />
            </VStack>
          </View>

          <DownloadDataButton data={getPostsData} />

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
                    text="Number of Likes"
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
              text="Most Liked Posts"
              fontSize={16}
              px={3}
              color={Colors.white}
            />
            <HStack justifyContent={'space-between'} mt={4}>
              <View flex={1.6}>
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

              <View flex={2}>
                <CustomDateAutocompleteDropdown
                  name="type"
                  dir={'up'}
                  zIndex={98}
                  label=""
                  onSelectItem={item => {
                    onTypeSelected(item);
                  }}
                  defaultValue={{id: 1, title: 'Photo'}}
                  dataSet={[
                    {id: 1, title: 'Photo'},
                    {id: 2, title: 'Video'},
                  ]}
                />
              </View>

              <View flex={3.5} justifyContent={'flex-start'} mb={scale(10)}>
                {categoryData?.pages != undefined && (
                  <CustomDropdownButton
                    name="category"
                    label="Category"
                    placeholder="Category"
                    hideClose={true}
                    value={options}
                    setValue={item => onChangeItem(item)}
                    onClose={() => {
                      onChangeItem({id: 0, title: ''});
                    }}
                    optionsDataList={[
                      {id: 0, title: 'All'},
                      ...categoryDataList,
                    ]}
                    isRefetching={isRefetchingCategory}
                    fetchNextPage={fetchNextPageCategory}
                    hasNextPage={hasNextPageCategory}
                    refreshing={false}
                    onRefresh={refetchCategory}
                    refetch={refetchCategory}
                    onEndReachedThreshold={0.9}
                    onEndReached={({distanceFromEnd}) => {
                      if (distanceFromEnd < 0) return;
                      if (hasNextPageCategory) {
                        fetchNextPageCategory();
                      }
                    }}
                    containerStyle={{
                      paddingTop: verticalScale(4),
                      justifyContent: 'flex-start',
                    }}
                  />
                )}
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

          <FlatList
            style={{backgroundColor: Colors.onBackground}}
            contentContainerStyle={{marginBottom: scale(12)}}
            data={getPostsData?.pages}
            renderItem={renderListItem}
            showsVerticalScrollIndicator={false}
            numColumns={1}
            keyExtractor={(item: any) => JSON.stringify(item?.id)}
            horizontal={false}
            onEndReachedThreshold={0.5}
            onEndReached={({distanceFromEnd}) => {
              if (distanceFromEnd < 0) return;
              onLoadMore();
            }}
            ListEmptyComponent={!isLoading && !getPostsFail ? listEmpty : null}
          />
        </Formiz>
      </ScrollView>
    </CustomContainer>
  );
};

export default LikesScreen;
const styles = StyleSheet.create({
  itemContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: scale(9),
    marginTop: scale(6),
    flexDirection: 'row',
    paddingHorizontal: scale(2),
    paddingVertical: scale(6),
  },
  itemTxt: {
    color: Colors.txtLight,
    ...Fonts.mediumReg,
  },
  itemImg: {
    width: scale(48),
    height: scale(48),
    resizeMode: 'cover',
    borderRadius: scale(2),
  },
  imgContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 2,
  },

  timeTxt: {
    color: Colors.txtMedium,
    ...Fonts.verySmallReg,
    textAlign: 'left',
  },
});
