import { StyleSheet, Text, View } from "react-native";


const styles = StyleSheet.create({
    viewLogin: {
      flex:1,
      alignItems:'center',
      backgroundColor: '#111e6c'
    },
    card:{
      alignItems:'center',
      backgroundColor: '#fff',
      width: '87%',
      height: '55%',
      marginTop: '20%',
      padding:'7%',
      borderRadius: 10,
      position: "absolute"
    },
    cardCadastro:{
      alignItems:'center',
      backgroundColor: '#fff',
      width: '87%',
      height: '90%',
      marginTop: '5%',
      padding:'7%',
      borderRadius: 10,
      position: "absolute"
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
    viewButton:{
      flex:1,
      alignItems:'center',
      justifyContent:"center",
      backgroundColor :"#111e6c",
      width: '40%',
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
    }
  });
  
  export default styles;