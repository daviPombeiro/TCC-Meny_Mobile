/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import api from '../../../config/api';
import styles from '../../assets/css/styles';
import MenuItem from '../../components/MenuItem';

export default class Menu extends Component {
    constructor(props){
        super(props);
        this.registerItems = this.registerItems.bind(this);
    }
    state = {
        url: this.props.route.params.menuURL,
        name: "",
        menu: [],
        selectedItems: []
    }

    async componentDidMount() {
        const cod = this.state.url.split('/').pop();
        const res = await api.get(`/restaurant/${cod}`);
        this.setState({
            name: res.data.name,
            menu: res.data.menu
        });
    }

    registerItems = (id) => {
        let ar = this.state.selectedItems;
        if(ar.includes(id)){
            ar.splice(ar.indexOf(id), 1);
        } else {
            ar.push(id);
        }
    }

    render() {
        return (
            <View>
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
            </View>
        );
    }
}
