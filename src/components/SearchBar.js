import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

const SearchBar = ({onChangeText, value, placeholder}) => {
  return (
    <TextInput
      onChangeText={onChangeText}
      value={value}
      placeholder={placeholder}
      style={styles.container}
      returnKeyType="done"
    />
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: 'grey',
    height: 35,
    borderWidth: 1,
    marginHorizontal: 10,
    marginTop: 10,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
});

export default SearchBar;
