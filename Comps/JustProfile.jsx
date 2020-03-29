import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import {Selects} from 'queryfire'
import publicIP from 'react-native-public-ip';

export default class JustProfile extends Component {

  async componentDidMount () {
    //alert(this.props.Me)
   // alert(this.props.DisplayUser.Name)
   var HisIP = this.props.DisplayUser.IP;
  // alert(HisIP)
   var x = await Selects('/Live')
   x.forEach((obj)=>{          
       //  alert(obj.IP)
      //   alert(HisIP)
    if (obj.IP == HisIP){
     // alert("Found Live")
      this.setState({LiveStatus : "Online"})
    }


   })  
 


  
  }

  constructor () {
    super()
    this.state = {
      Photo : false,
      LiveStatus:""
    }
  }

  render() {
    return (
      <View style={styles.container}>
          <View style={styles.header}></View>

          {!this.state.Photo &&   
          <Image style={styles.avatar} source={{uri: this.props.DisplayUser.Photo}}/>          
          }
                    
          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <Text style={styles.name}>{this.props.DisplayUser.Name}</Text>
              <Text style={styles.info}> {this.state.LiveStatus}</Text>

              <Text style={styles.description}>
                 Your Story Here
               </Text>


              <Text></Text>
              <TouchableOpacity style={styles.buttonContainer} onPress = {()=>{Actions.PreStart()}}>
                <Text>Invite For Ride</Text>  
              </TouchableOpacity>              
              <TouchableOpacity style={styles.buttonContainer} onPress = {()=> { Actions.UpdateRoom({Partner:this.props.DisplayUser , Me: this.props.Me}) }} >
                <Text>Message</Text> 
              </TouchableOpacity>
            </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header:{
    backgroundColor: "cyan",
    height:200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:130
  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
  },
  body:{
    marginTop:40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
  },
  name:{
    fontSize:28,
    color: "#696969",
    fontWeight: "600"
  },
  info:{
    fontSize:16,
    color: "#00BFFF",
    marginTop:10
  },
  description:{
    fontSize:16,
    color: "#696969",
    marginTop:10,
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: "yellow",
  },
});
 
