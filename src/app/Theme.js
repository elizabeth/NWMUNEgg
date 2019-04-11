import { Platform } from 'react-native';

export default Theme = {
    Input: {
        marginLeft: 8,
        containerStyle: {
            marginTop: 8
        },
        leftIconContainerStyle: {
            marginLeft: 8
        },
        // inputContainerStyle: {
        //     ...Platform.select({
        //         'ios': {
        //             borderRadius: 15,
        //             borderWidth: 1
        //         }
        //     })
        // }
    }, 
    Button: {
        ...Platform.select({
            'android': {
                raised: true,
                containerStyle: {
                    marginHorizontal: 10,
                    marginTop: 8
                }
            },
            'ios': {
                type: 'outline',
                containerStyle: {
                    padding: 10,
                    paddingTop: 8
                }
            }
        })
    },
}