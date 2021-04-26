import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from '../../assets/css/styles';

export default function optionsText(props) {

    return (
        <TouchableOpacity style={styles.touchOpacity} onPress={props.onPress}>
            <Text style={styles.optionsText}>{props.title}</Text>
        </TouchableOpacity>
    );

}