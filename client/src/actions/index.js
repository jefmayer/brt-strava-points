export const AUTHENTICATE = 'AUTHENTICATE';
export const GET_RIDERS = 'GET_RIDERS';
export const LOG_OUT = 'LOG_OUT';

export const authenticationAttempt = (json) => ({
  type: AUTHENTICATE,
  data: json,
});

export const authenticate = ({ id }) => dispatch => (/* eslint-disable-line arrow-parens */
  fetch('http://localhost:5001/api/v1/authenticate', {
    method: 'POST',
    headers: new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify({ id }),
  })
    .then((response) => response.json())
    .then((json) => dispatch(authenticationAttempt(json)))
);

export const updateScoreboard = () => {
  console.log('actions.js, updateScoreboard');
};

export const getRiders = () => {
  console.log('actions.js, getRiders');
};
