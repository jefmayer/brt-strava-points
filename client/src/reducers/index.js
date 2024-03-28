import {
  ADMIN_UPDATE,
  ATTEMPTS,
  LOG_IN,
  LOG_OUT,
  SEGMENTS,
  USERS,
  USER_SESSION_DATA,
} from '../actions';

import { combineReducers } from 'redux';

const appStatus = (state = {}, action = {}) => {
  const {
    type,
  } = action;
  switch (type) {
    case ADMIN_UPDATE:
      return {
        ...state,
        admin: 'updated',
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

const userStatus = (state = {
  loggedIn: false,
}, action = {}) => {
  const {
    type,
  } = action;
  switch (type) {
    case LOG_IN:
      return {
        ...state,
        loggedIn: true,
      };
    case LOG_OUT:
      return {
        ...state,
        loggedIn: false,
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
