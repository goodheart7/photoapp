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
  ScrollView,
  ListView,
  TextInput
} from 'react-native';

import { Header, Left, Right, Icon, Title, Container, Content, Button, Thumbnail, Body, Toast,
        Form, Input, Item, Label, Picker, Footer, FooterTab} from 'native-base';

import {query} from '../Service/Service.js';
import Row from './Row';

var Dimensions = require('Dimensions');
var {
  width,
  height
} = Dimensions.get('window');

export default class ProductDetail extends Component {
    static navigationOptions = {      
        title: 'ADEN PhotoWorks',
        header: {
            style: { backgroundColor: '#F5F5F5' },    
            titleStyle: {},                      
        },   
    };
    constructor(props) {
      super(props);

      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.state = {
         keyword: '',
         showNewData: false,
         dataSource: ds.cloneWithRows(
             [{PartNumber: 'AA1234'},
             {MetaData1: 'Blue'},
             {MetaData2: 'Engine'}]
                   
         ),
       }
    }

    render()
    {
      return(
         <Container style={StyleSheet.flatten(styles.container)}> 
            <Content>                 
                <ScrollView horizontal={true} pagingEnabled={true} style={styles.imageView}>
                    <Thumbnail style={StyleSheet.flatten(styles.photo)} square source={require('../../assets/engine.png')}/>
                    <Thumbnail style={StyleSheet.flatten(styles.photo)} square source={require('../../assets/engine.png')}/>
                    <Thumbnail style={StyleSheet.flatten(styles.photo)} square source={require('../../assets/engine.png')}/>
                </ScrollView>
                <ListView                    
                    dataSource={this.state.dataSource}
                    renderRow={(data) => <Row {...data} />}
                    //renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}                                       
                />

                { this.state.showNewData && 
                    <Form>
                    <Item fixedLabel>
                        <Label>Meta Data</Label>
                        <Input 
                        autoCorrect={false} 
                        autoCapitalize="none"
                        placeholder='type new data'
                        style={{textAlign: 'right', paddingRight: 10}}
                        />
                    </Item>
                    </Form>
                } 
                <Button transparent onPress={()=>this.setState({showNewData: true})}><Text style={styles.btnStyle}> Add Data... </Text></Button>

            </Content>
            <Footer >
            <FooterTab>
                <Button>                    
                    <Text style={styles.btnStyle}>Photos</Text>
                </Button>         
                <Button>                   
                    <Image
                    source={require('../../assets/camera.png')}
                    style={styles.icon}
                    />
                </Button>
                <Button>                   
                    <Text style={styles.btnStyle}>Finished</Text>
                </Button>
            
            </FooterTab>         
            </Footer>
          </Container>
        
      )
   
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

    imageView: {
        marginTop: 10,
        //marginLeft: 10,
        //marginRight: 10,
    },

    btnStyle: {
        color: 'blue',
        fontSize: 18,

    },

    photo: {
        height: height*0.3,
        width: width,
        resizeMode: 'contain',
        borderColor: '#BDBDBD',
        borderWidth: 1,    
    },

    separator: {
        flex: 1,
        height: 1,
        backgroundColor: '#BDBDBD',
        marginLeft: 10, 
       
    },

    icon: { 
        paddingBottom: 0,
        width: 60,
        height: 60,
    },

});
