import {
  ATTEMPTS,
  SEGMENTS,
  USERS,
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
    firstname,
    id,
    lastname,
    profile,
    role,
  } = data;
  switch (type) {
    case USER_SESSION_DATA:
      return {
        ...state,
        firstname,
        id,
        lastname,
        profile,
        role,
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
    case SEGMENTS:
      return {
        ...state,
        segments: data,
      };
    case ATTEMPTS:
      return {
        ...state,
        attempts: data,
      };
      case USERS:
      return {
        ...state,
        users: data,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  appData,
  userSessionData,
});

export default rootReducer;
