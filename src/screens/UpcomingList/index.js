import React, {useEffect, useState, useCallback, useRef} from 'react';
import {FlatList, StyleSheet, Text} from 'react-native';
import CardCell from '../../components/CardCell';
import EmptyPage from '../../components/EmptyPage';
import SearchBar from '../../components/SearchBar';
import ShimmerCardCell from '../../components/ShimmerCardCell';
import {useFavouritesContext} from '../../Context/FavouritesContext';
import {getAnimeList} from '../../services';

const UpcomingList = ({navigation}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [keyword, setKeyword] = useState('');
  const hasNextPage = useRef(true);
  const STATUS = 'upcoming';
  const {saveList, checkSaved, unSaveList} = useFavouritesContext();

  useEffect(() => {
    fetchAnimeList('', 1, false);
  }, [fetchAnimeList]);

  const fetchAnimeList = useCallback(
    async (text, page, resetResult = false) => {
      try {
        setIsLoading(true);

        let endpoint = `/anime?q=${text}&status=${STATUS}&page=${page}`;
        const response = await getAnimeList({endpoint: endpoint});
        setKeyword(text);
        setCurrentPage(page);
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

    await fetchAnimeList(keyword, currentPage + 1, false);
  };

  const onChangeText = text => {
    setKeyword(text);
  };

  const onChangeTextDone = async () => {
    await fetchAnimeList(keyword, 1, true);
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
    await fetchAnimeList(keyword, 1, true);
  };

  const renderFooter = () => {
    if (isLoading && currentPage !== 1) {
      return <Text style={styles.loadingText}>Loading ..</Text>;
    } else {
      return null;
    }
  };

  const keyExtractor = (item, index) => `${item?.title}-${index}`;

  // if (isLoading) {
  //   let array = [{}, {}, {}, {}, {}];
  //   return array.map(_ => {
  //     return <ShimmerCardCell />;
  //   });
  // } else {
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
  // }
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

export default UpcomingList;
