/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {Node} from 'react';
import {Text,useColorScheme,View } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from  './pages/Login';
import AddUser from './pages/AddUser';
import Home from './pages/Home';

export default class App extends Component {

  
 
  render(){
    const Stack = createStackNavigator();
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" options={{ headerShown: false, title: 'Login' }} component={Login} />
          <Stack.Screen name="AddUser" options={{ title: '',headerTintColor:'#111e6c',headerStyle:{ backgroundColor:'#f4f4f4'} }} component={AddUser} />
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
 
}

