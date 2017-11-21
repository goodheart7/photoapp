import React, {Component} from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import {Container, Content, Thumbnail, Form, Label, Item, Input} from 'native-base';

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


export default class Row extends Component {
    constructor(props) {
      super(props);
       this.state = {
         keyname: Object.keys(this.props)
       }
    }
    render()
    {
      return(
        <View style={{flex: 1, flexDirection: 'row', padding: 0}}>
            <View style={{flex: 1, flexDirection: 'column'}}>
                <Form>
                <Item fixedLabel style={{padding: 0}}>
                    <Label>{ this.state.keyname }</Label>
                    <Input  
                    value={this.props[this.state.keyname]} 
                    autoCapitalize="none"
                    autoCorrect={false} 
                    style={{textAlign: 'right', paddingRight: 10}}/>
                </Item>
                </Form>
            </View>
        </View>
      )
    }
}

