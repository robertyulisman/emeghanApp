import axios from 'axios';
import {apiUrl} from '../../../utils/Data';
import {GET_DATA_HARGA} from './types';

// get data Guru
export const getDaftarHargaPPOB = () => async dispatch => {
  await axios
    .post(`${apiUrl}/api/digiflast/daftarHarga`)
    .then(response => {
      console.log(`response.data daftar harga PPOB`, response.data);
      dispatch({
        type: GET_DATA_HARGA,
        payload: response.data,
      });
    })
    .catch(err => console.log(`err get data harga PPOB`, err));
};
