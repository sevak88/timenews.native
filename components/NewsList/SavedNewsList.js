import React, {Component} from 'react';
import {
    Image,
    StyleSheet,
    ListView,
    FlatList,
    View,
    TouchableOpacity,
    TouchableHighlight,
    ActivityIndicator
} from 'react-native';
import {
    Container,
    Header,
    Content,
    List,
    ListItem,
    Text,
    Body,
    Item,
    Button,
    Input,
    Icon,
    SwipeRow,
    Left,
    Right,
    Spinner,
    Thumbnail,
    Form,
    Picker
} from 'native-base';

import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
    MenuProvider
} from 'react-native-popup-menu';
import {OptimizedFlatList} from 'react-native-optimized-flatlist'
import SearchBar from "./../SearchBar";
import SingleNews from "./../SingleNews";
import material from "../../native-base-theme/variables/material";



export default class NewsList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            data: [],
            page: 1,
            seed: 1,
            error: null,
            refreshing: false,
            language: 'ru',
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.data === nextState.data) {
            return false;
        }
        return true
    }

    componentDidMount() {
        if (!this.state.search) {
            this.setState({
                loading: true,
                data: [],
            },() => this.getSavedNewsList());
        }
    };


    getSavedNewsList = () => {
        //todo getting saved
    };

     onRefresh = () => {
        this.setState(
            {
                page: 1,
                data: [],
                seed: this.state.seed + 1,
                refreshing: true
            },
            () => {
                this.getSavedNewsList();
            }
        );
    };

    handleLoadMore = () => {
        this.setState(
            {
                page: this.state.page + 1
            },
            () => {
                this.getSavedNewsList();
            }
        );
    };

    renderSeparator = () => {
        return (
            <View

            />
        );
    };

    renderHeader = () => {
        return (
            <Text/>
        );
    };

    renderFooter = () => {
        if (!this.state.loading) return null;

        return (
            <View
                style={{
                    paddingVertical: 20,
                    borderTopWidth: 1,
                    borderColor: "#CED0CE"
                }}
            >
                <ActivityIndicator animating size="large"/>
            </View>
        );
    };

    showItem = (item) => {
        this.props.screenProps.appNavigator.navigate(
            'SingleNews',
            {item}
        )
    };

    _renderItem = ({item}) => (
        <NewsItem
            id={item.id}
            onPressItem={this.showItem}
            //selected={!!this.state.selected.get(item.id)}
            item={item}
        />
    );

    render() {
        return (
            <Container>
                <MenuProvider>
                    <OptimizedFlatList
                        data={this.state.data}
                        renderItem={this._renderItem}
                        keyExtractor={item => item.id.toString()}
                        ListHeaderComponent={this.renderHeader}
                        ListFooterComponent={this.renderFooter}
                        onRefresh={this.onRefresh}
                        refreshing={this.state.refreshing}
                        onEndReached={this.handleLoadMore}
                    />
                </MenuProvider>
            </Container>

        );
    }
}


class NewsItem extends React.PureComponent {
    _onPress = (item) => {
        this.props.onPressItem(this.props.item);
    };

    render() {
        return (
            <ListItem avatar onPress={() => this._onPress(this.props.item)}>
                <Thumbnail square style={{width: 100}} source={{uri: this.props.item.enclosureUrl}}/>
                <Body noBorder>
                <Text style={{fontSize: 14}} numberOfLines={3}>{this.props.item.title}</Text>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <Text note style={{fontSize: 10}}>{this.props.item.timeString}</Text>
                    <Text note style={{fontSize: 10}}>{this.props.item.site}</Text>
                </View>

                </Body>
                <Right>
                    <Menu>
                        <MenuTrigger>
                            <Icon name="more" style={{padding:10}}/>
                        </MenuTrigger>
                        <MenuOptions>
                            <MenuOption onSelect={() => alert(`Delete`)} style={{flexDirection: 'row'}}>
                                <Icon name="bookmark" style={styles.menuIcon}/>
                                <Text style={styles.menuText}>Save</Text>
                            </MenuOption>
                            <MenuOption onSelect={() => alert("Share")} style={{flexDirection: 'row'}}>
                                <Icon name="share"  style={styles.menuIcon}/>
                                <Text style={styles.menuText}>Share</Text>
                            </MenuOption>
                        </MenuOptions>
                    </Menu>
                </Right>
            </ListItem>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 14,
    },
    menuIcon:{
        padding:5,
        color:material.brandPrimary,
        fontSize:16,
    },
    menuText:{
        padding:3,
        fontSize:14,
    }
})