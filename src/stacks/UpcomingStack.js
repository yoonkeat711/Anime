import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Details from '../screens/Details';
import UpcomingList from '../screens/UpcomingList';

const UpcomingStack = createNativeStackNavigator();

const UpcomingStackScreen = () => {
  return (
    <UpcomingStack.Navigator>
      <UpcomingStack.Screen
        name="UpcomingList"
        component={UpcomingList}
        options={{headerShown: false}}
      />
      <UpcomingStack.Screen
        name="Details"
        component={Details}
        options={{headerShown: false}}
      />
    </UpcomingStack.Navigator>
  );
};

export default UpcomingStackScreen;
