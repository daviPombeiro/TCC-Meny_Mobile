import React from 'react';
import { View, StyleSheet,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../../assets/css/styles';

const styleLocal = StyleSheet.create({
    header: {
        width: '100%',
        height: '8%',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#111e6c',
        justifyContent: 'flex-start'
    },
    icon: {
        padding: 7,
        paddingTop: 10,
        paddingRight: 15,
        height: 50,
        marginLeft: '2%',
    },
    touchOpacity:{
        width: '30%',
        height: '100%',
    }
})

export default function Header(props) {

    return (
        <View style={styleLocal.header}>
            <TouchableOpacity style={styleLocal.touchOpacity} activeOpacity={0.8} onPress={props.onPress}>
                <Icon name={props.icon} style={styleLocal.icon} size={30} color="white" />
            </TouchableOpacity>
        </View>
        

    );

}