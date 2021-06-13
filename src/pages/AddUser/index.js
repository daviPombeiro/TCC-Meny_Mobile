import React, { Component } from 'react';
import { TextInput,Alert, Image,ScrollView,StyleSheet,Text } from 'react-native';
import DatePicker from 'react-native-datepicker';
import styles from '../../assets/css/styles';
import { withFormik } from 'formik';
import Card from '../../components/Card';
import DatePicker from 'react-native-datepicker';
import Button from '../../components/Button';
import OptionsText from '../../components/OptionsText';
import api from '../../config/api';

const Form = (props) => (
    <Card>
        <Image source={require('../../assets/img/Logo_simple.png')} style={styleLocal.logo} />
        <TextInput
            value={props.values.name}
            onChangeText={text => props.setFieldValue('name', text)}
            name="name"
            style={styles.input}
            placeholder="Digite seu nome..."
            autoCapitalize='none'
        />
        {props.touched.name && props.errors.name && <Text style={styles.incorretValues}>{props.errors.name}</Text>}
        <TextInput
            value={props.values.email}
            onChangeText={text => props.setFieldValue('email', text)}
            name="email"
            style={styles.input}
            placeholder="Digite seu e-mail..."
            autoCapitalize='none'
        />
        {props.touched.email && props.errors.email && <Text style={styles.incorretValues}>{props.errors.email}</Text>}
        <TextInput
            value={props.values.password}
            onChangeText={text => props.setFieldValue('password', text)}
            name="password"
            style={styles.input}
            placeholder="Digite sua senha..."
            autoCapitalize='none'
            secureTextEntry={true}
        />
        {props.touched.password && props.errors.password && <Text style={styles.incorretValues}>{props.errors.password}</Text>}
        <TextInput
            value={props.values.password_confirmed}
            onChangeText={text => props.setFieldValue('password_confirmed', text)}
            name="password_confirmed"
            style={styles.input}
            placeholder="Confirme sua senha..."
            autoCapitalize='none'
            secureTextEntry={true}
        />
        {props.touched.password_confirmed && props.errors.password_confirmed && <Text style={styles.incorretValues}>{props.errors.password_confirmed}</Text>}
        <TextInput
            value={props.values.cpf}
            onChangeText={text => props.setFieldValue('cpf', text)}
            name="cpf"
            style={styles.input}
            placeholder="Digite seu CPF..."
            autoCapitalize='none'
        />
        {props.touched.cpf && props.errors.cpf && <Text style={styles.incorretValues}>{props.errors.cpf}</Text>}
        <DatePicker
            format='DD/MM/YYYY'
            style={styles.datePicker}
            date={props.values.birthday}
            onDateChange={text => props.setFieldValue('birthday', text)}
        />
        {props.touched.birthday && props.errors.birthday && <Text style={styles.incorretValues}>{props.errors.birthday}</Text>}
        <Button
            style={styles.viewButton}
            onPress={props.handleSubmit}
            title="Cadastrar"
        />
        <OptionsText
            title="Já possuo cadastro..."
            onPress={() => props.navigation.navigate('Login')}
        />

    constructor(props) {
        super(props);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
        this.handleCpfChange = this.handleCpfChange.bind(this);
        this.handleBirthdayChange = this.handleBirthdayChange.bind(this);
    }
})

