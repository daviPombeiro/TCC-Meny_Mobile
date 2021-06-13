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
            .min(2, 'A senha deve ter no mínimo 6 caracteres')
            .required('Preencha o campo de senha'),
    }),
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


