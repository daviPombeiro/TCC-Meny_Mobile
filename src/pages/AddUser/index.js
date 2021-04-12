import React, { Component } from 'react';
import { Text, useColorScheme, View, Button, TextInput, TouchableOpacity, Alert } from 'react-native';
//import { Container, Row, Col, Image, Form, Button, Spinner, Navbar, Card, Alert } from "react-bootstrap";
import styles from '../../assets/css/styles';
import DatePicker from 'react-native-datepicker';
import api from '../../../config/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
        this.handleCpfChange = this.handleCpfChange.bind(this);
        this.handleBirthdayChange = this.handleBirthdayChange.bind(this);
    }

    state = {
        name: "",
        email: "",
        password: "",
        confirm_password: "",
        cpf: "",
        birthday: new Date()
    }

    componentDidMount() { }

    handleNameChange = (name) => {
        this.setState({ name });
    }

    handleEmailChange = (email) => {
        this.setState({ email });
    }

    handlePasswordChange = (password) => {
        this.setState({ password });
    }

    handleConfirmPasswordChange = (confirm_password) => {
        this.setState({ confirm_password });
    }

    handleCpfChange = (cpf) => {
        this.setState({ cpf });
    }

    handleBirthdayChange = (birthday) => {
        this.setState({ birthday});
    }

    addUser = async () => {
        const { email, password, confirm_password, cpf, birthday,name } = this.state;
        if (email.length > 0 & password.length > 0 & confirm_password.length > 0 & cpf.length > 0 & birthday.length> 0 & name.length>0) {
            if (password === confirm_password) {
                try {
                    await api.post("/users", { name: name,email: email, password: password, cpf: cpf, birthday: new Date(birthday.split("-")[2]+"-"+birthday.split("-")[1]+"-"+birthday.split("-")[0]) });
                    this.props.navigation.navigate('Login');
                } catch (error) {
                    console.log(error);
                    Alert.alert("Cadastro incorreto", "Ocorreu um erro durante o cadastro tende mais tarde!", [{ text: "OK" }]);
                }
            } else {
                Alert.alert("Senhas incorretas", "Senha e confirmar senha precisam ser iguais!", [{ text: "OK" }]);
            }
        } else {
            Alert.alert("Campos faltantes", "É preciso prencher todos os campos!", [{ text: "OK" }]);
        }
    }     

    render() {
        const { navigation } = this.props;
        const { name="",email = "", password = "", confirm_password = "", cpf = "", birthday = new Date() } = this.state;
        return (
            <View style={styles.viewLogin}>
                <View style={styles.cardCadastro}>
                    <Text style={styles.title}>Cadastro</Text>
                    <TextInput value={name} onChangeText={this.handleNameChange} name="name" style={styles.input} placeholder="Digite seu nome..." placeholderTextColor="#111e6c" placeholderTextColor="#ccc" autoCapitalize='none' />
                    <TextInput value={email} onChangeText={this.handleEmailChange} name="email" style={styles.input} placeholder="Digite seu e-mail..." placeholderTextColor="#111e6c" placeholderTextColor="#ccc" autoCapitalize='none' />
                    <TextInput value={password} secureTextEntry={true} onChangeText={this.handlePasswordChange} name="password" style={styles.input} placeholder="Digite sua senha..." placeholderTextColor="#111e6c" placeholderTextColor="#ccc" autoCapitalize='none' />
                    <TextInput value={confirm_password} secureTextEntry={true} onChangeText={this.handleConfirmPasswordChange} name="password_confirmed" style={styles.input} placeholder="Confirme sua senha..." placeholderTextColor="#111e6c" placeholderTextColor="#ccc" autoCapitalize='none' />
                    <TextInput value={cpf} onChangeText={this.handleCpfChange} name="cpf" style={styles.input} placeholder="Digite seu CPF..." placeholderTextColor="#111e6c" placeholderTextColor="#ccc" autoCapitalize='none' />
                    <DatePicker date={birthday} onDateChange={this.handleBirthdayChange} style={{ width: 200 }} format="DD-MM-YYYY" minDate="10-07-1900" maxDate="31-12-2021" />
                    <TouchableOpacity style={styles.touchOpacity} onPress={this.addUser}>
                        <View style={styles.viewButton}>
                            <Text style={styles.textButton}>Cadastrar</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

}


