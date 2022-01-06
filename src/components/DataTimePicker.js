import React, {useState} from 'react'
import { View, Button,Text,StyleSheet,  TouchableOpacity } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

export default function DataTimePickers(props) {
    
    const {setDataTimeText, needTime=true, minimumDate=new Date(), setOnlydata} = props;
    
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [text, setText] = useState(new Date().toLocaleDateString().replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '-') +' '+new Date().toLocaleTimeString());
    

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);

        let tempDate = new Date(currentDate);
        let formatDate = tempDate.getFullYear() + '-' + ((tempDate.getMonth()+1) <10?'0'+(tempDate.getMonth()+1):(tempDate.getMonth()+1))+'-'+ tempDate.getDate();
        let formatTime = tempDate.getHours() +':' + tempDate.getMinutes()+ ':'+tempDate.getSeconds();
        if(!needTime){
            setOnlydata(formatDate)
        }
        setText(formatDate+' '+ formatTime);
        setDataTimeText(formatDate+' '+ formatTime)
        // console.log(formatDate+ ' ' + formatTime+ '\n'+ new Date(currentDate))
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
        <View style={styles.contienerItems}>
            <Text style={styles.text}>
                {text}
            </Text>
            <TouchableOpacity onPress={showDatepicker} style={styles.item}>
                <Text style={styles.textData}>Укажите дату</Text>
                <AntDesign name="calendar" size={24} color="black" />
                
            </TouchableOpacity>
            {
                needTime?(
                    <TouchableOpacity onPress={showTimepicker} style={styles.item}>
                        <Text style={styles.textData}>Укажите время</Text>
                        <Ionicons name="time-outline" size={24} color="black" />                
                    </TouchableOpacity>
                ): (<></>)
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
    textData: {
        margin: 10,
        fontSize: 20,
    },
    text: {
        height: 40,
        width: 240,
        margin: 10,
        paddingLeft: 10,
        paddingTop: 5,
        fontSize: 20,
        justifyContent:'center',
        alignItems: 'center',
        borderStyle: 'solid',
        borderWidth: 2,        
    },
    contienerItems:{
        justifyContent:'space-around',
        alignItems: 'center',
        // backgroundColor: 'gold',
        marginHorizontal: 16,
        marginBottom: 20,
    },
    item:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 250,        
        marginHorizontal: 10,
        marginTop: 5,
        borderRadius: 10,
        backgroundColor: '#008CBA',
    }
  });