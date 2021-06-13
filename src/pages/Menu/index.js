/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import api from '../../config/api';
import styles from '../../assets/css/styles';

export default class Menu extends Component {
    state = {
        url: this.props.route.params.menuURL,
        name: "",
        menu: []
    }

    async componentDidMount() {
        const cod = this.state.url.split('/').pop();
        const res = await api.get(`/restaurant/${cod}`);
        this.setState({
            name: res.data.name,
            menu: res.data.menu
        });
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
                                return(
                                    <View id={item._id} style={styles.menuItemContainer}>
                                        <View style={{width: "70%", padding: 10}}>
                                            <Text style={styles.menuItemTitle}>{item.name}</Text>
                                            <Text>{item.description}</Text>
                                            <Text style={{fontWeight: "bold"}}>R${item.price}</Text>
                                        </View>
                                        <View style={{width: "30%", alignSelf: "center"}}>
                                            <Image
                                                source={{uri: item.image}}
                                                style={{width: 100, height: 100}}
                                            />
                                        </View>
                                    </View>
                                )
                            })}
                        </View>
                    )
                })}
            </View>
        );
    }
}
