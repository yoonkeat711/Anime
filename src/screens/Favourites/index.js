import React, {useEffect} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import CardCell from '../../components/CardCell';
import {useFavouritesContext} from '../../Context/FavouritesContext';
import EmptyPage from '../../components/EmptyPage';
const Favourites = ({navigation}) => {
  const {unSaveList, getSavedList} = useFavouritesContext();

  useEffect(() => {}, []);

  const onPressCard = id => {
    navigation.navigate('Details', {
      id: id,
    });
  };
  const renderItem = ({item, _}) => {
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
        isSaved={true}
        onPressSave={onPressSave}
      />
    );
  };

  const onPressSave = async item => {
    unSaveList(item);
  };

  const keyExtractor = (item, index) => `${item?.title}-${index}`;

  return (
    <FlatList
      data={getSavedList()}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      style={styles.listContainer}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={
        <EmptyPage message={'Ops, No Favourites List At The Moment'} />
      }
      contentContainerStyle={styles.contentContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    flex: 1,
  },
});

export default Favourites;
