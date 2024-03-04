import {
  retreiveFromLocalStorage,
  saveToLocalStorage,
} from './browser-utils';

const lsKey = 'brtstravapoints.oauth';

const isAccessTokenExpired = (data) => {
  console.log(data);
};

const isAuthenticated = () => (
  retreiveFromLocalStorage(lsKey) !== null
);

const persistTokenData = (data) => {
  const {
    access_token,
    expires_at,
    expires_in,
    refresh_token,
  } = data;
  saveToLocalStorage(lsKey, {
    access_token,
    expires_at,
    expires_in,
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
  isAuthenticated,
  persistTokenData,
  useAccessToken,
  useRefreshToken,
};
