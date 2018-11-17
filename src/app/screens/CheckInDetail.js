import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import styles from '../Style'
import axios from 'axios';
import { getToken } from "../auth";
import { Icon } from 'react-native-elements';

class CheckInDetail extends Component {
    constructor(props) {
        super(props);
        this.params = this.props.navigation.state.params;
        this.state = {
            message: "",
            doneProcessing: false,
            error: false,
            valid: false,
            data: {}
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
                    if (response.status == 200) {
                        this.setState({message: response.data.message, doneProcessing: true, valid: true});
                    } else if (response.status == 202) {
                        //ticket has reached max number of check ins
                        this.setState({message: response.data.message, doneProcessing: true, valid: false, data: response.data.data});
                    } else {
                        this.setState({message: response.data.message, doneProcessing: true, valid: false});
                    }
                })
                .catch(error => {
                    this.setState({message: error.toString(), doneProcessing: true, error: true});
                    // Alert.alert("Error", "Error checking in, please try again");
                });
            }).catch(err => {
                this.setState({message: "Error, user is not logged in", doneProcessing: true, error: true});
            }
        );
    }
    
    renderItem({item}){
        return(
            <Text>aaaa{item}</Text>
        );
      }

    render() {
        if (this.state.doneProcessing) {
            if (this.state.valid) {
                return (
                    <View style={styles.container}>
                        <Icon name="check-circle" size={100} color="#00ff00" />
                        <Text style={[checkInStyles.center, checkInStyles.large]}>{this.state.message}</Text>
                    </View>
                )
            } else if (this.state.error) {
                return (
                    <View style={styles.container}>
                        <Icon name="warning" size={100} color="#ffdf00" />
                        <Text style={[checkInStyles.center, checkInStyles.large]}>{this.state.message}</Text>
                    </View>
                )
            } else if (!this.state.error) {
                return (
                    <View style={styles.container}>
                        <Icon name="block" size={100} color="#ff0000" />
                        <Text style={[checkInStyles.center, checkInStyles.large]}>{this.state.message}</Text>
                        <Text>Check in log:</Text>    
                        {this.state.data.check_in_log.map((log, index) => {
                            return (<Text key={index}>{log}</Text>)
                        })}
                    </View>
                )
            }
    
        } else {
            return null;
        }
    }
}

const checkInStyles = StyleSheet.create({
    center: {
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    large: {
        fontSize: 30
    }
  });
  
export default CheckInDetail;