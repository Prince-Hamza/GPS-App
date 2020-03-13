import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ScarletScreen from './Comps/MainScreen';
import GrayScreen from './Comps/GrayScreen';
import { Router, Scene } from 'react-native-router-flux';
import SignUp from './Comps/SignUp';
import firebase from 'firebase'
import GPS from './Comps/GPS.jsx';


var config = {
  apiKey: "AIzaSyDbLaZK1MOemuxlb9FmAxGoqOs_VjoufkE",
  authDomain: "kidgames-spaceship.firebaseapp.com",
  databaseURL: "https://kidgames-spaceship.firebaseio.com",                
  projectId: "kidgames-spaceship",
  storageBucket: "kidgames-spaceship.appspot.com",
  messagingSenderId: "155419873905",
  appId: "1:155419873905:web:b8f90ef9d96e883cee01d0",
  measurementId: "G-4SWLB829QJ"
}
firebase.initializeApp(config);


export default function App() {


  return (
    <Router>
      <Scene key="root">

        <Scene key="scarlet"
          component={ScarletScreen}
          title="Home"
          initial
        />
        <Scene
          key="gray"
          component={GrayScreen}
          title="Gray"
        />

        <Scene
          key="SignUp"
          component={SignUp}
          title="Sign Up"
        />

        <Scene
          key="GPSTracking"
          component={GPS}
          title="GPS Tracking"
        />

        <Scene
          key="Profile"
          component={GPS}
          title="My Profile"
        />

        <Scene
          key="RideSearch"
          component={GPS}
          title="Ride Search"
        />

        <Scene
          key="MessagesHistory"
          component={GPS}
          title="Messenger"
        />

        <Scene
          key="ChatRoom"
          component={GPS}
          title="Chat"
        />



      </Scene>

      



    </Router>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
