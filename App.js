import React from 'react';
import { Navigator } from './navigation/AppNavigator';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
      <NavigationContainer> 
        <Navigator/>                  
      </NavigationContainer>
  );
}

