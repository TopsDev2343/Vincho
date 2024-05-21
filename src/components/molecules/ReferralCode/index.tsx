import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Fonts} from '~/styles/fonts';
import {Strings} from '~/assets/strings';
import {TouchableOpacity} from 'react-native-gesture-handler';
import HelveticaRegularText from '~/components/atoms/HelveticaRegularText';
import {SvgXml} from 'react-native-svg';
import {copy} from '~/assets/icons';
import CustomButton from '~/components/atoms/CustomButton';
import {scale} from 'react-native-size-matters';
import {width} from '~/utils/dimension';
import {shareReferralCode} from '~/utils/shareWithSocial';
import {APP_URL} from '~/constants/contants';
import {Colors} from '~/styles/colors';
import Clipboard from '@react-native-clipboard/clipboard';

type Props = {
  userName: string;
};

const ReferralCode = (props: Props) => {
  return (
    <View style={styles.refCodeContainer}>
      <Text
        style={{
          ...Fonts.smallBold,
          color: Colors.white,
          marginHorizontal: 10,
        }}>
        {Strings.referralCode}
      </Text>
      <TouchableOpacity
        style={styles.refCode}
        onPress={() => {
          Clipboard.setString(props.userName);
        }}>
        <HelveticaRegularText
          text={props.userName}
          fontSize={18}
          color={Colors.cleanWhite}
        />
        <SvgXml width={22} height={22} xml={copy} />
      </TouchableOpacity>

      <CustomButton
        title={Strings.referToGrow}
        titleColor={Colors.txtDark}
        backColor={Colors.primary}
        btnMTop={scale(16)}
        btnMBottom={scale(16)}
        widthNo={width - 46}
        onPress={() => shareReferralCode(APP_URL, `${props.userName}`)}
      />
    </View>
  );
};

export default ReferralCode;

const styles = StyleSheet.create({
  refCodeContainer: {
    marginHorizontal: 10,
    marginVertical: 10,
    padding: 13,
    backgroundColor: Colors.onBackground,
    borderRadius: 16,
  },
  refCode: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.referralCodeBackground,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 20,
  },
});
