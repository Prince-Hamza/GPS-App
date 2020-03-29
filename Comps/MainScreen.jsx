import React, { Component } from 'react';
import {  StyleSheet, TextInput ,  Text ,  View , Button , Image, Dimensions } from 'react-native';
import { Input  } from 'react-native-elements';
import { Actions } from 'react-native-router-flux'; // New code
import * as Google from 'expo-google-app-auth';
import * as firebase from 'firebase';
import { UIButton } from './Button.jsx';
import {Selects} from 'queryfire';
import _ from 'lodash';
import Updatish from './Updatish'





class ScarletScreen extends Component {
componentDidMount () {
 // throw new Error("My first Sentry error!");
 //alert("")
}

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
  
  
  EmailLogin = async () => {    

  //  Actions.Admin();  

    firebase.auth()
        .signInWithEmailAndPassword( this.state.email, this.state.password)
           .then(() => { 
             try{
               alert("Login Successful")              
               Actions.Menu({Email:this.state.email})                   
             }  
             catch (e) {
              alert(e)
             }                      
         })  
        .catch(error => alert(error)) 
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
      
      <Text></Text>
      <Image style = {styles.Image} source = {require ("./Rabbit.jpg")} />

    

<Text></Text>

<View style = {styles.BigContainer}  >

    <View style={styles.searchSection}>

    
    <TextInput  style={styles.input}  placeholder="Enter Email Address"  underlineColorAndroid="black"
        onChangeText={(String) => {this.setState({email: String})}}      
    />
   </View>

    
      
    <View style={styles.searchSection}>

    
    <TextInput  style={styles.input} secureTextEntry={true}    placeholder="Enter New Password"  underlineColorAndroid="black"
        onChangeText={(String) => {this.setState({password : String})}}      
    />
   </View>

   <Text></Text>


      <View style = {{flex:1 , width : 500 , paddingLeft : 160    }}  >
      <UIButton title="Login"  style={{ width:160 , height: 35 , backgroundColor : '#222'  }} 
                textStyle={{ color : "cyan" }}  onPress = {()=>{this.EmailLogin()}}   />
      </View>

      <View style = {{flex:1 , width : 500 ,paddingLeft:90  }}  >
      <UIButton title="Continue with Google"  style={{ width:320 , height: 35 , backgroundColor : '#222'  }} 
                textStyle={{ color : "cyan" }}  onPress = {()=>{this.GoogleAuth()}}   />
      </View>


</View>


 <View style = {{flex:1 , width : 500 , alignItems : 'center' , justifyContent : 'flex-end' , paddingBottom :15  }}
 onPress = {()=>{Actions.SignUp()}}       >
      <UIButton title="Sign Up"  style={{ width:320 , height: 45 , backgroundColor : '#222' }} 
                textStyle={{ color : "cyan" }}   onPress = {()=>{Actions.SignUp()}} />
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

  GPS:{
    flex:0.4, 
  },

  BigContainer: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',

  },

  welcome: {
    fontSize: 18,  
    color: 'magenta',
    fontFamily:'serif'
  },



  searchSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',


},
searchIcon: {
    padding: 15,
},
input: {
    flex: 1,
    paddingBottom: 10,
    paddingLeft: (Dimensions.get("window").width) / 4.3   ,

    fontSize: 20,
    backgroundColor: '#FFFFFF',
    color: '#222',
    marginBottom:15

    
},

Image: {
  flex:1,

  width:260 ,
  height:25

  
}




});

export default ScarletScreen;



var Decide;