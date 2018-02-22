import React, {Component} from 'react';
import { Platform, StyleSheet, Text, Image, View} from 'react-native';
import { StyleProvider } from 'native-base';
import { StackNavigator  } from 'react-navigation';
import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material';

//import NewsList from "./components/NewsList";
import SingleNews from "./components/SingleNews";
import NewsListsScreen from "./components/NewsListsScreen";


type Props = {};
const  AppNavigator = StackNavigator({
    NewsListsScreen: {
        screen: NewsListsScreen,
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
            <StyleProvider style={getTheme(material)}>
                <View style={styles.container}>
                    <AppNavigator/>
                </View>
            </StyleProvider>
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
