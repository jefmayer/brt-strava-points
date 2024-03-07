import {
  getAccessToken,
  persistRefreshTokenResponse,
} from '@/utils/strava-oauth-utils';

import { getParameterByName } from '@/utils/url-utils';

const requestAccessToken = (refreshToken) => {
  const clientId = process.env.NEXT_PUBLIC_STRAVA_CLIENT_ID;
  const clientSecret = process.env.NEXT_PUBLIC_STRAVA_CLIENT_SECRET;
  const endpoint = process.env.NEXT_PUBLIC_STRAVA_TOKEN_URL;
  let url = `${endpoint}?client_id=${clientId}&client_secret=${clientSecret}`;
  if (refreshToken) {
    url = url.concat(`&grant_type=refresh_token&refresh_token=${refreshToken}`);
  } else {
    const code = getParameterByName('code');
    url = url.concat(`&code=${code}&grant_type=authorization_code}`);
  }
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 400) {
        const response = JSON.parse(xhr.responseText);
        // Only save if requesting a refresh token,
        // otherwise, need to persist with athlete/id
        if (refreshToken) {
          console.log(response);
          persistRefreshTokenResponse(response)
        }
        resolve(response);
      } else {
        reject(new Error(`${xhr.status}: ${xhr.statusText}`));
      }
    };
    xhr.onerror = () => {
      reject(new Error(`${xhr.status}: ${xhr.statusText}`));
    };
    xhr.send();
  });
};

const getSegmentEffort = (segmentId) => {
  const endpoint = process.env.NEXT_PUBLIC_STRAVA_API_URL;
  const url = `${endpoint}/segment_efforts?segment_id=${segmentId}`;
  return new Promise((resolve, reject) => {
    getAccessToken().then((token) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.setRequestHeader('Authorization', `Bearer ${token}`);
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 400) {
          const response = JSON.parse(xhr.responseText);
          // console.log(response);
          resolve(response);
        } else {
          reject(new Error(`${xhr.status}: ${xhr.statusText}`));
        }
      };
      xhr.onerror = () => {
        reject(new Error(`${xhr.status}: ${xhr.statusText}`));
      };
      xhr.send();
    });
  });
};

export {
  requestAccessToken,
  getSegmentEffort,
};
