import { AsyncStorage } from "react-native";

export const BEARER_TOKEN = "BEARER_TOKEN";

export const onSignIn = (token) => AsyncStorage.setItem(BEARER_TOKEN, token);

export const onSignOut = () => AsyncStorage.removeItem(BEARER_TOKEN);

export const isSignedIn = () => {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem(BEARER_TOKEN)
        .then(res => {
            if (res !== null) {
                resolve(true);
            } else {
                resolve(false);
            }
        })
        .catch(err => reject(err));
    });
};

export const getToken = () => {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem(BEARER_TOKEN)
        .then(res => {
            if (res !== null) {
                resolve(res);
            } else {
                reject(null);
            }
        })
        .catch(err => reject(err));
    });
}