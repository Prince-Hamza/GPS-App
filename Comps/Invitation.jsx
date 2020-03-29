import React, { Component } from 'react';
import { Text, View , TextInput , SafeAreaView , ScrollView , StyleSheet , Button , Image ,
     Dimensions , TouchableOpacity } from 'react-native';
import { Input  } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase'
import {Selects} from 'queryfire'
import _ from 'lodash'
import { enableNetworkProviderAsync } from 'expo-location';


export default class Invitation extends Component {  

    async componentDidMount () { 

    var Email = this.props.Info.Email;
    TrueMail = Email.split(".").join("");

        if(this.props.Info.Role == "Car_Customers") { 

             var InviList = await Selects('/Users/' + TrueMail + "/Invitations");
             this.setState({InvitationsList : InviList}); 

      } else if (this.props.Role == "Admin") {

        console.log("Admin");

         var InviList = await Selects("/Admin/New");
         var NeoRides = _.filter(InviList, {  'Status': 'Booked'  });
         this.setState({InvitationsList : NeoRides})
         console.log("$ Complete ")     
         
         // _.remove

      }

    





    }

  constructor () {      
      super() 
      this.state = {
      MyEmail: "void",
      InvitationsList : []
      }     
  } 

  getDateOnly = (input) => {
    var x = input + "";
    var c = x.split(" ")
    return c[2] + 0
  }

 Pass = (Invi) => {
   Actions.MapTails ({ RideInfo:Invi , Start: Invi.StartCoords , RiderInfo:this.props.Info,
    Finish:  Invi.EndCoords, ID: Invi.ID, Role:this.props.Role ,  CustomerMail:Invi.Email})
 }


  render() {
    return (
        <SafeAreaView style = {styles.container}>
         <ScrollView style = {styles.scrollView} >

             {this.state.InvitationsList.map(invi => {
                 return (
                     <TouchableOpacity key={invi.ID} onPress = {() => {this.Pass(invi)}} style = {{flexDirection:"row"}} >
                  <View >
                      <Text></Text>
                       <View style =  {styles.Heading} >
                       <Text></Text> 

                       <View style = {{flexDirection:"column"}}  >


                       <Text style = {styles.ListText} > From  </Text>
                       <Text></Text>

                       <Text style = {styles.ListText} > To  </Text>
                       <Text></Text>

                       <Text style = {styles.ListText} > Distance </Text>
                       <Text></Text>

                       <Text style = {styles.ListText} > Duration</Text>
                       <Text></Text>

                       <Text style = {styles.ListText} > Start Date  </Text>
                       <Text></Text>

                       <Text style = {styles.ListText} > Start Time         </Text>
                       <Text></Text>

                       <Text style = {styles.ListText} > Status             </Text>
                       <Text></Text>

                       <Text style = {styles.ListText} > Customer Email </Text>
                       <Text></Text>

                       <Text style = {styles.ListText} > Load Type </Text>
                       <Text></Text>

                       <Text style = {styles.ListText} > Weight Amount  </Text>
                       <Text></Text>

                       <Text style = {styles.ListText} > Cars Num  </Text>
                       <Text></Text>

                       </View>



                       <View style = {{flexDirection: "column"  , justifyContent:"flex-start"}}>

                         <Text style = {styles.ListText} > {invi.From} </Text>
                         <Text></Text>
                         <Text style = {styles.ListText} > {invi.To}  </Text>
                         <Text></Text>                         
                         <Text style = {styles.ListText} > {invi.Distance}  </Text>
                         <Text></Text>
                         <Text style = {styles.ListText} > {invi.Duration}  </Text>
                         <Text></Text>
                         <Text style = {styles.ListText} > {invi.StartDate}  </Text>
                         <Text></Text>
                         <Text style = {styles.ListText} > {invi.StartTime}  </Text>
                         <Text></Text>
                         <Text style = {styles.ListText} > {invi.Status}  </Text>
                         <Text></Text>
                         <Text style = {styles.ListText} > {invi.Email}  </Text>
                         <Text></Text>
                         <Text style = {styles.ListText} > {invi.LoadType}  </Text>
                         <Text></Text>
                         <Text style = {styles.ListText} > {invi.Weight}  </Text>
                         <Text></Text>
                         <Text style = {styles.ListText} > {invi.CarsNum}  </Text>
                         <Text></Text>


                       </View>


                                  
                       </View>
                     <Text></Text>
                 </View>
                 </TouchableOpacity>

                 )               
             })}

           
     
     

      
        </ScrollView>
        </SafeAreaView>
    );
  }
}


var InvitationsList = [

    {"From" : "Shinagawa" , "To" : "Shinjuku" , "Duration" : "22 hours"  , "Distance"  : "1000 km" , "Price" : "$ 100" },
    {"From" : "Islamabad" , "To" : "Lahore" , "Duration" : "3 hours"  , "Distance"  : "370 km" , "Price" : "$ 100" },
    {"From" : "Delhi" , "To" : "Mombay" , "Duration" : "26 hours"  , "Distance"  : "1700 km" , "Price" : "$ 1000" },



]
var TrueMail;
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

    ListText :{
        alignSelf:'flex-start',
        fontSize: 14,
        color: "magenta",
        fontFamily:'monospace'
      },
      Heading: {
        backgroundColor:"white" , 
        width:Dimensions.get('window').width + 100 ,
        height:470 ,
        alignItems:'flex-start',
        justifyContent:"flex-start",
        flexDirection:"row"
      }

  
  
  });

var minimum = false
var NewOrder = []