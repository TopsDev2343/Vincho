import {Toast, View} from 'native-base';
import React, {memo, useState} from 'react';

import {scale} from 'react-native-size-matters';
import {width} from '~/utils/dimension';
import {Colors} from '~/styles/colors';
import CustomButton from '~/components/atoms/CustomButton';
import XLSX from 'xlsx';
import {PermissionsAndroid, Platform} from 'react-native';
import {getFullDateTime} from '~/utils/getDatePeriod';
let RNFS = require('react-native-fs');

export default memo(function DownloadDataButton({data}: {data: any}) {
  const [isLoading, setIsLoading] = useState(false);

  const downloadExcelPressed = async () => {
    try {
      if (Platform.OS == 'ios') {
        writeDataToExcel();
      } else {
        let isPermitedExternalStorage = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        );
        if (!isPermitedExternalStorage) {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
              title: 'Storage permission needed',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            writeDataToExcel();
          }
        } else {
          writeDataToExcel();
        }
      }
    } catch (e) {
      return;
    }
  };

  const writeDataToExcel = () => {
    setIsLoading(true);

    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.json_to_sheet(data?.pages);
    XLSX.utils.book_append_sheet(wb, ws, 'ReportInfo');
    const wbout = XLSX.write(wb, {type: 'binary', bookType: 'xlsx'});
    let path = '';
    if (Platform.OS == 'ios') {
      path = RNFS.DocumentDirectoryPath;
    } else {
      path = RNFS.DownloadDirectoryPath;
    }
    RNFS.writeFile(path + '/' + getFullDateTime() + '.xlsx', wbout, 'ascii')
      .then(r => {
        Toast.show({description: 'File Exported Successfully in' + path});
      })
      .catch(e => {
        Toast.show({description: e});
      });
    setIsLoading(false);
  };

  return (
    <View style={{flex: 1}}>
      <CustomButton
        title={'Download Data'}
        titleColor={Colors.txtDark}
        backColor={Colors.primary}
        isLoading={isLoading}
        containerStyle={{
          flex: 1,
          justifyContent: 'center',
        }}
        widthNo={scale(width) - scale(90)}
        btnMTop={16}
        onPress={() => {
          downloadExcelPressed();
        }}
      />
    </View>
  );
});
