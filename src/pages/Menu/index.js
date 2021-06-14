/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../config/api';
import styles from '../../assets/css/styles';
import MenuItem from '../../components/MenuItem';

export default class Menu extends Component {
    constructor(props){
        super(props);
        this.registerItems = this.registerItems.bind(this);
        this.makeOrder = this.makeOrder.bind(this);
        this.closeOrder = this.closeOrder.bind(this);
    }
    state = {
        url: this.props.route.params.menuURL,
        name: "",
        menu: [],
        active: false,
        selectedItems: [],
        OrderButton: false,
        orderId: this.props.route.params.orderId
    }

    async componentDidMount() {
        const cod = this.state.url.split('/').splice(3, 1);
        const tableId = this.state.url.split('/').pop();
        const res = await api.get(`/restaurant/${cod}`);
        const table = await api.get(`/table/${tableId}`,{
            headers: {
                "Authorization": "Bearer " + await AsyncStorage.getItem('@token')
            }
        });
        this.setState({
            name: res.data.name,
            menu: res.data.menu,
            active: table.data.active,
            orderId: table.data.order
        });
    }

    registerItems = (item) => {
        let ar = this.state.selectedItems;
        if(ar.includes(item)){
            ar.splice(ar.indexOf(item), 1);
            this.setState({OrderButton: false});
        } else {
            ar.push(item);
            this.setState({OrderButton: true})
        }
    }

    makeOrder = () => {
        let items = this.state.selectedItems;

        for(let i = 0; i < items.length; i++){
            delete items[i].func;
        }
        
        this.props.navigation.push('MakeOrder', {
            selectedItems: items,
            restaurantName: this.state.name,
            url: this.state.url,
            orderId: this.state.orderId
        });
    }

    closeOrder = () => {
        this.props.navigation.push('CloseOrder', {
            orderId: this.state.orderId,
            url: this.state.url
        });
    }

    render() {
        return (
            <View style={{minHeight: "100%"}}>
                <View style={styles.menuHeader}>
                    <Text style={styles.menuRestaurant}>{this.state.name}</Text>
                </View>
                {this.state.menu.map(section => {
                    return(
                        <View key={section.name}>
                            <View id={section.name + "_id"} style={styles.menuSectionHeader}>
                                <Text style={styles.menuSectionTitle}>{section.name}</Text>
                            </View>
                            {section.items.map(item => {
                                item.func = this.registerItems;
                                return <MenuItem item={item} />
                            })}
                        </View>
                    )
                })}
                <View style={styles.OrderOptions}>
                    {this.state.OrderButton ?
                        <TouchableOpacity
                            style={styles.makeOrderButton}
                            onPress={this.makeOrder}
                        >
                            <Text style={styles.makeOrderButtonText}>Fazer pedido</Text>
                        </TouchableOpacity>
                        :
                        null
                    }
                    {this.state.active ?
                        <TouchableOpacity
                            style={styles.closeOrderButton}
                            onPress={this.closeOrder}
                        >
                            <Text style={styles.closeOrderButtonText}>Pagar</Text>
                        </TouchableOpacity>
                        :
                        null
                    }
                </View>
            </View>
        );
    }
}
