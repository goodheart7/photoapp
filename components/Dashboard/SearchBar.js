import React, {Component} from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import {Input, Icon} from 'native-base';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#C1C1C1',
  },

  input: {
    height: 30,
    flex: 1,
    paddingHorizontal: 8,
    fontSize: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    textAlign: 'center',
  },
});

export class SearchBar extends Component {
    constructor(props) {
      super(props);
       this.state = {
         keyword: '',
       }
    }

    render()
    {
      return(
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Search..."
            onChangeText={(text) => this.setState({keyword: text})}
          >
          </TextInput>
        </View>
      )
   
    }

}

export default SearchBar;
