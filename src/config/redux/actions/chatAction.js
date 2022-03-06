import axios from 'axios';
import {apiUrl} from '../../../utils/Data';
import {GET_DATA_CONVERSATION, GET_DATA_MESSAGE} from './types';

// get data Guru
export const getConversation = idUser => async dispatch => {
  await axios
    .get(`${apiUrl}/api/conversation/${idUser}`)
    .then(response => {
      console.log(`response.data conversation`, response.data);
      dispatch({
        type: GET_DATA_CONVERSATION,
        payload: response.data,
      });
    })
    .catch(err => console.log(`err get data conversation`, err));
};
export const getMessage = idUser => async dispatch => {
  await axios
    .get(`${apiUrl}/api/message/${idUser}`)
    .then(response => {
      console.log(`response.data conversation`, response.data);
      dispatch({
        type: GET_DATA_MESSAGE,
        payload: response.data,
      });
    })
    .catch(err => console.log(`err get data conversation`, err));
};
