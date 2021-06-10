/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import api from '../../../config/api';
import styles from '../../assets/css/styles';

export default class Menu extends Component {
    constructor(props){
        super(props);
    }
    state = {
        items: this.props.route.params.selectedItems,
        restaurantName: this.props.route.params.restaurantName,
        total: 0
    }

    async componentDidMount() {
        var tot = 0;
        this.state.items.map(item => {
            tot += item.price;
        });
        this.setState({total: tot});
    }

    render() {
        return (
            <View style={{height: "100%"}}>
                <View style={styles.menuHeader}>
                    <Text style={styles.menuRestaurant}>{this.state.restaurantName} - Pedido</Text>
                </View>
                <Text
                    style={{
                        fontWeight: "bold",
                        fontSize: 20,
                        margin: 10,
                        marginBottom: 25
                    }}
                >
                    Verifique o seu pedido:
                </Text>
                <View style={{flex: 1, maxWidth: "100%"}}>
                    <View style={{flex: 1,
                        flexDirection: "row",
                        paddingLeft: 15,
                        maxHeight: 25,
                        borderBottomWidth: 1,
                        borderBottomColor: "#3057CC"
                    }}>
                        <Text style={{flex: 4, fontWeight: "bold", fontSize: 15}}>Pedido</Text>
                        <Text style={{flex: 1, fontWeight: "bold", fontSize: 15}}>Valor</Text>
                    </View>
                    {this.state.items.map(item => {
                        item.qntd = "1";
                        return (
                            <View style={{
                                flex: 1,
                                flexDirection: "row",
                                paddingLeft: 15,
                                paddingBottom: 10,
                                maxHeight: 30,
                                marginTop: 10,
                                borderBottomWidth: 1,
                                borderBottomColor: "#DEDEDE"
                            }}>
                                <Text style={{flex: 4, fontSize: 15}}>{item.name}</Text>
                                <Text style={{flex: 1, fontSize: 15}}>{item.price}</Text>
                            </View>
                        )
                    })}
                    <View style={{flex: 1,
                        flexDirection: "row",
                        paddingLeft: 15,
                        maxHeight: 30,
                        paddingTop: 10,
                        borderTopWidth: 1,
                        borderTopColor: "#3057CC"
                    }}>
                        <Text style={{flex: 4, fontWeight: "bold", fontSize: 15}}>Total</Text>
                        <Text style={{flex: 1, fontWeight: "bold", fontSize: 15}}>{this.state.total}</Text>
                    </View>
                </View>
                <TouchableOpacity
                    style={styles.makeOrderButton}
                    onPress={this.makeOrder}
                >
                    <Text style={styles.makeOrderButtonText}>Pedir</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
