import {useFocusEffect} from '@react-navigation/native';
import React, {useState, useCallback, useEffect} from 'react';
import {View, FlatList, Text, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FAVOURITES_ANIME} from '../../storageKey';
import CardCell from '../../components/CardCell';
const Favourites = ({navigation}) => {
  const [savedList, setSavedList] = useState([]);

  useEffect(() => {
    async function setList() {
      let list = await AsyncStorage.getItem(FAVOURITES_ANIME);
      setSavedList(JSON.parse(list));
    }
    setList();
    console.warn('d');
  }, []);

  const grabListFromStorage = useCallback(async () => {
    const list = await AsyncStorage.getItem(FAVOURITES_ANIME);
    console.warn(list);
    setSavedList(list);
  }, []);

  const onPressCard = id => {
    navigation.navigate('Details', {
      id: id,
    });
  };
  const renderItem = ({item, index}) => {
    const descriptionObject = [
      {
        key: 'Title',
        value: item?.title ?? '-',
      },
      {
        key: 'Type',
        value: item?.type,
      },
      {
        key: 'Source',
        value: item?.source,
      },
      {
        key: 'Episodes',
        value: item?.episodes,
      },
      {
        key: 'Duration',
        value: item?.duration,
      },
      {
        key: 'Rating',
        value: item?.rating,
      },
    ];
    return (
      <CardCell
        item={item}
        onPress={onPressCard}
        descriptionObject={descriptionObject}
      />
    );
  };

  const keyExtractor = (item, index) => `${item?.title}-${index}`;

  if (savedList?.length <= 0) {
    return (
      <View style={styles.emptyListContainer}>
        <Text>Ops, No Favourites List At The Moment</Text>
      </View>
    );
  } else {
    return (
      <FlatList
        data={savedList}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        style={styles.listContainer}
      />
    );
  }
};

const styles = StyleSheet.create({
  emptyListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default Favourites;
