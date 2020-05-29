import PushNotification from "react-native-push-notification";

import {
  DocumentPicker,
  DocumentPickerUtil
} from "react-native-document-picker";

export default class NotifService {
  constructor(onRegister, onNotification) {
    this.configure(onRegister, onNotification);

    this.lastId = 0;
    this.state = {};
  }

  configure(onRegister, onNotification, gcm = "") {
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      //  onRegister: onRegister, //this._onRegister.bind(this),

      // (required) Called when a remote or local notification is opened or received
      onNotification: onNotification, //this._onNotification,

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true
      },

      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,

      /**
       * (optional) default: true
       * - Specified if permissions (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
       */
      requestPermissions: true
    });
  }


  scheduleNotificationSound(frequency) {
    let soundName = "default";
    let index=parseInt(frequency)
    let timePeriod=60*1*1000;
    let timersec=timePeriod/index;
    let timer=timersec;

     for (i = 1;i<=index;i++) {
      //  alert(args);
       PushNotification.localNotificationSchedule({
         date: new Date(Date.now() + timer), // in 30 secs

         /* Android Only Properties */
         vibrate: true, // (optional) default: true
         ongoing: false, // (optional) set whether this is an "ongoing" notification

         /* iOS and Android properties */
         title: "Lucid Journal", // (optional)
         message: "Add your dream and make a memory", // (required)
         playSound: true, // (optional) default: true`
         soundName: soundName // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
       });
       timer+=timersec;
     }
     
    //     DocumentPicker.show(
    //       {
    //         filetype: [DocumentPickerUtil.audio()]
    //       },
    //       (error, res) => {
    //         if (res == null) {
    //           alert("no file selected");
    //         } else {
    //           let soundName = res.uri;
    //           alert(soundName);
    //         }
    //       }
    //     );

  }

  checkPermission(cbk) {
    return PushNotification.checkPermissions(cbk);
  }

  cancelNotif() {
    PushNotification.cancelLocalNotifications({
      id: "" + this.lastId
    });
  }

  cancelAll() {
    PushNotification.cancelAllLocalNotifications();
  }
}
