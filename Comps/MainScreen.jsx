import React, { Component } from 'react';
import {  StyleSheet, TextInput ,  Text ,  View , Button } from 'react-native';
import { Input  } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux'; // New code
import * as Google from 'expo-google-app-auth';
import * as firebase from 'firebase';
import { UIButton } from './Button.jsx';





class ScarletScreen extends Component {


  constructor () {
    super()
    this.state = {
      email:"",
      password:""
    }
  }


  GoogleNext = () => { 
    Actions.SignUp({Data : "Name From Main"});  
   }
  
  
  EmailLogin = () => {    
    Actions.GPSTracking();
    // firebase.auth()
    //     .signInWithEmailAndPassword( this.state.email, this.state.password)
    //     .then(() =>  {alert('Login Success') ; Actions.GPSTracking(); }) 
    //     .catch(error => alert(error))  
   }
  
   GoogleAuth = async () => {
  
     try {
      const result = await Google.logInAsync({
        androidClientId: "80398670374-jrafsuu0fsmdf1mqfllq1pcmf2e6d5q9.apps.googleusercontent.com",
       // iosClientId: YOUR_CLIENT_ID_HERE,
        scopes: ['profile', 'email'],
      });
  
      if (result.type === 'success') {
        alert("success");
       
        const credential = firebase.auth.GoogleAuthProvider.credential(result.idToken, result.accessToken);
        firebase.auth().signInWithCredential(credential)
          .then(res => {
            //alert(JSON.stringify(res));
            Actions.SignUp({Data : res , ViaGoogle : true});
  
          })
          .catch(error => {
            alert("firebase cred err: " + error);
          });
  
      }  else {
        return { cancelled: true };
      }
    } catch (e) {
      alert(e)
      return { error: true };
    }
  }


  render () {
  return (
    <View style={styles.container}>

      <View style = {{flex:1}}  >
      <Text  style={styles.welcome}  onPress={() => Actions.gray()}    >
        GPS Tracking App
      </Text>
      </View>


<View style = {styles.BigContainer}  >

    <View style={styles.searchSection}>
    <Icon style={styles.searchIcon} name="ios-search" size={24} color="#000"/>
    <TextInput  style={styles.input}    placeholder="Enter Email Address"  underlineColorAndroid="black"
        onChangeText={(String) => {this.setState({email: String})}}      
    />
   </View>

    
      
    <View style={styles.searchSection}>
    <Icon style={styles.searchIcon} name="ios-search" size={24} color="#000"/>
    <TextInput  style={styles.input}     placeholder="Enter New Password"  underlineColorAndroid="black"
        onChangeText={(String) => {this.setState({password : String})}}      
    />
   </View>



      <View style = {{flex:1 , width : 500 , paddingLeft : 160  }}  >
      <UIButton title="Login"  style={{ width:160 , height: 35 , backgroundColor : 'white'  }} 
                textStyle={{ color : "magenta" }}  onPress = {()=>{this.EmailLogin()}}   />
      </View>

      <View style = {{flex:1 , width : 500 ,paddingLeft:90  }}  >
      <UIButton title="Continue with Google"  style={{ width:320 , height: 35 , backgroundColor : 'white'  }} 
                textStyle={{ color : "magenta" }}  onPress = {()=>{this.GoogleAuth()}}   />
      </View>


</View>


<View style = {{flex:1 , width : 500 , alignItems : 'center' , justifyContent : 'flex-end' , paddingBottom :5  }}  >
      <UIButton title="Sign Up"  style={{ width:320 , height: 45 , backgroundColor : 'gray' }} 
                textStyle={{ color : "white" }}  onPress = {()=>{Actions.SignUp()}}   />
      </View>


  


    
    </View>
  ); }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },

  BigContainer: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',

  },

  welcome: {
    fontSize: 18,  
    margin: 100,
    color: 'magenta',
    fontFamily:'serif'
  },



  searchSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
},
searchIcon: {
    padding: 15,
},
input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    fontSize: 20,
    backgroundColor: '#FFFFFF',
    color: '#222',
},




});

export default ScarletScreen;


