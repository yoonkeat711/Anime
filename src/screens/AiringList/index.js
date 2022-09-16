import React, {useEffect, useState, useCallback, useRef} from 'react';
import {FlatList, ActivityIndicator, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import CardCell from '../../components/CardCell';

const AiringList = ({}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [keyword, setKeyword] = useState('');
  const hasNextPage = useRef(true);
  const STATUS = 'airing';
  const {top} = useSafeAreaInsets();

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

  const onPressCell = () => {};

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
        descriptionObject={descriptionObject}
        onPress={onPressCell}
      />
    );
  };

  const fetchNextPage = async () => {
    if (!hasNextPage.current) {
      return;
    }

    setCurrentPage(currentPage + 1);
    await fetchAnimeList();
  };

  const renderFooter = () => {
    if (isLoading) {
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
      style={[styles.container, {top: top}]}
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
