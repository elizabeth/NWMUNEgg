import React, { Component } from 'react';
import { SafeAreaView } from 'react-navigation'
import { Alert, StatusBar } from 'react-native';
import { ThemeProvider, Input, Button } from 'react-native-elements'
import styles from '../Style'
import Theme from '../Theme'
import axios from 'axios';
import { getToken } from "../auth";

const emailReg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
// const Email = t.refinement(t.String, email => {
//     const reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/; //or any other regexp
//     return reg.test(email);
// });

// const VerifyEmailEquality = t.refinement(t.String, value => {
//     // return true
//     return value.toLowerCase() == this.value.email.toLowerCase()
// })

// const Purchase = t.struct({
//     quantity: t.Number,
//     email: Email,
//     verifyEmail: VerifyEmailEquality,
// });

// var value = {
//     quantity: 1
// };

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: '1',
            emailInputValid: false,
            verifyEmailInputValid: false
        }
    }

    validateEmail = (text) => {
        this.setState({ email: text }, () => {
            if (!emailReg.test(this.state.email)) {
                this.setState({emailInputValid: false});
            } else {
                this.setState({emailInputValid: true});
            }

            if (this.state.email === this.state.verifyEmail) {
                this.setState({verifyEmailInputValid: true});
            } else {
                this.setState({verifyEmailInputValid: false});
            }
        });
    }

    validateVerifyEmail = (text) => {
        this.setState({ verifyEmail: text }, () => {
            if (this.state.email === this.state.verifyEmail) {
                this.setState({verifyEmailInputValid: true});
            } else {
                this.setState({verifyEmailInputValid: false});
            }
        })
    }

    clearForm() {
        this.setState({ quantity: '1', emailInputValid: false, verifyEmailInputValid: false, email: '', verifyEmail: '' });
        this.refs.emailInput.focus();
    }

    handleSubmit = () => {
        const quantity = this.state.quantity;
        const email = this.state.email;

        if (quantity && email) {
            getToken()
                .then(res => {
                    Alert.alert(
                        'Confirm Purchase',
                        'Are you sure you wish to purchase ' + quantity + ' tickets?',
                        [
                            {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                            {text: 'Confirm', onPress: () => {
                                if (res) {
                                    axios.post('http://54.148.136.72/api/v1/ticket/generate', 
                                    {
                                        quantity: parseInt(quantity),
                                        email: email
                                    },
                                    {
                                        headers: {'Authorization': "bearer " + res}
                                    })
                                    .then((response) => {
                                        if (response.status == 200) {
                                            Alert.alert("Success", response.data.message);
                                            this.clearForm();
                                        } else {
                                            Alert.alert("Error", error.toString());
                                        }
                                    })
                                    .catch((error) => {
                                        Alert.alert("Error", "Error purchasing ticket, please try again. " + error.toString());
                                    });
                                } else {
                                    Alert.alert("Error", "User is not logged in");
                                }
                            }},
                        ],
                        { cancelable: false }
                    )   
                }).catch(err => {
                    Alert.alert("Error", "User is not logged in");
                });
        } else {
            Alert.alert("Please fill out the form");
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar
                    backgroundColor={StyleConstants.primaryDark}
                    barStyle="light-content"
                />

                <ThemeProvider theme={Theme}>
                    <Input
                        label="Quantity"
                        keyboardType="numeric"
                        leftIcon={{ name: 'redeem' }}
                        onChangeText={(text) => this.setState({quantity: text.replace(/[^0-9]/g, '')})}
                        value={this.state.quantity}
                    />

                    <Input
                        ref='emailInput'
                        label='Email'
                        autoCapitalize ='none'
                        keyboardType='email-address'
                        textContentType='emailAddress'
                        autoFocus={true}
                        leftIcon={{ name: 'mail-outline' }}
                        onChangeText={(text) => this.validateEmail(text)} 
                        value={this.state.email}
                    />

                    <Input
                        label='Verify email'
                        autoCapitalize ='none'
                        keyboardType='email-address'
                        textContentType='emailAddress'
                        leftIcon={{ name: 'mail-outline' }}
                        onChangeText={(text) => this.validateVerifyEmail(text)} 
                        value={this.state.verifyEmail}
                    />
                    
                    <Button
                        title="Purchase"
                        onPress={this.handleSubmit}
                        disabled={ !this.state.quantity || !this.state.emailInputValid || !this.state.verifyEmailInputValid }
                    />
                </ThemeProvider>
            </SafeAreaView>
        );
    }
}
  
export default Register;