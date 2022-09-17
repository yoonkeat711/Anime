import React from 'react';
import {TextInput, StyleSheet, View} from 'react-native';

const SearchBar = ({onChangeText, value, placeholder, ...props}) => {
  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
        style={styles.textInput}
        returnKeyType="done"
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    borderColor: 'grey',
    height: 35,
    borderWidth: 1,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    marginTop: 10,
    borderRadius: 10,
  },
  container: {
    backgroundColor: 'white',
  },
});

export default SearchBar;
