import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator, StackNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { Icon } from 'react-native-elements';

import Register from '../screens/Register'
import CheckIn from '../screens/CheckIn';
import CheckInDetail from '../screens/CheckInDetail';

export const RegisterStack = StackNavigator({
    Register: {
        screen: Register,
        navigationOptions: {
            title: 'Register',
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

export const CheckInStack = StackNavigator({
    CheckIn: {
        screen: CheckIn,
        navigationOptions: {
            title: 'Check In',
            ...Platform.select({
                android: {
                    headerStyle: {
                        backgroundColor: '#293A8C',
                    },
                    headerTintColor: '#fff'
                }
            })
        }
    },
    CheckInDetail: {
        screen: CheckInDetail,
        navigationOptions: {
            title: 'Check In Details',
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

// export const androidHeader = Platform.select({
//     android: {
//         headerStyle: {
//             backgroundColor: '#293A8C',
//         },
//         headerTintColor: '#fff'
//     }
// })

export const Tabs = Platform.select({
    ios: createBottomTabNavigator({
        Register: {
            screen: RegisterStack,
            navigationOptions: {
                tabBarLabel: 'Register',
                tabBarIcon: ({ tintColor }) => <Icon name="redeem" size={30} color={tintColor} />,
            }
        },
        CheckInStack: {
            screen: CheckInStack,
            navigationOptions: {
                tabBarLabel: 'Check In',
                tabBarIcon: ({ tintColor }) => <Icon name="photo-camera" size={30} color={tintColor} />
            }
        }
    }, {
        tabBarOptions: {
            activeTintColor: '#293A8C'
        }
    }),
    android: createMaterialBottomTabNavigator({
        Register: {
            screen: RegisterStack,
            navigationOptions: {
                tabBarLabel: 'Register',
                tabBarIcon: ({ tintColor }) => <Icon name="redeem" color={tintColor} />,
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
        barStyle: { backgroundColor: '#293A8C' },
    })
})