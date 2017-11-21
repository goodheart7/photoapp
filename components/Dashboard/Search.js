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
import SearchBar from './SearchBar';

export default class Search extends Component {
  static navigationOptions = {      
    title: 'ADEN PhotoWorks',
    tabBar: {
        label: 'Search',
        style: { backgroundColor: '#F5F5F5' },   
    }
  };
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
        keyword: '',
        deviceToken: '',
        userToken: '',
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

  componentWillMount(){

       AsyncStorage.getItem('deviceToken').then((value) => {                 
            if (value) this.setState({ deviceToken : value });
            console.log(value);
       });

       AsyncStorage.getItem('userToken').then((value) => {                 
            if (value) this.setState({ userToken : value });
            console.log(value);
       });        
  }



  handleSearch(){    
        this.props.navigation.navigate('ProductDetail');    
     
        query('http://photoworks-api.thnk.xyz/api/search', 'POST', {deviceToken: this.state.deviceToken, userToken: this.state.userToken, keyword: this.state.keyword})
        .then(response=> {
            //this.setState({isLoading: false});
            if (response.success == false) { 
                Toast.show({
                    text: response.reason,
                    position: 'bottom',
                    buttonText: 'OK',
                    type: 'danger'
                })
            }
            else{
                console.log("return****");
                console.log(response)
            }
        })
        .catch(error => {
            this.setState({isLoading: false});
            console.log(error);
        })  


  }

  render() {
    return (
        <Container style={StyleSheet.flatten(styles.container)}> 
            <Header>  
                <Left/>              
                <Body style={{paddingLeft: 30}}>
                    <Title>ADEN PhotoWorks</Title>
                </Body>
                <Right>
                    <TouchableHighlight>
                        <Text style={{color: 'blue'}}>History</Text>
                    </TouchableHighlight>
                </Right>
            </Header>   
            <View style={styles.searchContainer}>
                <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={styles.SearchInput}
                    placeholder="Search..."
                    onChangeText={(text) => this.setState({keyword: text})}
                    onEndEditing={this.handleSearch.bind(this)}
                >
                </TextInput>
            </View>                            
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
    searchContainer: {      
        padding: 8,
        height: 45,        
        margin: 0,
        backgroundColor: '#C1C1C1',
    },

    SearchInput: {
        height: 30,
        flex: 1,
        paddingHorizontal: 8,
        fontSize: 15,
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        textAlign: 'center',
    },

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

    searchBar: {
        height: 30,
        flex: 1,
        paddingHorizontal: 8,
        fontSize: 15,
        backgroundColor: '#FFFFFF',
        borderRadius: 2,
    },

    cameraButton: {
        height: 60,
        width: 60,
        resizeMode: 'contain',
    }
});