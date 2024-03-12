export const ATTEMPTS = 'ATTEMPTS';
export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';
export const SEGMENTS = 'SEGMENTS';
export const USER_SESSION_DATA = 'USER_SESSION_DATA';
export const USERS = 'USERS';

export const login = () => ({
  type: LOG_IN,
});

export const logout = () => ({
  type: LOG_OUT,
});

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
