/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './pages/Login';
import AddUser from './pages/AddUser';
import QRReader from './pages/QRReader';
import Menu from './pages/Menu';

export default class App extends Component {

  render(){
    const Stack = createStackNavigator();
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="QRReader" options={{ headerShown: false, title: 'QR Reader' }} component={QRReader} />
          <Stack.Screen name="Login" options={{ headerShown: false, title: 'Login' }} component={Login} />
          <Stack.Screen name="AddUser" options={{ title: 'Add User' }} component={AddUser} />
          <Stack.Screen name="Menu" options={{ headerShown: false, title: 'Menu' }} component={Menu} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
 
}

