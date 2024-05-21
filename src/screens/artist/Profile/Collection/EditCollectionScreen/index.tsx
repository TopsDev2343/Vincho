import {Button, Image, View} from 'native-base';
import React, {useEffect, useState} from 'react';
import CustomContainer from '~/components/atoms/CustomContainer';
import {Colors} from '~/styles/colors';
import {post} from '~/assets/icons';
import {SvgXml} from 'react-native-svg';
import {FlatList, StyleSheet} from 'react-native';
import HelveticaRegularText from '~/components/atoms/HelveticaRegularText';
import {goBack} from '~/navigation/methods';
import {width} from '~/utils/dimension';
import {useGetPostSaves} from '~/hooks/artist/Posts';
import {Strings} from '~/assets/strings';
import {
  BackButton,
  CustomKeyboardAwareScrollView,
  CustomPostItem,
  CustomUnderlineInput,
  PostPlayVideo,
} from '~/components';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {FormProvider, useForm} from 'react-hook-form';
import {verticalScale} from 'react-native-size-matters';
import {useUpdateCollection} from '~/hooks/artist/Collection';
import {SortEnumType} from '~/generated/graphql';
import snackBar from '~/utils/snackBar';
import {messageHelper} from '~/utils/messageHelper';
import {useAuthStore} from '~/stores';

const schema = yup.object().shape({
  name: yup.string().required('Required'),
});

function EditCollectionScreen({route}: {route: any}) {
  const entityId = route?.params?.entityId;
  const collections = route?.params?.collections;
  const title = route?.params?.title;
  const {userId} = useAuthStore(state => state);
  const [order] = useState<object | undefined>({id: SortEnumType.Desc});
  const {isRefetching, isLoading, data, fetchNextPage, hasNextPage, refetch} =
    useGetPostSaves({
      order,
      where: {userId: {eq: userId}},
    });
  const lastData = data?.pages?.[0];
  const [itemsId, setItemsId] = useState([]);

  useEffect(() => {
    let array = [];
    collections.forEach(element => {
      array.push(element.post.id);
    });
    setItemsId(array);
  }, [collections]);

  const {...methods} = useForm<Record<string, any>, object>({
    resolver: yupResolver<yup.AnyObjectSchema>(schema),
    mode: 'onChange',
  });
  const {handleSubmit, register, formState, setValue, getValues} = methods;

  const {mutate: mutateUpdate, isLoading: isUpdating} = useUpdateCollection();

  const selectItem = (item: any) => {
    var checkExist = itemsId.filter((x: number) => x === item?.id);
    if (checkExist.length == 0) {
      setItemsId([...itemsId, item?.id]);
    } else {
      let excludeItems = itemsId.filter((x: number) => x != item?.id);
      setItemsId(excludeItems);
    }
  };
  const renderItem = ({item, index}) => {
    item = item.post;
    let checkExist = itemsId.filter((x: number) => x === item?.id);
    return (
      <CustomPostItem
        checkExist={checkExist}
        item={item}
        width={width / 3.1}
        onPress={() => {
          selectItem(item);
        }}
      />
    );
  };

  function onSubmit(formData: any) {
    const input = {
      id: entityId,
      title: formData.name,
    };
    mutateUpdate(
      {input: input, postIds: itemsId},
      {
        onSuccess: successData => {
          if (
            successData.baseCollection_updateBaseCollection?.status.value ===
            'Success'
          ) {
          } else {
            snackBar(
              messageHelper(
                successData.baseCollection_updateBaseCollection?.status.value,
              ),
            );
          }
          goBack();
        },
      },
    );
  }

  useEffect(() => {
    setValue('name', title);
  }, []);

  return (
    <CustomContainer style={{flex: 1}}>
      <CustomKeyboardAwareScrollView>
        <BackButton />
        <FormProvider {...methods}>
          <Button
            variant="link"
            justifyContent="flex-start"
            alignItems="flex-end"
            onPress={handleSubmit(onSubmit)}
            isLoading={isUpdating}
            alignSelf={'flex-end'}
            mt={verticalScale(-5)}>
            <HelveticaRegularText
              fontSize={16}
              color={Colors.primary}
              text={Strings.save}
            />
          </Button>

          <CustomUnderlineInput
            color={Colors.txtLight}
            {...register('name')}
            placeholder={Strings.collectionName}
            {...{formState}}
            validation
          />

          <HelveticaRegularText
            fontSize={16}
            color={Colors.txtMedium}
            text={'Choose posts to add this collection'}
            p={6}
            pb={0}
          />
        </FormProvider>

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
            onRefresh={refetch}
            refreshing={isRefetching}
            showsVerticalScrollIndicator={false}
            data={data?.pages}
            extraData={itemsId}
            numColumns={3}
            style={{width: '100%'}}
            contentContainerStyle={{
              justifyContent: 'center',
              alignSelf: 'flex-start',
              marginTop: verticalScale(30),
            }}
            renderItem={renderItem}
          />
        )}

        {!lastData && !isLoading && (
          <View
            justifyContent={'center'}
            alignItems={'center'}
            flex={1}
            pt={20}>
            <SvgXml width="42" height="42" xml={post} />
            <HelveticaRegularText
              text={'There is no post to add to this collection.'}
              fontSize={16}
              color={Colors.cleanWhite}
              mt={6}
              textAlign={'center'}
            />
          </View>
        )}
      </CustomKeyboardAwareScrollView>
    </CustomContainer>
  );
}

export default EditCollectionScreen;

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
});
