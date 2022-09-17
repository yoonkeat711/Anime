import React, {useEffect, useState, useCallback, useRef} from 'react';
import {FlatList, StyleSheet, Text} from 'react-native';
import CardCell from '../../components/CardCell';
import EmptyPage from '../../components/EmptyPage';
import SearchBar from '../../components/SearchBar';
import ShimmerCardCell from '../../components/ShimmerCardCell';
import {useFavouritesContext} from '../../Context/FavouritesContext';
import {getAnimeList} from '../../services';

const AiringList = ({navigation}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [keyword, setKeyword] = useState('');
  const hasNextPage = useRef(true);
  const STATUS = 'airing';
  const {saveList, checkSaved, unSaveList} = useFavouritesContext();

  useEffect(() => {
    fetchAnimeList();
  }, [fetchAnimeList]);

  const fetchAnimeList = useCallback(async () => {
    try {
      setIsLoading(true);
      // console.warn(keyword, currentPage, STATUS, result);

      let endpoint = `/anime?q=${keyword}&status=${STATUS}&page=${currentPage}`;
      const response = await getAnimeList({endpoint: endpoint});

      if (response) {
        // console.warn(response, 'res');
        setIsLoading(false);
        setResult(result?.concat(response?.data));
        hasNextPage.current = response?.pagination?.has_next_page;
      }
    } catch (error) {
      setIsLoading(false);
    }
  }, [currentPage, keyword, result, setResult]);

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
        isSaved={checkSaved(item)}
      />
    );
  };

  const onPressSave = async item => {
    checkSaved(item) ? unSaveList(item) : saveList(item);
  };

  const fetchNextPage = async () => {
    if (!hasNextPage.current) {
      return;
    }

    setCurrentPage(currentPage + 1);
    await fetchAnimeList();
  };

  const onChangeText = text => {
    setKeyword(text);
  };

  const onChangeTextDone = async () => {
    setCurrentPage(1);
    setResult([]);
    await fetchAnimeList();
  };

  const renderHeader = () => {
    return (
      <SearchBar
        value={keyword}
        placeholder="Search title here.."
        onChangeText={onChangeText}
        onSubmitEditing={onChangeTextDone}
      />
    );
  };

  const pullToRefresh = async () => {
    setCurrentPage(1);
    setResult([]);
    await fetchAnimeList();
  };

  const renderFooter = () => {
    if (isLoading && currentPage !== 1) {
      return <Text style={styles.loadingText}>Loading ..</Text>;
    } else {
      return null;
    }
  };

  const keyExtractor = (item, index) => `${item?.title}-${index}`;

  if (isLoading) {
    let array = [{}, {}, {}, {}, {}];
    return array.map(_ => {
      return <ShimmerCardCell />;
    });
  } else {
    return (
      <>
        {renderHeader()}
        <FlatList
          data={result}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          onEndReached={fetchNextPage}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={<EmptyPage message={'No Data Found!'} />}
          onRefresh={pullToRefresh}
          refreshing={isLoading}
          style={styles.container}
          contentContainerStyle={styles.contentContainer(result?.length <= 0)}
        />
      </>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  loader: {
    paddingVertical: 10,
  },
  loadingText: {
    alignSelf: 'center',
    paddingTop: 5,
  },
  contentContainer: bool => ({
    flex: bool ? 1 : 0,
  }),
});

export default AiringList;
