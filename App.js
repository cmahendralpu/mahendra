import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import HomeScreen from './components/HomeScreen';
import TimerScreen from './components/TimerScreen';
import WorldClockScreen from './components/WorldClockScreen';

const Stack = createNativeStackNavigator();
// navigation screen
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CountDown" component={TimerScreen} />
        <Stack.Screen name="WorldClcok" component={WorldClockScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
