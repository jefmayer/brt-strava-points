export const ATTEMPTS = 'ATTEMPTS';
export const SEGMENTS = 'SEGMENTS';
export const USER_SESSION_DATA = 'USER_SESSION_DATA';
export const USERS = 'USERS';

export const updateSegments = (json) => ({
  type: SEGMENTS,
  data: json,
});

export const updateAttempts = (json) => ({
  type: ATTEMPTS,
  data: json,
});

export const updateUserSessionData = (json) => ({
  type: USER_SESSION_DATA,
  data: json,
});

export const updateUsers = (json) => ({
  type: USERS,
  data: json,
});
