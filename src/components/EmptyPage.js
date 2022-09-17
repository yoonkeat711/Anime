import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const EmptyPage = ({message}) => {
  return (
    <View style={styles.emptyListContainer}>
      <Text>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyListContainer: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default EmptyPage;
