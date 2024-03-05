import {
  INITIALIZATION_COMPLETE,
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

const rootReducer = combineReducers({
  appData,
  appStatus,
  userSessionData,
});

export default rootReducer;
