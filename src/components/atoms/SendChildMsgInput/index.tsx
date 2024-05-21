import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TextInput,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import {useQueryClient} from 'react-query';

import {Colors} from '~/styles/colors';
import {Fonts} from '~/styles/fonts';
import {queryKeys} from '~/constants/queryKeys';
import {windowWidth} from '~/styles/globalStyles';
import {useAuthStore, useClickedPostInfoStore} from '~/stores';

const SendChildMsgInput = ({
  sendChildComment,
  parentId,
  isLoading,
  isSuccess,
}: {
  sendChildComment: any;
  parentId: number;
  isLoading: boolean;
  isSuccess: boolean;
}) => {
  const [msg, setMsg] = useState<string>();
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData([queryKeys.getUserProfile]);
  const {userId} = useAuthStore(state => state);
  const {postInfo} = useClickedPostInfoStore(state => state);

  useEffect(() => {
    setMsg('');
  }, [isSuccess]);

  return (
    <View style={styles.container}>
      {/*   <Image source={{ uri: data?.user_getProfile?.result?.photoUrl }} style={styles.img} /> */}
      <TextInput
        style={styles.msgInput}
        onChangeText={value => setMsg(value)}
        value={msg}
        placeholder="Reply..."
        placeholderTextColor={Colors.txtMedium}
        keyboardType="default"
        multiline={true}
        returnKeyType={'done'}
        onSubmitEditing={() => {
          Keyboard.dismiss();
          sendChildComment(msg, postInfo?.id, parentId, userId);
        }}
      />

      {isLoading && <ActivityIndicator size={16} color={Colors.primary} />}

      {/*  <SvgXml xml={sendMsg} width={scale(16)} height={scale(16)} /> */}
    </View>
  );
};

export default SendChildMsgInput;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: Colors.transparent,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: windowWidth * 0.7,
    alignSelf: 'center',
    paddingVertical: scale(6),
  },
  img: {
    width: scale(20),
    height: scale(20),
    resizeMode: 'cover',
    borderRadius: scale(30),
  },
  msgInput: {
    ...Fonts.smallReg,
    color: Colors.white,
    width: windowWidth * 0.7,
    marginBottom: scale(6),
  },
});
