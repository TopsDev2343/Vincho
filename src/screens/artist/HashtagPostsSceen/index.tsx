import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  CustomContainer,
  AlternativeScreen,
  AvatarWithTitle,
  HelveticaRegularText,
  CustomImage,
} from '~/components';
import {BackButton} from '~/components';
import {scale, verticalScale} from 'react-native-size-matters';
import {useGetExplorePostsByHashtagID} from '~/hooks/artist/Posts';
import {FlatList, HStack, VStack, View as NativeBaseView} from 'native-base';
import {Strings} from '~/assets/strings';
import {windowHeight, windowWidth} from '~/styles/globalStyles';
import {postFileType} from '~/@types/global';
import {navigateDispatch} from '~/navigation/methods';
import {Colors} from '~/styles/colors';
import moment from 'moment';
import Video from 'react-native-video';
import {getFullImageUrl} from '~/hooks/artist/Upload';

const HashtagPostsSceen = ({route}: {route: any}) => {
  const entityId = route.params?.entityId;
  const hashtagsId = [entityId];
  const {
    isLoading,
    data,
    isSuccess,
    isError,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useGetExplorePostsByHashtagID({hashtagIds: hashtagsId});

  const onLoadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  function renderPostsItem({item, index}: {item: any; index: number}) {
    let fileUrl = getFullImageUrl(item?.fileUrl);
    return (
      <CustomContainer style={{flex: 1, marginTop: 16}}>
        <TouchableOpacity
          onPress={() => {
            navigateDispatch('PostDetail', {entityId: item?.id});
          }}>
          <View style={styles.SectionTopChat}>
            <View style={styles.sectionHeaderContainer}>
              <View style={styles.sectionHeaderInfoContainer}>
                <AvatarWithTitle
                  uri={item?.user?.photoUrl}
                  onPress={() => {}}
                  width={scale(50)}
                  height={scale(50)}
                  name={
                    item?.user?.fullName
                      ? `${item?.user?.fullName}`
                      : item?.user?.userName
                  }
                />
                <VStack
                  justifyContent={'space-between'}
                  ml={4}
                  height={scale(48)}>
                  <HelveticaRegularText
                    text={item?.user?.userName}
                    fontSize={16}
                    color={Colors.txtLight}
                    ml={2}
                  />
                  <HelveticaRegularText
                    text={moment
                      .utc(item?.createdDate)
                      .local()
                      .startOf('seconds')
                      .fromNow()}
                    fontSize={12}
                    color={Colors.txtMedium}
                    ml={2}
                  />
                </VStack>
              </View>

              <View style={{flex: 1}}></View>
            </View>
          </View>
          <View style={styles.container}>
            {item?.fileType === postFileType.Image ? (
              <CustomImage
                imageSource={fileUrl}
                style={styles.img}
                resizeMode="cover"
              />
            ) : item?.fileType === postFileType.Video ? (
              <View style={styles.video}>
                <Video
                  source={{uri: fileUrl}}
                  resizeMode={'cover'}
                  paused={true}
                  style={styles.videoItem}
                  disableBack
                />
              </View>
            ) : (
              <View></View>
            )}
            <NativeBaseView px={4} pt={4}>
              <HStack>
                <View>
                  <HelveticaRegularText
                    text={
                      item?.postLikeCount
                        ? item?.postLikeCount + ' Likes'
                        : '0 Likes'
                    }
                    fontSize={14}
                    color={Colors.txtLight}
                  />
                </View>
                <View>
                  <HelveticaRegularText
                    text={
                      item?.commentCount
                        ? item?.commentCount + ' Comments'
                        : '0 Comments'
                    }
                    fontSize={14}
                    pl={4}
                    color={Colors.txtLight}
                  />
                </View>
              </HStack>

              <HelveticaRegularText
                text={item?.caption}
                fontSize={14}
                py={4}
                textAlign={'justify'}
                color={Colors.txtLight}
              />
            </NativeBaseView>
          </View>
        </TouchableOpacity>
      </CustomContainer>
    );
  }

  function listEmpty() {
    return (
      <View style={styles.emptyTxt}>
        <AlternativeScreen msg={Strings.emptyString} />
      </View>
    );
  }

  return (
    <CustomContainer
      isLoading={isLoading}
      isError={isError}
      errorMsg={'Something went wrong!'}
      onPress={refetch()}>
      <BackButton />

      {isSuccess && (
        <View style={{flex: 1}}>
          <FlatList
            extraData={data}
            style={styles.container}
            data={data?.pages}
            renderItem={renderPostsItem}
            keyExtractor={item => item?.id.toString()}
            onEndReachedThreshold={0.5}
            onEndReached={({distanceFromEnd}) => {
              if (distanceFromEnd < 0) return;
              onLoadMore();
            }}
            ListEmptyComponent={!isLoading || data != null ? listEmpty : null}
          />
        </View>
      )}
    </CustomContainer>
  );
};

export default HashtagPostsSceen;

const styles = StyleSheet.create({
  emptyTxt: {
    width: windowWidth,
  },
  container: {
    flex: 1,
  },
  gradientContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    width: windowWidth,
    bottom: windowHeight - windowHeight * 0.5,
  },
  img: {
    width: windowWidth,
    height: windowHeight - windowHeight * 0.5,
  },
  video: {
    width: windowWidth,
    height: windowHeight * 0.5,
  },
  videoItem: {
    width: windowWidth,
    height: windowHeight - windowHeight * 0.5,
    backgroundColor: 'pink',
  },
  SectionTopChat: {
    backgroundColor: Colors.background,
    width: '100%',
    flexDirection: 'row',
    height: verticalScale(54),
    marginBottom: 10,
  },
  avatar: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eaeaea',
  },
  sectionHeaderContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  sectionHeaderInfoContainer: {
    flex: 9,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 20,
  },
  reportContainer: {
    alignSelf: 'center',
    position: 'absolute',
    top: 20,
    left: windowWidth / 4.5,
    backgroundColor: Colors.onBackground,
    zIndex: 100,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Colors.warning,
    padding: 10,
    flexDirection: 'row',
  },
});
