import React, { Component } from 'react';
import { Text, View, Alert } from 'react-native';
import styles from '../Style'
import axios from 'axios';
import { getToken } from "../auth";

class CheckInDetail extends Component {
    constructor(props) {
        super(props);
        this.params = this.props.navigation.state.params;
        this.state = {
            message: ""
        };

        getToken()
            .then(res => {
                axios.post('http://54.148.136.72/api/v1/ticket/checkin', {
                    code: this.params.code
                },
                {
                    headers: {'Authorization': "bearer " + res}
                })
                .then(response => {
                    if (response.status == 201) {
                        this.setState({message: response.data.message});
                    } else if (response.status == 400) {
                        //code not provided
                        //code does not exist
                        //ticket has reached max number of check ins
                        this.setState({message: response.data.message});
                    } else if (response.status == 500) {
                        this.setState({message: "Internal error, please contact admin. " + response.data.message});
                    } else {
                        this.setState({message: response.data.message});
                    }
                })
                .catch(error => {
                    this.setState({message: "Error checking in, please try again. " + error.toString()});
                    // Alert.alert("Error", "Error checking in, please try again");
                });
            }).catch(err => {
                this.setState({message: "Error, user is not logged in"});
            }
        );
    }
    
    render() {
        return (
            <View style={styles.container}>
                <Text>{this.state.message}</Text>
            </View>
        );
    }
}
  
export default CheckInDetail;