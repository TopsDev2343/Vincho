import React from 'react';
import {FlatList} from 'react-native';
import {GalleryItemShow, OpenCameraBtn} from '~/components';

const TopicPostGalleryList = ({
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
        openGallery={openGallery}
        item={item}
        setSelectedPost={setSelectedPost}
        itemWidth={0.25}
        openCamera={openCamera}
      />
    );
  }

  function renderHeaderItem() {
    return <OpenCameraBtn onPressOpenCamera={openCamera} itemWidth={0.3} />;
  }

  return (
    <FlatList
      horizontal={true}
      bounces={false}
      data={album}
      renderItem={renderGalleryItem}
      ListHeaderComponent={renderHeaderItem}
      keyExtractor={item => item?.node?.modified}
    />
  );
};
export default TopicPostGalleryList;
