import React, { Component } from 'react';
import { Image, StyleSheet } from 'react-native';
import { Container, Header, Content, List, ListItem,  Text, Body, Item, Button, Input, Icon } from 'native-base';
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
    }


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
                    <List dataArray={this.state.newsList} onEndReached={this.appendNewsList}
                        renderRow={(item) =>
                            <ListItem avatar>
                                <Image  source={{uri: item.enclosureUrl}} style={{width: 100, height: 50}} />
                                <Body>
                                    <Text style={styles.title}>{item.title}</Text>
                                    <Text note>{item.timeString} {item.site}</Text>
                                </Body>
                            </ListItem>
                        }
                    >
                    </List>
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