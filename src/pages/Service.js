import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import DataTimePickers from '../components/DataTimePicker';
import { Dimensions } from "react-native"

const window_ = Dimensions.get('window');

export default function Service() {
    const [textAddress, onChangeTextAddress] = useState("");
    const [userPhone, onChangeUserPhone] = useState("8 (978) 876-10-33");
    const [selectTypeGarbage, setselectTypeGarbage] = useState(1)
    const [dataTimeText, setDataTimeText] = useState(new Date());
    const createAlertMSG = (isOK) => {
        if (isOK) {
            Alert.alert(
                "Заявка сформирована",
                "Заявка успешно сформирована, пожалуйста, ожидайте курьера",
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
            );
        } else {
            Alert.alert(
                "Заявка не сформирована",
                "Что-то пошло не так, попробуйте повторить позже",
                [
                    { text: "OK", onPress: () => console.log("Not okey") }
                ]
            );
        }
    }
    const postDeliveryCreateRequest = async (data) => {
        const url = 'http://vm-fd0ab233.na4u.ru:8080/delivery/requests/create';
        const header = {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            // mode: 'cors', // no-cors, *cors, same-origin
            // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            // credentials: 'include', // include, *same-origin, omit
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const response = await fetch(url, header);
            const json = await response.json();
            const status = response.status
            createAlertMSG(status == 201)

            // console.log(json, typeof(statuss),statuss)
            // setTableData(json)
        } catch (e) {
            console.log('Ошибка ', e)
        }
    }

    function onSubmit() {
        let dataForm = {}
        if (textAddress === '') {
            alert('Укажите, пожалуйста, адрес');
        }
        if (dataTimeText === '') {
            alert('Укажите, пожалуйста, дату и время');
        }
        if (textAddress !== '' && dataTimeText !== '') {
            dataForm = {
                "courier_phone": "8 (000) 000-00-00",
                "user_phone": userPhone,// 8 (978) 806-10-44,
                "address": textAddress,
                "create_date": dataTimeText,
                "thrash_types": [selectTypeGarbage === 1 ? "Макулатура" : "Стекло"],
                "price": 200
            }
            // console.log(dataForm);
            postDeliveryCreateRequest(dataForm);
        }
    }

    return (
        <ScrollView contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}>
            <View style={styles.container}>
                <TextInput
                    style={styles.textInput}
                    onChangeText={onChangeTextAddress}
                    value={textAddress}
                    placeholder='Укажите адрес'
                />
            </View>
            <View style={styles.container}>
                <Text style={styles.text}>Выберите, что хотите сдать:</Text>
                <View style={styles.containerItems}>
                    <TouchableOpacity style={styles.itemToRecycle} onPress={() => setselectTypeGarbage(1)}>
                        <Entypo name="text-document" size={40} color={selectTypeGarbage === 1 ? "brown" : "black"} />
                        <Text>Mакулатура</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.itemToRecycle} onPress={() => setselectTypeGarbage(2)}>
                        <FontAwesome5 name="wine-bottle" size={40} color={selectTypeGarbage === 2 ? "brown" : "black"} />
                        <Text>Стекло</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.container}>
                <Text style={styles.text}>Выберите дату</Text>
                <DataTimePickers setDataTimeText={setDataTimeText} />
            </View>
            <View style={styles.container}>
                <Text style={styles.text}>
                    Ваш номер телефона
                </Text>
                <TextInput
                    style={styles.textInput}
                    keyboardType='phone-pad'
                    value={userPhone}
                    onChangeText={onChangeUserPhone}
                />
            </View>
            <View style={styles.container}>
                <TouchableOpacity style={styles.button} onPress={() => onSubmit()}>
                    <Text style={styles.buttonText}>Оставить заявку</Text>
                </TouchableOpacity>
            </View>


        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
    },
    text: {
        paddingHorizontal: 20,
        padding: 10,
        fontSize: 20,
    },
    textInput: {
        height: 50,
        width: 300,
        paddingHorizontal: 12,
        fontSize: 16,
        borderWidth: 1.5,
        borderRadius: 15,
        borderColor: "gray",
        // backgroundColor:'red'   
    },
    containerItems: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    itemToRecycle: {
        marginLeft: 5,
        width: 150,
        borderStyle: 'solid',
        borderWidth: 2,
        padding: 5,
        alignItems: 'center'
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 240,
        height: 50,
        borderRadius: 30,
        elevation: 4,
        backgroundColor: '#4A8800',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    },
});