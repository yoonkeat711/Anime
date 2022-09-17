import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import {FAVOURITES_ANIME} from '../storageKey';

const FavouritesContext = React.createContext();

export const FavouritesProvider = ({children}) => {
  const [currentSavedList, setCurrentSavedList] = React.useState([]);

  useEffect(() => {
    const grabListFromStorage = async () => {
      const data = await AsyncStorage.getItem(FAVOURITES_ANIME);
      setCurrentSavedList(JSON.parse(data) ?? []);
    };

    grabListFromStorage();
  }, []);

  const saveList = async item => {
    const listToSave = currentSavedList?.concat(item);
    setCurrentSavedList(listToSave);

    await AsyncStorage.setItem(FAVOURITES_ANIME, JSON.stringify(listToSave));
  };

  const unSaveList = async item => {
    const removeList = currentSavedList?.filter(
      object => object?.mal_id !== item?.mal_id,
    );
    setCurrentSavedList(removeList);

    await AsyncStorage.setItem(FAVOURITES_ANIME, JSON.stringify(removeList));
  };

  const checkSaved = item => {
    const match = currentSavedList?.filter(
      object => object?.mal_id === item?.mal_id,
    );
    return match?.length >= 1;
  };

  const getSavedList = () => {
    return currentSavedList;
  };

  return (
    <FavouritesContext.Provider
      value={{
        saveList: saveList,
        unSaveList: unSaveList,
        checkSaved: checkSaved,
        getSavedList: getSavedList,
      }}>
      {children}
    </FavouritesContext.Provider>
  );
};

export const FavouritesConsumer = ({children}) => {
  return (
    <FavouritesContext.Consumer>
      {value => children({value})}
    </FavouritesContext.Consumer>
  );
};

export function useFavouritesContext() {
  const context = React.useContext(FavouritesContext);

  if (context === undefined) {
    throw new Error('Please wrap provider within correct domain');
  }

  return context;
}
