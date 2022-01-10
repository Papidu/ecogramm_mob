import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native'
import { Dimensions } from "react-native"
import { useNavigation } from '@react-navigation/native'
import DataTimePickers from './DataTimePicker';


const window_ = Dimensions.get('window');

export default function Registration() {
    const [textPhoneNumber, onChangePhoneNumber] = useState("88425555555");
    const [textPassword, onChangePassword] = useState("55");
    const [textUserName, onChangeUserName] = useState("neo");
    const [textName, onChangeName] = useState("Кирилл"); setOnlyData // setOnlyData в этой строке нужна?
    const [textSurname, onChangeSurname] = useState("Кудряшов");
    const [textBirthday, onChangeBirthday] = useState("1996-05-03");
    const [textOnlydata, setOnlyData] = useState("1996-05-03");
    const navigation = useNavigation()
    const createAlertMSG = (isOK) => {
        if (!isOK) {
            Alert.alert(
                "Заявка не сформирована",
                "Что-то пошло не так, попробуйте повторить позже",
                [
                    { text: "OK", onPress: () => console.log("Not okey") }
                ]
            );
            navigation.navigate('Регистрация')
        }
    }

    const postAuthToken = async (data) => {
        const url = 'http://vm-fd0ab233.na4u.ru:8080/register';
        const header = {
            method: 'POST',
            body: JSON.stringify(data),
            // credentials: 'include',
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
        } catch (e) {
            console.log('Ошибка ', e)
        }
    }
    function isInputEmpty(str, msg) {
        if (str === '') {
            Alert.alert('Необходимо заполнить обязательное поле', `Укажите, пожалуйста, ${msg}`)
            return true
        }
        return false
    }

    function onSubmit() {
        let dataForm = {}
        if (!isInputEmpty(textPhoneNumber, 'Ваш номер телефона') &&
            !isInputEmpty(textPassword, 'Ваш пароль') &&
            !isInputEmpty(textName, 'Ваше имя') &&
            !isInputEmpty(textUserName, 'Ваш никнейм') &&
            !isInputEmpty(textSurname, 'Вашу фамилию') &&
            !isInputEmpty(textBirthday, 'Вашу дату рождения')
        ) {
            dataForm = {
                "phone_number": textPhoneNumber,
                "password": textPassword,
                "username": textUserName,
                "name": textName,
                "surname": textSurname,
                "birthday": textOnlydata
            }
            console.log(dataForm);
            postAuthToken(dataForm);
            navigation.navigate('CourierHome')
        }
    }


    return (
        <ScrollView contentContainerStyle={{ justifyContent: 'center', alignItems: 'center'}}> 
        {/* тут либо прокручивание ScrollView, либо flex: 1 */}
            <View>
                <TextInput
                    placeholder='Ваш номер телефона'
                    style={styles.textInput}
                    onChangeText={onChangePhoneNumber}
                    value={textPhoneNumber}
                    keyboardType={'phone-pad'}
                />
            </View>
            <View>
                <TextInput
                    placeholder='Придумайте пароль'
                    style={styles.textInput}
                    onChangeText={onChangePassword}
                    secureTextEntry={true}
                    value={textPassword}
                />
            </View>
            <View>
                <TextInput
                    placeholder='Придмайте никнейм'
                    style={styles.textInput}
                    onChangeText={onChangeUserName}
                    value={textUserName}
                />
            </View>
            <View>
                <TextInput
                    placeholder='Ваше имя'
                    style={styles.textInput}
                    onChangeText={onChangeName}
                    value={textName}
                />
            </View>
            <View>
                <TextInput
                    placeholder='Ваша фамилия'
                    style={styles.textInput}
                    onChangeText={onChangeSurname}
                    value={textSurname}
                />
            </View>
            <View>
                <Text style={{marginBottom:7, paddingLeft: 5}}>Дата рождения</Text>
                <DataTimePickers
                    needTime={false}
                    setDataTimeText={onChangeBirthday}
                    minimumDate={new Date(1900, 1, 1)}
                    setOnlydata={onChangeBirthday}
                />
            </View>
            <View style={styles.containerItem}>
                <TouchableOpacity style={styles.button} onPress={() => onSubmit()}>
                    <Text style={styles.buttonText}>Зарегистрироваться</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    textInput: {
        height: 50,
        width: 300,
        marginVertical: 10,
        paddingHorizontal: 12,
        fontSize: 16,
        borderWidth: 1.5,
        borderRadius: 15,
    },
    containerItem: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginHorizontal: 16,
        marginBottom: 20,
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 240,
        marginTop: 20,
        height: 50,
        borderRadius: 30,
        elevation: 5,
        backgroundColor: '#4A8800',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    },
});