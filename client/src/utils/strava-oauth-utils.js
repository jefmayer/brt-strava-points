import {
  retreiveFromLocalStorage,
  saveToLocalStorage,
} from './browser-utils';

import { requestAccessToken } from '@/api/strava';

const lsKey = 'brtstravapoints.oauth';

const getAccessToken = () => (
  new Promise((resolve) => {
    try {
      const data = retreiveFromLocalStorage(lsKey);
      console.log(`isAccessTokenExpired: ${isAccessTokenExpired()}`);
      if (!isAccessTokenExpired()) {
        const { access_token } = data;
        resolve(access_token);
      } else {
        const { refresh_token } = data;
        resolve(requestAccessToken(refresh_token));
      }      
    } catch (error) {
      console.error(error);
      resolve('');
    }
  })
);

const getUserId = () => {
  try {
    const data = retreiveFromLocalStorage(lsKey);
    const { id } = data;
    return id;
  } catch (error) {
    console.error(error);
    return '';
  }
};

const isAccessTokenExpired = () => {
  try {
    const data = retreiveFromLocalStorage(lsKey);
    const { expires_at } = data;
    const ts = new Date().getTime();
    return ts > expires_at * 1000;
  } catch (error) {
    console.error(error);
    return true;
  }
};

const persistAccessTokenRepsonse = (data) => {
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
    refresh_token,
  });
};

const persistRefreshTokenResponse = (data) => {
  const {
    access_token,
    expires_at,
    expires_in,
    refresh_token,
  } = data;
  const lsData = retreiveFromLocalStorage(lsKey);
  const { id } = lsData;
  saveToLocalStorage(lsKey, {
    access_token,
    expires_at,
    expires_in,
    id,
    refresh_token,
  });
};


export {
  getAccessToken,
  getUserId,
  isAccessTokenExpired,
  persistAccessTokenRepsonse,
  persistRefreshTokenResponse,
};
