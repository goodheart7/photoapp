import React, { Component } from 'react';
import {  
  AppRegistry,
  StyleSheet,
  Image,
  Text,
  View,
  AsyncStorage,
  ActivityIndicator,
  TouchableHighlight,
} from 'react-native';

import { Container, Content, Button, Thumbnail, Body, Toast,
        Form, Input, Item, Label, Picker, Footer } from 'native-base';
import {query} from '../Service/Service.js'
import ModalDropdown from 'react-native-modal-dropdown';

export default class LoginPage extends Component {

   constructor(props) {
        super(props);
        this.state = {
            isLoading: false,	
            companyName: '',
            deviceToken: '',
         	branch: [],            
            selectedItem: undefined,
            selectedBranch: 'Default Branch', 
            username: '',
            password: '',   
               
        }
    }

    componentWillMount() {
      
       this.setState({isLoading: true});
       AsyncStorage.getItem('companyName').then((value) => {           
            if (value) this.setState({ companyName : value });
       });

       AsyncStorage.getItem('username').then((value) => {           
            if (value) {
                this.setState({ username : value });
                this.refs.password._root.focus();
            }
            else this.refs.username._root.focus();
       });

       AsyncStorage.getItem('defaultBranch').then((value) => {                 
            if (value) this.setState({ selectedBranch : value });
       });
       
       AsyncStorage.getItem('deviceToken').then((value) => {
            if (value) {
                this.setState({deviceToken: value});
                this._getBranch(value);
            }
       });
   }

   onBranchChange (index, value) { 
        this.setState({
            selectedBranch : value
        });
   }
   
   handleUnlink(){
       AsyncStorage.removeItem('deviceToken');
       AsyncStorage.removeItem('aws');
       AsyncStorage.removeItem('companyName');
       AsyncStorage.removeItem('username');
       AsyncStorage.removeItem('defaultBranch');
       
       this.props.navigation.navigate('Connect');
   }
   
   _getBranch(token){            
       query('http://photoworks-api.thnk.xyz/api/auth/branches', 'POST', {deviceToken: token}).then(response=> {
           this.setState({isLoading: false});
           if (response.success == false) { 
                Toast.show({
                    text: response.reason,
                    position: 'bottom',
                    buttonText: 'OK',
                    type: 'danger'
                })
            }
            else{
                this.setState({branch: response});
                this._handleResponse();
            }
        }).catch(error => {
            this.setState({isLoading: false});
            console.log(error);
        })    
  }

  handleLogin(){
      this.setState({isLoading: true});
      query('http://photoworks-api.thnk.xyz/api/auth/login', 'POST', {
                deviceToken: this.state.deviceToken,
                username: 'AA',
                password: '1234',
                branch: '01'
            }
      ).then(response=> {
           this.setState({isLoading: false});
           if (response.success == false) { 
                Toast.show({
                    text: response.reason,
                    position: 'bottom',
                    buttonText: 'OK',
                    type: 'danger'
                })
            }
            else{
                console.log(response);        
                AsyncStorage.setItem('defaultBranch', this.state.selectedBranch);
                AsyncStorage.setItem('username', this.state.username);
                AsyncStorage.setItem('userToken', response.token);
                this.props.navigation.navigate('Main');
            }
        }).catch(error => {
            this.setState({isLoading: false});
            console.log(error);
        })    
  }

  _handleResponse(response){
      this.state.branch.map((item) => {    
        console.log("**SelectedBranch**");       
        console.log(this.state.selectedBranch); 
      });
  }

  render() {
        var spinner = this.state.isLoading ?
		( <ActivityIndicator
			size='large'/> ) :
		( <View/>); 

        return (
            <Container style={StyleSheet.flatten(styles.container)} >           
                <Content>
                    <Thumbnail style={{width: '100%', height: 200,}} square source={require('../../assets/background1.png')}/>
                    <Text style= {StyleSheet.flatten(styles.companyName)} > {this.state.companyName} </Text>
                    <Form>                               
                        <Item  style={{paddingBottom: 10}}>
                        <Label style={{width: 105}}>Branch</Label>                         
                        <ModalDropdown 
                            //style={styles.branchDropDown}
                            textStyle={styles.branchDropDown}
                            onSelect={this.onBranchChange.bind(this)} 
                            options={this.state.branch.map(item=> item.name)}
                            defaultValue={this.state.selectedBranch}
                        />                                  
                        </Item>                      
                        <Item fixedLabel>
                            <Label>Username</Label>
                            <Input 
                            ref="username" 
                            placeholder='username' 
                            value={this.state.username} 
                            placeholder={props.key} 
                            autoCapitalize="none"
                            onChangeText={(text) => this.setState({username: text})}/>
                        </Item>
                        <Item fixedLabel>
                            <Label>Password</Label>
                            <Input 
                            ref="password" 
                            placeholder='********' 
                            secureTextEntry 
                            placeholder={props.key} 
                            autoCapitalize="none"
                            onChangeText={(text) => this.setState({password: text})}/>
                        </Item>                     
                    </Form>

                    <View style={{padding: 10}}>
                    <Button full style={StyleSheet.flatten(styles.connectButton)} onPress={this.handleLogin.bind(this)}>
                        <Text style={{color: 'white', fontWeight: 'bold'}}>Login</Text>
                    </Button>
                    </View>
                    
                    {spinner} 

                </Content> 
                <View style={{marginBottom:5}}>
                    <TouchableHighlight onPress={this.handleUnlink.bind(this)}>
                        <Text style={{color: 'blue'}}>Unlink Device</Text>                    
                    </TouchableHighlight>
                </View>                    
            </Container>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    paddingTop: 10,
    alignItems: 'center',
  },

  connectButton: {
    backgroundColor: 'red',
    borderRadius: 7,
    marginTop: 10,
    width: '100%',    
  },

  companyName: {
    fontSize: 20,
    textAlign: 'center',    
    paddingBottom: 20,
  },

  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },

  branchDropDown: {
    fontSize: 15,
  },

});
