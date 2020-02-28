import React, { Component } from 'react';
import { Text, View, StyleSheet, StatusBar, ScrollView } from 'react-native';
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
                axios.post('http://44.228.41.135/api/v1/ticket/checkin', {
                    code: this.params.code
                },
                {
                    headers: {'Authorization': "bearer " + res}
                })
                .then(response => {
                    var data = response.data.data;

                    var keg_quantity = data.redeemed_keg_tickets;
                    var checked_in = data.checked_in;
                    var checked_in_remaining = data.ticket_quantity - checked_in;
                    // "ticket_quantity": 5,
                    // "keg_quantity": 5,
                    // "checked_in": 2,
                    // "redeemed_keg_tickets": 5,
                    if (response.status == 200) {
                        if (checked_in == 0) {
                            //redeem keg tickets only
                            this.setState({message: response.data.message, doneProcessing: true, admission: false, kegTickets: keg_quantity, valid: true });
                        } else if (checked_in == 1) {
                            this.setState({message: response.data.message, doneProcessing: true, admission: true, ticketsRemaining: checked_in_remaining, kegTickets: keg_quantity, valid: true });
                        }  else {
                            this.setState({message: response.data.message, doneProcessing: true, admission: true, ticketsRemaining: checked_in_remaining, kegTickets: 0, valid: true});
                        }
                    } else if (response.status == 202) {
                        //ticket has reached max number of check ins
                        this.setState({message: response.data.message, doneProcessing: true, tickets: checked_in, kegTickets: keg_quantity, valid: false, data: data});
                    } else {
                        this.setState({message: response.data.message, doneProcessing: true, tickets: checked_in, kegTickets: keg_quantity, valid: false});
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
            <Text>{item}</Text>
        );
      }

    render() {
        if (this.state.doneProcessing) {
            if (this.state.valid) {
                if (this.state.admission) {
                    if (this.state.kegTickets > 0) {
                        //admission and keg tickets
                        return (
                            <ScrollView style={styles.container}>
                                <StatusBar backgroundColor="#018901" barStyle="light-content" />

                                <View style={styles.rowContainer}>
                                    <Icon name="check-circle" size={100} color="#018901" />
                                    <Icon name="local-drink" size={100} color="#FFDB00" />
                                </View>
                                <Text style={[checkInStyles.center, checkInStyles.large]}>{this.state.message}</Text>
                                <Text style={[checkInStyles.center, checkInStyles.large]}>Keg Tickets: {this.state.kegTickets}</Text>
                                
                                <Text style={checkInStyles.log}>Check-ins remaining: {this.state.ticketsRemaining}</Text>    
                            </ScrollView>
                        );
                    } else {
                        //admission only, no keg tickets
                        return (
                            <ScrollView style={styles.container}>
                                <StatusBar backgroundColor="#018901" barStyle="light-content" />

                                <Icon name="check-circle" size={100} color="#018901" />
                                <Text style={[checkInStyles.center, checkInStyles.large]}>{this.state.message}</Text>

                                <Text style={checkInStyles.log}>Check-ins remaining: {this.state.ticketsRemaining}</Text>    
                            </ScrollView>
                        );
                    }
                } else {
                    //keg tickets only
                    return (
                        <ScrollView style={styles.container}>
                            <StatusBar backgroundColor="#FFDB00" barStyle="light-content" />

                            <Icon name="local-drink" size={100} color="#FFDB00" />
                            <Text style={[checkInStyles.center, checkInStyles.large]}>{this.state.message}</Text>
                            <Text style={[checkInStyles.center, checkInStyles.large]}>Keg tickets: {this.state.kegTickets}</Text>
                        </ScrollView>
                    );
                }
            } else if (this.state.error) {
                return (
                    <ScrollView style={styles.container}>
                        <StatusBar backgroundColor="#ffdf00" barStyle="light-content" />

                        <Icon name="warning" size={100} color="#ffdf00" />
                        <Text style={[checkInStyles.center, checkInStyles.large]}>{this.state.message}</Text>
                    </ScrollView>
                );
            } else if (!this.state.error) {
                return (
                    <ScrollView style={styles.container}>
                        <StatusBar backgroundColor="#ff0000" barStyle="light-content" />

                        <Icon name="block" size={100} color="#ff0000" />
                        <Text style={[checkInStyles.center, checkInStyles.large]}>{this.state.message}</Text>

                        <Text style={checkInStyles.log}>
                            Redeemed admission: {this.state.tickets}{"\n"}
                            Redeemed keg tickets: {this.state.kegTickets}
                        </Text>

                        <Text style={checkInStyles.log}>Check in log:</Text>    
                        {this.state.data.check_in_log && this.state.data.check_in_log.map((log, index) => {
                            return (<Text key={index}>{log}</Text>)
                        })}
                    </ScrollView>
                );
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
    },
    log: {
        marginTop: 15
    }
  });
  
export default CheckInDetail;