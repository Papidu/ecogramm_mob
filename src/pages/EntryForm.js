import React, {useState} from 'react'
import { View, Text, TouchableOpacity,StyleSheet } from 'react-native'
import NavBar from '../components/NavBar'
import { useNavigation } from '@react-navigation/native'

export default function EntryForm() {
    const [modeApp, setModeApp] = useState('base_user')
    const navigation = useNavigation()
    const handleBaseUser =() =>{        
        setModeApp('base_user')
        navigation.replace('Tabs');
    }

    const handleLoginCourier =() =>{
        navigation.navigate('AuthForm', {screen: 'Авторизация'});
    }
    const handleRegistrationCourier =() =>{
        navigation.navigate('AuthForm', {screen: 'Регистрация'});
    }

    return (
        <View>            
            {
                modeApp === 'base_user'? (
                <View>
                    <NavBar title='Вход в систему как'/>
                    <View style={styles.conteiner}>
                        <TouchableOpacity style={styles.button} onPress={()=> handleBaseUser()}>
                            <Text style={styles.text}>Пользователь</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.text}  onPress={()=> setModeApp('courier')}>Курьер</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                ) : (
                <View>
                    <NavBar title='Войдите или зарегистрируйтесь'/>
                    <View style={styles.conteiner}>
                        <TouchableOpacity style={styles.button}  onPress={()=> handleLoginCourier()}>
                            <Text style={styles.text}>Войти</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonRegistration} onPress={()=> handleRegistrationCourier()}>
                            <Text style={styles.text}>Зарегистрироваться</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                )
            }
        </View>
    )
}



const styles = StyleSheet.create({
    conteiner:{
        // backgroundColor: 'gold',
        height:550,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        margin:30,
        width:200,
        height:50,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,  
        borderRadius: 20, 
        backgroundColor: '#32b3db'   
    },
    buttonRegistration: {
        margin:30,
        width:300,
        height:50,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,  
        borderRadius: 20, 
        backgroundColor: '#32b3db'   
    },
    text:{
        fontSize:20,
        fontWeight: 'bold'
    }
  });