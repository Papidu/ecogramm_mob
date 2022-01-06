import React, {useState, useEffect} from 'react'
import { View, Text, FlatList,ScrollView,StyleSheet, RefreshControl} from 'react-native'
import NavBar from '../components/NavBar'


export default function OrderList() {
    const [orderData, setOrderData] = useState([{}])
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
            console.log(json)
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
    return (
        <View>
            <NavBar title='Мои заказы'/>
            <View style={{marginTop: 5,height:580}}> 
                <FlatList
                    data={orderData}
                    keyExtractor={(item) => item.id}
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

const OrderItem = (props) => {
    const {item} = props
    let date =(item.create_date || "1992-01-06").replace('T','\n');
    return (
        <View>
            <View style={styles.container}> 
                <View>
                    <Text style={styles.text}>Имя заказчика</Text>
                    <Text>{item.user_name}</Text>
                    <Text style={styles.text}>Подготовить к вывозу </Text>
                    <Text>{item.thrash_type}</Text>
                    <Text style={styles.text}>Адресс доставки</Text>
                    <Text>{item.delivery_address}</Text>
                </View>
                <View>
                    <Text style={styles.text}>Имя курьера</Text>
                    <Text>{item.courier_name}</Text>
                    <Text style={styles.text}>Дата заявки</Text>
                    {console.log(typeof(item.create_date))}
                    <Text style={{color:'black', fontSize:15}}>{date}</Text>
                    <Text style={styles.text}>Статус заказа</Text>
                    <Text style={[item.status==='в ожидании'?styles.textStatusGold: styles.textStatusGreen]}>{item.status}</Text>
                </View>
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

const fakeData = [
    {
        "id":0,
      "delivery_address": "Нептун 7",
      "create_date": "2022-01-23T11:36:43",
     "thrash_type":  "Стекло",
      "status": null,
      "courier_name": "Sonic",
      "courier_surname": "Red",
      "courier_phone_number": "8 (978) 806-10-44",
      "user_name": "Mikle2",
      "user_surname": "asdasdaasfasf",
      "user_phone_number": "8 (978) 806-13-25",
      "user_username": "Mikle"
    },
    {
        "id":1,
      "delivery_address": "Олпплмлмлил",
      "create_date": "2022-01-22T10:19:25",
     "thrash_type":  "Стекло",
      "status": null,
      "courier_name": "Sonic",
      "courier_surname": "Red",
      "courier_phone_number": "8 (978) 806-10-44",
      "user_name": "Mikle2",
      "user_surname": "asdasdaasfasf",
      "user_phone_number": "8 (978) 806-13-25",
      "user_username": "Mikle"
    },
    {
        "id":2,
      "delivery_address": "ул. Пушкина, д.8, кв. 6",
      "create_date": "2022-04-01T15:59:58",
     "thrash_type":  "Стекло",
      "status": null,
      "courier_name": "Sonic",
      "courier_surname": "Red",
      "courier_phone_number": "8 (978) 806-10-44",
      "user_name": "Mikle2",
      "user_surname": "asdasdaasfasf",
      "user_phone_number": "8 (978) 806-13-25",
      "user_username": "Mikle"
    },
    {
        "id":3,
      "delivery_address": "Шума",
      "create_date": "2022-01-22T11:10:18",
     "thrash_type":  "Стекло",
      "status": null,
      "courier_name": "Sonic",
      "courier_surname": "Red",
      "courier_phone_number": "8 (978) 806-10-44",
      "user_name": null,
      "user_surname": null,
      "user_phone_number": null,
      "user_username": null
    },
    {
        "id":4,
      "delivery_address": "Коминтерна 5",
      "create_date": "2022-01-23T10:49:20",
     "thrash_type":  "Стекло",
      "status": null,
      "courier_name": "Sonic",
      "courier_surname": "Red",
      "courier_phone_number": "8 (978) 806-10-44",
      "user_name": "Mikle2",
      "user_surname": "asdasdaasfasf",
      "user_phone_number": "8 (978) 806-13-25",
      "user_username": "Mikle"
    },
    {
        "id":5,
      "delivery_address": "ул. Пушкина, д.8, кв. 6",
      "create_date": "2022-04-01T14:59:58",
     "thrash_type":  "Стекло",
      "status": null,
      "courier_name": "Sonic",
      "courier_surname": "Red",
      "courier_phone_number": "8 (978) 806-10-44",
      "user_name": "Mikle2",
      "user_surname": "asdasdaasfasf",
      "user_phone_number": "8 (978) 806-13-25",
      "user_username": "Mikle"
    },
    {
        "id":6,
      "delivery_address": "ул. Пушкина, д.8, кв. 6",
      "create_date": "2022-04-01T15:59:58",
      "thrash_type":  "Стекло",
      "status": null,
      "courier_name": "Sonic",
      "courier_surname": "Red",
      "courier_phone_number": "8 (978) 806-10-44",
      "user_name": "Mikle2",
      "user_surname": "asdasdaasfasf",
      "user_phone_number": "8 (978) 806-13-25",
      "user_username": "Mikle"
    },
    {
        "id":7,
      "delivery_address": "ул. Пушкина, д.8, кв. 6",
      "create_date": "2022-04-01T15:59:58",
      "thrash_type":  "Макулатура",
      "status": null,
      "courier_name": "Sonic",
      "courier_surname": "Red",
      "courier_phone_number": "8 (978) 806-10-44",
      "user_name": "Mikle2",
      "user_surname": "asdasdaasfasf",
      "user_phone_number": "8 (978) 806-13-25",
      "user_username": "Mikle"
    },
    {
        "id":8,
      "delivery_address": "ул. Пушкина, д.8, кв. 6",
      "create_date": "2022-04-01T15:59:58",
      "thrash_type":  "Макулатура",
      "status": null,
      "courier_name": "Sonic",
      "courier_surname": "Red",
      "courier_phone_number": "8 (978) 806-10-44",
      "user_name": "Mikle2",
      "user_surname": "asdasdaasfasf",
      "user_phone_number": "8 (978) 806-13-25",
      "user_username": "Mikle"
    },
    {
        "id":9,
      "delivery_address": "Коминтерна 5",
      "create_date": "2022-01-07T10:49:20",
      "thrash_type":  "Макулатура",
      "status": null,
      "courier_name": "Sonic",
      "courier_surname": "Red",
      "courier_phone_number": "8 (978) 806-10-44",
      "user_name": "Mikle2",
      "user_surname": "asdasdaasfasf",
      "user_phone_number": "8 (978) 806-13-25",
      "user_username": "Mikle"
    },
    {
        "id":10,
      "delivery_address": "ул. Пушкина, д.8, кв. 6",
      "create_date": "2022-04-01T14:59:58",
      "thrash_type":  "Макулатура",
      "status": null,
      "courier_name": "Sonic",
      "courier_surname": "Red",
      "courier_phone_number": "8 (978) 806-10-44",
      "user_name": "Mikle2",
      "user_surname": "asdasdaasfasf",
      "user_phone_number": "8 (978) 806-13-25",
      "user_username": "Mikle"
    },
    {
        "id":11,
      "delivery_address": "Шума",
      "create_date": "2022-01-22T11:10:18",
      "thrash_type":  "Макулатура",
      "status": null,
      "courier_name": "Sonic",
      "courier_surname": "Red",
      "courier_phone_number": "8 (978) 806-10-44",
      "user_name": null,
      "user_surname": null,
      "user_phone_number": null,
      "user_username": null
    },
    {        
        "id":12,
      "delivery_address": "ул. Пушкина, д.8, кв. 6",
      "create_date": "2022-04-01T15:59:58",
      "thrash_type":  "Макулатура",
      "status": null,
      "courier_name": "Sonic",
      "courier_surname": "Red",
      "courier_phone_number": "8 (978) 806-10-44",
      "user_name": "Mikle2",
      "user_surname": "asdasdaasfasf",
      "user_phone_number": "8 (978) 806-13-25",
      "user_username": "Mikle"
    }
  ]