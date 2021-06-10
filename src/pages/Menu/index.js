/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import api from '../../../config/api';
import styles from '../../assets/css/styles';
import MenuItem from '../../components/MenuItem';

export default class Menu extends Component {
    constructor(props){
        super(props);
        this.registerItems = this.registerItems.bind(this);
        this.makeOrder = this.makeOrder.bind(this);
    }
    state = {
        url: this.props.route.params.menuURL,
        name: "",
        menu: [],
        selectedItems: [],
        OrderButton: false
    }

    async componentDidMount() {
        const cod = this.state.url.split('/').splice(3, 1);
        const res = await api.get(`/restaurant/${cod}`);
        this.setState({
            name: res.data.name,
            menu: res.data.menu
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
        this.props.navigation.navigate('MakeOrder', {
            selectedItems: this.state.selectedItems,
            restaurantName: this.state.name
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
                        <View>
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
            </View>
        );
    }
}
