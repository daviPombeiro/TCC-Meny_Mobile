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
import Home from './pages/Home';
import ForgetPassword from './pages/ForgetPassword';
import QRReader from './pages/QRReader';
import Menu from './pages/Menu';
import MakeOrder from './pages/MakeOrder';

export default class App extends Component {
  render(){
    const Stack = createStackNavigator();
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" options={{ headerShown: false, title: 'Login' }} component={Login} />
          <Stack.Screen name="AddUser" options={{ headerShown: false}} component={AddUser} />
          <Stack.Screen name="ForgetPassword" options={{ headerShown: false}} component={ForgetPassword} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="QRReader" options={{ headerShown: false, title: 'QR Reader' }} component={QRReader} />
          <Stack.Screen name="Menu" options={{ headerShown: false, title: 'Menu' }} component={Menu} />
          <Stack.Screen name="MakeOrder" options={{ headerShown: false, title: 'MakeOrder' }} component={MakeOrder} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
 
}

