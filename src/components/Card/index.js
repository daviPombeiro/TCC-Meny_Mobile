import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from '../../assets/css/styles';

export default function Card(props) {

    return (

        <View style={styles.viewContainer}>
            <View style={styles.card}>
                {props.children}
            </View>

        </View>
    );

}