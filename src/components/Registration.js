import React, {useState} from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native'
// import NavBar from './NavBar'
import { Dimensions } from "react-native"
import { useNavigation } from '@react-navigation/native'
import DataTimePickers from './DataTimePicker';


const window_ = Dimensions.get('window');

export default function Registration() {
    const [textPhoneNumber, onChangePhoneNumber] = useState("88425555555");
    const [textPassword, onChangePassword] = useState("55");
    const [textUserName, onChangeUserName] = useState("neo");
    const [textName, onChangeName] = useState("Кирилл");setOnlydata
    const [textSurname, onChangeSurname] = useState("Кудряшов");
    const [textBirthday, onChangeBirthday] = useState("1996-05-03");
    const [textOnlydata, setOnlydata] = useState("1996-05-03");
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
        const url = 'http://vm-fd0ab233.na4u.ru:8080/register';
        const header = {            
            method: 'POST', 
            body: JSON.stringify([data]),
            headers: {
            'Content-Type': 'application/json'
        }}    
        try{
            const response = await fetch(url, header);
            const json = await response.json();
            const statuss= response.status
            creatAlertMSG(statuss===201)
            console.log(json, statuss)
        } catch (e){
            console.log('Ошибка ', e)
        }
    }
    function isInputEmpty(str, msg){
        if(str === ''){
            alert(`Укажите пожалуйста ${msg}`)
            return true
        }
        return false
    }
    
    function onSubmit(){
        let dataForm = {}
        if(!isInputEmpty(textPhoneNumber,'ваш номер телефон') &&
            !isInputEmpty(textPassword,'ваш пароль') &&
            !isInputEmpty(textName,'ваше имя') &&
            !isInputEmpty(textUserName,'ваше ник') &&
            !isInputEmpty(textSurname,'вашу фамилию') &&
            !isInputEmpty(textBirthday,'вашу дату рождения')
        ){
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
            navigation.replace('CourierHome',{back: false})
        }
    }


    return (
        <View style={styles.conteiner}>
            <View>
                <TextInput
                    placeholder='Введите ваш номер телефон'
                    style={styles.textInput}
                    onChangeText={onChangePhoneNumber}
                    value={textPhoneNumber}
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
            <View>
                <TextInput
                    placeholder='Введите ваше  ник'
                    style={styles.textInput}
                    onChangeText={onChangeUserName}
                    value={textUserName}
                />
            </View>
            <View>
                <TextInput
                    placeholder='Введите ваше имя'
                    style={styles.textInput}
                    onChangeText={onChangeName}
                    value={textName}
                />
            </View>
            <View>
                <TextInput
                    placeholder='Введите вашу фамилию'
                    style={styles.textInput}
                    onChangeText={onChangeSurname}
                    value={textSurname}
                />
            </View>
            <View>
                <Text>Укажите дату раждения</Text>
                <DataTimePickers 
                    needTime={false} 
                    setDataTimeText={onChangeBirthday}
                    minimumDate={new Date(1950, 0, 1)}
                    setOnlydata={onChangeBirthday}
                />
            </View>            
            <View style={styles.contienerItems}>
                <TouchableOpacity style={styles.button} onPress={()=> onSubmit()}>
                    <Text style={styles.textButton}>Зарегистрироваться</Text>
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