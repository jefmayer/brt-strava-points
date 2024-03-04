import {
  getChallengeSegments,
  updateUserAthleteData,
} from '../api/brt';

import { getSegmentEffort } from '../api/strava';

export const ACCESS_TOKEN_ERROR = 'ACCESS_TOKEN_ERROR';
export const AUTHENTICATE = 'AUTHENTICATE';
export const GET_RIDERS = 'GET_RIDERS';
export const INITIALIZATION_COMPLETE = 'INITIALIZATION_COMPLETE';
export const LOG_OUT = 'LOG_OUT';
export const UPDATE_CHALLENGE_SEGMENTS = 'UPDATE_CHALLENGE_SEGMENTS';
export const UPDATE_USER_SEGMENTS = 'UPDATE_USER_SEGMENTS';
export const USER_SESSION_DATA = 'USER_SESSION_DATA';

export const accessTokenError = () => ({
  type: ACCESS_TOKEN_ERROR,
});

export const authenticationAttempt = (json) => ({
  type: AUTHENTICATE,
  data: json,
});

export const persistUserSessionData = (json) => ({
  type: USER_SESSION_DATA,
  data: json,
});

export const updateChallengeSegments = (json) => ({
  type: UPDATE_CHALLENGE_SEGMENTS,
  data: json,
});

export const updateUserSegments = (json) => ({
  type: UPDATE_USER_SEGMENTS,
  data: json,
});

export const initializationComplete = () => ({
  type: INITIALIZATION_COMPLETE,
});

export const getUserSegments = (token, segments) => {
  const arr = segments.map((segment) => (
    getSegmentEffort(segment.id, token)
  ));
  return Promise.all(arr);
};

export const initialize = (data) => dispatch => { /* eslint-disable-line arrow-parens */
  const {
    access_token,
    athlete,
  } = data;
  // Persist and save user and app data in session
  dispatch(persistUserSessionData(data));
  updateUserAthleteData(athlete)
    .then(getChallengeSegments()
      .then((json) => {
        dispatch(updateChallengeSegments(json));
        getUserSegments(access_token, json)
          .then(() => {
            dispatch(initializationComplete());
          });
      }));
};

export const updateStandings = () => {
  console.log('actions.js, updateStandings');
};

export const getRiders = () => {
  console.log('actions.js, getRiders');
};
