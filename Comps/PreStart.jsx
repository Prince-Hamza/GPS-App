import React, { Component } from 'react';
import { Text, View , TextInput , StyleSheet } from 'react-native';
import {Card , Button , Icon} from 'react-native-elements'
import { Actions } from 'react-native-router-flux';



class MyProfile extends Component {

    componentDidMount () {   }

     constructor () {      
       super() 
       this.state = {     

       }
     
     }  

     Ride = () => {
         Actions.Destination()
     }

  render() {
    return (
        <View style={styles.container}> 

 <Card
  title='Ride Know How'
  image={require('./CarIcon.png')}>
      
  <Text style={{marginBottom: 10}}>
    The idea with React Native Elements is more about component structure than actual design.
  </Text>

  <Text style = {{marginLeft : -7}} >   Load Type   </Text>
  <TextInput  style={styles.input}  placeholder="Write Here Load Type"  underlineColorAndroid="black"
              onChangeText={(String) => {this.setState({password : String})}} />

<Text></Text>

<Text style = {{marginLeft : -7}} >   Load Weight   </Text>
<TextInput  style={styles.input}  placeholder="Write Here Load Weight"  underlineColorAndroid="black"
            onChangeText={(String) => {this.setState({password : String})}} />

<Text></Text>

<Text style = {{marginLeft : -7}} >   Customer Email (Optional)  </Text>
<TextInput  style={styles.input}  placeholder="Write Here Partner Email"  underlineColorAndroid="black"
            onChangeText={(String) => {this.setState({password : String})}} />
  
  <Text></Text>




  <Button
    icon={<Icon name='code' color='#ffffff' />}
    buttonStyle={{borderRadius: 50, marginLeft: 0, marginRight: 0, marginBottom: 0 , backgroundColor : 'limegreen'}}
    title='Ride Now'  onPress = {()=>{this.Ride()}} />
</Card>
  
  
      
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

  
  
  
  });

export default MyProfile;

