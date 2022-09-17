import React, {useEffect, useCallback, useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {PRIMARY_COLOR} from '../../colors';
import {useFavouritesContext} from '../../Context/FavouritesContext';
import {getAnimeDetails} from '../../services';
import {combineListIntoString} from '../../utils';

const Details = ({navigation, route}) => {
  const [details, setDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const {saveList, unSaveList, checkSaved} = useFavouritesContext();

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);
  const fetchDetails = useCallback(async () => {
    try {
      setIsLoading(true);

      const response = await getAnimeDetails({id: route?.params?.id});
      if (response?.data) {
        setIsLoading(false);
        setDetails(response?.data);
      }
    } catch (err) {
      setIsLoading(false);
      console.warn(err);
    }
  }, [route?.params?.id]);

  const producerList = (() => {
    const displayList = details?.producers?.map(item => {
      return item?.name;
    });

    return combineListIntoString({list: displayList, separators: ','});
  })();

  const licensorsList = (() => {
    const displayList = details?.licensors?.map(item => {
      return item?.name;
    });

    return combineListIntoString({list: displayList, separators: ', '});
  })();

  const studioList = (() => {
    const displayList = details?.studios?.map(item => {
      return item?.name;
    });

    return combineListIntoString({list: displayList, separators: ', '});
  })();

  const genresList = (() => {
    const displayList = details?.genres?.map(item => {
      return item?.name;
    });

    return combineListIntoString({list: displayList, separators: ', '});
  })();

  const renderDescription = () => {
    const mapObject = [
      {
        label: 'Title',
        value: details?.title,
      },
      {
        label: 'Type',
        value: details?.type,
      },
      {
        label: 'Status',
        value: details?.status,
      },
      {
        label: 'Duration',
        value: details?.duration,
      },
      {
        label: 'Episodes',
        value: details?.episodes,
      },
      {
        label: 'Year',
        value: details?.year,
      },
      {
        label: 'Scores',
        value: details?.score,
      },
      {
        label: 'Rating',
        value: details?.rating,
      },
      {
        label: 'Rank',
        value: details?.rank,
      },
      {
        label: 'Producers',
        value: producerList,
      },
      {
        label: 'Licensors',
        value: licensorsList,
      },
      {
        label: 'Studios',
        value: studioList,
      },
      {
        label: 'Genres',
        value: genresList,
      },
    ];

    return mapObject.map((item, index) => {
      return (
        <View style={styles.labelContainer} key={index}>
          <Text style={styles.labelKey}>{item?.label}: </Text>
          <Text>{!item?.value || item?.value === '' ? '-' : item?.value}</Text>
        </View>
      );
    });
  };

  const onPressBack = () => {
    navigation.goBack();
  };

  const onPressSave = () => {
    checkSaved(details) ? unSaveList(details) : saveList(details);
  };

  if (isLoading) {
    return <ActivityIndicator style={styles.loader} size="large" />;
  } else {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        <View style={styles.subHeader}>
          <Text onPress={onPressBack}>Back</Text>
          <Text onPress={onPressSave} style={{color: PRIMARY_COLOR}}>
            {checkSaved(details) ? 'Saved' : 'Save'}
          </Text>
        </View>

        <Image
          source={{uri: details?.images?.jpg?.image_url}}
          style={styles.image}
        />
        {renderDescription()}
        <Text style={styles.synopsis}>{details?.synopsis}</Text>
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 15,
    paddingBottom: 10,
  },
  contentContainer: {
    paddingBottom: 20,
  },
  image: {
    resizeMode: 'contain',
    height: 200,
    width: 200,
    alignSelf: 'center',
  },
  labelContainer: {
    flexDirection: 'row',
    paddingTop: 5,
  },
  labelKey: {
    fontWeight: '700',
    fontSize: 12,
  },
  synopsis: {
    fontSize: 10,
    paddingTop: 15,
  },
  loader: {
    alignSelf: 'center',
    flex: 1,
  },
  subHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
export default Details;
