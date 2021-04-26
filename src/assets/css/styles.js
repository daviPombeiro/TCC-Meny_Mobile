import { StyleSheet, Text, View } from "react-native";


const styles = StyleSheet.create({
    viewContainer: {
      flex:1,
      alignItems:'center',
      backgroundColor: '#111e6c'
    },
    viewImage:{
      flex:1,
      alignItems:'center',
    },
    card:{
      alignItems:'center',
      backgroundColor: '#fff',
      width: '87%',
      height: 'auto',
      marginTop:'5%',
      padding:'7%',
      borderRadius: 10,
      position: "absolute"
    },
    logo:{
      width: 150,
      height:150,
      marginBottom: 10
    },
    title:{
      fontSize: 40,
      color:'#111e6c',
      fontWeight: "bold"
    },
    input:{
      width: '100%',
      color:'#111e6c',
      borderBottomColor:'#111e6c',
      borderBottomWidth: 2,
      marginBottom: 20
    },
    datePicker:{
      width: '100%'
    },  
    viewButton:{
      flex:1,
      alignItems:'center',
      justifyContent:"center",
      backgroundColor :"#111e6c",
      width: 150,
      height: 42,
      marginTop: 20,
      borderRadius: 3,
    },
    textButton:{
      color:'#fff',
      fontSize: 15,
      fontWeight: "bold"
    },
    touchOpacity:{
      flex:1,
      width: '100%',
      height: '100%',
      alignItems:'center',
      justifyContent:"center"
    },
    optionsText:{
      color: '#111e6c',
      marginTop: 5,
    }
  });
  
  export default styles;