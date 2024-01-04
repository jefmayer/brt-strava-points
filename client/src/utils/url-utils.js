import { isBrowser } from './browser-utils';

const getParameterByName = (name, url) => {
  let location = url;
  if (!location && isBrowser()) {
    location = window.location.href;
  } else if (!isBrowser()) {
    return '';
  }
  const regex = new RegExp(`[?&]${name.replace(/[\[\]]/g, '\\$&')}(=([^&#]*)|&|#|$)`);
  const results = regex.exec(location);
  if (!results) {
    return '';
  }
  if (!results[2]) {
    return '';
  }
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

export {
  getParameterByName,
};
