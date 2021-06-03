import React, { Component } from 'react';
import { View, TextInput, StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../../assets/css/styles';
import CardRestaurant from '../../components/CardRestaurant';
import api from '../../config/api';
import jwt_decode from 'jwt-decode';

const styleLocal = StyleSheet.create({
    view: {
        flex: 1,
        width: '100%',
        height: '100%',
        padding: 10,
        backgroundColor: "white"
    },
    input: {
        flex: 1,
        width: '100%',
        color: '#111e6c',
        paddingLeft: 15,
        height: 50,
        paddingRight: 15,
        backgroundColor: '#ededed',
        borderRadius: 100,
        marginBottom: 20
    },
    icon: {
        padding: 7,
        paddingRight: 15,
        height: 50
    }
})

export default class SearchRestaurant extends Component {

    state = {
        restaurants: [],
        arrRestaurant: [],
        user: [],
        filter: "",
        weekDay: new Date().getDay()
    }

    componentDidMount() {
        this.getRestaurant();
        this.getUser();
    }

    getRestaurant = async () => {
        const response = await api.get("/restaurant", {
            headers: {
                "Authorization": "Bearer " + await AsyncStorage.getItem('@token')
            }
        });
        this.setState({ restaurants: response.data });
    }

    getUser = async () => {
        let token = jwt_decode(await AsyncStorage.getItem('@token'));
       const response = await api.get(`/users/${token.user._id}`);
        this.setState({ user: response.data });
    }

    likeRestaurant = async (id) => {
        let token = jwt_decode(await AsyncStorage.getItem('@token'));
        token.restaurant = id;
        await api.post("/like",token);
        this.getUser();
    }

    restauranteWasLiked = (restaurantId)  => {
        const { user } = this.state;
        for(let count = 0; count < user.liked.length; count++){
            if(user.liked[count] == restaurantId){
                count =  user.liked.length;
                return true;
            }
        }
        return false;
    }

    render() {
        const { filter = "", restaurants = [], weekDay } = this.state;
        return (
            <View style={styleLocal.view}>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start', }}>
                    <Icon name="search" style={styleLocal.icon} size={30} color="#111e6c" />
                    <TextInput
                        value={filter}
                        onChangeText={(filter) => { this.setState({ filter }); }}
                        name="cpf"
                        style={styleLocal.input}
                        autoCapitalize='none'
                    />
                </View>
                <FlatList
                    data={restaurants}
                    keyExtractor={item => item._id}
                    style={{ top: 15, paddingBottom: 5, backgroundColor: "transparent", height: "80%" }}
                    renderItem={({ item }) => {
                        if(filter.length > 0){
                            return (
                                String(item.name).toLowerCase().includes(String(filter).toLowerCase()) ?
                                    <View style={{
                                        flex: 1,
                                        alignItems: 'center',
                                        justifyContent: "flex-start",
                                        width: "100%",
                                        height: 120,
                                        padding: 10,
                                        backgroundColor: "white",
                                    }}>
                                        <CardRestaurant
                                            image={item.image}
                                            title={item.name}
                                            category={item.category}
                                            closeHour={item.opening_hours[weekDay].closeHour}
                                            openHour={item.opening_hours[weekDay].openHour}
                                            onPressLike={this.likeRestaurant.bind(this,item._id)}
                                            liked = {this.restauranteWasLiked(item._id)}
                                        />
                                    </View>
                                    :
                                    <></>
                            );
                        }else{
                            <></>
                        }
                        
                    }}
                />


            </View>
        );
    }

}


