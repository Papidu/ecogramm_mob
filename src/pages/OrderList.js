import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, ScrollView, StyleSheet, RefreshControl, TouchableOpacity, Alert } from 'react-native'
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import moment from 'moment'
import 'moment/locale/ru'



export default function OrderList() {
    const [orderData, setOrderData] = useState([{}])
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
            console.log(json)
            setOrderData(json)
            setrefReshing(false)
        } catch (e) {
            console.log('Ошибка ', e)
        } finally {
            setrefReshing(false)
        }
    }

    useEffect(() => {
        onRefreshItem();
    }, [])

    const userPhones = "8 (978) 876-10-33"

    return (
        <View>
            {
                orderData.length === 0 ? (
                    <ScrollView
                        contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefreshItem}
                            />
                        }
                    >
                        <Text>Вы ничего не заказывали</Text>
                    </ScrollView>
                ) : (
                    <FlatList
                        data={orderData.filter(x => x.user_phone_number === userPhones)}
                        keyExtractor={(item, index) => index.toString()}
                        // keyExtractor={item => item.id}
                        refreshControl={<RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefreshItem}
                        />}
                        renderItem={({ item }) => <OrderItem item={item} />}
                    />
                )}
        </View>
    )
}

const OrderItem = (props) => {
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
                'Произошла ошибка',
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
                'Произошла ошибка',
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
        <View>
            <View style={styles.card}>
                <View>
                    <Text style={styles.text}>Когда заберет</Text>
                    <Text style={styles.date}>{date}</Text>
                    <Text style={styles.text}>Адрес</Text>
                    <Text style={styles.address}>{item.delivery_address}</Text>
                    <Text style={{ color: 'black', marginBottom: 10 }}>Заберет {item.courier_name}</Text>
                    <Text style={{ color: 'blue', textDecorationLine: 'underline'}}>{item.courier_phone_number}</Text>
                </View>
                <View>
                    <Text style={{ color: 'black' }}>Подготовить к вывозу </Text>
                    <Text style={styles.icon}>
                        {item.thrash_type === "Макулатура" ?
                            <Entypo name="text-document" color='#13818D' style={styles.icon} size={45} />
                            : <FontAwesome5 name="wine-bottle" color="brown" style={styles.icon} size={45} />}
                    </Text>
                    <Text style={styles.text}>Заказ</Text>
                    <Text style={[item.status === 'в ожидании' ? styles.textStatusGold : styles.textStatusGreen]}>{item.status.toLowerCase()}</Text>
                    {item.status === 'в ожидании' ? (
                        <TouchableOpacity style={[styles.button, { backgroundColor: '#dc4640' }]} onPress={() => handleCancelOrder(item)}>
                            <Text style={styles.buttonText}>Отмена</Text>
                        </TouchableOpacity>
                    ) : (<></>
                    )}
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        marginHorizontal: 10,
        // paddingHorizontal: 16,
        backgroundColor: '#f5fff4',//'gold',
        marginVertical: 3,
        justifyContent: 'space-around',
        borderRadius: 2,
        borderColor: '#fffff4',
        elevation: 1,
        shadowColor: "rgb(50,50,50)",
        shadowOpacity: 1,
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
        lineHeight: 30,
        marginBottom: 10,
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
        textShadowColor: '#585858',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 10,
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
        fontStyle: 'italic',
    },
    textStatusGreen: {
        color: 'green',
        fontStyle: 'italic',
    }
});
