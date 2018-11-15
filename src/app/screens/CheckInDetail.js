import React, { Component } from 'react';
import { Text, View, Alert } from 'react-native';
import styles from '../Style'
import axios from 'axios';
import { getToken } from "../auth";

var config = {
    headers: {'Authorization': "bearer " }
};

class CheckInDetail extends Component {
    constructor(props) {
        super(props);
        this.params = this.props.navigation.state.params;
        this.state = {
            message: ""
        };


        //do call 
        var token = getToken();

        if (token) {
            axios.post('http://54.148.136.72/api/v1/ticket/checkin', {
                code: this.params.code
            },
            {
                headers: {'Authorization': "bearer " + token}
            })
            .then(function(response) {
                console.log(response);
                if (response.status == 200) {
                    // Alert.alert("Success", response.data.message);
                    this.setState({message: response.data.message});
                } else {
                    // Alert.alert("Failure", response.data.message);
                    this.setState({message: response.data.message});
                }
            })
            .catch(function(error) {
                this.setState({message: "Error checking in, please try again"});
                // Alert.alert("Error", "Error checking in, please try again");
            });
        } else {
            // Alert.alert("Error", "User not logged in");
            this.setState({message: "Error, user is not logged in"});
        }
    }
    
    render() {
        return (
            <View style={styles.container}>
                <Text>{message}</Text>
            </View>
        );
    }
}
  
export default CheckInDetail;