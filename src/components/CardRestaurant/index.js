import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import styles from '../../assets/css/styles';
import Icon from 'react-native-vector-icons/FontAwesome';

const styleLocal = StyleSheet.create({
    view: {
        alignItems: "center",
        flexGrow: 1,
        width: '100%',
        height: 100,
        backgroundColor: 'white',
        borderRadius: 7,
        flexDirection: 'column',
        flexWrap: 'wrap',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.5,
        elevation: 2,
        padding: 0,
    },
    viewImage: {
        flex: 1,
        height: "100%",
        width: "30%",
        flexWrap: "wrap",
        padding: 5
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 7
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    rowEnd: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    column: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: 8,
        height: "100%"
    },
    viewInformation: {
        height: "100%",
        width: "40%"
    },
    liked: {
        height: "100%",
        width: "5%",
        flex: 1,
        justifyContent: 'flex-start',
        marginTop: 10,
        marginRight: 10,
        alignItems: 'flex-end',
    },
    title: {
        fontSize: 15,
        fontWeight: "bold",
        color: "#111e6c"
    },
    starGrade: {
        fontSize: 10,
        fontWeight: "bold",
        color: "#F7BB23",
        marginTop: 1,
        marginLeft: 2
    },
    category: {
        fontSize: 11,
        color: "black",
        marginLeft: 3
    },
    icon: {
        marginTop: 3
    }
})

export default function CardRestaurant(props) {

    return (
        <View style={styleLocal.view}>
            <View style={styleLocal.row}>
                <View style={styleLocal.viewImage}>
                    <Image
                        source={{ uri: props.image }}
                        style={styleLocal.image}
                    />
                </View>
                <View style={styleLocal.viewInformation}>
                    <View style={styleLocal.column}>
                        <Text style={styleLocal.title}>{props.title}</Text>
                        <View style={styleLocal.row}>
                            <Icon name="star" style={styleLocal.icon} size={10} color="#F7BB23" />
                            <Text style={styleLocal.starGrade}>8,1</Text>
                            <Text style={styleLocal.category}>•</Text>
                            <Text style={styleLocal.category}>{props.category}</Text>
                            <Text style={styleLocal.category}>•</Text>
                            <Text style={styleLocal.category}>7,2 km</Text>
                        </View>
                        <View style={styleLocal.row}>
                            {props.openHour < new Date().getHours() < props.closeHour ?
                                <>
                                    <Text style={styleLocal.category, { color: "#2CDE70", fontSize: 11 }}>Aberto</Text>
                                    <Text style={styleLocal.category}>{"até as " + (props.closeHour) + " h"}</Text>
                                </>
                                :
                                <>
                                    <Text style={styleLocal.category, { color: "#EB2020", fontSize: 11 }}>Fechado</Text>
                                    <Text style={styleLocal.category}>{"as " + (props.closeHour) + " h"}</Text>
                                </>
                            }


                        </View>
                        <View style={styleLocal.rowEnd}>
                            <Text style={styleLocal.category}>44</Text>
                            <Text style={styleLocal.category}>-</Text>
                            <Text style={styleLocal.category}>55 min</Text>
                        </View>
                    </View>
                </View>
                <View style={styleLocal.liked}>
                    <TouchableOpacity style={{width:"100%",height:"100%",alignItems:"flex-end",justifyContent:"flex-start"}} activeOpacity={0.8} onPress={props.onPressLike}>
                        <Icon name={ props.liked === true? 'heart':'heart-o'} size={30} color="#111e6c" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

}