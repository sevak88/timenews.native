import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    Image,
    View
} from 'react-native';
import logo from './assets/logo-rss.png';

import NewsList from "./components/NewsList";

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
    render() {
        return (
            <View style={styles.container}>
                <NewsList/>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        //alignItems: 'center',
        //backgroundColor: '#009688'
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
