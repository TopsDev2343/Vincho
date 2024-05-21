import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';

import {useGetCategories} from '~/hooks/artist/Categories';
import {
  PostModal,
  UserOptionMenu,
  ReportMenu,
  AuthModal,
  CategoriesList,
  CustomContainer,
  ForwardPostModal,
  AdminExplorePostList,
  CustomFilter,
  CustomDropdownButton,
} from '~/components';
import {categoryFilter} from '~/constants/dropDownData';
import {
  useGetPosts,
  useGetFollowingExplorePosts,
  useGetNearbyExplorePosts,
} from '~/hooks/artist/Posts';
import {useGetUserProfile} from '~/hooks/artist/User';
import {useAuthStore} from '~/stores';
import DeleteCommentModal from '~/components/molecules/DeleteCommentModal';
import {Colors} from '~/styles/colors';
import snackBar from '~/utils/snackBar';
import {requestLocationPermission} from '~/utils/userPermission';
import Geolocation from 'react-native-geolocation-service';

const Explore = ({navigation}: {navigation: any}) => {
  const [value, setValue] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [postData, setPostData] = useState<any>([]);
  const {userId} = useAuthStore(state => state);
  const [userNameValue, setUserNameValue] = useState('');
  const [options, setOptions] = useState({id: 0, title: ''});
  const [categoryWhere, setCategoryWhere] = useState({
    user: {isActive: {eq: true}, userName: {contains: userNameValue}},
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

  useEffect(() => {
    if (value == 'Nearby') {
      getCurrentLocation();
    }
  }, [value]);

  async function getCurrentLocation() {
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

  const {
    isLoading: getPostsLoading,
    data: getPostsData,
    isSuccess: getPostsSuccess,
    isError: getPostsFail,
    // error: getAllTopicErrorMsg,
    fetchNextPage: fetchNextPageGetPosts,
    hasNextPage: hasNextPageGetPosts,
    refetch: refetchGetPosts,
  } = useGetPosts({
    order: value === 'Most Popular' ? {postLikeCount: 'DESC'} : {id: 'DESC'},
    where: {
      and: [
        categoryWhere,
        {user: {isActive: {eq: true}, userName: {contains: userNameValue}}},
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
  });

  const {
    isLoading: getFollowingPostsLoading,
    data: getFollowingPostsData,
    isSuccess: getFollowingPostsSuccess,
    isError: getFollowingPostsFail,
    //error: getFollowingErrorMsg,
    fetchNextPage: fetchNextPageGetFollowingPosts,
    hasNextPage: hasNextPageGetFollowingPosts,
    refetch: refetchGetFollowingPosts,
  } = useGetFollowingExplorePosts(value == 'Following' ? true : false, {
    user: {isActive: {eq: true}, userName: {contains: userNameValue}},
  });

  const {
    isLoading: getNearbyPostsLoading,
    data: getNearbyPostsData,
    isSuccess: getNearbyPostsSuccess,
    isError: getNearbyPostsFail,
    //error: getFollowingErrorMsg,
    fetchNextPage: fetchNextPageGetNearbyPosts,
    hasNextPage: hasNextPageGetNearbyPosts,
    refetch: refetchGetNearbyPosts,
  } = useGetNearbyExplorePosts({
    categoryIds: selectedCategory == 0 ? [] : [selectedCategory],
    location: userLocation,
    enabled: enabled && value == 'Nearby' ? true : false,
    where: {user: {isActive: {eq: true}, userName: {contains: userNameValue}}},
  });

  useEffect(() => {
    if (selectedCategory != 0) {
      setCategoryWhere({
        user: {isActive: {eq: true}, userName: {contains: userNameValue}},
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
        user: {isActive: {eq: true}, userName: {contains: userNameValue}},
        postCategories: {
          some: {
            categoryId: {
              gte: 0,
            },
          },
        },
      });
    }

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
  }, [selectedCategory]);

  useEffect(() => {
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
  }, [value, getFollowingPostsData, getPostsData, getNearbyPostsData]);

  const onLoadCategoryMore = () => {
    if (hasNextPageGetAllCategories) {
      fetchNextPageGetAllCategories();
    }
  };
  const onLoadMore = () => {
    if (value === 'Following') {
      if (hasNextPageGetFollowingPosts) {
        fetchNextPageGetFollowingPosts();
      }
    } else if (value === 'Nearby') {
      if (hasNextPageGetNearbyPosts) {
        fetchNextPageGetNearbyPosts();
      }
    } else {
      if (hasNextPageGetPosts) {
        fetchNextPageGetPosts();
      }
    }
  };
  const isLoading =
    getAllCategoriesLoading ||
    getPostsLoading ||
    getProfileLoading ||
    getFollowingPostsLoading ||
    getNearbyPostsLoading;
  const isError =
    getAllCategoriesFail ||
    getPostsFail ||
    getFollowingPostsFail ||
    getProfileFail ||
    getNearbyPostsFail;
  const isSuccess =
    getPostsSuccess ||
    getFollowingPostsSuccess ||
    getProfileSuccess ||
    getNearbyPostsSuccess;

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
      }}>
      <View style={styles.container}>
        {getAllCategoriesSuccess && (
          <View
            style={{
              zIndex: 2000,
            }}>
            <View
              style={{
                width: '100%',
                height: verticalScale(46),
                overflow: 'visible',
              }}>
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
                onClose={() => {
                  onChangeItem({id: 0, title: ''});
                }}
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
              <CustomFilter
                label="Search Users"
                onPress={() => {
                  switch (value) {
                    case 'Following':
                      getAllCategoriesSuccess && refetchGetFollowingPosts();
                      break;
                    case 'Nearby':
                      getAllCategoriesSuccess && refetchGetNearbyPosts();
                      break;
                    default:
                      getAllCategoriesSuccess && refetchGetPosts;
                  }
                }}
                value={userNameValue}
                setValue={text => {
                  setUserNameValue(text);
                  switch (value) {
                    case 'Following':
                      getAllCategoriesSuccess && refetchGetFollowingPosts();
                      break;
                    case 'Nearby':
                      getAllCategoriesSuccess && refetchGetNearbyPosts();
                      break;
                    default:
                      getAllCategoriesSuccess && refetchGetPosts;
                  }
                }}
                height={scale(34)}
              />
            </View>

            <CategoriesList
              categoryData={
                getAllCategoriesSuccess ? getAllCategoriesData?.pages : null
              }
              onLoadMore={onLoadCategoryMore}
              selectedCategory={selectedCategory}
              setSelectedCategory={setUserSelectedCategory}
            />
          </View>
        )}

        {isSuccess ? (
          <View>
            <AdminExplorePostList
              isTopic={false}
              postsData={postData}
              onLoadMore={onLoadMore}
              isLoading={isLoading}
            />

            <UserOptionMenu isAdmin={true} />

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
    marginBottom: scale(100),
    flex: 1,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: verticalScale(52),
    width: '100%',
    marginBottom: scale(12),
  },
});
