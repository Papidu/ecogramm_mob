import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { Dimensions } from "react-native"
import { useNavigation } from '@react-navigation/native'

const window_ = Dimensions.get('window');

export default function Login() {
    const [textLogin, onChangeTextLogin] = useState("8 (978) 806-13-25");
    const [textPassword, onChangePassword] = useState("1");
    const navigation = useNavigation()
    const createAlertMSG = (isOK) => {
        if (isOK) {
            Alert.alert(
                "Заявка не сформирована",
                "Что-то пошло не так, попробуйте повторить позже",
                [
                    { text: "OK", onPress: () => console.log("Not okay") }
                ]
            );
        }
    }
    const handleRegistrationCourier = () => {
        navigation.navigate('AuthForm', { screen: 'Регистрация' });
    }

    const postAuthToken = async (data) => {
        const url = 'http://vm-fd0ab233.na4u.ru:8080/auth/token';
        const header = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const response = await fetch(url, header);
            const json = await response.json();
            const status = response.status
            createAlertMSG(status === 201)
            console.log(json, status)
            // setTableData(json)
        } catch (e) {
            console.log('Ошибка ', e)
        }
    }

    function onSubmit() {
        let dataForm = {}
        if (textLogin === '') {
            Alert.alert('Не удаётся войти.', 'Пожалуйста, проверьте правильность введённых данных');
        }
        if (textPassword === '') {
            Alert.alert('Не удаётся войти', 'Пожалуйста, проверьте правильность введённых данных');
        }
        if (textLogin !== '' && textPassword !== '') {
            dataForm = {
                "username": "mikle",
                "password": 1
            }
            postAuthToken(dataForm);
            navigation.navigate('CourierHome')
        }
    }


    return (
        <View style={styles.container}>
            <View style={styles.inputField}>
                <TextInput
                    placeholder='Логин или номер телефона'
                    style={styles.textInput}
                    onChangeText={onChangeTextLogin}
                    value={textLogin}
                />
            </View>
            <View>
                <TextInput
                    placeholder='Пароль'
                    style={styles.textInput}
                    onChangeText={onChangePassword}
                    secureTextEntry={true}
                    value={textPassword}
                />
            </View>
            <TouchableOpacity style={styles.button} onPress={() => onSubmit()}>
                <Text style={styles.buttonText}>Войти</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleRegistrationCourier()}>
                <Text style={{ textDecorationLine: "underline", fontSize: 17, marginTop: 15 }}>Ещё не зарегистрированы?</Text>
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: window_.height / 1.2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textInput: {
        height: 50,
        width: 300,
        marginVertical: 10,
        paddingHorizontal: 12,
        fontSize: 16,
        justifyContent: 'center',
        borderWidth: 1.5,
        borderRadius: 15,
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 240,
        marginVertical: 20,
        height: 50,
        borderRadius: 30,
        elevation: 5,
        backgroundColor: '#4A8800',
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
    },
});