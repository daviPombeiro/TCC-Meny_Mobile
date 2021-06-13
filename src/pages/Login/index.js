import React, { Component } from 'react';
import { Image, TextInput, Alert, Text } from 'react-native';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import styles from '../../assets/css/styles';
import api from '../../config/api';
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
const Form = (props) => (
    <Card>
        <Image source={require('../../assets/img/Logo_simple.png')} style={styles.logo} />
        <TextInput
            value={props.values.email}
            onChangeText={text => props.setFieldValue('email', text)}
            style={styles.input}
            placeholder="Digite seu e-mail..."
            autoCapitalize='none'
        />
        {props.touched.email && props.errors.email && <Text style={styles.incorretValues}>{props.errors.email}</Text>}
        <TextInput
            value={props.values.password}
            secureTextEntry={true}
            onChangeText={text => props.setFieldValue('password', text)}
            style={styles.input}
            placeholder="Digite sua senha..."
            autoCapitalize='none'
        />
        {props.touched.password && props.errors.password && <Text style={styles.incorretValues}>{props.errors.password}</Text>}
        <OptionsText
            title="Esqueceu a sua senha?..."
            onPress={() => props.navigation.navigate('ForgetPassword')}
        />
        <Button
            style={styles.viewButton}
            onPress={props.handleSubmit}
            title="Login"
        />
        <Button
            style={styles.viewButton}
            onPress={() => props.navigation.navigate('AddUser')}
            title="Cadastrar"
        />
    </Card>

);

export default withFormik({
    mapPropsToValues: () => ({ email: '', password: '' }),

    validationSchema: Yup.object().shape({
        email: Yup.string()
            .email('Digite um e-mail válido')
            .required('Preencha o campo de e-mail'),
        password: Yup.string()
            .min(6, 'A senha deve ter no mínimo 6 caracteres')
            .required('Preencha o campo de senha'),
    }),


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
    handleSubmit: async (values, formikBag) => {
        try {
            const response = await api.post("/login", values);
            await AsyncStorage.setItem('@token', response.data.token);
            formikBag.props.navigation.navigate('SearchRestaurant')
        } catch (error) {
            console.log(error);
            Alert.alert("Login incorreto", "Login inserido incorreto ou inexistente!", [{ text: "OK" }]);
        }
    }
})(Form);


