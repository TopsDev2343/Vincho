import React from 'react';
import {StyleSheet, FlatList} from 'react-native';
import {scale} from 'react-native-size-matters';

import {
  CustomContainer,
  BackButton,
  CustomAvatar,
  HelveticaRegularText,
  CustomLoading,
} from '~/components';
import {useGetTopicPostLikes} from '~/hooks/artist/Topic';
import {HStack, View} from 'native-base';
import {Colors} from '~/styles/colors';
import {useAuthStore} from '~/stores';
import {navigate} from '~/navigation/methods';

const TopicFollow = ({route}: {route: any}) => {
  const {userId} = useAuthStore(state => state);
  const {
    isLoading,
    data,
    isError,
    isSuccess,
    fetchNextPage,
    hasNextPage,
    refetch,
    isRefetching,
  } = useGetTopicPostLikes({
    where: {
      topicPostId: {eq: route?.params?.postId},
      user: {isActive: {eq: true}},
    },
  });

  function renderItem({item}: {item: any}) {
    return (
      <View
        flex={1}
        justifyContent={'space-between'}
        alignItems={'center'}
        flexDirection={'row'}
        px={'4'}
        py={'3'}>
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
    <CustomContainer style={{flex: 1}} isError={isError}>
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
    </CustomContainer>
  );
};

export default TopicFollow;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
