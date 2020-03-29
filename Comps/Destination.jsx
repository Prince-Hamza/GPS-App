import React, { Component } from 'react';
import { Text, View , TextInput , StyleSheet , Button , Image , Dimensions } from 'react-native';
import { Input  } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase'
import {expoLocation}  from './location'
import MapView from 'react-native-maps';
import UIButton from './Button.jsx'



export default class Destination extends Component {  

    componentDidMount () { 
        this.On_Location_Update()                 
    }

  constructor () {      
      super() 
      this.state = {
        mapRegion : { latitude: 75, longitude: 75, latitudeDelta: 0.0, longitudeDelta: 0.0 }  ,
        Location: {coords: { latitude: 37.78825, longitude: -122.4324}},
        Coords:({latitude:0,longitude:0}),
        latitude: 0,
        longitude:0,
        marker:null
      }     
  }  


  On_Location_Update = async () => {    
    console.log("Updating Map")
    var location = await expoLocation();    
    var COORD = location.coords;
    this.setState({mapRegion: { latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.2, longitudeDelta: 0.02 }});
    this.setState({Coords:location.coords , latitude : COORD.latitude , longitude : COORD.longitude})
   // alert( JSON.stringify ( this.state.mapRegion))
  }


  MapTouch = (event) => {
      var TouchCoords = event.nativeEvent.coordinate
     // alert(JSON.stringify(TouchCoords));
      this.setState({latitude:TouchCoords.latitude , longitude : TouchCoords.longitude})

  }

  


  render() {
    return (
 <View style={styles.container}>          


<MapView 
  style={{ alignSelf: 'stretch', height: Dimensions.get('window').height - 130 }} 
  region={this.state.mapRegion}
  onPress = {(event) => {this.MapTouch(event)}} > 

       <MapView.Marker
         coordinate =  {{ 
         latitude:this.state.latitude,
         longitude:this.state.longitude  }} > 
      <Image source = {require('./Dest.png')} style = {{height:50 , width:50}} />  
      </MapView.Marker>       

   


  </MapView>


<View style = {{width:500}} >
<Button  title = "Ride" onPress = {()=>{ 

    Actions.GPSTracking({
        TargetLatitude: this.state.latitude ,
        TargetLongitude: this.state.longitude
     }) 


  //   Actions.GPS3({
  //     TargetLatitude: this.state.latitude ,
  //     TargetLongitude: this.state.longitude
  //  }) 




    
    }} />
</View>

      
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
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


