import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AiringList from '../screens/AiringList';
import Details from '../screens/Details';

const AiringStack = createNativeStackNavigator();

const AiringStackScreen = () => {
  return (
    <AiringStack.Navigator>
      <AiringStack.Screen
        name="AiringList"
        component={AiringList}
        options={{headerShown: false}}
      />
      <AiringStack.Screen
        name="Details"
        component={Details}
        options={{
          title: 'Description',
          headerStyle: {
            backgroundColor: 'lightblue',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </AiringStack.Navigator>
  );
};

export default AiringStackScreen;
