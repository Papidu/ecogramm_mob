import React from 'react'
import { View, Text } from 'react-native'

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createStackNavigator } from '@react-navigation/stack';
import { MaterialIcons } from '@expo/vector-icons';

import Service from '../src/pages/Service';
import OrderList from '../src/pages/OrderList';

const serviceName = 'Service';
const orederName = 'OrderList';

const Tab = createBottomTabNavigator();

export default function MainContainer() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName={serviceName}
                screenOptions={({route}) => ({
                    tabBarIcon: ({focused, color, size}) =>{
                        let iconName;
                        let rn = route.name;

                        if(rn === serviceName){
                            iconName = focused? 'service': 'service-outline'
                        }else if(rn === orederName){
                            iconName= focused? 'order': 'order-outline'
                        }
                        return <MaterialIcons name="delivery-dining" size={24} color="black" />
                    }
                })}>
                 <Tab.Screen
                    name="Service" 
                    component={Service}                    
                />
                <Tab.Screen 
                    name="Orders"
                    component={OrderList} 
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}
