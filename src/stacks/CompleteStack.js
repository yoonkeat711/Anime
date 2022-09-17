import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Details from '../screens/Details';
import CompleteList from '../screens/CompleteList';

const CompleteStack = createNativeStackNavigator();

const CompleteStackScreen = () => {
  return (
    <CompleteStack.Navigator>
      <CompleteStack.Screen
        name="CompleteList"
        component={CompleteList}
        options={{headerShown: false}}
      />
      <CompleteStack.Screen
        name="Details"
        component={Details}
        options={{headerShown: false}}
      />
    </CompleteStack.Navigator>
  );
};

export default CompleteStackScreen;
