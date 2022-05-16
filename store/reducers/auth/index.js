import {
  DELETE_AUTH_USER_DATA,
  SAVE_AUTH_TOKEN,
  SAVE_AUTH_USER_DATA,
} from '../../action-types';

const INITIAL_STATE = {
  isAuthenticated: false,
  token: '',
  user: null,
};

export default (state = INITIAL_STATE, {type, payload}) => {
  switch (type) {
    case SAVE_AUTH_TOKEN:
      return {
        ...state,
        token: payload,
      };

    case SAVE_AUTH_USER_DATA:
      return {
        ...state,
        user: payload,
        isAuthenticated: true,
      };

    case DELETE_AUTH_USER_DATA:
      return {
        ...state,
        token: '',
        user: null,
        isAuthenticated: false,
      };

    default:
      return state;
  }
};
