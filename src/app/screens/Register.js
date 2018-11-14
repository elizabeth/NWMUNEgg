import React, { Component } from 'react';
import { SafeAreaView } from 'react-navigation'
import { Button, Alert } from 'react-native';
import styles from '../Style'
import t from 'tcomb-form-native';

const Form = t.form.Form;

const Email = t.refinement(t.String, email => {
    const reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/; //or any other regexp
    return reg.test(email);
});

const VerifyEmailEquality = t.refinement(t.String, value => {
    return true
    // return value === this.state.value.email
  })

const Purchase = t.struct({
    quantity: t.Number,
    email: Email,
    verifyEmail: VerifyEmailEquality,
});

var value = {
    quantity: 1
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
            Alert.alert(
                'Confirm Purchase',
                'Are you sure you wish to purchase ' + value.quantity + ' tickets?',
                [
                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    {text: 'Confirm', onPress: () => {
                        this.clearForm();
                        //send qty and email
                        //if successful, clear form
                    }},
                ],
                { cancelable: false }
            )
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
 
                <Form 
                    ref={c => this._form = c}
                    type={Purchase} 
                    value={value}
                />

                <Button
                    title="Purchase Ticket"
                    onPress={this.handleSubmit}
                />
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