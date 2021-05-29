import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import styles from '../../assets/css/styles';

export default function Button(props) {

    return (
        <TouchableOpacity style={styles.touchOpacity} activeOpacity={0.8} onPress={props.onPress}>
            <View style={props.style}>
                <Text style={styles.textButton}>{props.title}</Text>
            </View>
        </TouchableOpacity>
    );

}