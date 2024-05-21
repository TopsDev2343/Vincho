import React from 'react';
import {StyleSheet, FlatList} from 'react-native';
import {scale} from 'react-native-size-matters';
import {
  CustomContainer,
  AlternativeScreen,
  ActivityListItem,
} from '~/components';
import {Strings} from '~/assets/strings';
import {showTimeAgoText} from '~/utils/showTimeAgoText';
import {navigate} from '~/navigation/methods';
import {useAuthStore} from '~/stores';

const ActivityTab = ({
  activityData,
  selectedTab,
  onLoadMore,
  isLoading,
  isError,
  bgColor,
}: {
  activityData: any;
  selectedTab: number;
  onLoadMore: any;
  isLoading: boolean;
  isError: boolean;
  bgColor?: string;
}) => {
  const {userId} = useAuthStore(state => state);

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
    <CustomContainer isLoading={false} bgColor={bgColor}>
      <FlatList
        contentContainerStyle={{marginTop: scale(12)}}
        data={activityData}
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
    </CustomContainer>
  );
};

export default ActivityTab;

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
  },
});
