import {GET_DATA_HARGA} from './../actions/types';

const initialState = {
  daftarHarga: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_DATA_HARGA:
      return {
        ...state,
        daftarHarga: action.payload,
      };

    default:
      return state;
  }
}
