import React, { Component } from 'react';
import {Selects} from 'queryfire';
import _ from 'lodash'
import { StyleSheet, Text, SafeAreaView, ScrollView , Button ,Image, View  , TextInput, CheckBox , Dimensions } from 'react-native';
import Constants from 'expo-constants';
import MapView from 'react-native-maps';
import { Actions } from 'react-native-router-flux';
import {  Dropdown }  from 'react-native-material-dropdown';
import * as firebase from 'firebase'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {MagicRoute } from './Firebase/MakeRoute'
import store from '../redux/store';
import { connect } from 'react-redux';
import { addNote } from '../redux/actions';



 class GPSInfo extends Component  {
    async componentDidMount () {  

      var e = this.props.Info.Email
      var x = e.split(".").join("")
this.setState({EmailID:x})   

       }
  
       constructor () {      
         super() 
         this.state = {                
            EmailID : "Void",
            ShowMap:true,
            PlacesData :[],
            mapRegion : { latitude: 35.716122, longitude: 139.7436063, latitudeDelta: 3, longitudeDelta: 3 }  ,
            CBtn:'',   
            CityQuery : ''       ,
            DropQuery: '' ,
            ButtonID:'',
            StatusText:'Select Your City',
            AutoCompletes:[], DropDownView:false,
            ShowUserLocation : false,
            SelectStart:false,
            SelectEnd:false,
            MarkerImage:'./Dest.png',
            ShowRoute: false,
            StartCoords:null,
            EndCoords:null,
            CityCoords:null,
            checked:true,
            RouteCoordinates:[],
            DestinationCoords:[],
            CoordsArray : [
                         
            ],
            Other : false,
            Price :0,
            Distance: 0,
            Duration:0,
            CalendarVisible : false,
            StartDate:"Not Selected",
            StartTime:"Not Selected",
            Mode : "date",
            LoadType:"",
            CarsNum:1,
            Weight:0,

         }       
       }  

       

    

      Submit = (Type) => {
        // if(this.state.StatusText == 'Select Your City') {

           // Query City & Coords
         //  this.QueryCityCoords()
         this.setState({ShowMap:true , DropDownView:false})         
         this.QueryInfo(Type)

         

       

          // this.setState({StatusText: 'Select Start Point' , SelectStart : true})
        // }       
      }

      Submit2 = async () => {

        this.setState({ShowMap:true , DropDownView:false})

        let resp = await fetch ("https://maps.googleapis.com/maps/api/geocode/json?address= " +this.state.DropQuery + "&key=AIzaSyDVKC6dhp0Y8HU4eIowZA6xG6hHpWj570A")
        let respJson = await resp.json();
        var Loc = respJson.results[0].geometry.location

        this.setState({EndCoords:({ "latitude":Loc.lat,  "longitude":Loc.lng})     }) 

        this.setState({ mapRegion :    ({ "latitude":Loc.lat,
        "longitude":Loc.lng , "latitudeDelta" : 2, "longitudeDelta" : 2})     })

        //-----------------------------------------------------------------------------------------



        var resp2 = await fetch ("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location= " + Loc.lat + "," + Loc.lng + "&radius=1500&type="+"restaurant"+"&key=AIzaSyDVKC6dhp0Y8HU4eIowZA6xG6hHpWj570A")
        var respJson2 = await resp2.json();
        var respArray = respJson.results

        respArray.forEach((Place) => {
         var Data = ({Name : Place.name,Latitude:Place.geometry.location.lat, Longitude:Place.geometry.location.lng })       
        // console.log(Data.Name);console.log(Data.Latitude)
         PlacesArray.push(Data)     
        })

        this.setState({PlacesData : PlacesArray})     

        if(this.state.StartCoords != null) {               

              const Magic = await MagicRoute(this.state.StartCoords , this.state.EndCoords) 
           
              this.setState ({ RouteCoordinates: Magic.coordsXY , Distance:Magic.Distance,
                               Duration:Magic.Duration,   Price:Magic.Price,  ShowRoute:true   })

              this.Markime('mk1' , 'mk2')


           
        



           
           
           }
     }


      Markime = (Marker1 , Marker2)  => {
      this.map.fitToSuppliedMarkers([Marker1 , Marker2], {
        edgePadding: {bottom: 200, right: 50, top: 150, left: 50 },
        animated: true  }); 
      }

      QueryInfo = async (Type) => {

           //Place To Coordinates
        //https://maps.googleapis.com/maps/api/geocode/json?address=Islamabad&key=AIzaSyBIYKLT7ZZ4OPggXRf1MHw5tFMIqX93AsA
       var Input = ""
        if(Type == "Start") {Input = this.state.CityQuery} else {Input = this.state.DropQuery}

        let resp = await fetch ("https://maps.googleapis.com/maps/api/geocode/json?address= " + Input + "&key=AIzaSyDVKC6dhp0Y8HU4eIowZA6xG6hHpWj570A")
        let respJson = await resp.json();
        var Loc = respJson.results[0].geometry.location
       // console.log(Loc.lng); // lat , lng

        if ( Type == "Start") {
        this.setState({StartCoords:({ "latitude":Loc.lat,  "longitude":Loc.lng})        })
        } else if (Type == "End") {
           this.setState({EndCoords:({ "latitude":Loc.lat,  "longitude":Loc.lng})     }) 
        }


        this.setState({ mapRegion :    ({ "latitude":Loc.lat,
        "longitude":Loc.lng , "latitudeDelta" : 0.5, "longitudeDelta" : 0.5})     })

     
     
        //NearBy Suggestions 
        // https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=1500&type=restaurant&keyword=cruise&key=AIzaSyBIYKLT7ZZ4OPggXRf1MHw5tFMIqX93AsA

         resp = await fetch ("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location= " + Loc.lat + "," + Loc.lng + "&radius=1500&type="+"restaurant"+"&key=AIzaSyDVKC6dhp0Y8HU4eIowZA6xG6hHpWj570A")
         respJson = await resp.json();

         var respArray = respJson.results

         respArray.forEach((Place) => {
          var Data = ({Name : Place.name,Latitude:Place.geometry.location.lat, Longitude:Place.geometry.location.lng })       
         // console.log(Data.Name);console.log(Data.Latitude)
          PlacesArray.push(Data)     
         })

         this.setState({PlacesData : PlacesArray})


         
         
      }

      // PlaceToCoordinates = async ()  => {

      // }


      QueryCityCoords = async () =>  {
         var CA = []
         var Info = await Selects('/Users')
         var Specific =  _.filter(Info, { 'City': this.state.CityQuery });
         Specific.forEach((USER)=>{
               CA.push(USER.coords);
               this.setState({CoordsArray: CA})
               this.setState({MarkerImage:'./ManIcon.png'})
              //alert( JSON.stringify( USER.coords));
       })
     }

       
  MapTouch = (event) => {
        var TouchCoords = event.nativeEvent.coordinate;       
  }

 OnTextChange1 = (Input) => {
  this.setState({CBtn:'Pick' , CityQuery:Input });
  this.AutoComplete(Input);
  if(Input == "") {this.setState({ShowMap:true , DropDownView:false})}
 }

 OnTextChange2 = (Input) => {
  this.setState({CBtn:'Drop' , DropQuery:Input });
  this.AutoComplete(Input);
  if(Input == "") {this.setState({ShowMap:true , DropDownView:false})}
 }

 AutoComplete = async (Words) => {

   this.setState({ShowMap:false , DropDownView:true})

   //console.log(this.state.CityQuery);
   var resp = await fetch ("https://maps.googleapis.com/maps/api/place/autocomplete/json?input=" + Words +"&key=AIzaSyDVKC6dhp0Y8HU4eIowZA6xG6hHpWj570A")
   var respJson = await resp.json();
   var ACArray = respJson.predictions;var AutoFin = []
   ACArray.map(item=>{
     AutoFin.push(item.description)
   })
   this.setState({AutoCompletes:AutoFin})
  // console.log(this.state.AutoCompletes)


  
  }

  BookRide = () => {

    var R = Math.random() + ""
    var Random = R.split(".").join("")  

    //this.Live(Random)
    this.UpdateFirebase('/Admin/New/' + Random  , Random)
    this.UpdateFirebase('/Users/' + this.state.EmailID + "/MyRides/" + Random , Random);  

      
    Actions.GPSTracking({
      Start:this.state.StartCoords , Finish:this.state.EndCoords ,
      Info: this.props.Info, LiveID : Random ,
      Route : this.state.RouteCoordinates
     })

  }



  UpdateFirebase = (Path , RandomID) => {
    firebase.database().ref(Path)
    .set({
      BookedBy : this.state.EmailID ,      Distance : this.state.Distance,
      Duration : this.state.Duration,      From: this.state.CityQuery,
      To: this.state.DropQuery  ,          Price: this.state.Price,
      StartCoords:this.state.StartCoords,  EndCoords:this.state.EndCoords,
      ID : RandomID , Email : this.state.EmailID , StartDate:this.state.StartDate ,
      StartTime:this.state.StartTime, LoadType:"" , CarsNum:"" , 
      Status:"Booked" , Accepted:false 
    })   

  }

  // Live = (RandomId) => {
  //   firebase.database().ref("/DrivesLive/" + RandomId + "/RiderCoords")
  //   .update({latitude:0 , longitude:0})
  //   firebase.database().ref("/DrivesLive/" + RandomId + "/CustomerCoords")
  //   .update({latitude:0 , longitude:0})
   
  // }



    render () {
        return (
            <SafeAreaView style={styles.container}>
              <ScrollView style={styles.scrollView}  decelarationRate = {0.9}>   

            

{/* <Text style = {{backgroundColor:'cyan',  }}  onChangeText={(String) => {this.setState({CityQuery: String})}}  >
   {this.state.StatusText}
</Text> */}

<View style = {{flexDirection:'row'}}>
<TextInput  style={styles.TextInput2}  placeholder="Pick Up"  underlineColorAndroid="magenta"
 value = {this.state.CityQuery}  onChangeText={(i) => { this.OnTextChange1(i)  }} />
<Button  title = ">>" style = {{width:50 , borderRadius:63}}     onPress = {()=> {this.Submit("Start")}} />
</View>


<View style = {{flexDirection:'row'}}>
<TextInput  style={styles.TextInput2}  placeholder="Drop Off"  underlineColorAndroid="magenta"       
  value = {this.state.DropQuery} onChangeText={(i) => {this.OnTextChange2(i)    }} />
<Button  title = ">>" style = {{width:50 , borderRadius:63}}   onPress = {()=> {this.Submit2()}} />
</View>
            
 {/* Get coordinates in a specific city from Google Firebase Database */}

{this.state.ShowMap &&
      <MapView 
           region = {this.state.mapRegion}
           style={{ alignSelf: 'stretch', height: Dimensions.get('window').height - 160 }} 
           ref = {map => {this.map = map} }
           onMapReady = {() => {this.map.fitToSuppliedMarkers(["mk1" , "mk2"], {
                                edgePadding: {
                                bottom: 200, right: 50, top: 150, left: 50,                                       },
                                animated: true,
                                }); }}
           onPress = {(event) => {this.MapTouch(event)}} 
           > 
           
          {this.state.CoordsArray.map (COORDS => {
               return (
               <MapView.Marker
               coordinate =  { COORDS }
               onPress = {(event)=> {alert(event.nativeEvent.coordinate.latitude)}}       > 
              <Image source = {require('./Dest.png')} style = {{height:50 , width:50}} />  
              </MapView.Marker> 
                )
            })}  

            {this.state.StartCoords !== null &&
              <MapView.Marker
              coordinate =  { this.state.StartCoords }
              onPress = {(event)=> {alert(event.nativeEvent.coordinate.latitude)}}  
              identifier={'mk1'}     > 
             <Image source = {require('./ManIcon.png')} style = {{height:50 , width:50}} />  
             </MapView.Marker> 
            }

            {this.state.EndCoords !== null &&
              <MapView.Marker
              coordinate =  { this.state.EndCoords }
              onPress = {(event)=> {alert(event.nativeEvent.coordinate.latitude)}}   
              identifier={'mk2'}   > 
             <Image source = {require('./Dest.png')} style = {{height:50 , width:50}} />  
             </MapView.Marker> 
            }


            {this.state.ShowRoute && 
              <MapView.Polyline
		          coordinates={this.state.RouteCoordinates}
		          strokeColor="hotpink" 
	          	strokeWidth={12}
    	        />  
            }

            


      </MapView>
    }


<Text></Text>

    {/*AutoComplete View  */}


    {this.state.DropDownView && 
    <View style = {{alignItems:'flex-start' , backgroundColor: 'white'  }} >
     {this.state.AutoCompletes.map(Place => {
       return (
         <View>
          <Text style = {styles.ListText} onPress = {()=> {            
             if(this.state.CBtn == 'Pick') {  this.setState({CityQuery:Place })  } else if (this.state.CBtn == 'Drop') { this.setState({DropQuery:Place })   }            
             }} >
            {Place}
          </Text>
          <Text style = {{backgroundColor:'lightgray' , width:Dimensions.get('window').width}}></Text>
          </View>
        )
     })}    
     </View>
    }


    {/* Near By Places View  */}

    {/* <View style = {{alignItems:'flex-start' , backgroundColor: 'white'  }} >
      {this.state.PlacesData.map(Place => {
        return (
          <View>
         <Text style = {styles.ListText} onPress = {()=> {
           var x = ({ 'latitude' : Place.Latitude , 'longitude' : Place.Longitude })           
           var Arr = [] ; Arr.push(x);
           this.setState({CoordsArray : Arr})           
           }} >

          {Place.Name}
        </Text>
        <Text></Text>
        </View>
        )
      })}    
    </View>
 */}





             <View style =  {styles.Heading} >
               <Text style = {styles.ListText} >Paid Road</Text>
             </View>             
             
             {/* Paid Road Check Box  */}
             <View style = {{flexDirection:'row'}} >
                 <CheckBox
                  value={this.state.PaidRoad}
                  onValueChange= {(v)=>{
                    if(v == true) {this.setState({PaidRoad : true , Price : this.state.Price + 100})}
                    else {this.setState({PaidRoad : false , Price : this.state.Price - 100 }) }
                  }} />
                  <Text style = {styles.text} > Use Paid Road </Text>
              </View>   
          
          







    <View style =  {styles.Heading} >
               <Text style = {styles.ListText} >Ride Schedule</Text>
    </View>


    <View style = {{flexDirection:'row'}} >
                 <CheckBox  value={this.state.Now}  onValueChange={() => this.setState({ CalendarVisible: !this.state.CalendarVisible })} />
                  <Text style = {styles.text} >Schedule </Text>
    </View>    

    <View style = {styles.Heading} >
<Text style = {styles.SubText}>  {this.state.StartDate}     </Text>
    </View>
<Text></Text>
    <View style = {styles.Heading} >
<Text style = {styles.SubText}>  {this.state.StartTime}     </Text>
    </View>

    <Text></Text>

    {this.state.CalendarVisible && 
              

              <DateTimePickerModal
              isVisible={this.state.CalendarVisible}
              mode={this.state.Mode}
              onCancel = {()=>{this.setState({CalendarVisible : false})}}
              onConfirm= {(Code)=> {
                var CString = Code + "".split(" ");
                var C = CString.split(" ")
                       if (this.state.Mode == "date") {              
                           this.setState({ StartDate : C[0] + " " +  C[1] + " " + C[2] , CalendarVisible : false })
                           this.setState({ Mode : "time" , CalendarVisible : true })
                           } else {
                           this.setState({StartTime : C[4] , CalendarVisible : false })
                           }
              }}
             

            />

   }                  
             <View style =  {styles.Heading} >
               <Text style = {styles.ListText} >Load Menu</Text>
             </View>



             {/* Drop Down Load Menu  */}

             


             <Dropdown  label = {"Load Menu"} data = {LoadData} onChangeText = {(value)=>{
                        this.setState({Price:this.state.Price + value , LoadType:value })
              }} />
 

             <View style = {{flexDirection:'row'}} >
               <CheckBox value={this.state.Other}  onValueChange={() => this.setState({ Other: !this.state.Other  })} />
                  <Text style = {styles.text} > Other </Text>
              </View>  

             {this.state.Other &&  <TextInput  style={styles.TextInput}    placeholder="Custom Load Type"  underlineColorAndroid="black"
               /> }



             <Text></Text>

          
             {/* Weight Amount Input  */}
             <View style =  {styles.Heading} >
               <Text style = {styles.ListText}  >Weight Amount</Text>
             </View>

             <Text></Text>



              <TextInput  style={styles.TextInput}    placeholder="Weight Amount"  underlineColorAndroid="black"
                           onChangeText={(Weight) => { 

                           var x = 350 , tempo = 0 , c;
                            for (c = 1; c <= 100 ; c++){
                                    if (Weight > tempo && Weight <= 350 * c) {
                                    this.setState({CarsNum : c}) 
                                }
                                    tempo = x
                                    x += 350                             
                            }

                           }} />

<Text></Text>

             {/* Number of Cars Drop Down  */}

             <View style =  {styles.Heading} >
               <Text style = {styles.ListText} >Cars Num</Text>
             </View>


      <Dropdown label = {"Car Number"} data = {CarData} value = {this.state.CarsNum} onChangeText = {(value)=>{
        this.setState({Price:this.state.Price * value})
        }} />

      <Text></Text>
      <Text></Text>
      <Text></Text>
      <View style =  {styles.Heading} >
               <Text style = {styles.ListText} > Distance {this.state.Distance} </Text>
      </View>
      <Text></Text>

      <View style =  {styles.Heading} >
      <Text style = {styles.ListText} > Duration {this.state.Duration}</Text>
      </View>
      <Text></Text>

      <View style =  {styles.Heading} >
               <Text style = {styles.ListText} >{'\u00A5'} {this.state.Price}</Text>
      </View>

     <Button title = "Book Ride" style = {{width:Dimensions.get('window').width }}
     onPress ={()=> {
       this.BookRide()      
      }} />

     <Text></Text>
     <Text></Text>
     <Text></Text>

               


              </ScrollView>
            </SafeAreaView>
          );
    }
}

