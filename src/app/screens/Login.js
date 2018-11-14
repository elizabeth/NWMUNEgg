import React, { Component } from 'react';
import { SafeAreaView } from 'react-navigation'
import { Button, Alert } from 'react-native';
import styles from '../Style'
import t from 'tcomb-form-native';
import axios from 'axios';

const Form = t.form.Form;

const User = t.struct({
    username: t.String,
    password: t.String,
});

// var options = {
//     fields: {
//         email: {
//             error: 'Insert a valid email'
//         }
//     }
// }

class Login extends Component {
    clearForm() {
        this.setState({ value: null });
    }

    handleSubmit = () => {
        const value = this._form.getValue();

        if (value) {
            axios.post('http://localhost:3333/api/v1/users/authenticate', {
                email: value.email,
                password: value.password
            })
            .then(function(response) {
                console.log(response);
                if (response.status == 200) {
                    //response.data.message
                    Alert.alert(response.data.message);
                    this.clearForm();
                }
            })
            .catch(function(error) {
                Alert.alert(error);
            });
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
 
                <Form 
                    ref={c => this._form = c}
                    type={User} 
                    value={value}
                />

                <Button
                    title="Log in"
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