import React, { Component } from 'react';
import { Text, View } from 'react-native';

export default class Home extends Component {
    
<<<<<<< Updated upstream
=======
    componentDidMount(){
        this.isLogIn();
    }

    isLogIn = async () => {
        if(!await AsyncStorage.getItem('@token')){
            this.props.navigation.navigate('Login');
        }
    }

>>>>>>> Stashed changes
    render() {
        return (
            <View>
                <Text>AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA</Text>
            </View>
        );
    }

}


