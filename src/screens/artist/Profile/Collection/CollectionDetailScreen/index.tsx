import {Image, View} from 'native-base';
import React, {useState} from 'react';
import CustomContainer from '~/components/atoms/CustomContainer';
import {Colors} from '~/styles/colors';
import {FlatList, StyleSheet} from 'react-native';
import HelveticaRegularText from '~/components/atoms/HelveticaRegularText';
import {width} from '~/utils/dimension';
import {
  BackButton,
  CollectionMenu,
  CustomKeyboardAwareScrollView,
  CustomPostItem,
} from '~/components';
import {scale, verticalScale} from 'react-native-size-matters';
import MoreOptionsButton from '~/components/atoms/MoreOptionsButton';
import {useAuthStore, useCollectionStore} from '~/stores';
import {useGetBaseCollectionById} from '~/hooks/artist/Collection';
import {navigate} from '~/navigation/methods';
import {useGetPostSaves} from '~/hooks/artist/Posts';
import {SortEnumType} from '~/generated/graphql';

function CollectionDetailScreen({route}: {route: any}) {
  const id = route?.params?.id;
  const title = route?.params?.title;
  const {userId} = useAuthStore(state => state);
  const {data: baseCollectionData, isLoading} = useGetBaseCollectionById(id);
  const {setShowCollectionModal} = useCollectionStore(state => state);
  const [order] = useState<object | undefined>({id: SortEnumType.Desc});

  const {data: allPostData, isLoading: isLoaddingAllPosts} = useGetPostSaves({
    where: {userId: {eq: userId}},
    order,
    enabled: id == 0 ? true : false,
  });

  const renderItem = ({item, index}) => {
    let collectionId = item.id;
    item = item.post;
    return (
      <CustomPostItem
        checkExist={[]}
        item={item}
        width={width / 3.1}
        onPress={() => {
          id > 0
            ? navigate('CollectionPostDetail', {
                entityId: item.id,
                baseCollectionId: id,
                collectionId: collectionId,
              })
            : navigate('PostDetail', {
                entityId: item.id,
                showDeleteFromCollection: true,
              });
        }}
      />
    );
  };
  return (
    <CustomContainer
      style={{flex: 1}}
      isLoading={isLoading || isLoaddingAllPosts}>
      <CustomKeyboardAwareScrollView>
        <View style={styles.SectionTopchat}>
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
            }}>
            <BackButton />
            <HelveticaRegularText
              text={
                id == 0
                  ? title
                  : baseCollectionData?.baseCollection_getBaseCollection?.result
                      ?.title
              }
              fontSize={16}
              color={Colors.white}
              ml={scale(-35)}
            />
            <View width={scale(40)}>
              {id > 0 && (
                <MoreOptionsButton
                  onPress={() => {
                    setShowCollectionModal(true);
                  }}
                />
              )}
            </View>
          </View>
        </View>
        <FlatList
          keyExtractor={(item, index) =>
            item?.id ? item?.id?.toString() : index.toString()
          }
          data={
            id == 0
              ? allPostData?.pages
              : baseCollectionData?.baseCollection_getBaseCollection?.result
                  ?.collections
          }
          numColumns={3}
          style={{width: '100%'}}
          contentContainerStyle={{
            justifyContent: 'center',
            alignSelf: 'flex-start',
            marginTop: verticalScale(30),
          }}
          renderItem={renderItem}
        />
        <CollectionMenu
          entityId={id}
          collections={
            baseCollectionData?.baseCollection_getBaseCollection?.result
              ?.collections
          }
          title={
            baseCollectionData?.baseCollection_getBaseCollection?.result?.title
          }
        />
      </CustomKeyboardAwareScrollView>
    </CustomContainer>
  );
}

export default CollectionDetailScreen;

const styles = StyleSheet.create({
  itemContainer: {
    margin: 2,
    width: width / 3.1,
    height: width / 3.1 + 10,
    borderRadius: 4,
  },
  img: {
    width: width / 3.1,
    height: width / 3.1 + 10,
    borderRadius: 4,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: width / 3.1,
    height: width / 3.1 + 10,
  },
  wrongFormatTxt: {
    color: Colors.white,
    textAlign: 'center',
  },
  SectionTopchat: {
    width: '100%',
    flexDirection: 'row',
    height: verticalScale(48),
  },
});
