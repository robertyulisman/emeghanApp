import {GET_DATA, GET_DATA_GURU} from './../actions/types';

const initialState = {
  dataPaket: [],
  dataGuru: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_DATA:
      return {
        ...state,
        dataPaket: action.payload,
      };
    case GET_DATA_GURU:
      return {
        ...state,
        dataGuru: action.payload,
      };

    default:
      return state;
  }
}
