import React, {Component} from 'react';
import {  
  AppRegistry,
  StyleSheet,
  Image,
  Text,
  View,
  AsyncStorage,
  ActivityIndicator,
  TouchableHighlight,
  ListView,
  TextInput
} from 'react-native';

import { Header, Left, Right, Icon, Title, Container, Content, Button, Thumbnail, Body, Toast,
        Form, Input, Item, Label, Picker, Footer } from 'native-base';

import {query} from '../Service/Service.js';
import Row from './Row';

export default class Queue extends Component {
  static navigationOptions = {     
    tabBar: {
        label: 'Queue',
        style: { backgroundColor: '#F5F5F5' },   
    }
  };
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
        keyword: '',
        dataSource: ds.cloneWithRows([
            {
                partNumber: 'AA1111',
                description: 'ACME Widget Part (10mm)',
                photoCount: 0,
                primaryPhoto: '../../assets/engine.png',
            },
            {
                partNumber: 'AA2222',
                description: 'ACME Widget Part (25mm)',
                photoCount: 0,
                primaryPhoto: '../../assets/engine.png',
            }
        ]),
    };
  }

  render() {
    return (
        <Container style={StyleSheet.flatten(styles.container)}>
             <Header>  
                <Left/>              
                <Body>
                    <Title>ADEN PhotoWorks</Title>
                </Body>
                <Right>
                    <TouchableHighlight>
                        <Text style={{color: 'blue'}}>History</Text>
                    </TouchableHighlight>
                </Right>
            </Header>                                       
            <Content>                         
                <ListView                   
                    dataSource={this.state.dataSource}
                    renderRow={(data) => <Row {...data} />}
                    renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}                    
                />
            </Content>  
       </Container>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        //justifyContent: 'center',
        //paddingTop: 20,
        //alignItems: 'center',    
    },

    separator: {
        flex: 1,
        height: 1,
        backgroundColor: '#BDBDBD',
        marginLeft: 10,

    },
});