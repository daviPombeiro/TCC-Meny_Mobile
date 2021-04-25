import React from 'react';
import { View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import styles from '../../assets/css/styles';

export default function Card(props) {

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.viewContainer}>
                <View style={styles.card}>
                    {props.children}
                </View>
            </View>
        </TouchableWithoutFeedback>

    );

}