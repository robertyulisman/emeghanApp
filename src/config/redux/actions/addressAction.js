import axios from 'axios';
import {GET_ADDRESS} from './types';

// get profile
export const getAddress = paramsAlamat => async dispatch => {
  await axios
    .get(`https://dev.farizdotid.com/api/daerahindonesia/${paramsAlamat}`)
    .then(response => {
      console.log(`sukses get alamat indonesia`, response.data);
      dispatch({
        type: GET_ADDRESS,
        payload: response.data,
      });
    })
    .catch(err => console.log(`err get alamat indonesia`, err));
};
