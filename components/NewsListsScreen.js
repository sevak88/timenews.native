import React, { Component } from 'react';
import { TabNavigator } from 'react-navigation';
import NewsList from './NewsList/NewsList'
import material from '../native-base-theme/variables/material'



export default class NewsListsScreen extends Component {

    constructor(props) {
        super(props);
    }

    ListsNavigator = TabNavigator({
        All: {
            screen: NewsList,
        },
        Sport: {
            screen: NewsList,
        },
        World: {
            screen: NewsList,
        },
        World1: {
            screen: NewsList,
        },
        World2: {
            screen: NewsList,
        },
        World3: {
            screen: NewsList,
        },
        World4: {
            screen: NewsList,
        },
        World5: {
            screen: NewsList,
        },
        World6: {
            screen: NewsList,
        },
    },{
        tabBarOptions: {
            scrollEnabled: true,
            style: {
                backgroundColor: material.brandPrimary,
            },
        }
    });


    render() {
        return (
            <this.ListsNavigator screenProps={{appNavigator:this.props.navigation}}/>
        );
    }
}
