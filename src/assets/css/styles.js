import { StyleSheet, Text, View } from "react-native";


const styles = StyleSheet.create({
  /* LOGIN */
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
  viewButtonLogin:{
    flex:1,
    alignItems:'center',
    justifyContent:"center",
    backgroundColor :"#111e6c",
    width: '40%',
    marginTop: 20,
    borderRadius: 3,
  },
  viewButtonCadastro:{
    flex:1,
    alignItems:'center',
    justifyContent:"center",
    backgroundColor :"#111e6c",
    width: '40%',
    marginTop: 15,
    borderRadius: 3,
  },
  textButton:{
    color:'#fff',
    fontSize: 15,
    fontWeight: "bold"
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
  }

});
  
  export default styles;