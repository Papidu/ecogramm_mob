import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import Service from '../src/pages/Service';
import OrderList from '../src/pages/OrderList';
export const Navigator = () => {
    const Tabs = createBottomTabNavigator();
    const Stack = createStackNavigator();
    const TabStack = () => {
        return (
            <Tabs.Navigator
                screenOptions={{
                    headerShown:false,
                    tabBarStyle: {
                    height: 60,
                    position: 'absolute',
                    bottom: 10,
                    left: 16,
                    right: 16,
                    borderRadius:20,
                    zIndex:0
                    }
                }}                
            >
                <Tabs.Screen
                    name="Service" 
                    component={Service}
                    options={{
                        tabBarLabel: 'Service',
                        tabBarIcon: ({color,size, focused}) => (<MaterialIcons name="delivery-dining" size={24} color={focused ? 'green': 'gray'} /> ),
                    }}  
                    // <SvgService color={focused ? 'green': 'gray'}/>  
                />
                <Tabs.Screen 
                    name="Orders"
                    component={OrderList}                    
                    options={{
                        tabBarVisible: true,
                        // tabBarVisible: false,
                        tabBarLabel: 'Orders',
                        tabBarIcon: ({color,size, focused}) => (<Ionicons name="documents" size={24} color={focused ? 'green': 'gray'} /> ),
                    }}
                />
            </Tabs.Navigator >                
        );
    };

    return (
        <Stack.Navigator 
            initialRouteName="App"
            screenOptions={{
                headerShown:false,
            }}
        >
            <Stack.Screen name= {'Tabs'} component={TabStack} />
            <Stack.Screen name="Service" component={Service} />
            <Stack.Screen name="OrderList" component={OrderList} />
        </Stack.Navigator>
    );

};
  
