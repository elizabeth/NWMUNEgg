import React, { Component } from 'react';
import { SafeAreaView } from 'react-navigation'
import { Alert, StatusBar, View} from 'react-native';
import { ThemeProvider, Input, Button } from 'react-native-elements'
import styles from '../Style'
import Theme from '../Theme'
import axios from 'axios';
import { onSignIn } from "../auth";

const emailReg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emailInputValid: false
        }
    }

    validateEmail = (text) => {
        this.setState({ email: text }, () => {
            if (!emailReg.test(this.state.email)) {
                this.setState({emailInputValid: false});
            } else {
                this.setState({emailInputValid: true});
            }
        });
    }

    handleSubmit = () => {
        const email =  this.state.email;
        const password = this.state.password;

        if (email && password) {
            axios.post('http://54.148.136.72/api/v1/users/authenticate', {
                email: email,
                password: password
            })
            .then((response) => {
                if (response.status == 200) {
                    //navigate
                    onSignIn(response.data.data.token);
                    this.props.navigation.navigate('Tabs');
                }
            })
            .catch(function(error) {
                Alert.alert("Unable to log in", error.toString());
            });
        } else {
            Alert.alert("Please enter a username and password")
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar
                    backgroundColor={StyleConstants.primaryDark}
                    barStyle="light-content"
                />

                <View style={ styles.innerContainer }>
                    <ThemeProvider theme={Theme}>
                        <Input
                            placeholder='Email'
                            autoCapitalize ='none'
                            keyboardType='email-address'
                            textContentType='emailAddress'
                            leftIcon={{ name: 'mail-outline' }}
                            onChangeText={(text) => this.validateEmail(text)} 
                        />

                        <Input 
                            placeholder='Password'
                            textContentType='password'
                            containerStyle={{ marginTop: 8 }}
                            leftIcon={{ name: 'lock-outline' }}
                            onChangeText={(text) => this.setState({ password: text })}
                            secureTextEntry={ true }/>

                        <Button
                            title="Log in"
                            onPress={ this.handleSubmit }
                            containerStyle={{ width: '100%' }}
                            disabled={ !this.state.emailInputValid || !this.state.password }
                        />
                    </ThemeProvider>
                </View>
            </SafeAreaView>
        );
    }
}
  
export default LoginPage;