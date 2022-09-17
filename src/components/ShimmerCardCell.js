import React from 'react';
import {View, StyleSheet} from 'react-native';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

const ShimmerCardCell = () => {
  // const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);
  const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

  return (
    <View style={styles.container}>
      <ShimmerPlaceHolder style={styles.image} />
      <View style={styles.subContainer}>
        <ShimmerPlaceHolder style={styles.label} />
        <ShimmerPlaceHolder style={styles.label} />
        <ShimmerPlaceHolder style={styles.label} />
        <ShimmerPlaceHolder style={styles.label} />
        <ShimmerPlaceHolder style={styles.label} />
        <ShimmerPlaceHolder style={styles.label} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 15,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
  },
  label: {
    height: 15,
    marginBottom: 3,
    width: 150,
    borderRadius: 5,
  },
  image: {
    height: 100,
    width: 80,
  },
  subContainer: {
    paddingLeft: 15,
    justifyContent: 'space-between',
  },
});

export default ShimmerCardCell;
