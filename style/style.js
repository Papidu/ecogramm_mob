import { StyleSheet,StatusBar, Platform } from 'react-native';


export const globalStyle = StyleSheet.create({
    main: {
        flex: 1,
        // margin: 0,
        // padding: 0,
//   padding: 0;
//   box-sizing: border-box;
//   text-decoration: none;
//   list-style-type: none;
    },
    body: {
        fontFamily: 'Roboto-bold',
        fontWeight: 'bold'
        
        // width: 100 %,
        // height:100 %,
        // flex: 1 0 auto
    },
    AndroidSafeArea: {
        // flex: 1,
        backgroundColor: "#FAFFF4",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        
    }
})



