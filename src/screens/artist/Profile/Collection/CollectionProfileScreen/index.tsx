import {HStack, View} from 'native-base';
import React, {useState} from 'react';
import CustomContainer from '~/components/atoms/CustomContainer';
import {Colors} from '~/styles/colors';
import {SvgXml} from 'react-native-svg';
import {FlatList, StyleSheet, Text, TouchableOpacity} from 'react-native';
import HelveticaRegularText from '~/components/atoms/HelveticaRegularText';
import {navigate} from '~/navigation/methods';
import {width} from '~/utils/dimension';
import {useGetBaseCollections} from '~/hooks/artist/Collection';
import {View as NativeBaseView} from 'native-base';
import {scale} from 'react-native-size-matters';
import {collectionPlus} from '~/assets/icons';
import {useGetPostSaves} from '~/hooks/artist/Posts';
import {SortEnumType} from '~/generated/graphql';
import {CustomImage, PostPlayVideo} from '~/components';
import LinearGradient from 'react-native-linear-gradient';
import {postFileType} from '~/@types/global';
import {Strings} from '~/assets/strings';
import {useAuthStore} from '~/stores';

function CollectionProfileScreen() {
  const {userId} = useAuthStore(state => state);
  const [lastPostUrl, setLastPostUrl] = useState('');
  const [lastPostFileType, setLastPostFileType] = useState('');
  const [order] = useState<object | undefined>({id: SortEnumType.Desc});
  const [where] = useState<object | undefined>({
    collections: {all: {post: {isDeleted: {eq: false}}}},
    userId: {eq: userId},
  });
  const {isRefetching, isLoading, data, fetchNextPage, hasNextPage, refetch} =
    useGetBaseCollections({where: where});

  const {data: allPostData, isLoading: isLoaddingAllPosts} = useGetPostSaves({
    where: {userId: {eq: userId}},
    order,
    options: {
      onSuccess: data => {
        if (data.pages.length > 0) {
          setLastPostUrl(data.pages[0]?.post?.fileUrl);
          setLastPostFileType(data.pages[0]?.post?.fileType);
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
      <View mt={2} flex={1} alignItems={'flex-start'}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            navigate('CollectionDetail', {
              title: item?.title,
              id: item.id,
              collections: item.collections,
            });
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
        ListHeaderComponent={() => (
          <HStack>
            <View>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  navigate('AddCollection');
                }}
                style={styles.addButton}>
                <NativeBaseView
                  borderRadius={100}
                  justifyContent={'center'}
                  alignItems={'center'}
                  backgroundColor={'rgb(71,54,75)'}
                  width={scale(61)}
                  height={scale(61)}
                  borderWidth={1}
                  borderColor={'rgba(255,255,255,0.5)'}>
                  <SvgXml
                    width={scale(24)}
                    height={scale(24)}
                    xml={collectionPlus}
                  />
                </NativeBaseView>
              </TouchableOpacity>
              <HelveticaRegularText
                text={'Add New Collection'}
                fontSize={16}
                color={Colors.white}
                mt={2}
                ml={1}
              />
            </View>

            {lastPostUrl != '' ? (
              <View>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    navigate('CollectionDetail', {
                      title: 'All Posts',
                      id: 0,
                    });
                  }}
                  style={styles.detailButon}>
                  {lastPostUrl != '' ? (
                    <View style={styles.itemContainer}>
                      {lastPostFileType === postFileType.Image ? (
                        <CustomImage
                          imageSource={lastPostUrl}
                          style={styles.img}
                          resizeMode="cover"
                        />
                      ) : lastPostFileType === postFileType.Video ? (
                        <PostPlayVideo uri={lastPostUrl} width={width / 2.1} />
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
                  text={'All Posts'}
                  fontSize={16}
                  color={Colors.white}
                  mt={2}
                  ml={3}
                />
              </View>
            ) : (
              <View />
            )}
          </HStack>
        )}
        onRefresh={refetch}
        refreshing={isRefetching}
        data={data?.pages}
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
