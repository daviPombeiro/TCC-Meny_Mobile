import React, { Component } from 'react';
import { Text, useColorScheme, View, Button, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import styles from '../../assets/css/styles';
import Card from '../../components/Card';

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
                    <View style={styles.viewButtonForgetPassword}>
                        <Text style={styles.textButton}>Solicitar</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.touchOpacity} onPress={this.handleLogIn}>
                    <Text style={styles.cancel}>Lembrei minha senha</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.touchOpacity} onPress={() => navigation.navigate('AddUser')}>
                    <Text style={styles.cancel}>Não possui um cadastro?...</Text>
                </TouchableOpacity>
            </Card>
        );
    }

}


