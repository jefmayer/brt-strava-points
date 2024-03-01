import {
  ACCESS_TOKEN_ERROR,
  AUTHENTICATE,
  INITIALIZATION_COMPLETE,
  LOG_OUT,
  UPDATE_CHALLENGE_SEGMENTS,
  USER_SESSION_DATA,
} from '../actions';

import { combineReducers } from 'redux';

const userSessionData = (state = {}, action = {}) => {
  if (action.data === undefined) {
    return state;
  }
  const {
    data,
    type,
  } = action;
  const {
    access_token,
    athlete,
    expires_at,
    expires_in,
    refresh_token,
    token_type,
  } = data;
  switch (type) {
    case USER_SESSION_DATA:
      return {
        ...state,
        access_token,
        athlete,
        expires_at,
        expires_in,
        refresh_token,
        token_type,
      };
    default:
      return state;
  }
};

const appData = (state = {}, action = {}) => {
  const {
    data,
    type,
  } = action;
  switch (type) {
    case UPDATE_CHALLENGE_SEGMENTS:
      return {
        ...state,
        segments: data,
      };
    default:
      return state;
  }
};

const appStatus = (state = {
  isInitializationComplete: false,
}, action = {}) => {
  const { type } = action;
  switch (type) {
    case INITIALIZATION_COMPLETE:
      return {
        ...state,
        isInitializationComplete: true,
      };
    default:
      return state;
  }
};

const userStatus = (state = {
  isAuthenticated: false,
  isAuthenticatedError: false,
}, action = {}) => {
  if (action.data === undefined) {
    return state;
  }
  const {
    data,
    type,
  } = action;
  const {
    role,
    success,
  } = data;
  switch (type) {
    case AUTHENTICATE:
      if (success === 'success') {
        return {
          ...state,
          isAuthenticated: true,
          isAuthenticatedError: false,
          role,
        };
      }
      return {
        ...state,
        isAuthenticated: false,
        isAuthenticatedError: true,
      };
    case ACCESS_TOKEN_ERROR:
      return {
        ...state,
        isAuthenticated: false,
        isAuthenticatedError: true,
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
  appData,
  appStatus,
  userSessionData,
  userStatus,
});

export default rootReducer;
