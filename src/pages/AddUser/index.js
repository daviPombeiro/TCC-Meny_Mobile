import React from 'react';
import { TextInput, Text, Image, StyleSheet, Alert } from 'react-native';
import * as Yup from 'yup';
import styles from '../../assets/css/styles';
import { withFormik } from 'formik';
import Card from '../../components/Card';
import DatePicker from 'react-native-datepicker';
import Button from '../../components/Button';
import OptionsText from '../../components/OptionsText';
import api from '../../config/api';

const styleLocal = StyleSheet.create({
    logo: {
        width: 100,
        height: 100,
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
            style={styles.viewButton}
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

        // Inicio validação de data da nascimento
        let yearToday = parseInt(new Date().getFullYear());
        let yearBirthday = parseInt(new Date(values.birthday).getFullYear());
        let age = yearToday - yearBirthday;
        if (age < 14) {
            errors.birthday = "É necessário ter no minimo 14 anos"
        }
        // Fim validação da data de nascimento

        return errors;
    },

    validationSchema: Yup.object().shape({
        email: Yup.string()
            .email('Digite um e-mail válido')
            .required('Preencha o campo de e-mail'),
        password: Yup.string()
            .min(6, 'A senha deve ter no mínimo 6 caracteres')
            .required('Preencha o campo de senha'),
        password_confirmed: Yup.string()
            .oneOf([Yup.ref('password')], 'Senha e confirmar senhas estão diferentes')
            .required('Preencha o campo de confirmar senha'),
        name: Yup.string()
            .required('Preencha o campo de nome'),
        cpf: Yup.string()
            .max(11, 'Insira um CPF válido')
            .required('Preencha o campo de CPF')
    }),

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
