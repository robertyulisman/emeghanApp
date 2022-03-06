import {GET_DATA_CONVERSATION, GET_DATA_MESSAGE} from './../actions/types';

const initialState = {
  conversation: [],
  message: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_DATA_CONVERSATION:
      return {
        ...state,
        conversation: action.payload,
      };
    case GET_DATA_MESSAGE:
      return {
        ...state,
        message: action.payload,
      };

    default:
      return state;
  }
}
