import React, { Component } from 'react';
import { Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Home extends Component {
    
    componentDidMount(){
        this.isLogIn();
    }

    isLogIn = async () => {
        if(!await AsyncStorage.getItem('@token')){
            this.props.navigation.navigate('Login');
        }
    }

    render() {
        return (
            <View>
                <Text>AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA</Text>
            </View>
        );
    }

}


