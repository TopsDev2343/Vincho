import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {scale} from 'react-native-size-matters';

import {
  CustomContainer,
  BackButton,
  TopTab,
  DropDown,
  AlternativeScreen,
  ActivityListItem,
} from '~/components';
import {timePeriodFilter} from '~/constants/dropDownData';
import {windowWidth} from '~/styles/globalStyles';
import {activityTopTab} from '~/constants/topTabData';
import {useGetAllActivities} from '~/hooks/admin/Activities';
import {useGetAllUsers} from '~/hooks/artist/AllUsers';
import {recentActivitiesFilter} from '~/utils/recentActivityFilter';
import {FlatList} from 'native-base';
import {Strings} from '~/assets/strings';
import {showTimeAgoText} from '~/utils/showTimeAgoText';
import {navigate} from '~/navigation/methods';
import {useAuthStore} from '~/stores';

const RecentActivities = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [whereFilter, setWhereFilter] = useState<object>(
    recentActivitiesFilter(value, 0)[0],
  );
  const {userId} = useAuthStore(state => state);

  function setUserSelectedTab(selectedValue: number) {
    setSelectedTab(selectedValue);
  }

  function setDropDownValue(dropDownValue: string) {
    setValue(dropDownValue);
  }

  useEffect(() => {
    if (selectedTab !== 3) {
      setWhereFilter(recentActivitiesFilter(value, selectedTab)[selectedTab]);
    }
  }, [selectedTab, value]);

  const {
    isLoading: getActivitiesLoading,
    data: getActivitiesData,
    isSuccess: getActivitiesSuccess,
    isError: getActivitiesFail,
    //  error: getActivitiesErrorMsg,
    fetchNextPage: fetchNextPageGetActivities,
    hasNextPage: hasNextPageGetActivities,
    refetch: refetchGetActivities,
  } = useGetAllActivities({where: whereFilter, order: {id: 'DESC'}});

  const {
    isLoading: getJoinedUsersLoading,
    data: getJoinedUsersData,
    isSuccess: getJoinedUsersSuccess,
    isError: getJoinedUsersFail,
    error: getJoinedUsersErrorMsg,
    fetchNextPage: fetchNextPageGetJoinedUsers,
    hasNextPage: hasNextPageGetJoinedUsers,
    refetch: refetchGetJoinedUsers,
  } = useGetAllUsers({where: recentActivitiesFilter(value, 3)});

  const onLoadMore = () => {
    if (selectedTab === 3) {
      if (hasNextPageGetJoinedUsers) {
        fetchNextPageGetJoinedUsers();
      }
    } else {
      if (hasNextPageGetActivities) {
        fetchNextPageGetActivities();
      }
    }
  };

  const isLoading = getActivitiesLoading || getJoinedUsersLoading;
  const isSuccess = getJoinedUsersSuccess || getActivitiesSuccess;
  const isError = getJoinedUsersFail || getActivitiesFail;

  function renderActivityListItem({item}: {item: object}) {
    return (
      <ActivityListItem
        img={selectedTab === 3 ? item?.photoUrl : item?.user?.photoUrl}
        name={selectedTab === 3 ? item?.userName : item?.user?.userName}
        msg={
          selectedTab === 0
            ? 'Shared a post '
            : selectedTab === 1
            ? 'Liked a post '
            : selectedTab === 2
            ? 'Commented on a post '
            : 'Joined to Vincho '
        }
        imgOnPress={() => {
          if (selectedTab == 3) {
            item?.userId != userId
              ? navigate('UserProfile', {entityId: item?.id})
              : navigate('Profile');
          } else {
            if (item?.targetPost != null && item?.targetPost != undefined) {
              navigate('PostDetail', {
                entityId: item?.targetPost?.id,
              });
            } else if (
              item?.targetTopicPost != null &&
              item?.targetTopicPost != undefined
            ) {
              navigate('TopicPostDetailScreen', {
                postId: item?.targetTopicPost?.id,
              });
            }
          }
        }}
        date={showTimeAgoText(item?.createdDate)}
      />
    );
  }

  function listEmpty() {
    return <AlternativeScreen msg={Strings.noActivity} />;
  }
  return (
    <CustomContainer isLoading={false}>
      <BackButton />

      <View>
        <DropDown
          open={open}
          value={value}
          setValue={setDropDownValue}
          setOpen={setOpen}
          dropDownOptions={timePeriodFilter}
          width={windowWidth * 0.3}
          marginT={scale(3)}
          placeHolder={'Select...'}
        />

        <TopTab
          tabData={activityTopTab}
          selectedTab={selectedTab}
          setSelectedTab={setUserSelectedTab}
        />
      </View>

      <CustomContainer
        style={styles.tabContainer}
        isLoading={isLoading}
        isError={isError}
        errorMsg={'Something went wrong!'}
        onPress={() => {
          refetchGetActivities();
          refetchGetJoinedUsers();
        }}>
        {isSuccess && (
          <FlatList
            contentContainerStyle={{marginTop: scale(12)}}
            data={
              selectedTab === 3
                ? getJoinedUsersData?.pages
                : getActivitiesData?.pages
            }
            renderItem={renderActivityListItem}
            showsVerticalScrollIndicator={false}
            numColumns={1}
            keyExtractor={(item: any) => JSON.stringify(item?.id)}
            horizontal={false}
            onEndReachedThreshold={0.5}
            onEndReached={({distanceFromEnd}) => {
              if (distanceFromEnd < 0) return;
              onLoadMore();
            }}
            ListEmptyComponent={!isLoading && !isError ? listEmpty : null}
          />
        )}
      </CustomContainer>
    </CustomContainer>
  );
};

export default RecentActivities;

const styles = StyleSheet.create({
  tabContainer: {zIndex: -7, flex: 1},
});
