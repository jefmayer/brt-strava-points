import {
  retreiveFromLocalStorage,
  saveToLocalStorage,
} from './browser-utils';

const lsKey = 'brtstravapoints.oauth';

const getAccessToken = () => {
  try {
    const data = retreiveFromLocalStorage(lsKey);
    const { access_token } = data;
    return access_token;
  } catch {
    return '';
  }
}

const getUserId = () => {
  try {
    const data = retreiveFromLocalStorage(lsKey);
    const { id } = data;
    return id;
  } catch {
    return '';
  }
}

const isAccessTokenExpired = (data) => {
  console.log(data);
};

const isAuthenticated = () => {
  try {
    const data = retreiveFromLocalStorage(lsKey);
    const { logged_in } = data;
    return logged_in === true;
  } catch {
    return false;
  }
};

const persistTokenRepsonse = (data) => {
  const {
    athlete,
    access_token,
    expires_at,
    expires_in,
    refresh_token,
  } = data;
  const { id } = athlete;
  saveToLocalStorage(lsKey, {
    access_token,
    expires_at,
    expires_in,
    id,
    logged_in: true,
    refresh_token,
  });
};

const useAccessToken = () => {
  try {
    const data = retreiveFromLocalStorage(lsKey);
    if (!isAccessTokenExpired(data)) {
      return data.access_token;
    }
  } catch {
    return null;
  }
};

const useRefreshToken = () => {
  try {
    const data = retreiveFromLocalStorage(lsKey);
    console.log(data);
  } catch {
    return null;
  }
};

export {
  getAccessToken,
  getUserId,
  isAuthenticated,
  persistTokenRepsonse,
  useAccessToken,
  useRefreshToken,
};
