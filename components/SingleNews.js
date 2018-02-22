import React, { Component } from 'react';
import  { Dimensions, StyleSheet, Image, View, Text, ListView } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title,Content } from 'native-base';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
export default class SingleNews extends Component {

    constructor(props){
        super(props);
        this.state = {
            newsSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2
            }).cloneWithRows([props.navigation.state.params.item])

        }

        console.warn(this.state.newsSource)
    }


    getNewsBody = () =>{

    }

    render() {
        const { onScroll = () => {} } = this.props;
        return (
            <ListView
                ref="ListView"
                style={styles.container}
                dataSource={ this.state.newsSource }
                renderRow={(rowData) => (
                    <Text>dd</Text>
                )}
                renderScrollComponent={props => (
                    <ParallaxScrollView
                        onScroll={onScroll}

                        headerBackgroundColor="#333"
                        backgroundColor="#009688"
                        stickyHeaderHeight={ STICKY_HEADER_HEIGHT }
                        parallaxHeaderHeight={ PARALLAX_HEADER_HEIGHT }
                        backgroundSpeed={10}

                        renderBackground={() => (
                            <View key="background">
                                <Image source={{uri: this.state.newsSource._dataBlob.s1[0].enclosureUrl,
                                    width: window.width,
                                    height: PARALLAX_HEADER_HEIGHT}}/>
                                <View style={{position: 'absolute',
                                    top: 0,
                                    width: window.width,
                                    backgroundColor: 'rgba(0,0,0,.4)',
                                    height: PARALLAX_HEADER_HEIGHT}}/>
                            </View>
                        )}

                        renderForeground={() => (
                            <View key="parallax-header" style={ styles.parallaxHeader }>
                                <Text style={ styles.sectionSpeakerText } numberOfLines={4}>
                                    {this.state.newsSource._dataBlob.s1[0].title}
                                </Text>
                                <Text style={ styles.sectionTitleText } >
                                    {this.state.newsSource._dataBlob.s1[0].timeString}
                                </Text>
                            </View>
                        )}

                        renderStickyHeader={() => (
                            <Header key="sticky-header" style={styles.stickySection}>
                                <Button transparent onPress={() => this.props.navigation.goBack()}>
                                    <Icon name='arrow-back' />
                                </Button>
                                <Body>
                                    <Text numberOfLines ={1} style={styles.stickySectionText}>{this.state.newsSource._dataBlob.s1[0].title}</Text>
                                </Body>
                            </Header>
                        )}/>
                )}
            />
        );
    }
}

const window = Dimensions.get('window');

const AVATAR_SIZE = 120;
const ROW_HEIGHT = 60;
const PARALLAX_HEADER_HEIGHT = 250;
const STICKY_HEADER_HEIGHT = 60;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: window.width,
        height: PARALLAX_HEADER_HEIGHT
    },
    stickySection: {
        height: STICKY_HEADER_HEIGHT,
        justifyContent: 'flex-end',
        backgroundColor:'transparent'
    },
    stickySectionText: {
        color: 'white',
        fontSize: 20,
        margin: 20,
    },
    fixedSection: {


    },
    fixedSectionText: {
        color: '#999',
        fontSize: 20
    },
    parallaxHeader: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'column',
        paddingTop: 50
    },
    avatar: {
        marginBottom: 10,
        borderRadius: AVATAR_SIZE / 2
    },
    sectionSpeakerText: {
        color: 'white',
        fontSize: 24,
        padding: 5,
        textAlign:'center'
    },
    sectionTitleText: {
        color: 'white',
        fontSize: 12,
        paddingVertical: 5
    },
    row: {
        overflow: 'hidden',
        paddingHorizontal: 10,
        height: ROW_HEIGHT,
        backgroundColor: 'white',
        borderColor: '#ccc',
        borderBottomWidth: 1,
        justifyContent: 'center'
    },
    rowText: {
        fontSize: 20
    }
});
