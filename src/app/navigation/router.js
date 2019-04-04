import React from 'react';
import { Platform, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator, createStackNavigator, createSwitchNavigator
} from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { Icon } from 'react-native-elements';
import StyleConstants from '../StyleConstants'
import { onSignOut } from "../auth";
import AuthLoading from '../screens/AuthLoading';
import LoginPage from '../screens/LoginPage';
import Register from '../screens/Register'
import CheckIn from '../screens/CheckIn';
import CheckInDetail from '../screens/CheckInDetail';

const headerNavigationOptions = {
    headerStyle: {
        backgroundColor: StyleConstants.primary,
    },
    headerTintColor: StyleConstants.headerTintColor
}

export const LoginStack = createStackNavigator({
    LoginPage: {
        screen: LoginPage,
        navigationOptions: {
            title: 'NWMUN Social Ticketing'
        }
    }},
    {
        defaultNavigationOptions: headerNavigationOptions
    }
)

export const RegisterStack = createStackNavigator({
    Register: {
        screen: Register,
        navigationOptions: {
            title: 'Register',
        }
    }},
    {   
        defaultNavigationOptions: 
            ({navigation}) => { return {
                ...headerNavigationOptions,
                headerRight:
                    <TouchableOpacity onPress={() => {
                        onSignOut();
                        navigation.navigate({routeName: 'Login'})
                    }} style={ [{paddingHorizontal:15}] }>
                        <Icon name="exit-to-app" color={ StyleConstants.headerTintColor } />
                    </TouchableOpacity>
            }
        }
    }
)

export const CheckInStack = createStackNavigator({
    CheckIn: {
        screen: CheckIn,
        navigationOptions: {
            title: 'Check In'
        }
    },
    CheckInDetail: {
        screen: CheckInDetail,
        navigationOptions: {
            title: 'Check In Details'
        }
    }},
    {
        defaultNavigationOptions: headerNavigationOptions
    }
)

// export const androidHeader = Platform.select({
//     android: {
//         headerStyle: {
//             backgroundColor: '#293A8C',
//         },
//         headerTintColor: '#fff'
//     }
// })

export const TabsNavigator = Platform.select({
    ios: createBottomTabNavigator({
        Register: {
            screen: RegisterStack,
            navigationOptions: {
                tabBarLabel: 'Register',
                tabBarIcon: ({ tintColor }) => <Icon type="material-community" name="ticket" color={tintColor} />,
            }
        },
        CheckInStack: {
            screen: CheckInStack,
            navigationOptions: {
                tabBarLabel: 'Check In',
                tabBarIcon: ({ tintColor }) => <Icon name="photo-camera" color={tintColor} />
            }
        }
    }, {
        tabBarOptions: {
            activeTintColor: StyleConstants.headerTintColor,
            style: {
                backgroundColor: StyleConstants.primary,
            }
        }
    }),
    android: createMaterialBottomTabNavigator({
        Register: {
            screen: RegisterStack,
            navigationOptions: {
                tabBarLabel: 'Register',
                tabBarIcon: ({ tintColor }) => <Icon type="material-community" name="ticket" color={tintColor} />,
            }        
        },
        CheckIn: {
            screen: CheckInStack,
            navigationOptions: {
                tabBarLabel: 'Check In',
                tabBarIcon: ({ tintColor }) => <Icon name="photo-camera" color={tintColor} />
            }
        }
    }, {
        shifting: true,
        initialRouteName: 'Register',
        barStyle: { backgroundColor: StyleConstants.primary }
    })
})

export const AppNavigator = createSwitchNavigator(
    {
        AuthLoading: AuthLoading,
        Tabs: TabsNavigator,
        Login: LoginStack
    },
    {
        initialRouteName: "AuthLoading"
    }
);