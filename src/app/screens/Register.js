import React, { Component } from 'react';
import { SafeAreaView } from 'react-navigation'
import { Platform, StyleSheet, Text, View } from 'react-native';
import styles from '../Style'

type Props = {};
class Register extends Component<Props> {
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={[styles.container, styles.innerContainer]}>
                    <Text style={styles.welcome}>Welcome to my app!</Text>
                </View>
            </SafeAreaView>
        );
    }
}
  
// const registerStyles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     welcome: {
//         fontSize: 20,
//         textAlign: 'center',
//         margin: 10,
//     }
// });
  
export default Register;