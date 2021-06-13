import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal } from 'react-native';
import MonthPicker from 'react-native-month-year-picker';
import api from '../../config/api';
import styles from '../../assets/css/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class closeOrder extends Component {
    constructor(props){
        super(props);
        this.openCredit = this.openCredit.bind(this);
        this.formatDate = this.formatDate.bind(this);
        this.payBill = this.payBill.bind(this);
        this.payOrder = this.payOrder.bind(this);
        this.closeOrder = this.closeOrder.bind(this);
    }
    state = {
        url: this.props.route.params.url,
        tableId: "",
        orderId: this.props.route.params.orderId,
        order: [],
        total: 0,
        toPay: "",
        cardShow: false,
        toPayEmptyShow: false,
        cardEmptyShow: false,
        closeOrderShow: false,
        numCard: "",
        codCard: "",
        nomeCard: "",
        validCard: "00/0000",
        show: false
    }

    async componentDidMount() {
        const orderId = this.state.orderId;
        this.setState({tableId: this.state.url.split('/').pop()});
        const order = await api.get(`/order/${orderId}`,{
            headers: {
                "Authorization": "Bearer " + await AsyncStorage.getItem('@token')
            }
        });

        this.setState({order: order.data.order, total: order.data.total});
    }

    async openCredit() {

        if(this.state.toPay.includes(',')){
            const cor = this.state.toPay.substr(0, this.state.toPay.indexOf(',')) + '.' + this.state.toPay.substr(this.state.toPay.indexOf(',') + 1)
            await this.setState({toPay: cor});
        }

        if(this.state.toPay > 0 && this.state.toPay <= this.state.total){
            this.setState({cardShow: true});
        } else {
            this.setState({toPayEmptyShow: true});
        }
    }

    async formatDate(e, date) {
        let format = `0${(date.getMonth()+1).toString()}/${date.getFullYear().toString()}`

        this.setState({validCard: format, show: false});
    }

    async payBill() {
        const {total, toPay, numCard, codCard, nomeCard, validCard} = this.state;
        if(numCard != "" && codCard != "" && nomeCard != "" && validCard != "00/0000") {
            if(total-toPay == 0) {
                this.setState({cardShow: false, closeOrderShow: true});
            } else {
                this.payOrder();
            }
        } else {
            this.setState({cardShow: false, cardEmptyShow: true});
        }
    }

    async payOrder() {
        const {toPay, numCard, codCard, nomeCard, validCard} = this.state;
        const order = await api.post(`/pay/${this.state.orderId}`,{
            amount: parseFloat(toPay),
            card: {
                numCard: numCard,
                codCard: codCard,
                nomeCard: nomeCard,
                validCard: validCard
            }
        },{
            headers: {
                "Authorization": "Bearer " + await AsyncStorage.getItem('@token')
            }
        });

        this.props.navigation.push('SearchRestaurant', {
            orderId: this.state.orderId,
            menuURL: this.state.url
        });
    }

    async closeOrder() {
        const {toPay, numCard, codCard, nomeCard, validCard} = this.state;
        const order = await api.post(`/pay/close/${this.state.orderId}`,{
            amount: parseFloat(toPay),
            card: {
                numCard: numCard,
                codCard: codCard,
                nomeCard: nomeCard,
                validCard: validCard
            }
        },{
            headers: {
                "Authorization": "Bearer " + await AsyncStorage.getItem('@token')
            }
        });

        this.props.navigation.push('Home');
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
                            onPress={this.openCredit}
                        >
                            <Text style={{fontSize: 17, color: "white", fontWeight: "bold"}}>Pagar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Modal
                    animationType="slide"
                    visible={this.state.cardShow}
                    transparent={true}
                >
                    <View
                        style={{
                            width: "100%",
                            height: "100%",
                            backgroundColor: "black",
                            opacity: 0.5
                        }}
                    ></View>
                    <View
                        style={{
                            backgroundColor: "white",
                            marginTop: "40%",
                            width: "90%",
                            alignSelf: "center",
                            position: 'absolute'
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 20,
                                textAlign: 'center',
                                width: '100%',
                                marginTop: 10,
                                marginBottom: 20
                            }}
                        >
                            Informações do Cartão
                        </Text>
                        <Text
                            style={{
                                color: "black",
                                fontSize: 10,
                                marginLeft: 10,
                                padding: 0,
                            }}
                        >
                            Número do cartão
                        </Text>
                        <TextInput
                            style={{
                                color: "black",
                                fontSize: 20,
                                margin: 10,
                                padding: 0,
                                borderBottomWidth: 1
                            }}
                            value={this.state.numCard}
                            placeholder="Número do cartão"
                            placeholderTextColor="#aaaaaa"
                            keyboardType="numeric"
                            onChangeText={text => this.setState({numCard: text})}
                        />
                        <Text
                            style={{
                                color: "black",
                                fontSize: 10,
                                marginLeft: 10,
                                padding: 0,
                            }}
                        >
                            Código de segurança
                        </Text>
                        <TextInput
                            style={{
                                color: "black",
                                fontSize: 20,
                                margin: 10,
                                padding: 0,
                                borderBottomWidth: 1
                            }}
                            value={this.state.codCard}
                            placeholder="Código de segurança"
                            placeholderTextColor="#aaaaaa"
                            keyboardType="numeric"
                            onChangeText={text => this.setState({codCard: text})}
                        />
                        <Text
                            style={{
                                color: "black",
                                fontSize: 10,
                                marginLeft: 10,
                                padding: 0,
                            }}
                        >
                            Nome do titular
                        </Text>
                        <TextInput
                            style={{
                                color: "black",
                                fontSize: 20,
                                margin: 10,
                                padding: 0,
                                borderBottomWidth: 1
                            }}
                            value={this.state.nomeCard}
                            placeholder="Nome do titular"
                            placeholderTextColor="#aaaaaa"
                            onChangeText={text => this.setState({nomeCard: text})}
                        />
                        <Text
                            style={{
                                color: "black",
                                fontSize: 10,
                                marginLeft: 10,
                                padding: 0,
                            }}
                        >
                            Data de validade
                        </Text>
                        <TouchableOpacity
                            onPress={() => {this.setState({show: true})}}
                        >
                            <Text
                                style={{
                                    color: "black",
                                    fontSize: 20,
                                    margin: 10,
                                    padding: 0,
                                    borderBottomWidth: 1
                                }}
                            >
                                {this.state.validCard}
                            </Text>
                        </TouchableOpacity>
                        <View style={{display: 'flex', flexDirection: 'row'}}>
                            <TouchableOpacity
                                style={{
                                    alignItems: "center",
                                    padding: 10,
                                    marginTop: 10,
                                    flex: 1
                                }}
                                onPress={() => this.setState({cardShow: false})}
                            >
                                <Text style={{fontSize: 20, color: "red", fontWeight: "bold"}}>Voltar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    alignItems: "center",
                                    padding: 10,
                                    marginTop: 10,
                                    flex: 1
                                }}
                                onPress={this.payBill}
                            >
                                <Text style={{fontSize: 20, color: "#3057CC", fontWeight: "bold"}}>Pagar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <Modal
                    animationType="slide"
                    visible={this.state.toPayEmptyShow}
                    transparent={true}
                >
                    <View
                        style={{
                            width: "100%",
                            height: "100%",
                            backgroundColor: "black",
                            opacity: 0.5
                        }}
                    ></View>
                    <View
                        style={{
                            width: "90%",
                            alignItems: "center",
                            position: 'absolute',
                            alignSelf: "center",
                            backgroundColor: "white",
                            marginTop: "70%"
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 20,
                                fontWeight: 'bold',
                                textAlign: 'center',
                                width: '100%',
                                marginTop: 10,
                                marginBottom: 20
                            }}
                        >
                            Valor inválido
                        </Text>
                        <Text
                            style={{
                                fontSize: 20,
                                margin: 10
                            }}
                        >
                            Por favor, insira um valor válido para pagar.
                        </Text>
                        <TouchableOpacity
                            style={{
                                width: "100%",
                                alignItems: "center",
                                padding: 10,
                                marginTop: 10
                            }}
                            onPress={() => {this.setState({toPayEmptyShow: false})}}
                        >
                            <Text style={{fontSize: 17, color: "red", fontWeight: "bold"}}>Fechar</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
                <Modal
                    animationType="slide"
                    visible={this.state.cardEmptyShow}
                    transparent={true}
                >
                    <View
                        style={{
                            width: "100%",
                            height: "100%",
                            backgroundColor: "black",
                            opacity: 0.5
                        }}
                    ></View>
                    <View
                        style={{
                            width: "90%",
                            alignItems: "center",
                            position: 'absolute',
                            alignSelf: "center",
                            backgroundColor: "white",
                            marginTop: "70%"
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 20,
                                fontWeight: 'bold',
                                textAlign: 'center',
                                width: '100%',
                                marginTop: 10,
                                marginBottom: 20
                            }}
                        >
                            Cartão Inválido
                        </Text>
                        <Text
                            style={{
                                fontSize: 20,
                                margin: 10
                            }}
                        >
                            Por favor, insira todas as informações do cartão corretamente.
                        </Text>
                        <TouchableOpacity
                            style={{
                                width: "100%",
                                alignItems: "center",
                                padding: 10,
                                marginTop: 10
                            }}
                            onPress={() => {this.setState({cardEmptyShow: false, cardShow: true})}}
                        >
                            <Text style={{fontSize: 17, color: "red", fontWeight: "bold"}}>Fechar</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
                <Modal
                    animationType="slide"
                    visible={this.state.closeOrderShow}
                    transparent={true}
                >
                    <View
                        style={{
                            width: "100%",
                            height: "100%",
                            backgroundColor: "black",
                            opacity: 0.5
                        }}
                    ></View>
                    <View
                        style={{
                            width: "90%",
                            alignItems: "center",
                            position: 'absolute',
                            alignSelf: "center",
                            backgroundColor: "white",
                            marginTop: "70%"
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 20,
                                fontWeight: 'bold',
                                textAlign: 'center',
                                width: '100%',
                                marginTop: 10,
                                marginBottom: 20
                            }}
                        >
                            Fechar conta
                        </Text>
                        <Text
                            style={{
                                fontSize: 20,
                                margin: 10
                            }}
                        >
                            Sua conta está zerada, deseja encerra-la?.
                        </Text>
                        <View style={{display: 'flex', flexDirection: 'row'}}>
                            <TouchableOpacity
                                style={{
                                    alignItems: "center",
                                    padding: 10,
                                    marginTop: 10,
                                    flex: 1
                                }}
                                onPress={this.payOrder}
                            >
                                <Text style={{fontSize: 20, color: "red", fontWeight: "bold"}}>Não</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    alignItems: "center",
                                    padding: 10,
                                    marginTop: 10,
                                    flex: 1
                                }}
                                onPress={this.closeOrder}
                            >
                                <Text style={{fontSize: 20, color: "#3057CC", fontWeight: "bold"}}>Sim</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                {this.state.show && (
                    <MonthPicker
                        onChange={(e, a) => {this.formatDate(e, a)}}
                        value={new Date()}
                        minimumDate={new Date()}
                    />
                )}
            </View>
        )
    }
}