import React, { Component } from 'react';
import { withNavigationFocus } from 'react-navigation'
import { View } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';

class CheckIn extends Component {
    onSuccess(e) {
        //e.data
        this.props.navigation.navigate('CheckInDetail', {code: e.data});
    }

    renderCamera() {
        const isFocused = this.props.navigation.isFocused();
        
        if (!isFocused) {
            return null;
        } else if (isFocused) {
            return (
                <QRCodeScanner
                    onRead={this.onSuccess.bind(this)}
                />
            )
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.renderCamera()}
            </View>
        );
    }
}
export default withNavigationFocus(CheckIn);