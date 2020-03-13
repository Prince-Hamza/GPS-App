import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

const GrayScreen = () => {
  return (
    <View style={styles.container}>


   <View style={styles.searchSection}>
    <Icon style={styles.searchIcon} name="ios-search" size={24} color="#000"/>
    <TextInput  style={styles.input}    placeholder="Enter Email Address"  underlineColorAndroid="yellow"
        onChangeText={(searchString) => {this.setState({searchString})}}      
    />
   </View>


   <View style={styles.searchSection}>
    <Icon style={styles.searchIcon} name="ios-search" size={24} color="#000"/>
    <TextInput  style={styles.input}    placeholder="Enter Email Address"  underlineColorAndroid="yellow"
        onChangeText={(searchString) => {this.setState({searchString})}}      
    />
   </View>


   <View style={styles.searchSection}>
    <Icon style={styles.searchIcon} name="ios-search" size={24} color="#000"/>
    <TextInput  style={styles.input}    placeholder="Enter Email Address"  underlineColorAndroid="yellow"
        onChangeText={(searchString) => {this.setState({searchString})}}      
    />
   </View>






     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#bb0000',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
  },
});

export default GrayScreen;


