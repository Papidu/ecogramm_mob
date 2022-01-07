import React, {useEffect, useState} from 'react'
import { View, Text,FlatList, RefreshControl, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import NavBar from '../components/NavBar'

export default function CourierHome() {

    const [orderData, setOrderData] = useState({})
    const [refreshing, setrefReshing] = useState(false)


    const onRefreshItem =async () =>{
        setrefReshing(true)
        const url = 'http://vm-fd0ab233.na4u.ru:8080/delivery/requests';
        const header = {            
            method: 'POST',
            body: JSON.stringify({}),
            headers: {
            'Content-Type': 'application/json'
        }}
    
        try{
            const response = await fetch(url, header);
            const json = await response.json();
            const statuss= response.status
            // console.log(json)
            setOrderData(json)
            setrefReshing(false)
            // setOrderData(fakeData)
        } catch (e){
            console.log('Ошибка ', e)
        } finally{
            setrefReshing(false)
        }
    }

    useEffect( () => {
        onRefreshItem();
    }, [])

    
    


    const OrderItem = (props) => {
        const courierPhone = "8 (978) 806-13-25"
        const updateStatus =async (data) =>{
            const url = 'http://vm-fd0ab233.na4u.ru:8080/delivery/requests/update';
                const header = {            
                    method: 'POST',
                    body: JSON.stringify([data]),
                    headers: {
                    'Content-Type': 'application/json'
                }}  
                // console.log("updateStatus ",data)      
                try{
                    const response = await fetch(url, header);
                    const json = await response.json();
                    const statuss= response.status;
                    console.log(statuss)
                    setrefReshing(true)
                    return response
                    
                    // setOrderData(json)
                    setrefReshing(false)
                } catch (e){
                    console.log('Ошибка ', e)
                } finally{
                    setrefReshing(false)
                }
        }
        async function handleGetOrder(item){
            const data = {
                "id_req": item.id,
                "status": 'В пути',
                "courier_phone": courierPhone
            }        
            const resstatus = await updateStatus(data)
            // console.log('asdasdasdasd\n', resstatus, typeof(resstatus))
            if(resstatus.status == 200){
                setModeStatusWait('В пути')
            }else{
                Alert.alert(
                    '',
                    "Что-то пошло не так, попробуйте повторить позже",
                    [
                        { text: "OK", onPress: () =>  setModeStatusWait('в ожидании') }
                    ]
                );
            }
        }
        async function handleCancelOrder(item){
            const data = {
                "id_req": item.id,
                "status": 'в ожидании',
                "courier_phone": courierPhone
            }
            const resstatus = await updateStatus(data)
            // console.log('aaaaaa\n', resstatus.status, typeof(resstatus.status))
            if( resstatus.status == 200){
                setModeStatusWait('в ожидании')
            }else{
                Alert.alert(
                    '',
                    "Что-то пошло не так, попробуйте повторить позже",
                    [
                        { text: "OK", onPress: () =>  setModeStatusWait('в ожидании') }
                    ]
                );
            }
        }
        const {item} = props
        const [modeStatusWait, setModeStatusWait] = useState('в ожидании')
        let date =(item.create_date || "1992-01-06").replace('T','\n');
        return (
            <View>
                <View style={styles.container}> 
                    <View>
                        <Text style={styles.text}>Имя заказчика</Text>
                        <Text>{item.user_name || 'Не назначен'}</Text>
                        <Text style={styles.text}>Подготовить к вывозу </Text>
                        <Text>{item.thrash_type}</Text>
                        <Text style={styles.text}>Адресс доставки</Text>
                        <Text>{item.delivery_address}</Text>
                        {item.status===modeStatusWait?(
                            <TouchableOpacity style={styles.button} onPress={()=> handleGetOrder(item)}>
                                <Text>Беру заказа</Text>
                            </TouchableOpacity>
                        ):(
                            <TouchableOpacity style={styles.button} onPress={()=> handleCancelOrder(item)}>
                                <Text>Отмена</Text>
                            </TouchableOpacity>
                        )}
                        
                    </View>
                    <View>
                        <Text style={styles.text}>Имя курьера</Text>
                        <Text>{item.courier_name}</Text>
                        <Text style={styles.text}>Дата заявки</Text>
                        <Text style={{color:'black', fontSize:15}}>{date}</Text>
                        <Text style={styles.text}>Статус заказа</Text>
                        <Text style={[item.status==='в ожидании'?styles.textStatusGold: styles.textStatusGreen]}>{item.status}</Text>
                    </View>
                </View>           
            </View>
        )
    }

    return (
        <View>
            <NavBar title='CourierHome'/>
            <View style={{marginTop: 5,height:580}}> 
                <FlatList
                    data={orderData}
                    keyExtractor={(item) => item.id.toString()}
                    refreshControl={<RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefreshItem}
                        />}
                    renderItem={({item}) =><OrderItem item={item} />}
                />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginHorizontal: 10,
        backgroundColor: '#eee',//'gold',
        marginVertical: 5,
        borderWidth:1,
        justifyContent: 'space-around',
    },
    button:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        marginVertical: 10,
        borderRadius: 10,
        backgroundColor: '#4CAF50',
    },
    text: {
        color: 'black',
        fontSize: 15,
        fontWeight:'bold'
    },
    textStatusGold:{
        color:'#e2be09',
    },
    textStatusGreen:{
        color:'green',
    }
  });
