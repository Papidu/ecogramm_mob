import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, RefreshControl, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import moment from 'moment'
import 'moment/locale/ru'

export default function CourierHome() {

    const [orderData, setOrderData] = useState({})
    const [refreshing, setrefReshing] = useState(false)


    const onRefreshItem = async () => {
        setrefReshing(true)
        const url = 'http://vm-fd0ab233.na4u.ru:8080/delivery/requests';
        const header = {
            method: 'POST',
            body: JSON.stringify({}),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const response = await fetch(url, header);
            const json = await response.json();
            const status = response.status
            // console.log(json)
            setOrderData(json)
            setrefReshing(false)
            // setOrderData(fakeData)
        } catch (e) {
            console.log('Ошибка ', e)
        } finally {
            setrefReshing(false)
        }
    }

    useEffect(() => {
        onRefreshItem();
    }, [])





    const OrderItem = (props) => {
        const courierPhone = "8 (978) 806-13-25"
        const updateStatus = async (data) => {
            const url = 'http://vm-fd0ab233.na4u.ru:8080/delivery/requests/update';
            const header = {
                method: 'POST',
                body: JSON.stringify([data]),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            // console.log("updateStatus ",data)      
            try {
                const response = await fetch(url, header);
                const json = await response.json();
                const status = response.status;
                console.log(status)
                setrefReshing(true)
                return response

                // setOrderData(json)
                setrefReshing(false)
            } catch (e) {
                console.log('Ошибка ', e)
            } finally {
                setrefReshing(false)
            }
        }
        async function handleGetOrder(item) {
            const data = {
                "id_req": item.id,
                "status": 'В пути',
                "courier_phone": courierPhone
            }
            const resstatus = await updateStatus(data)
            // console.log('asdasdasdasd\n', resstatus, typeof(resstatus))
            if (resstatus.status == 200) {
                setModeStatusWait('В пути')
            } else {
                Alert.alert(
                    '',
                    "Что-то пошло не так, попробуйте повторить позже",
                    [
                        { text: "OK", onPress: () => setModeStatusWait('в ожидании') }
                    ]
                );
            }
        }
        async function handleCancelOrder(item) {
            const data = {
                "id_req": item.id,
                "status": 'в ожидании',
                "courier_phone": courierPhone
            }
            const resstatus = await updateStatus(data)
            // console.log('aaaaaa\n', resstatus.status, typeof(resstatus.status))
            if (resstatus.status == 200) {
                setModeStatusWait('в ожидании')
            } else {
                Alert.alert(
                    '',
                    "Что-то пошло не так, попробуйте повторить позже",
                    [
                        { text: "OK", onPress: () => setModeStatusWait('в ожидании') }
                    ]
                );
            }
        }
        const { item } = props
        const [modeStatusWait, setModeStatusWait] = useState('в ожидании')
        moment.locale('ru')
        let date = moment(item.create_date || "1992-01-06").format('DD MMM h:mm')
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.date}>{date}</Text>
                    {/* <Text style={styles.text}>Адрес</Text> */}
                    <Text style={styles.address}>{item.delivery_address}</Text>
                    <Text style={styles.text}>Заказчик</Text>
                    <Text>{item.user_name || 'Неизвестно'}</Text>
                </View>
                <View>
                    {/* <Text style={styles.text}>Дата заявки</Text> */}
                    <Text style={styles.icon}>
                    {item.thrash_type === "Макулатура" ?
                        <Entypo name="text-document" color='#13818D' style={styles.icon} size={80}/>
                        : <FontAwesome5 name="wine-bottle" color="brown" style={styles.icon} size={80} />}
                    </Text>
                    <Text style={[item.status === 'в ожидании' ? styles.textStatusGold : styles.textStatusGreen]}>Заказ {item.status.toLowerCase()}</Text>
                    {item.status === modeStatusWait ? (
                        <TouchableOpacity style={styles.button} onPress={() => handleGetOrder(item)}>
                            <Text style={styles.buttonText}>Беру заказ</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity style={styles.button} onPress={() => handleCancelOrder(item)}>
                            <Text style={styles.buttonText}>Отмена</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        )
    }

    return (
        <View style={{ backgroundColor: '#FAFFF4' }}>
            <FlatList
                data={orderData}
                keyExtractor={(item) => item.id.toString()}
                refreshControl={<RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefreshItem}
                />}
                renderItem={({ item }) => <OrderItem item={item} />}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginHorizontal: 10,
        // paddingHorizontal: 16,
        backgroundColor: '#eee',//'gold',
        marginVertical: 3,
        justifyContent: 'space-around',
        borderRadius: 2,
        borderColor: '#ddd',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 2,
    },
    date: {
        color: '#535353',
        fontSize: 18,
        lineHeight: 24,
        marginVertical: 10,
    },
    address: {
        color: '#363636',
        fontSize: 22,
        textDecorationLine: 'underline',
        lineHeight: 40,
        marginVertical: 10,
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 130,
        height: 30,
        marginVertical: 10,
        borderRadius: 10,
        backgroundColor: '#4CAF50',
        elevation: 4,
    },
    buttonText: {
        color: 'white',
        textShadowColor:'#585858',
        textShadowOffset:{width: 3, height: 3},
        textShadowRadius:15,
    },
    icon: {
        margin: 16,
        textAlign: "center"
    },
    text: {
        color: 'black',
        fontSize: 15,
        fontWeight: 'bold'
    },
    textStatusGold: {
        color: '#e2be09',
        textAlign: 'center'
    },
    textStatusGreen: {
        color: 'green',
        textAlign: 'center'
    }
});
