import React from 'react';
import { ActivityIndicator, StyleSheet, View, ViewStyle } from 'react-native';
import { Colors } from '~/styles/colors';

const CustomLoading = ({ style = styles.loading }: { style?: ViewStyle }) => {
  return (
    <View style={style}>
      <ActivityIndicator size={28} color={Colors.primary} />
    </View>
  );
};

export default CustomLoading;

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  loading: {
    flex: 1,
    zIndex: 999,
    width: '100%',
    height: '100%',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
});