export default connect(
  null,
  {
    addNote: addNote
  }
)(GPSInfo);

var StartTry = 1 , EndTry = 1;
var PlacesArray = [];
var Nums = [0,1,2,3,3,4,5,6,7,8,9]


var LoadData = [
  {"label" : "Load Type 1" , "value" : 5 } ,  
  {"label" : "Load Type 2" , "value" : 6 } ,  
  {"label" : "Load Type 3" , "value" : 15 } ,  
]

var CarData = [
  {"label" : "Car(s)  1" , "value" :1 } ,
  {"label" : "Car(s)  2" , "value" :2 } ,
  {"label" : "Car(s)  3" , "value" :3 } ,
]

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight -24,
    alignItems:'center',
    justifyContent:'center',    
  },

  TextInput :{
    width:Dimensions.get('window').width  , 
    height : 45 ,
    backgroundColor:"white",
  }   ,
  TextInput2 :{
    width:Dimensions.get('window').width - 33  , 
    height : 45 ,
    backgroundColor:"white",
    marginBottom:2  
  },
  scrollView: {
    backgroundColor: 'lightgray',
    marginHorizontal: 0,
    width:Dimensions.get('window').width,

  },
  text: {
    alignSelf:'center',
    fontSize: 20,
    color: "white",
    fontFamily:'monospace'
  },
  ListText :{
    alignSelf:'center',
    fontSize: 14,
    color: "magenta",
    fontFamily:'monospace'
  },

  SubText :{
    alignSelf:'center',
    fontSize: 14,
    color: "gray",
  },

  Heading: {
    backgroundColor:"white" , 
    width:Dimensions.get('window').width ,
    height:50 ,
    alignItems:'center',
    justifyContent:"center",
  }
});


