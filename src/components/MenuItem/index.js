import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from '../../assets/css/styles';

export default class MenuItem extends React.Component {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    state = {
        item: this.props.item,
        backColor: "transparent",
        textColor: "black"
    }

    handleClick = () =>{
        if(this.state.backColor == "transparent"){
            this.setState({
                backColor: "#3057CC",
                textColor: "white"
            });
        } else {
            this.setState({
                backColor: "transparent",
                textColor: "black"
            });
        }
        this.state.item.func(this.state.item);
    }

    render() {
        let {item, backColor, textColor} = this.state;
        return (
            <TouchableOpacity
                id={item._id}
                style={[styles.menuItemContainer, {backgroundColor: backColor}]}
                onPress={this.handleClick}
            >
                <View style={{width: "70%", padding: 10}}>
                    <Text style={[styles.menuItemTitle, {color: textColor}]}>{item.name}</Text>
                    <Text style={{color: textColor}}>{item.description}</Text>
                    <Text style={[{fontWeight: "bold"}, {color: textColor}]}>R${item.price}</Text>
                </View>
                <View style={{width: "30%", alignSelf: "center"}}>
                    <Image
                        source={{uri: item.image}}
                        style={{width: 100, height: 100}}
                    />
                </View>
            </TouchableOpacity>
        );
    }

}