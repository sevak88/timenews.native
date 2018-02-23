import React, {Component} from 'react';
import {Image, StyleSheet, ListView, FlatList, View, TouchableOpacity, TouchableHighlight, ActivityIndicator} from 'react-native';
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

import {OptimizedFlatList} from 'react-native-optimized-flatlist'
import SingleNews from "./../SingleNews";




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
            search: '',
            action: '',
        };


    }

    shouldComponentUpdate(nextProps, nextState) {
        if(this.state.data.length === nextState.data.length) {
            return false;
        }
        return true
    }

    componentDidMount() {
        if(!this.state.search) {
            this.setState({
                action: '/get/news/images/'
            });
        }
        this.makeRemoteRequest();
    };




    makeRemoteRequest = () => {
        console.log("start loading page: " + this.state.page)
        const {page, seed} = this.state;
        const url = 'http://api.timenews.org/' + this.state.language + this.state.action + 'page/' +this.state.page+'/';
        this.setState({loading: true});

        fetch(url)
            .then(res => res.json())
            .then(res => {
                console.log("end loading page: " + this.state.page);
                this.setState({
                    data: page === 1 ? res.payload.items : [...this.state.data, ...res.payload.items],
                    error: res.error || null,
                    loading: false,
                    refreshing: false
                });
            })
            .catch(error => {
                this.setState({error, loading: false});
            });
    };

    onSearch = () => {
        console.log(this.state.search);
        this.setState({
            loading: false,
            data: [],
            page: 1,
            seed: 1,
            error: null,
            refreshing: false,
            action: '/get/news/images/search/'+this.state.search+'/'
        },() => this.makeRemoteRequest());
    };

    handleRefresh = () => {
        this.setState(
            {
                page: 1,
                seed: this.state.seed + 1,
                refreshing: true
            },
            () => {
                this.makeRemoteRequest();
            }
        );
    };

    handleLoadMore = () => {
        this.setState(
            {
                page: this.state.page + 1
            },
            () => {
                this.makeRemoteRequest();
            }
        );
    };

    renderSeparator = () => {
        return (
            <View

            />
        );
    };

    clearSearch = () =>{
        this.setState({
            search: ""
        })
    }

    renderHeader = () => {
        return (
            <Header searchBar rounded>
            <Item>
                <Icon name="ios-search" />
                <Input placeholder="Search" onChangeText={(search) => this.setState({search})} onSubmitEditing={this.onSearch}/>

                {this.state.search ? <Icon name="close"/> : <Icon name="options" />}

            </Item>
            <Button transparent onPress={this.onSearch}>
                <Text>Search</Text>
            </Button>
        </Header>
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

    showItem = (item) =>{
        this.props.navigation.navigate(
            'SingleNews',
            {item}
        )
    };


    _onPressItem = (id: string) => {
        // updater functions are preferred for transactional updates
        this.setState((state) => {
            // copy the map rather than modifying state.
            const selected = new Map(state.selected);
            selected.set(id, !selected.get(id)); // toggle
            return {selected};
        });
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

                <OptimizedFlatList
                    data={this.state.data}
                    renderItem={this._renderItem}
                    keyExtractor={item => item.id.toString()}
                    ListHeaderComponent={this.renderHeader}
                    ListFooterComponent={this.renderFooter}
                    onRefresh={this.handleRefresh}
                    refreshing={this.state.refreshing}
                    onEndReached={this.handleLoadMore}
                />

        );
    }
}


class NewsItem extends React.PureComponent {
    _onPress = (item) => {
        this.props.onPressItem(this.props.item);
    };

    render() {
        return (
            <ListItem  avatar onPress={() => this._onPress(this.props.item)}>
                <Thumbnail square style={{width:100} }  source={{uri: this.props.item.enclosureUrl}} />
                <Body noBorder>
                <Text style={{fontSize:14}} numberOfLines={2}>{this.props.item.title}</Text>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <Text note style={{fontSize:10}}>{this.props.item.timeString}</Text>
                    <Text note style={{fontSize:10}}>{this.props.item.site}</Text>
                </View>
                </Body>
            </ListItem>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 14,
    }
})