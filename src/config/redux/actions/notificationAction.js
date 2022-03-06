import axios from 'axios';
import {apiUrl} from '../../../utils/Data';
import {NOTIFIKASI, UPDATE_NOTIFIKASI, DELETE_NOTIFIKASI} from './types';

// get data Guru
export const getNotification = idUser => async dispatch => {
  await axios
    .get(`${apiUrl}/api/notifikasi/${idUser}`)
    .then(response => {
      console.log(`response.data notifikasi`, response.data);
      dispatch({
        type: NOTIFIKASI,
        payload: response.data,
      });
    })
    .catch(err => console.log(`err get data notifikasi`, err));
};

export const updateNotification = idUser => async dispatch => {
  await axios
    .put(`${apiUrl}/api/notifikasi/${idUser}`)
    .then(response => {
      console.log(`sukses update`, response.data);
      dispatch({
        type: UPDATE_NOTIFIKASI,
      });
    })
    .catch(err => console.log(`gagal update notifikasi`, err));
};
export const deleteNotification = idUser => async dispatch => {
  await axios
    .delete(`${apiUrl}/api/notifikasi/${idUser}`)
    .then(response => {
      console.log(`sukses delete`, response.data);
      dispatch({
        type: DELETE_NOTIFIKASI,
      });
    })
    .catch(err => console.log(`gagal delete notifikasi`, err));
};
