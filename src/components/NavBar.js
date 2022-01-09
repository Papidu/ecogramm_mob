import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function NavBar(props) {
    const {title} = props    
    return (
        <View style={styles.navbar} >
            <Text style={styles.text}>{title}</Text>
        </View>
    )
}



const styles = StyleSheet.create({
    navbar: {
      height: 50,
      alignItems: 'center',
      justifyContent: 'flex-end',
      backgroundColor: '#FAFFF4',
      paddingBottom: 10,
    },
    text: {
        color: 'black',
        fontSize: 20,
    }
  });