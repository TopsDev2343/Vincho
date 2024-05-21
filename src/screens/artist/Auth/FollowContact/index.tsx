import React, {useState} from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';
import {scale} from 'react-native-size-matters';

import {Colors} from '~/styles/colors';
import {
  CustomContainer,
  CustomButton,
  BackButton,
  UsersListItem,
  AlternativeScreen,
} from '~/components';
import {Strings} from '~/assets/strings/index';
import {Fonts} from '~/styles/fonts';
import {replace} from '~/navigation/methods';
import {storageHelper} from '~/utils/storageHelper';
import {
  useContactStore,
  useAuthStore,
  useFollowingListStore,
  useAuthRefreshStore,
} from '~/stores';
import {useGetAllUsers} from '~/hooks/artist/AllUsers';
import {useFollow} from '~/hooks/artist/Follow';
import snackBar from '~/utils/snackBar';
import {messageHelper} from '~/utils/messageHelper';
import {StorageKeys} from '~/constants/storageKeys';

const FollowContact = () => {
  const storage = new storageHelper();
  const {contactInfo} = useContactStore(state => state);
  const {userId} = useAuthStore(state => state);
  const {userFollowingList, setUserFollowingList} = useFollowingListStore(
    state => state,
  );
  const {mutate: mutateFollow, isLoading: followLoading} = useFollow();
  const {refreshAuth, setRefreshAuth} = useAuthRefreshStore();
  const [itemId, setItemId] = useState<number>();

  function setItemIdForLoading(id: number) {
    setItemId(id);
  }
  const {
    isLoading: getAllUsersLoading,
    data: getAllUsersData,
    isSuccess: getAllUsersSuccess,
    isError: getAllUsersFail,
    //error: getAllTopicErrorMsg,
    fetchNextPage: fetchNextPageGetAllUsers,
    hasNextPage: hasNextPageGetAllUsers,
    refetch: refetchGetAllUsers,
  } = useGetAllUsers({
    where:
      contactInfo != null && contactInfo.length > 0 ? {or: contactInfo} : null,
  });
  const onLoadMore = () => {
    if (hasNextPageGetAllUsers) {
      fetchNextPageGetAllUsers();
    }
  };

  function renderUserListItem({item}: {item: any}) {
    return (
      <UsersListItem
        item={item}
        btnLoading={followLoading}
        btnOnPress={followOnPress}
        itemId={itemId}
        setItemId={setItemIdForLoading}
        selectedList={userFollowingList}
        selectedTitle={Strings.follow}
        nonSelectedTitle={Strings.following}
      />
    );
  }

  function followOnPress(otherUserId: number) {
    const input = {followerId: userId, followingId: otherUserId};
    mutateFollow(input as any, {
      onSuccess: successData => {
        if (successData.follow_createFollow?.status.value === 'Success') {
          setUserFollowingList([...userFollowingList, input.followingId]);
          /* snackBar(
            messageHelper(successData.follow_createFollow?.status.value),
          ); */
        } else {
          snackBar(
            messageHelper(successData.follow_createFollow?.status.value),
          );
        }
      },
    });
  }

  function skipNow() {
    storage.multiSave(() => {
      setRefreshAuth(!refreshAuth);
      replace('ChooseTopicScreen');
    }, [
      [StorageKeys.FOLLOW_CONTACT_SHOW, 'shown'],
      [StorageKeys.ACCESS_CONTACT_SHOW, 'shown'],
    ]);
  }

  function listEmpty() {
    return <AlternativeScreen msg={Strings.noContacts} />;
  }

  return (
    <CustomContainer
      isLoading={getAllUsersLoading}
      isError={getAllUsersFail}
      errorMsg={'Something went wrong'}
      onPress={refetchGetAllUsers}>
      {getAllUsersSuccess ? (
        <View style={{flex: 1}}>
          <BackButton />

          <View style={{marginTop: scale(36), marginHorizontal: scale(24)}}>
            <Text style={{...Fonts.largeRegChanel, color: Colors.white}}>
              {Strings.followTitle}
            </Text>
            <Text style={{...Fonts.smallLight, color: Colors.white}}>
              {Strings.followBody}
            </Text>
          </View>

          <FlatList
            contentContainerStyle={{flexGrow: 1, marginTop: scale(12)}}
            data={getAllUsersData?.pages}
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
            ListEmptyComponent={!getAllUsersLoading ? listEmpty : null}
          />

          <CustomButton
            title={Strings.next}
            containerStyle={{justifyContent: 'flex-end', alignItems: 'center'}}
            titleColor={Colors.txtDark}
            backColor={Colors.primary}
            btnMTop={scale(16)}
            btnMBottom={scale(16)}
            onPress={skipNow}
          />
        </View>
      ) : null}
    </CustomContainer>
  );
};

export default FollowContact;

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
  },
  image: {
    width: '90%',
    aspectRatio: 1.2,
    alignSelf: 'center',
  },
});
