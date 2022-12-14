import React, {useEffect, useState, useCallback, useRef} from 'react';
import {FlatList, StyleSheet, Text} from 'react-native';
import CardCell from '../../components/CardCell';
import EmptyPage from '../../components/EmptyPage';
import SearchBar from '../../components/SearchBar';
import {useFavouritesContext} from '../../Context/FavouritesContext';
import {getAnimeList} from '../../services';
import ShimmerCardCell from '../../components/ShimmerCardCell';

const AiringList = ({navigation}) => {
  const currentPage = useRef(1);
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [keyword, setKeyword] = useState('');
  const hasNextPage = useRef(true);
  const STATUS = 'airing';
  const {saveList, checkSaved, unSaveList} = useFavouritesContext();

  useEffect(() => {
    fetchAnimeList('', false);
  }, [fetchAnimeList]);

  const fetchAnimeList = useCallback(
    async (text, resetResult = false) => {
      try {
        setIsLoading(true);

        let endpoint = `/anime?q=${text}&status=${STATUS}&page=${currentPage.current}`;
        const response = await getAnimeList({endpoint: endpoint});
        setKeyword(text);
        // setCurrentPage(page);
        if (response) {
          setIsLoading(false);
          setResult(
            resetResult
              ? []?.concat(response?.data)
              : result?.concat(response?.data),
          );
          hasNextPage.current = response?.pagination?.has_next_page;
        }
      } catch (error) {
        setIsLoading(false);
      }
    },
    [result, setResult],
  );

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
        key: 'Score',
        value: item?.score,
      },
      {
        key: 'Year',
        value: item?.year,
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

    currentPage.current += 1;
    await fetchAnimeList(keyword, false);
  };

  const onChangeText = text => {
    setKeyword(text);
  };

  const onChangeTextDone = async () => {
    currentPage.current = 1;
    await fetchAnimeList(keyword, true);
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
    currentPage.current = 1;
    await fetchAnimeList(keyword, true);
  };

  const renderFooter = () => {
    if (isLoading && currentPage.current !== 1) {
      return <Text style={styles.loadingText}>Loading ..</Text>;
    } else {
      return null;
    }
  };

  const keyExtractor = (item, index) => `${item?.title}-${index}`;

  if (isLoading && currentPage.current === 1) {
    let array = [{}, {}, {}, {}, {}];
    return array.map((_, index) => {
      return <ShimmerCardCell key={index} />;
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
