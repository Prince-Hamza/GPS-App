import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addNote } from '../redux/actions';
import { Dimensions , StyleSheet,  Text,  View,  TouchableOpacity , Button , TextInput} from 'react-native';
import store from '../redux/store';

class ReduxConnect extends Component {

  componentDidMount () {
   
 }

  constructor(props) {
    super(props);

    this.state = {
      title: '',
      content: ''
    };
  }

  handleChange = (e , name) => {

    // SendData To Store

    this.props.addNote("ME" , e.nativeEvent.text)

    // Read Data From Store

    alert(JSON.stringify(store.getState()))

   // this.setState({ [name] : e.nativeEvent.text });



   // alert(this.state.title)

  }

  handleSubmission = (e) => {

    this.props.addNote(this.state.content,"",this.state.title);

    this.setState({ title: '', content: '' });
  }



  render() {
    return (
      <View style = {styles.container}>

<Text>React Redux Notes App</Text>
<Text></Text>


        <Text>Add a Note</Text>
        
       <Text>Title : </Text>

       <TextInput style = {styles.input} placeholder = "Enter A New Title"  value = {this.state.title} onChange = {(e)=>{this.handleChange(e,"title")}}  />

       <Text></Text>

       <TextInput placeholder = "Enter New Content" style = {styles.input} name = "content" value = {this.state.content} onChange = {(e)=>{this.handleChange(e,"content")}}  />

       <Text></Text>
       
        

        <Button title = "Add Note" onPress = {(e)=> {this.handleSubmission(e)}} />
      </View>
    )
  }

}

export default connect(
    null,
    {
      addNote: addNote
    }
  )(ReduxConnect);










  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
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
      },
      input: {
        flex: 1,
        paddingBottom: 10,
        paddingLeft: (Dimensions.get("window").width) / 4.3   ,
    
        fontSize: 20,
        backgroundColor: '#FFFFFF',
        color: '#222',
        marginBottom:15
    
        
    }

  
  
  });