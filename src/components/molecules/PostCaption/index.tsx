import React from 'react';
import {Text, Box, HStack, Divider} from 'native-base';
import {TouchableOpacity, View} from 'react-native';
import {Colors} from '~/styles/colors';
import {customFonts} from '~/styles/fonts';
import {usePostLikeUserId, usePostModalStore} from '~/stores';
import {UserShortInfo, HashtagList} from '~/components';
import {showTimeAgoText} from '~/utils/showTimeAgoText';
import {navigate} from '~/navigation/methods';

const PostCaption = ({
  isPostModal = false,
  postInfo,
  comment,
}: {
  isPostModal?: boolean;
  postInfo: object;
  comment?: number;
}) => {
  const {postLikeUserId} = usePostLikeUserId(state => state);
  const {setShowPostModal} = usePostModalStore(state => state);
  const likeCount = postLikeUserId
    ? postLikeUserId?.length
    : postInfo?.likeCount
    ? postInfo?.likeCount
    : 0;
  const commentCount =
    comment != null
      ? comment
      : postInfo?.commentCount
      ? postInfo?.commentCount
      : 0;

  return (
    <Box>
      <View>
        <TouchableOpacity
          onPress={() => {
            isPostModal
              ? [
                  navigate('PostDetail', {entityId: postInfo.id}),
                  setShowPostModal(false),
                ]
              : navigate('PostDetail', {entityId: postInfo.id});
          }}>
          <UserShortInfo
            name={postInfo?.user?.userName}
            img={postInfo?.user?.photoUrl}
            onLineTime={showTimeAgoText(postInfo?.createdDate)}
          />
        </TouchableOpacity>

        <Text
          color={Colors.white}
          fontSize="md"
          fontFamily={customFonts.regular}
          my="6"
          mx="6">
          {postInfo?.caption}
        </Text>

        <HStack mx="4">
          <Text
            color={Colors.txtOverlay}
            fontSize="sm"
            fontFamily={customFonts.regular}
            mx="2">
            {likeCount > 1 ? `${likeCount} likes` : `${likeCount} like`}
          </Text>

          <Divider orientation="vertical" />

          <Text
            color={Colors.txtOverlay}
            fontSize="sm"
            fontFamily={customFonts.regular}
            mx="2">
            {commentCount > 1
              ? `${commentCount} comments`
              : `${commentCount} comment`}
          </Text>
        </HStack>

        <HashtagList
          hashtagData={postInfo?.postHashtags?.map(({hashtag}) => hashtag)}
        />
      </View>
    </Box>
  );
};

export default PostCaption;
