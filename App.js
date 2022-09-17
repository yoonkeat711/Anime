/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useContext, createContext} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CompleteList from './src/screens/CompleteList';
import UpcomingList from './src/screens/UpcomingList';
import AiringStackScreen from './src/stacks/AiringStack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import FavouritesStackScreen from './src/stacks/FavouritesStack';
import {PRIMARY_COLOR} from './src/colors';
import { FavouritesProvider } from './src/Context/FavouritesContext';
import CompleteStackScreen from './src/stacks/CompleteStack';
import UpcomingStackScreen from './src/stacks/UpcomingStack';

// const FavouritesContext = createContext();
const App = () => {
  const Drawer = createDrawerNavigator();
  // const FavouritesContext = useContext();

  return (
    <FavouritesProvider>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen
            name="Home"
            component={BottomTabNavigator}
            options={{
              title: 'Home',
              headerStyle: {
                backgroundColor: PRIMARY_COLOR,
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Drawer.Screen
            name="Favourites"
            component={FavouritesStackScreen}
            options={{
              title: 'Favourites',
              headerStyle: {
                backgroundColor: PRIMARY_COLOR,
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </FavouritesProvider>
  );
};

const BottomTabNavigator = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: PRIMARY_COLOR,
      }}>
      <Tab.Screen name="Airing" component={AiringStackScreen} />
      <Tab.Screen name="Complete" component={CompleteStackScreen} />
      <Tab.Screen name="Upcoming" component={UpcomingStackScreen} />
    </Tab.Navigator>
  );
};

export default App;
