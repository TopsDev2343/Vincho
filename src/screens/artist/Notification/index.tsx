import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Switch, Text, View} from 'react-native';
import {scale} from 'react-native-size-matters';

import {CustomContainer} from '~/components';
import {BackButton} from '~/components';
import {notifStatus} from '~/utils/switchStatus';
import {SwitchItem} from '~/components';
import {useQueryClient} from 'react-query';
import {queryKeys} from '~/constants/queryKeys';
import {Colors} from '~/styles/colors';
import {Fonts} from '~/styles/fonts';
import {useUpdateNotification, useUpdateProfile} from '~/hooks/artist/User';
import snackBar from '~/utils/snackBar';
import {messageHelper} from '~/utils/messageHelper';
import {useAuthStore} from '~/stores';

const Notification = () => {
  const queryClient = useQueryClient();
  const [selectedList, setSelectedList] = useState([]);
  const [commentNotifications, setCommentNotifications] = useState(false);
  const [newMessageNotifications, setNewMessageNotifications] = useState(false);
  const [likeNotifications, setLikeNotifications] = useState(false);
  const [recomandationNotifications, setRecomandationNotifications] =
    useState(false);
  const [otherNotifications, setOtherNotifications] = useState(false);

  useEffect(() => {
    const userInitialInfo = queryClient.getQueryData([
      queryKeys.getUserProfile,
    ]);
    setCommentNotifications(
      userInitialInfo?.user_getProfile?.result?.showCommentNotifications,
    );
    setNewMessageNotifications(
      userInitialInfo?.user_getProfile?.result?.showNewMessageNotifications,
    );
    setLikeNotifications(
      userInitialInfo?.user_getProfile?.result?.showLikeNotifications,
    );
    setRecomandationNotifications(
      userInitialInfo?.user_getProfile?.result?.showRecomandationNotifications,
    );
    setOtherNotifications(
      userInitialInfo?.user_getProfile?.result?.showOtherNotifications,
    );
  }, []);

  /*   function setSelected(item: any, status: any) {
    setSelectedList({...selectedList, [`${item?.id}`]: status});
  } */

  /*   function renderItem({item}: {item: any}) {
    return <SwitchItem item={item} setSelectedList={setSelected} />;
  }
 */
  const {mutate: mutateUpdate, isLoading: updateLoading} =
    useUpdateNotification();
  const {userId} = useAuthStore(state => state);

  function onSwitchPressed() {
    const input = {
      showNewMessageNotifications: newMessageNotifications,
      showLikeNotifications: likeNotifications,
      showCommentNotifications: commentNotifications,
      showRecomandationNotifications: recomandationNotifications,
      showOtherNotifications: otherNotifications,
    };
    mutateUpdate(input as any, {
      onSuccess: successData => {
        if (
          successData.user_changeNotificationDetail?.status.value === 'Success'
        ) {
          queryClient.invalidateQueries(queryKeys.getUserProfile);
        } else {
          snackBar(
            messageHelper(
              successData.user_changeNotificationDetail?.status.value,
            ),
          );
        }
      },
    });
  }

  return (
    <CustomContainer>
      <BackButton />

      <View style={styles.container}>
        <Text style={styles.title}>New Messages</Text>
        <Switch
          trackColor={{false: Colors.disabled, true: Colors.primary}}
          thumbColor={
            newMessageNotifications ? Colors.primary : Colors.disabled
          }
          ios_backgroundColor={Colors.primary}
          onValueChange={value => {
            setNewMessageNotifications(value);
            onSwitchPressed();
          }}
          value={newMessageNotifications}
        />
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>Likes</Text>
        <Switch
          trackColor={{false: Colors.disabled, true: Colors.primary}}
          thumbColor={likeNotifications ? Colors.primary : Colors.disabled}
          ios_backgroundColor={Colors.primary}
          onValueChange={value => {
            setLikeNotifications(value);
            onSwitchPressed();
          }}
          value={likeNotifications}
        />
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>Comments</Text>
        <Switch
          trackColor={{false: Colors.disabled, true: Colors.primary}}
          thumbColor={commentNotifications ? Colors.primary : Colors.disabled}
          ios_backgroundColor={Colors.primary}
          onValueChange={value => {
            setCommentNotifications(value);
            onSwitchPressed();
          }}
          value={commentNotifications}
        />
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>Our Recommendations</Text>
        <Switch
          trackColor={{false: Colors.disabled, true: Colors.primary}}
          thumbColor={
            recomandationNotifications ? Colors.primary : Colors.disabled
          }
          ios_backgroundColor={Colors.primary}
          onValueChange={value => {
            setRecomandationNotifications(value);
            onSwitchPressed();
          }}
          value={recomandationNotifications}
        />
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>Others</Text>
        <Switch
          trackColor={{false: Colors.disabled, true: Colors.primary}}
          thumbColor={otherNotifications ? Colors.primary : Colors.disabled}
          ios_backgroundColor={Colors.primary}
          onValueChange={value => {
            setOtherNotifications(value);
            onSwitchPressed();
          }}
          value={otherNotifications}
        />
      </View>

      {/*       <FlatList
        extraData={notifStatus()}
        contentContainerStyle={{
          flexGrow: 1,
          marginTop: scale(8),
        }}
        data={notifStatus()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        numColumns={1}
        keyExtractor={(item, index) => index.toString()}
        horizontal={false}
      /> */}
    </CustomContainer>
  );
};

export default Notification;
const styles = StyleSheet.create({
  container: {
    zIndex: 0,
    marginHorizontal: scale(4),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: scale(12),
    borderColor: Colors.secondary,
  },
  title: {
    ...Fonts.mediumLight,
    color: Colors.txtLight,
    marginHorizontal: scale(16),
  },
});
