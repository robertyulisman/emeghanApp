import {
  CHECKOUT_PESANAN,
  CHANGE_STATUS_CHECKOUT_PESANAN,
  UPDATE_PESANAN,
} from './../actions/types';

const initialState = {
  pesanan: [],
  status: 'gagal',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CHECKOUT_PESANAN:
      return {
        ...state,
        pesanan: action.payload,
        status: 'berhasil',
      };
    case UPDATE_PESANAN:
      return {
        ...state,
        pesanan: action.payload,
      };
    case CHANGE_STATUS_CHECKOUT_PESANAN:
      return {
        ...state,
        status: 'gagal',
      };

    default:
      return state;
  }
}
