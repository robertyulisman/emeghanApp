import axios from 'axios';
import setAuthToken from './../../../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import {GET_ERRORS, SET_CURRENT_USER, SET_CURRENT_PROFILE} from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {apiUrl} from '../../../utils/Data';
import {Alert} from 'react-native';

//register user
export const validasiNumber = userData => async dispatch => {
  await axios
    .post(`${apiUrl}/api/siswa/sentOtp`, userData)
    .then(response => {
      console.log('res sukses', response.data),
        dispatch({
          type: GET_ERRORS,
          payload: response.data,
        });
    })

    .catch(err => {
      console.log('res errr', err.response.data),
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data,
        });
    });
};

export const registerUser = (userData, navigation) => dispatch => {
  axios
    .post(`${apiUrl}/api/siswa/register`, userData)
    .then(response => {
      // save to localstorage
      const {token, user} = response.data;
      console.log('ini token', token);
      // set token to ls
      AsyncStorage.setItem('jwtToken', token);
      // // Set token to auth header
      setAuthToken(token);
      // // decode token to get user data
      const decoded = jwt_decode(token);
      console.log('ini decoded', decoded);
      // //set current user
      dispatch(setCurrentUser(decoded));
      navigation.navigate('FormUpdateProfile');
    })
    .catch(err => {
      // console.log('res errr', err.response.data),
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const registerGuru = (userData, navigation) => dispatch => {
  axios
    .post(`${apiUrl}/api/guru`, userData, {
      'Content-Type': 'multipart/form-data',
    })
    .then(response => {
      console.log(`response sukses`, response.data);
      Alert.alert(
        'Sukses',
        'Pendaftaran Kamu berhasil, kami akan mereview pendaftaran kamu dan selanjutnya silahkan menunggu informasi untuk test nya',
        [
          {
            text: 'Oke',
            onPress: () => {
              navigation.navigate('LoginGuru');
            },
          },
        ],
      );
    })
    .catch(err => {
      console.log('res errr', err.response.data);
      const textFormat = Object.keys(err.response.data)
        .map(key => key + ' : ' + err.response.data[key])
        .join('\n');

      Alert.alert(
        'upss, ada kesalahan',
        textFormat,

        [
          {
            text: 'Oke',
          },
        ],
      );
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const loginUser = (userData, userType) => dispatch => {
  let apiPath = apiUrl;
  if (userType.toLowerCase() === 'siswa') {
    apiPath += '/api/siswa/login';
  } else if (userType.toLowerCase() === 'guru') {
    apiPath += '/api/guru/login';
  }
  axios
    .post(apiPath, userData)
    .then(response => {
      // save to localstorage
      const {token, user} = response.data;
      console.log('ini token', token);
      // set token to ls
      AsyncStorage.setItem('jwtToken', token);
      // // Set token to auth header
      setAuthToken(token);
      // // decode token to get user data
      const decoded = jwt_decode(token);
      console.log('ini decoded', decoded);
      // //set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => {
      console.log('res errr', err.response.data),
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data,
        });
    });
};

//set logged user
export const setCurrentUser = decoded => async dispatch => {
  await dispatch({
    type: SET_CURRENT_USER,
    payload: decoded,
  });
};

// log user out
export const logoutUser = () => dispatch => {
  // remove token from async storage
  AsyncStorage.removeItem('jwtToken');
  // remove auth header for future request
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};
