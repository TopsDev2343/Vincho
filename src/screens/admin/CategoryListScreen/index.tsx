import {Box, FlatList} from 'native-base';
import React, {useState} from 'react';

import {
  AlternativeScreen,
  BackButton,
  CustomButton,
  CustomContainer,
} from '~/components';
import {useGetCategories} from '~/hooks/artist/Categories';
import {Strings} from '~/assets/strings';
import {scale} from 'react-native-size-matters';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Colors} from '~/styles/colors';
import {Fonts} from '~/styles/fonts';
import {navigate} from '~/navigation/methods';

const CategoryListScreen = () => {
  const {
    isLoading,
    data,
    isSuccess,
    isError,
    refetch: refetchGetUserTopics,
    isRefetching,
    hasNextPage,
    fetchNextPage,
  } = useGetCategories(undefined, {id: 'DESC'});
  function renderItem({item}: {item: any}) {
    return (
      <View style={styles.container}>
        <Text style={styles.titleTxt}>{item?.title}</Text>

        <Text style={styles.descTxt} numberOfLines={2}>
          {item?.postCount != null ? item?.postCount : 0} Posts -
          {item?.likeCount != null ? item?.likeCount : 0} Likes -
          {item?.commentCount != null ? item?.commentCount : 0} Comments
        </Text>
      </View>
    );
  }

  function listEmpty() {
    return <AlternativeScreen msg={Strings.noCategory} />;
  }

  return (
    <CustomContainer
      isLoading={isLoading}
      isError={isError}
      errorMsg={'Something went wrong!'}
      onPress={() => {
        refetchGetUserTopics();
      }}>
      <BackButton />
      <View style={{flex: 9}}>
        {isSuccess ? (
          <Box flex={1}>
            <FlatList
              style={{marginTop: scale(12)}}
              extraData={data}
              horizontal={false}
              data={data?.pages}
              renderItem={renderItem}
              keyExtractor={item => item?.id.toString()}
              ListEmptyComponent={!isLoading ? listEmpty : null}
              onEndReachedThreshold={0.9}
              onEndReached={() => {
                if (hasNextPage) {
                  fetchNextPage();
                }
              }}
              onRefresh={refetchGetUserTopics}
              refreshing={isRefetching}
            />
          </Box>
        ) : null}
      </View>
      <View style={{flex: 1}}>
        <CustomButton
          title={'Add New Category'}
          titleColor={Colors.txtDark}
          backColor={Colors.primary}
          isLoading={false}
          containerStyle={{flex: 1, justifyContent: 'flex-end'}}
          onPress={() => {
            navigate('AddCategory');
          }}
        />
      </View>
    </CustomContainer>
  );
};

export default CategoryListScreen;
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scale(16),
    marginTop: scale(16),
  },

  titleTxt: {
    color: Colors.txtLight,
    ...Fonts.smallReg,
    textAlign: 'left',
    lineHeight: scale(18),
  },

  descTxt: {
    color: Colors.txtMedium,
    ...Fonts.verySmallReg,
    textAlign: 'left',
  },
});
