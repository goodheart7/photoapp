import React, {Component} from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import {Container, Content, Thumbnail} from 'native-base';

//var ProgressBar = require('react-native-progress-bar');
//import ProgressBar from 'react-native-progress-bar';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },

  text: {
    marginLeft: 12,
    fontSize: 16,
  },

  photo: {
    height: 70,
    width: 70,
    resizeMode: 'contain',
    borderColor: '#BDBDBD',
    borderWidth: 1,    
  },

});

const Row = (props) => (   
    <View style={{flex: 1, flexDirection: 'row', padding: 10}}>
        <View style={{flex: 1, flexDirection: 'column'}}>
            <Text>{props.partNumber}</Text>
            <Text>{props.description}</Text>
            <Text style={{opacity: 0.7}}>Additional notes about the item</Text> 
            {/*<ProgressBar
                fillStyle={{}}
                backgroundStyle={{backgroundColor: '#cccccc', borderRadius: 2}}
                style={{marginTop: 10, width: 300}}
                progress={0.8}
            />*/}
        </View>
        <Thumbnail style={StyleSheet.flatten(styles.photo)} square source={require('../../assets/engine.png')}/>
        {/*<Thumbnail style={{width: '100%', height: 200,}} square source={require(props.primaryPhoto)}/>*/}        
    </View>
);

export default Row;