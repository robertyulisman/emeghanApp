import React, {useEffect} from 'react';
import {StatusBar, BackAndroid, Alert} from 'react-native';
import 'react-native-gesture-handler';
import 'react-native-gesture-handler';
import Router from './src/config/router/Router';
import Login from './src/pages/Login';
import {apiUrl, Warna} from './src/utils/Data';
import {decode, encode} from 'base-64';
import Toast from 'react-native-toast-message';
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import {
  setJSExceptionHandler,
  getJSExceptionHandler,
  setNativeExceptionHandler,
} from 'react-native-exception-handler';
import {useSelector} from 'react-redux';
import axios from 'axios';
// import Router from './src/config/router/Router';

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

const App = props => {
  const {profile} = useSelector(state => state.profile);
  console.log('app profile', profile);
  useEffect(() => {
    request(PERMISSIONS.ANDROID.READ_CONTACTS).then(result => {
      console.log(`result`, result);
    });
    check(PERMISSIONS.ANDROID.READ_CONTACTS)
      .then(result => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log(
              'This feature is not available (on this device / in this context)',
            );
            break;
          case RESULTS.DENIED:
            console.log(
              'The permission has not been requested / is denied but requestable',
            );
            break;
          case RESULTS.LIMITED:
            console.log('The permission is limited: some actions are possible');
            break;
          case RESULTS.GRANTED:
            console.log('The permission is granted');

            break;
          case RESULTS.BLOCKED:
            console.log('The permission is denied and not requestable anymore');
            break;
        }
      })
      .catch(error => {
        console.log(`error cek permission`, error);
      });
  }, []);

  // handle error
  const reporter = error => {
    // Logic for reporting to devs
    // Example : Log issues to github issues using github apis.
    console.log('Report Error', error); // sample
    const data = {
      user: profile._id,
      error: error,
    };
    axios
      .post(`${apiUrl}/api/errorReport/${profile._id}`, data)
      .then(res => console.log('error sended', res.data))
      .catch(err => console.log('error not sent', err));
  };

  const errorHandler = (e, isFatal) => {
    if (isFatal) {
      const data = {
        user: profile._id,
        error: `${e.name} ${e.message}`,
      };
      axios
        .post(`${apiUrl}/api/errorReport/${profile._id}`, data)
        .then(res => console.log('error sended', res.data))
        .catch(err => console.log('error not sent', err));
      reporter(e);
      Alert.alert(
        'Unexpected error occurred',
        `
          Error: ${isFatal ? 'Fatal:' : ''} ${e.name} ${e.message}
  
          We have reported this to our team ! Please close the app and start again!
          `,
        [
          {
            text: 'Close',
            // onPress: () => {
            //   // BackAndroid.exitApp();

            // },
          },
        ],
      );
    } else {
      console.log(e); // So that we can see it in the ADB logs in case of Android if needed
    }
  };

  setJSExceptionHandler(errorHandler);

  setNativeExceptionHandler(errorString => {
    const data = {
      user: profile._id,
      error: errorString,
    };
    axios
      .post(`${apiUrl}/api/errorReport/${profile._id}`, data)
      .then(res => console.log('error sended', res.data))
      .catch(err => console.log('error not sent', err));
    //You can do something like call an api to report to dev team here
    //example
    // fetch('http://<YOUR API TO REPORT TO DEV TEAM>?error='+errorString);
    //
  });
  return (
    <>
      <StatusBar
        animated={true}
        backgroundColor={Warna.grayscale.lima}
        barStyle="dark-content"
      />
      <Router />
      <Toast position="bottom" />
    </>
  );
};

export default App;
