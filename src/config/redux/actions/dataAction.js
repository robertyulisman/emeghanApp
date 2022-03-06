import axios from 'axios';
import {apiUrl} from '../../../utils/Data';
import {GET_DATA, GET_DATA_GURU} from './types';

// get data Guru
export const getDataGuru = () => async dispatch => {
  await axios
    .get(`${apiUrl}/api/guru`)
    .then(response => {
      console.log(`response.data`, response.data);
      dispatch({
        type: GET_DATA_GURU,
        payload: response.data,
      });
    })
    .catch(err => console.log(`err get data guru`, err));
};

// get data
export const getDataProduk = () => async dispatch => {
  await axios
    .get(`${apiUrl}/api/produk`)
    .then(response => {
      console.log(`response.data`, response.data);
      dispatch({
        type: GET_DATA,
        payload: response.data,
      });
    })
    .catch(err => console.log(`err get data produk`, err));
};
