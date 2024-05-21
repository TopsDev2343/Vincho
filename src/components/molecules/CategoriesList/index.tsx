import React, {useCallback} from 'react';

import {StyleSheet, FlatList} from 'react-native';
import {CategoriesBtn} from '~/components';
import {windowWidth} from '~/styles/globalStyles';

const CategoriesList = ({
  categoryData,
  selectedCategory,
  setSelectedCategory,
  onLoadMore,
}: {
  categoryData: any;
  selectedCategory: number | undefined;
  setSelectedCategory: any;
  onLoadMore: any;
}) => {
  const selectCategory = useCallback(
    (selectedCategory: number) => {
      setSelectedCategory(selectedCategory);
    },
    [selectedCategory],
  );

  function renderItem({item}: {item: any}) {
    return (
      <CategoriesBtn
        item={item}
        selectCategory={selectCategory}
        selectedCategory={selectedCategory}
      />
    );
  }
  return (
    <FlatList
      style={styles.container}
      data={[{title: 'All', isActive: true, id: 0}, ...categoryData]}
      extraData={categoryData}
      renderItem={renderItem}
      keyExtractor={item => item?.id.toString()}
      horizontal
      showsHorizontalScrollIndicator={false}
      onEndReachedThreshold={0.5}
      onEndReached={({distanceFromEnd}) => {
        if (distanceFromEnd < 0) return;
        onLoadMore();
      }}
    />
  );
};
export default CategoriesList;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: windowWidth * 0.01,
    zIndex: -7,
  },
});
