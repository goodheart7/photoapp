import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
} from 'react-native';

import { StackNavigator, DrawerNavigator, TabNavigator } from 'react-navigation';

import ConnectPage from './components/ConnectPage/ConnectPage.js';
import LoginPage from './components/LoginPage/LoginPage.js';
import Search from './components/Dashboard/Search.js';
import Queue from './components/Dashboard/Queue.js';
import Barcode from './components/Dashboard/Barcode.js';
import ProductDetail from './components/ProductDetail/ProductDetail.js';

const DashboardTabNavigator = TabNavigator(
  {
    Search: { screen: Search },
    Barcode: {screen: Barcode },
    Queue: { screen: Queue },    
  },   
  {
      headerMode: 'screen', 
      mode: 'modal',
      navigationOptions: {
        header: () => ({
          visible: false,
        })
      },
      tabBarOptions: {       
        labelStyle: {
          fontSize: 15,
          color: '#03A9F4',
          paddingBottom: 10,
        },
        style: {
          backgroundColor: '#FAFAFA',
        },
      }

});

const MainScreen = StackNavigator(
  {
  //  /Dashboard: { screen: DashboardTabNavigator },
   ProductDetail: {screen: ProductDetail, } , 
     
  },
  {
    headerMode: 'screen', 
    mode: 'modal',
    navigationOptions: {
      header: () => ({
        visible: false,
      })
    }
});

const PhotoWorks = StackNavigator(
  {
    //Connect: { screen: ConnectPage }, 
    //Login: { screen: LoginPage },    
    Main: { screen: MainScreen}    
  },
  {
    headerMode: 'screen', 
    mode: 'modal',
    navigationOptions: {
      header: () => ({
        visible: false,
      })
    }
});

AppRegistry.registerComponent('PhotoWorks', () => PhotoWorks);
                                                                   