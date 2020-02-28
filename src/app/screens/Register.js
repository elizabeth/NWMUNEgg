import React, { Component } from 'react';
import { SafeAreaView } from 'react-navigation'
import { Button, Alert, ScrollView } from 'react-native';
import styles from '../Style'
import t from 'tcomb-form-native';
import axios from 'axios';
import { getToken } from "../auth";
import { Icon } from 'react-native-elements';

const Form = t.form.Form;

const Email = t.refinement(t.String, email => {
    const reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/; //or any other regexp
    return reg.test(email);
});

const VerifyEmailEquality = t.refinement(t.String, value => {
    return true
    // return value.toLowerCase() === this.value.email.toLowerCase()
  })

const Purchase = t.struct({
    admission: t.Number,
    kegTickets: t.Number,
    email: Email,
    verifyEmail: VerifyEmailEquality,
});

var value = {
    admission: 1,
    kegTickets: 0
};

// var options = {
//     fields: {
//         email: {
//             error: 'Insert a valid email'
//         }
//     }
// }

class Register extends Component {
    clearForm() {
        this.setState({ value: null });
    }

    handleSubmit = () => {
        const value = this._form.getValue(); // use that ref to get the form value
        // console.log('value: ', value);

        if (value) {
            getToken()
                .then(res => {
                    Alert.alert(
                        'Confirm Purchase',
                        `Are you sure you wish to purchase ${value.admission} admission tickets and ${value.kegTickets} keg tickets?`,
                        [
                            {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                            {text: 'Confirm', onPress: () => {
                                if (res) {
                                    axios.post('http://44.228.41.135/api/v1/ticket/generate', 
                                    {
                                        ticket_quantity: value.admission,
                                        keg_quantity: value.kegTickets,
                                        email: value.email.toString()
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
            Alert.alert("Error", "Error purchasing ticket, please contact admins");
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    
                        
                    <Form 
                        ref={c => this._form = c}
                        type={Purchase} 
                        value={value}
                    />

                    <Button
                        title="Purchase Ticket"
                        onPress={this.handleSubmit}
                    />
                </ScrollView>
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