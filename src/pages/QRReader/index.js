import React, { Component } from 'react';
import { Text } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import styles from '../../assets/css/styles';

export default class QRReader extends Component {
  onSuccess = e => {
    this.props.navigation.navigate('Menu', {
      menuURL: e.data
    });
  };

  render() {
    return (
      <QRCodeScanner
        onRead={this.onSuccess}
        topContent={
          <Text style={styles.qrCodeText}>
            Escaneie o QR Code da mesa.
          </Text>
        }
      />
    );
  }

}
