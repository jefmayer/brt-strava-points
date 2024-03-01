import { isBrowser } from './browser-utils';

const getParameterByName = (name, url) => {
  if (!isBrowser()) {
    return '';
  }
  const location = url || window.location.href;
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

const removeUrlParams = () => {
  if (!isBrowser()) {
    return '';
  }
  let url = window.location.href;
  const reg = /.+?(?=\?)/;
  const shortUrl = url.match(reg);
  if (shortUrl !== null) {
    url = shortUrl[0]; // eslint-disable-line prefer-destructuring
    window.history.replaceState({}, document.title, url);
  }
  return shortUrl;
};

export {
  getParameterByName,
  removeUrlParams,
};
