import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { AppNavigator } from './src/app/navigation/router';

const AppContainer = createAppContainer(AppNavigator);
export default class App extends Component {
    render() {
        return <AppContainer />;
    }
}