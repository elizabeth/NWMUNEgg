import React, { Component } from 'react';
import { withNavigationFocus } from 'react-navigation'
import { View, Button, Linking } from 'react-native';
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
                    notAuthorizedView={
                        <View><Button 
                            title="Enable Camera Access"
                            onPress={() => Linking.openURL('app-settings://')}></Button>
                        </View>
                    }
                    cameraProps={{captureAudio: false}}
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