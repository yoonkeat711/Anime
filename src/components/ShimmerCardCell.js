import React from 'react';
import {View, StyleSheet} from 'react-native';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

const ShimmerCardCell = () => {
  // const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

  return (
    <View
      style={{
        flexDirection: 'row',
        // height: 6660,
        backgroundColor: 'white',
        flex: 1,
      }}>
      <ShimmerPlaceHolder
        height={600}
        LinearGradient={LinearGradient}
        // style={{height: 10000, width: 50}}
        // shimmerColors={'red'}
        visible={true}
      />
    </View>
  );
};

export default ShimmerCardCell;
