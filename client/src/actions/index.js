import { getChallengeSegments } from '../api/brt';
import { getSegmentEffort } from '../api/strava';

export const GET_RIDERS = 'GET_RIDERS';
export const INITIALIZATION_COMPLETE = 'INITIALIZATION_COMPLETE';
export const LOG_OUT = 'LOG_OUT';
export const UPDATE_CHALLENGE_SEGMENTS = 'UPDATE_CHALLENGE_SEGMENTS';
export const UPDATE_USER_SEGMENTS = 'UPDATE_USER_SEGMENTS';
export const USER_SESSION_DATA = 'USER_SESSION_DATA';


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


export const getUserSegments = (token, segments) => {
  const arr = segments.map((segment) => (
    getSegmentEffort(segment.id, token)
  ));
  return Promise.all(arr);
};

export const loadStandingsData = () => dispatch => { /* eslint-disable-line arrow-parens */
  getChallengeSegments()
    .then((json) => {
      dispatch(updateChallengeSegments(json));
      // Get all user athelete data
      /* const token = getAccessToken();
      getUserSegments(token, json)
        .then(() => {
          //
        }); */
    });
};

export const updateStandings = () => {
  console.log('actions.js, updateStandings');
};

export const getRiders = () => {
  console.log('actions.js, getRiders');
};
