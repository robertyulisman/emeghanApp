import {GET_ADDRESS} from './../actions/types';

const initialState = {
  alamat: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ADDRESS:
      return {
        ...state,
        alamat: action.payload,
      };

    default:
      return state;
  }
}
