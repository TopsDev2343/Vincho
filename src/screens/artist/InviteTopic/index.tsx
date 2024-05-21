import React, {useState} from 'react';
import {FlatList} from 'react-native';
import {scale} from 'react-native-size-matters';

import {Colors} from '~/styles/colors';
import {windowWidth} from '~/styles/globalStyles';
import {
  UsersListItem,
  CustomContainer,
  BackButton,
  CustomButton,
  AlternativeScreen,
} from '~/components';
import {Strings} from '~/assets/strings/index';
import {useGetAllFollowing} from '~/hooks/artist/Follow';
import {useAuthStore} from '~/stores';
import {Fonts} from '~/styles/fonts';
import {useCreateTopicUser} from '~/hooks/artist/Topic';
import {navigate, replace} from '~/navigation/methods';

const InviteTopic = ({route}: {route: any}) => {
  const [itemId, setItemId] = useState<number>();
  const [invitedList, setInvitedList] = useState<number[]>([]);
  const {userId} = useAuthStore(state => state);
  const {isLoading: createTopicUserLoading, mutate: mutateCreateTopicUser} =
    useCreateTopicUser();

  const inviteUser = async (otherUserId: number) => {
    const input = {
      topicId: route?.params?.topicId,
      userId: otherUserId,
      invitedByUserId: userId,
    };
    mutateCreateTopicUser(input, {
      onSuccess: successData => {
        if (
          successData?.topicUser_createTopicUser?.status.value === 'Success'
        ) {
          setInvitedList([...invitedList, otherUserId]);
        }
      },
    });
  };

  const {
    isLoading: getAllFollowingLoading,
    data: getAllFollowingData,
    isError: getAllFollowingFail,
    fetchNextPage: fetchNextPageGetAllFollowing,
    hasNextPage: hasNextPageGetAllFollowing,
    refetch: refetchGetAllFollowing,
  } = useGetAllFollowing({followerId: userId});

  function setItemIdForLoading(id: number) {
    setItemId(id);
  }

  const onLoadMore = () => {
    if (hasNextPageGetAllFollowing) {
      fetchNextPageGetAllFollowing();
    }
  };

  function goToPostScreen() {
    replace('TopicPostScreen', {
      topicId: route?.params?.topicId,
      isUserTopic: true,
    });
  }

  function renderUserListItem({item}: {item: any}) {
    return (
      <UsersListItem
        item={item?.following}
        btnLoading={createTopicUserLoading}
        btnOnPress={inviteUser}
        itemId={itemId}
        setItemId={setItemIdForLoading}
        selectedList={invitedList}
        selectedTitle={Strings.invite}
        nonSelectedTitle={Strings.invited}
      />
    );
  }

  function listEmpty() {
    return <AlternativeScreen msg={Strings.noUserToInvite} />;
  }

  return (
    <CustomContainer
      isError={getAllFollowingFail}
      isLoading={getAllFollowingLoading}
      errorMsg="Something went wrong!"
      onPress={refetchGetAllFollowing}>
      <BackButton />
      <FlatList
        contentContainerStyle={styles.listContainer}
        data={getAllFollowingData?.pages}
        renderItem={renderUserListItem}
        showsVerticalScrollIndicator={false}
        numColumns={1}
        keyExtractor={(item: any) => JSON.stringify(item?.id)}
        horizontal={false}
        onEndReachedThreshold={0.5}
        onEndReached={({distanceFromEnd}) => {
          if (distanceFromEnd < 0) return;
          onLoadMore();
        }}
        ListEmptyComponent={!getAllFollowingLoading ? listEmpty : null}
      />

      <CustomButton
        title={Strings.next}
        titleColor={Colors.onPrimary}
        backColor={Colors.primary}
        btnMTop={scale(5)}
        btnMBottom={scale(16)}
        onPress={goToPostScreen}
      />
    </CustomContainer>
  );
};

export default InviteTopic;

const styles = {
  listContainer: {
    flexGrow: 1,
    marginBottom: scale(70),
    marginTop: scale(16),
  },
  bottom: {
    marginBottom: 0,
    marginTop: 'auto',
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
    width: windowWidth,
    backgroundColor: Colors.transparent,
  },
  input: {
    marginTop: scale(36),
    marginHorizontal: scale(12),
    borderBottomWidth: 1,
    borderColor: Colors.txtMedium,
    padding: 10,
    ...Fonts.smallReg,
    color: Colors.txtLight,
  },
};
