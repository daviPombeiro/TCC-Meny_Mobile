import React, { Component } from 'react';
import { Text, useColorScheme, View, StyleSheet, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import styles from '../../assets/css/styles';
import Card from '../../components/Card';
import OptionsText from '../../components/OptionsText';

export default class ForgetPassword extends Component {
    constructor(props) {
        super(props);
        this.handleEmailChange = this.handleEmailChange.bind(this);
    }
    state = {
        email: ""
    }

    async componentDidMount() {
        
    }

    handleEmailChange = (email) => {
        this.setState({ email });
    }

    handleLogIn = async () => {
        const { email} = this.state;
        if (email.length > 0) {
            try {
                
            } catch (error) {
                
            }
        } else {
            Alert.alert("Campos faltantes", "É preciso prencher todos os campos!", [{ text: "OK" }]);
        }
    }

    render() {
        const { navigation } = this.props;
        const { email = ""} = this.state;
        return (
            <Card>
                <Image source={require('../../assets/img/Logo_simple.png')} style={styles.logo} />
                <TextInput value={email} onChangeText={this.handleEmailChange} style={styles.input} placeholder="Digite seu e-mail..." placeholderTextColor="#111e6c" placeholderTextColor="#ccc" autoCapitalize='none' />
                <TouchableOpacity style={styles.touchOpacity} onPress={() => navigation.navigate('AddUser')}>
                    <View style={styleLocal.viewButton}>
                        <Text style={styles.textButton}>Solicitar</Text>
                    </View>
                </TouchableOpacity>
                <OptionsText 
                    title="Lembrei minha senha"
                    onPress={this.handleLogIn}
                />
                <OptionsText 
                    title="Não possui um cadastro?..."
                    onPress={() => navigation.navigate('AddUser')}
                />
            </Card>
        );
    }

}

const styleLocal = StyleSheet.create({
    viewButton:{
        flex:1,
        alignItems:'center',
        justifyContent:"center",
        backgroundColor :"#111e6c",
        width: 150,
        height: 42,
        marginBottom: 10,
        marginTop: 20,
        borderRadius: 3,
    }
})

