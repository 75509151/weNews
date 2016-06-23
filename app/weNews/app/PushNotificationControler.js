import React, { Component } from 'react';
import{
  Platform,
  StyleSheet,
  Navigator,
  BackAndroid,
  ToastAndroid,
  Vibration
} from 'react-native';

var PushNotification = require('react-native-push-notification');
import JPush , {JpushEventReceiveMessage, JpushEventOpenMessage} from 'react-native-jpush'


PushNotification.configure({

    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function(token) {
      Vibration.vibrate();
        console.log( 'TOKEN:', token );
    },

    // (required) Called when a remote or local notification is opened or received
    onNotification: function(notification) {
      Vibration.vibrate();
        console.log( 'NOTIFICATION:', notification );
    },

    // ANDROID ONLY: (optional) GCM Sender ID.
    senderID: "YOUR GCM SENDER ID",

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
      * IOS ONLY: (optional) default: true
      * - Specified if permissions will requested or not,
      * - if not, you must call PushNotificationsHandler.requestPermissions() later
      */
    requestPermissions: true,
});

export default class PushNotificationControler extends Component{

  constructor(props){
    super(props);


  }

  onReceiveMessage = (message)=>{
    //
    Vibration.vibrate();
    console.log('push组件开始');
    const {onReceiveMessage} = this.props;
    if(typeof onReceiveMessage == 'function'){
      onReceiveMessage();
    }
    console.log('结束');
  }

  onOpenMessage = (message)=>{
    console.log('message:'+message);
  }

  componentDidMount() {
    JPush.requestPermissions()
    this.pushlisteners = [
         JPush.addEventListener(JpushEventReceiveMessage, this.onReceiveMessage),
         JPush.addEventListener(JpushEventOpenMessage, this.onOpenMessage),
     ]
  }

  componentWillUnmount(){
    this.pushlisteners.forEach(listener=> {
        JPush.removeEventListener(listener);
    });
  }

  render() {
    return null;
  }
}
