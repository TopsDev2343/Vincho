import React, {useRef, useState} from 'react';
import {
  Animated,
  PanResponder,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  useOptionMenuStore,
  useClickedPostInfoStore,
  usePostModalStore,
  useAuthStore,
  useAuthModalStore,
} from '~/stores';
import {windowHeight, windowWidth} from '~/styles/globalStyles';
import {postFileType} from '~/@types/global';
import {ExploreImgPost, ExploreWrongPost, ExploreVideoPost} from '~/components';
import {useCreatePostSavet, useCreatePostView} from '~/hooks/artist/Posts';
import {navigate} from '~/navigation/methods';
import {queryClient} from '~/graphql/AuthProvider';

const ExplorePost = ({
  item,
  index,
  goToNext,
}: {
  item?: any;
  index: any;
  goToNext: any;
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const {mutate: mutateCreateView} = useCreatePostView();
  const {mutate: mutateCreateSave} = useCreatePostSavet();

  const {userId} = useAuthStore(state => state);
  const {setShowAuthModal} = useAuthModalStore(state => state);

  //For option menu modal (copy, share, report)
  const {setOptionMenuModal} = useOptionMenuStore(state => state);

  //For saving each post info to use in modals
  const {setPostInfo} = useClickedPostInfoStore(state => state);

  //For show and hide post modal
  const {setShowPostModal} = usePostModalStore(state => state);

  //For post animation (Swipe left and right)

  const position = useRef(new Animated.ValueXY()).current;
  let rotate = position.x.interpolate({
    inputRange: [-windowWidth / 2, 0, windowWidth / 2],
    outputRange: ['-30deg', '0deg', '10deg'],
    extrapolate: 'clamp',
  });
  let rotateAndTranslate = {
    transform: [
      {
        rotate: rotate,
      },
      ...position.getTranslateTransform(),
    ],
  };
  function saveOnPress() {
    if (userId) {
      const input = {postId: item?.id};
      mutateCreateSave(input as any, {
        onSuccess: successData => {
          queryClient.invalidateQueries('getBaseCollections');
          queryClient.invalidateQueries('getPostSave');
          queryClient.invalidateQueries('getActivitiesByUserId');
        },
      });
    }
  }

  function skipPost() {
    if (userId) {
      const input = {userId: userId, postId: item?.id};
      mutateCreateView(input as any, {
        onSuccess: successData => {
          if (
            successData?.postView_createPostView?.status?.value === 'Success'
          ) {
            goToNext(index + 1);
          } else {
            goToNext(index + 1);
          }
          setLoading(false);
        },
      });
    } else {
      goToNext(index + 1);
    }
  }

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        position.setValue({x: gestureState.dx, y: gestureState.dy});
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx > 120) {
          Animated.spring(position, {
            toValue: {x: windowWidth + 100, y: gestureState.dy},
            useNativeDriver: true,
            speed: 100,
            isInteraction: true,
          }).start(() => {
            //goToNext(index + 1);
            setLoading(true);
            saveOnPress();
            skipPost();
            position.setValue({x: 0, y: 0});
          });
        } else if (gestureState.dx < -120) {
          Animated.spring(position, {
            toValue: {x: -windowWidth - 100, y: gestureState.dy},
            useNativeDriver: true,
            speed: 100,
            isInteraction: true,
          }).start(() => {
            setLoading(true);
            skipPost();
            position.setValue({x: 0, y: 0});
          });
        } else {
          Animated.spring(position, {
            toValue: {x: 0, y: 0},
            friction: 4,
            useNativeDriver: true,
          }).start();
        }
      },
    }),
  ).current;
  return (
    <Animated.View
      style={[
        rotateAndTranslate,
        {
          height: windowHeight,
          width: windowWidth,
        },
      ]}
      {...panResponder.panHandlers}>
      {!loading ? (
        <View style={{flex: 1}}>
          {item?.fileType === postFileType.Image ? (
            <ExploreImgPost
              item={item}
              imgOnPress={() => {
                item?.userId != userId
                  ? navigate('OtherUserProfile', {
                      entityId: item?.userId,
                    })
                  : navigate('Profile');
              }}
              menuOnPress={() => [
                setPostInfo(item),
                setOptionMenuModal({
                  showModal: true,
                  isTopicPost: false,
                }),
              ]}
            />
          ) : item?.fileType === postFileType.Video ? (
            <ExploreVideoPost
              item={item}
              imgOnPress={() => {
                item?.userId != userId
                  ? navigate('OtherUserProfile', {
                      entityId: item?.userId,
                    })
                  : navigate('Profile');
              }}
              menuOnPress={() => [
                setPostInfo(item),
                setOptionMenuModal({
                  showModal: true,
                  isTopicPost: false,
                }),
              ]}
            />
          ) : (
            <ExploreWrongPost
              item={item}
              imgOnPress={() => {
                item?.userId != userId
                  ? navigate('OtherUserProfile', {
                      entityId: item?.userId,
                    })
                  : navigate('Profile');
              }}
              menuOnPress={() => [
                setPostInfo(item),
                setOptionMenuModal({
                  showModal: true,
                  isTopicPost: false,
                }),
              ]}
            />
          )}
        </View>
      ) : null}

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          setPostInfo(item);
          if (userId) {
            setShowPostModal(true);
          } else {
            setShowAuthModal(true);
          }
        }}
        style={styles.moreInfoBtn}></TouchableOpacity>
    </Animated.View>
  );
};
export default ExplorePost;

const styles = StyleSheet.create({
  moreInfoBtn: {
    width: windowWidth * 0.55,
    height: windowHeight * 0.65,
    position: 'absolute',
    bottom: windowHeight * 0.25,
    marginHorizontal: windowWidth * 0.5,
    alignSelf: 'center',
    // backgroundColor: 'green',
  },
});
