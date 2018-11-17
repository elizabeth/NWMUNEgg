import { Platform } from 'react-native';
import { StackNavigator } from 'react-navigation';

import LoginPage from '../screens/LoginPage';

export const Login = StackNavigator({
    LoginPage: {
        screen: LoginPage,
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