import React from 'react';
import {TouchableOpacity, Text, View, Image, StyleSheet} from 'react-native';
import {PRIMARY_COLOR} from './../colors';
//descrptionObject = [{
//       key: 'Title',
//       value: item?.title ?? '-',
//     },
//     {
//       key: 'Type',
//       value: item?.type,
//     }]

const CardCell = ({item, descriptionObject, onPress, onPressSave, isSaved}) => {
  const onPressCell = () => {
    onPress(item?.mal_id);
  };

  const onPressFavourite = () => {
    onPressSave(item);
  };

  return (
    <TouchableOpacity
      onPress={onPressCell}
      activeOpacity={0.6}
      style={styles.container}>
      <View style={styles.subContainer}>
        <Image
          source={{uri: item?.images?.jpg?.image_url}}
          style={styles.image}
        />
        <View>
          {descriptionObject.map((desc, index) => {
            return (
              <View style={styles.descriptionLabel} key={index}>
                <Text style={styles.descLabel}>{desc?.key}: </Text>
                <Text>{desc?.value ?? '-'}</Text>
              </View>
            );
          })}
        </View>
      </View>
      <Text style={styles.saveText} onPress={onPressFavourite}>
        {isSaved ? 'Saved' : 'Save'}
      </Text>
      <View style={styles.separator} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: 'white',
  },
  image: {
    height: 100,
    width: 80,
    resizeMode: 'contain',
    marginRight: 10,
    alignSelf: 'center',
  },
  descriptionLabel: {
    flexDirection: 'row',
    paddingBottom: 3,
    marginRight: 40,
  },
  subContainer: {
    flexDirection: 'row',
  },
  separator: {
    height: 0.5,
    backgroundColor: 'grey',
    marginTop: 5,
  },
  descLabel: {
    fontWeight: '600',
    fontSize: 12,
  },
  saveText: {
    alignSelf: 'flex-end',
    fontSize: 12,
    color: PRIMARY_COLOR,
  },
});

export default CardCell;
