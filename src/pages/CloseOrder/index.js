import React, { Component } from 'react';
import { View } from 'react-native';

export default class closeOrder extends Component {
    constructor(props){
        super(props);
        this.registerItems = this.registerItems.bind(this);
        this.makeOrder = this.makeOrder.bind(this);
    }
    state = {
        url: this.props.route.params.menuURL,
        name: "",
        menu: [],
        active: false,
        selectedItems: [],
        OrderButton: false
    }

    async componentDidMount() {
        const cod = this.state.url.split('/').splice(3, 1);
        const table = this.state.url.split('/').pop();
        const res = await api.get(`/restaurant/${cod}`);
        const active = await api.get(`/table/${table}`,{
            headers: {
                "Authorization": "Bearer " + await AsyncStorage.getItem('@token')
            }
        });
        this.setState({
            name: res.data.name,
            menu: res.data.menu,
            active: active.data
        });
    }

    render(){
        return(
            <View>
                
            </View>
        )
    }
}