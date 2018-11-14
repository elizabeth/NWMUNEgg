import React, { Component } from 'react';
import { Text, View } from 'react-native';
import styles from '../Style'

class CheckInDetail extends Component<Props> {
    constructor(props) {
        super(props);
        this.params = this.props.navigation.state.params;

        //do call 
        axios.post('http://localhost:3333/api/v1/ticket/checkin', {
            code: this.params.code
        })
        .then(function(response) {
            console.log(response);
            if (response.status == 200) {
                //response.data.message
                Alert.alert(response.data.message);
            }
        })
        .catch(function(error) {
            Alert.alert(error);
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