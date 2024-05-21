import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
  Text,
} from 'react-native';
import {ms, scale, verticalScale} from 'react-native-size-matters';
import {useQueryClient} from 'react-query';

import {Colors} from '~/styles/colors';
import {Fonts} from '~/styles/fonts';
import {queryKeys} from '~/constants/queryKeys';
import {SvgXml} from 'react-native-svg';
import {close, sendMsg} from '~/assets/icons';
import {windowWidth, windowHeight} from '~/styles/globalStyles';
import {useAuthStore, useClickedPostInfoStore} from '~/stores';
import AvatarWithTitle from '../AvatarWithTitle';

const SendMsgInput = ({
  sendComment,
  isLoading,
  msg,
  setMsg,
  showReply = false,
  setShowReply,
  replyParent = null,
  setReplyParent,
}: {
  sendComment: any;
  isLoading: boolean;
  msg: string;
  setMsg: () => void;
  showReply: boolean;
  setShowReply: any;
  replyParent: any;
  setReplyParent: any;
}) => {
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData([queryKeys.getUserProfile]);
  const {userId} = useAuthStore(state => state);
  const {postInfo} = useClickedPostInfoStore(state => state);

  const [keyboardOffset, setKeyboardOffset] = useState(0);
  const onKeyboardShow = (event: any) =>
    setKeyboardOffset(event.endCoordinates.height - windowHeight * 0.04);
  const onKeyboardHide = () => setKeyboardOffset(0);
  const keyboardDidShowListener = useRef<any>();
  const keyboardDidHideListener = useRef<any>();

  useEffect(() => {
    keyboardDidShowListener.current = Keyboard.addListener(
      'keyboardWillShow',
      onKeyboardShow,
    );
    keyboardDidHideListener.current = Keyboard.addListener(
      'keyboardWillHide',
      onKeyboardHide,
    );

    return () => {
      keyboardDidShowListener.current.remove();
      keyboardDidHideListener.current.remove();
    };
  }, []);
  useEffect(() => {
    if (showReply) {
      myTextInput.focus();
    }
  }, [showReply]);

  return (
    <View
      style={[
        styles.container,
        {
          marginBottom:
            keyboardOffset > 0
              ? verticalScale(keyboardOffset) - windowHeight * 0.08
              : verticalScale(keyboardOffset),
        },
      ]}>
      {showReply && (
        <View style={styles.replyContainer}>
          <TouchableOpacity
            onPress={() => {
              setShowReply(false);
              setReplyParent(null);
              Keyboard.dismiss();
            }}
            activeOpacity={0.7}>
            <SvgXml
              color={Colors.white}
              xml={close}
              width={scale(12)}
              height={scale(12)}
            />
          </TouchableOpacity>
          <Text style={styles.replyMessage}>
            Reply to {replyParent?.user?.userName}
          </Text>
        </View>
      )}
      <View style={styles.messageContainer}>
        <AvatarWithTitle
          name={data?.user_getProfile?.result?.userName}
          onPress={() => {}}
          uri={data?.user_getProfile?.result?.photoUrl}
          width={scale(48)}
          height={scale(48)}
          resizeMode={'cover'}
          borderRadius={scale(30)}
        />
        <TextInput
          ref={ref => {
            myTextInput = ref;
          }}
          style={styles.msgInput}
          onChangeText={value => setMsg(value)}
          value={msg}
          placeholder="Comment..."
          placeholderTextColor={Colors.txtMedium}
          keyboardType="default"
          multiline={true}
        />
        {msg != '' && msg != undefined && msg != null && (
          <TouchableOpacity
            onPress={() => {
              Keyboard.dismiss();
              sendComment(msg, userId, postInfo?.id);
            }}>
            {isLoading ? (
              <ActivityIndicator size={28} color={Colors.primary} />
            ) : (
              <SvgXml xml={sendMsg} width={scale(25)} height={scale(25)} />
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default SendMsgInput;

const styles = StyleSheet.create({
  container: {},
  messageContainer: {
    alignItems: 'center',
    backgroundColor: Colors.onBackground,
    flexDirection: 'row',
    paddingHorizontal: scale(12),
    paddingVertical: scale(6),
  },
  replyContainer: {
    backgroundColor: Colors.white,
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(16),
    paddingVertical: scale(10),
  },
  img: {
    width: scale(48),
    height: scale(48),
    resizeMode: 'cover',
    borderRadius: scale(30),
  },
  msgInput: {
    ...Fonts.smallReg,
    color: Colors.white,
    width: windowWidth * 0.7,
    marginLeft: scale(6),
    paddingVertical: 5,
  },
  replyMessage: {
    ...Fonts.smallReg,
    color: Colors.blackOverlay,
    width: windowWidth * 0.7,
    marginLeft: scale(6),
    paddingVertical: 5,
  },
});
