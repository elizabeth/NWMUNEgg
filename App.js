import React, {Component} from 'react';
import { Login } from '.src/app/navigation/login';
import { Tabs } from './src/app/navigation/router';

export default class App extends Component {
    state = {
        user: {},
        isLoading: true
    }

    render() {
        if (this.state.isLoading) return null
        let loggedIn = false
        if (this.state.user.username) {
            loggedIn = true
        }
        if (loggedIn) {
            return (
                <Login />
            )
        }
        return (
            <Tabs />
        )
    }
}