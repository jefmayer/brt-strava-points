/* eslint-disable no-console */
import { getParameterByName } from '../utils/url-utils';

const getAccessToken = () => {
  const code = getParameterByName('code');
  const clientId = process.env.NEXT_PUBLIC_STRAVA_CLIENT_ID;
  const clientSecret = process.env.NEXT_PUBLIC_STRAVA_CLIENT_SECRET;
  const endpoint = process.env.NEXT_PUBLIC_STRAVA_TOKEN_URL;
  const url = `${endpoint}?client_id=${clientId}&client_secret=${clientSecret}&code=${code}&grant_type=authorization_code`;

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 400) {
        const response = JSON.parse(xhr.responseText);
        resolve(response);
      } else {
        reject(new Error({
          status: xhr.status,
          statusText: xhr.statusText,
        }));
      }
    };
    xhr.onerror = () => {
      reject(new Error({
        status: xhr.status,
        statusText: xhr.statusText,
      }));
    };
    xhr.send();
  });
};

const getAthleteData = () => {
  //
};

const verifyUser = () => {
  getAccessToken()
    .then((data) => {
      console.log(data);
    })
    .catch(() => {
      console.error('user not found.');
    });
};

export {
  getAthleteData,
  verifyUser,
};
/* eslint-enable no-console */
