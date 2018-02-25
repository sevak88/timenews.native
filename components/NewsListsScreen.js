import React, { Component } from 'react';
import { DrawerNavigator } from 'react-navigation';
import NewsList from './NewsList/NewsList'
import SavedNewsList from './NewsList/SavedNewsList'
import material from '../native-base-theme/variables/material'



const ListsNavigator = DrawerNavigator({
    News: {
        screen: NewsList,
    },
    Saved: {
        screen: SavedNewsList,
    }
});

export default class NewsListsScreen extends Component {

    constructor(props) {
        super(props);
    }




    render() {
        return (
            <ListsNavigator screenProps={{appNavigator:this.props.navigation}}/>
        );
    }
}
