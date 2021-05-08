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
            value={props.values.password}
            secureTextEntry={true}
            onChangeText={text => props.setFieldValue('password', text)}
            style={styles.input}
            placeholder="Digite sua senha..."
            autoCapitalize='none'
        />
        {props.touched.password && props.errors.password && <Text style={styles.incorretValues}>{props.errors.password}</Text>}
        <TextInput
            value={props.values.password_confirmed}
            secureTextEntry={true}
            onChangeText={text => props.setFieldValue('password_confirmed', text)}
            style={styles.input}
            placeholder="Confirme a sua senha..."
            autoCapitalize='none'
        />
        {props.touched.password_confirmed && props.errors.password_confirmed && <Text style={styles.incorretValues}>{props.errors.password_confirmed}</Text>}
        <OptionsText
            title="Lembrou sua senha?..."
            onPress={() => props.navigation.navigate('Login')}
        />
        <Button
            onPress={props.handleSubmit}
            title="Trocar senha"
        />
    </Card>


);

export default withFormik({
    mapPropsToValues: () => ({ password_confirmed: '', password: '', email: AsyncStorage.getItem('@email') }),

    validationSchema: Yup.object().shape({
        password: Yup.string()
            .min(6, 'A senha deve ter no mínimo 6 caracteres')
            .required('Preencha o campo de senha'),
        password_confirmed: Yup.string()
            .oneOf([Yup.ref('password')], 'Senha e confirmar senhas estão diferentes')
            .required('Preencha o campo de confirmar senha'),
    }),


    handleSubmit: async (values,formikBag) => {
        try {
            await api.post("/change_password", values)
            .then(
                formikBag .props.navigation.navigate('Login')
            );
            
        } catch (error) {
            console.log(error);
            Alert.alert("Ocorreu um problema", "Ocorreu um problema na troca da senha tente novamente", [{ text: "OK" }]);
        }

    }
})(Form);


