import axios from 'axios'
import { PermissionsAndroid, Alert } from 'react-native'
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';


const mapBase = 'maps.googleapis.com/maps/api/'

export const requestLocationPermission = async (callback) => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,{
        'title': 'Location Access Required',
        'message': 'Masjid Speaker needs to access your location'
      }
    )
    if  (granted === true || granted === PermissionsAndroid.RESULTS.GRANTED) {
alert("Permission Granted")
      callback(true)
    } else {
      Alert.alert('Warning', 'Permission Denied')
      callback(false)
    }
  } catch (err) {
    console.log("err",err)
  }
}


export const expoLocation = async () => {
  let { status } = await Permissions.askAsync(Permissions.LOCATION);
  if (status !== 'granted') {
    alert("Permission Denied")
    this.setState({  errorMessage: 'Permission to access location was denied' });
  }
  let location = await Location.getCurrentPositionAsync({});
 // alert(JSON.stringify(location) );
  return location;

}




export const getLocation = async (callback) => {

  let location = await Location.getCurrentPositionAsync({});
  callback(location);

  // Geolocation.getCurrentPosition((position) => {
  //   callback(position.coords)
  // }, (error) => {
  //   const { code, message } = error
  //   callback(null)
  // }, {
  //   enableHighAccuracy: true,
  //   timeout: 15000,
  // })
}

// export const getNearbyMasjids = (lat, long) => {
//   return axios({
//     method: 'get',
//     url: 'https://'+ mapBase + `place/nearbysearch/json?location=${lat},${long}&radius=1500&type=mosque&key=AIzaSyBC0KVa-UF8wZMv9JRMUmbflqVAVP4BktI`,
//     // withCredentials: true,
//     headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//         'Cache-Control': 'no-cache',
//         'Access-Control-Allow-Origin': '*'
//     }
//   })
// }

// export const getPhotoReference = (ref) => {
//   return axios({
//     method: 'get',
//     url: 'https://'+ mapBase + `place/photo?maxwidth=200&photoreference=${ref}&key=AIzaSyBC0KVa-UF8wZMv9JRMUmbflqVAVP4BktI`,
//     // withCredentials: true,
//     headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//         'Cache-Control': 'no-cache',
//         'Access-Control-Allow-Origin': '*'
//     }
//   })
// }