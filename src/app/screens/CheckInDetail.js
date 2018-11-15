import React, { Component } from 'react';
import { Text, View, Alert } from 'react-native';
import styles from '../Style'
import axios from 'axios';

var config = {
    headers: {'Authorization': "bearer " }
};

class CheckInDetail extends Component {
    constructor(props) {
        super(props);
        this.params = this.props.navigation.state.params;

        //do call 
        axios.post('http://54.148.136.72/api/v1/ticket/checkin', {
            code: this.params.code
        })
        .then(function(response) {
            console.log(response);
            if (response.status == 200) {
                Alert.alert("Success", response.data.message);
                //response.data.message
            } else {
                Alert.alert("Failure", response.data.message);
            }
        })
        .catch(function(error) {
            Alert.alert("Error", "Error checking in, please try again");
        });
    }
    
    render() {
        return (
            <View style={styles.container}>
                <Text></Text>
            </View>
        );
    }
}
  
export default CheckInDetail;