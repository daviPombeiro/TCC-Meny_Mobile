import React, { Component } from 'react';
import { TextInput,Alert, Image,ScrollView,StyleSheet,Text } from 'react-native';
import DatePicker from 'react-native-datepicker';
import styles from '../../assets/css/styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import api from '../../config/api';
import Card from '../../components/Card';
import Button from '../../components/Button';
import OptionsText from '../../components/OptionsText';

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
        birthday: new Date(),
    }
    handleNameChange = (name) => {
        this.setState({  name: name });
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
        this.setState({ birthday });
    }
    addUser = async () => {
        const { email, password, confirm_password, cpf, birthday, name } = this.state;
        if (email.length > 0 & password.length > 0 & confirm_password.length > 0 & cpf.length > 0 & birthday.length > 0 & name.length > 0) {
            if (password === confirm_password) {
                try {
                    await api.post("/users", { name: name, email: email, password: password, cpf: cpf, birthday: new Date(birthday.split("/")[2] + "-" + birthday.split("/")[1] + "-" + birthday.split("/")[0]) })
                    .then(()=>{
                        this.props.navigation.navigate('Login');
                    })
                    .catch(() =>{
                        console.log(birthday);
                        Alert.alert("Cadastro incorreto", "Ocorreu um erro durante o cadastro tende mais tarde!", [{ text: "OK" }]);
                    })
                    
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

    cancel = () => {
        this.props.navigation.navigate('Login');
    }

    render() {
        const { name = "", email = "", password = "", confirm_password = "", cpf = "", birthday = new Date() } = this.state;
        return (
            <Card>
                <Image source={require('../../assets/img/Logo_simple.png')} style={styleLocal.logo} />
                <KeyboardAwareScrollView
                    contentContainerStyle={{ flexGrow: 1 }} enableOnAndroid={true}
                    style={{ flex: 1, width: '100%' }}
                >
                    <ScrollView>
                    <TextInput value={name} onChangeText={this.handleNameChange} name="name" style={styles.input} placeholder="Digite seu nome..." placeholderTextColor="#111e6c" placeholderTextColor="#ccc" autoCapitalize='none' />
                    <TextInput value={email} onChangeText={this.handleEmailChange} name="email" style={styles.input} placeholder="Digite seu e-mail..." placeholderTextColor="#111e6c" placeholderTextColor="#ccc" autoCapitalize='none' />
                    <TextInput value={password} secureTextEntry={true} onChangeText={this.handlePasswordChange} name="password" style={styles.input} placeholder="Digite sua senha..." placeholderTextColor="#111e6c" placeholderTextColor="#ccc" autoCapitalize='none' />
                    <TextInput value={confirm_password} secureTextEntry={true} onChangeText={this.handleConfirmPasswordChange} name="password_confirmed" style={styles.input} placeholder="Confirme sua senha..." placeholderTextColor="#111e6c" placeholderTextColor="#ccc" autoCapitalize='none' />
                    <TextInput value={cpf} onChangeText={this.handleCpfChange} name="cpf" style={styles.input} placeholder="Digite seu CPF..." placeholderTextColor="#111e6c" placeholderTextColor="#ccc" autoCapitalize='none' />
                    <Text style={styles.optionsText}>Selecione a sua data de nascimento:</Text>
                    <DatePicker
                        format='DD/MM/YYYY'
                        style={styles.datePicker}
                        date={birthday}
                        onDateChange={this.handleBirthdayChange}
                    />
                    </ScrollView>
                </KeyboardAwareScrollView>
                <Button 
                    onPress={this.addUser}
                    title="Cadastrar"
                />
                <OptionsText 
                    title="Já possuo cadastro..."
                    onPress={this.cancel}
                />
            </Card>
        );
    }

}

const styleLocal = StyleSheet.create({
    logo:{
        width: 80,
        height:80,
      }
})