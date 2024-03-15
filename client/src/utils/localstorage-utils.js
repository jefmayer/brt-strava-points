import {
  retreiveFromLocalStorage,
  saveToLocalStorage,
} from './browser-utils';

const appLsKey = process.env.NEXT_PUBLIC_APP_LOCAL_STORAGE_KEY;
const oauthLsKey = process.env.NEXT_PUBLIC_OAUTH_LOCAL_STORAGE_KEY;

const getAccessToken = () => {
  const data = retreiveFromLocalStorage(oauthLsKey);
  const { access_token } = data;
  return access_token;
};

const isAccessTokenExpired = () => {
  try {
    const data = retreiveFromLocalStorage(oauthLsKey);
    const { expires_at } = data;
    const ts = new Date().getTime();
    return ts > expires_at * 1000;
  } catch (error) {
    console.error(error);
    return true;
  }
};

const getUserId = () => {
  try {
    const data = retreiveFromLocalStorage(oauthLsKey);
    const { id } = data;
    return id;
  } catch (error) {
    // console.error(error);
    return '';
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
  saveToLocalStorage(oauthLsKey, {
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
  const lsData = retreiveFromLocalStorage(oauthLsKey);
  const { id } = lsData;
  saveToLocalStorage(oauthLsKey, {
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
