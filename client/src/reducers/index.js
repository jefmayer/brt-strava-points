import { combineReducers } from 'redux';

import {
  AUTHENTICATE,
  LOG_OUT,
} from '../actions';

const userStatus = (state = {
  isAuthenticated: false,
  isAuthenticationError: false,
  response: [{ success: 'error' }],
}, action = {}) => {
  switch (action.type) {
    case AUTHENTICATE:
      if (action.data[0].success === 'success') {
        return {
          ...state,
          isAuthenticated: true,
          isAuthenticationError: false,
          response: action.data,
        };
      }
      return {
        ...state,
        isAuthenticated: false,
        isAuthenticationError: true,
        response: action.data,
      };
    case LOG_OUT:
      return {
        ...state,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  userStatus,
});

export default rootReducer;
