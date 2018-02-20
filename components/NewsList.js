import React, { Component } from 'react';
import { Image, StyleSheet, ListView, FlatList, View, TouchableOpacity } from 'react-native';
import { Container, Header, Content, List, ListItem,  Text, Body, Item, Button, Input, Icon, SwipeRow, Left, Right, Spinner } from 'native-base';
import SingleNews from "./SingleNews";

export default class NewsList extends Component {

    constructor(props){
        super(props)
        this.state = {
            newsList: [],
            page: 1
        };


        this.getNews();


    }

    getNews = () => {
        const url = 'http://api.timenews.org/hy/get/news/images/page/' + this.state.page + '/';
        fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson.success){
                    this.setState({
                        newsList:this.state.newsList.concat(responseJson.payload.items)
                    })
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };



    appendNewsList = () => {
        this.setState({
            page: ++this.state.page
        });
        this.getNews();
        //console.warn(this.state.newsList.length)
    };


    shoSingleNews = (data) =>{
        this.props.navigation.navigate('SingleNews',{
            data
        })
    };


    render() {

        return (
            <Container>
                <Header searchBar rounded>
                    <Item>
                        <Icon name="ios-search" />
                        <Input placeholder="Search" />
                        <Icon name="ios-people" />
                    </Item>
                    <Button transparent>
                        <Text>Search</Text>
                    </Button>
                </Header>
                <Content>

                    <FlatList
                        ListFooterComponent={
                            <Spinner />
                        }

                        onEndReachedThreshold={0.5}
                        onEndReached={() => this.appendNewsList()}
                        data={this.state.newsList}
                        renderItem={({item}) =>
                            <SwipeRow
                                style={{paddingBottom:0, paddingTop:0, paddingLeft:0, paddingRight:0, marginTop:2}}
                                leftOpenValue={75}
                                rightOpenValue={-75}
                                left ={
                                    <Button success style={{marginTop:2, marginBottom:2}}>
                                        <Icon active name="add"/>
                                    </Button>
                                }
                                body={
                                    <Container style={{height:85}}>
                                        <Item avatar style={{ paddingBottom:5, paddingTop:5, paddingLeft:5, marginLeft:0}} onPress={() => this.shoSingleNews(item)}>
                                            <Image source={{uri: item.enclosureUrl}} style={{width: 150, height: 75, marginRight:5}}/>
                                            <Content>
                                                <Text numberOfLines={3} style={styles.title}>{item.title}</Text>

                                                <Text note>{item.timeString} {item.site}</Text>

                                            </Content>


                                        </Item>
                                    </Container>
                                }
                                right={
                                    <Button danger style={{marginTop:2, marginBottom:2}}>
                                        <Icon active name="trash"/>
                                    </Button>
                                }
                            />}
                        keyExtractor={(item, index) => index}

                    />

                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    title:{
        fontSize:14,
    }
})