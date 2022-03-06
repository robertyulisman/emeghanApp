import React, {Component} from 'react';
// import { Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';

/* redux */
// import { clearCurrentProfile } from '../../../config/redux/actions/profileActions';
import {setCurrentUser, logoutUser} from '../config/redux/actions/authAction';
import {
  clearProfileUser,
  getProfileUser,
} from '../config/redux/actions/profileActions';
import {useSelector, useDispatch} from 'react-redux';

/* navigation */
import {withNavigation} from 'react-navigation';

/* utils */
import setAuthToken from '../utils/setAuthToken';

const AuthPage = ({navigation}) => {
  const {user} = useSelector(state => state.auth);
  const dispatch = useDispatch();

  React.useEffect(() => {
    _bootstrapAsync();
  }, []);

  const _bootstrapAsync = async () => {
    const jwtToken = await AsyncStorage.getItem('jwtToken');
    const introToken = await AsyncStorage.getItem('intro');
    console.log(`introToken`, introToken);
    // const decoded = jwt_decode(AsyncStorage.jwtToken);

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    //
    if (jwtToken) {
      const userData = jwt_decode(jwtToken);
      console.log('userData', userData);
      // const userData = decoded;
      // set auth token header auth
      setAuthToken(jwtToken);
      // decode token and get user info and exp

      // set user and isAuthenticated
      dispatch(setCurrentUser(userData));
      // dispatch(getProfileUser(user._id));

      const currentime = Date.now() / 1000;
      // console.warn({
      //   currenttime: `${currentime}`,
      //   expTime: `${userData.exp}`
      // });
      if (userData.exp < currentime) {
        alert('time out, please login again');

        dispatch(logoutUser());
        dispatch(clearProfileUser());
        // this.props.clearCurrentProfile();
        return navigation.navigate('Login');
      }
      if (userData.userType.toLowerCase() === 'siswa') {
        return navigation.navigate('Dashboard');
      } else if (userData.userType.toLowerCase() === 'guru') {
        return navigation.navigate('DashboardGuru');
      }
      // switch (userData.userType.toLowerCase()) {
      //   case 'siswa':
      //     return navigation.navigate('Dashboard');
      //   case 'guru':
      //     return navigation.navigate('DashboardGuru');
      //   default:
      //     return navigation.navigate('DaftarMenu');
      // }
    } else if (introToken) {
      navigation.navigate('DaftarMenu');
    } else {
      navigation.navigate('IntroPage');
    }
  };

  return null;
};

export default withNavigation(AuthPage);
