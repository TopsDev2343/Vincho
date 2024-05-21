import React from 'react';
import {ScrollView} from 'react-native';

import {BackButton, CustomContainer, StatisticHomeBtn} from '~/components';
import {Strings} from '~/assets/strings';
import {navigate} from '~/navigation/methods';
import {
  useGetAllStatistics,
  useGetVideosStatistics,
} from '~/hooks/artist/Statistics';

const Statistics = () => {
  const {data, isLoading} = useGetAllStatistics();
  const {data: dataVideos} = useGetVideosStatistics();
  return (
    <CustomContainer isLoading={isLoading}>
      <BackButton />
      <ScrollView>
        <StatisticHomeBtn
          value={data?.user_getAllUsers?.result?.totalCount}
          title={Strings.totalUsers}
          onPress={() =>
            navigate('Users', {
              totalUsers: data?.user_getAllUsers?.result?.totalCount,
            })
          }
        />
        <StatisticHomeBtn
          value={data?.post_getPosts?.result?.totalCount}
          title={Strings.totalPhotoes}
          onPress={() =>
            navigate('Photoes', {
              totalPhotoes: data?.post_getPosts?.result?.totalCount,
            })
          }
        />
        <StatisticHomeBtn
          value={dataVideos?.post_getPosts?.result?.totalCount}
          title={Strings.totalVideos}
          onPress={() =>
            navigate('Videos', {
              totalVideos: dataVideos?.post_getPosts?.result?.totalCount,
            })
          }
        />
        <StatisticHomeBtn
          value={data?.postLike_getPostLikes?.result?.totalCount}
          title={Strings.totalLikes}
          onPress={() =>
            navigate('Likes', {
              totalLikes: data?.postLike_getPostLikes?.result?.totalCount,
            })
          }
        />

        <StatisticHomeBtn
          value={data?.comment_getComments?.result?.totalCount}
          title={Strings.totalComments}
          onPress={() =>
            navigate('Comments', {
              totalComments: data?.comment_getComments?.result?.totalCount,
            })
          }
        />
      </ScrollView>
    </CustomContainer>
  );
};

export default Statistics;
