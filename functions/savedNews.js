import {AsyncStorage} from "react-native";

export async function saveItem(uid) {
    try {
        const myArray = await AsyncStorage.setItem('@TimenewsStore:savedNews', uid);
        console.log(myArray)
    } catch (error) {
        // Error saving data
    }
}

export async function getNewsList() {
    try {
        const myArray = await AsyncStorage.getItem('@TimenewsStore:savedNews');
        console.log(myArray)
    } catch (error) {
        // Error saving data
    }
}