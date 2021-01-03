import { StatusBar } from 'expo-status-bar';
import React,{useEffect, useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';

import * as Location from 'expo-location';

const WEATHER_API_KEY = 'edee621a4ee4a6256e577af64c264b62'
const BASE_URL = 'http://api.openweathermap.org/data/2.5/weather?'

export default function App() {
  const [errMsg,setErrMsg] = useState(null)
  const [currWeather,setCurrWeather] = useState(null)
  const [unitSystem,setUnitSystem] = useState('metric')

  useEffect(() => {
    load()
  }, [])

  const load = async() =>{
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
    const {main:{temp}} = currWeather
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />

        <View style={styles.main}>
          <Text>{temp}</Text>
        </View>
        
      </View>
    );
  }
  else{
    return (
      <View style={styles.container}>
        <Text>{errMsg}</Text>
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
