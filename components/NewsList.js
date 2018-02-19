import React, { Component } from 'react';
import { Image, StyleSheet, ListView, FlatList, View, TouchableOpacity } from 'react-native';
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

        console.warn(data)
        /*this.props.navigation.navigate('SingleNews',{
            data
        })*/
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
                                    <View>
                                        <ListItem avatar style={{ paddingBottom:5, paddingTop:5, paddingLeft:5, marginLeft:0}} onPress={() => this.shoSingleNews(item)}>
                                            <Image source={{uri: item.enclosureUrl}} style={{width: 150, height: 75, marginRight:5}}/>
                                            <View>
                                                <Text numberOfLines={2} style={styles.title}>{item.title}</Text>
                                                <Text note>{item.timeString} {item.site}</Text>
                                            </View>

                                        </ListItem>
                                    </View>
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