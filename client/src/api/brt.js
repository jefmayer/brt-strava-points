const apiUri = process.env.NEXT_PUBLIC_API_URI;

const authenticate = (id) => {
  return fetch(`${apiUri}/api/v1/authenticate`, {
    method: 'POST',
    headers: new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify({ id }),
  })
    .then((response) => response.json())
};

const getAttempts = () => (
  fetch(`${apiUri}/api/v1/attempts`, {
    method: 'GET',
    headers: new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }),
  })
    .then((response) => response.json())
);

const getSegments = () => (
  fetch(`${apiUri}/api/v1/segments`, {
    method: 'GET',
    headers: new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }),
  })
    .then((response) => response.json())
);

const getUsers = () => (
  fetch(`${apiUri}/api/v1/users`, {
    method: 'GET',
    headers: new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }),
  })
    .then((response) => response.json())
);

const addAttempts = (data) => (
  fetch(`${apiUri}/api/v1/attempts/update`, {
    method: 'POST',
    headers: new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify({ data }),
  })
    .then((response) => response.json())
);

const addUser = (data) => (
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
  addAttempts,
  addUser,
  authenticate,
  getAttempts,
  getSegments,
  getUsers,
};
