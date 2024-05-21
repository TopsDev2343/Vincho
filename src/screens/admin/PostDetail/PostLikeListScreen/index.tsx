import React, {useState} from 'react';
import {StyleSheet, StatusBar} from 'react-native';

import {
  BackButton,
  CustomAvatar,
  CustomContainer,
  CustomKeyboardAwareScrollView,
  CustomLoading,
  HelveticaRegularText,
} from '~/components';
import {Colors} from '~/styles/colors';
import {scale} from 'react-native-size-matters';
import {View, FlatList, HStack} from 'native-base';
import {useGetPostLikes} from '~/hooks/artist/Posts';
import {navigate} from '~/navigation/methods';
import {useAuthStore} from '~/stores';

const PostLikeListScreen = ({route}: {route: any}) => {
  const entityId = route?.params?.entityId;
  const {userId} = useAuthStore(state => state);
  const [where] = useState<object | undefined>({
    postId: {eq: entityId},
    user: {isActive: {eq: true}},
  });
  const {isLoading, data, fetchNextPage, hasNextPage, refetch, isRefetching} =
    useGetPostLikes({where});

  function renderItem({item}: {item: any}) {
    return (
      <View
        flex={1}
        justifyContent={'space-between'}
        alignItems={'center'}
        flexDirection={'row'}
        px={4}
        py={3}>
        <HStack alignItems={'center'}>
          <CustomAvatar
            uri={item.user.photoUrl}
            onPress={() => {
              item?.userId != userId
                ? navigate('UserProfile', {
                    entityId: item?.userId,
                  })
                : navigate('Profile');
            }}
            width={scale(40)}
            height={scale(40)}
          />

          <HelveticaRegularText
            text={
              item.user?.fullName
                ? `${item.user?.fullName}`
                : item.user?.userName
            }
            fontSize={16}
            color={Colors.txtLight}
            ml={4}
          />
        </HStack>
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
        />
      </CustomKeyboardAwareScrollView>
    </CustomContainer>
  );
};

export default PostLikeListScreen;

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
