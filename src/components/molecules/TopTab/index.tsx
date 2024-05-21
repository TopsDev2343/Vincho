

import React, { useCallback, } from 'react';
import { scale } from 'react-native-size-matters';

import { StyleSheet, FlatList } from 'react-native';
import { TopTabBtn } from '~/components';
import { windowWidth, windowHeight } from '~/styles/globalStyles';

const TopTab = ({ tabData, selectedTab, setSelectedTab }:
     { tabData: object[], selectedTab: number | undefined, setSelectedTab: any, }) => {

     const selectTab = useCallback((selectedTab: number) => {
          setSelectedTab(selectedTab)
     }, [selectedTab])

     function renderItem({ item }: { item: any }) {
          return (
               <TopTabBtn item={item} selectTab={selectTab}
                    selectedTab={selectedTab} />
          )
     }

     return (

          <FlatList
               style={styles.container}
               data={tabData}
               renderItem={renderItem}
               keyExtractor={item => item?.id.toString()}
               horizontal
               showsHorizontalScrollIndicator={false}
          />
     )
}
export default TopTab;

const styles = StyleSheet.create({
     container: {
          marginTop: windowHeight * 0.06,
          zIndex: -7,
          alignSelf: 'center'
     },

})