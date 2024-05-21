import {View} from 'native-base';
import React from 'react';
import CustomContainer from '~/components/atoms/CustomContainer';
import {Colors} from '~/styles/colors';
import {FlatList, StyleSheet} from 'react-native';
import HelveticaRegularText from '~/components/atoms/HelveticaRegularText';
import {width} from '~/utils/dimension';
import {
  BackButton,
  CustomKeyboardAwareScrollView,
  CustomPostItem,
} from '~/components';
import {scale, verticalScale} from 'react-native-size-matters';
import {useGetBaseCollectionById} from '~/hooks/artist/Collection';
import {navigate} from '~/navigation/methods';

function CollectionDetailScreen({route}: {route: any}) {
  const id = route?.params?.id;
  const data = route?.params?.data;
  const title = route?.params?.title;
  const {data: baseCollectionData, isLoading} = useGetBaseCollectionById(id);
  const renderItem = ({item, index}) => {
    item = item.post;
    return (
      <CustomPostItem
        checkExist={[]}
        item={item}
        width={width / 3.1}
        onPress={() => {
          navigate('PostDetail', {
            entityId: item.id,
          });
        }}
      />
    );
  };
  return (
    <CustomContainer style={{flex: 1}} isLoading={isLoading}>
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
            <View width={scale(40)}></View>
          </View>
        </View>
        <FlatList
          keyExtractor={(item, index) =>
            item?.id ? item?.id?.toString() : index.toString()
          }
          data={
            id == 0
              ? data.pages
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
