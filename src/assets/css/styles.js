/* eslint-disable prettier/prettier */
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
    },
  
    /*LEITOR DE QR CODE*/
    qrCodeText: {
      flex: 1,
      fontSize: 18,
      padding: 32,
      color: '#777'
    },

    /*MENU DO RESTAURANTE*/
    menuHeader: {
      width: '100%',
      alignItems: "center",
      paddingTop: 10,
      paddingBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: "#3057CC"
    },
    menuRestaurant: {
      fontSize: 25,
      fontWeight: "bold"
    },
    menuSectionHeader: {
      width: '100%',
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: "#DEDEDE"
    },
    menuSectionTitle: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#3057CC"
    },
    menuItemContainer: {
      maxWidth: "100%",
      padding: 10,
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-end",
      borderBottomWidth: 1,
      borderBottomColor: "#DEDEDE"
    },
    menuItemTitle: {
      fontSize: 18,
      fontWeight: "bold"
    },
    menuItemContainerSelected: {
      backgroundColor: "#3057CC"
    },
    menuItemTitleSelected: {
      fontSize: 18,
      fontWeight: "bold"
    }
  });
  
  export default styles;