import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import {colors} from '../utils'

const { PRIMARY_COLOR, SECONDARY_COLOR } = colors

export default function WeatherInfo({currWeather}) {
    const {main:{temp} , weather : [details], name} = currWeather
    const {icon, main, description} = details
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`

    return (
        <View style={styles.weatherInfo} >
            <Text>{name}</Text>
            <Image style={styles.icon} source={{uri:iconUrl}} />
            <Text style={styles.textPrimary}>{temp}°</Text>
            <Text style={styles.description}>{description}</Text>
            <Text style={styles.textSecondary}>{main}</Text>
        </View>
    )
}

styles = StyleSheet.create({
    weatherInfo : {
        alignItems : 'center'
    },
    icon:{
        width:100 ,
        height:100 
    },
    description :{
        textTransform:'capitalize'
    },
    textPrimary: {
        fontSize: 40,
        color: PRIMARY_COLOR,
    },
    textSecondary: {
        fontSize: 20,
        color: SECONDARY_COLOR,
        fontWeight: '500',
        marginTop: 10,
    },
})