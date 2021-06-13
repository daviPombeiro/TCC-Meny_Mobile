/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { Text } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import styles from '../../assets/css/styles';
import Header from '../../components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class QRReader extends Component {

  componentDidMount() {
    if (!AsyncStorage.getItem('@token')) {
      this.props.navigation.navigate('Login');
    }
  }

  onSuccess = e => {
    this.props.navigation.navigate('Menu', {
      menuURL: e.data
    });
  };

  render() {
    const { navigation } = this.props;
    return (
      <>
        < Header
          icon="arrow-left"
          onPress={() => navigation.navigate('SearchRestaurant')}
        />
        <QRCodeScanner
          onRead={this.onSuccess}
          bottomContent={
            <Text style={styles.qrCodeText}>
              Escaneie o QR Code da mesa.
            </Text>
          }
        />
      </>

    );
  }

}
