import { Platform } from 'react-native';

export default Theme = {
    Button: {
        ...Platform.select({
            'android': {
                raised: true
            },
            'ios': {
                type: 'outline'
            }
        })
    },
}