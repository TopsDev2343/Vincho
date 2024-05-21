import React from 'react';
import {FlatList} from 'react-native';

import {GalleryItemShow} from '~/components';

const AddPostGalleryList = ({
  album,
  setSelectedPost,
  openGallery,
  openCamera,
}: {
  album: object[];
  setSelectedPost: any;
  openGallery: any;
  openCamera: any;
}) => {
  function renderGalleryItem({item}: {item: object}) {
    return (
      <GalleryItemShow
        item={item}
        setSelectedPost={setSelectedPost}
        openGallery={openGallery}
        itemWidth={0.3}
        openCamera={openCamera}
      />
    );
  }

  return (
    <FlatList
      contentContainerStyle={{
        justifyContent: 'center',
        alignSelf: 'flex-start',
      }}
      bounces={false}
      horizontal={false}
      data={[{node: null}, ...album]}
      renderItem={renderGalleryItem}
      numColumns={3}
      keyExtractor={item => item?.node?.modified}
    />
  );
};
export default AddPostGalleryList;
