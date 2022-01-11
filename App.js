import React from 'react';
import { Navigator } from './navigation/AppNavigator';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';

const ApplicationTheme = DefaultTheme;
ApplicationTheme.colors.background = "#FAFFF4";

export default function App() {
  return (
      <NavigationContainer theme={ApplicationTheme}> 
        <Navigator/>                  
      </NavigationContainer>
  );
}

