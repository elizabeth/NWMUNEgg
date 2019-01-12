import React, { Component } from 'react';
import { SafeAreaView } from 'react-navigation'
import { Button, Alert } from 'react-native';
import styles from '../Style'
import t from 'tcomb-form-native';
import axios from 'axios';
import { onSignIn } from "../auth";

const Form = t.form.Form;

const Email = t.refinement(t.String, email => {
    const reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/; //or any other regexp
    return reg.test(email);
});

const User = t.struct({
    username: Email,
    password: t.String
});

var options = {
    fields: {
        username: {
            label: "Username (email)"
        },
        password: {
            password: true,
            secureTextEntry: true
        }
    }
}

class LoginPage extends Component {
    handleSubmit = () => {
        const value = this._form.getValue();

        if (value) {
            axios.post('http://54.148.136.72/api/v1/users/authenticate', {
                email: value.username,
                password: value.password
            })
            .then((response) => {
                if (response.status == 200) {
                    //navigate
                    onSignIn(response.data.data.token);
                    this.props.navigation.navigate('Tabs');
                }
            })
            .catch(function(error) {
                Alert.alert("Error", error.toString());
            });
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
 
                <Form 
                    ref={c => this._form = c}
                    type={User} 
                    options={options}
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
  
export default LoginPage;