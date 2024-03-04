import { authenticationAttempt } from '../actions';

const apiUri = process.env.NEXT_PUBLIC_API_URI;

const authenticate = (data) => dispatch => { /* eslint-disable-line arrow-parens */
  const {
    athlete,
  } = data;
  const { id } = athlete;
  return fetch(`${apiUri}/api/v1/authenticate`, {
    method: 'POST',
    headers: new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify({ id }),
  })
    .then((response) => response.json())
    // Authenticate user
    .then((json) => dispatch(authenticationAttempt(json)));
};

const getChallengeSegments = () => (
  fetch(`${apiUri}/api/v1/segments`, {
    method: 'GET',
    headers: new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }),
  })
    .then((response) => response.json())
);

const updateUserAthleteData = (data) => (
  fetch(`${apiUri}/api/v1/users/update`, {
    method: 'POST',
    headers: new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify({ data }),
  })
    .then((response) => response.json())
);

export {
  authenticate,
  getChallengeSegments,
  updateUserAthleteData,
};
