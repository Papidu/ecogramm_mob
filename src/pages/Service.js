import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import DataTimePickers from '../components/DataTimePicker';
import { Dimensions } from "react-native"

const window_ = Dimensions.get('window');

export default function Service() {
    const [textAddres, onChangeTextAddres] = useState("");
    const [userPhone, onChangeUserPhonr] = useState("8 (978) 876-10-33");
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
        if (textAddres === '') {
            alert('Укажите, пожалуйста, адрес');
        }
        if (dataTimeText === '') {
            alert('Укажите, пожалуйста, дату и время');
        }
        if (textAddres !== '' && dataTimeText !== '') {
            dataForm = {
                "courier_phone": "8 (000) 000-00-00",
                "user_phone": userPhone,// 8 (978) 806-10-44,
                "address": textAddres,
                "create_date": dataTimeText,
                "thrash_types": [selectTypeGarbage === 1 ? "Макулатура" : "Стекло"],
                "price": 200
            }
            // console.log(dataForm);
            postDeliveryCreateRequest(dataForm);
        }
    }

    return (
        <ScrollView>
            <View style={styles.content}>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeTextAddres}
                    value={textAddres}
                    placeholder='Укажите адрес доставки'
                />
                <View >
                    <Text style={styles.text}>Выберите, что хотите сдать:</Text>
                    <View style={styles.containerItems}>
                        <TouchableOpacity style={styles.item} onPress={() => setselectTypeGarbage(1)}>
                            <Entypo name="text-document" size={40} color={selectTypeGarbage === 1 ? "brown" : "black"} />
                            <Text>Mакулатура</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.item} onPress={() => setselectTypeGarbage(2)}>
                            <FontAwesome5 name="wine-bottle" size={40} color={selectTypeGarbage === 2 ? "brown" : "black"} />
                            <Text>Стекло</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <DataTimePickers setDataTimeText={setDataTimeText} />
                    </View>
                    <View style={{ justifyContent: 'space-around', alignItems: 'center' }}>
                        <Text style={styles.textInfoInput}>
                            Ваш номер телефона
                        </Text>
                        <TextInput
                            style={styles.textInput}
                            keyboardType='phone-pad'
                            value={userPhone}
                            onChangeText={onChangeUserPhonr}
                        />
                    </View>
                    <View style={styles.containerItems}>
                        <TouchableOpacity style={styles.button} onPress={() => onSubmit()}>
                            <Text style={styles.textButton}>Заказать</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    content: {
        height: window_.height/1.2,
    },
    text: {
        marginHorizontal: 20,
        marginBottom: 20,
        padding: 10,
        fontSize: 20,
    },
    textInfoInput: {
        marginHorizontal: 20,
        padding: 10,
        fontSize: 20,
    },
    textInput: {
        height: 40,
        width: 240,
        marginHorizontal: 20,
        paddingLeft: 10,
        paddingTop: 5,
        fontSize: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderStyle: 'solid',
        borderWidth: 2,
        // backgroundColor:'red'   
    },
    containerItems: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginHorizontal: 16,
        marginBottom: 20,
    },
    item: {
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
        width: 250,
        marginHorizontal: 10,
        marginTop: 10,
        borderRadius: 10,
        backgroundColor: '#4CAF50',
    },
    textButton: {
        margin: 10,
        fontSize: 20,
    },
});