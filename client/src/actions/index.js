export const AUTHENTICATE = 'AUTHENTICATE';
export const LOG_OUT = 'LOG_OUT';

export const authenticationAttempt = (json) => ({
  type: AUTHENTICATE,
  data: json,
});

export const authenticate = ({ user, password }) => dispatch => (/* eslint-disable-line arrow-parens */
  fetch('/login', {
    method: 'POST',
    headers: new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify({
      user,
      password,
    }),
  })
    .then((response) => response.json())
    .then((json) => dispatch(authenticationAttempt(json)))
);
