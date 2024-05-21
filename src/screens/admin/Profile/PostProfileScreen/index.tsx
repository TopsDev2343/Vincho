import {Image, View} from 'native-base';
import React, {useState} from 'react';
import CustomContainer from '~/components/atoms/CustomContainer';
import {Colors} from '~/styles/colors';
import {post} from '~/assets/icons';
import {SvgXml} from 'react-native-svg';
import {FlatList, StyleSheet, Text, TouchableOpacity} from 'react-native';
import HelveticaRegularText from '~/components/atoms/HelveticaRegularText';
import {navigate} from '~/navigation/methods';
import {width} from '~/utils/dimension';
import {useGetPosts} from '~/hooks/artist/Posts';
import {postFileType} from '~/@types/global';
import LinearGradient from 'react-native-linear-gradient';
import {Strings} from '~/assets/strings';
import {CustomImage, PostPlayVideo} from '~/components';

function PostProfileScreen({entityId}: {entityId: number}) {
  const [where] = useState<object | undefined>({userId: {eq: entityId}});
  const {isRefetching, isLoading, data, fetchNextPage, hasNextPage, refetch} =
    useGetPosts({where, order: {id: 'DESC'}});
  const lastData = data?.pages?.[0];

  const renderItem = ({item, index}) => {
    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity
          onPress={() => {
            navigate('PostDetail', {entityId: item?.id});
          }}>
          {item?.fileType === postFileType.Image ? (
            <CustomImage
              imageSource={item.fileUrl}
              resizeMode={'cover'}
              style={styles.img}
            />
          ) : item?.fileType === postFileType.Video ? (
            <PostPlayVideo uri={item?.fileUrl} width={width / 3.1} />
          ) : (
            <LinearGradient
              colors={Colors.gradientDivider}
              style={styles.container}>
              <Text style={styles.wrongFormatTxt}>
                {Strings.wrongFormatTxt}
              </Text>
            </LinearGradient>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <CustomContainer
      style={{
        flex: 1,
      }}>
      {lastData && (
        <FlatList
          keyExtractor={(item, index) =>
            item?.id ? item?.id?.toString() : index.toString()
          }
          onEndReachedThreshold={0.9}
          onEndReached={() => {
            if (hasNextPage) {
              fetchNextPage();
            }
          }}
          bounces={false}
          onRefresh={refetch}
          refreshing={isRefetching}
          showsVerticalScrollIndicator={false}
          data={data?.pages}
          numColumns={3}
          style={{width: '100%', height: '100%'}}
          contentContainerStyle={{
            justifyContent: 'center',
            alignSelf: 'flex-start',
          }}
          renderItem={renderItem}
        />
      )}

      {!lastData && !isLoading && (
        <View justifyContent={'center'} alignItems={'center'} flex={1} pt={20}>
          <SvgXml width="42" height="42" xml={post} />
          <HelveticaRegularText
            text={'There is no post to show.'}
            fontSize={16}
            color={Colors.cleanWhite}
            mt={6}
            textAlign={'center'}
          />
        </View>
      )}
    </CustomContainer>
  );
}

export default PostProfileScreen;

const styles = StyleSheet.create({
  itemContainer: {
    margin: 1,
    width: width / 3.1,
    height: width / 3.1,
  },
  img: {
    width: width / 3.1,
    height: width / 3.1,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: width / 3.1,
    height: width / 3.1,
  },
  wrongFormatTxt: {
    color: Colors.white,
    textAlign: 'center',
  },
});
