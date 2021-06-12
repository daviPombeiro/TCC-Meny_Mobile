import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import api from '../../../config/api';
import styles from '../../assets/css/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class closeOrder extends Component {
    constructor(props){
        super(props);
    }
    state = {
        tableId: this.props.route.params.tableId,
        orderId: this.props.route.params.orderId,
        order: [],
        total: 0,
        toPay: 0
    }

    async componentDidMount() {
        const orderId = this.state.orderId;
        const order = await api.get(`/order/${orderId}`,{
            headers: {
                "Authorization": "Bearer " + await AsyncStorage.getItem('@token')
            }
        });

        this.setState({order: order.data.order, total: order.data.total});
    }

    render(){
        return(
            <View style={{height: "100%"}}>
                <View style={styles.menuHeader}>
                    <Text style={styles.menuRestaurant}>Resumo da conta</Text>
                </View>
                {this.state.order.map(order => {
                    return(
                        <View style={{flex: 1, maxWidth: "100%"}}>
                            <View style={{flex: 1,
                                alignItems: "center",
                                paddingBottom: 10,
                                marginTop: 10,
                                maxHeight: 35,
                                borderBottomWidth: 1,
                                borderBottomColor: "#3057CC"
                            }}>
                                <Text style={{flex: 4, fontWeight: "bold", fontSize: 20}}>{order.user}</Text>
                            </View>
                            {order.items.map(item => {
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
                        </View>
                    )
                })}
                <View style={styles.OrderOptions}>
                    <View style={{
                        padding: 10,
                        borderTopWidth: 1,
                        borderTopColor: "#3057CC"
                    }}>
                        <Text style={{fontWeight: "bold", fontSize: 15}}>Falta pagar: R${this.state.total}</Text>
                    </View>
                    <View>
                        <TextInput
                            style={{
                                color: "black",
                                fontSize: 20,
                                margin: 10,
                                padding: 0,
                                borderBottomWidth: 1
                            }}
                            placeholder="Quantidade a pagar"
                            placeholderTextColor="#aaaaaa"
                            keyboardType="numeric"
                            onChangeText={text => this.setState({toPay: text})}
                        />
                        <TouchableOpacity
                            style={styles.makeOrderButton}
                        >
                            <Text style={{fontSize: 17, color: "white", fontWeight: "bold"}}>Pagar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}