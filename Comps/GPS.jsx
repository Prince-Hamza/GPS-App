import React, { Component } from 'react';
import { Text, View , TextInput , StyleSheet , Button , Image } from 'react-native';
import { Input  } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase'
import {expoLocation}  from './location'
import MapView from 'react-native-maps';



export default class GPS extends Component {  

    componentDidMount () { 
      this.On_Location_Update()   
      this.Map_Update()                 
    }

  constructor () {      
      super() 
      this.state = {
        mapRegion : { latitude: 75, longitude: 75, latitudeDelta: 0.002, longitudeDelta: 0.002 }      ,
        Location: {coords: { latitude: 37.78825, longitude: -122.4324}},
        Coords:({latitude:0,longitude:0}),
        latitude: 0,
        longitude:0
      }     
  }  

  // handleMapRegionChange = (mapRegion) => {
  //   console.log(mapRegion);
  //   this.setState({ mapRegion });

  //   this.setState({
  //       longitude: mapRegion.longitude ,
  //       latitude:  mapRegion.latitude
  //     })
  // }

  On_Location_Update = async () => {    
    console.log("Updating Map")
    var location = await expoLocation();    
    var COORD = location.coords;
    this.setState({mapRegion: { latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.002, longitudeDelta: 0.002 }});
    this.setState({Coords:location.coords , latitude : COORD.latitude , longitude : COORD.longitude})
   // alert( JSON.stringify ( this.state.mapRegion))

  }



  Map_Update = () => {
    setInterval(() => {
      this.On_Location_Update()           
    }, 5000);
  }



  render() {
    return (
 <View style={styles.container}>    
      

<Text>Current Location</Text>

<MapView 
  style={{ alignSelf: 'stretch', height: 400 }} 
  region={this.state.mapRegion} > 
       <MapView.Marker
         coordinate =  {{ 
         latitude:this.state.latitude,
         longitude:this.state.longitude 
        }}
      > 
      <Image source = {require('./CarIcon.png')} style = {{height:70 , width:150}} />      
      </MapView.Marker>       
  </MapView>

  <Text>Drive To Update</Text>

      
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
    },
    welcome: {
      fontSize: 18,  
      margin: 100,
      color: '#222',
      fontFamily:'serif'
    }  
  
  
  });


