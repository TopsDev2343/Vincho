import React, {useState, useEffect, useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import {SvgXml} from 'react-native-svg';

import {
  useGetAllCategoriesArtist,
  useGetCategories,
} from '~/hooks/artist/Categories';
import {
  PostModal,
  UserOptionMenu,
  ReportMenu,
  AuthModal,
  DropDown,
  CategoriesList,
  ExplorePostList,
  CustomContainer,
  ForwardPostModal,
  CustomDropdownButton,
} from '~/components';
import {windowHeight, windowWidth} from '~/styles/globalStyles';
import {categoryFilter} from '~/constants/dropDownData';
import {
  useGetFollowingExplorePosts,
  useGetNearbyExplorePosts,
  useGetUnViewedPosts,
  useGetExplorePostsByCategoryID,
} from '~/hooks/artist/Posts';
import {logo} from '~/assets/icons';
import {useGetUserProfile} from '~/hooks/artist/User';
import {useAuthStore} from '~/stores';
import DeleteCommentModal from '~/components/molecules/DeleteCommentModal';
import {Colors} from '~/styles/colors';
import {HStack} from 'native-base';
import {requestLocationPermission} from '~/utils/userPermission';
import Geolocation from 'react-native-geolocation-service';
import snackBar from '~/utils/snackBar';

const Explore = ({navigation}: {navigation: any}) => {
  const [value, setValue] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [userCategoryIds, setUserCategoryIds] = useState<number[]>([]);
  const [postData, setPostData] = useState<any>([]);
  const [options, setOptions] = useState({id: 0, title: ''});
  const [categoryWhere, setCategoryWhere] = useState({
    user: {isActive: {eq: true}},
    postCategories: {
      some: {
        categoryId: {
          gte: 0,
        },
      },
    },
  });
  const [userLocation, setUserLocation] = useState<number[]>([0, 0]);
  const [enabled, setEnabled] = useState<boolean>(false);

  const [loadingLocation, setLoadingLocation] = useState<boolean>(false);

  const {userId} = useAuthStore(state => state);

  useEffect(() => {
    if (value == 'Nearby') {
      getCurrentLocation();
    }
  }, [value]);
  async function getCurrentLocation() {
    setLoadingLocation(true);
    if (await requestLocationPermission()) {
      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;
          setUserLocation([longitude, latitude]);
          setEnabled(true);
        },
        (error: any) => {
          snackBar({message: JSON.stringify(error), color: Colors.error});
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }
  }

  const {
    isLoading: getProfileLoading,
    data: getProfileData,
    isSuccess: getProfileSuccess,
    isError: getProfileFail,
    error: getProfileErrorMsg,
    refetch: refetchProfile,
  } = useGetUserProfile();

  const {
    isLoading: getAllCategoriesLoading,
    data: getAllCategoriesData,
    isSuccess: getAllCategoriesSuccess,
    isError: getAllCategoriesFail,
    error: getAllTopicErrorMsg,
    refetch: refetchGetAllCategories,
    fetchNextPage: fetchNextPageGetAllCategories,
    hasNextPage: hasNextPageGetAllCategories,
  } = useGetCategories(null, {id: 'DESC'});

  useEffect(() => {
    if (getProfileSuccess && getAllCategoriesSuccess) {
      if (getProfileData?.user_getProfile?.result?.userCategories?.length > 0) {
        let userCategoryList =
          getProfileData?.user_getProfile?.result?.userCategories?.map(
            ({category}) => category?.id,
          );
        setUserCategoryIds(userCategoryList);
        refetchGetPosts();
      } else {
        let allCategoryList = getAllCategoriesData?.pages?.map(
          value => value?.id,
        );
        setUserCategoryIds(allCategoryList);
        refetchGetPosts();
      }
    }
  }, [getProfileSuccess, getAllCategoriesSuccess]);

  const {
    isLoading: getPostsLoading,
    data: getPostsData,
    isSuccess: getPostsSuccess,
    isError: getPostsFail,
    //error: getPostsErrorMsg,
    fetchNextPage: fetchNextPageGetPosts,
    hasNextPage: hasNextPageGetPosts,
    refetch: refetchGetPosts,
  } = useGetUnViewedPosts({
    order: value == 'Most Popular' ? {postLikeCount: 'DESC'} : {id: 'DESC'},
    where: {
      and: [
        categoryWhere,
        value == 'Our Recommendation'
          ? {setAsRecommended: {eq: true}}
          : {
              or: [
                {setAsRecommended: {eq: true}},
                {setAsRecommended: {eq: false}},
              ],
            },
      ],
    },
    userId,
  });

  const {
    isLoading: getExplorePostsLoading,
    data: getExplorePostsData,
    isSuccess: getExplorePostsSuccess,
    isError: getExplorePostsFail,
    error: getExplorePostsErrorMsg,
    fetchNextPage: fetchNextPageGetExplorePosts,
    hasNextPage: hasNextPageGetExplorePosts,
    refetch: refetchGetExplorePosts,
  } = useGetExplorePostsByCategoryID({
    categoryIds: selectedCategory == 0 ? [] : [selectedCategory],
    userId,
  });

  const {
    isLoading: getFollowingPostsLoading,
    data: getFollowingPostsData,
    isSuccess: getFollowingPostsSuccess,
    isError: getFollowingPostsFail,
    fetchNextPage: fetchNextPageGetFollowingPosts,
    hasNextPage: hasNextPageGetFollowingPosts,
    refetch: refetchGetFollowingPosts,
  } = useGetFollowingExplorePosts(value == 'Following' ? true : false);

  const {
    isLoading: getNearbyPostsLoading,
    data: getNearbyPostsData,
    isSuccess: getNearbyPostsSuccess,
    isError: getNearbyPostsFail,
    error: getFollowingErrorMsg,
    fetchNextPage: fetchNextPageGetNearbyPosts,
    hasNextPage: hasNextPageGetNearbyPosts,
    refetch: refetchGetNearbyPosts,
  } = useGetNearbyExplorePosts({
    categoryIds: selectedCategory == 0 ? [] : [selectedCategory],
    location: userLocation,
    enabled: enabled && value == 'Nearby' ? true : false,
    options: {
      onSuccess: () => {
        setLoadingLocation(false);
        setPostData(getNearbyPostsData?.pages);
      },
    },
  });

  useEffect(() => {
    if (value == '' && options.title != '') {
      setValue(options.title);
    }
    if (userId != undefined && userId != null) {
      if (userId == undefined || userId == null) {
        refetchGetExplorePosts();
      } else {
        switch (options.title) {
          case 'Following':
            getAllCategoriesSuccess && refetchGetFollowingPosts();
            break;
          case 'Nearby':
            getAllCategoriesSuccess && refetchGetNearbyPosts();
            break;
          default:
            getAllCategoriesSuccess && refetchGetPosts();
        }
      }
      if (selectedCategory != 0) {
        setCategoryWhere({
          user: {isActive: {eq: true}},
          postCategories: {
            some: {
              categoryId: {
                in: [selectedCategory],
              },
            },
          },
        });
      } else {
        setCategoryWhere({
          user: {isActive: {eq: true}},
          postCategories: {
            some: {
              categoryId: {
                gte: 0,
              },
            },
          },
        });
      }
    } else {
      getAllCategoriesSuccess && refetchGetExplorePosts();
    }

    //selectedCategory === 0 ? userCategoryIds : [selectedCategory],
  }, [selectedCategory]);

  useEffect(() => {
    if (userId == undefined || userId == null) {
      setPostData(getExplorePostsData?.pages);
    } else {
      switch (value) {
        case 'Following':
          setPostData(getFollowingPostsData?.pages);
          break;
        case 'Nearby':
          if (enabled) {
            setPostData(getNearbyPostsData?.pages);
          } else {
            setPostData(null);
          }
          break;
        default:
          setPostData(getPostsData?.pages);
      }
    }
  }, [
    value,
    getFollowingPostsData,
    getPostsData,
    getExplorePostsData,
    getNearbyPostsData,
  ]);

  const onLoadMore = () => {
    if (value == 'Following') {
      if (hasNextPageGetFollowingPosts) {
        fetchNextPageGetFollowingPosts();
      }
    } else if (value == 'Nearby') {
      if (hasNextPageGetNearbyPosts) {
        fetchNextPageGetNearbyPosts();
      }
    } else if (userId != undefined && userId != null) {
      if (hasNextPageGetPosts) {
        fetchNextPageGetPosts();
      }
    } else {
      if (hasNextPageGetExplorePosts) {
        fetchNextPageGetExplorePosts();
      }
    }
  };
  const onLoadCategoryMore = () => {
    if (hasNextPageGetAllCategories) {
      fetchNextPageGetAllCategories();
    }
  };

  const isLoading =
    getAllCategoriesLoading ||
    getPostsLoading ||
    getProfileLoading ||
    getFollowingPostsLoading ||
    getNearbyPostsLoading ||
    getExplorePostsLoading ||
    (enabled && loadingLocation);
  const isError =
    getAllCategoriesFail ||
    getPostsFail ||
    getFollowingPostsFail ||
    getProfileFail ||
    getNearbyPostsFail ||
    getExplorePostsFail;
  const isSuccess =
    getPostsSuccess ||
    getFollowingPostsSuccess ||
    getProfileSuccess ||
    getNearbyPostsSuccess ||
    getExplorePostsSuccess;

  function setUserSelectedCategory(selectedValue: number) {
    setSelectedCategory(selectedValue);
    setValue('');
  }

  const onChangeItem = (item: any) => {
    if (item != null || item != undefined) {
      setOptions(item);
      setValue(item.title);
    } else {
      setOptions({id: 0, title: ''});
      setValue('');
    }
    setSelectedCategory(0);
  };

  return (
    <CustomContainer
      isLoading={isLoading}
      isError={isError}
      errorMsg={'Something went wrong!'}
      onPress={() => {
        refetchGetAllCategories();
        refetchGetPosts();
        refetchGetNearbyPosts();
        refetchGetFollowingPosts();
        refetchGetExplorePosts();
      }}>
      <View style={styles.container}>
        {getAllCategoriesSuccess && (
          <View style={{zIndex: 2000}}>
            <HStack justifyContent={'space-between'} alignItems={'center'}>
              <View style={{width: windowWidth * 0.59}}>
                <CustomDropdownButton
                  bgColor={Colors.background}
                  textColor={Colors.txtMedium}
                  fontSize={16}
                  name="category"
                  label="Category"
                  hideClose={true}
                  placeholder="Select..."
                  value={options}
                  setValue={item => onChangeItem(item)}
                  optionsDataList={
                    categoryFilter != undefined
                      ? categoryFilter.map(x => ({
                          id: x.key,
                          title: x.value,
                        }))
                      : null
                  }
                />
              </View>

              <View style={styles.logoContainer}>
                <SvgXml {...styles.logo} />
              </View>
            </HStack>

            {getAllCategoriesData?.pages && (
              <CategoriesList
                categoryData={
                  getAllCategoriesSuccess == true
                    ? getAllCategoriesData?.pages
                    : null
                }
                selectedCategory={selectedCategory}
                setSelectedCategory={setUserSelectedCategory}
                onLoadMore={onLoadCategoryMore}
              />
            )}
          </View>
        )}

        {isSuccess ? (
          <View>
            <ExplorePostList
              postsData={postData}
              onLoadMore={onLoadMore}
              isLoading={isLoading}
            />

            <UserOptionMenu isAdmin={false} />

            <ReportMenu />

            <PostModal />

            {userId && <ForwardPostModal />}

            <AuthModal navigation={navigation} />

            <DeleteCommentModal />
          </View>
        ) : null}
      </View>
    </CustomContainer>
  );
};

export default Explore;

const styles = StyleSheet.create({
  container: {
    marginTop: scale(6),
  },
  logoContainer: {
    alignSelf: 'flex-end',
    marginTop: -windowHeight * 0.01,
    marginRight: windowWidth * 0.04,
  },
  logo: {
    xml: logo,
    width: windowWidth * 0.2,
    height: windowHeight * 0.08,
  },
});
