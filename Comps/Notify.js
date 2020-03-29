// import { Notifications } from 'expo';
// import * as Permissions from 'expo-permissions';
// import firebase from '@firebase/app'
// import { Expo } from 'expo-server-sdk';


// export default async function registerForPushNotificationsAsync(Path) {
//   const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
//   if (status !== 'granted') {
//     alert('No notification permissions!');
//     return;
//   }
//   // Get the token that identifies this device
//   let token = await Notifications.getExpoPushTokenAsync();
//   // POST the token to your backend server from where you can retrieve it to send push notifications.

//   firebase.database().ref(Path).update({Token : token})
 
// }


// export async function  Notify(pushToken) {

// let expo = new Expo();
// let messages = [];

//   if (!Expo.isExpoPushToken(pushToken)) {
//     console.error(`Push token ${pushToken} is not a valid Expo push token`);  
//   }

//   messages.push({
//     to: pushToken,
//     sound: 'default',
//     body: 'A new Ride is Booked',
//     data: { withSome: 'data' },
//   })


// // The Expo push notification service accepts batches of notifications so
// // that you don't need to send 1000 requests to send 1000 notifications. We
// // recommend you batch your notifications to reduce the number of requests
// // and to compress them (notifications with similar content will get
// // compressed).
// let chunks = expo.chunkPushNotifications(messages);
// let tickets = [];
// (async () => {
//   // Send the chunks to the Expo push notification service. There are
//   // different strategies you could use. A simple one is to send one chunk at a
//   // time, which nicely spreads the load out over time:
//   for (let chunk of chunks) {
//     try {
//       let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
//       console.log(ticketChunk);
//       tickets.push(...ticketChunk);
//       // NOTE: If a ticket contains an error code in ticket.details.error, you
//       // must handle it appropriately. The error codes are listed in the Expo
//       // documentation:
//       // https://docs.expo.io/versions/latest/guides/push-notifications#response-format
//     } catch (error) {
//       console.error(error);
//     }
//   }
// })();





// }