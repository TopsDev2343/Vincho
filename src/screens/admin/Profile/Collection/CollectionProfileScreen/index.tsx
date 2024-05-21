import {View} from 'native-base';
import React, {useMemo, useState} from 'react';
import CustomContainer from '~/components/atoms/CustomContainer';
import {Colors} from '~/styles/colors';
import {FlatList, StyleSheet, Text, TouchableOpacity} from 'react-native';
import HelveticaRegularText from '~/components/atoms/HelveticaRegularText';
import {navigate} from '~/navigation/methods';
import {width} from '~/utils/dimension';
import {useGetBaseCollections} from '~/hooks/artist/Collection';
import {useGetPostLikes} from '~/hooks/artist/Posts';
import {SortEnumType} from '~/generated/graphql';
import {CustomImage, PostPlayVideo} from '~/components';
import LinearGradient from 'react-native-linear-gradient';
import {postFileType} from '~/@types/global';
import {Strings} from '~/assets/strings';

function CollectionProfileScreen({entityId}: {entityId: number}) {
  const [lastPostUrl, setLastPostUrl] = useState('');
  const [lastPostFileType, setLastPostFileType] = useState('');
  const [order] = useState<object | undefined>({postId: SortEnumType.Desc});
  const [where] = useState<object | undefined>({
    collections: {all: {post: {isDeleted: {eq: false}}}},
    userId: {eq: entityId},
  });
  const [likeWhere] = useState<object | undefined>({userId: {eq: entityId}});
  const {
    isRefetching,
    isLoading,
    data: dataBaseCollections,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useGetBaseCollections({
    where: where,
  });

  const {data: allPostData, isLoading: isLoaddingAllPosts} = useGetPostLikes({
    where: likeWhere,
    order,
    options: {
      onSuccess: data => {
        if (data.pages.length > 0) {
          setLastPostUrl(data.pages[0].post.fileUrl);
          setLastPostFileType(data.pages[0].post.fileType);
        }
      },
    },
  });

  const renderItem = ({item, index}) => {
    let lastItemPostUrl =
      item?.collections[item.collections?.length - 1]?.post?.fileUrl;
    let fileType =
      item?.collections[item.collections?.length - 1]?.post?.fileType;
    return (
      <View mt={2} width={width / 2} flex={1} alignItems={'flex-start'}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            if (item.id > 0) {
              navigate('CollectionDetail', {
                title: item?.title,
                id: item.id,
                collections: item.collections,
              });
            } else {
              navigate('CollectionDetail', {
                title: 'All Posts',
                data: allPostData,
                id: 0,
              });
            }
          }}
          style={styles.itemButon}>
          {lastItemPostUrl != '' ? (
            <View style={[styles.itemContainer, {}]}>
              {fileType === postFileType.Image ? (
                <CustomImage
                  imageSource={lastItemPostUrl}
                  style={styles.img}
                  resizeMode="cover"
                />
              ) : fileType === postFileType.Video ? (
                <PostPlayVideo uri={lastItemPostUrl} width={width / 2.1} />
              ) : (
                <LinearGradient
                  colors={Colors.gradientDivider}
                  style={styles.container}>
                  <Text style={styles.wrongFormatTxt}>
                    {Strings.wrongFormatTxt}
                  </Text>
                </LinearGradient>
              )}
            </View>
          ) : (
            <View
              style={[
                styles.itemContainer,
                {backgroundColor: Colors.white},
              ]}></View>
          )}
        </TouchableOpacity>
        <HelveticaRegularText
          text={item?.title}
          fontSize={16}
          color={Colors.white}
          mt={2}
          ml={3}
          textAlign={'left'}
          width={'100%'}
        />
      </View>
    );
  };
  const flatlistData = useMemo(() => {
    let obj = {
      id: 0,
      title: 'All Posts',
      collections: [
        {
          id: 0,
          isDeleted: false,
          post: {
            id: 0,
            isDeleted: false,
            fileUrl: lastPostUrl,
            fileType: lastPostFileType,
          },
        },
      ],
    };
    let tempArray = [];
    tempArray.push(obj);
    dataBaseCollections?.pages.forEach(element => {
      tempArray.push(element);
    });
    return tempArray;
  }, [dataBaseCollections?.pages, lastPostUrl, lastPostFileType]);
  return (
    <CustomContainer
      style={styles.screencContainer}
      isLoading={isLoading || isLoaddingAllPosts}>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        onEndReachedThreshold={0.9}
        onEndReached={() => {
          if (hasNextPage) {
            fetchNextPage();
          }
        }}
        onRefresh={refetch}
        refreshing={isRefetching}
        data={flatlistData}
        numColumns={2}
        style={{width: '100%'}}
        contentContainerStyle={{justifyContent: 'space-between'}}
        renderItem={renderItem}
      />
    </CustomContainer>
  );
}

export default CollectionProfileScreen;

const styles = StyleSheet.create({
  screencContainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 15,
  },
  itemContainer: {
    margin: 1,
    width: width / 2,
    height: width / 2 + 10,
  },
  img: {
    width: width / 2,
    height: width / 2 + 10,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: width / 2,
    height: width / 2 + 10,
  },
  wrongFormatTxt: {
    color: Colors.white,
    textAlign: 'center',
  },
  detailButon: {
    width: width / 2.2,
    height: width / 2.2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
    margin: 1,
    borderRadius: 16,
    borderColor: Colors.onBackground,
    borderWidth: 1,
    overflow: 'hidden',
    marginLeft: 10,
  },
  addButton: {
    width: width / 2.2,
    height: width / 2.2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
    margin: 1,
    borderRadius: 16,
    borderColor: Colors.onBackground,
    borderWidth: 1,
  },
  itemButon: {
    width: width / 2.2,
    height: width / 2.2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
    borderRadius: 16,
    borderColor: Colors.onBackground,
    borderWidth: 1,
    overflow: 'hidden',
    margin: 1,
    marginHorizontal: 5,
  },
});
