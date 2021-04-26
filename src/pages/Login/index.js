import React, { Component } from 'react';
import { Text, useColorScheme, View, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import styles from '../../assets/css/styles';
import api from '../../../config/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Card from '../../components/Card';
import Button from '../../components/Button';
import OptionsText from '../../components/OptionsText';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleLogIn = this.handleLogIn.bind(this);
    }
    state = {
        email: "",
        password: "",
        user: []
    }

    async componentDidMount() {
        /*const token = await AsyncStorage.getItem('@token');

        if(token){
            this
        }*/
    }

    handleEmailChange = (email) => {
        this.setState({ email });
    }

    handlePasswordChange = (password) => {
        this.setState({ password });
    }


    handleLogIn = async () => {
        const { email, password } = this.state;
        if (email.length > 0 & password.length > 0) {
            try {
                const response = await api.post("/login", { email: email, password: password });
                await AsyncStorage.setItem('@token', response.data.token);
                this.props.navigation.navigate('Home');
            } catch (error) {
                console.log(error);
                Alert.alert("Login incorreto", "Login inserido incorreto ou inexistente!", [{ text: "OK" }]);
            }
        } else {
            Alert.alert("Campos faltantes", "É preciso prencher todos os campos!", [{ text: "OK" }]);
        }
    }

    render() {
        const { navigation } = this.props;
        const { user = [], email = "", password = "" } = this.state;
        return (
            <Card>
                <Image source={require('../../assets/img/Logo_simple.png')} style={styles.logo} />
                <TextInput value={email} onChangeText={this.handleEmailChange} style={styles.input} placeholder="Digite seu e-mail..." placeholderTextColor="#111e6c" placeholderTextColor="#ccc" autoCapitalize='none' />
                <TextInput value={password} secureTextEntry={true} onChangeText={this.handlePasswordChange} style={styles.input} placeholder="Digite sua senha..." placeholderTextColor="#111e6c" placeholderTextColor="#ccc" autoCapitalize='none' />
                <OptionsText 
                    title="Esqueceu a sua senha?..."
                    onPress={() => navigation.navigate('ForgetPassword')}
                />
                <Button 
                    onPress={this.handleLogIn}
                    title="Login"
                />
                <Button 
                    onPress={() => navigation.navigate('AddUser')}
                    title="Cadastrar"
                />
            </Card>
        );
    }

}


