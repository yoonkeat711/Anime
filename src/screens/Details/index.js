import React, {useEffect, useCallback, useState} from 'react';
import {View, Text, Image, ScrollView, StyleSheet} from 'react-native';
import {combineListIntoString} from '../../utils';

const Details = ({route}) => {
  const [details, setDetails] = useState({});

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);
  const fetchDetails = useCallback(async () => {
    try {
      const response = await fetch(
        `https://api.jikan.moe/v4/anime/${route?.params?.id}/full`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'aplication/json',
          },
        },
      ).then(res => res.json());
      //   console.warn(response);
      if (response?.data) {
        setDetails(response?.data);
      }
    } catch (err) {
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

    return mapObject.map(item => {
      return (
        <View style={styles.labelContainer}>
          <Text style={styles.labelKey}>{item?.label}: </Text>
          <Text>{item?.value}</Text>
        </View>
      );
    });
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <Image
        source={{uri: details?.images?.jpg?.image_url}}
        style={styles.image}
      />
      {renderDescription()}
      <Text style={styles.synopsis}>{details?.synopsis}</Text>
    </ScrollView>
  );
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
});
export default Details;
