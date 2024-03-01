const getCookie = (name) => {
  const cookies = document.cookie.split(';');
  let value = '';
  cookies.forEach((str) => {
    const cookie = str.trim();
    if (cookie.indexOf(name) !== -1) {
      value = cookie.substring(name.length + 1, cookie.length);
    }
  });
  return value;
};

const setCookie = (name, value, days) => {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  document.cookie = `${name}=${value}; expires=${date.toGMTString()}; path=/`;
};

const setCookieToExpireOnDate = (name, value, date) => {
  document.cookie = `${name}=${value}; expires=${date.toGMTString()}; path=/`;
};

export {
  getCookie,
  setCookie,
  setCookieToExpireOnDate,
};
