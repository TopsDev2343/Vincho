import {Actionsheet, Center, FlatList, Text} from 'native-base';
import React from 'react';
import {Colors} from '~/styles/colors';

const ConfirmActionSheet = ({
  isOpen,
  onClose,
  optionDataList,
  setValue,
  ...otherProps
}: {
  isOpen: boolean;
  onClose: () => void;
  optionDataList: any;
  setValue: () => void;
}) => {
  return (
    <Center>
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content p={7} backgroundColor={Colors.actionSheetColor}>
          <FlatList
            width={'100%'}
            keyExtractor={(item, index) =>
              item?.id ? item?.id?.toString() : index?.toString()
            }
            data={optionDataList}
            renderItem={({item}) => (
              <Actionsheet.Item
                onPress={() => {
                  setValue(item);
                  onClose();
                }}
                backgroundColor={Colors.transparent}>
                <Text
                  color={Colors.white}
                  fontFamily={'Helvetica'}
                  fontSize={14}>
                  {item.title}
                </Text>
              </Actionsheet.Item>
            )}
            {...otherProps}
          />
        </Actionsheet.Content>
      </Actionsheet>
    </Center>
  );
};

export default ConfirmActionSheet;
