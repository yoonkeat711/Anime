import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState, useCallback, useRef} from 'react';
import {FlatList, ActivityIndicator, StyleSheet} from 'react-native';
import CardCell from '../../components/CardCell';
import SearchBar from '../../components/SearchBar';
import {FAVOURITES_ANIME} from '../../storageKey';

const AiringList = ({navigation}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [keyword, setKeyword] = useState('');
  const hasNextPage = useRef(true);
  const STATUS = 'airing';

  useEffect(() => {
    fetchAnimeList();
  }, [fetchAnimeList]);

  const fetchAnimeList = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://api.jikan.moe/v4/anime?q=${keyword}&status=${STATUS}&page=${currentPage}`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'aplication/json',
          },
        },
      ).then(res => res.json());

      // console.warn(await response);

      if (await response) {
        setIsLoading(false);
        setResult(result?.concat(response?.data));
        hasNextPage.current = response?.pagination?.has_next_page;
      }
    } catch (error) {
      console.warn(error);
      setIsLoading(false);
    }
  }, [currentPage, keyword, result]);

  const onPressCell = id => {
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
        key={`${index}-${item?.title}`}
        item={item}
        descriptionObject={descriptionObject}
        onPress={onPressCell}
        onPressSave={onPressSave}
      />
    );
  };

  const onPressSave = async item => {
    const list = JSON.parse(await AsyncStorage.getItem(FAVOURITES_ANIME));
    const storeObject =
      list?.length <= 0
        ? JSON.stringify([item])
        : JSON.stringify(list?.concat(item));
    await AsyncStorage.setItem(FAVOURITES_ANIME, storeObject);
  };

  const fetchNextPage = async () => {
    if (!hasNextPage.current) {
      return;
    }

    setCurrentPage(currentPage + 1);
    await fetchAnimeList();
  };

  const onChangeText = async text => {
    setKeyword(text);
    setCurrentPage(1);
    setResult([]);
    await fetchAnimeList();
  };

  const renderHeader = () => {
    // if (!isLoading) {
    return (
      <SearchBar
        value={keyword}
        placeholder="Search title here.."
        onChangeText={onChangeText}
      />
    );
    // }
  };

  const pullToRefresh = async () => {
    setCurrentPage(1);
    setResult([]);

    await fetchAnimeList();
  };

  const renderFooter = () => {
    if (isLoading && currentPage !== 1) {
      return (
        <ActivityIndicator
          size="small"
          animating
          color="grey"
          style={styles.loader}
        />
      );
    } else {
      return null;
    }
  };

  const keyExtractor = (item, index) => `${item?.title}-${index}`;

  return (
    <FlatList
      data={result}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      onEndReached={fetchNextPage}
      ListFooterComponent={renderFooter}
      ListHeaderComponent={renderHeader}
      onRefresh={pullToRefresh}
      refreshing={isLoading}
      style={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  loader: {
    paddingVertical: 10,
  },
});

export default AiringList;
