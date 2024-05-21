import React, {useEffect, useState} from 'react';
import {StyleSheet, StatusBar} from 'react-native';
import {
  AlternativeScreen,
  BackButton,
  CustomAvatar,
  CustomContainer,
  CustomKeyboardAwareScrollView,
  CustomLoading,
  HelveticaRegularText,
} from '~/components';
import {Colors} from '~/styles/colors';
import {scale, verticalScale} from 'react-native-size-matters';
import {View, FlatList, HStack, Button, Pressable} from 'native-base';
import snackBar from '~/utils/snackBar';
import {messageHelper} from '~/utils/messageHelper';
import {useDeleteBlock, useGetBlocks} from '~/hooks/artist/Block';
import {Strings} from '~/assets/strings';
import {navigate} from '~/navigation/methods';

const BlockUsersScreen = ({route}: {route: any}) => {
  const {isLoading, data, isRefetching, refetch, hasNextPage, fetchNextPage} =
    useGetBlocks();

  const [deleteId, setDeleteId] = useState(0);
  const {mutate: unFollowUserMutate, isLoading: isUnBlocking} =
    useDeleteBlock();

  const deleteBlock = (entityId: number) => {
    unFollowUserMutate(entityId as any, {
      onSuccess: successData => {
        if (successData.block_deleteBlock?.value === 'Success') {
        } else {
          snackBar(messageHelper(successData.block_deleteBlock?.value));
        }
      },
    });
  };
  function renderItem({item}: {item: any}) {
    return (
      <View
        flex={1}
        justifyContent={'space-between'}
        alignItems={'center'}
        flexDirection={'row'}
        px={4}
        py={3}>
        <Pressable
          alignItems={'center'}
          flexDirection={'row'}
          onPress={() => {
            navigate('OtherUserProfile', {
              entityId: item?.blockedUser?.id,
            });
          }}>
          <CustomAvatar
            uri={item.blockedUser.photoUrl}
            onPress={() => {}}
            width={scale(40)}
            height={scale(40)}
            onPress={() => {
              navigate('OtherUserProfile', {
                entityId: item?.blockedUser?.id,
              });
            }}
          />

          <HelveticaRegularText
            text={
              item.blockedUser?.fullName
                ? `${item.blockedUser?.fullName}`
                : item.blockedUser?.userName
            }
            fontSize={16}
            color={Colors.txtLight}
            ml={4}
          />
        </Pressable>
        <Button
          variant={'link'}
          onPress={() => {
            setDeleteId(item.id);
            deleteBlock(item.id);
          }}
          background={Colors.onBackground}
          px={6}
          py={1}
          width={scale(100)}
          borderRadius={8}
          alignItems={'center'}
          height={verticalScale(36)}
          isLoading={isUnBlocking && deleteId == item?.id}>
          <HelveticaRegularText
            text={'Unblock'}
            fontSize={16}
            color={Colors.primary}
          />
        </Button>
      </View>
    );
  }
  if (isLoading) {
    return (
      <View flex={1} style={{backgroundColor: Colors.background}}>
        <CustomLoading style={{backgroundColor: Colors.background}} />
      </View>
    );
  }
  return (
    <CustomContainer style={{flex: 1}}>
      <CustomKeyboardAwareScrollView>
        <StatusBar backgroundColor={Colors.background} />
        <BackButton />
        <FlatList
          style={styles.container}
          data={data?.pages}
          refreshing={isRefetching}
          onRefresh={refetch}
          keyExtractor={(item, index) =>
            item?.id ? item?.id?.toString() : index?.toString()
          }
          renderItem={renderItem}
          scrollEnabled={false}
          onEndReachedThreshold={0.5}
          onEndReached={({distanceFromEnd}) => {
            if (distanceFromEnd < 0) return;
            if (hasNextPage) {
              fetchNextPage();
            }
          }}
          ListEmptyComponent={
            !isLoading ? (
              <AlternativeScreen msg={Strings.noBlockedUser} />
            ) : null
          }
        />
      </CustomKeyboardAwareScrollView>
    </CustomContainer>
  );
};

export default BlockUsersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatar: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eaeaea',
  },
});
