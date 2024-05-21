import {FlatList} from 'native-base';
import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {scale} from 'react-native-size-matters';
import {failAvatar} from '~/assets/images';
import {Strings} from '~/assets/strings';

import {
  AlternativeScreen,
  BackButton,
  CustomContainer,
  CustomImage,
} from '~/components';
import {useGetComments} from '~/hooks/artist/Comments';
import {navigate} from '~/navigation/methods';
import {Colors} from '~/styles/colors';
import {Fonts} from '~/styles/fonts';

const UserCommentedPostsScreen = ({route}: {route: any}) => {
  const entityId = route?.params?.entityId;
  const [whereFilter] = useState<object | undefined>({
    post: {isDeleted: {eq: false}, userId: {eq: entityId}},
  });

  const {
    isLoading: getPostsLoading,
    data: getPostsData,
    isError: getPostsFail,
    fetchNextPage: fetchNextPageGetPosts,
    hasNextPage: hasNextPageGetPosts,
    isSuccess,
    refetch,
  } = useGetComments(whereFilter);

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
            navigate('PostDetail', {entityId: item?.postId});
          }}
          style={styles.imgContainer}>
          {item?.post?.fileUrl ? (
            <View style={{flex: 2, width: scale(48), height: scale(48)}}>
              <CustomImage
                imageSource={item?.post?.fileUrl}
                style={styles.itemImg}
              />
            </View>
          ) : (
            <Image source={failAvatar} style={styles.itemImg} />
          )}
          <View style={{marginLeft: scale(16), flex: 8}}>
            <Text style={styles.itemTxt}>{item?.user?.userName} </Text>
            <Text style={styles.timeTxt}>{item?.commentText}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  function listEmpty() {
    return <AlternativeScreen msg={Strings.emptyString} />;
  }

  return (
    <CustomContainer
      isLoading={getPostsLoading}
      isError={getPostsFail}
      errorMsg={'Something went wrong!'}
      onPress={() => {
        refetch();
      }}>
      <BackButton />
      {isSuccess ? (
        <FlatList
          style={{marginTop: 20}}
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
          ListEmptyComponent={
            !getPostsLoading && !getPostsFail ? listEmpty : null
          }
        />
      ) : null}
    </CustomContainer>
  );
};

export default UserCommentedPostsScreen;

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
    ...Fonts.smallReg,
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
  },

  timeTxt: {
    color: Colors.txtMedium,
    ...Fonts.verySmallReg,
    textAlign: 'left',
  },
});
