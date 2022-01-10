import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import Service from '../src/pages/Service';
import OrderList from '../src/pages/OrderList';
import EntryForm from '../src/pages/EntryForm';
import Login from '../src/components/Login';
import Registration from '../src/components/Registration';
import CourierHome from '../src/pages/CourierHome';


export const Navigator = () => {
    const Tabs = createBottomTabNavigator();
    const Stack = createStackNavigator();
    const TabStack = () => {
        return (
            <Tabs.Navigator
                screenOptions={{
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
                    name="Создать заявку на сбор мусора" 
                    component={Service}
                    options={{
                        tabBarLabel: 'Создать заявку',
                        tabBarIcon: ({color,size, focused}) => (<MaterialIcons name="delivery-dining" size={24} color={focused ? 'green': 'gray'} /> ),
                    }}  
                />
                <Tabs.Screen 
                    name="Ваши заявки"
                    component={OrderList}                    
                    options={{
                        tabBarVisible: true,
                        // tabBarVisible: false,
                        tabBarLabel: 'Ваши заявки',
                        tabBarIcon: ({color,size, focused}) => (<Ionicons name="documents" size={24} color={focused ? 'green': 'gray'} /> ),
                    }}
                />
            </Tabs.Navigator >                
        );
    };
    // const TabStack2 = () => {
    //     return (
    //         <Tabs.Navigator
    //             screenOptions={{
    //                 headerShown:false,
    //                 tabBarStyle: {
    //                 height: 60,
    //                 position: 'absolute',
    //                 bottom: 10,
    //                 left: 16,
    //                 right: 16,
    //                 borderRadius:20,
    //                 zIndex:0
    //                 }
    //             }}                
    //         >
    //             <Tabs.Screen
    //                 name="CourierHome" 
    //                 component={CourierHome}
    //                 options={{
    //                     tabBarLabel: 'CourierHome',
    //                     tabBarIcon: ({color,size, focused}) => (<MaterialIcons name="delivery-dining" size={24} color={focused ? 'green': 'gray'} /> ),
    //                 }}  
    //                 // <SvgService color={focused ? 'green': 'gray'}/>  
    //             />
    //             <Tabs.Screen 
    //                 name="Orders"
    //                 component={OrderList}                    
    //                 options={{
    //                     tabBarVisible: true,
    //                     // tabBarVisible: false,
    //                     tabBarLabel: 'Orders',
    //                     tabBarIcon: ({color,size, focused}) => (<Ionicons name="documents" size={24} color={focused ? 'green': 'gray'} /> ),
    //                 }}
    //             />
    //         </Tabs.Navigator >                
    //     );
    // };
    const AuthStack = () =>{
        return (
            <Stack.Navigator>
                <Stack.Screen name='Авторизация' component={Login}/>
                <Stack.Screen name='Регистрация' component={Registration}/> 
            </Stack.Navigator>
        )
    }
    return (
        <Stack.Navigator 
            initialRouteName="App"
            screenOptions={{
                headerShown:false,
            }}
        >   
            <Stack.Screen name="EntryForm" component={EntryForm} />
            <Stack.Screen name="AuthForm" component={AuthStack} />
            <Stack.Screen name="CourierHome" component={CourierHome} options={{headerShown: true, title: "Заказы на вынос"}} />
            {/* костыль выше*/}
            <Stack.Screen name= "Tabs" component={TabStack} />
            <Stack.Screen name="Service" component={Service} />
            <Stack.Screen name="OrderList" component={OrderList} />
            
        </Stack.Navigator>
    );

};
  
