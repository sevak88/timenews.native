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
    Thumbnail
} from 'native-base';
import SingleNews from "./SingleNews";

export default class NewsList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: [],
            page: 1,
            seed: 1,
            error: null,
            refreshing: false
        };
    }

    componentDidMount() {
        this.makeRemoteRequest();
    }

    makeRemoteRequest = () => {
        console.log("start loading page: " + this.state.page)
        const {page, seed} = this.state;
        const url = 'http://api.timenews.org/ru/get/news/images/page/'+this.state.page+'/';
        this.setState({loading: true});

        fetch(url)
            .then(res => res.json())
            .then(res => {
                console.log("end loading page: " + this.state.page)
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

    renderHeader = () => {
        return <Header placeholder="Type Here..." lightTheme round/>;
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
    }

    render() {
        return (

                <FlatList
                    data={this.state.data}
                    renderItem={({item}) => (
                            <ListItem  avatar onPress={() => this.showItem(item)}>
                                <Thumbnail square style={{width:100} }  source={{uri: item.enclosureUrl}} />
                                <Body noBorder>
                                    <Text style={{fontSize:12}} numberOfLines={2}>{item.title}</Text>
                                    <Text note>{item.site}</Text>
                                </Body>
                            </ListItem>
                    )}
                    keyExtractor={item => item.email}
                    ItemSeparatorComponent={this.renderSeparator}
                    ListHeaderComponent={this.renderHeader}
                    ListFooterComponent={this.renderFooter}
                    onRefresh={this.handleRefresh}
                    refreshing={this.state.refreshing}
                    //onEndReached={this.handleLoadMore}
                    onEndReachedThreshold={0.5}
                />

        );
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 14,
    }
})