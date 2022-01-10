import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

export default function DataTimePickers(props) {

    const { setDataTimeText, needTime = true, minimumDate = new Date(), setOnlydata } = props;

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [outputText, setText] = useState(new Date().toLocaleDateString().replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '-') + ' ' + new Date().toLocaleTimeString());


    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);

        let tempDate = new Date(currentDate);
        let formatDate = tempDate.getFullYear() + '-' + ((tempDate.getMonth() + 1) < 10 ? '0' + (tempDate.getMonth() + 1) : (tempDate.getMonth() + 1)) + '-' + tempDate.getDate();
        let formatTime = tempDate.getHours() + ':' + tempDate.getMinutes() + ':' + tempDate.getSeconds();
        if (!needTime) {
            setOnlydata(formatDate)
        }
        setText(formatDate + ' ' + formatTime);
        setDataTimeText(formatDate + ' ' + formatTime)
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };
    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={showDatepicker}>
                <View style={styles.dateInput}>
                    <Text style={styles.outputText}> {outputText} </Text>
                    <AntDesign name="calendar" size={24} color="black"  />
                    {/*TODO: перенести к правой стороне блока иконку*/}
                </View>
            </TouchableWithoutFeedback>
            {
                needTime ? (
                    <TouchableOpacity onPress={showTimepicker} style={styles.button}>
                        <Text style={styles.buttonText}>Укажите время</Text>
                        <Ionicons name="time-outline" size={24} color="black" />
                    </TouchableOpacity>
                ) : (<></>)
            }


            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                    minuteInterval={2}
                    minimumDate={minimumDate}
                />
            )}
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    dateInput: {
        height: 40,
        width: 300,
        paddingHorizontal: 12,
        alignItems: 'center',
        borderWidth: 1.5,
        borderRadius: 15,
        flexDirection: 'row',
    },
    outputText: {
        fontSize: 18,
    },
    buttonText: {
        color: 'white',
        margin: 10,
        fontSize: 18,
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 240,
        marginTop: 10,
        borderRadius: 20,
        backgroundColor: '#008CBA',
    },
    // button: {
    //     flexDirection: 'row',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     width: 240,
    //     marginTop: 20,
    //     height: 50,
    //     borderRadius: 30,
    //     borderWidth: 1,
    //     backgroundColor: '#4A8800',
    // },
});