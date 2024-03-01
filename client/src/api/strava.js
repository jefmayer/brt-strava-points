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
        reject(new Error(`${xhr.status}: ${xhr.statusText}`));
      }
    };
    xhr.onerror = () => {
      reject(new Error(`${xhr.status}: ${xhr.statusText}`));
    };
    xhr.send();
  });
};

const getSegmentEffort = (segmentId, token) => {
  const endpoint = process.env.NEXT_PUBLIC_STRAVA_API_URL;
  const url = `${endpoint}/segment_efforts?segment_id=${segmentId}`;

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.setRequestHeader('Authorization', `Bearer ${token}`);
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 400) {
        const response = JSON.parse(xhr.responseText);
        console.log(response);
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

export {
  getAccessToken,
  getSegmentEffort,
};
