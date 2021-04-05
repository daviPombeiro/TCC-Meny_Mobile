import React, { Component } from 'react';
import { Text, useColorScheme, View,Button, TextInput } from 'react-native';
//import { Container, Row, Col, Image, Form, Button, Spinner, Navbar, Card, Alert } from "react-bootstrap";
import styles from '../../assets/css/styles';

export default class Login extends Component {
    state = {}

    componentDidMount() {

    }

    ChangePage(){
        
    }


    render() {
        const { navigation } = this.props;
        return (
            <View style={styles.viewLogin}>
                <View style={styles.card}>
                    <Text style={styles.title}>Meny</Text>
                    <TextInput style={styles.input} placeholder="Digite seu e-mail..." placeholderTextColor="#111e6c" placeholderTextColor="#ccc" autoCapitalize = 'none'/>
                    <TextInput style={styles.input} placeholder="Digite sua senha..." placeholderTextColor="#111e6c" placeholderTextColor="#ccc" autoCapitalize = 'none'/>
                    
                    <View style={styles.viewButtonLogin}>
                        <Text style={styles.textButton}>Login</Text>
                    </View>
                    <View style={styles.viewButtonCadastro}>
                        <Text style={styles.textButton}>Cadastro</Text>
                    </View>
                </View>
            </View>
        );
    }

}


