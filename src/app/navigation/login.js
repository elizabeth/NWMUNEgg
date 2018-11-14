import React from 'react';
import { Platform } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Login from '../screens/Login';

export const LoginStack = StackNavigator({
    Login: {
        screen: Login,
        navigationOptions: {
            title: 'Log In',
            ...Platform.select({
                android: {
                    headerStyle: {
                        backgroundColor: '#293A8C',
                    },
                    headerTintColor: '#fff'
                }
            }) 
        }
    }
})