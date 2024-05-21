import React from 'react';
import { HStack } from 'native-base';

import { coloredComment, coloredLike, coloredDislike, coloredSend } from '~/assets/icons';
import { PostBtnRowItem } from '~/components';

const PostBtnRow = ({ likeOnPress, commentOnPress, forwardOnPress, isLiked, isLoading }:
     { likeOnPress: any, commentOnPress: any, forwardOnPress: any, isLiked: boolean, isLoading: boolean }) => {

     return (

          <HStack justifyContent={'space-around'} mt="6" mx="3" mb="6">

               <PostBtnRowItem icon={coloredComment} onPress={commentOnPress} />
               <PostBtnRowItem icon={isLiked ? coloredLike : coloredDislike}
                    onPress={likeOnPress} isLoading={isLoading} isLike={true} />
               <PostBtnRowItem icon={coloredSend} onPress={forwardOnPress} />

          </HStack>
     )
}
export default PostBtnRow;
