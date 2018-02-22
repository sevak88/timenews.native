import React, {Component} from 'react';
import { Platform, StyleSheet, Text, Image, View} from 'react-native';
import { StackNavigator  } from 'react-navigation';

import NewsList from "./components/NewsList";
import SingleNews from "./components/SingleNews";


type Props = {};
const  AppNavigator = StackNavigator({
    NewsList: {
        screen: NewsList,
    },
    SingleNews: {
        screen: SingleNews,
    },
},
{
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
});

export default class App extends Component<Props> {
    render() {
        return (
            <View style={styles.container}>
               <AppNavigator/>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        //alignItems: 'center',
        backgroundColor: '#FFFFFF'
    },
    logo:{
        resizeMode: 'cover',
        width: '100%',
        height: '100%',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
