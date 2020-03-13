import React, { Component } from 'react';
import { Text, View , TextInput , StyleSheet , Button } from 'react-native';
import { Input  } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase'


class SignUp extends Component {

    componentDidMount () {

           if(this.props.ViaGoogle === true) {

               var Info = this.props.Data.user
                alert(Info.email)  // uid , photoURL , phoneNumber
                alert(JSON.stringify(this.props.Data))          
                   this.setState ({
                     ID : Info.uid ,
                     Email : Info.email ,
                     Username : Info.displayName ,
                     Photo : Info.photoURL,
                     Telephone : Info.phoneNumber           
                  })
           }

    }

  constructor () {      
      super() 
      this.state = {
          ID : '',
          Username : "" ,
          Password : "" ,
          Address : "" ,
          Telephone : "" ,
          Email : "" ,
          CarNum :""
      }

     
  }  


  EmailSignUp = () => {   

      alert("sign up");
    firebase.auth()
        .createUserWithEmailAndPassword(this.state.Email, this.state.Password )
        .then(() => {alert("User Created Successfully") ; Actions.scarlet() })
        .catch(error => alert(error))
  }


  render() {
    return (
        <View style={styles.container}>    
  
     
  
  
      <View style={styles.searchSection}>
      <Icon style={styles.searchIcon} name="ios-search" size={24} color="#000"/>
      <TextInput  style={styles.input} value = {this.state.Username}   placeholder="Username"  underlineColorAndroid="black"
          onChangeText={(iString) => {  this.setState({Username : iString })   }}      
      />
     </View>
  
      
        
      <View style={styles.searchSection}>
      <Icon style={styles.searchIcon} name="ios-search" size={24} color="#000"/>
      <TextInput  style={styles.input} value = {this.state.Password}   placeholder="Password"  underlineColorAndroid="black"
          onChangeText={(iString) => { this.setState({Password : iString }) }}      
      />
     </View>

       
     <View style={styles.searchSection}>
      <Icon style={styles.searchIcon} name="ios-search" size={24} color="#000"/>
      <TextInput  style={styles.input}    placeholder="Address"  underlineColorAndroid="black"
          onChangeText={(iString) => { this.setState({Address : iString })  }}      
      />
     </View>

          
     <View style={styles.searchSection}>
      <Icon style={styles.searchIcon} name="ios-search" size={24} color="#000"/>
      <TextInput  style={styles.input}    placeholder="Telephone Number"  underlineColorAndroid="black"
          onChangeText={(iString) => { this.setState({Telephone : iString })   }}      
      />
     </View>

          
     <View style={styles.searchSection}>
      <Icon style={styles.searchIcon} name="ios-search" size={24} color="#000"/>
      <TextInput  style={styles.input} value = {this.state.Email}     placeholder="Email Address"  underlineColorAndroid="black"
          onChangeText={(iString) => {  this.setState({Email : iString }) }}      
      />
     </View>
  
        
  
  
     <View style={styles.searchSection}>
      <Icon style={styles.searchIcon} name="ios-search" size={24} color="#000"/>
      <TextInput  style={styles.input} value = {this.state.CarNum}   placeholder="Car Plate Number"  underlineColorAndroid="black"
          onChangeText={(iString) => {  this.setState({CarNum : iString })  }}      
      />
     </View>
  
     <View style = {{flex:1 , width : 250   }}  >
     <Button  style={{   fontSize: 20    }} title = "Register"  color = 'magenta' onPress = {()=>{  this.EmailSignUp()  }}    />
     </View>

  
    
  
  
      
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
    },
  
  
  
    searchSection: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
      color:'#222'
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

export default SignUp;


