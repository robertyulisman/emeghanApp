import {ADD_CART, DELETE_CART, UPDATE_CART} from './../actions/types';

const initialState = {
  dataKeranjang: [],
  dataProduk: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_CART:
      return {
        ...state,
        dataKeranjang: [...state.dataKeranjang, action.payload],
        // dataKeranjang: [],
      };
    case DELETE_CART:
      const data = state.dataKeranjang.filter(item => item !== action.payload);
      return {
        ...state,
        dataKeranjang: data,
      };
    case UPDATE_CART:
      return {
        ...state,
        dataKeranjang: action.payload,
      };

    default:
      return state;
  }
}
