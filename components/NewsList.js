import React, { Component } from 'react';
import { Image, StyleSheet, ListView, FlatList } from 'react-native';
import { Container, Header, Content, List, ListItem,  Text, Body, Item, Button, Input, Icon, SwipeRow, Left, Right } from 'native-base';
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
                        newsList:responseJson.payload.items
                    })
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };



    appendNewsList = () => {
        console.warn("end")
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
                        data={this.state.newsList}
                        renderItem={({item}) =>
                            <SwipeRow avatar onPress={() => this.shoSingleNews(item)}
                                leftOpenValue={75}
                                rightOpenValue={-75}
                                key={item.uid}
                                left ={
                                    <Button success>
                                        <Icon active name="add"/>
                                    </Button>
                                }
                                body={
                                    <Content >
                                        <Image source={{uri: item.enclosureUrl}} style={{width: 100, height: 50}}/>
                                        <Body>
                                        <Text numberOfLines={2} style={styles.title}>{item.title}</Text>
                                        <Text note>{item.timeString} {item.site}</Text>
                                        </Body>
                                    </Content>
                                }
                                right={
                                    <Button danger>
                                        <Icon active name="trash"/>
                                    </Button>
                                }
                            />}
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