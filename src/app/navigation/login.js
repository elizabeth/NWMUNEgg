import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import LoginPage from '../screens/LoginPage';

export const Login = createAppContainer(createStackNavigator({
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
}));