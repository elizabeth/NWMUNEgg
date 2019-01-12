import React, { Component } from 'react';
import { Alert } from 'react-native';
import { createRootNavigator } from './src/app/navigation/router';

import { isSignedIn } from "./src/app/auth";

export default class App extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          signedIn: false,
          checkedSignIn: false
        };
    }
    

    async componentDidMount() {
        isSignedIn()
            .then(res => this.setState({ signedIn: res, checkedSignIn: true }))
            .catch(err => Alert.alert("Error", err.toString()));        // try {
        //   const user = await Auth.currentAuthenticatedUser()
        //   this.setState({ user, isLoading: false })
        // } catch (err) {
        //   this.setState({ isLoading: false })
        // }
      }

    render() {
        const { checkedSignIn, signedIn } = this.state;

        // If we haven't checked AsyncStorage yet, don't render anything (better ways to do this)
        if (!checkedSignIn) {
            return null;
        }
    
        // if (signedIn) {
        //     return <Tabs />;
        // } else {
        //     return <Login />;
        // }
        const Layout = createRootNavigator(signedIn);
        return <Layout />;
    }
}