const Form = (props) => (
    <Card>
        <Image source={require('../../assets/img/Logo_simple.png')} style={styleLocal.logo} />
        <TextInput
            value={props.values.name}
            onChangeText={text => props.setFieldValue('name', text)}
            name="name"
            style={styles.input}
            placeholder="Digite seu nome..."
            autoCapitalize='none'
        />
        {props.touched.name && props.errors.name && <Text style={styles.incorretValues}>{props.errors.name}</Text>}
        <TextInput
            value={props.values.email}
            onChangeText={text => props.setFieldValue('email', text)}
            name="email"
            style={styles.input}
            placeholder="Digite seu e-mail..."
            autoCapitalize='none'
        />
        {props.touched.email && props.errors.email && <Text style={styles.incorretValues}>{props.errors.email}</Text>}
        <TextInput
            value={props.values.password}
            onChangeText={text => props.setFieldValue('password', text)}
            name="password"
            style={styles.input}
            placeholder="Digite sua senha..."
            autoCapitalize='none'
            secureTextEntry={true}
        />
        {props.touched.password && props.errors.password && <Text style={styles.incorretValues}>{props.errors.password}</Text>}
        <TextInput
            value={props.values.password_confirmed}
            onChangeText={text => props.setFieldValue('password_confirmed', text)}
            name="password_confirmed"
            style={styles.input}
            placeholder="Confirme sua senha..."
            autoCapitalize='none'
            secureTextEntry={true}
        />
        {props.touched.password_confirmed && props.errors.password_confirmed && <Text style={styles.incorretValues}>{props.errors.password_confirmed}</Text>}
        <TextInput
            value={props.values.cpf}
            onChangeText={text => props.setFieldValue('cpf', text)}
            name="cpf"
            style={styles.input}
            placeholder="Digite seu CPF..."
            autoCapitalize='none'
        />
        {props.touched.cpf && props.errors.cpf && <Text style={styles.incorretValues}>{props.errors.cpf}</Text>}
        <DatePicker
            format='DD/MM/YYYY'
            style={styles.datePicker}
            date={props.values.birthday}
            onDateChange={text => props.setFieldValue('birthday', text)}
        />
        {props.touched.birthday && props.errors.birthday && <Text style={styles.incorretValues}>{props.errors.birthday}</Text>}
        <Button
            onPress={props.handleSubmit}
            title="Cadastrar"
        />
        <OptionsText
            title="Já possuo cadastro..."
            onPress={() => props.navigation.navigate('Login')}
        />

    </Card>
);

export default withFormik({
    mapPropsToValues: () => ({ email: '', password: '', name: '', password_confirmed: '', birthday: new Date(), cpf: '', isVisible: false }),

    validate: values => {
        const errors = {};

        // Inicio válidação do CPF
        var Soma;
        var Resto;
        Soma = 0;
        if (values.cpf == "00000000000" || values.cpf == "11111111111") errors.cpf = 'Insira um CPF válido';

        for (let i = 1; i <= 9; i++) Soma = Soma + parseInt(values.cpf.substring(i - 1, i)) * (11 - i);
        Resto = (Soma * 10) % 11;

        if ((Resto === 10) || (Resto == 11)) Resto = 0;
        if (Resto != parseInt(values.cpf.substring(9, 10))) errors.cpf = 'Insira um CPF válido';

        Soma = 0;
        for (let i = 1; i <= 10; i++) Soma = Soma + parseInt(values.cpf.substring(i - 1, i)) * (12 - i);
        Resto = (Soma * 10) % 11;

        if ((Resto == 10) || (Resto == 11)) Resto = 0;
        if (Resto != parseInt(values.cpf.substring(10, 11))) errors.cpf = 'Insira um CPF válido';
        // Fim validação do CPF

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
        // Fim validação da data de nascimento

        return errors;
    },

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

    handleSubmit: async (values, formikBag) => {
        try {
            values.birthday = new Date(values.birthday.split("/")[2]+"-"+values.birthday.split("/")[1]+"-"+values.birthday.split("/")[0]);
            await api.post("/users", values)
                .then((response) => {
                    Alert.alert("Cadastro realizado corretamente", "Seu cadastro foi realizado", [{ text: "OK", onPress: () => formikBag.props.navigation.navigate('Login') }]);
                })
                .catch((error) => {
                    console.log(error)
                    Alert.alert("Cadastro incorreto", "Email já cadastrado", [{ text: "OK" }]);
                })
        } catch (error) {
            console.log(error);
            Alert.alert("Cadastro incorreto", "Ocorreu um erro durante o cadastro tente mais tarde!", [{ text: "OK" }]);
        }
    }
})(Form);

const styleLocal = StyleSheet.create({
    logo:{
        width: 80,
        height:80,
      }
})

