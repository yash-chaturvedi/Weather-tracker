import { StatusBar } from 'expo-status-bar';
import React,{useEffect, useState} from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

import * as Location from 'expo-location';
import WeatherInfo from './components/WeatherInfo';
import UnitsPicker from './components/UnitsPicker';
import { colors } from './utils';
import ReloadIcon from './components/ReloadIcon';
import WeatherDetails from './components/WeatherDetails';
import {WEATHER_API_KEY} from '@env'

const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather?'

export default function App() {
  const [errMsg,setErrMsg] = useState(null)
  const [currWeather,setCurrWeather] = useState(null)
  const [unitSystem,setUnitSystem] = useState('metric')
  const {PRIMARY_COLOR} = colors

  useEffect(() => {
    load()
  }, [unitSystem])

  const load = async() =>{
    setCurrWeather(null)
    setErrMsg(null)
    try{
      let {status} = await Location.requestPermissionsAsync()

      if(status !== 'granted'){
        setErrMsg('Access to location is needed to run the app')
        return
      }

      const location = await Location.getCurrentPositionAsync()

      const {latitude,longitude} = location.coords
      
      const weatherUrl = `${BASE_URL}lat=${latitude}&lon=${longitude}&units=${unitSystem}&appid=${WEATHER_API_KEY}`
      // console.log(weatherUrl );
      
      const response = await fetch(weatherUrl)
      const result = await response.json()
      // console.log(result);
      
      if(response.ok){
        setCurrWeather(result)
      }
      else{
        setErrMsg(result.message)
      }

    }catch(e){
      setErrMsg(e.message)
    }
  }

  if(currWeather){
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        
        <View style={styles.main}>
          <UnitsPicker unitSystem={unitSystem} setUnitSystem={setUnitSystem} />
          <ReloadIcon load={load} />
          <WeatherInfo currWeather={currWeather} />
        </View>

        <WeatherDetails currWeather={currWeather} unitSystem={unitSystem} />
      </View>
    );
  }
  else if(errMsg){
    return (
      <View style={styles.container}>
        <ReloadIcon load={load} />
        <Text style={{textAlign : 'center'}} >{errMsg}</Text>
        <StatusBar style="auto" />
      </View>
    );
  }
  else{
    return(
      <View style={styles.container}>
        <ActivityIndicator color={PRIMARY_COLOR} size="large" />
        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  main : {
    flex : 1,
    justifyContent : 'center',
  }
});
