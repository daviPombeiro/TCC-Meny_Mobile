import React from 'react';
import { View, TouchableWithoutFeedback, Keyboard, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import styles from '../../assets/css/styles';

export default function Card(props) {

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={styles.viewContainer}>
                <KeyboardAvoidingView style={{ flex: 1, width: "100%" }}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >
                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: "center"
                    }}>
                        <View style={styles.card}>
                            {props.children}
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );

}