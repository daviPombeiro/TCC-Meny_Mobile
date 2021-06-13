import React, { Component } from 'react';
import { Text, useColorScheme, View, StyleSheet, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import * as Yup from 'yup';
import { withFormik } from 'formik';
import styles from '../../assets/css/styles';
import api from '../../config/api';
import Card from '../../components/Card';
import OptionsText from '../../components/OptionsText';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styleLocal = StyleSheet.create({
    viewButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "center",
        backgroundColor: "#111e6c",
        width: 150,
        height: 42,
        marginBottom: 10,
        marginTop: 20,
        borderRadius: 3,
    }
})

const Form = (props) => (
    <Card>
        <Image source={require('../../assets/img/Logo_simple.png')} style={styles.logo} />
        <TextInput
            value={props.values.token}
            keyboardType='numeric'
            onChangeText={text => props.setFieldValue('token', text)}
            name="token"
            style={styles.input}
            placeholder="Digite seu token..."
            autoCapitalize='none'
        />
        {props.touched.token && props.errors.token && <Text style={styles.incorretValues}>{props.errors.token}</Text>}

        <TouchableOpacity style={styles.touchOpacity} onPress={props.handleSubmit}>
            <View style={styleLocal.viewButton}>
                <Text style={styles.textButton}>Trocar senha</Text>
            </View>
        </TouchableOpacity>
        <OptionsText
            title="Lembrei minha senha"
            onPress={() => props.navigation.navigate('Login')}
        />
        <OptionsText
            title="Solicitar novo código"
            onPress={() => props.navigation.navigate('ForgetPassword')}
        />

    </Card>
);

export default withFormik({
    mapPropsToValues: () => ({ token: '',email: AsyncStorage.getItem('@email')}),

    validationSchema: Yup.object().shape({
        token: Yup.string()
            .max(6, 'Insira um token válido')
            .min(6, 'Insira um token válido')
            .required('Preencha o campo de token')
    }),

    handleSubmit: async (values, formikBag) => {
        try {
            await api.post("/verify_token", values)
                .then(() => {
                    Alert.alert("Token correto", "token correto", [{ text: "OK", onPress: () => formikBag.props.navigation.navigate('ChangePassword') }]);
                })
                .catch((error) => {
                    console.log(error)
                    Alert.alert("Token incorreto", "token incorreto", [{ text: "OK" }]);
                })
        } catch (error) {
            console.log(error);
            Alert.alert("Token incorreto", "token incorreto", [{ text: "OK" }]);
        }
    }
})(Form);

