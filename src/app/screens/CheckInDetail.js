import React, { Component } from 'react';
import { Text, View } from 'react-native';
import styles from '../../Style'

class CheckInDetail extends Component<Props> {
    constructor(props) {
        super(props);
        this.params = this.props.navigation.state.params;

        //do call 
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