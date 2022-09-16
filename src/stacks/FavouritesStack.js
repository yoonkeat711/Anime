import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Details from '../screens/Details';
import Favourites from '../screens/Favourites';

const FavouritesStack = createNativeStackNavigator();

const FavouritesStackScreen = () => {
  return (
    <FavouritesStack.Navigator>
      <FavouritesStack.Screen
        name="FavouritesList"
        component={Favourites}
        options={{headerShown: false}}
      />
      <FavouritesStack.Screen
        name="Details"
        component={Details}
        // options={{
        //   title: 'Description',
        //   headerStyle: {
        //     backgroundColor: 'lightblue',
        //   },
        //   headerTintColor: '#fff',
        //   headerTitleStyle: {
        //     fontWeight: 'bold',
        //   },
        // }}
        options={{headerShown: false}}
      />
    </FavouritesStack.Navigator>
  );
};

export default FavouritesStackScreen;
