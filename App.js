import React, { Component } from 'react';
import { Alert } from 'react-native';
import { Login } from './src/app/navigation/login';
import { Tabs } from './src/app/navigation/router';
import { isSignedIn } from "./src/app/auth";

export default class App extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            signedIn: false,
            checkedSignIn: false
        };
    }

    handleSignIn = () => {
        this.setState({ signedIn: true });
    }
    
    async componentDidMount() {
        isSignedIn()
            .then(res => this.setState({ signedIn: res, checkedSignIn: true }))
            .catch(err => Alert.alert("Error", err.toString()));        // try {
    }

    render() {
        const { checkedSignIn, signedIn } = this.state;

        // If we haven't checked AsyncStorage yet, don't render anything (better ways to do this)
        if (!checkedSignIn) {
            return null;
        }
    
        if (signedIn) {
            return <Tabs  />;
        } else {
            return <Login screenProps={{handler: this.handleSignIn}}/>;
        }
    }
}