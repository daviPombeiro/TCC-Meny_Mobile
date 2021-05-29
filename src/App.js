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
import ForgetPassword from './pages/ForgetPassword';
<<<<<<< Updated upstream
=======
import QRReader from './pages/QRReader';
import Menu from './pages/Menu';
import PutToken from './pages/PutPasswordToken';
import ChangePassword from './pages/ChangePassword';
import SearchRestaurant from './pages/SearchRestaurant';
>>>>>>> Stashed changes

export default class App extends Component {
 
  render(){
    const Stack = createStackNavigator();
    return (
      <NavigationContainer>
        <Stack.Navigator>
<<<<<<< Updated upstream
          <Stack.Screen name="Login" options={{ headerShown: false, title: 'Login' }} component={Login} />
          <Stack.Screen name="AddUser" options={{ headerShown: false}} component={AddUser} />
          <Stack.Screen name="ForgetPassword" options={{ headerShown: false}} component={ForgetPassword} />
=======
          <Stack.Screen name="SearchRestaurant" options={{ headerShown: false, title: 'SearchRestaurant' }} component={SearchRestaurant} />
          <Stack.Screen name="Login" options={{ headerShown: false, title: 'Login' }} component={Login} />
          <Stack.Screen name="QRReader" options={{ headerShown: false, title: 'QR Reader' }} component={QRReader} />
>>>>>>> Stashed changes
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
 
}

