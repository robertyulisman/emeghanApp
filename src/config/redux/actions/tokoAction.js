import axios from 'axios';
import {apiUrl} from '../../../utils/Data';
import {ADD_CART, DELETE_CART, UPDATE_CART} from './types';

export const addItemtoCart = data => dispatch => {
  dispatch({
    type: ADD_CART,
    payload: data,
  });
};

export const deleteItemtoCart = data => dispatch => {
  dispatch({
    type: DELETE_CART,
    payload: data,
  });
};
export const updateCart = data => dispatch => {
  console.log(`dataupdate redux`, data);
  dispatch({
    type: UPDATE_CART,
    payload: data,
  });
};
