import {
  NOTIFIKASI,
  UPDATE_NOTIFIKASI,
  DELETE_NOTIFIKASI,
} from './../actions/types';

const initialState = {
  data: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case NOTIFIKASI:
      return {
        ...state,
        data: action.payload,
      };
    case UPDATE_NOTIFIKASI:
      return {
        ...state,
        data: state.data,
      };
    case DELETE_NOTIFIKASI:
      return {
        ...state,
        data: state.data,
      };

    default:
      return state;
  }
}
