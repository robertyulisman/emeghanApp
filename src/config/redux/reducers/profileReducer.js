import {GET_PROFILE, CLEAR_PROFILE, UPDATE_PROFILE} from './../actions/types';

const initialState = {
  profile: {},
  guru: null,
  // isLoading: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        // isLoading: false,
      };
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: action.payload,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: {},
      };

    default:
      return state;
  }
}
