import React, { Component } from 'react';
import { Text, View , TextInput , StyleSheet , Button } from 'react-native';



class Messenger extends Component {

    componentDidMount () {   }

     constructor () {      
       super() 
       this.state = {     

       }
     
     }  

  render() {
    return (
        <View style={styles.container}>  

        <Text>     Messenger     </Text>

  
  
      
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

export default Messenger;

