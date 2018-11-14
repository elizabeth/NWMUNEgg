import React, { Component } from 'react';
import { SafeAreaView } from 'react-navigation'
import { Platform, StyleSheet, Text, View } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';

import styles from '../Style'

class CheckIn extends Component {
    onSuccess(e) {
        //e.data
        this.props.navigation.navigate('CheckInDetail', {code: "code here"});
    }

    render() {
        return (
            <QRCodeScanner
                onRead={this.onSuccess.bind(this)}    
            />
        );
    }
}
export default CheckIn;