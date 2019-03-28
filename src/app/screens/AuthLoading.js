import React, { Component } from 'react';
import { View, StatusBar, Alert, ActivityIndicator } from 'react-native';
import { isSignedIn } from "../auth";
import StyleConstants from '../StyleConstants'

export default class AuthLoading extends Component {
    constructor(props) {
        super(props);
    
        this._bootstrapAsync();
    }
    
      // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
        isSignedIn()
            .then(res => {
                this.props.navigation.navigate(res ? 'Tabs' : 'Login');
            })
            .catch(err => {
                this.props.navigation.navigate('Login');
                Alert.alert("Error", err.toString());
            });  

        // const userToken = await AsyncStorage.getItem('userToken');

        // This will switch to the App screen or Auth screen and this loading
        // screen will be unmounted and thrown away.
    };

    // async componentDidMount() {
    //     isSignedIn()
    //         .then(res => this.setState({ signedIn: res, checkedSignIn: true }))
    //         .catch(err => Alert.alert("Error", err.toString()));        // try {
    //     //   const user = await Auth.currentAuthenticatedUser()
    //     //   this.setState({ user, isLoading: false })
    //     // } catch (err) {
    //     //   this.setState({ isLoading: false })
    //     // }
    //   }

    render() {
        return (
            <View>
                <StatusBar
                    barStyle="light-content"
                    backgroundColor={StyleConstants.primaryDark}
                />
                <ActivityIndicator/>
            </View>
        );
    }
}