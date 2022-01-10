import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import { MaterialIcons, Ionicons } from '@expo/vector-icons';

import Service from '../src/pages/Service';
import OrderList from '../src/pages/OrderList';
import EntryForm from '../src/pages/EntryForm';
import Login from '../src/components/Login';
import Registration from '../src/components/Registration';
import CourierHome from '../src/pages/CourierHome';


export const Navigator = () => {
    const Tab = createBottomTabNavigator();
    const Stack = createStackNavigator();
    const TabStack = () => {
        return (
            <Tab.Navigator
                screenOptions={{
                    tabBarLabelPosition: 'beside-icon', //ipad-style иконка рядом с текстом
                    tabBarHideOnKeyboard: true
                }}
            >
                <Tab.Screen
                    name="Создать заявку на сбор мусора"
                    component={Service}
                    options={{
                        tabBarLabel: 'Создать заявку',
                        tabBarIcon: ({ focused }) => (<MaterialIcons name="delivery-dining" size={24} color={focused ? 'green' : 'gray'} />),
                    }}
                />
                <Tab.Screen
                    name="Ваши заявки"
                    component={OrderList}
                    options={{
                        tabBarIcon: ({ focused }) => (<Ionicons name="documents" size={24} color={focused ? 'green' : 'gray'} />),
                    }}
                />
            </Tab.Navigator >
        );
    };
    const AuthStack = () => {
        return (
            <Stack.Navigator>
                <Stack.Screen name='Авторизация' component={Login} />
                <Stack.Screen name='Регистрация' component={Registration} />
            </Stack.Navigator>
        )
    }
    return (
        <Stack.Navigator
            initialRouteName="App"
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="EntryForm" component={EntryForm} />
            <Stack.Screen name="AuthForm" component={AuthStack} />
            <Stack.Screen name="CourierHome" component={CourierHome} options={{ headerShown: true, title: "Заказы на вывоз" }} />
            {/* костыль выше*/}
            <Stack.Screen name="Tabs" component={TabStack} />
            <Stack.Screen name="Service" component={Service} />
            <Stack.Screen name="OrderList" component={OrderList} />

        </Stack.Navigator>
    );

};

