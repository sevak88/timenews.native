import {AsyncStorage} from "react-native";

export async function saveItem(item) {
    try {
        //await AsyncStorage.clear();
        const oldSaved = await AsyncStorage.getItem('@TimenewsAppStore:savedNews');
        let oldSavedArray = JSON.parse(oldSaved);
        if(!oldSavedArray){
            oldSavedArray = [];
        }
        item.original_content = null;

        const newArray = [...oldSavedArray, item];
        await AsyncStorage.setItem('@TimenewsAppStore:savedNews', JSON.stringify(newArray));
    } catch (error) {
        // Error saving data
    }
}

export async function removeItem(item, id) {
    try {
        const oldSaved = await AsyncStorage.getItem('@TimenewsAppStore:savedNews');

        let oldSavedArray = JSON.parse(oldSaved);
        if(!oldSavedArray){
            oldSavedArray = [];
        }

        for(let i = oldSavedArray.length-1; i >= 0; i--){
            if(oldSavedArray[i].id === item.id){
                oldSavedArray.splice(i,1)
            }
        }
        await AsyncStorage.setItem('@TimenewsAppStore:savedNews', JSON.stringify(oldSavedArray));
    } catch (error) {
        // Error saving data
    }
}

export async function getNewsList() {
    try {
        //return await AsyncStorage.getItem('@TimenewsAppStore:savedNews');
        //return saved;
    } catch (error) {
        // Error saving data
    }
}