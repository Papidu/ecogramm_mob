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
    const [textName, onChangeName] = useState("Кирилл");setOnlyData // setOnlyData в этой строке нужна?
    const [textSurname, onChangeSurname] = useState("Кудряшов");
    const [textBirthday, onChangeBirthday] = useState("1996-05-03");
    const [textOnlydata, setOnlyData] = useState("1996-05-03");
    const navigation = useNavigation()
    const createAlertMSG = (isOK) =>
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
            body: JSON.stringify(data),
            // credentials: 'include',
            headers: {
            'Content-Type': 'application/json'
        }}    
        try{
            const response = await fetch(url, header);
            const json = await response.json();
            const status = response.status
            createAlertMSG(status===201)
            console.log(json, status)
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
        if(!isInputEmpty(textPhoneNumber,'Ваш номер телефона') &&
            !isInputEmpty(textPassword,'Ваш пароль') &&
            !isInputEmpty(textName,'Ваше имя') &&
            !isInputEmpty(textUserName,'Ваш ник') &&
            !isInputEmpty(textSurname,'Вашу фамилию') &&
            !isInputEmpty(textBirthday,'Вашу дату рождения')
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
        <View style={styles.container}>
            <View>
                <TextInput
                    placeholder='Введите Ваш номер телефона'
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
                <Text>Укажите Вашу дату рождения</Text>
                <DataTimePickers 
                    needTime={false} 
                    setDataTimeText={onChangeBirthday}
                    minimumDate={new Date(1900, 1, 1)}
                    setOnlydata={onChangeBirthday}
                />
            </View>            
            <View style={styles.containerItems}>
                <TouchableOpacity style={styles.button} onPress={()=> onSubmit()}>
                    <Text style={styles.textButton}>Зарегистрироваться</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
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
    },containerItems:{
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