import React, {useState} from 'react';
import { StyleSheet, Text, View, StatusBar   } from 'react-native';
import OrderList from './src/pages/OrderList';
import Service from './src/pages/Service';
import { Navigator } from './navigation/AppNavigator';
import { NavigationContainer } from '@react-navigation/native';
import MainContainer from './navigation/MainContainer';
export default function App() {
  return (
      <NavigationContainer style={{backgroundColor:'#E4E4E4'}}> 
        <Navigator/>                  
      </NavigationContainer>
  );
}


// {/* <NavigationContainer style={{backgroundColor:'#E4E4E4'}}> 
//           {/* <StatusBar barStyle='light-content'  />        */}
//         //   <Navigator/>                  
//         // </NavigationContainer>
// //         {/* <Service/> */}
// //         {/* <OrderList/> */}  */}
