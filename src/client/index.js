import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap";
import "popper.js/dist/popper.min.js";
import "jquery/dist/jquery.slim.min.js";
import AppRoute from "./routes/routes";
import { Provider } from 'react-redux';
import configureStore from './store/store';
import { messaging } from './firebase/firebase';
import runtime from 'serviceworker-webpack-plugin/lib/runtime';
import icon from './icon.png';

if ('serviceWorker' in navigator) {
  runtime.register()
    .then(function (req) {
      console.log('Successfully Register :^)');
    })
}

const store = configureStore();

const showNotification = () => {

  if ('serviceWorker' in navigator) {
    var options = {
      body: 'You Successfully subscribed to our Notification Service!',
      icon,
      dir: 'ltr',
      lang: 'en-US',
      vibrate: [100, 50, 200],
      badge: icon,
      tag: 'confirm-notification',
      renotify: true,
      actions: [
        { action: 'confirm', title: 'Okay', icon },
        { action: 'cancel', title: 'Cancel', icon }
      ]
    }
    navigator.serviceWorker.ready
      .then(function (swreg) {
        swreg.showNotification("Succesfully Subscribed!", options)
      })
  }
}

const urlBase64ToUint8Array = (base64String) => {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/')
    ;
  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
}

function configurePushSub() {
  if (!('serviceWorker' in navigator)) {
    return;
  }

  var reg;
  navigator.serviceWorker.ready
    .then(function (swreg) {
      reg = swreg;
      return swreg.pushManager.getSubscription();
    })
    .then(function (sub) {
      if (sub === null) {
        // Create a new subscription
        var vapidPublicKey = 'BM1esoY0GA0p2oaqBQUr8AgWpiLg0ZvTv99JtwSUJWLw3JZrw0fQ_g0fY2IUaTpTziy8RZQe7A154AM-P4yE_xg';
        var convertedVapidPublicKey = urlBase64ToUint8Array(vapidPublicKey);
        return reg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: convertedVapidPublicKey
        });
      } else {
        // We have a subscription
      }
    })
    .then(function (newSub) {
      return fetch('https://olxpwa-50939.firebaseio.com/subscriptions.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(newSub)
      })
    })
    .then(function (res) {
      if (res.ok) {
        showNotification();
      }
    })
    .catch(function (err) {
      console.log(err);
    });
}

if ('Notification' in window) {
  Notification.requestPermission().then(function (result) {
    if (result === 'denied') {
      console.log('Permission wasn\'t granted. Allow a retry.');
      return;
    }
    if (result === 'default') {
      console.log('The permission request was dismissed.');
      return;
    }
    if (result === 'granted') {
      console.log('The permission request was granted.');
      //showNotification();
      configurePushSub();
      return;
    }
  });
}

const jsx = (
  <Provider store={store}>
    <AppRoute />
  </Provider>
);

ReactDOM.render(jsx, document.getElementById("root"));