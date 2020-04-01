import React, { Component } from 'react';
import {  StyleSheet, TextInput ,  Text ,  View , Button , Image, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux'; // New code
import ReduxConnect from './ReduxConnect'


class Main2 extends Component {
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


  render () {
  return (
    <View style={styles.container}>
           <ReduxConnect /> 
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

export default Main2;



