import React, {useState} from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { Dimensions } from "react-native"
import { useNavigation } from '@react-navigation/native'

const window_ = Dimensions.get('window');

export default function Login() {
    const [textLogin, onChangeTextLogin] = useState("8 (978) 806-13-25");
    const [textPassword, onChangePassword] = useState("1");
    const navigation = useNavigation()
    const creatAlertMSG = (isOK) =>
    {
        if(!isOK)
        {
            Alert.alert(
                "Заяка не сформирована",
                "Что-то пошло не так, попробуйте повторить позже",
                [
                    { text: "OK", onPress: () => console.log("Not okey") }
                ]
            );
        }
    }

    const postAuthToken= async (data) =>{
        const url = 'http://vm-fd0ab233.na4u.ru:8080/auth/token';
        const header = {            
            method: 'POST', 
            body: JSON.stringify(data),
            headers: {
            'Content-Type': 'application/json'
        }}    
        try{
            const response = await fetch(url, header);
            const json = await response.json();
            const statuss= response.status
            creatAlertMSG(statuss===201)
            console.log(json, statuss)
            // setTableData(json)
        } catch (e){
            console.log('Ошибка ', e)
        }
    }

    function onSubmit(){
        let dataForm = {}
        if(textLogin === ''){
            alert('Укажите пожалуйста логин или номер телефон');
        }
        if(textPassword === ''){
            alert('Укажите пожалуйста пароль');
        }
        if(textLogin  !== '' && textPassword !== ''){
            dataForm = {
                "username": "mikle",
                "password": 1
            }
            // console.log(dataForm);
            postAuthToken(dataForm);
            navigation.replace('CourierHome',{back: false})
        }
    }


    return (
        <View style={styles.conteiner}>
            <View>
                <TextInput
                    placeholder='Введите логин или номер телефона'
                    style={styles.textInput}
                    onChangeText={onChangeTextLogin}
                    value={textLogin}
                />
            </View>
            <View>
                <TextInput
                    placeholder='Введите пароль'
                    style={styles.textInput}
                    onChangeText={onChangePassword}
                    secureTextEntry={true}
                    value={textPassword}
                />
            </View>
            <View style={styles.contienerItems}>
                <TouchableOpacity style={styles.button} onPress={()=> onSubmit()}>
                    <Text style={styles.textButton}>Войти</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    conteiner:{
        // backgroundColor: 'gold',
        height:window_.height / 1.2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textInput:{
        height: 40,
        width: 300,
        marginVertical: 10,
        marginHorizontal: 16,
        paddingLeft: 10,
        paddingTop: 5,
        fontSize: 15,
        justifyContent:'center',
        alignItems: 'center',
        borderStyle: 'solid',
        borderWidth: 2,     
        // backgroundColor:'red'   
    },contienerItems:{
        flexDirection: 'row',
        justifyContent:'space-around',
        marginHorizontal: 16,
        marginBottom: 20,
    },
    item:{
        marginLeft: 5,
        width: 150,
        borderStyle: 'solid',
        borderWidth: 2,
        padding: 5,
        alignItems:'center'
    },
    button:{
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