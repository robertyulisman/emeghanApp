import axios from 'axios';
import {apiUrl} from '../../../utils/Data';
import {
  CHECKOUT_PESANAN,
  CHANGE_STATUS_CHECKOUT_PESANAN,
  UPDATE_PESANAN,
} from './types';

export const checkoutPesanan =
  (idUser, idGuru, idPaket, idPertemuan, dataPelajaran, dataUser) =>
  async dispatch => {
    await axios
      .post(
        `${apiUrl}/api/pesanan/assign/${idUser}/${idGuru}/${idPaket}/${idPertemuan}/${dataPelajaran}`,
        dataUser,
      )
      .then(response => {
        console.log(`pesanan berhasil dibuat`, response.data);
        dispatch({
          type: CHECKOUT_PESANAN,
          payload: response.data,
        });
      })
      .catch(err => console.log(`pesanan gagal`, err));
  };

export const updatePesanan = (idUser, dataUser) => async dispatch => {
  await axios
    .post(`${apiUrl}/api/pesanan/update/${idUser}`, dataUser)
    .then(response => {
      console.log(`pesanan berhasil diupdate`, response.data);
      dispatch({
        type: UPDATE_PESANAN,
        payload: response.data,
      });
    })
    .catch(err => console.log(`gagal update pesanan`, err));
};

export const changeStatusCheckout = () => dispatch => {
  dispatch({
    type: CHANGE_STATUS_CHECKOUT_PESANAN,
  });
};
