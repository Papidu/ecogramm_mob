import React, { useState } from 'react'
import { Image, View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { MaterialIcons } from '@expo/vector-icons';

export default function EntryForm() {
    const [modeApp, setModeApp] = useState('base_user')
    const navigation = useNavigation()
    const handleBaseUser = () => {
        setModeApp('base_user')
        navigation.navigate('Tabs');
    }

    const handleLoginCourier = () => {
        navigation.navigate('AuthForm', { screen: 'Авторизация' });
    }

    return (
        <View>
            <Image source={require('../../assets/icon.png')} style={styles.logo} />
            {
                modeApp === 'base_user' ? (
                    <View>
                        <View style={styles.titleContainer}>
                            <Text style={styles.titleText}>Войти в систему как </Text>
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.button} onPress={() => handleBaseUser()}>
                                <MaterialIcons name="person" size={24} color="white" style={styles.inlineIcons} />
                                <Text style={styles.buttonText}>Пользователь</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.button, { backgroundColor: "#6a751d" }]} onPress={() => handleLoginCourier()}>
                                <MaterialIcons name="shopping-bag" size={24} color="white" style={styles.inlineIcons} />
                                <Text style={styles.buttonText}>Курьер</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : (
                    console.log('Необработанное состояние пользователя', modeApp)
                )
            }
        </View>
    )
}



const styles = StyleSheet.create({
    titleContainer: {
        height: 50,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    titleText: {
        color: 'black',
        fontSize: 22,
        fontWeight: 'bold',
    },
    logo: {
        width: 305,
        height: 159,
        marginVertical: 45,
        alignSelf: 'center',
    },
    buttonContainer: {
        marginTop: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        margin: 30,
        paddingLeft: 20,
        height: 60,
        width: 240,
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderRadius: 30,
        backgroundColor: '#4A8800',
        flexDirection: 'row',
        elevation: 5,
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingLeft: 10,
        color: 'white',
    },
    inlineIcons: {
        padding: 4,
    }
});