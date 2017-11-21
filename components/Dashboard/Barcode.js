import React, { Component } from 'react';
import {  
  AppRegistry,
  StyleSheet,
  Image,
  Text,
  View,
  ActivityIndicator,
  Navigator,
  AsyncStorage,
  Platform
} from 'react-native';

import { Container, Toast, Content, Button, Thumbnail, Body, 
        Form, Input, Item, Label 
} from 'native-base';

import {query} from '../Service/Service.js';
import BarcodeScanner from 'react-native-barcode-scanner-universal';

export default class Barcode extends Component {
  static navigationOptions = {    
    
    tabBar: { 
        label: ' ', 
        icon: ({ tintColor }) => (
            <Image
            source={require('../../assets/camera.png')}
            style={[styles.icon, ]}
            />
        ),   
    }
  };
  constructor(props) {
  	super(props);
  	this.state = {
    	username: '',
        password: '',
		isLoading: false,		
  	};
  } 
  render() {
        let scanArea = null
        if (Platform.OS === 'ios') {
            scanArea = (
            <View style={styles.rectangleContainer}>
                <View style={styles.rectangle} />
            </View>
            )
        }
       return (
           
            <BarcodeScanner
            onBarCodeRead={(code) => {
                console.log("Barcode:")
                console.log(code)}}
            style={styles.camera}>
            {scanArea}
            </BarcodeScanner>
          
    
        );
    }
}

const styles = StyleSheet.create({
    icon: { 
        paddingBottom: 0,
        width: 60,
        height: 60,
    },
    camera: {
        flex: 1
    },
    rectangleContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    rectangle: {
        height: 250,
        width: 250,
        borderWidth: 2,
        borderColor: '#00FF00',
        backgroundColor: 'transparent'
    }
});
