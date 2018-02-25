import React, { Component } from 'react';
import { Container, Header, Item, Input, Icon, Button, Text } from 'native-base';
export default class SearchBar extends Component {

    constructor(props){
        super(props);
        this.state = {
            search: ''
        }

    }

    onClearSearch = () =>{
        this.setState({
            search: ''
        });
        this.props.onClearSearch()
    };

    onSearch = () =>{
        this.props.onSearch(this.state.search)
    };

    render() {
        return (

            <Header searchBar rounded>
                <Item>
                    <Icon name="ios-search"/>
                    <Input  blurOnSubmit={true}
                            value={this.state.search}
                            onChangeText={(text) => this.setState({search: text})}
                            onSubmitEditing={this.onSearch}/>
                    {this.state.search  ? <Icon name="close" onPress={this.onClearSearch}/> : <Icon/>}
                </Item>
                <Button transparent onPress={this.onSearch}>
                    <Text>Search</Text>
                </Button>
                {!this.state.search ?
                    <Icon name="options" style={{color: "#FFF", padding: 13}}/>
                    :<Icon/>
                }
            </Header>

        );
    }
}