import React, { Component } from 'react';
import { Text, View , TextInput , SafeAreaView , ScrollView , StyleSheet , Button , Image , Dimensions } from 'react-native';
import { Input  } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase'
import {expoLocation}  from './location'
import MapView , {PROVIDER_GOOGLE} from 'react-native-maps';
import UIButton from './Button.jsx'
import Polyline from '@mapbox/polyline';
import { TouchableOpacity } from 'react-native-gesture-handler';



export default class GPS3 extends Component {  

    async componentDidMount () { 
   // this.props.Info
   // alert(this.props.LiveID)

 this.setState({Start:this.props.Start , Finish:this.props.Finish})

 this.Synchronize()

 setInterval(()=> {
   this.Update();
 } , 3000)


  }

  constructor () {      
      super() 
      this.state = {
        mapRegion : { latitude: 35.716122, longitude: 139.7436063, latitudeDelta: 3, longitudeDelta: 3 } ,
        UserEmail:'',
        DriverEmail:'',
        CustomerCoords : null,
        DriverCoords:null       

      }     
  } 

  // Send Coordinates To Firebase Databse
  Update = async () => {    
    var location = await expoLocation();  


    if(this.props.Info.Role == "Individual_Customers"){
           firebase.database().ref('/DrivesLive/' + this.props.LiveID + '/CustomerCoords')
           .update({location})
    } 
    else if(this.props.Info.Role == "Car_Customers"){
           firebase.database().ref('/DrivesLive/' + this.props.LiveID + '/DriverCoords')
           .update({location})
    }
    else if (this.props.Info.Role == "Admin"){
      return;
    }

    //this.setState({mapRegion: { latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.2, longitudeDelta: 0.02 }});
  }

   // Read Coordinates From Firebase Databse

   Synchronize = () => {
     console.log(this.props.LiveID)

     firebase.database().ref('/DrivesLive/' + this.props.LiveID + '/CustomerCoords/location/coords')
     .on('value' , ((coords)=> {
      try { var Coords = coords.val();  } catch(err) {    console.log("Reason:  "  + err)    }

      if(Coords != undefined) {       console.log( "Customer Location: " + Coords.latitude);  
      this.setState({CustomerCoords: Coords})  }

     }))


     firebase.database().ref('/DrivesLive/' + this.props.LiveID + '/DriverCoords/location/coords')
     .on('value' , ((coords) => {
       try { var Coords = coords.val();  } catch(err) {    console.log("Reason:  "  + err)    }

       if(Coords != undefined) {       console.log( "Driver Location: " + Coords.latitude);  
       this.setState({DriverCoords: Coords})  }

     }))



   }


 
 



  render() {
    return (
        <SafeAreaView style = {styles.container}>
         <ScrollView style = {styles.scrollView} >

     
     <MapView 
           provider={ PROVIDER_GOOGLE }
           initialRegion = { { latitude: 35.716122, longitude: 139.7436063, latitudeDelta: 3, longitudeDelta: 3 }   }
           style={styles.map} 
           zoomEnabled= {true}
           ref = {map => {this.map = map} }
           onMapReady = {() => {this.map.fitToSuppliedMarkers(["mk1" , "mk2"], {
                                edgePadding: {
                                bottom: 200, right: 50, top: 150, left: 50,                                       },
                                animated: true,
                                }); }}
           > 
           
            {this.props.Start != null &&
              <MapView.Marker
              coordinate =  { this.state.Start }
              onPress = {(event)=> {alert(event.nativeEvent.coordinate.latitude)}}  
              identifier={'mk1'}     > 
             <Image source = {require('./ManIcon.png')} style = {{height:50 , width:50}} />  
             </MapView.Marker> 
            }

            {this.props.Finish != null &&
              <MapView.Marker
              coordinate =  { this.state.Finish }
              onPress = {(event)=> {alert(event.nativeEvent.coordinate.latitude)}}   
              identifier={'mk2'}   > 
             <Image source = {require('./Dest.png')} style = {{height:50 , width:50}} />  
             </MapView.Marker> 
            }

             {this.state.CustomerCoords != null &&
              <MapView.Marker
              coordinate =  { this.state.CustomerCoords }
              onPress = {(event)=> {alert(event.nativeEvent.coordinate.latitude)}}   
              identifier={'mk3'}   > 
             <Image source = {require('./ManIcon.png')} style = {{height:50 , width:50}} />  
             </MapView.Marker> 
            }


            {this.state.DriverCoords != null &&
              <MapView.Marker
              coordinate =  { this.state.DriverCoords }
              onPress = {(event)=> {alert(event.nativeEvent.coordinate.latitude)}}   
              identifier={'mk4'}   > 
             <Image source = {require('./Rabbit.jpg')} style = {{height:35 , width:75}} />  
             </MapView.Marker> 
            }


            {this.props.Route != null && 
              <MapView.Polyline
		          coordinates={this.props.Route}
		          strokeColor="hotpink" 
	              strokeWidth={12}
    	        />  
            }


      </MapView>         


  <TouchableOpacity>
    {this.props.Info.Role == "Car_Customers" && 

<Button title ="Complete" onPress = {()=> {

  firebase.database().ref('/Users/' + this.props.Info.Email + '/Invitations/' + this.props.ID)
  .update({Status:"Completed" })    
           // Notify Customer
  }} /> 
    
    
    }
  

  </TouchableOpacity>
      
        </ScrollView>
        </SafeAreaView>
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
    },
    scrollView: {
        backgroundColor: 'lightgray',
        marginHorizontal: 0,
        width:Dimensions.get('window').width,    
    },
    map:
    { alignSelf: 'stretch', height: Dimensions.get('window').height - 125  }
  
  
  });

