import React, {useState} from 'react'
import { Image, View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import NavBar from '../components/NavBar'
import { useNavigation } from '@react-navigation/native'
import { MaterialIcons } from '@expo/vector-icons';

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

    return (
        <View>
            <Image source={require('../../assets/icon.png')} style={styles.logo}/>
            {
                modeApp === 'base_user'? (
                <View>
                    <NavBar title='Войти в систему как'/>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={()=> handleBaseUser()}>
                            <MaterialIcons name="person" size={24} color="black" />
                            <Text style={styles.buttonText}>Пользователь</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={()=> handleLoginCourier()}>
                            <MaterialIcons name="shopping-bag" size={24} color="black" style={styles.inlineIcons}/>
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
    buttonContainer:{
        marginTop: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        margin: 30,
        paddingLeft: 20,
        height: 100,
        width: 240,
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderWidth: 1,  
        borderRadius: 20, 
        backgroundColor: '#32b3db',
        flexDirection: 'row',
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingLeft: 10
    },
    logo: {
        width: 305,
        height: 159,
        marginVertical: 15,
        alignSelf: 'center',
    },
  });