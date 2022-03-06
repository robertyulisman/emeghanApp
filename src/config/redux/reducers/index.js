import {combineReducers} from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducers';
import profileReducer from './profileReducer';
import dataReducer from './dataReducer';
import addressReducer from './addressReducer';
import checkoutReducer from './checkoutReducer';
import notificationReducer from './notificationReducer';
import chatReducer from './chatReducer';
import tokoReducer from './tokoReducer';
import ppobReducer from './ppobReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  alamat: addressReducer,
  data: dataReducer,
  checkout: checkoutReducer,
  notification: notificationReducer,
  chat: chatReducer,
  toko: tokoReducer,
  ppob: ppobReducer,
});
