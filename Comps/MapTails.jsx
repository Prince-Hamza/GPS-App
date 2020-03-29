import React, { Component } from 'react';
import { Text, View ,TouchableOpacity , SafeAreaView , ScrollView , StyleSheet , Button , Image , Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import {RouteMagic} from './MakeRoute'
import * as firebase from 'firebase'
import RidersList from './DriverList.jsx'
import { Actions } from 'react-native-router-flux';


export default class MapTails extends Component {  

   async componentDidMount () { 

    if(this.props.RideInfo.Status == "Started") {
      this.setState({Started:true})
    }

   if(this.props.RideInfo.RiderMail != undefined){
     this.setState({RiderMail: this.props.RideInfo.RiderMail })
   }
   

    var R = await RouteMagic(this.props.Start , this.props.Finish , this.map)
    this.setState ({Route : R})

    if(this.props.RiderInfo.Role == "Car_Customers"){
      this.setState({RiderMail:this.props.RiderInfo.Email.split(".").join("")})

    }




    }


  constructor () {      
      super() 
      this.state = {
        mapRegion : { latitude: 35.716122, longitude: 139.7436063, latitudeDelta: 3, longitudeDelta: 3 }                ,
        Route: null   ,
        RiderMail :null,
        RiderAssigned:false,
        RiderCoords:null,
        Text:"No Rider Assigned To This Ride By Admin",
        Started:false
      }     
  } 

  getRiderInfo = (data) => {

console.log(data.coords.latitude)
console.log(data.coords.longitude)

this.setState({RiderCoords:data.coords})
    
  }


  InviteRider = (RiderEmail ,RiderData) => {
    var RMail = RiderEmail.split(".").join("");

     firebase.database().ref('/Users/' + RMail + '/Invitations/' + this.props.ID)
     .update(this.props.RideInfo)

     firebase.database().ref('/Users/' + this.props.CustomerMail + '/MyRides/' + this.props.ID)
     .update({RiderCoords:RiderData.coords ,RiderMail:RMail })


     this.setState({Text:"A Rider Is Invited To This Ride"})

     

    
      alert("Rider Invited")

  }


  render() {
    return (
        <SafeAreaView style = {styles.container}>
         <ScrollView style = {styles.scrollView} >

     
     <MapView 
           initialRegion = { { latitude: 35.716122, longitude: 139.7436063, latitudeDelta: 3, longitudeDelta: 3 }   }
           style={{ alignSelf: 'stretch', height: Dimensions.get('window').height - 150 }} 
           showsUserLocation = {true}
           showsCompass = {true}
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
              coordinate =  { this.props.Start }
              onPress = {(event)=> {alert(event.nativeEvent.coordinate.latitude)}}  
              identifier={'mk1'}     > 
             <Image source = {require('./ManIcon.png')} style = {{height:50 , width:50}} />  
             </MapView.Marker> 
            }

            {this.props.Finish != null &&
              <MapView.Marker
              coordinate =  { this.props.Finish }
              onPress = {(event)=> {alert(event.nativeEvent.coordinate.latitude)}}   
              identifier={'mk2'}   > 
             <Image source = {require('./Dest.png')} style = {{height:50 , width:50}} />  
             </MapView.Marker> 
            }

            {this.state.RiderCoords != null &&
              <MapView.Marker
              coordinate =  { this.state.RiderCoords }
              onPress = {(event)=> {alert(event.nativeEvent.coordinate.latitude)}}   
              identifier={'mk3'}   > 
             <Image source = {require('./Rabbit.jpg')} style = {{height:35 , width:75}} />  
             </MapView.Marker> 
            }




            {this.state.Route !== null && 
              <MapView.Polyline
		          coordinates={this.state.Route}
		          strokeColor="hotpink" 
	              strokeWidth={12}
    	        />  
            }


      </MapView>     

{this.state.RiderMail != null &&

       <TouchableOpacity  >
          <View style =  {styles.Heading} >
             <Text style = {styles.ListText} > {this.state.RiderMail}  </Text>                                           
          </View>
{this.props.RiderInfo.Role == "Individual_Customers" &&
<View>
  <TouchableOpacity>
    <Button title = "Where Is Cargo" onPress = {()=>{
      this.setState({RiderCoords :this.props.RideInfo.RiderCoords})
      if(this.state.Started){

        Actions.GPSTracking({
          Start: this.props.RideInfo.StartCoords , Finish:this.props.RideInfo.EndCoords ,
          Info:  this.props.RiderInfo, LiveID : this.props.RideInfo.ID ,
          Route : this.state.Route
         })

      }
      
      }}  > </Button>
  </TouchableOpacity>
</View>
}
</TouchableOpacity>  }
     

{  this.state.RiderMail == null &&

<TouchableOpacity  >
   <View style =  {styles.Heading} >
      <Text style = {styles.ListText} > {this.state.Text}  </Text>   
      <Text></Text>                                        
      <Text>
       <Text></Text> 
      </Text>
   </View>
</TouchableOpacity>

}



{this.state.RiderMail != undefined &&

<TouchableOpacity  >
<View style =  {styles.Heading} >
   <Text style = {styles.ListText} > Customer  </Text>          
   <Text></Text>      
   <Text></Text>                               
     
   <Text style = {styles.ListText} >  {this.props.CustomerMail}  </Text>                                           
</View>

</TouchableOpacity>
}

     


      {this.props.Role == "Car_Customers"  &&
      <Button title = "Accept Invitation" onPress = {() => {
          firebase.database().ref('/Users/' + this.state.RiderMail + '/Invitations/' + this.props.ID)
          .update({Accepted:true })
        alert("Invitation Accepted")
      }} >
      </Button>
      }

{this.props.RiderInfo.Role != "Admin" && this.state.Started == false && 
<View>
   <Button title = "Start Ride" onPress = {() => {
    firebase.database().ref('/Users/' + this.state.RiderMail + '/Invitations/' + this.props.ID)
    .update({Status:"Started" })

    Actions.GPSTracking({
      Start: this.props.RideInfo.StartCoords , Finish:this.props.RideInfo.EndCoords ,
      Info:  this.props.RiderInfo, LiveID : this.props.RideInfo.ID ,
      Route : this.state.Route
     })

  }} >
  </Button>
  <Text></Text>
  </View>
 }

  




       
        {this.props.Role == "Admin" && 
     <TouchableOpacity  >
        <View style =  {styles.Heading} >
            <Text style = {styles.ListText} > Invite a Driver  </Text>                                           
        </View>
     </TouchableOpacity> 
        }


{this.props.RiderInfo.Role == "Admin" &&
        <RidersList SendInfo = {this.getRiderInfo} Invite = {this.InviteRider} />

}
        


      
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
      backgroundColor: 'white',
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
    ListText :{
      alignSelf:'center',
      fontSize: 14,
      color: "magenta",
      fontFamily:'monospace'
    },
    Heading: {
      backgroundColor:"white" , 
      width:Dimensions.get('window').width ,
      height:100 ,
      alignItems:'center',
      justifyContent:"center",
      marginBottom:1
    }

  
  
  });

